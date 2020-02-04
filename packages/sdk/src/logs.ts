/* eslint-disable @typescript-eslint/camelcase */
import { isNonNullObject } from "@iov/encoding";

export interface Attribute {
  readonly key: string;
  readonly value: string;
}

export interface Event {
  readonly type: "message" | "transfer";
  readonly attributes: readonly Attribute[];
}

export interface Log {
  readonly msg_index: number;
  readonly log: string;
  readonly events: readonly Event[];
}

export function parseAttribute(input: unknown): Attribute {
  if (!isNonNullObject(input)) throw new Error("Attribute must be a non-null object");
  const { key, value } = input as any;
  if (typeof key !== "string" || !key) throw new Error("Attribute's key must be a non-empty string");
  if (typeof value !== "string" && typeof value !== "undefined") {
    throw new Error("Attribute's value must be a string or unset");
  }

  return {
    key: key,
    value: value || "",
  };
}

export function parseEvent(input: unknown): Event {
  if (!isNonNullObject(input)) throw new Error("Event must be a non-null object");
  const { type, attributes } = input as any;
  if (type !== "message" && type !== "transfer") throw new Error("Event must be of type message or transfer");
  if (!Array.isArray(attributes)) throw new Error("Event's attributes must be an array");
  return {
    type: type,
    attributes: attributes.map(parseAttribute),
  };
}

export function parseLog(input: unknown): Log {
  if (!isNonNullObject(input)) throw new Error("Log must be a non-null object");
  const { msg_index, log, events } = input as any;
  if (typeof msg_index !== "number") throw new Error("Log's msg_index must be a number");
  if (typeof log !== "string") throw new Error("Log's log must be a string");
  if (!Array.isArray(events)) throw new Error("Log's events must be an array");
  return {
    msg_index: msg_index,
    log: log,
    events: events.map(parseEvent),
  };
}

export function parseLogs(input: unknown): readonly Log[] {
  if (!Array.isArray(input)) throw new Error("Logs must be an array");
  return input.map(parseLog);
}
