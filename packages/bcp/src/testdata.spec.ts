import {
  Address,
  Algorithm,
  ChainId,
  FullSignature,
  Nonce,
  PubkeyBundle,
  PubkeyBytes,
  SendTransaction,
  SignatureBytes,
  SignedTransaction,
  TokenTicker,
  TransactionId,
} from "@iov/bcp";
import { Encoding } from "@iov/encoding";

import data from "./testdata/cosmoshub.json";

const { fromBase64, toUtf8 } = Encoding;

export const pubJson: PubkeyBundle = {
  algo: Algorithm.Secp256k1,
  data: fromBase64(data.tx.value.signatures[0].pub_key.value) as PubkeyBytes,
};

export const chainId = "cosmos:cosmoshub-3" as ChainId;

export const nonce = 99 as Nonce;

export const sendTxJson: SendTransaction = {
  kind: "bcp/send",
  chainId: chainId,
  sender: data.tx.value.msg[0].value.from_address as Address,
  recipient: data.tx.value.msg[0].value.to_address as Address,
  memo: data.tx.value.memo,
  amount: {
    fractionalDigits: 6,
    quantity: data.tx.value.msg[0].value.amount[0].amount,
    tokenTicker: "ATOM" as TokenTicker,
  },
  fee: {
    tokens: {
      fractionalDigits: 6,
      quantity: data.tx.value.fee.amount[0].amount,
      tokenTicker: "ATOM" as TokenTicker,
    },
    gasLimit: data.tx.value.fee.gas,
  },
};

export const signedTxSig: FullSignature = {
  nonce: nonce,
  pubkey: pubJson,
  signature: fromBase64(data.tx.value.signatures[0].signature) as SignatureBytes,
};

export const signedTxJson: SignedTransaction = {
  transaction: sendTxJson,
  signatures: [signedTxSig],
};

export const signedTxBin = fromBase64(data.tx_data);

export const txId = data.id as TransactionId;

export const signedTxEncodedJson = toUtf8(
  `{"msg":[{"type":"cosmos-sdk/MsgSend","value":{"from_address":"cosmos1txqfn5jmcts0x0q7krdxj8tgf98tj0965vqlmq","to_address":"cosmos1nynns8ex9fq6sjjfj8k79ymkdz4sqth06xexae","amount":[{"denom":"uatom","amount":"35997500"}]}}],"memo":"","signatures":[{"pub_key":{"type":"tendermint/PubKeySecp256k1","value":"A5qFcJBJvEK/fOmEAY0DHNWwSRZ9TEfNZyH8VoVvDtAq"},"signature":"NK1Oy4EUGAsoC03c1wi9GG03JC/39LEdautC5Jk643oIbEPqeXHMwaqbdvO/Jws0X/NAXaN8SAy2KNY5Qml+5Q=="}],"fee":{"amount":[{"denom":"uatom","amount":"2500"}],"gas":"100000"}}`,
);
