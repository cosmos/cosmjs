import * as $protobuf from "protobufjs";
/** Namespace cosmwasm. */
export namespace cosmwasm {
  /** Namespace wasm. */
  namespace wasm {
    /** Namespace v1beta1. */
    namespace v1beta1 {
      /** Properties of a MsgStoreCode. */
      interface IMsgStoreCode {
        /** MsgStoreCode sender */
        sender?: string | null;

        /** MsgStoreCode wasmByteCode */
        wasmByteCode?: Uint8Array | null;

        /** MsgStoreCode source */
        source?: string | null;

        /** MsgStoreCode builder */
        builder?: string | null;

        /** MsgStoreCode instantiatePermission */
        instantiatePermission?: cosmwasm.wasm.v1beta1.IAccessConfig | null;
      }

      /** Represents a MsgStoreCode. */
      class MsgStoreCode implements IMsgStoreCode {
        /**
         * Constructs a new MsgStoreCode.
         * @param [p] Properties to set
         */
        constructor(p?: cosmwasm.wasm.v1beta1.IMsgStoreCode);

        /** MsgStoreCode sender. */
        public sender: string;

        /** MsgStoreCode wasmByteCode. */
        public wasmByteCode: Uint8Array;

        /** MsgStoreCode source. */
        public source: string;

        /** MsgStoreCode builder. */
        public builder: string;

        /** MsgStoreCode instantiatePermission. */
        public instantiatePermission?: cosmwasm.wasm.v1beta1.IAccessConfig | null;

        /**
         * Creates a new MsgStoreCode instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MsgStoreCode instance
         */
        public static create(
          properties?: cosmwasm.wasm.v1beta1.IMsgStoreCode,
        ): cosmwasm.wasm.v1beta1.MsgStoreCode;

        /**
         * Encodes the specified MsgStoreCode message. Does not implicitly {@link cosmwasm.wasm.v1beta1.MsgStoreCode.verify|verify} messages.
         * @param m MsgStoreCode message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: cosmwasm.wasm.v1beta1.IMsgStoreCode, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MsgStoreCode message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns MsgStoreCode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): cosmwasm.wasm.v1beta1.MsgStoreCode;
      }

      /** Properties of a MsgInstantiateContract. */
      interface IMsgInstantiateContract {
        /** MsgInstantiateContract sender */
        sender?: string | null;

        /** MsgInstantiateContract admin */
        admin?: string | null;

        /** MsgInstantiateContract codeId */
        codeId?: Long | null;

        /** MsgInstantiateContract label */
        label?: string | null;

        /** MsgInstantiateContract initMsg */
        initMsg?: Uint8Array | null;

        /** MsgInstantiateContract initFunds */
        initFunds?: cosmos.base.v1beta1.ICoin[] | null;
      }

      /** Represents a MsgInstantiateContract. */
      class MsgInstantiateContract implements IMsgInstantiateContract {
        /**
         * Constructs a new MsgInstantiateContract.
         * @param [p] Properties to set
         */
        constructor(p?: cosmwasm.wasm.v1beta1.IMsgInstantiateContract);

        /** MsgInstantiateContract sender. */
        public sender: string;

        /** MsgInstantiateContract admin. */
        public admin: string;

        /** MsgInstantiateContract codeId. */
        public codeId: Long;

        /** MsgInstantiateContract label. */
        public label: string;

        /** MsgInstantiateContract initMsg. */
        public initMsg: Uint8Array;

        /** MsgInstantiateContract initFunds. */
        public initFunds: cosmos.base.v1beta1.ICoin[];

        /**
         * Creates a new MsgInstantiateContract instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MsgInstantiateContract instance
         */
        public static create(
          properties?: cosmwasm.wasm.v1beta1.IMsgInstantiateContract,
        ): cosmwasm.wasm.v1beta1.MsgInstantiateContract;

        /**
         * Encodes the specified MsgInstantiateContract message. Does not implicitly {@link cosmwasm.wasm.v1beta1.MsgInstantiateContract.verify|verify} messages.
         * @param m MsgInstantiateContract message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: cosmwasm.wasm.v1beta1.IMsgInstantiateContract,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a MsgInstantiateContract message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns MsgInstantiateContract
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): cosmwasm.wasm.v1beta1.MsgInstantiateContract;
      }

      /** Properties of a MsgExecuteContract. */
      interface IMsgExecuteContract {
        /** MsgExecuteContract sender */
        sender?: string | null;

        /** MsgExecuteContract contract */
        contract?: string | null;

        /** MsgExecuteContract msg */
        msg?: Uint8Array | null;

        /** MsgExecuteContract sentFunds */
        sentFunds?: cosmos.base.v1beta1.ICoin[] | null;
      }

      /** Represents a MsgExecuteContract. */
      class MsgExecuteContract implements IMsgExecuteContract {
        /**
         * Constructs a new MsgExecuteContract.
         * @param [p] Properties to set
         */
        constructor(p?: cosmwasm.wasm.v1beta1.IMsgExecuteContract);

        /** MsgExecuteContract sender. */
        public sender: string;

        /** MsgExecuteContract contract. */
        public contract: string;

        /** MsgExecuteContract msg. */
        public msg: Uint8Array;

        /** MsgExecuteContract sentFunds. */
        public sentFunds: cosmos.base.v1beta1.ICoin[];

        /**
         * Creates a new MsgExecuteContract instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MsgExecuteContract instance
         */
        public static create(
          properties?: cosmwasm.wasm.v1beta1.IMsgExecuteContract,
        ): cosmwasm.wasm.v1beta1.MsgExecuteContract;

        /**
         * Encodes the specified MsgExecuteContract message. Does not implicitly {@link cosmwasm.wasm.v1beta1.MsgExecuteContract.verify|verify} messages.
         * @param m MsgExecuteContract message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: cosmwasm.wasm.v1beta1.IMsgExecuteContract,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a MsgExecuteContract message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns MsgExecuteContract
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): cosmwasm.wasm.v1beta1.MsgExecuteContract;
      }

      /** Properties of a MsgMigrateContract. */
      interface IMsgMigrateContract {
        /** MsgMigrateContract sender */
        sender?: string | null;

        /** MsgMigrateContract contract */
        contract?: string | null;

        /** MsgMigrateContract codeId */
        codeId?: Long | null;

        /** MsgMigrateContract migrateMsg */
        migrateMsg?: Uint8Array | null;
      }

      /** Represents a MsgMigrateContract. */
      class MsgMigrateContract implements IMsgMigrateContract {
        /**
         * Constructs a new MsgMigrateContract.
         * @param [p] Properties to set
         */
        constructor(p?: cosmwasm.wasm.v1beta1.IMsgMigrateContract);

        /** MsgMigrateContract sender. */
        public sender: string;

        /** MsgMigrateContract contract. */
        public contract: string;

        /** MsgMigrateContract codeId. */
        public codeId: Long;

        /** MsgMigrateContract migrateMsg. */
        public migrateMsg: Uint8Array;

        /**
         * Creates a new MsgMigrateContract instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MsgMigrateContract instance
         */
        public static create(
          properties?: cosmwasm.wasm.v1beta1.IMsgMigrateContract,
        ): cosmwasm.wasm.v1beta1.MsgMigrateContract;

        /**
         * Encodes the specified MsgMigrateContract message. Does not implicitly {@link cosmwasm.wasm.v1beta1.MsgMigrateContract.verify|verify} messages.
         * @param m MsgMigrateContract message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: cosmwasm.wasm.v1beta1.IMsgMigrateContract,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a MsgMigrateContract message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns MsgMigrateContract
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): cosmwasm.wasm.v1beta1.MsgMigrateContract;
      }

      /** Properties of a MsgUpdateAdmin. */
      interface IMsgUpdateAdmin {
        /** MsgUpdateAdmin sender */
        sender?: string | null;

        /** MsgUpdateAdmin newAdmin */
        newAdmin?: string | null;

        /** MsgUpdateAdmin contract */
        contract?: string | null;
      }

      /** Represents a MsgUpdateAdmin. */
      class MsgUpdateAdmin implements IMsgUpdateAdmin {
        /**
         * Constructs a new MsgUpdateAdmin.
         * @param [p] Properties to set
         */
        constructor(p?: cosmwasm.wasm.v1beta1.IMsgUpdateAdmin);

        /** MsgUpdateAdmin sender. */
        public sender: string;

        /** MsgUpdateAdmin newAdmin. */
        public newAdmin: string;

        /** MsgUpdateAdmin contract. */
        public contract: string;

        /**
         * Creates a new MsgUpdateAdmin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MsgUpdateAdmin instance
         */
        public static create(
          properties?: cosmwasm.wasm.v1beta1.IMsgUpdateAdmin,
        ): cosmwasm.wasm.v1beta1.MsgUpdateAdmin;

        /**
         * Encodes the specified MsgUpdateAdmin message. Does not implicitly {@link cosmwasm.wasm.v1beta1.MsgUpdateAdmin.verify|verify} messages.
         * @param m MsgUpdateAdmin message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: cosmwasm.wasm.v1beta1.IMsgUpdateAdmin,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a MsgUpdateAdmin message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns MsgUpdateAdmin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): cosmwasm.wasm.v1beta1.MsgUpdateAdmin;
      }

      /** Properties of a MsgClearAdmin. */
      interface IMsgClearAdmin {
        /** MsgClearAdmin sender */
        sender?: string | null;

        /** MsgClearAdmin contract */
        contract?: string | null;
      }

      /** Represents a MsgClearAdmin. */
      class MsgClearAdmin implements IMsgClearAdmin {
        /**
         * Constructs a new MsgClearAdmin.
         * @param [p] Properties to set
         */
        constructor(p?: cosmwasm.wasm.v1beta1.IMsgClearAdmin);

        /** MsgClearAdmin sender. */
        public sender: string;

        /** MsgClearAdmin contract. */
        public contract: string;

        /**
         * Creates a new MsgClearAdmin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MsgClearAdmin instance
         */
        public static create(
          properties?: cosmwasm.wasm.v1beta1.IMsgClearAdmin,
        ): cosmwasm.wasm.v1beta1.MsgClearAdmin;

        /**
         * Encodes the specified MsgClearAdmin message. Does not implicitly {@link cosmwasm.wasm.v1beta1.MsgClearAdmin.verify|verify} messages.
         * @param m MsgClearAdmin message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: cosmwasm.wasm.v1beta1.IMsgClearAdmin, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MsgClearAdmin message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns MsgClearAdmin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): cosmwasm.wasm.v1beta1.MsgClearAdmin;
      }

      /** Represents a Query */
      class Query extends $protobuf.rpc.Service {
        /**
         * Constructs a new Query service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Creates new Query service using the specified rpc implementation.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         * @returns RPC service. Useful where requests and/or responses are streamed.
         */
        public static create(
          rpcImpl: $protobuf.RPCImpl,
          requestDelimited?: boolean,
          responseDelimited?: boolean,
        ): Query;

        /**
         * Calls ContractInfo.
         * @param request QueryContractInfoRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and QueryContractInfoResponse
         */
        public contractInfo(
          request: cosmwasm.wasm.v1beta1.IQueryContractInfoRequest,
          callback: cosmwasm.wasm.v1beta1.Query.ContractInfoCallback,
        ): void;

        /**
         * Calls ContractInfo.
         * @param request QueryContractInfoRequest message or plain object
         * @returns Promise
         */
        public contractInfo(
          request: cosmwasm.wasm.v1beta1.IQueryContractInfoRequest,
        ): Promise<cosmwasm.wasm.v1beta1.QueryContractInfoResponse>;

        /**
         * Calls ContractHistory.
         * @param request QueryContractHistoryRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and QueryContractHistoryResponse
         */
        public contractHistory(
          request: cosmwasm.wasm.v1beta1.IQueryContractHistoryRequest,
          callback: cosmwasm.wasm.v1beta1.Query.ContractHistoryCallback,
        ): void;

        /**
         * Calls ContractHistory.
         * @param request QueryContractHistoryRequest message or plain object
         * @returns Promise
         */
        public contractHistory(
          request: cosmwasm.wasm.v1beta1.IQueryContractHistoryRequest,
        ): Promise<cosmwasm.wasm.v1beta1.QueryContractHistoryResponse>;

        /**
         * Calls ContractsByCode.
         * @param request QueryContractsByCodeRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and QueryContractsByCodeResponse
         */
        public contractsByCode(
          request: cosmwasm.wasm.v1beta1.IQueryContractsByCodeRequest,
          callback: cosmwasm.wasm.v1beta1.Query.ContractsByCodeCallback,
        ): void;

        /**
         * Calls ContractsByCode.
         * @param request QueryContractsByCodeRequest message or plain object
         * @returns Promise
         */
        public contractsByCode(
          request: cosmwasm.wasm.v1beta1.IQueryContractsByCodeRequest,
        ): Promise<cosmwasm.wasm.v1beta1.QueryContractsByCodeResponse>;

        /**
         * Calls AllContractState.
         * @param request QueryAllContractStateRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and QueryAllContractStateResponse
         */
        public allContractState(
          request: cosmwasm.wasm.v1beta1.IQueryAllContractStateRequest,
          callback: cosmwasm.wasm.v1beta1.Query.AllContractStateCallback,
        ): void;

        /**
         * Calls AllContractState.
         * @param request QueryAllContractStateRequest message or plain object
         * @returns Promise
         */
        public allContractState(
          request: cosmwasm.wasm.v1beta1.IQueryAllContractStateRequest,
        ): Promise<cosmwasm.wasm.v1beta1.QueryAllContractStateResponse>;

        /**
         * Calls RawContractState.
         * @param request QueryRawContractStateRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and QueryRawContractStateResponse
         */
        public rawContractState(
          request: cosmwasm.wasm.v1beta1.IQueryRawContractStateRequest,
          callback: cosmwasm.wasm.v1beta1.Query.RawContractStateCallback,
        ): void;

        /**
         * Calls RawContractState.
         * @param request QueryRawContractStateRequest message or plain object
         * @returns Promise
         */
        public rawContractState(
          request: cosmwasm.wasm.v1beta1.IQueryRawContractStateRequest,
        ): Promise<cosmwasm.wasm.v1beta1.QueryRawContractStateResponse>;

        /**
         * Calls SmartContractState.
         * @param request QuerySmartContractStateRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and QuerySmartContractStateResponse
         */
        public smartContractState(
          request: cosmwasm.wasm.v1beta1.IQuerySmartContractStateRequest,
          callback: cosmwasm.wasm.v1beta1.Query.SmartContractStateCallback,
        ): void;

