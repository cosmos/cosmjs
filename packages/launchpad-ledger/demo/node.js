const demo = require("../build/demo/node");

async function run() {
  const accounts = await demo.getAccounts();
  console.info("Accounts from Ledger device:");
  console.table(accounts);

  const address = accounts[0].address;
  const signature = await demo.sign(address, address);
  console.info("Signature from Ledger device:");
  console.info(signature);
}

run().catch(console.error);
