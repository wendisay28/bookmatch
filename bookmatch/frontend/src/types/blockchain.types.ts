/**
 * Blockchain Types for Book Traceability System
 * LATIN HACK - Polkadot Integration
 */

export interface PolkadotAccount {
  address: string;
  meta: {
    name?: string;
    source: string;
  };
  type?: string;
}

export interface BookTraceabilityRecord {
  bookId: string;
  isbn?: string;
  title: string;
  author?: string; // Optional for simplified contract
  currentOwner: string;
  previousOwners: string[];
  transactionHistory: TransactionRecord[];
  registeredAt: number;
  lastUpdated: number;
  metadata?: {
    condition?: 'new' | 'like_new' | 'good' | 'fair' | 'poor';
    edition?: string;
    publisher?: string;
    notes?: string;
  };
}

export interface TransactionRecord {
  transactionHash: string;
  blockNumber: number;
  timestamp: number;
  from: string;
  to: string;
  transactionType: 'register' | 'transfer' | 'update' | 'verify';
  metadata?: Record<string, any>;
}

export interface BookOwnershipProof {
  bookId: string;
  owner: string;
  proofHash: string;
  verifiedAt: number;
  blockNumber: number;
}

export interface BlockchainConnectionState {
  isConnected: boolean;
  isConnecting: boolean;
  account: PolkadotAccount | null;
  chainInfo: {
    name: string;
    version: string;
    blockNumber?: number;
  } | null;
  error: string | null;
}

export type TraceabilityEventType =
  | 'BookRegistered'
  | 'OwnershipTransferred'
  | 'MetadataUpdated'
  | 'OwnershipVerified';

export interface TraceabilityEvent {
  type: TraceabilityEventType;
  bookId: string;
  data: Record<string, any>;
  timestamp: number;
  blockNumber: number;
  transactionHash: string;
}
