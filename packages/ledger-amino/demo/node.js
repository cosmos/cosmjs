const demo = require("../build/demo/node");

async function run() {
  const signer = await demo.createSigner();

  const accountNumbers = [0, 1, 2, 10];
  const accounts = await demo.getAccounts(signer);
  console.info("Accounts from Ledger device:");
  console.table(accounts.map((account, i) => ({ ...account, accountNumber: accountNumbers[i] })));

  const accountNumber0 = 0;
  const address0 = accounts[accountNumber0].address;
  const signature0 = await demo.sign(signer, accountNumber0, address0, address0);
  console.info(`Signature from Ledger device for account number 0 (${address0}):`);
  console.info(signature0);

  // It seems the Ledger device needs a bit of time to recover
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const accountNumber10 = 10;
  const address10 = accounts[accountNumbers.findIndex((n) => n === accountNumber10)].address;
  const signature1 = await demo.sign(signer, accountNumber10, address10, address10);
  console.info(`Signature from Ledger device for account number 10 (${address10}):`);
  console.info(signature1);
}

run().catch(console.error);
