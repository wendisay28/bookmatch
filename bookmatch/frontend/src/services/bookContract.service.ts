/**
 * Book Traceability Smart Contract Service (EVM)
 * LATIN HACK - Passet Hub Testnet Integration
 *
 * Interacts with BookTraceabilitySimple.sol deployed on Passet Hub
 * Contract Address: 0x37eaf6a2Fa55cB50d4Bf3E7bDc2f89850a396bEF
 */

import { ethers, BrowserProvider, Contract, Signer } from 'ethers';
import { POLKADOT_CONFIG } from '../config/polkadot.config';
import BookTraceabilityABI from '../config/BookTraceabilitySimple.json';
import type { BookTraceabilityRecord, TransactionRecord } from '../types/blockchain.types';

// EVM Account Interface
export interface EVMAccount {
  address: string;
  balance?: string;
  chainId?: number;
}

// Contract Book Structure (matches Solidity struct)
export interface ContractBook {
  bookId: string;
  title: string;
  currentOwner: string;
  registrationTime: bigint;
}

// Contract Transfer Structure (matches Solidity struct)
export interface ContractTransfer {
  from: string;
  to: string;
  timestamp: bigint;
}

class BookContractService {
  private provider: BrowserProvider | null = null;
  private contract: Contract | null = null;
  private signer: Signer | null = null;

  private readonly CONTRACT_ADDRESS = POLKADOT_CONFIG.CONTRACTS.BOOK_TRACEABILITY;
  private readonly CHAIN_CONFIG = POLKADOT_CONFIG.PASSET_HUB_TESTNET;

  /**
   * Check if MetaMask is installed
   */
  isMetaMaskInstalled(): boolean {
    return typeof window !== 'undefined' && typeof (window as any).ethereum !== 'undefined';
  }

  /**
   * Connect to MetaMask wallet
   */
  async connectWallet(): Promise<EVMAccount> {
    if (!this.isMetaMaskInstalled()) {
      throw new Error('MetaMask no está instalado. Por favor instala MetaMask para continuar.');
    }

    try {
      // Initialize provider
      this.provider = new BrowserProvider((window as any).ethereum);

      // Request account access
      await this.provider.send('eth_requestAccounts', []);

      // Get signer
      this.signer = await this.provider.getSigner();
      const address = await this.signer.getAddress();

      // Check/Switch to Passet Hub network
      await this.switchToPassetHub();

      // Get balance
      const balance = await this.provider.getBalance(address);

      // Initialize contract
      this.initializeContract();

      return {
        address,
        balance: ethers.formatEther(balance),
        chainId: this.CHAIN_CONFIG.chainId
      };
    } catch (error: any) {
      console.error('Error conectando wallet:', error);
      throw new Error(`Error al conectar wallet: ${error.message}`);
    }
  }

  /**
   * Switch network to Passet Hub Testnet
   */
  async switchToPassetHub(): Promise<void> {
    if (!this.provider) {
      throw new Error('Provider no inicializado');
    }

    try {
      // Try to switch to the network
      await this.provider.send('wallet_switchEthereumChain', [
        { chainId: `0x${this.CHAIN_CONFIG.chainId.toString(16)}` }
      ]);
    } catch (switchError: any) {
      // If network doesn't exist, add it
      if (switchError.code === 4902) {
        try {
          await this.provider.send('wallet_addEthereumChain', [
            {
              chainId: `0x${this.CHAIN_CONFIG.chainId.toString(16)}`,
              chainName: this.CHAIN_CONFIG.name,
              nativeCurrency: {
                name: this.CHAIN_CONFIG.symbol,
                symbol: this.CHAIN_CONFIG.symbol,
                decimals: this.CHAIN_CONFIG.decimals
              },
              rpcUrls: [this.CHAIN_CONFIG.rpcUrl],
              blockExplorerUrls: [this.CHAIN_CONFIG.explorerUrl]
            }
          ]);
        } catch (addError) {
          throw new Error('Error al agregar red Passet Hub a MetaMask');
        }
      } else {
        throw switchError;
      }
    }
  }

