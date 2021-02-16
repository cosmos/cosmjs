import { fromRfc3339 } from "@cosmjs/encoding";
import { Uint32 } from "@cosmjs/math";
import { ReadonlyDate } from "readonly-date";

export interface ReadonlyDateWithNanoseconds extends ReadonlyDate {
  /* Nanoseconds after the time stored in a vanilla ReadonlyDate (millisecond granularity) */
  readonly nanoseconds?: number;
}

export interface DateWithNanoseconds extends Date {
  /** Nanoseconds after the time stored in a vanilla Date (millisecond granularity) */
  nanoseconds?: number;
}

export function fromRfc3339WithNanoseconds(dateTimeString: string): DateWithNanoseconds {
  const out: DateWithNanoseconds = fromRfc3339(dateTimeString);
  const nanosecondsMatch = dateTimeString.match(/\.(\d+)Z$/);
  const nanoseconds = nanosecondsMatch ? nanosecondsMatch[1].slice(3) : "";
  out.nanoseconds = parseInt(nanoseconds.padEnd(6, "0"), 10);
  return out;
}

export function toRfc3339WithNanoseconds(dateTime: ReadonlyDateWithNanoseconds): string {
  const millisecondIso = dateTime.toISOString();
  const nanoseconds = dateTime.nanoseconds?.toString() ?? "";
  return `${millisecondIso.slice(0, -1)}${nanoseconds.padStart(6, "0")}Z`;
}

export function fromSeconds(seconds: number, nanos = 0): DateWithNanoseconds {
  const checkedNanos = new Uint32(nanos).toNumber();
  if (checkedNanos > 999_999_999) {
    throw new Error("Nano seconds must not exceed 999999999");
  }
  const out: DateWithNanoseconds = new Date(seconds * 1000 + Math.floor(checkedNanos / 1000000));
  out.nanoseconds = checkedNanos % 1000000;
  return out;
}

/**
 * Calculates the UNIX timestamp in seconds as well as the nanoseconds after the given second.
 *
 * This is useful when dealing with external systems like the protobuf type
 * [.google.protobuf.Timestamp](https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#google.protobuf.Timestamp)
 * or any other system that does not use millisecond precision.
 */
export function toSeconds(date: ReadonlyDateWithNanoseconds): { seconds: number; nanos: number } {
  return {
    seconds: Math.floor(date.getTime() / 1000),
    nanos: (date.getTime() % 1000) * 1000000 + (date.nanoseconds ?? 0),
  };
}

/** @deprecated Use fromRfc3339WithNanoseconds/toRfc3339WithNanoseconds instead */
export class DateTime {
  /** @deprecated Use fromRfc3339WithNanoseconds instead */
  public static decode(dateTimeString: string): ReadonlyDateWithNanoseconds {
    return fromRfc3339WithNanoseconds(dateTimeString);
  }

  /** @deprecated Use toRfc3339WithNanoseconds instead */
  public static encode(dateTime: ReadonlyDateWithNanoseconds): string {
    return toRfc3339WithNanoseconds(dateTime);
  }
}
