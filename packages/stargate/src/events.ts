import { fromUtf8 } from "@cosmjs/encoding";
import { tendermint34 } from "@cosmjs/tendermint-rpc";

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
 * Takes a Tendemrint 0.34 event with binary encoded key and value
 * and converts it into an `Event` with string attributes.
 */
export function fromTendermint34Event(event: tendermint34.Event): Event {
  return {
    type: event.type,
    attributes: event.attributes.map(
      (attr): Attribute => ({
        key: fromUtf8(attr.key, true),
        value: fromUtf8(attr.value, true),
      }),
    ),
  };
}
