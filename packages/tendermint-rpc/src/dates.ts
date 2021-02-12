import { fromRfc3339 } from "@cosmjs/encoding";
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
