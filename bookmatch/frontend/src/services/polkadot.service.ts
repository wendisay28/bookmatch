/**
 * Polkadot Service for Blockchain Interactions
 * LATIN HACK - Paseo Testnet Integration
 */

import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3Accounts, web3Enable, web3FromAddress } from '@polkadot/extension-dapp';
import { POLKADOT_CONFIG } from '../config/polkadot.config';
import type {
  PolkadotAccount,
  BookTraceabilityRecord,
  TransactionRecord,
  BookOwnershipProof
} from '../types/blockchain.types';

class PolkadotService {
  private api: ApiPromise | null = null;
  private wsProvider: WsProvider | null = null;
  private reconnectAttempts = 0;

  /**
   * Initialize connection to Paseo Testnet
   */
  async connect(): Promise<ApiPromise> {
    if (this.api && this.api.isConnected) {
      return this.api;
    }

    try {
      const { wsProvider, alternativeEndpoints } = POLKADOT_CONFIG.PASEO_TESTNET;
      const endpoints = [wsProvider, ...alternativeEndpoints];

      // Try each endpoint until one works
      for (const endpoint of endpoints) {
        try {
          console.log(`Attempting to connect to ${endpoint}...`);
          this.wsProvider = new WsProvider(endpoint, false);

          this.api = await ApiPromise.create({
            provider: this.wsProvider,
            throwOnConnect: true
          });

          if (this.api.isConnected) {
            console.log(`Successfully connected to Paseo Testnet via ${endpoint}`);
            this.reconnectAttempts = 0;
            this.setupEventListeners();
            return this.api;
          }
        } catch (error) {
          console.warn(`Failed to connect to ${endpoint}:`, error);
          continue;
        }
      }

      throw new Error('Failed to connect to any Paseo Testnet endpoint');
    } catch (error) {
      console.error('Error connecting to Polkadot:', error);
      throw error;
    }
  }

  /**
   * Setup WebSocket event listeners
   */
  private setupEventListeners(): void {
    if (!this.wsProvider) return;

    this.wsProvider.on('connected', () => {
      console.log('WebSocket connected to Paseo Testnet');
    });

    this.wsProvider.on('disconnected', () => {
      console.log('WebSocket disconnected');
      this.handleReconnect();
    });

    this.wsProvider.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  }