        /**
         * Calls SmartContractState.
         * @param request QuerySmartContractStateRequest message or plain object
         * @returns Promise
         */
        public smartContractState(
          request: cosmwasm.wasm.v1beta1.IQuerySmartContractStateRequest,
        ): Promise<cosmwasm.wasm.v1beta1.QuerySmartContractStateResponse>;

        /**
         * Calls Code.
         * @param request QueryCodeRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and QueryCodeResponse
         */
        public code(
          request: cosmwasm.wasm.v1beta1.IQueryCodeRequest,
          callback: cosmwasm.wasm.v1beta1.Query.CodeCallback,
        ): void;

        /**
         * Calls Code.
         * @param request QueryCodeRequest message or plain object
         * @returns Promise
         */
        public code(
          request: cosmwasm.wasm.v1beta1.IQueryCodeRequest,
        ): Promise<cosmwasm.wasm.v1beta1.QueryCodeResponse>;

        /**
         * Calls Codes.
         * @param request QueryCodesRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and QueryCodesResponse
         */
        public codes(
          request: cosmwasm.wasm.v1beta1.IQueryCodesRequest,
          callback: cosmwasm.wasm.v1beta1.Query.CodesCallback,
        ): void;

        /**
         * Calls Codes.
         * @param request QueryCodesRequest message or plain object
         * @returns Promise
         */
        public codes(
          request: cosmwasm.wasm.v1beta1.IQueryCodesRequest,
        ): Promise<cosmwasm.wasm.v1beta1.QueryCodesResponse>;
      }

      namespace Query {
        /**
         * Callback as used by {@link cosmwasm.wasm.v1beta1.Query#contractInfo}.
         * @param error Error, if any
         * @param [response] QueryContractInfoResponse
         */
        type ContractInfoCallback = (
          error: Error | null,
          response?: cosmwasm.wasm.v1beta1.QueryContractInfoResponse,
        ) => void;

        /**
         * Callback as used by {@link cosmwasm.wasm.v1beta1.Query#contractHistory}.
         * @param error Error, if any
         * @param [response] QueryContractHistoryResponse
         */
        type ContractHistoryCallback = (
          error: Error | null,
          response?: cosmwasm.wasm.v1beta1.QueryContractHistoryResponse,
        ) => void;

        /**
         * Callback as used by {@link cosmwasm.wasm.v1beta1.Query#contractsByCode}.
         * @param error Error, if any
         * @param [response] QueryContractsByCodeResponse
         */
        type ContractsByCodeCallback = (
          error: Error | null,
          response?: cosmwasm.wasm.v1beta1.QueryContractsByCodeResponse,
        ) => void;

        /**
         * Callback as used by {@link cosmwasm.wasm.v1beta1.Query#allContractState}.
         * @param error Error, if any
         * @param [response] QueryAllContractStateResponse
         */
        type AllContractStateCallback = (
          error: Error | null,
          response?: cosmwasm.wasm.v1beta1.QueryAllContractStateResponse,
        ) => void;

        /**
         * Callback as used by {@link cosmwasm.wasm.v1beta1.Query#rawContractState}.
         * @param error Error, if any
         * @param [response] QueryRawContractStateResponse
         */
        type RawContractStateCallback = (
          error: Error | null,
          response?: cosmwasm.wasm.v1beta1.QueryRawContractStateResponse,
        ) => void;

        /**
         * Callback as used by {@link cosmwasm.wasm.v1beta1.Query#smartContractState}.
         * @param error Error, if any
         * @param [response] QuerySmartContractStateResponse
         */
        type SmartContractStateCallback = (
          error: Error | null,
          response?: cosmwasm.wasm.v1beta1.QuerySmartContractStateResponse,
        ) => void;

        /**
         * Callback as used by {@link cosmwasm.wasm.v1beta1.Query#code}.
         * @param error Error, if any
         * @param [response] QueryCodeResponse
         */
        type CodeCallback = (error: Error | null, response?: cosmwasm.wasm.v1beta1.QueryCodeResponse) => void;

        /**
         * Callback as used by {@link cosmwasm.wasm.v1beta1.Query#codes}.
         * @param error Error, if any
         * @param [response] QueryCodesResponse
         */
        type CodesCallback = (
          error: Error | null,
          response?: cosmwasm.wasm.v1beta1.QueryCodesResponse,
        ) => void;
      }

      /** Properties of a QueryContractInfoRequest. */
      interface IQueryContractInfoRequest {
        /** QueryContractInfoRequest address */
        address?: string | null;
      }

      /** Represents a QueryContractInfoRequest. */
      class QueryContractInfoRequest implements IQueryContractInfoRequest {
        /**
         * Constructs a new QueryContractInfoRequest.
         * @param [p] Properties to set
         */
        constructor(p?: cosmwasm.wasm.v1beta1.IQueryContractInfoRequest);

        /** QueryContractInfoRequest address. */
        public address: string;

        /**
         * Creates a new QueryContractInfoRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns QueryContractInfoRequest instance
         */
        public static create(
          properties?: cosmwasm.wasm.v1beta1.IQueryContractInfoRequest,
        ): cosmwasm.wasm.v1beta1.QueryContractInfoRequest;

        /**
         * Encodes the specified QueryContractInfoRequest message. Does not implicitly {@link cosmwasm.wasm.v1beta1.QueryContractInfoRequest.verify|verify} messages.
         * @param m QueryContractInfoRequest message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: cosmwasm.wasm.v1beta1.IQueryContractInfoRequest,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a QueryContractInfoRequest message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns QueryContractInfoRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): cosmwasm.wasm.v1beta1.QueryContractInfoRequest;
      }

      /** Properties of a QueryContractInfoResponse. */
      interface IQueryContractInfoResponse {
        /** QueryContractInfoResponse address */
        address?: string | null;

        /** QueryContractInfoResponse contractInfo */
        contractInfo?: cosmwasm.wasm.v1beta1.IContractInfo | null;
      }

      /** Represents a QueryContractInfoResponse. */
      class QueryContractInfoResponse implements IQueryContractInfoResponse {
        /**
         * Constructs a new QueryContractInfoResponse.
         * @param [p] Properties to set
         */
        constructor(p?: cosmwasm.wasm.v1beta1.IQueryContractInfoResponse);

        /** QueryContractInfoResponse address. */
        public address: string;

        /** QueryContractInfoResponse contractInfo. */
        public contractInfo?: cosmwasm.wasm.v1beta1.IContractInfo | null;

        /**
         * Creates a new QueryContractInfoResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns QueryContractInfoResponse instance
         */
        public static create(
          properties?: cosmwasm.wasm.v1beta1.IQueryContractInfoResponse,
        ): cosmwasm.wasm.v1beta1.QueryContractInfoResponse;

        /**
         * Encodes the specified QueryContractInfoResponse message. Does not implicitly {@link cosmwasm.wasm.v1beta1.QueryContractInfoResponse.verify|verify} messages.
         * @param m QueryContractInfoResponse message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: cosmwasm.wasm.v1beta1.IQueryContractInfoResponse,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a QueryContractInfoResponse message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns QueryContractInfoResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): cosmwasm.wasm.v1beta1.QueryContractInfoResponse;
      }

      /** Properties of a QueryContractHistoryRequest. */
      interface IQueryContractHistoryRequest {
        /** QueryContractHistoryRequest address */
        address?: string | null;

        /** QueryContractHistoryRequest pagination */
        pagination?: cosmos.base.query.v1beta1.IPageRequest | null;
      }

      /** Represents a QueryContractHistoryRequest. */
      class QueryContractHistoryRequest implements IQueryContractHistoryRequest {
        /**
         * Constructs a new QueryContractHistoryRequest.
         * @param [p] Properties to set
         */
        constructor(p?: cosmwasm.wasm.v1beta1.IQueryContractHistoryRequest);

        /** QueryContractHistoryRequest address. */
        public address: string;

        /** QueryContractHistoryRequest pagination. */
        public pagination?: cosmos.base.query.v1beta1.IPageRequest | null;

        /**
         * Creates a new QueryContractHistoryRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns QueryContractHistoryRequest instance
         */
        public static create(
          properties?: cosmwasm.wasm.v1beta1.IQueryContractHistoryRequest,
        ): cosmwasm.wasm.v1beta1.QueryContractHistoryRequest;

        /**
         * Encodes the specified QueryContractHistoryRequest message. Does not implicitly {@link cosmwasm.wasm.v1beta1.QueryContractHistoryRequest.verify|verify} messages.
         * @param m QueryContractHistoryRequest message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: cosmwasm.wasm.v1beta1.IQueryContractHistoryRequest,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a QueryContractHistoryRequest message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns QueryContractHistoryRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): cosmwasm.wasm.v1beta1.QueryContractHistoryRequest;
      }

      /** Properties of a QueryContractHistoryResponse. */
      interface IQueryContractHistoryResponse {
        /** QueryContractHistoryResponse entries */
        entries?: cosmwasm.wasm.v1beta1.IContractCodeHistoryEntry[] | null;

        /** QueryContractHistoryResponse pagination */
        pagination?: cosmos.base.query.v1beta1.IPageResponse | null;
      }

      /** Represents a QueryContractHistoryResponse. */
      class QueryContractHistoryResponse implements IQueryContractHistoryResponse {
        /**
         * Constructs a new QueryContractHistoryResponse.
         * @param [p] Properties to set
         */
        constructor(p?: cosmwasm.wasm.v1beta1.IQueryContractHistoryResponse);

        /** QueryContractHistoryResponse entries. */
        public entries: cosmwasm.wasm.v1beta1.IContractCodeHistoryEntry[];

        /** QueryContractHistoryResponse pagination. */
        public pagination?: cosmos.base.query.v1beta1.IPageResponse | null;

        /**
         * Creates a new QueryContractHistoryResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns QueryContractHistoryResponse instance
         */
        public static create(
          properties?: cosmwasm.wasm.v1beta1.IQueryContractHistoryResponse,
        ): cosmwasm.wasm.v1beta1.QueryContractHistoryResponse;

        /**
         * Encodes the specified QueryContractHistoryResponse message. Does not implicitly {@link cosmwasm.wasm.v1beta1.QueryContractHistoryResponse.verify|verify} messages.
         * @param m QueryContractHistoryResponse message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: cosmwasm.wasm.v1beta1.IQueryContractHistoryResponse,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a QueryContractHistoryResponse message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns QueryContractHistoryResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): cosmwasm.wasm.v1beta1.QueryContractHistoryResponse;
      }

      /** Properties of a QueryContractsByCodeRequest. */
      interface IQueryContractsByCodeRequest {
        /** QueryContractsByCodeRequest codeId */
        codeId?: Long | null;

        /** QueryContractsByCodeRequest pagination */
        pagination?: cosmos.base.query.v1beta1.IPageRequest | null;
      }

      /** Represents a QueryContractsByCodeRequest. */
      class QueryContractsByCodeRequest implements IQueryContractsByCodeRequest {
        /**
         * Constructs a new QueryContractsByCodeRequest.
         * @param [p] Properties to set
         */
        constructor(p?: cosmwasm.wasm.v1beta1.IQueryContractsByCodeRequest);

        /** QueryContractsByCodeRequest codeId. */
        public codeId: Long;

        /** QueryContractsByCodeRequest pagination. */
        public pagination?: cosmos.base.query.v1beta1.IPageRequest | null;

        /**
         * Creates a new QueryContractsByCodeRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns QueryContractsByCodeRequest instance
         */
        public static create(
          properties?: cosmwasm.wasm.v1beta1.IQueryContractsByCodeRequest,
        ): cosmwasm.wasm.v1beta1.QueryContractsByCodeRequest;

        /**
         * Encodes the specified QueryContractsByCodeRequest message. Does not implicitly {@link cosmwasm.wasm.v1beta1.QueryContractsByCodeRequest.verify|verify} messages.
         * @param m QueryContractsByCodeRequest message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: cosmwasm.wasm.v1beta1.IQueryContractsByCodeRequest,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a QueryContractsByCodeRequest message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns QueryContractsByCodeRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): cosmwasm.wasm.v1beta1.QueryContractsByCodeRequest;
      }

      /** Properties of a ContractInfoWithAddress. */
      interface IContractInfoWithAddress {
        /** ContractInfoWithAddress address */
        address?: string | null;

        /** ContractInfoWithAddress contractInfo */
        contractInfo?: cosmwasm.wasm.v1beta1.IContractInfo | null;
      }

      /** Represents a ContractInfoWithAddress. */
      class ContractInfoWithAddress implements IContractInfoWithAddress {
        /**
         * Constructs a new ContractInfoWithAddress.
         * @param [p] Properties to set
         */
        constructor(p?: cosmwasm.wasm.v1beta1.IContractInfoWithAddress);

        /** ContractInfoWithAddress address. */
        public address: string;

        /** ContractInfoWithAddress contractInfo. */
        public contractInfo?: cosmwasm.wasm.v1beta1.IContractInfo | null;

        /**
         * Creates a new ContractInfoWithAddress instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ContractInfoWithAddress instance
         */
        public static create(
          properties?: cosmwasm.wasm.v1beta1.IContractInfoWithAddress,
        ): cosmwasm.wasm.v1beta1.ContractInfoWithAddress;

        /**
         * Encodes the specified ContractInfoWithAddress message. Does not implicitly {@link cosmwasm.wasm.v1beta1.ContractInfoWithAddress.verify|verify} messages.
         * @param m ContractInfoWithAddress message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: cosmwasm.wasm.v1beta1.IContractInfoWithAddress,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a ContractInfoWithAddress message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns ContractInfoWithAddress
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): cosmwasm.wasm.v1beta1.ContractInfoWithAddress;
      }

      /** Properties of a QueryContractsByCodeResponse. */
      interface IQueryContractsByCodeResponse {
        /** QueryContractsByCodeResponse contractInfos */
        contractInfos?: cosmwasm.wasm.v1beta1.IContractInfoWithAddress[] | null;

        /** QueryContractsByCodeResponse pagination */
        pagination?: cosmos.base.query.v1beta1.IPageResponse | null;
      }

      /** Represents a QueryContractsByCodeResponse. */
      class QueryContractsByCodeResponse implements IQueryContractsByCodeResponse {
        /**
         * Constructs a new QueryContractsByCodeResponse.
         * @param [p] Properties to set
         */
        constructor(p?: cosmwasm.wasm.v1beta1.IQueryContractsByCodeResponse);

