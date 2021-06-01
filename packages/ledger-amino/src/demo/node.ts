/* eslint-disable @typescript-eslint/naming-convention */
import { makeCosmoshubPath, makeSignDoc, StdFee, StdSignature } from "@cosmjs/amino";
import { toBase64 } from "@cosmjs/encoding";
import TransportNodeHid from "@ledgerhq/hw-transport-node-hid";

import { LedgerSigner } from "../ledgersigner";

const defaultChainId = "testing";
const defaultFee: StdFee = {
  amount: [{ amount: "100", denom: "ucosm" }],
  gas: "250",
};
const defaultMemo = "Some memo";
const defaultSequence = "0";

export async function createSigner(): Promise<LedgerSigner> {
  const interactiveTimeout = 120_000;
  const ledgerTransport = await TransportNodeHid.create(interactiveTimeout, interactiveTimeout);
  return new LedgerSigner(ledgerTransport, {
    testModeAllowed: true,
    hdPaths: [makeCosmoshubPath(0), makeCosmoshubPath(1), makeCosmoshubPath(2), makeCosmoshubPath(10)],
  });
}

export async function getAccounts(signer: LedgerSigner): Promise<
  ReadonlyArray<{
    readonly algo: string;
    readonly address: string;
    readonly pubkey: string;
  }>
> {
  const accounts = await signer.getAccounts();
  return accounts.map((account) => ({ ...account, pubkey: toBase64(account.pubkey) }));
}

export async function sign(
  signer: LedgerSigner,
  accountNumber: number,
  fromAddress: string,
  toAddress: string,
): Promise<StdSignature> {
  const msgs = [
    {
      type: "cosmos-sdk/MsgSend",
      value: {
        amount: [
          {
            amount: "1234567",
            denom: "ucosm",
          },
        ],
        from_address: fromAddress,
        to_address: toAddress,
      },
    },
  ];
  const signDoc = makeSignDoc(msgs, defaultFee, defaultChainId, defaultMemo, accountNumber, defaultSequence);
  const { signature } = await signer.signAmino(fromAddress, signDoc);
  return signature;
}
