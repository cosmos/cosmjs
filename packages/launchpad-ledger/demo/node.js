const demo = require("../build/demo/node");

async function run() {
  const accounts = await demo.getAccounts();
  console.info("Accounts from Ledger device:");
  console.table(accounts);

  const accountNumber0 = 0;
  const address0 = accounts[accountNumber0].address;
  const signature0 = await demo.sign(accountNumber0, address0, address0);
  console.info(`Signature from Ledger device for account number 0 (${address0}):`);
  console.info(signature0);

  // It seems the Ledger device needs a bit of time to recover
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const accountNumber1 = 1;
  const address1 = accounts[accountNumber1].address;
  const signature1 = await demo.sign(accountNumber1, address1, address1);
  console.info(`Signature from Ledger device for account number 1 (${address1}):`);
  console.info(signature1);
}

run().catch(console.error);