        /** QueryContractsByCodeResponse contractInfos. */
        public contractInfos: cosmwasm.wasm.v1beta1.IContractInfoWithAddress[];

        /** QueryContractsByCodeResponse pagination. */
        public pagination?: cosmos.base.query.v1beta1.IPageResponse | null;

        /**
         * Creates a new QueryContractsByCodeResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns QueryContractsByCodeResponse instance
         */
        public static create(
          properties?: cosmwasm.wasm.v1beta1.IQueryContractsByCodeResponse,
        ): cosmwasm.wasm.v1beta1.QueryContractsByCodeResponse;

        /**
         * Encodes the specified QueryContractsByCodeResponse message. Does not implicitly {@link cosmwasm.wasm.v1beta1.QueryContractsByCodeResponse.verify|verify} messages.
         * @param m QueryContractsByCodeResponse message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: cosmwasm.wasm.v1beta1.IQueryContractsByCodeResponse,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a QueryContractsByCodeResponse message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns QueryContractsByCodeResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): cosmwasm.wasm.v1beta1.QueryContractsByCodeResponse;
      }

      /** Properties of a QueryAllContractStateRequest. */
      interface IQueryAllContractStateRequest {
        /** QueryAllContractStateRequest address */
        address?: string | null;

        /** QueryAllContractStateRequest pagination */
        pagination?: cosmos.base.query.v1beta1.IPageRequest | null;
      }

      /** Represents a QueryAllContractStateRequest. */
      class QueryAllContractStateRequest implements IQueryAllContractStateRequest {
        /**
         * Constructs a new QueryAllContractStateRequest.
         * @param [p] Properties to set
         */
        constructor(p?: cosmwasm.wasm.v1beta1.IQueryAllContractStateRequest);

        /** QueryAllContractStateRequest address. */
        public address: string;

        /** QueryAllContractStateRequest pagination. */
        public pagination?: cosmos.base.query.v1beta1.IPageRequest | null;

        /**
         * Creates a new QueryAllContractStateRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns QueryAllContractStateRequest instance
         */
        public static create(
          properties?: cosmwasm.wasm.v1beta1.IQueryAllContractStateRequest,
        ): cosmwasm.wasm.v1beta1.QueryAllContractStateRequest;

        /**
         * Encodes the specified QueryAllContractStateRequest message. Does not implicitly {@link cosmwasm.wasm.v1beta1.QueryAllContractStateRequest.verify|verify} messages.
         * @param m QueryAllContractStateRequest message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: cosmwasm.wasm.v1beta1.IQueryAllContractStateRequest,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a QueryAllContractStateRequest message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns QueryAllContractStateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): cosmwasm.wasm.v1beta1.QueryAllContractStateRequest;
      }

      /** Properties of a QueryAllContractStateResponse. */
      interface IQueryAllContractStateResponse {
        /** QueryAllContractStateResponse models */
        models?: cosmwasm.wasm.v1beta1.IModel[] | null;

        /** QueryAllContractStateResponse pagination */
        pagination?: cosmos.base.query.v1beta1.IPageResponse | null;
      }

      /** Represents a QueryAllContractStateResponse. */
      class QueryAllContractStateResponse implements IQueryAllContractStateResponse {
        /**
         * Constructs a new QueryAllContractStateResponse.
         * @param [p] Properties to set
         */
        constructor(p?: cosmwasm.wasm.v1beta1.IQueryAllContractStateResponse);

        /** QueryAllContractStateResponse models. */
        public models: cosmwasm.wasm.v1beta1.IModel[];

        /** QueryAllContractStateResponse pagination. */
        public pagination?: cosmos.base.query.v1beta1.IPageResponse | null;

        /**
         * Creates a new QueryAllContractStateResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns QueryAllContractStateResponse instance
         */
        public static create(
          properties?: cosmwasm.wasm.v1beta1.IQueryAllContractStateResponse,
        ): cosmwasm.wasm.v1beta1.QueryAllContractStateResponse;

        /**
         * Encodes the specified QueryAllContractStateResponse message. Does not implicitly {@link cosmwasm.wasm.v1beta1.QueryAllContractStateResponse.verify|verify} messages.
         * @param m QueryAllContractStateResponse message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: cosmwasm.wasm.v1beta1.IQueryAllContractStateResponse,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a QueryAllContractStateResponse message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns QueryAllContractStateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): cosmwasm.wasm.v1beta1.QueryAllContractStateResponse;
      }

      /** Properties of a QueryRawContractStateRequest. */
      interface IQueryRawContractStateRequest {
        /** QueryRawContractStateRequest address */
        address?: string | null;

        /** QueryRawContractStateRequest queryData */
        queryData?: Uint8Array | null;
      }

      /** Represents a QueryRawContractStateRequest. */
      class QueryRawContractStateRequest implements IQueryRawContractStateRequest {
        /**
         * Constructs a new QueryRawContractStateRequest.
         * @param [p] Properties to set
         */
        constructor(p?: cosmwasm.wasm.v1beta1.IQueryRawContractStateRequest);

        /** QueryRawContractStateRequest address. */
        public address: string;

        /** QueryRawContractStateRequest queryData. */
        public queryData: Uint8Array;

        /**
         * Creates a new QueryRawContractStateRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns QueryRawContractStateRequest instance
         */
        public static create(
          properties?: cosmwasm.wasm.v1beta1.IQueryRawContractStateRequest,
        ): cosmwasm.wasm.v1beta1.QueryRawContractStateRequest;

        /**
         * Encodes the specified QueryRawContractStateRequest message. Does not implicitly {@link cosmwasm.wasm.v1beta1.QueryRawContractStateRequest.verify|verify} messages.
         * @param m QueryRawContractStateRequest message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: cosmwasm.wasm.v1beta1.IQueryRawContractStateRequest,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a QueryRawContractStateRequest message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns QueryRawContractStateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): cosmwasm.wasm.v1beta1.QueryRawContractStateRequest;
      }

      /** Properties of a QueryRawContractStateResponse. */
      interface IQueryRawContractStateResponse {
        /** QueryRawContractStateResponse data */
        data?: Uint8Array | null;
      }

      /** Represents a QueryRawContractStateResponse. */
      class QueryRawContractStateResponse implements IQueryRawContractStateResponse {
        /**
         * Constructs a new QueryRawContractStateResponse.
         * @param [p] Properties to set
         */
        constructor(p?: cosmwasm.wasm.v1beta1.IQueryRawContractStateResponse);

        /** QueryRawContractStateResponse data. */
        public data: Uint8Array;

        /**
         * Creates a new QueryRawContractStateResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns QueryRawContractStateResponse instance
         */
        public static create(
          properties?: cosmwasm.wasm.v1beta1.IQueryRawContractStateResponse,
        ): cosmwasm.wasm.v1beta1.QueryRawContractStateResponse;

        /**
         * Encodes the specified QueryRawContractStateResponse message. Does not implicitly {@link cosmwasm.wasm.v1beta1.QueryRawContractStateResponse.verify|verify} messages.
         * @param m QueryRawContractStateResponse message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: cosmwasm.wasm.v1beta1.IQueryRawContractStateResponse,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a QueryRawContractStateResponse message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns QueryRawContractStateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): cosmwasm.wasm.v1beta1.QueryRawContractStateResponse;
      }

      /** Properties of a QuerySmartContractStateRequest. */
      interface IQuerySmartContractStateRequest {
        /** QuerySmartContractStateRequest address */
        address?: string | null;

        /** QuerySmartContractStateRequest queryData */
        queryData?: Uint8Array | null;
      }

      /** Represents a QuerySmartContractStateRequest. */
      class QuerySmartContractStateRequest implements IQuerySmartContractStateRequest {
        /**
         * Constructs a new QuerySmartContractStateRequest.
         * @param [p] Properties to set
         */
        constructor(p?: cosmwasm.wasm.v1beta1.IQuerySmartContractStateRequest);

        /** QuerySmartContractStateRequest address. */
        public address: string;

        /** QuerySmartContractStateRequest queryData. */
        public queryData: Uint8Array;

        /**
         * Creates a new QuerySmartContractStateRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns QuerySmartContractStateRequest instance
         */
        public static create(
          properties?: cosmwasm.wasm.v1beta1.IQuerySmartContractStateRequest,
        ): cosmwasm.wasm.v1beta1.QuerySmartContractStateRequest;

        /**
         * Encodes the specified QuerySmartContractStateRequest message. Does not implicitly {@link cosmwasm.wasm.v1beta1.QuerySmartContractStateRequest.verify|verify} messages.
         * @param m QuerySmartContractStateRequest message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: cosmwasm.wasm.v1beta1.IQuerySmartContractStateRequest,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a QuerySmartContractStateRequest message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns QuerySmartContractStateRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): cosmwasm.wasm.v1beta1.QuerySmartContractStateRequest;
      }

      /** Properties of a QuerySmartContractStateResponse. */
      interface IQuerySmartContractStateResponse {
        /** QuerySmartContractStateResponse data */
        data?: Uint8Array | null;
      }

      /** Represents a QuerySmartContractStateResponse. */
      class QuerySmartContractStateResponse implements IQuerySmartContractStateResponse {
        /**
         * Constructs a new QuerySmartContractStateResponse.
         * @param [p] Properties to set
         */
        constructor(p?: cosmwasm.wasm.v1beta1.IQuerySmartContractStateResponse);

        /** QuerySmartContractStateResponse data. */
        public data: Uint8Array;

        /**
         * Creates a new QuerySmartContractStateResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns QuerySmartContractStateResponse instance
         */
        public static create(
          properties?: cosmwasm.wasm.v1beta1.IQuerySmartContractStateResponse,
        ): cosmwasm.wasm.v1beta1.QuerySmartContractStateResponse;

        /**
         * Encodes the specified QuerySmartContractStateResponse message. Does not implicitly {@link cosmwasm.wasm.v1beta1.QuerySmartContractStateResponse.verify|verify} messages.
         * @param m QuerySmartContractStateResponse message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: cosmwasm.wasm.v1beta1.IQuerySmartContractStateResponse,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a QuerySmartContractStateResponse message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns QuerySmartContractStateResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): cosmwasm.wasm.v1beta1.QuerySmartContractStateResponse;
      }

      /** Properties of a QueryCodeRequest. */
      interface IQueryCodeRequest {
        /** QueryCodeRequest codeId */
        codeId?: Long | null;
      }

      /** Represents a QueryCodeRequest. */
      class QueryCodeRequest implements IQueryCodeRequest {
        /**
         * Constructs a new QueryCodeRequest.
         * @param [p] Properties to set
         */
        constructor(p?: cosmwasm.wasm.v1beta1.IQueryCodeRequest);

        /** QueryCodeRequest codeId. */
        public codeId: Long;

        /**
         * Creates a new QueryCodeRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns QueryCodeRequest instance
         */
        public static create(
          properties?: cosmwasm.wasm.v1beta1.IQueryCodeRequest,
        ): cosmwasm.wasm.v1beta1.QueryCodeRequest;

        /**
         * Encodes the specified QueryCodeRequest message. Does not implicitly {@link cosmwasm.wasm.v1beta1.QueryCodeRequest.verify|verify} messages.
         * @param m QueryCodeRequest message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: cosmwasm.wasm.v1beta1.IQueryCodeRequest,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a QueryCodeRequest message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns QueryCodeRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): cosmwasm.wasm.v1beta1.QueryCodeRequest;
      }

      /** Properties of a CodeInfoResponse. */
      interface ICodeInfoResponse {
        /** CodeInfoResponse codeId */
        codeId?: Long | null;

        /** CodeInfoResponse creator */
        creator?: string | null;

        /** CodeInfoResponse dataHash */
        dataHash?: Uint8Array | null;

        /** CodeInfoResponse source */
        source?: string | null;

        /** CodeInfoResponse builder */
        builder?: string | null;
      }

      /** Represents a CodeInfoResponse. */
      class CodeInfoResponse implements ICodeInfoResponse {
        /**
         * Constructs a new CodeInfoResponse.
         * @param [p] Properties to set
         */
        constructor(p?: cosmwasm.wasm.v1beta1.ICodeInfoResponse);

        /** CodeInfoResponse codeId. */
        public codeId: Long;

        /** CodeInfoResponse creator. */
        public creator: string;

        /** CodeInfoResponse dataHash. */
        public dataHash: Uint8Array;

        /** CodeInfoResponse source. */
        public source: string;

        /** CodeInfoResponse builder. */
        public builder: string;

        /**
         * Creates a new CodeInfoResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CodeInfoResponse instance
         */
        public static create(
          properties?: cosmwasm.wasm.v1beta1.ICodeInfoResponse,
        ): cosmwasm.wasm.v1beta1.CodeInfoResponse;

        /**
         * Encodes the specified CodeInfoResponse message. Does not implicitly {@link cosmwasm.wasm.v1beta1.CodeInfoResponse.verify|verify} messages.
         * @param m CodeInfoResponse message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: cosmwasm.wasm.v1beta1.ICodeInfoResponse,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a CodeInfoResponse message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns CodeInfoResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): cosmwasm.wasm.v1beta1.CodeInfoResponse;
      }

      /** Properties of a QueryCodeResponse. */
      interface IQueryCodeResponse {
        /** QueryCodeResponse codeInfo */
        codeInfo?: cosmwasm.wasm.v1beta1.ICodeInfoResponse | null;

        /** QueryCodeResponse data */
        data?: Uint8Array | null;
      }

      /** Represents a QueryCodeResponse. */
      class QueryCodeResponse implements IQueryCodeResponse {
        /**
         * Constructs a new QueryCodeResponse.
         * @param [p] Properties to set
         */
        constructor(p?: cosmwasm.wasm.v1beta1.IQueryCodeResponse);

        /** QueryCodeResponse codeInfo. */
        public codeInfo?: cosmwasm.wasm.v1beta1.ICodeInfoResponse | null;

        /** QueryCodeResponse data. */
        public data: Uint8Array;

        /**
         * Creates a new QueryCodeResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns QueryCodeResponse instance
         */
        public static create(
          properties?: cosmwasm.wasm.v1beta1.IQueryCodeResponse,
        ): cosmwasm.wasm.v1beta1.QueryCodeResponse;

