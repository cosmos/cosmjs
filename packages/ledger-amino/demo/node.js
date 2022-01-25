const { makeCosmoshubPath, makeSignDoc } = require("@cosmjs/amino");
const { pathToString } = require("@cosmjs/crypto");
const { toBase64 } = require("@cosmjs/encoding");
// eslint-disable-next-line @typescript-eslint/naming-convention
const { LedgerSigner } = require("@cosmjs/ledger-amino");
// eslint-disable-next-line @typescript-eslint/naming-convention
const TransportNodeHid = require("@ledgerhq/hw-transport-node-hid").default;

const interactiveTimeout = 120_000;
const accountNumbers = [0, 1, 2, 10];
const paths = accountNumbers.map(makeCosmoshubPath);

const defaultChainId = "testing";
const defaultFee = {
  amount: [{ amount: "100", denom: "ucosm" }],
  gas: "250",
};
const defaultMemo = "Some memo";
const defaultSequence = "0";

async function signMsgSend(signer, accountNumber, fromAddress, toAddress) {
  const msg = {
    type: "cosmos-sdk/MsgSend",
    value: {
      amount: [
        {
          amount: "1234567",
          denom: "ucosm",
        },
      ],
      // eslint-disable-next-line @typescript-eslint/naming-convention
      from_address: fromAddress,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      to_address: toAddress,
    },
  };
  const signDoc = makeSignDoc([msg], defaultFee, defaultChainId, defaultMemo, accountNumber, defaultSequence);
  const { signature } = await signer.signAmino(fromAddress, signDoc);
  return signature;
}

async function run() {
  const ledgerTransport = await TransportNodeHid.create(interactiveTimeout, interactiveTimeout);
  const signer = new LedgerSigner(ledgerTransport, { testModeAllowed: true, hdPaths: paths });

  const accounts = await signer.getAccounts();
  const printableAccounts = accounts.map((account) => ({ ...account, pubkey: toBase64(account.pubkey) }));
  console.info("Accounts from Ledger device:");
  console.table(printableAccounts.map((account, i) => ({ ...account, hdPath: pathToString(paths[i]) })));

  console.info("Showing address of first account on device");
  await signer.showAddress();
  console.info("Showing address of 3rd account on device");
  await signer.showAddress(paths[2]); // Path of 3rd account

  const accountNumber0 = 0;
  const address0 = accounts[accountNumber0].address;
  console.info(
    `Signing on Ledger device with account index ${accountNumber0} (${address0}). Please review and approve on the device now.`,
  );
  const signature0 = await signMsgSend(signer, accountNumber0, address0, address0);
  console.info("Signature:", signature0);

  // It seems the Ledger device needs a bit of time to recover
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const accountNumber10 = 10;
  const address10 = accounts[accountNumbers.findIndex((n) => n === accountNumber10)].address;
  console.info(
    `Signing on Ledger device with account index ${accountNumber10} (${address10}). Please review and approve on the device now.`,
  );
  const signature1 = await signMsgSend(signer, accountNumber10, address10, address10);
  console.info("Signature:", signature1);
}

run().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);
