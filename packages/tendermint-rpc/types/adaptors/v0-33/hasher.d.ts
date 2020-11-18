import { Header } from "../../responses";
import { BlockHash, TxBytes, TxHash } from "../../types";
export declare function hashTx(tx: TxBytes): TxHash;
export declare function hashBlock(header: Header): BlockHash;
