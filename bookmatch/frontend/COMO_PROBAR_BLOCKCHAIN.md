# 🚀 Cómo Probar la Integración Blockchain - Guía Rápida

## ⚡ Inicio Rápido (5 minutos)

### 1. Instalar Dependencias (si no está hecho)
```bash
cd /Users/wendynieto/hackaton/bookmatch/frontend
npm install
```

### 2. Agregar Componente Demo a tu App

**Opción A: En App.tsx (Temporal para Pruebas)**

Abre `/frontend/src/App.tsx` y agrega:

```typescript
import { BookContractDemo } from './components/blockchain/BookContractDemo';

function App() {
  return (
    <div>
      {/* Tu contenido actual */}

      {/* DEMO BLOCKCHAIN - Agregar temporalmente */}
      <BookContractDemo />
    </div>
  );
}
```

**Opción B: Crear Página Nueva**

Crea `/frontend/src/pages/BlockchainTestPage.tsx`:

```typescript
import React from 'react';
import { BookContractDemo } from '../components/blockchain/BookContractDemo';

export const BlockchainTestPage: React.FC = () => {
  return <BookContractDemo />;
};
```

Y agrégala a tus rutas.

### 3. Iniciar el Servidor
```bash
npm start
```

### 4. Preparar MetaMask

1. **Instala MetaMask** (si no lo tienes): https://metamask.io/
2. **El componente agregará automáticamente** la red Passet Hub al conectar
3. **Obtén tokens PAS** del faucet (si necesitas):
   - Ve a: https://faucet.polkadot.io/paseo
   - Usa tu dirección EVM (0x...)

### 5. Probar Funcionalidades

#### 🔗 Conectar Wallet
1. Click en "Conectar MetaMask"
2. Aprobar la conexión en la ventana de MetaMask
3. Se agregará automáticamente la red Passet Hub Testnet
4. Verás tu dirección y balance

#### 📚 Registrar Libro
1. Completa los campos:
   - **Book ID:** "test-book-001" (debe ser único)
   - **Título:** "Cien Años de Soledad"
2. Click "Registrar en Blockchain"
3. Aprobar la transacción en MetaMask
4. Esperar confirmación (~5-10 segundos)
5. ¡Libro registrado! ✅

#### 🔍 Buscar Libro
1. En el campo "Book ID" de la sección "Buscar Libro"
2. Ingresa "test-book-001"
3. Click "Buscar"
4. Verás:
   - Título
   - Propietario actual (tu dirección)
   - Fecha de registro
   - Historial de transferencias (vacío si es nuevo)

#### 🔄 Transferir Propiedad
1. Necesitas una segunda dirección (otra wallet o dirección de prueba)
2. Completa:
   - **Book ID:** "test-book-001"
   - **Nueva Dirección:** "0x..." (dirección destino)
3. Click "Transferir"
4. Aprobar en MetaMask
5. ¡Transferencia completa! ✅

#### 📊 Ver Estadísticas
En la parte superior verás:
- **Total de Libros:** Todos los libros en la blockchain
- **Mis Libros:** Libros que posees

---

## 🧪 Pruebas Rápidas en Consola del Navegador

Abre la consola del navegador (F12) y ejecuta:

```javascript
// Importar el servicio (debe estar disponible globalmente o via window)
const { bookContractService } = await import('./services/bookContract.service');

// 1. Conectar wallet
await bookContractService.connectWallet();

// 2. Registrar libro
const result = await bookContractService.registerBook("console-test-001", "Mi Libro de Prueba");
console.log("Resultado:", result);

// 3. Obtener libro
const book = await bookContractService.getBook("console-test-001");
console.log("Libro:", book);

// 4. Total de libros
const total = await bookContractService.getTotalBooks();
console.log("Total:", total);

// 5. Mis libros
const myBooks = await bookContractService.getBooksByOwner("TU_DIRECCION_0x");
console.log("Mis libros:", myBooks);
```

---

## 🔧 Uso Programático en tu App

### Ejemplo 1: En cualquier Componente

```typescript
import { useBookContract } from '../hooks/useBookContract';

function MyComponent() {
  const {
    isConnected,
    account,
    connectWallet,
    registerBook,
    getBook
  } = useBookContract();

  const handleRegisterMyBook = async () => {
    // Conectar si no está conectado
    if (!isConnected) {
      await connectWallet();
    }

    // Registrar libro
    const result = await registerBook("my-unique-id", "Mi Libro Genial");

    if (result.success) {
      alert("¡Libro registrado!");
      console.log("TX Hash:", result.transactionHash);
    } else {
      alert("Error: " + result.error);
    }
  };

  return (
    <div>
      <button onClick={handleRegisterMyBook}>
        Registrar Libro en Blockchain
      </button>
      {isConnected && <p>Conectado: {account?.address}</p>}
    </div>
  );
}
```

