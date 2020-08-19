import { isNonNullObject } from "@cosmjs/utils";

import { HttpError } from "./httperror";

export interface CreditRequestBodyDataWithDenom {
  /** The base denomination */
  readonly denom: string;
  /** The recipient address */
  readonly address: string;
}

export interface CreditRequestBodyDataWithTicker {
  /** The ticker symbol */
  readonly ticker: string;
  /** The recipient address */
  readonly address: string;
}

export type CreditRequestBodyData = CreditRequestBodyDataWithDenom | CreditRequestBodyDataWithTicker;

export function isCreditRequestBodyDataWithDenom(
  data: CreditRequestBodyData,
): data is CreditRequestBodyDataWithDenom {
  return typeof (data as CreditRequestBodyDataWithDenom).denom === "string";
}

export class RequestParser {
  public static parseCreditBody(body: unknown): CreditRequestBodyData {
    if (!isNonNullObject(body) || Array.isArray(body)) {
      throw new HttpError(400, "Request body must be a dictionary.");
    }

    const { address, denom, ticker } = body as any;

    if (typeof address !== "string") {
      throw new HttpError(400, "Property 'address' must be a string.");
    }

    if (address.length === 0) {
      throw new HttpError(400, "Property 'address' must not be empty.");
    }

    if (
      (typeof denom !== "string" && typeof ticker !== "string") ||
      (typeof denom === "string" && typeof ticker === "string")
    ) {
      throw new HttpError(400, "Exactly one of properties 'denom' or 'ticker' must be a string");
    }

    if (typeof ticker === "string" && ticker.length === 0) {
      throw new HttpError(400, "Property 'ticker' must not be empty.");
    }

    if (typeof denom === "string" && denom.length === 0) {
      throw new HttpError(400, "Property 'denom' must not be empty.");
    }

    return denom
      ? {
          address: address,
          denom: denom,
        }
      : {
          address: address,
          ticker: ticker,
        };
  }
}
