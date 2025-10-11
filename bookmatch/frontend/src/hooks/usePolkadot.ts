/**
 * Custom Hook for Polkadot Integration
 * LATIN HACK - Paseo Testnet
 */

import { useState, useEffect, useCallback } from 'react';
import polkadotService from '../services/polkadot.service';
import type { PolkadotAccount, BlockchainConnectionState } from '../types/blockchain.types';

export const usePolkadot = () => {
  const [connectionState, setConnectionState] = useState<BlockchainConnectionState>({
    isConnected: false,
    isConnecting: false,
    account: null,
    chainInfo: null,
    error: null
  });

  const [accounts, setAccounts] = useState<PolkadotAccount[]>([]);

  /**
   * Connect to Paseo Testnet
   */
  const connect = useCallback(async () => {
    setConnectionState(prev => ({ ...prev, isConnecting: true, error: null }));

    try {
      const api = await polkadotService.connect();
      const chainInfo = await polkadotService.getChainInfo();
      const blockNumber = await polkadotService.getCurrentBlockNumber();

      setConnectionState(prev => ({
        ...prev,
        isConnected: true,
        isConnecting: false,
        chainInfo: {
          name: chainInfo.chain,
          version: chainInfo.nodeVersion,
          blockNumber
        },
        error: null
      }));

      return api;
    } catch (error: any) {
      setConnectionState(prev => ({
        ...prev,
        isConnected: false,
        isConnecting: false,
        error: error.message || 'Failed to connect to Paseo Testnet'
      }));
      throw error;
    }
  }, []);

  /**
   * Disconnect from the network
   */
  const disconnect = useCallback(async () => {
    try {
      await polkadotService.disconnect();
      setConnectionState({
        isConnected: false,
        isConnecting: false,
        account: null,
        chainInfo: null,
        error: null
      });
      setAccounts([]);
    } catch (error: any) {
      console.error('Error disconnecting:', error);
    }
  }, []);

  /**
   * Enable Polkadot extension and get accounts
   */
  const enableExtension = useCallback(async () => {
    try {
      const extensionAccounts = await polkadotService.enableExtension('BookMatch');
      setAccounts(extensionAccounts);
      return extensionAccounts;
    } catch (error: any) {
      setConnectionState(prev => ({
        ...prev,
        error: error.message || 'Failed to enable Polkadot extension'
      }));
      throw error;
    }
  }, []);

  /**
   * Select an account to use
   */
  const selectAccount = useCallback((account: PolkadotAccount) => {
    setConnectionState(prev => ({
      ...prev,
      account,
      error: null
    }));
  }, []);

  /**
   * Get account balance
   */
  const getBalance = useCallback(async (address?: string) => {
    const targetAddress = address || connectionState.account?.address;

    if (!targetAddress) {
      throw new Error('No account address provided');
    }

    try {
      const balance = await polkadotService.getBalance(targetAddress);
      return balance;
    } catch (error: any) {
      console.error('Error getting balance:', error);
      throw error;
    }
  }, [connectionState.account]);

  /**
   * Register a book on the blockchain
   */
  const registerBook = useCallback(async (bookData: {
    bookId: string;
    isbn?: string;
    title: string;
    author: string;
    metadata?: Record<string, any>;
  }) => {
    if (!connectionState.account) {
      throw new Error('No account selected. Please connect your wallet first.');
    }

    if (!connectionState.isConnected) {
      throw new Error('Not connected to Paseo Testnet. Please connect first.');
    }

    try {
      const result = await polkadotService.registerBook(connectionState.account, bookData);
      return result;
    } catch (error: any) {
      console.error('Error registering book:', error);
      throw error;
    }
  }, [connectionState.account, connectionState.isConnected]);

  /**
   * Transfer book ownership
   */
  const transferOwnership = useCallback(async (bookId: string, newOwnerAddress: string) => {
    if (!connectionState.account) {
      throw new Error('No account selected. Please connect your wallet first.');
    }

    if (!connectionState.isConnected) {
      throw new Error('Not connected to Paseo Testnet. Please connect first.');
    }

    try {
      const result = await polkadotService.transferOwnership(
        connectionState.account,
        bookId,
        newOwnerAddress
      );
      return result;
    } catch (error: any) {
      console.error('Error transferring ownership:', error);
      throw error;
    }
  }, [connectionState.account, connectionState.isConnected]);

  /**
   * Get book traceability
   */
  const getBookTraceability = useCallback(async (bookId: string) => {
    if (!connectionState.isConnected) {
      throw new Error('Not connected to Paseo Testnet. Please connect first.');
    }

    try {
      const traceability = await polkadotService.getBookTraceability(bookId);
      return traceability;
    } catch (error: any) {
      console.error('Error getting book traceability:', error);
      throw error;
    }
  }, [connectionState.isConnected]);

  /**
   * Verify book ownership
   */
  const verifyOwnership = useCallback(async (bookId: string, address?: string) => {
    if (!connectionState.isConnected) {
      throw new Error('Not connected to Paseo Testnet. Please connect first.');
    }

    const targetAddress = address || connectionState.account?.address;
    if (!targetAddress) {
      throw new Error('No address provided for verification');
    }

    try {
      const proof = await polkadotService.verifyOwnership(bookId, targetAddress);
      return proof;
    } catch (error: any) {
      console.error('Error verifying ownership:', error);
      throw error;
    }
  }, [connectionState.isConnected, connectionState.account]);

  /**
   * Auto-connect on mount if previously connected
   */
  useEffect(() => {
    const autoConnect = async () => {
      const wasConnected = localStorage.getItem('polkadot_connected');
      if (wasConnected === 'true') {
        try {
          await connect();
        } catch (error) {
          console.log('Auto-connect failed, user needs to manually connect');
        }
      }
    };

    autoConnect();
  }, [connect]);

  /**
   * Save connection state to localStorage
   */
  useEffect(() => {
    localStorage.setItem('polkadot_connected', String(connectionState.isConnected));
  }, [connectionState.isConnected]);

  return {
    // Connection state
    isConnected: connectionState.isConnected,
    isConnecting: connectionState.isConnecting,
    account: connectionState.account,
    accounts,
    chainInfo: connectionState.chainInfo,
    error: connectionState.error,

    // Actions
    connect,
    disconnect,
    enableExtension,
    selectAccount,
    getBalance,
    registerBook,
    transferOwnership,
    getBookTraceability,
    verifyOwnership
  };
};

export default usePolkadot;
