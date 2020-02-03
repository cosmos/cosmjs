import { types } from "@cosmwasm/sdk";
import { Amount, Fee, FullSignature, PubkeyBundle, SignedTransaction, UnsignedTransaction } from "@iov/bcp";
import { TokenInfos } from "./types";
export declare function encodePubkey(pubkey: PubkeyBundle): types.PubKey;
export declare function encodeAmount(amount: Amount, tokens: TokenInfos): types.Coin;
export declare function encodeFee(fee: Fee, tokens: TokenInfos): types.StdFee;
export declare function encodeFullSignature(fullSignature: FullSignature): types.StdSignature;
export declare function buildUnsignedTx(tx: UnsignedTransaction, tokens: TokenInfos): types.AminoTx;
export declare function buildSignedTx(tx: SignedTransaction, tokens: TokenInfos): types.AminoTx;
