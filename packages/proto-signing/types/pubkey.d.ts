import { PubKey } from "@cosmjs/launchpad";
import { google } from "./codec";
export declare function encodePubkey(pubkey: PubKey): google.protobuf.IAny;
export declare function decodePubkey(pubkey?: google.protobuf.IAny | null): PubKey | null;
