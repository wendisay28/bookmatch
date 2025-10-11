# 🚀 Contrato Desplegado - BookMatch

## ✅ Información del Despliegue

### **Red:**
- **Nombre**: Passet Hub Testnet (Polkadot Ecosystem)
- **Chain ID**: 420420422
- **RPC URL**: https://testnet-passet-hub-eth-rpc.polkadot.io
- **Explorer**: https://polkadot.js.org/apps/?rpc=wss://passet-hub-paseo.ibp.network

### **Contrato:**
- **Nombre**: BookTraceabilitySimple
- **Dirección**: `0x37eaf6a2Fa55cB50d4Bf3E7bDc2f89850a396bEF`
- **Deployer**: `0xDE94D2946FdaE49DF266D7198a638B4079bD28E1`
- **Lenguaje**: Solidity ^0.8.28
- **Fecha**: 10 de Octubre 2025

### **ABI Location:**
```
/blockchain-contracts/contracts/artifacts/contracts/BookTraceabilitySimple.sol/BookTraceabilitySimple.json
```

---

## 📋 Funciones Disponibles

### **Write Functions (Requieren gas)**

#### 1. `registerBook(string bookId, string title)`
Registra un nuevo libro en la blockchain.

**Parámetros:**
- `bookId`: ID único del libro (ej: "book-001")
- `title`: Título del libro

**Ejemplo:**
```javascript
await contract.registerBook("book-001", "Cien Años de Soledad");
```

#### 2. `transferOwnership(string bookId, address newOwner)`
Transfiere la propiedad de un libro a otro usuario.

**Parámetros:**
- `bookId`: ID del libro
- `newOwner`: Dirección del nuevo dueño

**Ejemplo:**
```javascript
await contract.transferOwnership("book-001", "0x...");
```

---

### **Read Functions (Gratis, sin gas)**

#### 1. `getBook(string bookId)` → Book
Obtiene información de un libro.

**Retorna:**
```solidity
struct Book {
    string bookId;
    string title;
    address currentOwner;
    uint256 registrationTime;
}
```

#### 2. `getTransferHistory(string bookId)` → Transfer[]
Obtiene el historial completo de transferencias.

**Retorna:**
```solidity
struct Transfer {
    address from;
    address to;
    uint256 timestamp;
}
```

#### 3. `verifyOwnership(string bookId, address owner)` → bool
Verifica si una dirección es dueña de un libro.

#### 4. `getBooksByOwner(address owner)` → string[]
Obtiene todos los libros de un propietario.

#### 5. `totalBooks()` → uint256
Obtiene el total de libros registrados.

---

## 🧪 Probar el Contrato

### **Opción 1: Remix IDE**
1. Ve a https://remix.ethereum.org/
2. Carga el ABI de `BookTraceabilitySimple.json`
3. Conecta a Passet Hub Testnet con Metamask
4. Usa la dirección: `0x37eaf6a2Fa55cB50d4Bf3E7bDc2f89850a396bEF`

### **Opción 2: Hardhat Console**
```bash
npx hardhat console --network passetHubTestnet
```

```javascript
const Contract = await ethers.getContractFactory("BookTraceabilitySimple");
const contract = Contract.attach("0x37eaf6a2Fa55cB50d4Bf3E7bDc2f89850a396bEF");

// Registrar libro
await contract.registerBook("book-001", "Mi Primer Libro");

// Ver libro
const book = await contract.getBook("book-001");
console.log(book);
```

### **Opción 3: Frontend (React + ethers.js)**
```javascript
import { ethers } from 'ethers';
import ABI from './BookTraceabilitySimple.json';

const CONTRACT_ADDRESS = "0x37eaf6a2Fa55cB50d4Bf3E7bDc2f89850a396bEF";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI.abi, signer);

// Registrar libro
await contract.registerBook("book-001", "Título del Libro");
```

---

## 📊 Eventos Emitidos

### `BookRegistered`
```solidity
event BookRegistered(
    string indexed bookId,
    string title,
    address indexed owner,
    uint256 timestamp
);
```

### `BookTransferred`
```solidity
event BookTransferred(
    string indexed bookId,
    address indexed from,
    address indexed to,
    uint256 timestamp
);
```

---

## 🔗 Links Útiles

- **Explorar Contrato**: https://polkadot.js.org/apps/?rpc=wss://passet-hub-paseo.ibp.network#/contracts
- **Faucet Paseo**: https://faucet.polkadot.io/paseo
- **Documentación Passet Hub**: https://docs.polkadot.com/develop/smart-contracts/

---

## 📝 Notas Importantes

### Por qué "Simple"?
Esta es una versión simplificada del contrato original para cumplir con el límite de tamaño de bytecode de Passet Hub (max ~100KB initcode).

Funcionalidades removidas vs versión completa:
- ❌ Campos: ISBN, author, metadata detallada
- ❌ Sistema pausable
- ❌ Funciones de owner
- ❌ Optimización de mappings (no elimina del owner anterior)

Mantiene las funciones core:
- ✅ Registro de libros
- ✅ Transferencia de propiedad
- ✅ Historial inmutable
- ✅ Verificación de ownership
- ✅ Eventos completos

---

**🎉 Contrato listo para integrar en el frontend de BookMatch!**

**Para LATIN HACK:**
- ✅ Desplegado en Passet Hub (ecosistema Paseo)
- ✅ Usando Solidity (recomendado)
- ✅ Completamente funcional
- ✅ Integración lista con React/ethers.js