  /**
   * Handle reconnection logic
   */
  private async handleReconnect(): Promise<void> {
    const { maxReconnectAttempts, reconnectDelay } = POLKADOT_CONFIG.CONNECTION;

    if (this.reconnectAttempts < maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Reconnection attempt ${this.reconnectAttempts}/${maxReconnectAttempts}`);

      await new Promise(resolve => setTimeout(resolve, reconnectDelay));
      await this.connect();
    } else {
      console.error('Max reconnection attempts reached');
    }
  }

  /**
   * Disconnect from the network
   */
  async disconnect(): Promise<void> {
    if (this.api) {
      await this.api.disconnect();
      this.api = null;
    }
    if (this.wsProvider) {
      await this.wsProvider.disconnect();
      this.wsProvider = null;
    }
  }

  /**
   * Get the API instance
   */
  async getApi(): Promise<ApiPromise> {
    if (!this.api || !this.api.isConnected) {
      await this.connect();
    }
    return this.api!;
  }

  /**
   * Enable Polkadot extension and get accounts
   */
  async enableExtension(appName: string = 'BookMatch'): Promise<PolkadotAccount[]> {
    try {
      const extensions = await web3Enable(appName);

      if (extensions.length === 0) {
        throw new Error('No Polkadot extension found. Please install Polkadot.js extension.');
      }

      const accounts = await web3Accounts();

      return accounts.map(account => ({
        address: account.address,
        meta: account.meta,
        type: account.type
      }));
    } catch (error) {
      console.error('Error enabling extension:', error);
      throw error;
    }
  }

  /**
   * Get chain information
   */
  async getChainInfo() {
    const api = await this.getApi();
    const [chain, nodeName, nodeVersion] = await Promise.all([
      api.rpc.system.chain(),
      api.rpc.system.name(),
      api.rpc.system.version()
    ]);

    return {
      chain: chain.toString(),
      nodeName: nodeName.toString(),
      nodeVersion: nodeVersion.toString()
    };
  }

  /**
   * Get current block number
   */
  async getCurrentBlockNumber(): Promise<number> {
    const api = await this.getApi();
    const header = await api.rpc.chain.getHeader();
    return header.number.toNumber();
  }

  /**
   * Get account balance
   */
  async getBalance(address: string): Promise<string> {
    const api = await this.getApi();
    const accountInfo: any = await api.query.system.account(address);
    return accountInfo.data.free.toString();
  }

  /**
   * Register a book on the blockchain
   * This is a placeholder - actual implementation will depend on smart contract
   */
  async registerBook(
    account: PolkadotAccount,
    bookData: {
      bookId: string;
      isbn?: string;
      title: string;
      author: string;
      metadata?: Record<string, any>;
    }
  ): Promise<{ success: boolean; transactionHash?: string; error?: string }> {
    try {
      const api = await this.getApi();
      const injector = await web3FromAddress(account.address);

      // TODO: Replace with actual smart contract call
      // For now, we'll use a remark extrinsic to store data on-chain
      const remarkData = JSON.stringify({
        type: 'BOOK_REGISTRATION',
        ...bookData,
        timestamp: Date.now()
      });

      const tx = api.tx.system.remark(remarkData);

      return new Promise((resolve) => {
        tx.signAndSend(account.address, { signer: injector.signer }, ({ status, txHash }) => {
          if (status.isInBlock) {
            console.log(`Book registered in block: ${status.asInBlock.toString()}`);
            resolve({ success: true, transactionHash: txHash.toString() });
          } else if (status.isFinalized) {
            console.log(`Transaction finalized: ${status.asFinalized.toString()}`);
          }
        }).catch((error) => {
          console.error('Error registering book:', error);
          resolve({ success: false, error: error.message });
        });
      });
    } catch (error: any) {
      console.error('Error in registerBook:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Transfer book ownership
   * This is a placeholder - actual implementation will depend on smart contract
   */
  async transferOwnership(
    account: PolkadotAccount,
    bookId: string,
    newOwnerAddress: string
  ): Promise<{ success: boolean; transactionHash?: string; error?: string }> {
    try {
      const api = await this.getApi();
      const injector = await web3FromAddress(account.address);

      const remarkData = JSON.stringify({
        type: 'OWNERSHIP_TRANSFER',
        bookId,
        from: account.address,
        to: newOwnerAddress,
        timestamp: Date.now()
      });

      const tx = api.tx.system.remark(remarkData);

      return new Promise((resolve) => {
        tx.signAndSend(account.address, { signer: injector.signer }, ({ status, txHash }) => {
          if (status.isInBlock) {
            console.log(`Ownership transferred in block: ${status.asInBlock.toString()}`);
            resolve({ success: true, transactionHash: txHash.toString() });
          }
        }).catch((error) => {
          console.error('Error transferring ownership:', error);
          resolve({ success: false, error: error.message });
        });
      });
    } catch (error: any) {
      console.error('Error in transferOwnership:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Query book traceability record
   * This is a placeholder - actual implementation will depend on smart contract
   */
  async getBookTraceability(bookId: string): Promise<BookTraceabilityRecord | null> {
    try {
      // TODO: Implement actual smart contract query
      // For now, return null as we don't have the contract deployed
      console.log(`Querying traceability for book: ${bookId}`);
      return null;
    } catch (error) {
      console.error('Error querying book traceability:', error);
      return null;
    }
  }

  /**
   * Verify book ownership
   */
  async verifyOwnership(
    bookId: string,
    address: string
  ): Promise<BookOwnershipProof | null> {
    try {
      // TODO: Implement actual smart contract verification
      console.log(`Verifying ownership of book ${bookId} for address ${address}`);
      return null;
    } catch (error) {
      console.error('Error verifying ownership:', error);
      return null;
    }
  }
}

export const polkadotService = new PolkadotService();
export default polkadotService;
