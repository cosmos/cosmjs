import { PubKey as LaunchpadPubKey } from "@cosmjs/launchpad";
import { Any } from "./codec/google/protobuf/any";
export declare function encodePubkey(pubkey: LaunchpadPubKey): Any;
export declare function decodePubkey(pubkey?: Any | null): LaunchpadPubKey | null;
