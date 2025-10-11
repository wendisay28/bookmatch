# 🚀 Guía de Despliegue - BookTraceability Contract

## ✅ Opción Recomendada: Polkadot.js Apps

Dado que Contracts UI y cargo-contract CLI tienen problemas con Paseo, usaremos **Polkadot.js Apps** que es más compatible.

---

## 📋 Pasos para Desplegar

### **1. Acceder a Polkadot.js Apps**

Abre este enlace en tu navegador:
```
https://polkadot.js.org/apps/?rpc=wss://paseo.rpc.amforc.com#/contracts
```

Esto te conectará automáticamente a Paseo Testnet y abrirá la sección de Contratos.

---

### **2. Conectar tu Wallet**

1. En la esquina superior derecha, click en **"Connect"** o el ícono de cuenta
2. Autoriza Polkadot.js Extension
3. Selecciona tu cuenta (la que tiene tokens PAS)

---

### **3. Subir el Código del Contrato**

1. Click en **"Upload & deploy code"** (botón azul grande)

2. **Selecciona el archivo:**
   - Click en el cuadro de "upload contract bundle"
   - Navega a: `/Users/wendynieto/hackaton/bookmatch/blockchain-contracts/ink-contracts/target/ink/`
   - Selecciona: **`book_traceability.contract`**

3. **La página procesará el contrato** y mostrará:
   - ✅ Contract bundle recognized
   - Nombre: book_traceability v5.0.0
   - Lista de funciones disponibles

---

### **4. Configurar el Deployment**

1. **Deployment account:** Tu cuenta (ya debería estar seleccionada)

2. **Contract name:** Puedes poner un nombre descriptivo, ej:
   ```
   BookMatch Traceability v1
   ```

3. **Deployment constructor:**
   - Debería mostrar `new()` - es el único
   - No requiere parámetros

4. **Max gas allowed (M):**
   - Deja el valor por defecto o pon: `200000`

5. **Storage deposit limit:**
   - Marca "use estimated value"
   - O pon un valor como: `500000000000` (500 PAS)

---

### **5. Desplegar! 🎉**

1. **Click en "Upload and Instantiate"** (botón azul al final)

2. **Revisa el popup:**
   - Verás el costo estimado en PAS
   - Verifica que tengas suficiente balance

3. **Click en "Sign and Submit"**

4. **Espera la confirmación:**
   - Verás el progreso en la parte superior
   - Toma ~12-15 segundos
   - ✅ Verás "ExtrinsicSuccess" cuando termine

5. **¡IMPORTANTE! Copia la dirección del contrato:**
   - Aparecerá en la lista de "Contracts"
   - Formato: `5xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` (48 caracteres)
   - **Guárdala en un lugar seguro**

---

### **6. Verificar el Despliegue**

El contrato ahora aparecerá en la lista de "Contracts" en Polkadot.js Apps.

Puedes:
- ✅ Ver su dirección
- ✅ Ver su balance
- ✅ Llamar funciones (read/write)
- ✅ Ver eventos emitidos

---

## 🧪 Probar el Contrato

Una vez desplegado, puedes probar las funciones:

### **Registrar un libro (write):**
1. Click en el contrato → "Execute"
2. Selecciona `registerBook`
3. Llena los parámetros:
   - book_id: `"book-001"`
   - isbn: `"978-1234567890"`
   - title: `"Cien Años de Soledad"`
   - author: `"Gabriel García Márquez"`
   - metadata: `"{\"year\":1967}"`
4. Click "Call contract"
5. Sign and submit
6. ✅ Verás el evento `BookRegistered`

### **Ver información de un libro (read):**
1. Click en "Read" en lugar de "Execute"
2. Selecciona `getBook`
3. Ingresa: `"book-001"`
4. Click "Read"
5. ✅ Verás toda la información del libro

---

## 📝 Información para Documentación

Una vez desplegado, anota:

```
Red: Paseo Testnet
RPC Endpoint: wss://paseo.rpc.amforc.com
Dirección del Contrato: [LA QUE TE DÉ AL DESPLEGAR]
ABI Location: /blockchain-contracts/ink-contracts/target/ink/book_traceability.json
```

---

## ❓ Troubleshooting

### Error: "Insufficient Balance"
- Verifica que tienes tokens PAS
- Reduce el storage deposit limit

### Error: "ContractTrapped"
- Revisa que los parámetros sean correctos
- Strings deben ir entre comillas: `"texto"`

### No veo el contrato desplegado
- Refresca la página
- Verifica que estés conectado a Paseo
- Revisa que la transacción haya sido exitosa

---

**¿Listo para desplegar?** Sigue esta guía paso a paso 🚀
