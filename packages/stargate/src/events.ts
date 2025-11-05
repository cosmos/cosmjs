import { comet1, comet38, tendermint37 } from "@cosmjs/tendermint-rpc";

/**
 * An event attribute.
 *
 * This is the same attribute type as tendermint34.Attribute and tendermint35.EventAttribute
 * but `key` and `value` are unified to strings. The conversion
 * from bytes to string in the Tendermint 0.34 case should be done by performing
 * [lossy] UTF-8 decoding.
 *
 * [lossy]: https://doc.rust-lang.org/stable/std/string/struct.String.html#method.from_utf8_lossy
 */
export interface Attribute {
  readonly key: string;
  readonly value: string;
}

/**
 * The same event type as tendermint34.Event and tendermint35.Event
 * but attribute keys and values are unified to strings. The conversion
 * from bytes to string in the Tendermint 0.34 case should be done by performing
 * [lossy] UTF-8 decoding.
 *
 * [lossy]: https://doc.rust-lang.org/stable/std/string/struct.String.html#method.from_utf8_lossy
 */
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
