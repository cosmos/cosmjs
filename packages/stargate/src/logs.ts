/* eslint-disable @typescript-eslint/naming-convention */
import { logs } from "@cosmjs/launchpad";

export function parseRawLog(input = "[]"): readonly logs.Log[] {
  const logsToParse = JSON.parse(input).map(({ events }: { events: readonly unknown[] }, i: number) => ({
    msg_index: i,
    events,
    log: "",
  }));
  return logs.parseLogs(logsToParse);
}
