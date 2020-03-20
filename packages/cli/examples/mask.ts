/*
 * This file was generated with ❤️ by wasm.glass and is licensed
 * for you under WTFPL OR 0BSD OR Unlicense OR MIT OR BSD-3-Clause.
 * Note that different terms apply for the contract's source code and schema.
 * Type generation powered by json-schema-to-typescript.
 */


export type HandleMsg =
  | {
      reflectmsg: {
        msgs: (
          | {
              send: {
                amount: {
                  amount: string;
                  denom: string;
                }[];
                from_address: string;
                to_address: string;
              };
            }
          | {
              contract: {
                contract_addr: string;
                // this must be changed - is Base64 encoded string
                msg: string;
                send:
                  | {
                      amount: string;
                      denom: string;
                    }[]
                  | null;
              };
            }
          | {
              opaque: {
                // this must be changed - is Base64 encoded string
                data: string;
              };
            }
        )[];
      };
    }
  | {
      changeowner: {
        owner: string;
      };
    };

export interface InitMsg {
}

export interface OwnerResponse {
  owner: string;
}

export type QueryMsg = {
  owner: {};
};

export interface State {
  // base64 encoded CanonicalAddress
  owner: string;
}

/*** END auto-gen ****/
