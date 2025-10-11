/**
 * Polkadot Configuration for Paseo Testnet
 * LATIN HACK - Blockchain Traceability System
 */

export const POLKADOT_CONFIG = {
  // Passet Hub Testnet Configuration (EVM-compatible - LATIN HACK)
  PASSET_HUB_TESTNET: {
    name: 'Passet Hub Testnet',
    chainId: 420420422,
    rpcUrl: 'https://testnet-passet-hub-eth-rpc.polkadot.io',
    wsProvider: 'wss://passet-hub-paseo.ibp.network',
    explorerUrl: 'https://polkadot.js.org/apps/?rpc=wss://passet-hub-paseo.ibp.network',
    decimals: 18,
    symbol: 'PAS',
    type: 'EVM' as const
  },

  // Paseo Testnet Configuration (Substrate - Alternative)
  PASEO_TESTNET: {
    name: 'Paseo Testnet',
    wsProvider: 'wss://paseo.rpc.amforc.com',
    // Alternative endpoints
    alternativeEndpoints: [
      'wss://paseo-rpc.dwellir.com',
      'wss://rpc.ibp.network/paseo'
    ],
    explorerUrl: 'https://polkadot.js.org/apps/?rpc=wss://paseo.rpc.amforc.com#/explorer',
    decimals: 10,
    symbol: 'PAS',
    ss58Format: 0,
    type: 'Substrate' as const
  },

  // Connection settings
  CONNECTION: {
    timeout: 30000, // 30 seconds
    reconnectDelay: 5000, // 5 seconds
    maxReconnectAttempts: 5
  },

  // Smart contract addresses - DEPLOYED
  CONTRACTS: {
    // BookTraceabilitySimple - Deployed on Passet Hub (Solidity)
    BOOK_TRACEABILITY: '0x37eaf6a2Fa55cB50d4Bf3E7bDc2f89850a396bEF',
    DEPLOYER: '0xDE94D2946FdaE49DF266D7198a638B4079bD28E1'
  }
} as const;

export type PolkadotNetwork = typeof POLKADOT_CONFIG.PASSET_HUB_TESTNET | typeof POLKADOT_CONFIG.PASEO_TESTNET;
