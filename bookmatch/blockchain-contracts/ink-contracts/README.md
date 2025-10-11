# BookTraceability - ink! Smart Contract

## 📋 Overview

This is the **native Polkadot smart contract** for BookMatch's book traceability system, written in **ink!** (Rust). It runs on **Paseo Testnet**.

## ✅ Why ink! instead of Solidity?

We switched from Solidity/EVM to ink! because:
- ✅ Native Polkadot integration
- ✅ Works with existing PAS tokens on Paseo Testnet
- ✅ Lower gas costs
- ✅ Better for LATIN HACK demonstration
- ✅ No address format conversion needed

## 🏗️ Features

### Core Functionality
- ✅ Register books on-chain
- ✅ Transfer ownership between users
- ✅ Query book information
- ✅ View complete transfer history
- ✅ Verify ownership
- ✅ Update metadata
- ✅ Pausable for emergencies

### Contract Functions

#### Write Functions (Require Gas)
```rust
register_book(book_id, isbn, title, author, metadata) → Result<()>
transfer_ownership(book_id, new_owner, notes) → Result<()>
update_metadata(book_id, metadata) → Result<()>
pause() → Result<()>  // Only contract owner
unpause() → Result<()>  // Only contract owner
```

#### Read Functions (Free)
```rust
get_book(book_id) → Option<Book>
get_transfer_history(book_id) → Vec<Transfer>
get_books_by_owner(owner) → Vec<String>
verify_ownership(book_id, address) → bool
get_total_books() → u32
is_paused() → bool
```

### Events
```rust
BookRegistered { book_id, owner, title, timestamp }
BookOwnershipTransferred { book_id, from, to, timestamp }
BookMetadataUpdated { book_id, updated_by, timestamp }
```

## 🚀 Build & Deploy

### Prerequisites
- Rust & Cargo installed
- cargo-contract installed
- Polkadot.js Extension with account on Paseo
- PAS tokens on Paseo Testnet

### Build the Contract
```bash
cd /Users/wendynieto/hackaton/bookmatch/blockchain-contracts/ink-contracts

# Build the contract
cargo contract build --release
```

This generates:
- `target/ink/book_traceability.contract` - The deployable bundle
- `target/ink/book_traceability.wasm` - The WASM code
- `target/ink/metadata.json` - Contract ABI/metadata

### Deploy to Paseo Testnet

#### Option 1: Using Contracts UI (Recommended for Hackathon Demo)
1. Go to https://contracts-ui.substrate.io/
2. Connect to Paseo: `wss://paseo.rpc.amforc.com`
3. Connect your Polkadot.js wallet
4. Click "Upload a new contract"
5. Select `book_traceability.contract`
6. Deploy!

#### Option 2: Using cargo-contract CLI
```bash
cargo contract instantiate \
  --constructor new \
  --suri "YOUR_SEED_PHRASE" \
  --url wss://paseo.rpc.amforc.com \
  --execute
```

### Test the Contract
```bash
cargo test
```

## 📦 Integration with Frontend

After deploying, you'll get a **contract address**. Update the frontend:

### 1. Install Dependencies
```bash
cd ../../bookmatch/frontend
npm install @polkadot/api-contract
```

### 2. Copy Contract Metadata
```bash
cp /path/to/ink-contracts/target/ink/metadata.json \
   src/config/book_traceability.json
```

### 3. Update Frontend Service
The contract address and metadata will be used in `src/services/polkadot.service.ts`

## 🧪 Testing

Run the built-in tests:
```bash
cargo test
```

Tests include:
- ✅ Contract initialization
- ✅ Book registration
- ✅ Duplicate prevention
- ✅ Ownership transfer
- ✅ Access control

## 📊 Contract Comparison

### Solidity (Previous)
- Network: Passet Hub Testnet (EVM)
- Language: Solidity
- Gas: Higher (EVM overhead)
- Address: 0x... format

### ink! (Current)
- Network: Paseo Testnet (Native)
- Language: Rust
- Gas: Lower (native WASM)
- Address: SS58 format (13sHsk...)

## 🎯 For LATIN HACK Demo

### Demo Script:
1. **Show Contract on Polkadot.js Apps**
   - https://polkadot.js.org/apps/?rpc=wss://paseo.rpc.amforc.com#/contracts

2. **Register a Book**
   - Connect wallet
   - Call `register_book()`
   - Show transaction in block explorer

3. **Transfer Ownership**
   - Call `transfer_ownership()`
   - Verify with `verify_ownership()`

4. **View History**
   - Call `get_transfer_history()`
   - Show immutable trail

## 📚 Resources

- **ink! Docs**: https://use.ink/
- **Paseo Testnet**: https://polkadot.js.org/apps/?rpc=wss://paseo.rpc.amforc.com
- **Faucet**: https://faucet.polkadot.io/paseo
- **Contracts UI**: https://contracts-ui.substrate.io/

## 🐛 Troubleshooting

### Build Errors
```bash
# Update Rust
rustup update

# Add WASM target
rustup target add wasm32-unknown-unknown

# Add rust-src
rustup component add rust-src
```

### Deployment Errors
- Ensure you have PAS tokens
- Check your account is on Paseo network
- Verify RPC endpoint is accessible

---

**Made with ❤️ for LATIN HACK 2025**
