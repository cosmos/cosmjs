import { Comet1Client } from "./comet1";
import { Comet38Client } from "./comet38";
import { HttpEndpoint } from "./rpcclients";
import { Tendermint37Client } from "./tendermint37";

/** A CometClient is either a Tendermint37Client Comet38Client or a Comet1Client */
export type CometClient = Tendermint37Client | Comet38Client | Comet1Client;

export function isTendermint37Client(client: CometClient): client is Tendermint37Client {
  return client instanceof Tendermint37Client;
}

export function isComet38Client(client: CometClient): client is Comet38Client {
  return client instanceof Comet38Client;
}

export function isComet1Client(client: CometClient): client is Comet1Client {
  return client instanceof Comet1Client;
}

/**
 * Auto-detects the version of the backend and uses a suitable client.
 */
export async function connectComet(endpoint: string | HttpEndpoint): Promise<CometClient> {
  // Tendermint/CometBFT 0.37/0.38/1.x auto-detection. Starting with 0.37 we seem to get reliable versions again 🎉
  // Using 0.37 as the fallback.
  let out: CometClient;
  const tm37Client = await Tendermint37Client.connect(endpoint);
  const version = (await tm37Client.status()).nodeInfo.version;
  if (version.startsWith("0.37.")) {
    out = tm37Client;
  } else if (version.startsWith("0.38.")) {
    tm37Client.disconnect();
    out = await Comet38Client.connect(endpoint);
  } else if (version.startsWith("1.")) {
    tm37Client.disconnect();
    out = await Comet1Client.connect(endpoint);
  } else {
    out = tm37Client;
  }
  return out;
}
