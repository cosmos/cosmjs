import * as codecImport from "./codec";
export {
  AuthExtension,
  BankExtension,
  IbcExtension,
  QueryClient,
  setupAuthExtension,
  setupBankExtension,
  setupIbcExtension,
} from "./queries";
export { assertIsBroadcastTxSuccess, StargateClient } from "./stargateclient";
export { SigningStargateClient } from "./signingstargateclient";
/** This codec is derived from the Cosmos SDK protocol buffer definitions and can change at any time. */
export declare const codec: typeof codecImport;