        /**
         * Encodes the specified QueryCodeResponse message. Does not implicitly {@link cosmwasm.wasm.v1beta1.QueryCodeResponse.verify|verify} messages.
         * @param m QueryCodeResponse message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: cosmwasm.wasm.v1beta1.IQueryCodeResponse,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a QueryCodeResponse message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns QueryCodeResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): cosmwasm.wasm.v1beta1.QueryCodeResponse;
      }

      /** Properties of a QueryCodesRequest. */
      interface IQueryCodesRequest {
        /** QueryCodesRequest pagination */
        pagination?: cosmos.base.query.v1beta1.IPageRequest | null;
      }

      /** Represents a QueryCodesRequest. */
      class QueryCodesRequest implements IQueryCodesRequest {
        /**
         * Constructs a new QueryCodesRequest.
         * @param [p] Properties to set
         */
        constructor(p?: cosmwasm.wasm.v1beta1.IQueryCodesRequest);

        /** QueryCodesRequest pagination. */
        public pagination?: cosmos.base.query.v1beta1.IPageRequest | null;

        /**
         * Creates a new QueryCodesRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns QueryCodesRequest instance
         */
        public static create(
          properties?: cosmwasm.wasm.v1beta1.IQueryCodesRequest,
        ): cosmwasm.wasm.v1beta1.QueryCodesRequest;

        /**
         * Encodes the specified QueryCodesRequest message. Does not implicitly {@link cosmwasm.wasm.v1beta1.QueryCodesRequest.verify|verify} messages.
         * @param m QueryCodesRequest message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: cosmwasm.wasm.v1beta1.IQueryCodesRequest,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a QueryCodesRequest message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns QueryCodesRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): cosmwasm.wasm.v1beta1.QueryCodesRequest;
      }

      /** Properties of a QueryCodesResponse. */
      interface IQueryCodesResponse {
        /** QueryCodesResponse codeInfos */
        codeInfos?: cosmwasm.wasm.v1beta1.ICodeInfoResponse[] | null;

        /** QueryCodesResponse pagination */
        pagination?: cosmos.base.query.v1beta1.IPageResponse | null;
      }

      /** Represents a QueryCodesResponse. */
      class QueryCodesResponse implements IQueryCodesResponse {
        /**
         * Constructs a new QueryCodesResponse.
         * @param [p] Properties to set
         */
        constructor(p?: cosmwasm.wasm.v1beta1.IQueryCodesResponse);

        /** QueryCodesResponse codeInfos. */
        public codeInfos: cosmwasm.wasm.v1beta1.ICodeInfoResponse[];

        /** QueryCodesResponse pagination. */
        public pagination?: cosmos.base.query.v1beta1.IPageResponse | null;

        /**
         * Creates a new QueryCodesResponse instance using the specified properties.
         * @param [properties] Properties to set
         * @returns QueryCodesResponse instance
         */
        public static create(
          properties?: cosmwasm.wasm.v1beta1.IQueryCodesResponse,
        ): cosmwasm.wasm.v1beta1.QueryCodesResponse;

        /**
         * Encodes the specified QueryCodesResponse message. Does not implicitly {@link cosmwasm.wasm.v1beta1.QueryCodesResponse.verify|verify} messages.
         * @param m QueryCodesResponse message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: cosmwasm.wasm.v1beta1.IQueryCodesResponse,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a QueryCodesResponse message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns QueryCodesResponse
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): cosmwasm.wasm.v1beta1.QueryCodesResponse;
      }

      /** AccessType enum. */
      enum AccessType {
        ACCESS_TYPE_UNSPECIFIED = 0,
        ACCESS_TYPE_NOBODY = 1,
        ACCESS_TYPE_ONLY_ADDRESS = 2,
        ACCESS_TYPE_EVERYBODY = 3,
      }

      /** Properties of an AccessTypeParam. */
      interface IAccessTypeParam {
        /** AccessTypeParam value */
        value?: cosmwasm.wasm.v1beta1.AccessType | null;
      }

      /** Represents an AccessTypeParam. */
      class AccessTypeParam implements IAccessTypeParam {
        /**
         * Constructs a new AccessTypeParam.
         * @param [p] Properties to set
         */
        constructor(p?: cosmwasm.wasm.v1beta1.IAccessTypeParam);

        /** AccessTypeParam value. */
        public value: cosmwasm.wasm.v1beta1.AccessType;

        /**
         * Creates a new AccessTypeParam instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AccessTypeParam instance
         */
        public static create(
          properties?: cosmwasm.wasm.v1beta1.IAccessTypeParam,
        ): cosmwasm.wasm.v1beta1.AccessTypeParam;

        /**
         * Encodes the specified AccessTypeParam message. Does not implicitly {@link cosmwasm.wasm.v1beta1.AccessTypeParam.verify|verify} messages.
         * @param m AccessTypeParam message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: cosmwasm.wasm.v1beta1.IAccessTypeParam,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes an AccessTypeParam message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns AccessTypeParam
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): cosmwasm.wasm.v1beta1.AccessTypeParam;
      }

      /** Properties of an AccessConfig. */
      interface IAccessConfig {
        /** AccessConfig permission */
        permission?: cosmwasm.wasm.v1beta1.AccessType | null;

        /** AccessConfig address */
        address?: string | null;
      }

      /** Represents an AccessConfig. */
      class AccessConfig implements IAccessConfig {
        /**
         * Constructs a new AccessConfig.
         * @param [p] Properties to set
         */
        constructor(p?: cosmwasm.wasm.v1beta1.IAccessConfig);

        /** AccessConfig permission. */
        public permission: cosmwasm.wasm.v1beta1.AccessType;

        /** AccessConfig address. */
        public address: string;

        /**
         * Creates a new AccessConfig instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AccessConfig instance
         */
        public static create(
          properties?: cosmwasm.wasm.v1beta1.IAccessConfig,
        ): cosmwasm.wasm.v1beta1.AccessConfig;

        /**
         * Encodes the specified AccessConfig message. Does not implicitly {@link cosmwasm.wasm.v1beta1.AccessConfig.verify|verify} messages.
         * @param m AccessConfig message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: cosmwasm.wasm.v1beta1.IAccessConfig, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AccessConfig message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns AccessConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): cosmwasm.wasm.v1beta1.AccessConfig;
      }

      /** Properties of a Params. */
      interface IParams {
        /** Params codeUploadAccess */
        codeUploadAccess?: cosmwasm.wasm.v1beta1.IAccessConfig | null;

        /** Params instantiateDefaultPermission */
        instantiateDefaultPermission?: cosmwasm.wasm.v1beta1.AccessType | null;

        /** Params maxWasmCodeSize */
        maxWasmCodeSize?: Long | null;
      }

      /** Represents a Params. */
      class Params implements IParams {
        /**
         * Constructs a new Params.
         * @param [p] Properties to set
         */
        constructor(p?: cosmwasm.wasm.v1beta1.IParams);

        /** Params codeUploadAccess. */
        public codeUploadAccess?: cosmwasm.wasm.v1beta1.IAccessConfig | null;

        /** Params instantiateDefaultPermission. */
        public instantiateDefaultPermission: cosmwasm.wasm.v1beta1.AccessType;

        /** Params maxWasmCodeSize. */
        public maxWasmCodeSize: Long;

        /**
         * Creates a new Params instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Params instance
         */
        public static create(properties?: cosmwasm.wasm.v1beta1.IParams): cosmwasm.wasm.v1beta1.Params;

        /**
         * Encodes the specified Params message. Does not implicitly {@link cosmwasm.wasm.v1beta1.Params.verify|verify} messages.
         * @param m Params message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: cosmwasm.wasm.v1beta1.IParams, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Params message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns Params
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmwasm.wasm.v1beta1.Params;
      }

      /** Properties of a CodeInfo. */
      interface ICodeInfo {
        /** CodeInfo codeHash */
        codeHash?: Uint8Array | null;

        /** CodeInfo creator */
        creator?: string | null;

        /** CodeInfo source */
        source?: string | null;

        /** CodeInfo builder */
        builder?: string | null;

        /** CodeInfo instantiateConfig */
        instantiateConfig?: cosmwasm.wasm.v1beta1.IAccessConfig | null;
      }

      /** Represents a CodeInfo. */
      class CodeInfo implements ICodeInfo {
        /**
         * Constructs a new CodeInfo.
         * @param [p] Properties to set
         */
        constructor(p?: cosmwasm.wasm.v1beta1.ICodeInfo);

        /** CodeInfo codeHash. */
        public codeHash: Uint8Array;

        /** CodeInfo creator. */
        public creator: string;

        /** CodeInfo source. */
        public source: string;

        /** CodeInfo builder. */
        public builder: string;

        /** CodeInfo instantiateConfig. */
        public instantiateConfig?: cosmwasm.wasm.v1beta1.IAccessConfig | null;

        /**
         * Creates a new CodeInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CodeInfo instance
         */
        public static create(properties?: cosmwasm.wasm.v1beta1.ICodeInfo): cosmwasm.wasm.v1beta1.CodeInfo;

        /**
         * Encodes the specified CodeInfo message. Does not implicitly {@link cosmwasm.wasm.v1beta1.CodeInfo.verify|verify} messages.
         * @param m CodeInfo message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: cosmwasm.wasm.v1beta1.ICodeInfo, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CodeInfo message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns CodeInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmwasm.wasm.v1beta1.CodeInfo;
      }

      /** Properties of a ContractInfo. */
      interface IContractInfo {
        /** ContractInfo codeId */
        codeId?: Long | null;

        /** ContractInfo creator */
        creator?: string | null;

        /** ContractInfo admin */
        admin?: string | null;

        /** ContractInfo label */
        label?: string | null;

        /** ContractInfo created */
        created?: cosmwasm.wasm.v1beta1.IAbsoluteTxPosition | null;
      }

      /** Represents a ContractInfo. */
      class ContractInfo implements IContractInfo {
        /**
         * Constructs a new ContractInfo.
         * @param [p] Properties to set
         */
        constructor(p?: cosmwasm.wasm.v1beta1.IContractInfo);

        /** ContractInfo codeId. */
        public codeId: Long;

        /** ContractInfo creator. */
        public creator: string;

        /** ContractInfo admin. */
        public admin: string;

        /** ContractInfo label. */
        public label: string;

        /** ContractInfo created. */
        public created?: cosmwasm.wasm.v1beta1.IAbsoluteTxPosition | null;

        /**
         * Creates a new ContractInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ContractInfo instance
         */
        public static create(
          properties?: cosmwasm.wasm.v1beta1.IContractInfo,
        ): cosmwasm.wasm.v1beta1.ContractInfo;

        /**
         * Encodes the specified ContractInfo message. Does not implicitly {@link cosmwasm.wasm.v1beta1.ContractInfo.verify|verify} messages.
         * @param m ContractInfo message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: cosmwasm.wasm.v1beta1.IContractInfo, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ContractInfo message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns ContractInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): cosmwasm.wasm.v1beta1.ContractInfo;
      }

      /** ContractCodeHistoryOperationType enum. */
      enum ContractCodeHistoryOperationType {
        CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED = 0,
        CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT = 1,
        CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE = 2,
        CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS = 3,
      }

      /** Properties of a ContractCodeHistoryEntry. */
      interface IContractCodeHistoryEntry {
        /** ContractCodeHistoryEntry operation */
        operation?: cosmwasm.wasm.v1beta1.ContractCodeHistoryOperationType | null;

        /** ContractCodeHistoryEntry codeId */
        codeId?: Long | null;

        /** ContractCodeHistoryEntry updated */
        updated?: cosmwasm.wasm.v1beta1.IAbsoluteTxPosition | null;

        /** ContractCodeHistoryEntry msg */
        msg?: Uint8Array | null;
      }

      /** Represents a ContractCodeHistoryEntry. */
      class ContractCodeHistoryEntry implements IContractCodeHistoryEntry {
        /**
         * Constructs a new ContractCodeHistoryEntry.
         * @param [p] Properties to set
         */
        constructor(p?: cosmwasm.wasm.v1beta1.IContractCodeHistoryEntry);

        /** ContractCodeHistoryEntry operation. */
        public operation: cosmwasm.wasm.v1beta1.ContractCodeHistoryOperationType;

        /** ContractCodeHistoryEntry codeId. */
        public codeId: Long;

        /** ContractCodeHistoryEntry updated. */
        public updated?: cosmwasm.wasm.v1beta1.IAbsoluteTxPosition | null;

        /** ContractCodeHistoryEntry msg. */
        public msg: Uint8Array;

        /**
         * Creates a new ContractCodeHistoryEntry instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ContractCodeHistoryEntry instance
         */
        public static create(
          properties?: cosmwasm.wasm.v1beta1.IContractCodeHistoryEntry,
        ): cosmwasm.wasm.v1beta1.ContractCodeHistoryEntry;

        /**
         * Encodes the specified ContractCodeHistoryEntry message. Does not implicitly {@link cosmwasm.wasm.v1beta1.ContractCodeHistoryEntry.verify|verify} messages.
         * @param m ContractCodeHistoryEntry message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: cosmwasm.wasm.v1beta1.IContractCodeHistoryEntry,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a ContractCodeHistoryEntry message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns ContractCodeHistoryEntry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): cosmwasm.wasm.v1beta1.ContractCodeHistoryEntry;
      }

      /** Properties of an AbsoluteTxPosition. */
      interface IAbsoluteTxPosition {
        /** AbsoluteTxPosition blockHeight */
        blockHeight?: Long | null;

        /** AbsoluteTxPosition txIndex */
        txIndex?: Long | null;
      }

      /** Represents an AbsoluteTxPosition. */
      class AbsoluteTxPosition implements IAbsoluteTxPosition {
        /**
         * Constructs a new AbsoluteTxPosition.
         * @param [p] Properties to set
         */
        constructor(p?: cosmwasm.wasm.v1beta1.IAbsoluteTxPosition);

        /** AbsoluteTxPosition blockHeight. */
        public blockHeight: Long;

        /** AbsoluteTxPosition txIndex. */
        public txIndex: Long;

        /**
         * Creates a new AbsoluteTxPosition instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AbsoluteTxPosition instance
         */
        public static create(
          properties?: cosmwasm.wasm.v1beta1.IAbsoluteTxPosition,
        ): cosmwasm.wasm.v1beta1.AbsoluteTxPosition;

