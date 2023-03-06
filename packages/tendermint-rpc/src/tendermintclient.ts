import { Tendermint34Client } from "./tendermint34";
import { Tendermint37Client } from "./tendermint37";

/** A TendermintClient is either a Tendermint34Client or a Tendermint37Client */
export type TendermintClient = Tendermint34Client | Tendermint37Client;

export function isTendermint34Client(client: TendermintClient): client is Tendermint34Client {
  return client instanceof Tendermint34Client;
}

export function isTendermint37Client(client: TendermintClient): client is Tendermint37Client {
  return client instanceof Tendermint37Client;
}
