import { ReadonlyDate } from "readonly-date-esm";

const rfc3339Matcher =
  /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})(\.\d{1,9})?((?:[+-]\d{2}:\d{2})|Z)$/;

function padded(integer: number, length = 2): string {
  return integer.toString().padStart(length, "0");
}

function getLastDayOfMonth(year: number, month: number): number {
  const date = new Date(0);
  date.setUTCFullYear(year, month, 0);
  date.setUTCHours(0, 0, 0, 0);
  return date.getUTCDate();
}

function isValidDate(year: number, month: number, day: number): boolean {
  return month >= 1 && month <= 12 && day >= 1 && day <= getLastDayOfMonth(year, month);
}

function isValidTime(hour: number, minute: number, second: number): boolean {
  return hour <= 23 && minute <= 59 && second <= 59;
}

function isValidTimezoneOffset(hours: number, minutes: number): boolean {
  return hours <= 23 && minutes <= 59;
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

  if (
    !isValidDate(year, month, day) ||
    !isValidTime(hour, minute, second) ||
    !isValidTimezoneOffset(tzOffsetHours, tzOffsetMinutes)
  ) {
    throw new Error("Date string is not in RFC3339 format");
  }

  const tzOffset = tzOffsetSign * (tzOffsetHours * 60 + tzOffsetMinutes) * 60; // seconds

  const date = new Date(0);
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