        /**
         * Encodes the specified AbsoluteTxPosition message. Does not implicitly {@link cosmwasm.wasm.v1beta1.AbsoluteTxPosition.verify|verify} messages.
         * @param m AbsoluteTxPosition message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: cosmwasm.wasm.v1beta1.IAbsoluteTxPosition,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes an AbsoluteTxPosition message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns AbsoluteTxPosition
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): cosmwasm.wasm.v1beta1.AbsoluteTxPosition;
      }

      /** Properties of a Model. */
      interface IModel {
        /** Model key */
        key?: Uint8Array | null;

        /** Model value */
        value?: Uint8Array | null;
      }

      /** Represents a Model. */
      class Model implements IModel {
        /**
         * Constructs a new Model.
         * @param [p] Properties to set
         */
        constructor(p?: cosmwasm.wasm.v1beta1.IModel);

        /** Model key. */
        public key: Uint8Array;

        /** Model value. */
        public value: Uint8Array;

        /**
         * Creates a new Model instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Model instance
         */
        public static create(properties?: cosmwasm.wasm.v1beta1.IModel): cosmwasm.wasm.v1beta1.Model;

        /**
         * Encodes the specified Model message. Does not implicitly {@link cosmwasm.wasm.v1beta1.Model.verify|verify} messages.
         * @param m Model message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: cosmwasm.wasm.v1beta1.IModel, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Model message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns Model
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmwasm.wasm.v1beta1.Model;
      }
    }
  }
}

/** Namespace google. */
export namespace google {
  /** Namespace api. */
  namespace api {
    /** Properties of a Http. */
    interface IHttp {
      /** Http rules */
      rules?: google.api.IHttpRule[] | null;
    }

    /** Represents a Http. */
    class Http implements IHttp {
      /**
       * Constructs a new Http.
       * @param [p] Properties to set
       */
      constructor(p?: google.api.IHttp);

      /** Http rules. */
      public rules: google.api.IHttpRule[];

      /**
       * Creates a new Http instance using the specified properties.
       * @param [properties] Properties to set
       * @returns Http instance
       */
      public static create(properties?: google.api.IHttp): google.api.Http;

      /**
       * Encodes the specified Http message. Does not implicitly {@link google.api.Http.verify|verify} messages.
       * @param m Http message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: google.api.IHttp, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes a Http message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns Http
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): google.api.Http;
    }

    /** Properties of a HttpRule. */
    interface IHttpRule {
      /** HttpRule get */
      get?: string | null;

      /** HttpRule put */
      put?: string | null;

      /** HttpRule post */
      post?: string | null;

      /** HttpRule delete */
      delete?: string | null;

      /** HttpRule patch */
      patch?: string | null;

      /** HttpRule custom */
      custom?: google.api.ICustomHttpPattern | null;

      /** HttpRule selector */
      selector?: string | null;

      /** HttpRule body */
      body?: string | null;

      /** HttpRule additionalBindings */
      additionalBindings?: google.api.IHttpRule[] | null;
    }

    /** Represents a HttpRule. */
    class HttpRule implements IHttpRule {
      /**
       * Constructs a new HttpRule.
       * @param [p] Properties to set
       */
      constructor(p?: google.api.IHttpRule);

      /** HttpRule get. */
      public get: string;

      /** HttpRule put. */
      public put: string;

      /** HttpRule post. */
      public post: string;

      /** HttpRule delete. */
      public delete: string;

      /** HttpRule patch. */
      public patch: string;

      /** HttpRule custom. */
      public custom?: google.api.ICustomHttpPattern | null;

      /** HttpRule selector. */
      public selector: string;

      /** HttpRule body. */
      public body: string;

      /** HttpRule additionalBindings. */
      public additionalBindings: google.api.IHttpRule[];

      /** HttpRule pattern. */
      public pattern?: "get" | "put" | "post" | "delete" | "patch" | "custom";

      /**
       * Creates a new HttpRule instance using the specified properties.
       * @param [properties] Properties to set
       * @returns HttpRule instance
       */
      public static create(properties?: google.api.IHttpRule): google.api.HttpRule;

      /**
       * Encodes the specified HttpRule message. Does not implicitly {@link google.api.HttpRule.verify|verify} messages.
       * @param m HttpRule message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: google.api.IHttpRule, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes a HttpRule message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns HttpRule
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): google.api.HttpRule;
    }

    /** Properties of a CustomHttpPattern. */
    interface ICustomHttpPattern {
      /** CustomHttpPattern kind */
      kind?: string | null;

      /** CustomHttpPattern path */
      path?: string | null;
    }

    /** Represents a CustomHttpPattern. */
    class CustomHttpPattern implements ICustomHttpPattern {
      /**
       * Constructs a new CustomHttpPattern.
       * @param [p] Properties to set
       */
      constructor(p?: google.api.ICustomHttpPattern);

      /** CustomHttpPattern kind. */
      public kind: string;

      /** CustomHttpPattern path. */
      public path: string;

      /**
       * Creates a new CustomHttpPattern instance using the specified properties.
       * @param [properties] Properties to set
       * @returns CustomHttpPattern instance
       */
      public static create(properties?: google.api.ICustomHttpPattern): google.api.CustomHttpPattern;

      /**
       * Encodes the specified CustomHttpPattern message. Does not implicitly {@link google.api.CustomHttpPattern.verify|verify} messages.
       * @param m CustomHttpPattern message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: google.api.ICustomHttpPattern, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes a CustomHttpPattern message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns CustomHttpPattern
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): google.api.CustomHttpPattern;
    }
  }

  /** Namespace protobuf. */
  namespace protobuf {
    /** Properties of a FileDescriptorSet. */
    interface IFileDescriptorSet {
      /** FileDescriptorSet file */
      file?: google.protobuf.IFileDescriptorProto[] | null;
    }

    /** Represents a FileDescriptorSet. */
    class FileDescriptorSet implements IFileDescriptorSet {
      /**
       * Constructs a new FileDescriptorSet.
       * @param [p] Properties to set
       */
      constructor(p?: google.protobuf.IFileDescriptorSet);

      /** FileDescriptorSet file. */
      public file: google.protobuf.IFileDescriptorProto[];

      /**
       * Creates a new FileDescriptorSet instance using the specified properties.
       * @param [properties] Properties to set
       * @returns FileDescriptorSet instance
       */
      public static create(
        properties?: google.protobuf.IFileDescriptorSet,
      ): google.protobuf.FileDescriptorSet;

      /**
       * Encodes the specified FileDescriptorSet message. Does not implicitly {@link google.protobuf.FileDescriptorSet.verify|verify} messages.
       * @param m FileDescriptorSet message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: google.protobuf.IFileDescriptorSet, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes a FileDescriptorSet message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns FileDescriptorSet
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): google.protobuf.FileDescriptorSet;
    }

    /** Properties of a FileDescriptorProto. */
    interface IFileDescriptorProto {
      /** FileDescriptorProto name */
      name?: string | null;

      /** FileDescriptorProto package */
      package?: string | null;

      /** FileDescriptorProto dependency */
      dependency?: string[] | null;

      /** FileDescriptorProto publicDependency */
      publicDependency?: number[] | null;

      /** FileDescriptorProto weakDependency */
      weakDependency?: number[] | null;

      /** FileDescriptorProto messageType */
      messageType?: google.protobuf.IDescriptorProto[] | null;

      /** FileDescriptorProto enumType */
      enumType?: google.protobuf.IEnumDescriptorProto[] | null;

      /** FileDescriptorProto service */
      service?: google.protobuf.IServiceDescriptorProto[] | null;

      /** FileDescriptorProto extension */
      extension?: google.protobuf.IFieldDescriptorProto[] | null;

      /** FileDescriptorProto options */
      options?: google.protobuf.IFileOptions | null;

      /** FileDescriptorProto sourceCodeInfo */
      sourceCodeInfo?: google.protobuf.ISourceCodeInfo | null;

      /** FileDescriptorProto syntax */
      syntax?: string | null;
    }

    /** Represents a FileDescriptorProto. */
    class FileDescriptorProto implements IFileDescriptorProto {
      /**
       * Constructs a new FileDescriptorProto.
       * @param [p] Properties to set
       */
      constructor(p?: google.protobuf.IFileDescriptorProto);

      /** FileDescriptorProto name. */
      public name: string;

      /** FileDescriptorProto package. */
      public package: string;

      /** FileDescriptorProto dependency. */
      public dependency: string[];

      /** FileDescriptorProto publicDependency. */
      public publicDependency: number[];

      /** FileDescriptorProto weakDependency. */
      public weakDependency: number[];

      /** FileDescriptorProto messageType. */
      public messageType: google.protobuf.IDescriptorProto[];

      /** FileDescriptorProto enumType. */
      public enumType: google.protobuf.IEnumDescriptorProto[];

      /** FileDescriptorProto service. */
      public service: google.protobuf.IServiceDescriptorProto[];

      /** FileDescriptorProto extension. */
      public extension: google.protobuf.IFieldDescriptorProto[];

      /** FileDescriptorProto options. */
      public options?: google.protobuf.IFileOptions | null;

      /** FileDescriptorProto sourceCodeInfo. */
      public sourceCodeInfo?: google.protobuf.ISourceCodeInfo | null;

      /** FileDescriptorProto syntax. */
      public syntax: string;

      /**
       * Creates a new FileDescriptorProto instance using the specified properties.
       * @param [properties] Properties to set
       * @returns FileDescriptorProto instance
       */
      public static create(
        properties?: google.protobuf.IFileDescriptorProto,
      ): google.protobuf.FileDescriptorProto;

      /**
       * Encodes the specified FileDescriptorProto message. Does not implicitly {@link google.protobuf.FileDescriptorProto.verify|verify} messages.
       * @param m FileDescriptorProto message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: google.protobuf.IFileDescriptorProto, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes a FileDescriptorProto message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns FileDescriptorProto
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): google.protobuf.FileDescriptorProto;
    }

    /** Properties of a DescriptorProto. */
    interface IDescriptorProto {
      /** DescriptorProto name */
      name?: string | null;

      /** DescriptorProto field */
      field?: google.protobuf.IFieldDescriptorProto[] | null;

      /** DescriptorProto extension */
      extension?: google.protobuf.IFieldDescriptorProto[] | null;

      /** DescriptorProto nestedType */
      nestedType?: google.protobuf.IDescriptorProto[] | null;

      /** DescriptorProto enumType */
      enumType?: google.protobuf.IEnumDescriptorProto[] | null;

      /** DescriptorProto extensionRange */
      extensionRange?: google.protobuf.DescriptorProto.IExtensionRange[] | null;

      /** DescriptorProto oneofDecl */
      oneofDecl?: google.protobuf.IOneofDescriptorProto[] | null;

      /** DescriptorProto options */
      options?: google.protobuf.IMessageOptions | null;

      /** DescriptorProto reservedRange */
      reservedRange?: google.protobuf.DescriptorProto.IReservedRange[] | null;

      /** DescriptorProto reservedName */
      reservedName?: string[] | null;
    }

    /** Represents a DescriptorProto. */
    class DescriptorProto implements IDescriptorProto {
      /**
       * Constructs a new DescriptorProto.
       * @param [p] Properties to set
       */
      constructor(p?: google.protobuf.IDescriptorProto);

      /** DescriptorProto name. */
      public name: string;

      /** DescriptorProto field. */
      public field: google.protobuf.IFieldDescriptorProto[];

      /** DescriptorProto extension. */
      public extension: google.protobuf.IFieldDescriptorProto[];

      /** DescriptorProto nestedType. */
      public nestedType: google.protobuf.IDescriptorProto[];

      /** DescriptorProto enumType. */
      public enumType: google.protobuf.IEnumDescriptorProto[];

      /** DescriptorProto extensionRange. */
      public extensionRange: google.protobuf.DescriptorProto.IExtensionRange[];

      /** DescriptorProto oneofDecl. */
      public oneofDecl: google.protobuf.IOneofDescriptorProto[];

      /** DescriptorProto options. */
      public options?: google.protobuf.IMessageOptions | null;

      /** DescriptorProto reservedRange. */
      public reservedRange: google.protobuf.DescriptorProto.IReservedRange[];

      /** DescriptorProto reservedName. */
      public reservedName: string[];

      /**
       * Creates a new DescriptorProto instance using the specified properties.
       * @param [properties] Properties to set
       * @returns DescriptorProto instance
       */
      public static create(properties?: google.protobuf.IDescriptorProto): google.protobuf.DescriptorProto;

      /**
       * Encodes the specified DescriptorProto message. Does not implicitly {@link google.protobuf.DescriptorProto.verify|verify} messages.
       * @param m DescriptorProto message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: google.protobuf.IDescriptorProto, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes a DescriptorProto message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns DescriptorProto
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): google.protobuf.DescriptorProto;
    }

    namespace DescriptorProto {
      /** Properties of an ExtensionRange. */
      interface IExtensionRange {
        /** ExtensionRange start */
        start?: number | null;

        /** ExtensionRange end */
        end?: number | null;
      }

      /** Represents an ExtensionRange. */
      class ExtensionRange implements IExtensionRange {
        /**
         * Constructs a new ExtensionRange.
         * @param [p] Properties to set
         */
        constructor(p?: google.protobuf.DescriptorProto.IExtensionRange);

        /** ExtensionRange start. */
        public start: number;

        /** ExtensionRange end. */
        public end: number;

        /**
         * Creates a new ExtensionRange instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ExtensionRange instance
         */
        public static create(
          properties?: google.protobuf.DescriptorProto.IExtensionRange,
        ): google.protobuf.DescriptorProto.ExtensionRange;

        /**
         * Encodes the specified ExtensionRange message. Does not implicitly {@link google.protobuf.DescriptorProto.ExtensionRange.verify|verify} messages.
         * @param m ExtensionRange message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: google.protobuf.DescriptorProto.IExtensionRange,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes an ExtensionRange message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns ExtensionRange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): google.protobuf.DescriptorProto.ExtensionRange;
      }

      /** Properties of a ReservedRange. */
      interface IReservedRange {
        /** ReservedRange start */
        start?: number | null;

        /** ReservedRange end */
        end?: number | null;
      }

      /** Represents a ReservedRange. */
      class ReservedRange implements IReservedRange {
        /**
         * Constructs a new ReservedRange.
         * @param [p] Properties to set
         */
        constructor(p?: google.protobuf.DescriptorProto.IReservedRange);

        /** ReservedRange start. */
        public start: number;

        /** ReservedRange end. */
        public end: number;

