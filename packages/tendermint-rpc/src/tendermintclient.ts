import { Comet38Client } from "./comet38";
import { HttpEndpoint } from "./rpcclients";
import { Tendermint34Client } from "./tendermint34";
import { Tendermint37Client } from "./tendermint37";

/**
 * A TendermintClient is either a Tendermint34Client or a Tendermint37Client
 *
 * @deprecated use `CometClient`
 */
export type TendermintClient = Tendermint34Client | Tendermint37Client;

/** A CometClient is either a Tendermint34Client, Tendermint37Client or a Comet38Client */
export type CometClient = Tendermint34Client | Tendermint37Client | Comet38Client;

export function isTendermint34Client(client: CometClient): client is Tendermint34Client {
  return client instanceof Tendermint34Client;
}

export function isTendermint37Client(client: CometClient): client is Tendermint37Client {
  return client instanceof Tendermint37Client;
}

export function isComet38Client(client: CometClient): client is Comet38Client {
  return client instanceof Comet38Client;
}

/**
 * Auto-detects the version of the backend and uses a suitable client.
 */
export async function connectComet(endpoint: string | HttpEndpoint): Promise<CometClient> {
  // Tendermint/CometBFT 0.34/0.37/0.38 auto-detection. Starting with 0.37 we seem to get reliable versions again 🎉
  // Using 0.34 as the fallback.
  let out: CometClient;
  const tm37Client = await Tendermint37Client.connect(endpoint);
  const version = (await tm37Client.status()).nodeInfo.version;
  if (version.startsWith("0.37.")) {
    out = tm37Client;
  } else if (version.startsWith("0.38.")) {
    tm37Client.disconnect();
    out = await Comet38Client.connect(endpoint);
  } else {
    tm37Client.disconnect();
    out = await Tendermint34Client.connect(endpoint);
  }
  return out;
}
