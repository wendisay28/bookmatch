// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const BookTraceabilityModule = buildModule("BookTraceabilityModule", (m) => {
  // Deploy the BookTraceability contract
  const bookTraceability = m.contract("BookTraceability", []);

  return { bookTraceability };
});

export default BookTraceabilityModule;