        /**
         * Creates a new ReservedRange instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReservedRange instance
         */
        public static create(
          properties?: google.protobuf.DescriptorProto.IReservedRange,
        ): google.protobuf.DescriptorProto.ReservedRange;

        /**
         * Encodes the specified ReservedRange message. Does not implicitly {@link google.protobuf.DescriptorProto.ReservedRange.verify|verify} messages.
         * @param m ReservedRange message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: google.protobuf.DescriptorProto.IReservedRange,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a ReservedRange message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns ReservedRange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): google.protobuf.DescriptorProto.ReservedRange;
      }
    }

    /** Properties of a FieldDescriptorProto. */
    interface IFieldDescriptorProto {
      /** FieldDescriptorProto name */
      name?: string | null;

      /** FieldDescriptorProto number */
      number?: number | null;

      /** FieldDescriptorProto label */
      label?: google.protobuf.FieldDescriptorProto.Label | null;

      /** FieldDescriptorProto type */
      type?: google.protobuf.FieldDescriptorProto.Type | null;

      /** FieldDescriptorProto typeName */
      typeName?: string | null;

      /** FieldDescriptorProto extendee */
      extendee?: string | null;

      /** FieldDescriptorProto defaultValue */
      defaultValue?: string | null;

      /** FieldDescriptorProto oneofIndex */
      oneofIndex?: number | null;

      /** FieldDescriptorProto jsonName */
      jsonName?: string | null;

      /** FieldDescriptorProto options */
      options?: google.protobuf.IFieldOptions | null;
    }

    /** Represents a FieldDescriptorProto. */
    class FieldDescriptorProto implements IFieldDescriptorProto {
      /**
       * Constructs a new FieldDescriptorProto.
       * @param [p] Properties to set
       */
      constructor(p?: google.protobuf.IFieldDescriptorProto);

      /** FieldDescriptorProto name. */
      public name: string;

      /** FieldDescriptorProto number. */
      public number: number;

      /** FieldDescriptorProto label. */
      public label: google.protobuf.FieldDescriptorProto.Label;

      /** FieldDescriptorProto type. */
      public type: google.protobuf.FieldDescriptorProto.Type;

      /** FieldDescriptorProto typeName. */
      public typeName: string;

      /** FieldDescriptorProto extendee. */
      public extendee: string;

      /** FieldDescriptorProto defaultValue. */
      public defaultValue: string;

      /** FieldDescriptorProto oneofIndex. */
      public oneofIndex: number;

      /** FieldDescriptorProto jsonName. */
      public jsonName: string;

      /** FieldDescriptorProto options. */
      public options?: google.protobuf.IFieldOptions | null;

      /**
       * Creates a new FieldDescriptorProto instance using the specified properties.
       * @param [properties] Properties to set
       * @returns FieldDescriptorProto instance
       */
      public static create(
        properties?: google.protobuf.IFieldDescriptorProto,
      ): google.protobuf.FieldDescriptorProto;

      /**
       * Encodes the specified FieldDescriptorProto message. Does not implicitly {@link google.protobuf.FieldDescriptorProto.verify|verify} messages.
       * @param m FieldDescriptorProto message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: google.protobuf.IFieldDescriptorProto, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes a FieldDescriptorProto message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns FieldDescriptorProto
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        r: $protobuf.Reader | Uint8Array,
        l?: number,
      ): google.protobuf.FieldDescriptorProto;
    }

    namespace FieldDescriptorProto {
      /** Type enum. */
      enum Type {
        TYPE_DOUBLE = 1,
        TYPE_FLOAT = 2,
        TYPE_INT64 = 3,
        TYPE_UINT64 = 4,
        TYPE_INT32 = 5,
        TYPE_FIXED64 = 6,
        TYPE_FIXED32 = 7,
        TYPE_BOOL = 8,
        TYPE_STRING = 9,
        TYPE_GROUP = 10,
        TYPE_MESSAGE = 11,
        TYPE_BYTES = 12,
        TYPE_UINT32 = 13,
        TYPE_ENUM = 14,
        TYPE_SFIXED32 = 15,
        TYPE_SFIXED64 = 16,
        TYPE_SINT32 = 17,
        TYPE_SINT64 = 18,
      }

      /** Label enum. */
      enum Label {
        LABEL_OPTIONAL = 1,
        LABEL_REQUIRED = 2,
        LABEL_REPEATED = 3,
      }
    }

    /** Properties of an OneofDescriptorProto. */
    interface IOneofDescriptorProto {
      /** OneofDescriptorProto name */
      name?: string | null;

      /** OneofDescriptorProto options */
      options?: google.protobuf.IOneofOptions | null;
    }

    /** Represents an OneofDescriptorProto. */
    class OneofDescriptorProto implements IOneofDescriptorProto {
      /**
       * Constructs a new OneofDescriptorProto.
       * @param [p] Properties to set
       */
      constructor(p?: google.protobuf.IOneofDescriptorProto);

      /** OneofDescriptorProto name. */
      public name: string;

      /** OneofDescriptorProto options. */
      public options?: google.protobuf.IOneofOptions | null;

      /**
       * Creates a new OneofDescriptorProto instance using the specified properties.
       * @param [properties] Properties to set
       * @returns OneofDescriptorProto instance
       */
      public static create(
        properties?: google.protobuf.IOneofDescriptorProto,
      ): google.protobuf.OneofDescriptorProto;

      /**
       * Encodes the specified OneofDescriptorProto message. Does not implicitly {@link google.protobuf.OneofDescriptorProto.verify|verify} messages.
       * @param m OneofDescriptorProto message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: google.protobuf.IOneofDescriptorProto, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes an OneofDescriptorProto message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns OneofDescriptorProto
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        r: $protobuf.Reader | Uint8Array,
        l?: number,
      ): google.protobuf.OneofDescriptorProto;
    }

    /** Properties of an EnumDescriptorProto. */
    interface IEnumDescriptorProto {
      /** EnumDescriptorProto name */
      name?: string | null;

      /** EnumDescriptorProto value */
      value?: google.protobuf.IEnumValueDescriptorProto[] | null;

      /** EnumDescriptorProto options */
      options?: google.protobuf.IEnumOptions | null;
    }

    /** Represents an EnumDescriptorProto. */
    class EnumDescriptorProto implements IEnumDescriptorProto {
      /**
       * Constructs a new EnumDescriptorProto.
       * @param [p] Properties to set
       */
      constructor(p?: google.protobuf.IEnumDescriptorProto);

      /** EnumDescriptorProto name. */
      public name: string;

      /** EnumDescriptorProto value. */
      public value: google.protobuf.IEnumValueDescriptorProto[];

      /** EnumDescriptorProto options. */
      public options?: google.protobuf.IEnumOptions | null;

      /**
       * Creates a new EnumDescriptorProto instance using the specified properties.
       * @param [properties] Properties to set
       * @returns EnumDescriptorProto instance
       */
      public static create(
        properties?: google.protobuf.IEnumDescriptorProto,
      ): google.protobuf.EnumDescriptorProto;

      /**
       * Encodes the specified EnumDescriptorProto message. Does not implicitly {@link google.protobuf.EnumDescriptorProto.verify|verify} messages.
       * @param m EnumDescriptorProto message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: google.protobuf.IEnumDescriptorProto, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes an EnumDescriptorProto message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns EnumDescriptorProto
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): google.protobuf.EnumDescriptorProto;
    }

    /** Properties of an EnumValueDescriptorProto. */
    interface IEnumValueDescriptorProto {
      /** EnumValueDescriptorProto name */
      name?: string | null;

      /** EnumValueDescriptorProto number */
      number?: number | null;

      /** EnumValueDescriptorProto options */
      options?: google.protobuf.IEnumValueOptions | null;
    }

    /** Represents an EnumValueDescriptorProto. */
    class EnumValueDescriptorProto implements IEnumValueDescriptorProto {
      /**
       * Constructs a new EnumValueDescriptorProto.
       * @param [p] Properties to set
       */
      constructor(p?: google.protobuf.IEnumValueDescriptorProto);

      /** EnumValueDescriptorProto name. */
      public name: string;

      /** EnumValueDescriptorProto number. */
      public number: number;

      /** EnumValueDescriptorProto options. */
      public options?: google.protobuf.IEnumValueOptions | null;

      /**
       * Creates a new EnumValueDescriptorProto instance using the specified properties.
       * @param [properties] Properties to set
       * @returns EnumValueDescriptorProto instance
       */
      public static create(
        properties?: google.protobuf.IEnumValueDescriptorProto,
      ): google.protobuf.EnumValueDescriptorProto;

      /**
       * Encodes the specified EnumValueDescriptorProto message. Does not implicitly {@link google.protobuf.EnumValueDescriptorProto.verify|verify} messages.
       * @param m EnumValueDescriptorProto message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(
        m: google.protobuf.IEnumValueDescriptorProto,
        w?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes an EnumValueDescriptorProto message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns EnumValueDescriptorProto
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        r: $protobuf.Reader | Uint8Array,
        l?: number,
      ): google.protobuf.EnumValueDescriptorProto;
    }

    /** Properties of a ServiceDescriptorProto. */
    interface IServiceDescriptorProto {
      /** ServiceDescriptorProto name */
      name?: string | null;

      /** ServiceDescriptorProto method */
      method?: google.protobuf.IMethodDescriptorProto[] | null;

      /** ServiceDescriptorProto options */
      options?: google.protobuf.IServiceOptions | null;
    }

    /** Represents a ServiceDescriptorProto. */
    class ServiceDescriptorProto implements IServiceDescriptorProto {
      /**
       * Constructs a new ServiceDescriptorProto.
       * @param [p] Properties to set
       */
      constructor(p?: google.protobuf.IServiceDescriptorProto);

      /** ServiceDescriptorProto name. */
      public name: string;

      /** ServiceDescriptorProto method. */
      public method: google.protobuf.IMethodDescriptorProto[];

      /** ServiceDescriptorProto options. */
      public options?: google.protobuf.IServiceOptions | null;

      /**
       * Creates a new ServiceDescriptorProto instance using the specified properties.
       * @param [properties] Properties to set
       * @returns ServiceDescriptorProto instance
       */
      public static create(
        properties?: google.protobuf.IServiceDescriptorProto,
      ): google.protobuf.ServiceDescriptorProto;

      /**
       * Encodes the specified ServiceDescriptorProto message. Does not implicitly {@link google.protobuf.ServiceDescriptorProto.verify|verify} messages.
       * @param m ServiceDescriptorProto message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(
        m: google.protobuf.IServiceDescriptorProto,
        w?: $protobuf.Writer,
      ): $protobuf.Writer;

      /**
       * Decodes a ServiceDescriptorProto message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns ServiceDescriptorProto
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        r: $protobuf.Reader | Uint8Array,
        l?: number,
      ): google.protobuf.ServiceDescriptorProto;
    }

    /** Properties of a MethodDescriptorProto. */
    interface IMethodDescriptorProto {
      /** MethodDescriptorProto name */
      name?: string | null;

      /** MethodDescriptorProto inputType */
      inputType?: string | null;

      /** MethodDescriptorProto outputType */
      outputType?: string | null;

      /** MethodDescriptorProto options */
      options?: google.protobuf.IMethodOptions | null;

      /** MethodDescriptorProto clientStreaming */
      clientStreaming?: boolean | null;

      /** MethodDescriptorProto serverStreaming */
      serverStreaming?: boolean | null;
    }

    /** Represents a MethodDescriptorProto. */
    class MethodDescriptorProto implements IMethodDescriptorProto {
      /**
       * Constructs a new MethodDescriptorProto.
       * @param [p] Properties to set
       */
      constructor(p?: google.protobuf.IMethodDescriptorProto);

      /** MethodDescriptorProto name. */
      public name: string;

      /** MethodDescriptorProto inputType. */
      public inputType: string;

      /** MethodDescriptorProto outputType. */
      public outputType: string;

      /** MethodDescriptorProto options. */
      public options?: google.protobuf.IMethodOptions | null;

      /** MethodDescriptorProto clientStreaming. */
      public clientStreaming: boolean;

      /** MethodDescriptorProto serverStreaming. */
      public serverStreaming: boolean;

      /**
       * Creates a new MethodDescriptorProto instance using the specified properties.
       * @param [properties] Properties to set
       * @returns MethodDescriptorProto instance
       */
      public static create(
        properties?: google.protobuf.IMethodDescriptorProto,
      ): google.protobuf.MethodDescriptorProto;

      /**
       * Encodes the specified MethodDescriptorProto message. Does not implicitly {@link google.protobuf.MethodDescriptorProto.verify|verify} messages.
       * @param m MethodDescriptorProto message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: google.protobuf.IMethodDescriptorProto, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes a MethodDescriptorProto message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns MethodDescriptorProto
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        r: $protobuf.Reader | Uint8Array,
        l?: number,
      ): google.protobuf.MethodDescriptorProto;
    }

    /** Properties of a FileOptions. */
    interface IFileOptions {
      /** FileOptions javaPackage */
      javaPackage?: string | null;

      /** FileOptions javaOuterClassname */
      javaOuterClassname?: string | null;

      /** FileOptions javaMultipleFiles */
      javaMultipleFiles?: boolean | null;

      /** FileOptions javaGenerateEqualsAndHash */
      javaGenerateEqualsAndHash?: boolean | null;

      /** FileOptions javaStringCheckUtf8 */
      javaStringCheckUtf8?: boolean | null;

      /** FileOptions optimizeFor */
      optimizeFor?: google.protobuf.FileOptions.OptimizeMode | null;

      /** FileOptions goPackage */
      goPackage?: string | null;

      /** FileOptions ccGenericServices */
      ccGenericServices?: boolean | null;

      /** FileOptions javaGenericServices */
      javaGenericServices?: boolean | null;

      /** FileOptions pyGenericServices */
      pyGenericServices?: boolean | null;

      /** FileOptions deprecated */
      deprecated?: boolean | null;

      /** FileOptions ccEnableArenas */
      ccEnableArenas?: boolean | null;

      /** FileOptions objcClassPrefix */
      objcClassPrefix?: string | null;

      /** FileOptions csharpNamespace */
      csharpNamespace?: string | null;

      /** FileOptions uninterpretedOption */
      uninterpretedOption?: google.protobuf.IUninterpretedOption[] | null;
    }

    /** Represents a FileOptions. */
    class FileOptions implements IFileOptions {
      /**
       * Constructs a new FileOptions.
       * @param [p] Properties to set
       */
      constructor(p?: google.protobuf.IFileOptions);

