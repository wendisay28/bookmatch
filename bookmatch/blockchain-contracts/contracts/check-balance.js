const hre = require("hardhat");

async function main() {
  const address = "0xDE94D2946FdaE49DF266D7198a638B4079bD28E1";

  console.log("🔍 Checking balance on Passet Hub Testnet...");
  console.log("Address:", address);
  console.log("");

  try {
    const balance = await hre.ethers.provider.getBalance(address);
    console.log("✅ Balance found:");
    console.log("  - Wei:", balance.toString());
    console.log("  - PAS:", hre.ethers.formatEther(balance));

    if (balance > 0) {
      console.log("\n🎉 You have tokens! Ready to deploy.");
    } else {
      console.log("\n❌ No tokens found. Please request from faucet:");
      console.log("   https://faucet.polkadot.io/paseo");
    }
  } catch (error) {
    console.error("❌ Error checking balance:", error.message);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
