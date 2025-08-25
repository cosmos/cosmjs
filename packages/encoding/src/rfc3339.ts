import type { ReadonlyDate } from "readonly-date";

const rfc3339Matcher =
  /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})(\.\d{1,9})?((?:[+-]\d{2}:\d{2})|Z)$/;

function padded(integer: number, length = 2): string {
  return integer.toString().padStart(length, "0");
}

export function fromRfc3339(str: string): Date {
  const matches = rfc3339Matcher.exec(str);
  if (!matches) {
    throw new Error("Date string is not in RFC3339 format");
  }

  const year = +matches[1];
  const month = +matches[2];
  const day = +matches[3];
  const hour = +matches[4];
  const minute = +matches[5];
  const second = +matches[6];

  // fractional seconds match either undefined or a string like ".1", ".123456789"
  const milliSeconds = matches[7] ? Math.floor(+matches[7] * 1000) : 0;

  let tzOffsetSign: number;
  let tzOffsetHours: number;
  let tzOffsetMinutes: number;

  // if timezone is undefined, it must be Z or nothing (otherwise the group would have captured).
  if (matches[8] === "Z") {
    tzOffsetSign = 1;
    tzOffsetHours = 0;
    tzOffsetMinutes = 0;
  } else {
    tzOffsetSign = matches[8].substring(0, 1) === "-" ? -1 : 1;
    tzOffsetHours = +matches[8].substring(1, 3);
    tzOffsetMinutes = +matches[8].substring(4, 6);
  }

  const tzOffset = tzOffsetSign * (tzOffsetHours * 60 + tzOffsetMinutes) * 60; // seconds

  const date = new Date();
  date.setUTCFullYear(year, month - 1, day);
  date.setUTCHours(hour, minute, second, milliSeconds);

  return new Date(date.getTime() - tzOffset * 1000);
}

export function toRfc3339(date: Date | ReadonlyDate): string {
  const year = date.getUTCFullYear();
  const month = padded(date.getUTCMonth() + 1);
  const day = padded(date.getUTCDate());
  const hour = padded(date.getUTCHours());
  const minute = padded(date.getUTCMinutes());
  const second = padded(date.getUTCSeconds());
  const ms = padded(date.getUTCMilliseconds(), 3);

  return `${year}-${month}-${day}T${hour}:${minute}:${second}.${ms}Z`;
}
