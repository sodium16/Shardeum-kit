const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const network = hre.network.name;

  console.log("=".repeat(50));
  console.log(`Network:  ${network}`);
  console.log(`Deployer: ${deployer.address}`);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log(`Balance:  ${hre.ethers.formatEther(balance)} SHM`);
  console.log("=".repeat(50));

  // ── Deploy DecisionLogger ─────────────────────────────────────────────────
  console.log("\n[1/1] Deploying DecisionLogger...");
  const DecisionLogger = await hre.ethers.getContractFactory("DecisionLogger");
  const decisionLogger = await DecisionLogger.deploy();
  await decisionLogger.waitForDeployment();
  const dlAddress = await decisionLogger.getAddress();
  console.log(`  DecisionLogger deployed to: ${dlAddress}`);

  // ── Summary ──────────────────────────────────────────────────────────────
  const explorerBase = "https://explorer-mezame.shardeum.org";

  console.log("\n" + "=".repeat(50));
  console.log("Deployment complete!");
  console.log(`  DecisionLogger: ${explorerBase}/address/${dlAddress}`);
  console.log("\n  IMPORTANT — paste this address into the frontend:");
  console.log(`  CONTRACT_ADDRESS = "${dlAddress}"`);
  console.log("=".repeat(50));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});