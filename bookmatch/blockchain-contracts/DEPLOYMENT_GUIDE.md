# 🚀 Guía de Despliegue - BookMatch Smart Contracts

## ✅ Estado Actual del Proyecto

- **Smart Contract**: BookTraceability.sol ✅ Compilado
- **Tests**: 18/18 pasando ✅ 100% success
- **Red objetivo**: Passet Hub Testnet (Polkadot)
- **Framework**: Hardhat + kitdot

---

## 📋 Prerrequisitos

### 1. Instalar Metamask o Polkadot.js Extension

**Opción A: Metamask (Recomendado para facilidad)**
- Descargar: https://metamask.io/download/
- Crear una wallet nueva o importar una existente

**Opción B: Polkadot.js Extension**
- Chrome: https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd
- Firefox: https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/

### 2. Configurar Passet Hub Testnet en Metamask

Añade esta red manualmente en Metamask:

```
Network Name: Passet Hub Testnet
RPC URL: https://testnet-passet-hub-eth-rpc.polkadot.io
Chain ID: 420420422
Currency Symbol: PAS
Block Explorer: https://polkadot.js.org/apps/?rpc=wss://passet-hub-paseo.ibp.network#/explorer
```

### 3. Obtener Tokens de Testnet (PAS)

**IMPORTANTE**: Necesitas tokens PAS para pagar el gas de las transacciones

1. Ve al faucet de Paseo: https://faucet.polkadot.io/paseo
2. Pega tu dirección de wallet (desde Metamask o Polkadot.js)
3. Solicita tokens (recibirás ~0.1 PAS)
4. Espera ~1-2 minutos para que lleguen

### 4. Exportar Private Key

**Desde Metamask**:
1. Click en los 3 puntos → Detalles de la cuenta
2. Exportar clave privada
3. Ingresa tu contraseña
4. Copia la clave privada (comienza con 0x...)

**⚠️ IMPORTANTE**: NUNCA compartas tu private key. NUNCA la subas a git.

---

## 🔧 Configuración del Proyecto

### 1. Navegar al directorio de contracts

```bash
cd /Users/wendynieto/hackaton/bookmatch/blockchain-contracts/contracts
```

### 2. Configurar la Private Key

Edita el archivo `.env`:

```bash
nano .env
```

Añade tu private key:

```env
PRIVATE_KEY=0x1234567890abcdef...  # Tu private key aquí
```

Guarda el archivo (Ctrl+O, Enter, Ctrl+X)

### 3. Verificar que tienes fondos

```bash
# Opcional: verificar balance
npx hardhat console --network passetHubTestnet
```

```javascript
// En la consola de Hardhat:
const [deployer] = await ethers.getSigners();
const balance = await ethers.provider.getBalance(deployer.address);
console.log("Balance:", ethers.formatEther(balance), "PAS");
.exit
```

---

## 🚀 Desplegar el Contrato

### Opción 1: Despliegue Rápido (Recomendado)

```bash
npx hardhat ignition deploy ./ignition/modules/BookTraceability.ts --network passetHubTestnet
```

### Opción 2: Despliegue con Verificación

```bash
npx hardhat ignition deploy ./ignition/modules/BookTraceability.ts --network passetHubTestnet --verify
```

### ¿Qué esperar?

Verás algo como esto:

```
✔ Confirm deploy to network passetHubTestnet (420420422)? … yes
Hardhat Ignition 🚀

Deploying [ BookTraceabilityModule ]

Batch #1
  Executed BookTraceabilityModule#BookTraceability

[ BookTraceabilityModule ] successfully deployed 🚀

Deployed Addresses

BookTraceabilityModule#BookTraceability - 0x1234567890AbcdEF1234567890AbcdEF12345678
```

**GUARDA ESTA DIRECCIÓN** - Es la dirección de tu smart contract desplegado!

---

## 📝 Después del Despliegue

### 1. Guardar la Dirección del Contrato

Crea un archivo con la información del deployment:

