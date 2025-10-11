import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const BookTraceabilitySimpleModule = buildModule("BookTraceabilitySimpleModule", (m) => {
  const bookTraceability = m.contract("BookTraceabilitySimple");

  return { bookTraceability };
});

export default BookTraceabilitySimpleModule;