  /**
   * Initialize contract instance
   */
  private initializeContract(): void {
    if (!this.signer) {
      throw new Error('Signer no inicializado');
    }

    this.contract = new Contract(
      this.CONTRACT_ADDRESS,
      BookTraceabilityABI.abi,
      this.signer
    );
  }

  /**
   * Get current connected account
   */
  async getCurrentAccount(): Promise<EVMAccount | null> {
    if (!this.provider) {
      return null;
    }

    try {
      const signer = await this.provider.getSigner();
      const address = await signer.getAddress();
      const balance = await this.provider.getBalance(address);

      return {
        address,
        balance: ethers.formatEther(balance),
        chainId: this.CHAIN_CONFIG.chainId
      };
    } catch (error) {
      console.error('Error obteniendo cuenta actual:', error);
      return null;
    }
  }

  /**
   * Register a new book on the blockchain
   */
  async registerBook(bookId: string, title: string): Promise<{
    success: boolean;
    transactionHash?: string;
    error?: string;
  }> {
    if (!this.contract) {
      return { success: false, error: 'Contrato no inicializado. Conecta tu wallet primero.' };
    }

    try {
      console.log(`Registrando libro: ${bookId} - ${title}`);

      // Call contract function
      const tx = await this.contract.registerBook(bookId, title);
      console.log('Transacción enviada:', tx.hash);

      // Wait for confirmation
      const receipt = await tx.wait();
      console.log('Transacción confirmada:', receipt);

      return {
        success: true,
        transactionHash: receipt.hash
      };
    } catch (error: any) {
      console.error('Error registrando libro:', error);

      let errorMessage = 'Error desconocido';
      if (error.message.includes('Book exists')) {
        errorMessage = 'Este libro ya está registrado en la blockchain';
      } else if (error.code === 'ACTION_REJECTED') {
        errorMessage = 'Transacción rechazada por el usuario';
      } else {
        errorMessage = error.message;
      }

      return {
        success: false,
        error: errorMessage
      };
    }
  }

  /**
   * Transfer book ownership
   */
  async transferOwnership(bookId: string, newOwnerAddress: string): Promise<{
    success: boolean;
    transactionHash?: string;
    error?: string;
  }> {
    if (!this.contract) {
      return { success: false, error: 'Contrato no inicializado. Conecta tu wallet primero.' };
    }

    try {
      // Validate address
      if (!ethers.isAddress(newOwnerAddress)) {
        return { success: false, error: 'Dirección de destino inválida' };
      }

      console.log(`Transfiriendo libro ${bookId} a ${newOwnerAddress}`);

      const tx = await this.contract.transferOwnership(bookId, newOwnerAddress);
      console.log('Transacción enviada:', tx.hash);

      const receipt = await tx.wait();
      console.log('Transacción confirmada:', receipt);

      return {
        success: true,
        transactionHash: receipt.hash
      };
    } catch (error: any) {
      console.error('Error transfiriendo propiedad:', error);

      let errorMessage = 'Error desconocido';
      if (error.message.includes('Book not found')) {
        errorMessage = 'Libro no encontrado';
      } else if (error.message.includes('Not owner')) {
        errorMessage = 'No eres el propietario de este libro';
      } else if (error.message.includes('Cannot transfer to self')) {
        errorMessage = 'No puedes transferir a tu misma dirección';
      } else if (error.code === 'ACTION_REJECTED') {
        errorMessage = 'Transacción rechazada por el usuario';
      } else {
        errorMessage = error.message;
      }

      return {
        success: false,
        error: errorMessage
      };
    }
  }

  /**
   * Get book information from blockchain
   */
  async getBook(bookId: string): Promise<BookTraceabilityRecord | null> {
    if (!this.contract) {
      throw new Error('Contrato no inicializado. Conecta tu wallet primero.');
    }

    try {
      const book: ContractBook = await this.contract.getBook(bookId);

      // Check if book exists (bookId will be empty string if not found)
      if (!book.bookId || book.bookId === '') {
        return null;
      }

      // Get transfer history
      const transfers = await this.getTransferHistory(bookId);

      // Extract previous owners from transfer history
      const previousOwners = transfers.map(t => t.from).filter((owner, index, self) =>
        owner !== ethers.ZeroAddress && self.indexOf(owner) === index
      );

      return {
        bookId: book.bookId,
        title: book.title,
        currentOwner: book.currentOwner,
        previousOwners,
        transactionHistory: transfers,
        registeredAt: Number(book.registrationTime) * 1000, // Convert to milliseconds
        lastUpdated: transfers.length > 0 ? transfers[transfers.length - 1].timestamp : Number(book.registrationTime) * 1000
      };
    } catch (error: any) {
      console.error('Error obteniendo libro:', error);
      throw new Error(`Error al obtener información del libro: ${error.message}`);
    }
  }

