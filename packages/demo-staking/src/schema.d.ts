/*
 * This file was generated with ❤️ by wasm.glass and is licensed
 * for you under WTFPL OR 0BSD OR Unlicense OR MIT OR BSD-3-Clause.
 * Note that different terms apply for the contract's source code and schema.
 * Type generation powered by json-schema-to-typescript.
 */

export interface BalanceResponse {
  balance: string;
  [k: string]: unknown;
}

export interface ClaimsResponse {
  claims: string;
  [k: string]: unknown;
}

export type HandleMsg =
  | {
      transfer: {
        amount: string;
        recipient: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    }
  | {
      bond: {
        [k: string]: unknown;
      };
      [k: string]: unknown;
    }
  | {
      unbond: {
        amount: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    }
  | {
      claim: {
        [k: string]: unknown;
      };
      [k: string]: unknown;
    }
  | {
      reinvest: {
        [k: string]: unknown;
      };
      [k: string]: unknown;
    }
  | {
      __bond_all_tokens: {
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };

export interface InitMsg {
  /**
   * decimal places of the derivative token (for UI) TODO: does this make sense? Do we need to normalize on this? We don't even know the decimals of the native token
   */
  decimals: number;
  /**
   * this is how much the owner takes as a cut when someone unbonds TODO
   */
  exit_tax: string;
  /**
   * This is the minimum amount we will pull out to reinvest, as well as a minumum that can be unbonded (to avoid needless staking tx)
   */
  min_withdrawal: string;
  /**
   * name of the derivative token (FIXME: auto-generate?)
   */
  name: string;
  /**
   * symbol / ticker of the derivative token
   */
  symbol: string;
  /**
   * This is the validator that all tokens will be bonded to
   */
  validator: string;
  [k: string]: unknown;
}

/**
 * Investment info is fixed at initialization, and is used to control the function of the contract
 */
export interface InvestmentInfo {
  /**
   * this is the denomination we can stake (and only one we accept for payments)
   */
  bond_denom: string;
  /**
   * this is how much the owner takes as a cut when someone unbonds
   */
  exit_tax: string;
  /**
   * This is the minimum amount we will pull out to reinvest, as well as a minumum that can be unbonded (to avoid needless staking tx)
   */
  min_withdrawal: string;
  /**
   * owner created the contract and takes a cut
   */
  owner: string;
  /**
   * All tokens are bonded to this validator FIXME: humanize/canonicalize address doesn't work for validator addrresses
   */
  validator: string;
  [k: string]: unknown;
}

export interface InvestmentResponse {
  /**
   * this is how much the owner takes as a cut when someone unbonds
   */
  exit_tax: string;
  /**
   * This is the minimum amount we will pull out to reinvest, as well as a minumum that can be unbonded (to avoid needless staking tx)
   */
  min_withdrawal: string;
  /**
   * A fixed-point decimal value with 18 fractional digits, i.e. Decimal(1_000_000_000_000_000_000) == 1.0
   *
   * The greatest possible value that can be represented is 340282366920938463463.374607431768211455 (which is (2^128 - 1) / 10^18)
   */
  nominal_value: string;
  /**
   * owner created the contract and takes a cut
   */
  owner: string;
  staked_tokens: {
    amount: string;
    denom: string;
    [k: string]: unknown;
  };
  token_supply: string;
  /**
   * All tokens are bonded to this validator
   */
  validator: string;
  [k: string]: unknown;
}

export type QueryMsg =
  | {
      balance: {
        address: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    }
  | {
      claims: {
        address: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    }
  | {
      token_info: {
        [k: string]: unknown;
      };
      [k: string]: unknown;
    }
  | {
      investment: {
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };

/**
 * Supply is dynamic and tracks the current supply of staked and ERC20 tokens.
 */
export interface Supply {
  /**
   * bonded is how many native tokens exist bonded to the validator
   */
  bonded: string;
  /**
   * claims is how many tokens need to be reserved paying back those who unbonded
   */
  claims: string;
  /**
   * issued is how many derivative tokens this contract has issued
   */
  issued: string;
  [k: string]: unknown;
}

/**
 * TokenInfoResponse is info to display the derivative token in a UI
 */
export interface TokenInfoResponse {
  /**
   * decimal places of the derivative token (for UI)
   */
  decimals: number;
  /**
   * name of the derivative token
   */
  name: string;
  /**
   * symbol / ticker of the derivative token
   */
  symbol: string;
  [k: string]: unknown;
}