```bash
echo "BOOK_TRACEABILITY_CONTRACT=0xTU_DIRECCION_AQUI" >> deployment.txt
```

### 2. Actualizar la Configuración del Frontend

Ve a `/Users/wendynieto/hackaton/bookmatch/frontend/src/config/polkadot.config.ts`:

```typescript
export const POLKADOT_CONFIG = {
  // ...
  CONTRACTS: {
    BOOK_TRACEABILITY: '0xTU_DIRECCION_AQUI',  // Actualiza esto
    OWNERSHIP_REGISTRY: ''
  }
}
```

### 3. Verificar el Contrato en el Explorer

1. Ve a: https://polkadot.js.org/apps/?rpc=wss://passet-hub-paseo.ibp.network#/explorer
2. Busca tu dirección del contrato
3. Verifica que aparezca el deployment

---

## 🧪 Probar el Contrato Desplegado

### Usando Hardhat Console

```bash
npx hardhat console --network passetHubTestnet
```

```javascript
const BookTraceability = await ethers.getContractFactory("BookTraceability");
const contract = BookTraceability.attach("0xTU_DIRECCION_AQUI");

// Registrar un libro de prueba
const tx = await contract.registerBook(
  "test-book-001",
  "978-1234567890",
  "Test Book",
  "Test Author",
  JSON.stringify({ condition: "new" })
);

await tx.wait();
console.log("Book registered! Transaction:", tx.hash);

// Ver información del libro
const bookInfo = await contract.getBook("test-book-001");
console.log("Book info:", bookInfo);

// Ver total de libros
const total = await contract.getTotalBooks();
console.log("Total books:", total.toString());
```

---

## 🔍 Troubleshooting

### Error: "insufficient funds"
- Verifica que tengas tokens PAS en tu wallet
- Solicita más del faucet si es necesario

### Error: "nonce too low"
- El nonce de tu wallet está desincronizado
- Solución: Reset account en Metamask

### Error: "Failed to connect to network"
- Verifica tu conexión a internet
- Prueba con un endpoint alternativo en hardhat.config.ts

### Error: "Contract already deployed"
- Elimina el directorio: `rm -rf ignition/deployments`
- Vuelve a desplegar

---

## 📊 Información del Contrato

### Funciones Principales

```solidity
// Registrar un libro
registerBook(bookId, isbn, title, author, metadata)

// Transferir propiedad
transferOwnership(bookId, newOwner, notes)

// Obtener información del libro
getBook(bookId)

// Ver historial de transferencias
getTransferHistory(bookId)

// Verificar propiedad
verifyOwnership(bookId, address)

// Ver libros de un propietario
getBooksByOwner(ownerAddress)

// Actualizar metadata
updateMetadata(bookId, newMetadata)
```

### Events Emitidos

```solidity
BookRegistered(bookIdHash, bookId, title, owner, timestamp)
BookOwnershipTransferred(bookIdHash, bookId, from, to, timestamp)
BookMetadataUpdated(bookIdHash, bookId, updatedBy, timestamp)
```

---

## 🎯 Próximos Pasos

1. ✅ Desplegar contrato en testnet
2. ⏳ Integrar con el frontend de BookMatch
3. ⏳ Actualizar polkadot.service.ts para usar el contrato
4. ⏳ Crear componentes UI para interactuar
5. ⏳ Testing end-to-end

---

## 📚 Recursos

- **Hardhat Docs**: https://hardhat.org/docs
- **Polkadot Smart Contracts**: https://docs.polkadot.com/develop/smart-contracts/
- **Passet Hub**: https://polkadot.js.org/apps/?rpc=wss://passet-hub-paseo.ibp.network
- **Faucet**: https://faucet.polkadot.io/paseo
- **kitdot**: https://github.com/polkadot-cloud/kitdot

---

**📅 Creado para LATIN HACK 2025**
**🏗️ BookMatch Platform - Sistema de Trazabilidad de Libros**
