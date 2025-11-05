import { comet1, comet38, tendermint37 } from "@cosmjs/tendermint-rpc";

/** An event attribute */
export interface Attribute {
  readonly key: string;
  readonly value: string;
}

/** An event */
export interface Event {
  readonly type: string;
  readonly attributes: readonly Attribute[];
}

/**
 * Takes a CometBFT event and converts it into an `Event` with string attributes.
 *
 * This is not doing much anymore because we always get string events
 * since CometBFT 0.37+. So maybe this can be refactored away at some point.
 */
export function fromTendermintEvent(event: tendermint37.Event | comet38.Event | comet1.Event): Event {
  return {
    type: event.type,
    attributes: event.attributes.map((attr): Attribute => ({ key: attr.key, value: attr.value })),
  };
}