      /** FileOptions javaPackage. */
      public javaPackage: string;

      /** FileOptions javaOuterClassname. */
      public javaOuterClassname: string;

      /** FileOptions javaMultipleFiles. */
      public javaMultipleFiles: boolean;

      /** FileOptions javaGenerateEqualsAndHash. */
      public javaGenerateEqualsAndHash: boolean;

      /** FileOptions javaStringCheckUtf8. */
      public javaStringCheckUtf8: boolean;

      /** FileOptions optimizeFor. */
      public optimizeFor: google.protobuf.FileOptions.OptimizeMode;

      /** FileOptions goPackage. */
      public goPackage: string;

      /** FileOptions ccGenericServices. */
      public ccGenericServices: boolean;

      /** FileOptions javaGenericServices. */
      public javaGenericServices: boolean;

      /** FileOptions pyGenericServices. */
      public pyGenericServices: boolean;

      /** FileOptions deprecated. */
      public deprecated: boolean;

      /** FileOptions ccEnableArenas. */
      public ccEnableArenas: boolean;

      /** FileOptions objcClassPrefix. */
      public objcClassPrefix: string;

      /** FileOptions csharpNamespace. */
      public csharpNamespace: string;

      /** FileOptions uninterpretedOption. */
      public uninterpretedOption: google.protobuf.IUninterpretedOption[];

      /**
       * Creates a new FileOptions instance using the specified properties.
       * @param [properties] Properties to set
       * @returns FileOptions instance
       */
      public static create(properties?: google.protobuf.IFileOptions): google.protobuf.FileOptions;

      /**
       * Encodes the specified FileOptions message. Does not implicitly {@link google.protobuf.FileOptions.verify|verify} messages.
       * @param m FileOptions message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: google.protobuf.IFileOptions, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes a FileOptions message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns FileOptions
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): google.protobuf.FileOptions;
    }

    namespace FileOptions {
      /** OptimizeMode enum. */
      enum OptimizeMode {
        SPEED = 1,
        CODE_SIZE = 2,
        LITE_RUNTIME = 3,
      }
    }

    /** Properties of a MessageOptions. */
    interface IMessageOptions {
      /** MessageOptions messageSetWireFormat */
      messageSetWireFormat?: boolean | null;

      /** MessageOptions noStandardDescriptorAccessor */
      noStandardDescriptorAccessor?: boolean | null;

      /** MessageOptions deprecated */
      deprecated?: boolean | null;

      /** MessageOptions mapEntry */
      mapEntry?: boolean | null;

      /** MessageOptions uninterpretedOption */
      uninterpretedOption?: google.protobuf.IUninterpretedOption[] | null;
    }

    /** Represents a MessageOptions. */
    class MessageOptions implements IMessageOptions {
      /**
       * Constructs a new MessageOptions.
       * @param [p] Properties to set
       */
      constructor(p?: google.protobuf.IMessageOptions);

      /** MessageOptions messageSetWireFormat. */
      public messageSetWireFormat: boolean;

      /** MessageOptions noStandardDescriptorAccessor. */
      public noStandardDescriptorAccessor: boolean;

      /** MessageOptions deprecated. */
      public deprecated: boolean;

      /** MessageOptions mapEntry. */
      public mapEntry: boolean;

      /** MessageOptions uninterpretedOption. */
      public uninterpretedOption: google.protobuf.IUninterpretedOption[];

      /**
       * Creates a new MessageOptions instance using the specified properties.
       * @param [properties] Properties to set
       * @returns MessageOptions instance
       */
      public static create(properties?: google.protobuf.IMessageOptions): google.protobuf.MessageOptions;

      /**
       * Encodes the specified MessageOptions message. Does not implicitly {@link google.protobuf.MessageOptions.verify|verify} messages.
       * @param m MessageOptions message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: google.protobuf.IMessageOptions, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes a MessageOptions message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns MessageOptions
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): google.protobuf.MessageOptions;
    }

    /** Properties of a FieldOptions. */
    interface IFieldOptions {
      /** FieldOptions ctype */
      ctype?: google.protobuf.FieldOptions.CType | null;

      /** FieldOptions packed */
      packed?: boolean | null;

      /** FieldOptions jstype */
      jstype?: google.protobuf.FieldOptions.JSType | null;

      /** FieldOptions lazy */
      lazy?: boolean | null;

      /** FieldOptions deprecated */
      deprecated?: boolean | null;

      /** FieldOptions weak */
      weak?: boolean | null;

      /** FieldOptions uninterpretedOption */
      uninterpretedOption?: google.protobuf.IUninterpretedOption[] | null;
    }

    /** Represents a FieldOptions. */
    class FieldOptions implements IFieldOptions {
      /**
       * Constructs a new FieldOptions.
       * @param [p] Properties to set
       */
      constructor(p?: google.protobuf.IFieldOptions);

      /** FieldOptions ctype. */
      public ctype: google.protobuf.FieldOptions.CType;

      /** FieldOptions packed. */
      public packed: boolean;

      /** FieldOptions jstype. */
      public jstype: google.protobuf.FieldOptions.JSType;

      /** FieldOptions lazy. */
      public lazy: boolean;

      /** FieldOptions deprecated. */
      public deprecated: boolean;

      /** FieldOptions weak. */
      public weak: boolean;

      /** FieldOptions uninterpretedOption. */
      public uninterpretedOption: google.protobuf.IUninterpretedOption[];

      /**
       * Creates a new FieldOptions instance using the specified properties.
       * @param [properties] Properties to set
       * @returns FieldOptions instance
       */
      public static create(properties?: google.protobuf.IFieldOptions): google.protobuf.FieldOptions;

      /**
       * Encodes the specified FieldOptions message. Does not implicitly {@link google.protobuf.FieldOptions.verify|verify} messages.
       * @param m FieldOptions message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: google.protobuf.IFieldOptions, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes a FieldOptions message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns FieldOptions
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): google.protobuf.FieldOptions;
    }

    namespace FieldOptions {
      /** CType enum. */
      enum CType {
        STRING = 0,
        CORD = 1,
        STRING_PIECE = 2,
      }

      /** JSType enum. */
      enum JSType {
        JS_NORMAL = 0,
        JS_STRING = 1,
        JS_NUMBER = 2,
      }
    }

    /** Properties of an OneofOptions. */
    interface IOneofOptions {
      /** OneofOptions uninterpretedOption */
      uninterpretedOption?: google.protobuf.IUninterpretedOption[] | null;
    }

    /** Represents an OneofOptions. */
    class OneofOptions implements IOneofOptions {
      /**
       * Constructs a new OneofOptions.
       * @param [p] Properties to set
       */
      constructor(p?: google.protobuf.IOneofOptions);

      /** OneofOptions uninterpretedOption. */
      public uninterpretedOption: google.protobuf.IUninterpretedOption[];

      /**
       * Creates a new OneofOptions instance using the specified properties.
       * @param [properties] Properties to set
       * @returns OneofOptions instance
       */
      public static create(properties?: google.protobuf.IOneofOptions): google.protobuf.OneofOptions;

      /**
       * Encodes the specified OneofOptions message. Does not implicitly {@link google.protobuf.OneofOptions.verify|verify} messages.
       * @param m OneofOptions message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: google.protobuf.IOneofOptions, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes an OneofOptions message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns OneofOptions
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): google.protobuf.OneofOptions;
    }

    /** Properties of an EnumOptions. */
    interface IEnumOptions {
      /** EnumOptions allowAlias */
      allowAlias?: boolean | null;

      /** EnumOptions deprecated */
      deprecated?: boolean | null;

      /** EnumOptions uninterpretedOption */
      uninterpretedOption?: google.protobuf.IUninterpretedOption[] | null;
    }

    /** Represents an EnumOptions. */
    class EnumOptions implements IEnumOptions {
      /**
       * Constructs a new EnumOptions.
       * @param [p] Properties to set
       */
      constructor(p?: google.protobuf.IEnumOptions);

      /** EnumOptions allowAlias. */
      public allowAlias: boolean;

      /** EnumOptions deprecated. */
      public deprecated: boolean;

      /** EnumOptions uninterpretedOption. */
      public uninterpretedOption: google.protobuf.IUninterpretedOption[];

      /**
       * Creates a new EnumOptions instance using the specified properties.
       * @param [properties] Properties to set
       * @returns EnumOptions instance
       */
      public static create(properties?: google.protobuf.IEnumOptions): google.protobuf.EnumOptions;

      /**
       * Encodes the specified EnumOptions message. Does not implicitly {@link google.protobuf.EnumOptions.verify|verify} messages.
       * @param m EnumOptions message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: google.protobuf.IEnumOptions, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes an EnumOptions message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns EnumOptions
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): google.protobuf.EnumOptions;
    }

    /** Properties of an EnumValueOptions. */
    interface IEnumValueOptions {
      /** EnumValueOptions deprecated */
      deprecated?: boolean | null;

      /** EnumValueOptions uninterpretedOption */
      uninterpretedOption?: google.protobuf.IUninterpretedOption[] | null;
    }

    /** Represents an EnumValueOptions. */
    class EnumValueOptions implements IEnumValueOptions {
      /**
       * Constructs a new EnumValueOptions.
       * @param [p] Properties to set
       */
      constructor(p?: google.protobuf.IEnumValueOptions);

      /** EnumValueOptions deprecated. */
      public deprecated: boolean;

      /** EnumValueOptions uninterpretedOption. */
      public uninterpretedOption: google.protobuf.IUninterpretedOption[];

      /**
       * Creates a new EnumValueOptions instance using the specified properties.
       * @param [properties] Properties to set
       * @returns EnumValueOptions instance
       */
      public static create(properties?: google.protobuf.IEnumValueOptions): google.protobuf.EnumValueOptions;

      /**
       * Encodes the specified EnumValueOptions message. Does not implicitly {@link google.protobuf.EnumValueOptions.verify|verify} messages.
       * @param m EnumValueOptions message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: google.protobuf.IEnumValueOptions, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes an EnumValueOptions message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns EnumValueOptions
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): google.protobuf.EnumValueOptions;
    }

    /** Properties of a ServiceOptions. */
    interface IServiceOptions {
      /** ServiceOptions deprecated */
      deprecated?: boolean | null;

      /** ServiceOptions uninterpretedOption */
      uninterpretedOption?: google.protobuf.IUninterpretedOption[] | null;
    }

    /** Represents a ServiceOptions. */
    class ServiceOptions implements IServiceOptions {
      /**
       * Constructs a new ServiceOptions.
       * @param [p] Properties to set
       */
      constructor(p?: google.protobuf.IServiceOptions);

      /** ServiceOptions deprecated. */
      public deprecated: boolean;

      /** ServiceOptions uninterpretedOption. */
      public uninterpretedOption: google.protobuf.IUninterpretedOption[];

      /**
       * Creates a new ServiceOptions instance using the specified properties.
       * @param [properties] Properties to set
       * @returns ServiceOptions instance
       */
      public static create(properties?: google.protobuf.IServiceOptions): google.protobuf.ServiceOptions;

      /**
       * Encodes the specified ServiceOptions message. Does not implicitly {@link google.protobuf.ServiceOptions.verify|verify} messages.
       * @param m ServiceOptions message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: google.protobuf.IServiceOptions, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes a ServiceOptions message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns ServiceOptions
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): google.protobuf.ServiceOptions;
    }

    /** Properties of a MethodOptions. */
    interface IMethodOptions {
      /** MethodOptions deprecated */
      deprecated?: boolean | null;

      /** MethodOptions uninterpretedOption */
      uninterpretedOption?: google.protobuf.IUninterpretedOption[] | null;

      /** MethodOptions .google.api.http */
      ".google.api.http"?: google.api.IHttpRule | null;
    }

    /** Represents a MethodOptions. */
    class MethodOptions implements IMethodOptions {
      /**
       * Constructs a new MethodOptions.
       * @param [p] Properties to set
       */
      constructor(p?: google.protobuf.IMethodOptions);

      /** MethodOptions deprecated. */
      public deprecated: boolean;

      /** MethodOptions uninterpretedOption. */
      public uninterpretedOption: google.protobuf.IUninterpretedOption[];

      /**
       * Creates a new MethodOptions instance using the specified properties.
       * @param [properties] Properties to set
       * @returns MethodOptions instance
       */
      public static create(properties?: google.protobuf.IMethodOptions): google.protobuf.MethodOptions;

      /**
       * Encodes the specified MethodOptions message. Does not implicitly {@link google.protobuf.MethodOptions.verify|verify} messages.
       * @param m MethodOptions message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: google.protobuf.IMethodOptions, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes a MethodOptions message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns MethodOptions
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): google.protobuf.MethodOptions;
    }

    /** Properties of an UninterpretedOption. */
    interface IUninterpretedOption {
      /** UninterpretedOption name */
      name?: google.protobuf.UninterpretedOption.INamePart[] | null;

      /** UninterpretedOption identifierValue */
      identifierValue?: string | null;

      /** UninterpretedOption positiveIntValue */
      positiveIntValue?: Long | null;

      /** UninterpretedOption negativeIntValue */
      negativeIntValue?: Long | null;

      /** UninterpretedOption doubleValue */
      doubleValue?: number | null;

      /** UninterpretedOption stringValue */
      stringValue?: Uint8Array | null;

      /** UninterpretedOption aggregateValue */
      aggregateValue?: string | null;
    }

    /** Represents an UninterpretedOption. */
    class UninterpretedOption implements IUninterpretedOption {
      /**
       * Constructs a new UninterpretedOption.
       * @param [p] Properties to set
       */
      constructor(p?: google.protobuf.IUninterpretedOption);

      /** UninterpretedOption name. */
      public name: google.protobuf.UninterpretedOption.INamePart[];

      /** UninterpretedOption identifierValue. */
      public identifierValue: string;

      /** UninterpretedOption positiveIntValue. */
      public positiveIntValue: Long;

      /** UninterpretedOption negativeIntValue. */
      public negativeIntValue: Long;

      /** UninterpretedOption doubleValue. */
      public doubleValue: number;

      /** UninterpretedOption stringValue. */
      public stringValue: Uint8Array;

      /** UninterpretedOption aggregateValue. */
      public aggregateValue: string;

      /**
       * Creates a new UninterpretedOption instance using the specified properties.
       * @param [properties] Properties to set
       * @returns UninterpretedOption instance
       */
      public static create(
        properties?: google.protobuf.IUninterpretedOption,
      ): google.protobuf.UninterpretedOption;

