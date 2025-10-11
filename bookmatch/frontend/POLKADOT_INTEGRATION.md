# Integración Polkadot - Sistema de Trazabilidad BookMatch

## LATIN HACK - Paseo Testnet Integration

### 📦 Archivos Creados

#### Configuración
- `src/config/polkadot.config.ts` - Configuración de Paseo Testnet

#### Tipos
- `src/types/blockchain.types.ts` - TypeScript types para blockchain

#### Servicios
- `src/services/polkadot.service.ts` - Servicio principal de Polkadot

#### Hooks
- `src/hooks/usePolkadot.ts` - Custom React hook para Polkadot

#### Contextos
- `src/contexts/BlockchainContext.tsx` - Proveedor de contexto

#### Componentes
- `src/components/blockchain/WalletConnect.tsx` - Conexión de wallet
- `src/components/blockchain/BookTraceability.tsx` - Visor de trazabilidad
- `src/components/blockchain/RegisterBookDialog.tsx` - Registro de libros

### 🚀 Funcionalidades Implementadas

1. **Conexión a Paseo Testnet**
   - Múltiples endpoints de respaldo
   - Reconexión automática
   - Manejo de errores robusto

2. **Integración con Polkadot.js Extension**
   - Detección automática de wallets
   - Selección de cuentas
   - Gestión de sesión

3. **Registro de Libros en Blockchain**
   - Registro on-chain de información de libros
   - Metadata personalizable
   - Confirmación de transacciones

4. **Sistema de Trazabilidad**
   - Historial completo de transacciones
   - Cadena de propiedad
   - Verificación de ownership

5. **Componentes UI**
   - Botón de wallet en TopAppBar
   - Diálogos modales para registro
   - Visualización de historial

### 🔧 Instalación y Configuración

#### 1. Instalar dependencias (ya instaladas)
\`\`\`bash
npm install @polkadot/api @polkadot/extension-dapp
\`\`\`

#### 2. Variables de Entorno
Agregar a `.env`:
\`\`\`
REACT_APP_BOOK_TRACEABILITY_CONTRACT=
REACT_APP_OWNERSHIP_REGISTRY_CONTRACT=
\`\`\`

#### 3. Instalar Polkadot.js Extension
Los usuarios necesitan instalar la extensión:
- Chrome: https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd
- Firefox: https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/

### 📝 Uso

#### Conectar Wallet
1. Click en "Connect Wallet" en la barra superior
2. Autorizar la conexión en Polkadot.js Extension
3. Seleccionar cuenta a usar

#### Registrar un Libro
1. Ir a la página de catálogo
2. Click en el menú (⋮) de un libro
3. Seleccionar "Registrar en Blockchain"
4. Completar información adicional
5. Confirmar transacción en wallet

#### Ver Trazabilidad
1. Click en el menú (⋮) de un libro
2. Seleccionar "Ver Trazabilidad"
3. Ver historial completo de transacciones

### 🌐 Endpoints de Paseo Testnet

Endpoints configurados (con fallback automático):
- **Principal**: `wss://paseo.rpc.amforc.com`
- **Respaldo 1**: `wss://paseo-rpc.dwellir.com`
- **Respaldo 2**: `wss://rpc.ibp.network/paseo`

### 🔐 Seguridad

- Las transacciones requieren firma del usuario
- No se almacenan claves privadas
- Todas las operaciones son auditables en blockchain
- Manejo seguro de estados de conexión

### 📊 Próximos Pasos

#### Smart Contract
Actualmente usa `system.remark` para pruebas. Siguiente fase:
1. Desarrollar smart contract en ink! o Solidity (via Moonbeam)
2. Desplegar en Paseo Testnet
3. Actualizar servicio para usar el contrato
4. Implementar eventos y queries

#### Mejoras Sugeridas
- [ ] Agregar firma de mensajes para verificación
- [ ] Implementar transferencia de ownership P2P
- [ ] Dashboard de analytics on-chain
- [ ] Integración con IPFS para metadata
- [ ] NFTs para libros raros/coleccionables

### 🐛 Troubleshooting

#### Error: "No Polkadot extension found"
- Instalar Polkadot.js Extension
- Recargar la página

#### Error: "Failed to connect to Paseo Testnet"
- Verificar conexión a internet
- El sistema intentará endpoints alternativos automáticamente

#### Error: "Transaction failed"
- Verificar saldo de testnet tokens (PAS)
- Para obtener tokens: https://faucet.polkadot.io/paseo

### 📚 Recursos

- **Paseo Testnet Explorer**: https://polkadot.js.org/apps/?rpc=wss://paseo.rpc.amforc.com
- **Polkadot.js Docs**: https://polkadot.js.org/docs/
- **LATIN HACK**: https://latinhack.com

### ✅ Checklist de Integración

- [x] Instalar dependencias de Polkadot
- [x] Configurar Paseo Testnet
- [x] Crear servicio de blockchain
- [x] Implementar hook de React
- [x] Crear componente de wallet
- [x] Crear sistema de registro
- [x] Crear visor de trazabilidad
- [x] Integrar con UI existente
- [x] Agregar manejo de errores
- [x] Documentación completa
- [ ] Desplegar smart contract
- [ ] Testing end-to-end
- [ ] Optimización de gas fees
- [ ] Integración con backend

---

**Desarrollado para LATIN HACK 2025**
**Red: Paseo Testnet (Polkadot)**
