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
                amount: types.Coin[];
                from_address: string;
                to_address: string;
              };
            }
          | {
              contract: {
                contract_addr: string;
                // this had to be changed - is Base64 encoded string
                msg: string;
                send: types.Coin[] | null;
              };
            }
          | {
              opaque: {
                // this had to be changed - is Base64 encoded string
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

const base64Msg = (msg: object): string => toBase64(toUtf8(JSON.stringify(msg)));

const sendMsg = (from_address: string, to_address: string, amount: types.Coin[]) => {
  return {
    send: {
      from_address,
      to_address,
      amount,
    }
  };
}

const contractMsg = (contract_addr: string, msg: object, amount?: types.Coin[]) => {
  return {
    contract: {
      contract_addr,
      msg: base64Msg(msg),
      send: amount || null,
    }
  };
}

const opaqueMsg = (data: object) => {
  return {
    opaque: {
      data: base64Msg(data),
    }
  };
}