      /**
       * Encodes the specified UninterpretedOption message. Does not implicitly {@link google.protobuf.UninterpretedOption.verify|verify} messages.
       * @param m UninterpretedOption message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: google.protobuf.IUninterpretedOption, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes an UninterpretedOption message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns UninterpretedOption
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): google.protobuf.UninterpretedOption;
    }

    namespace UninterpretedOption {
      /** Properties of a NamePart. */
      interface INamePart {
        /** NamePart namePart */
        namePart: string;

        /** NamePart isExtension */
        isExtension: boolean;
      }

      /** Represents a NamePart. */
      class NamePart implements INamePart {
        /**
         * Constructs a new NamePart.
         * @param [p] Properties to set
         */
        constructor(p?: google.protobuf.UninterpretedOption.INamePart);

        /** NamePart namePart. */
        public namePart: string;

        /** NamePart isExtension. */
        public isExtension: boolean;

        /**
         * Creates a new NamePart instance using the specified properties.
         * @param [properties] Properties to set
         * @returns NamePart instance
         */
        public static create(
          properties?: google.protobuf.UninterpretedOption.INamePart,
        ): google.protobuf.UninterpretedOption.NamePart;

        /**
         * Encodes the specified NamePart message. Does not implicitly {@link google.protobuf.UninterpretedOption.NamePart.verify|verify} messages.
         * @param m NamePart message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: google.protobuf.UninterpretedOption.INamePart,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a NamePart message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns NamePart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): google.protobuf.UninterpretedOption.NamePart;
      }
    }

    /** Properties of a SourceCodeInfo. */
    interface ISourceCodeInfo {
      /** SourceCodeInfo location */
      location?: google.protobuf.SourceCodeInfo.ILocation[] | null;
    }

    /** Represents a SourceCodeInfo. */
    class SourceCodeInfo implements ISourceCodeInfo {
      /**
       * Constructs a new SourceCodeInfo.
       * @param [p] Properties to set
       */
      constructor(p?: google.protobuf.ISourceCodeInfo);

      /** SourceCodeInfo location. */
      public location: google.protobuf.SourceCodeInfo.ILocation[];

      /**
       * Creates a new SourceCodeInfo instance using the specified properties.
       * @param [properties] Properties to set
       * @returns SourceCodeInfo instance
       */
      public static create(properties?: google.protobuf.ISourceCodeInfo): google.protobuf.SourceCodeInfo;

      /**
       * Encodes the specified SourceCodeInfo message. Does not implicitly {@link google.protobuf.SourceCodeInfo.verify|verify} messages.
       * @param m SourceCodeInfo message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: google.protobuf.ISourceCodeInfo, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes a SourceCodeInfo message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns SourceCodeInfo
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): google.protobuf.SourceCodeInfo;
    }

    namespace SourceCodeInfo {
      /** Properties of a Location. */
      interface ILocation {
        /** Location path */
        path?: number[] | null;

        /** Location span */
        span?: number[] | null;

        /** Location leadingComments */
        leadingComments?: string | null;

        /** Location trailingComments */
        trailingComments?: string | null;

        /** Location leadingDetachedComments */
        leadingDetachedComments?: string[] | null;
      }

      /** Represents a Location. */
      class Location implements ILocation {
        /**
         * Constructs a new Location.
         * @param [p] Properties to set
         */
        constructor(p?: google.protobuf.SourceCodeInfo.ILocation);

        /** Location path. */
        public path: number[];

        /** Location span. */
        public span: number[];

        /** Location leadingComments. */
        public leadingComments: string;

        /** Location trailingComments. */
        public trailingComments: string;

        /** Location leadingDetachedComments. */
        public leadingDetachedComments: string[];

        /**
         * Creates a new Location instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Location instance
         */
        public static create(
          properties?: google.protobuf.SourceCodeInfo.ILocation,
        ): google.protobuf.SourceCodeInfo.Location;

        /**
         * Encodes the specified Location message. Does not implicitly {@link google.protobuf.SourceCodeInfo.Location.verify|verify} messages.
         * @param m Location message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: google.protobuf.SourceCodeInfo.ILocation,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a Location message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns Location
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): google.protobuf.SourceCodeInfo.Location;
      }
    }

    /** Properties of a GeneratedCodeInfo. */
    interface IGeneratedCodeInfo {
      /** GeneratedCodeInfo annotation */
      annotation?: google.protobuf.GeneratedCodeInfo.IAnnotation[] | null;
    }

    /** Represents a GeneratedCodeInfo. */
    class GeneratedCodeInfo implements IGeneratedCodeInfo {
      /**
       * Constructs a new GeneratedCodeInfo.
       * @param [p] Properties to set
       */
      constructor(p?: google.protobuf.IGeneratedCodeInfo);

      /** GeneratedCodeInfo annotation. */
      public annotation: google.protobuf.GeneratedCodeInfo.IAnnotation[];

      /**
       * Creates a new GeneratedCodeInfo instance using the specified properties.
       * @param [properties] Properties to set
       * @returns GeneratedCodeInfo instance
       */
      public static create(
        properties?: google.protobuf.IGeneratedCodeInfo,
      ): google.protobuf.GeneratedCodeInfo;

      /**
       * Encodes the specified GeneratedCodeInfo message. Does not implicitly {@link google.protobuf.GeneratedCodeInfo.verify|verify} messages.
       * @param m GeneratedCodeInfo message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: google.protobuf.IGeneratedCodeInfo, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes a GeneratedCodeInfo message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns GeneratedCodeInfo
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): google.protobuf.GeneratedCodeInfo;
    }

    namespace GeneratedCodeInfo {
      /** Properties of an Annotation. */
      interface IAnnotation {
        /** Annotation path */
        path?: number[] | null;

        /** Annotation sourceFile */
        sourceFile?: string | null;

        /** Annotation begin */
        begin?: number | null;

        /** Annotation end */
        end?: number | null;
      }

      /** Represents an Annotation. */
      class Annotation implements IAnnotation {
        /**
         * Constructs a new Annotation.
         * @param [p] Properties to set
         */
        constructor(p?: google.protobuf.GeneratedCodeInfo.IAnnotation);

        /** Annotation path. */
        public path: number[];

        /** Annotation sourceFile. */
        public sourceFile: string;

        /** Annotation begin. */
        public begin: number;

        /** Annotation end. */
        public end: number;

        /**
         * Creates a new Annotation instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Annotation instance
         */
        public static create(
          properties?: google.protobuf.GeneratedCodeInfo.IAnnotation,
        ): google.protobuf.GeneratedCodeInfo.Annotation;

        /**
         * Encodes the specified Annotation message. Does not implicitly {@link google.protobuf.GeneratedCodeInfo.Annotation.verify|verify} messages.
         * @param m Annotation message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: google.protobuf.GeneratedCodeInfo.IAnnotation,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes an Annotation message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns Annotation
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): google.protobuf.GeneratedCodeInfo.Annotation;
      }
    }
  }
}

/** Namespace cosmos. */
export namespace cosmos {
  /** Namespace base. */
  namespace base {
    /** Namespace v1beta1. */
    namespace v1beta1 {
      /** Properties of a Coin. */
      interface ICoin {
        /** Coin denom */
        denom?: string | null;

        /** Coin amount */
        amount?: string | null;
      }

      /** Represents a Coin. */
      class Coin implements ICoin {
        /**
         * Constructs a new Coin.
         * @param [p] Properties to set
         */
        constructor(p?: cosmos.base.v1beta1.ICoin);

        /** Coin denom. */
        public denom: string;

        /** Coin amount. */
        public amount: string;

        /**
         * Creates a new Coin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Coin instance
         */
        public static create(properties?: cosmos.base.v1beta1.ICoin): cosmos.base.v1beta1.Coin;

        /**
         * Encodes the specified Coin message. Does not implicitly {@link cosmos.base.v1beta1.Coin.verify|verify} messages.
         * @param m Coin message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: cosmos.base.v1beta1.ICoin, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Coin message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns Coin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.base.v1beta1.Coin;
      }

      /** Properties of a DecCoin. */
      interface IDecCoin {
        /** DecCoin denom */
        denom?: string | null;

        /** DecCoin amount */
        amount?: string | null;
      }

      /** Represents a DecCoin. */
      class DecCoin implements IDecCoin {
        /**
         * Constructs a new DecCoin.
         * @param [p] Properties to set
         */
        constructor(p?: cosmos.base.v1beta1.IDecCoin);

        /** DecCoin denom. */
        public denom: string;

        /** DecCoin amount. */
        public amount: string;

        /**
         * Creates a new DecCoin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DecCoin instance
         */
        public static create(properties?: cosmos.base.v1beta1.IDecCoin): cosmos.base.v1beta1.DecCoin;

        /**
         * Encodes the specified DecCoin message. Does not implicitly {@link cosmos.base.v1beta1.DecCoin.verify|verify} messages.
         * @param m DecCoin message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: cosmos.base.v1beta1.IDecCoin, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DecCoin message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns DecCoin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.base.v1beta1.DecCoin;
      }

      /** Properties of an IntProto. */
      interface IIntProto {
        /** IntProto int */
        int?: string | null;
      }

      /** Represents an IntProto. */
      class IntProto implements IIntProto {
        /**
         * Constructs a new IntProto.
         * @param [p] Properties to set
         */
        constructor(p?: cosmos.base.v1beta1.IIntProto);

        /** IntProto int. */
        public int: string;

        /**
         * Creates a new IntProto instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IntProto instance
         */
        public static create(properties?: cosmos.base.v1beta1.IIntProto): cosmos.base.v1beta1.IntProto;

        /**
         * Encodes the specified IntProto message. Does not implicitly {@link cosmos.base.v1beta1.IntProto.verify|verify} messages.
         * @param m IntProto message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: cosmos.base.v1beta1.IIntProto, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IntProto message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns IntProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.base.v1beta1.IntProto;
      }

      /** Properties of a DecProto. */
      interface IDecProto {
        /** DecProto dec */
        dec?: string | null;
      }

      /** Represents a DecProto. */
      class DecProto implements IDecProto {
        /**
         * Constructs a new DecProto.
         * @param [p] Properties to set
         */
        constructor(p?: cosmos.base.v1beta1.IDecProto);

        /** DecProto dec. */
        public dec: string;

        /**
         * Creates a new DecProto instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DecProto instance
         */
        public static create(properties?: cosmos.base.v1beta1.IDecProto): cosmos.base.v1beta1.DecProto;

        /**
         * Encodes the specified DecProto message. Does not implicitly {@link cosmos.base.v1beta1.DecProto.verify|verify} messages.
         * @param m DecProto message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: cosmos.base.v1beta1.IDecProto, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DecProto message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns DecProto
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.base.v1beta1.DecProto;
      }
    }

    /** Namespace query. */
    namespace query {
      /** Namespace v1beta1. */
      namespace v1beta1 {
        /** Properties of a PageRequest. */
        interface IPageRequest {
          /** PageRequest key */
          key?: Uint8Array | null;

          /** PageRequest offset */
          offset?: Long | null;

          /** PageRequest limit */
          limit?: Long | null;

          /** PageRequest countTotal */
          countTotal?: boolean | null;
        }

        /** Represents a PageRequest. */
        class PageRequest implements IPageRequest {
          /**
           * Constructs a new PageRequest.
           * @param [p] Properties to set
           */
          constructor(p?: cosmos.base.query.v1beta1.IPageRequest);

          /** PageRequest key. */
          public key: Uint8Array;

          /** PageRequest offset. */
          public offset: Long;

          /** PageRequest limit. */
          public limit: Long;

          /** PageRequest countTotal. */
          public countTotal: boolean;

          /**
           * Creates a new PageRequest instance using the specified properties.
           * @param [properties] Properties to set
           * @returns PageRequest instance
           */
          public static create(
            properties?: cosmos.base.query.v1beta1.IPageRequest,
          ): cosmos.base.query.v1beta1.PageRequest;

          /**
           * Encodes the specified PageRequest message. Does not implicitly {@link cosmos.base.query.v1beta1.PageRequest.verify|verify} messages.
           * @param m PageRequest message or plain object to encode
           * @param [w] Writer to encode to
           * @returns Writer
           */
          public static encode(
            m: cosmos.base.query.v1beta1.IPageRequest,
            w?: $protobuf.Writer,
          ): $protobuf.Writer;

          /**
           * Decodes a PageRequest message from the specified reader or buffer.
           * @param r Reader or buffer to decode from
           * @param [l] Message length if known beforehand
           * @returns PageRequest
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          public static decode(
            r: $protobuf.Reader | Uint8Array,
            l?: number,
          ): cosmos.base.query.v1beta1.PageRequest;
        }

        /** Properties of a PageResponse. */
        interface IPageResponse {
          /** PageResponse nextKey */
          nextKey?: Uint8Array | null;

          /** PageResponse total */
          total?: Long | null;
        }

        /** Represents a PageResponse. */
        class PageResponse implements IPageResponse {
          /**
           * Constructs a new PageResponse.
           * @param [p] Properties to set
           */
          constructor(p?: cosmos.base.query.v1beta1.IPageResponse);

          /** PageResponse nextKey. */
          public nextKey: Uint8Array;

          /** PageResponse total. */
          public total: Long;

          /**
           * Creates a new PageResponse instance using the specified properties.
           * @param [properties] Properties to set
           * @returns PageResponse instance
           */
          public static create(
            properties?: cosmos.base.query.v1beta1.IPageResponse,
          ): cosmos.base.query.v1beta1.PageResponse;

          /**
           * Encodes the specified PageResponse message. Does not implicitly {@link cosmos.base.query.v1beta1.PageResponse.verify|verify} messages.
           * @param m PageResponse message or plain object to encode
           * @param [w] Writer to encode to
           * @returns Writer
           */
          public static encode(
            m: cosmos.base.query.v1beta1.IPageResponse,
            w?: $protobuf.Writer,
          ): $protobuf.Writer;

          /**
           * Decodes a PageResponse message from the specified reader or buffer.
           * @param r Reader or buffer to decode from
           * @param [l] Message length if known beforehand
           * @returns PageResponse
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          public static decode(
            r: $protobuf.Reader | Uint8Array,
            l?: number,
          ): cosmos.base.query.v1beta1.PageResponse;
        }
      }
    }
  }
}
