import { fromRfc3339 } from "@cosmjs/encoding";
import { ReadonlyDate } from "readonly-date";

export interface ReadonlyDateWithNanoseconds extends ReadonlyDate {
  /* Nanoseconds after the time stored in a vanilla ReadonlyDate (millisecond granularity) */
  readonly nanoseconds?: number;
}

export class DateTime {
  public static decode(dateTimeString: string): ReadonlyDateWithNanoseconds {
    const readonlyDate = fromRfc3339(dateTimeString);
    const nanosecondsMatch = dateTimeString.match(/\.(\d+)Z$/);
    const nanoseconds = nanosecondsMatch ? nanosecondsMatch[1].slice(3) : "";
    (readonlyDate as any).nanoseconds = parseInt(nanoseconds.padEnd(6, "0"), 10);
    return readonlyDate as ReadonlyDateWithNanoseconds;
  }

  public static encode(dateTime: ReadonlyDateWithNanoseconds): string {
    const millisecondIso = dateTime.toISOString();
    const nanoseconds = dateTime.nanoseconds?.toString() ?? "";
    return `${millisecondIso.slice(0, -1)}${nanoseconds.padStart(6, "0")}Z`;
  }
}