### Ejemplo 2: Integrar en tu BookCard

```typescript
import { useBookContract } from '../hooks/useBookContract';

function BookCard({ book }) {
  const { registerBook, isLoading } = useBookContract();

  const registerOnBlockchain = async () => {
    const result = await registerBook(
      book.id,
      book.title
    );

    if (result.success) {
      // Actualizar UI, mostrar confirmación, etc.
      console.log("Registrado en blockchain!");
    }
  };

  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <button
        onClick={registerOnBlockchain}
        disabled={isLoading}
      >
        {isLoading ? "Registrando..." : "Registrar en Blockchain"}
      </button>
    </div>
  );
}
```

---

## 📱 Qué Esperar

### Primera Vez Conectando
1. MetaMask pedirá permiso para conectar
2. Se agregará la red Passet Hub automáticamente
3. Podrías tener que aprobar el cambio de red

### Al Registrar un Libro
1. MetaMask mostrará estimación de gas (~0.001 PAS)
2. Aprobar transacción
3. Esperar 5-10 segundos para confirmación
4. ¡Listo! El libro está en la blockchain

### Al Transferir
1. Similar al registro
2. Solo el owner puede transferir
3. No puedes transferir a ti mismo

---

## ❌ Troubleshooting

### "MetaMask no está instalado"
**Solución:** Instalar desde https://metamask.io/

### "Insufficient funds"
**Solución:**
1. Ve al faucet: https://faucet.polkadot.io/paseo
2. Solicita tokens PAS
3. Usa tu dirección EVM (0x...)
4. Espera unos segundos

### "Book exists"
**Solución:** El libro ya está registrado. Usa un bookId diferente.

### "Network request failed"
**Solución:**
1. Verifica que estás en Passet Hub Testnet
2. Intenta cambiar de red y volver
3. Recargar la página

### Error de compilación TypeScript
**Solución:**
```bash
cd /Users/wendynieto/hackaton/bookmatch/frontend
npm install
```

---

## 🎯 Checklist de Prueba Completa

- [ ] MetaMask instalado y configurado
- [ ] Tokens PAS en la wallet
- [ ] Componente agregado a la app
- [ ] App corriendo (`npm start`)
- [ ] Wallet conectada
- [ ] Red Passet Hub seleccionada
- [ ] Libro registrado exitosamente
- [ ] Búsqueda de libro funciona
- [ ] Transferencia de propiedad funciona
- [ ] Estadísticas se actualizan
- [ ] No hay errores en consola

---

## 🎬 Para la Demo de LATIN HACK

### Setup Previo (Antes de la Presentación)
1. Tener MetaMask listo con tokens
2. Registrar 2-3 libros de ejemplo
3. Tener una segunda wallet para demostrar transferencia
4. Preparar pantalla con componente demo visible

### Durante la Demo (3-5 minutos)
1. **[30s]** Explicar qué es BookMatch + blockchain
2. **[30s]** Mostrar contrato desplegado en explorer
3. **[60s]** Demo: Conectar wallet
4. **[60s]** Demo: Registrar libro en vivo
5. **[30s]** Demo: Buscar libro y ver información
6. **[30s]** Demo: Mostrar estadísticas
7. **[30s]** Mencionar features: historial inmutable, verificación, etc.

---

## 📚 Archivos Relevantes

### Código
- **Servicio:** `/frontend/src/services/bookContract.service.ts`
- **Hook:** `/frontend/src/hooks/useBookContract.ts`
- **Componente Demo:** `/frontend/src/components/blockchain/BookContractDemo.tsx`
- **Config:** `/frontend/src/config/polkadot.config.ts`
- **ABI:** `/frontend/src/config/BookTraceabilitySimple.json`

### Documentación
- **Info Contrato:** `/blockchain-contracts/DEPLOYMENT_INFO.md`
- **Guía Completa:** `/INTEGRACION_COMPLETA_BLOCKCHAIN.md`
- **Esta Guía:** `/frontend/COMO_PROBAR_BLOCKCHAIN.md`

---

## 🆘 Ayuda Rápida

### Contrato Desplegado
- **Dirección:** `0x37eaf6a2Fa55cB50d4Bf3E7bDc2f89850a396bEF`
- **Red:** Passet Hub Testnet
- **Chain ID:** `420420422`

### Explorar Contrato
https://polkadot.js.org/apps/?rpc=wss://passet-hub-paseo.ibp.network#/contracts

### Obtener Tokens
https://faucet.polkadot.io/paseo

---

**¡Listo para Probar! 🚀**

Si encuentras algún problema, revisa el archivo `/INTEGRACION_COMPLETA_BLOCKCHAIN.md` para más detalles.
