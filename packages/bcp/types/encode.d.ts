import { Amount, Fee, FullSignature, PubkeyBundle, SignedTransaction, UnsignedTransaction } from "@iov/bcp";
import amino from "@tendermint/amino-js";
import { AminoTx, TokenInfos } from "./types";
export declare function encodePubkey(pubkey: PubkeyBundle): amino.PubKey;
export declare function encodeAmount(amount: Amount, tokens: TokenInfos): amino.Coin;
export declare function encodeFee(fee: Fee, tokens: TokenInfos): amino.StdFee;
export declare function encodeFullSignature(fullSignature: FullSignature): amino.StdSignature;
export declare function buildUnsignedTx(tx: UnsignedTransaction, tokens: TokenInfos): AminoTx;
export declare function buildSignedTx(tx: SignedTransaction, tokens: TokenInfos): AminoTx;