  /**
   * Get transfer history for a book
   */
  async getTransferHistory(bookId: string): Promise<TransactionRecord[]> {
    if (!this.contract) {
      throw new Error('Contrato no inicializado. Conecta tu wallet primero.');
    }

    try {
      const transfers: ContractTransfer[] = await this.contract.getTransferHistory(bookId);

      return transfers.map((transfer, index) => ({
        transactionHash: '', // Not available from contract, would need to query events
        blockNumber: 0, // Not available from contract, would need to query events
        timestamp: Number(transfer.timestamp) * 1000, // Convert to milliseconds
        from: transfer.from,
        to: transfer.to,
        transactionType: 'transfer' as const,
        metadata: { transferIndex: index }
      }));
    } catch (error: any) {
      console.error('Error obteniendo historial:', error);
      return [];
    }
  }

  /**
   * Verify book ownership
   */
  async verifyOwnership(bookId: string, ownerAddress: string): Promise<boolean> {
    if (!this.contract) {
      throw new Error('Contrato no inicializado. Conecta tu wallet primero.');
    }

    try {
      // Validate address
      if (!ethers.isAddress(ownerAddress)) {
        throw new Error('Dirección inválida');
      }

      const isOwner: boolean = await this.contract.verifyOwnership(bookId, ownerAddress);
      return isOwner;
    } catch (error: any) {
      console.error('Error verificando propiedad:', error);
      throw new Error(`Error al verificar propiedad: ${error.message}`);
    }
  }

  /**
   * Get all books owned by an address
   */
  async getBooksByOwner(ownerAddress: string): Promise<string[]> {
    if (!this.contract) {
      throw new Error('Contrato no inicializado. Conecta tu wallet primero.');
    }

    try {
      // Validate address
      if (!ethers.isAddress(ownerAddress)) {
        throw new Error('Dirección inválida');
      }

      const bookIds: string[] = await this.contract.getBooksByOwner(ownerAddress);
      return bookIds;
    } catch (error: any) {
      console.error('Error obteniendo libros del propietario:', error);
      throw new Error(`Error al obtener libros: ${error.message}`);
    }
  }

  /**
   * Get total number of books registered
   */
  async getTotalBooks(): Promise<number> {
    if (!this.contract) {
      throw new Error('Contrato no inicializado. Conecta tu wallet primero.');
    }

    try {
      const total: bigint = await this.contract.totalBooks();
      return Number(total);
    } catch (error: any) {
      console.error('Error obteniendo total de libros:', error);
      throw new Error(`Error al obtener total de libros: ${error.message}`);
    }
  }

  /**
   * Listen to BookRegistered events
   */
  async onBookRegistered(callback: (bookId: string, title: string, owner: string, timestamp: number) => void): Promise<void> {
    if (!this.contract) {
      throw new Error('Contrato no inicializado');
    }

    this.contract.on('BookRegistered', (bookId, title, owner, timestamp) => {
      callback(bookId, title, owner, Number(timestamp));
    });
  }

  /**
   * Listen to BookTransferred events
   */
  async onBookTransferred(callback: (bookId: string, from: string, to: string, timestamp: number) => void): Promise<void> {
    if (!this.contract) {
      throw new Error('Contrato no inicializado');
    }

    this.contract.on('BookTransferred', (bookId, from, to, timestamp) => {
      callback(bookId, from, to, Number(timestamp));
    });
  }

  /**
   * Disconnect and cleanup
   */
  disconnect(): void {
    if (this.contract) {
      this.contract.removeAllListeners();
    }
    this.contract = null;
    this.signer = null;
    this.provider = null;
  }
}

export const bookContractService = new BookContractService();
export default bookContractService;
