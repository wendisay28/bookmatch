/**
 * React Hook for Book Traceability Smart Contract
 * LATIN HACK - Passet Hub Integration
 */

import { useState, useEffect, useCallback } from 'react';
import { bookContractService, EVMAccount } from '../services/bookContract.service';
import type { BookTraceabilityRecord } from '../types/blockchain.types';

export interface UseBookContractState {
  // Connection state
  isConnected: boolean;
  isConnecting: boolean;
  account: EVMAccount | null;
  error: string | null;

  // Actions
  connectWallet: () => Promise<void>;
  disconnect: () => void;

  // Book operations
  registerBook: (bookId: string, title: string) => Promise<{ success: boolean; transactionHash?: string; error?: string }>;
  transferOwnership: (bookId: string, newOwner: string) => Promise<{ success: boolean; transactionHash?: string; error?: string }>;
  getBook: (bookId: string) => Promise<BookTraceabilityRecord | null>;
  verifyOwnership: (bookId: string, ownerAddress: string) => Promise<boolean>;
  getMyBooks: () => Promise<string[]>;
  getTotalBooks: () => Promise<number>;

  // Loading states
  isLoading: boolean;
}

export const useBookContract = (): UseBookContractState => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [account, setAccount] = useState<EVMAccount | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Check if wallet is already connected on mount
   */
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const currentAccount = await bookContractService.getCurrentAccount();
        if (currentAccount) {
          setAccount(currentAccount);
          setIsConnected(true);
        }
      } catch (err) {
        // Silently fail - user not connected
      }
    };

    checkConnection();
  }, []);

  /**
   * Connect to MetaMask wallet
   */
  const connectWallet = useCallback(async () => {
    setIsConnecting(true);
    setError(null);

    try {
      const connectedAccount = await bookContractService.connectWallet();
      setAccount(connectedAccount);
      setIsConnected(true);
    } catch (err: any) {
      console.error('Error conectando wallet:', err);
      setError(err.message);
      setIsConnected(false);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  /**
   * Disconnect wallet
   */
  const disconnect = useCallback(() => {
    bookContractService.disconnect();
    setAccount(null);
    setIsConnected(false);
    setError(null);
  }, []);

  /**
   * Register a new book
   */
  const registerBook = useCallback(async (bookId: string, title: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await bookContractService.registerBook(bookId, title);
      if (!result.success && result.error) {
        setError(result.error);
      }
      return result;
    } catch (err: any) {
      const errorMsg = err.message || 'Error al registrar libro';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Transfer book ownership
   */
  const transferOwnership = useCallback(async (bookId: string, newOwner: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await bookContractService.transferOwnership(bookId, newOwner);
      if (!result.success && result.error) {
        setError(result.error);
      }
      return result;
    } catch (err: any) {
      const errorMsg = err.message || 'Error al transferir propiedad';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Get book information
   */
  const getBook = useCallback(async (bookId: string): Promise<BookTraceabilityRecord | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const book = await bookContractService.getBook(bookId);
      return book;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Verify book ownership
   */
  const verifyOwnership = useCallback(async (bookId: string, ownerAddress: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const isOwner = await bookContractService.verifyOwnership(bookId, ownerAddress);
      return isOwner;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Get books owned by current account
   */
  const getMyBooks = useCallback(async (): Promise<string[]> => {
    if (!account) {
      setError('No hay cuenta conectada');
      return [];
    }

    setIsLoading(true);
    setError(null);

    try {
      const bookIds = await bookContractService.getBooksByOwner(account.address);
      return bookIds;
    } catch (err: any) {
      setError(err.message);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [account]);

  /**
   * Get total number of books
   */
  const getTotalBooks = useCallback(async (): Promise<number> => {
    setIsLoading(true);
    setError(null);

    try {
      const total = await bookContractService.getTotalBooks();
      return total;
    } catch (err: any) {
      setError(err.message);
      return 0;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    // State
    isConnected,
    isConnecting,
    account,
    error,
    isLoading,

    // Actions
    connectWallet,
    disconnect,
    registerBook,
    transferOwnership,
    getBook,
    verifyOwnership,
    getMyBooks,
    getTotalBooks
  };
};

export default useBookContract;
