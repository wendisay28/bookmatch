/**
 * Blockchain Context Provider
 * LATIN HACK - Polkadot/Paseo Integration
 */

import React, { createContext, useContext, ReactNode } from 'react';
import { usePolkadot } from '../hooks/usePolkadot';
import type { PolkadotAccount, BlockchainConnectionState } from '../types/blockchain.types';

interface BlockchainContextType {
  // Connection state
  isConnected: boolean;
  isConnecting: boolean;
  account: PolkadotAccount | null;
  accounts: PolkadotAccount[];
  chainInfo: BlockchainConnectionState['chainInfo'];
  error: string | null;

  // Actions
  connect: () => Promise<any>;
  disconnect: () => Promise<void>;
  enableExtension: () => Promise<PolkadotAccount[]>;
  selectAccount: (account: PolkadotAccount) => void;
  getBalance: (address?: string) => Promise<string>;
  registerBook: (bookData: {
    bookId: string;
    isbn?: string;
    title: string;
    author: string;
    metadata?: Record<string, any>;
  }) => Promise<{ success: boolean; transactionHash?: string; error?: string }>;
  transferOwnership: (bookId: string, newOwnerAddress: string) => Promise<{ success: boolean; transactionHash?: string; error?: string }>;
  getBookTraceability: (bookId: string) => Promise<any>;
  verifyOwnership: (bookId: string, address?: string) => Promise<any>;
}

const BlockchainContext = createContext<BlockchainContextType | undefined>(undefined);

export const BlockchainProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const polkadot = usePolkadot();

  return (
    <BlockchainContext.Provider value={polkadot}>
      {children}
    </BlockchainContext.Provider>
  );
};

export const useBlockchain = () => {
  const context = useContext(BlockchainContext);
  if (context === undefined) {
    throw new Error('useBlockchain must be used within a BlockchainProvider');
  }
  return context;
};

export default BlockchainContext;
