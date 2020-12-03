"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cosmos = exports.google = exports.cosmwasm = void 0;
var $protobuf = require("protobufjs/minimal");
const $Reader = $protobuf.Reader,
  $Writer = $protobuf.Writer,
  $util = $protobuf.util;
const $root = {};
exports.cosmwasm = $root.cosmwasm = (() => {
  const cosmwasm = {};
  cosmwasm.wasm = (function () {
    const wasm = {};
    wasm.v1beta1 = (function () {
      const v1beta1 = {};
      v1beta1.MsgStoreCode = (function () {
        function MsgStoreCode(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        MsgStoreCode.prototype.sender = "";
        MsgStoreCode.prototype.wasmByteCode = $util.newBuffer([]);
        MsgStoreCode.prototype.source = "";
        MsgStoreCode.prototype.builder = "";
        MsgStoreCode.prototype.instantiatePermission = null;
        MsgStoreCode.create = function create(properties) {
          return new MsgStoreCode(properties);
        };
        MsgStoreCode.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.sender != null && Object.hasOwnProperty.call(m, "sender")) w.uint32(10).string(m.sender);
          if (m.wasmByteCode != null && Object.hasOwnProperty.call(m, "wasmByteCode"))
            w.uint32(18).bytes(m.wasmByteCode);
          if (m.source != null && Object.hasOwnProperty.call(m, "source")) w.uint32(26).string(m.source);
          if (m.builder != null && Object.hasOwnProperty.call(m, "builder")) w.uint32(34).string(m.builder);
          if (m.instantiatePermission != null && Object.hasOwnProperty.call(m, "instantiatePermission"))
            $root.cosmwasm.wasm.v1beta1.AccessConfig.encode(
              m.instantiatePermission,
              w.uint32(42).fork(),
            ).ldelim();
          return w;
        };
        MsgStoreCode.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmwasm.wasm.v1beta1.MsgStoreCode();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.sender = r.string();
                break;
              case 2:
                m.wasmByteCode = r.bytes();
                break;
              case 3:
                m.source = r.string();
                break;
              case 4:
                m.builder = r.string();
                break;
              case 5:
                m.instantiatePermission = $root.cosmwasm.wasm.v1beta1.AccessConfig.decode(r, r.uint32());
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return MsgStoreCode;
      })();
      v1beta1.MsgInstantiateContract = (function () {
        function MsgInstantiateContract(p) {
          this.initFunds = [];
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        MsgInstantiateContract.prototype.sender = "";
        MsgInstantiateContract.prototype.admin = "";
        MsgInstantiateContract.prototype.codeId = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        MsgInstantiateContract.prototype.label = "";
        MsgInstantiateContract.prototype.initMsg = $util.newBuffer([]);
        MsgInstantiateContract.prototype.initFunds = $util.emptyArray;
        MsgInstantiateContract.create = function create(properties) {
          return new MsgInstantiateContract(properties);
        };
        MsgInstantiateContract.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.sender != null && Object.hasOwnProperty.call(m, "sender")) w.uint32(10).string(m.sender);
          if (m.admin != null && Object.hasOwnProperty.call(m, "admin")) w.uint32(18).string(m.admin);
          if (m.codeId != null && Object.hasOwnProperty.call(m, "codeId")) w.uint32(24).uint64(m.codeId);
          if (m.label != null && Object.hasOwnProperty.call(m, "label")) w.uint32(34).string(m.label);
          if (m.initMsg != null && Object.hasOwnProperty.call(m, "initMsg")) w.uint32(42).bytes(m.initMsg);
          if (m.initFunds != null && m.initFunds.length) {
            for (var i = 0; i < m.initFunds.length; ++i)
              $root.cosmos.base.v1beta1.Coin.encode(m.initFunds[i], w.uint32(50).fork()).ldelim();
          }
          return w;
        };
        MsgInstantiateContract.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmwasm.wasm.v1beta1.MsgInstantiateContract();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.sender = r.string();
                break;
              case 2:
                m.admin = r.string();
                break;
              case 3:
                m.codeId = r.uint64();
                break;
              case 4:
                m.label = r.string();
                break;
              case 5:
                m.initMsg = r.bytes();
                break;
              case 6:
                if (!(m.initFunds && m.initFunds.length)) m.initFunds = [];
                m.initFunds.push($root.cosmos.base.v1beta1.Coin.decode(r, r.uint32()));
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return MsgInstantiateContract;
      })();
      v1beta1.MsgExecuteContract = (function () {
        function MsgExecuteContract(p) {
          this.sentFunds = [];
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        MsgExecuteContract.prototype.sender = "";
        MsgExecuteContract.prototype.contract = "";
        MsgExecuteContract.prototype.msg = $util.newBuffer([]);
        MsgExecuteContract.prototype.sentFunds = $util.emptyArray;
        MsgExecuteContract.create = function create(properties) {
          return new MsgExecuteContract(properties);
        };
        MsgExecuteContract.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.sender != null && Object.hasOwnProperty.call(m, "sender")) w.uint32(10).string(m.sender);
          if (m.contract != null && Object.hasOwnProperty.call(m, "contract"))
            w.uint32(18).string(m.contract);
          if (m.msg != null && Object.hasOwnProperty.call(m, "msg")) w.uint32(26).bytes(m.msg);
          if (m.sentFunds != null && m.sentFunds.length) {
            for (var i = 0; i < m.sentFunds.length; ++i)
              $root.cosmos.base.v1beta1.Coin.encode(m.sentFunds[i], w.uint32(42).fork()).ldelim();
          }
          return w;
        };
        MsgExecuteContract.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmwasm.wasm.v1beta1.MsgExecuteContract();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.sender = r.string();
                break;
              case 2:
                m.contract = r.string();
                break;
              case 3:
                m.msg = r.bytes();
                break;
              case 5:
                if (!(m.sentFunds && m.sentFunds.length)) m.sentFunds = [];
                m.sentFunds.push($root.cosmos.base.v1beta1.Coin.decode(r, r.uint32()));
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return MsgExecuteContract;
      })();
      v1beta1.MsgMigrateContract = (function () {
        function MsgMigrateContract(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        MsgMigrateContract.prototype.sender = "";
        MsgMigrateContract.prototype.contract = "";
        MsgMigrateContract.prototype.codeId = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        MsgMigrateContract.prototype.migrateMsg = $util.newBuffer([]);
        MsgMigrateContract.create = function create(properties) {
          return new MsgMigrateContract(properties);
        };
        MsgMigrateContract.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.sender != null && Object.hasOwnProperty.call(m, "sender")) w.uint32(10).string(m.sender);
          if (m.contract != null && Object.hasOwnProperty.call(m, "contract"))
            w.uint32(18).string(m.contract);
          if (m.codeId != null && Object.hasOwnProperty.call(m, "codeId")) w.uint32(24).uint64(m.codeId);
          if (m.migrateMsg != null && Object.hasOwnProperty.call(m, "migrateMsg"))
            w.uint32(34).bytes(m.migrateMsg);
          return w;
        };
        MsgMigrateContract.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmwasm.wasm.v1beta1.MsgMigrateContract();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.sender = r.string();
                break;
              case 2:
                m.contract = r.string();
                break;
              case 3:
                m.codeId = r.uint64();
                break;
              case 4:
                m.migrateMsg = r.bytes();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return MsgMigrateContract;
      })();
      v1beta1.MsgUpdateAdmin = (function () {
        function MsgUpdateAdmin(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        MsgUpdateAdmin.prototype.sender = "";
        MsgUpdateAdmin.prototype.newAdmin = "";
        MsgUpdateAdmin.prototype.contract = "";
        MsgUpdateAdmin.create = function create(properties) {
          return new MsgUpdateAdmin(properties);
        };
        MsgUpdateAdmin.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.sender != null && Object.hasOwnProperty.call(m, "sender")) w.uint32(10).string(m.sender);
          if (m.newAdmin != null && Object.hasOwnProperty.call(m, "newAdmin"))
            w.uint32(18).string(m.newAdmin);
          if (m.contract != null && Object.hasOwnProperty.call(m, "contract"))
            w.uint32(26).string(m.contract);
          return w;
        };
        MsgUpdateAdmin.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmwasm.wasm.v1beta1.MsgUpdateAdmin();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.sender = r.string();
                break;
              case 2:
                m.newAdmin = r.string();
                break;
              case 3:
                m.contract = r.string();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return MsgUpdateAdmin;
      })();
      v1beta1.MsgClearAdmin = (function () {
        function MsgClearAdmin(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        MsgClearAdmin.prototype.sender = "";
        MsgClearAdmin.prototype.contract = "";
        MsgClearAdmin.create = function create(properties) {
          return new MsgClearAdmin(properties);
        };
        MsgClearAdmin.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.sender != null && Object.hasOwnProperty.call(m, "sender")) w.uint32(10).string(m.sender);
          if (m.contract != null && Object.hasOwnProperty.call(m, "contract"))
            w.uint32(26).string(m.contract);
          return w;
        };
        MsgClearAdmin.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmwasm.wasm.v1beta1.MsgClearAdmin();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.sender = r.string();
                break;
              case 3:
                m.contract = r.string();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return MsgClearAdmin;
      })();
      v1beta1.Query = (function () {
        function Query(rpcImpl, requestDelimited, responseDelimited) {
          $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
        }
        (Query.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = Query;
        Query.create = function create(rpcImpl, requestDelimited, responseDelimited) {
          return new this(rpcImpl, requestDelimited, responseDelimited);
        };
        Object.defineProperty(
          (Query.prototype.contractInfo = function contractInfo(request, callback) {
            return this.rpcCall(
              contractInfo,
              $root.cosmwasm.wasm.v1beta1.QueryContractInfoRequest,
              $root.cosmwasm.wasm.v1beta1.QueryContractInfoResponse,
              request,
              callback,
            );
          }),
          "name",
          { value: "ContractInfo" },
        );
        Object.defineProperty(
          (Query.prototype.contractHistory = function contractHistory(request, callback) {
            return this.rpcCall(
              contractHistory,
              $root.cosmwasm.wasm.v1beta1.QueryContractHistoryRequest,
              $root.cosmwasm.wasm.v1beta1.QueryContractHistoryResponse,
              request,
              callback,
            );
          }),
          "name",
          { value: "ContractHistory" },
        );
        Object.defineProperty(
          (Query.prototype.contractsByCode = function contractsByCode(request, callback) {
            return this.rpcCall(
              contractsByCode,
              $root.cosmwasm.wasm.v1beta1.QueryContractsByCodeRequest,
              $root.cosmwasm.wasm.v1beta1.QueryContractsByCodeResponse,
              request,
              callback,
            );
          }),
          "name",
          { value: "ContractsByCode" },
        );
        Object.defineProperty(
          (Query.prototype.allContractState = function allContractState(request, callback) {
            return this.rpcCall(
              allContractState,
              $root.cosmwasm.wasm.v1beta1.QueryAllContractStateRequest,
              $root.cosmwasm.wasm.v1beta1.QueryAllContractStateResponse,
              request,
              callback,
            );
          }),
          "name",
          { value: "AllContractState" },
        );
        Object.defineProperty(
          (Query.prototype.rawContractState = function rawContractState(request, callback) {
            return this.rpcCall(
              rawContractState,
              $root.cosmwasm.wasm.v1beta1.QueryRawContractStateRequest,
              $root.cosmwasm.wasm.v1beta1.QueryRawContractStateResponse,
              request,
              callback,
            );
          }),
          "name",
          { value: "RawContractState" },
        );
        Object.defineProperty(
          (Query.prototype.smartContractState = function smartContractState(request, callback) {
            return this.rpcCall(
              smartContractState,
              $root.cosmwasm.wasm.v1beta1.QuerySmartContractStateRequest,
              $root.cosmwasm.wasm.v1beta1.QuerySmartContractStateResponse,
              request,
              callback,
            );
          }),
          "name",
          { value: "SmartContractState" },
        );
        Object.defineProperty(
          (Query.prototype.code = function code(request, callback) {
            return this.rpcCall(
              code,
              $root.cosmwasm.wasm.v1beta1.QueryCodeRequest,
              $root.cosmwasm.wasm.v1beta1.QueryCodeResponse,
              request,
              callback,
            );
          }),
          "name",
          { value: "Code" },
        );
        Object.defineProperty(
          (Query.prototype.codes = function codes(request, callback) {
            return this.rpcCall(
              codes,
              $root.cosmwasm.wasm.v1beta1.QueryCodesRequest,
              $root.cosmwasm.wasm.v1beta1.QueryCodesResponse,
              request,
              callback,
            );
          }),
          "name",
          { value: "Codes" },
        );
        return Query;
      })();
      v1beta1.QueryContractInfoRequest = (function () {
        function QueryContractInfoRequest(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        QueryContractInfoRequest.prototype.address = "";
        QueryContractInfoRequest.create = function create(properties) {
          return new QueryContractInfoRequest(properties);
        };
        QueryContractInfoRequest.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.address != null && Object.hasOwnProperty.call(m, "address")) w.uint32(10).string(m.address);
          return w;
        };
        QueryContractInfoRequest.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmwasm.wasm.v1beta1.QueryContractInfoRequest();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.address = r.string();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return QueryContractInfoRequest;
      })();
      v1beta1.QueryContractInfoResponse = (function () {
        function QueryContractInfoResponse(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        QueryContractInfoResponse.prototype.address = "";
        QueryContractInfoResponse.prototype.contractInfo = null;
        QueryContractInfoResponse.create = function create(properties) {
          return new QueryContractInfoResponse(properties);
        };
        QueryContractInfoResponse.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.address != null && Object.hasOwnProperty.call(m, "address")) w.uint32(10).string(m.address);
          if (m.contractInfo != null && Object.hasOwnProperty.call(m, "contractInfo"))
            $root.cosmwasm.wasm.v1beta1.ContractInfo.encode(m.contractInfo, w.uint32(18).fork()).ldelim();
          return w;
        };
        QueryContractInfoResponse.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmwasm.wasm.v1beta1.QueryContractInfoResponse();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.address = r.string();
                break;
              case 2:
                m.contractInfo = $root.cosmwasm.wasm.v1beta1.ContractInfo.decode(r, r.uint32());
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return QueryContractInfoResponse;
      })();
      v1beta1.QueryContractHistoryRequest = (function () {
        function QueryContractHistoryRequest(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        QueryContractHistoryRequest.prototype.address = "";
        QueryContractHistoryRequest.prototype.pagination = null;
        QueryContractHistoryRequest.create = function create(properties) {
          return new QueryContractHistoryRequest(properties);
        };
        QueryContractHistoryRequest.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.address != null && Object.hasOwnProperty.call(m, "address")) w.uint32(10).string(m.address);
          if (m.pagination != null && Object.hasOwnProperty.call(m, "pagination"))
            $root.cosmos.base.query.v1beta1.PageRequest.encode(m.pagination, w.uint32(18).fork()).ldelim();
          return w;
        };
        QueryContractHistoryRequest.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmwasm.wasm.v1beta1.QueryContractHistoryRequest();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.address = r.string();
                break;
              case 2:
                m.pagination = $root.cosmos.base.query.v1beta1.PageRequest.decode(r, r.uint32());
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return QueryContractHistoryRequest;
      })();
      v1beta1.QueryContractHistoryResponse = (function () {
        function QueryContractHistoryResponse(p) {
          this.entries = [];
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        QueryContractHistoryResponse.prototype.entries = $util.emptyArray;
        QueryContractHistoryResponse.prototype.pagination = null;
        QueryContractHistoryResponse.create = function create(properties) {
          return new QueryContractHistoryResponse(properties);
        };
        QueryContractHistoryResponse.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.entries != null && m.entries.length) {
            for (var i = 0; i < m.entries.length; ++i)
              $root.cosmwasm.wasm.v1beta1.ContractCodeHistoryEntry.encode(
                m.entries[i],
                w.uint32(10).fork(),
              ).ldelim();
          }
          if (m.pagination != null && Object.hasOwnProperty.call(m, "pagination"))
            $root.cosmos.base.query.v1beta1.PageResponse.encode(m.pagination, w.uint32(18).fork()).ldelim();
          return w;
        };
        QueryContractHistoryResponse.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmwasm.wasm.v1beta1.QueryContractHistoryResponse();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                if (!(m.entries && m.entries.length)) m.entries = [];
                m.entries.push($root.cosmwasm.wasm.v1beta1.ContractCodeHistoryEntry.decode(r, r.uint32()));
                break;
              case 2:
                m.pagination = $root.cosmos.base.query.v1beta1.PageResponse.decode(r, r.uint32());
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return QueryContractHistoryResponse;
      })();
      v1beta1.QueryContractsByCodeRequest = (function () {
        function QueryContractsByCodeRequest(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        QueryContractsByCodeRequest.prototype.codeId = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        QueryContractsByCodeRequest.prototype.pagination = null;
        QueryContractsByCodeRequest.create = function create(properties) {
          return new QueryContractsByCodeRequest(properties);
        };
        QueryContractsByCodeRequest.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.codeId != null && Object.hasOwnProperty.call(m, "codeId")) w.uint32(8).uint64(m.codeId);
          if (m.pagination != null && Object.hasOwnProperty.call(m, "pagination"))
            $root.cosmos.base.query.v1beta1.PageRequest.encode(m.pagination, w.uint32(18).fork()).ldelim();
          return w;
        };
        QueryContractsByCodeRequest.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmwasm.wasm.v1beta1.QueryContractsByCodeRequest();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.codeId = r.uint64();
                break;
              case 2:
                m.pagination = $root.cosmos.base.query.v1beta1.PageRequest.decode(r, r.uint32());
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return QueryContractsByCodeRequest;
      })();
      v1beta1.ContractInfoWithAddress = (function () {
        function ContractInfoWithAddress(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        ContractInfoWithAddress.prototype.address = "";
        ContractInfoWithAddress.prototype.contractInfo = null;
        ContractInfoWithAddress.create = function create(properties) {
          return new ContractInfoWithAddress(properties);
        };
        ContractInfoWithAddress.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.address != null && Object.hasOwnProperty.call(m, "address")) w.uint32(10).string(m.address);
          if (m.contractInfo != null && Object.hasOwnProperty.call(m, "contractInfo"))
            $root.cosmwasm.wasm.v1beta1.ContractInfo.encode(m.contractInfo, w.uint32(18).fork()).ldelim();
          return w;
        };
        ContractInfoWithAddress.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmwasm.wasm.v1beta1.ContractInfoWithAddress();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.address = r.string();
                break;
              case 2:
                m.contractInfo = $root.cosmwasm.wasm.v1beta1.ContractInfo.decode(r, r.uint32());
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return ContractInfoWithAddress;
      })();
      v1beta1.QueryContractsByCodeResponse = (function () {
        function QueryContractsByCodeResponse(p) {
          this.contractInfos = [];
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        QueryContractsByCodeResponse.prototype.contractInfos = $util.emptyArray;
        QueryContractsByCodeResponse.prototype.pagination = null;
        QueryContractsByCodeResponse.create = function create(properties) {
          return new QueryContractsByCodeResponse(properties);
        };
        QueryContractsByCodeResponse.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.contractInfos != null && m.contractInfos.length) {
            for (var i = 0; i < m.contractInfos.length; ++i)
              $root.cosmwasm.wasm.v1beta1.ContractInfoWithAddress.encode(
                m.contractInfos[i],
                w.uint32(10).fork(),
              ).ldelim();
          }
          if (m.pagination != null && Object.hasOwnProperty.call(m, "pagination"))
            $root.cosmos.base.query.v1beta1.PageResponse.encode(m.pagination, w.uint32(18).fork()).ldelim();
          return w;
        };
        QueryContractsByCodeResponse.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmwasm.wasm.v1beta1.QueryContractsByCodeResponse();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                if (!(m.contractInfos && m.contractInfos.length)) m.contractInfos = [];
                m.contractInfos.push(
                  $root.cosmwasm.wasm.v1beta1.ContractInfoWithAddress.decode(r, r.uint32()),
                );
                break;
              case 2:
                m.pagination = $root.cosmos.base.query.v1beta1.PageResponse.decode(r, r.uint32());
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return QueryContractsByCodeResponse;
      })();
      v1beta1.QueryAllContractStateRequest = (function () {
        function QueryAllContractStateRequest(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        QueryAllContractStateRequest.prototype.address = "";
        QueryAllContractStateRequest.prototype.pagination = null;
        QueryAllContractStateRequest.create = function create(properties) {
          return new QueryAllContractStateRequest(properties);
        };
        QueryAllContractStateRequest.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.address != null && Object.hasOwnProperty.call(m, "address")) w.uint32(10).string(m.address);
          if (m.pagination != null && Object.hasOwnProperty.call(m, "pagination"))
            $root.cosmos.base.query.v1beta1.PageRequest.encode(m.pagination, w.uint32(18).fork()).ldelim();
          return w;
        };
        QueryAllContractStateRequest.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmwasm.wasm.v1beta1.QueryAllContractStateRequest();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.address = r.string();
                break;
              case 2:
                m.pagination = $root.cosmos.base.query.v1beta1.PageRequest.decode(r, r.uint32());
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return QueryAllContractStateRequest;
      })();
      v1beta1.QueryAllContractStateResponse = (function () {
        function QueryAllContractStateResponse(p) {
          this.models = [];
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        QueryAllContractStateResponse.prototype.models = $util.emptyArray;
        QueryAllContractStateResponse.prototype.pagination = null;
        QueryAllContractStateResponse.create = function create(properties) {
          return new QueryAllContractStateResponse(properties);
        };
        QueryAllContractStateResponse.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.models != null && m.models.length) {
            for (var i = 0; i < m.models.length; ++i)
              $root.cosmwasm.wasm.v1beta1.Model.encode(m.models[i], w.uint32(10).fork()).ldelim();
          }
          if (m.pagination != null && Object.hasOwnProperty.call(m, "pagination"))
            $root.cosmos.base.query.v1beta1.PageResponse.encode(m.pagination, w.uint32(18).fork()).ldelim();
          return w;
        };
        QueryAllContractStateResponse.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmwasm.wasm.v1beta1.QueryAllContractStateResponse();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                if (!(m.models && m.models.length)) m.models = [];
                m.models.push($root.cosmwasm.wasm.v1beta1.Model.decode(r, r.uint32()));
                break;
              case 2:
                m.pagination = $root.cosmos.base.query.v1beta1.PageResponse.decode(r, r.uint32());
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return QueryAllContractStateResponse;
      })();
      v1beta1.QueryRawContractStateRequest = (function () {
        function QueryRawContractStateRequest(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        QueryRawContractStateRequest.prototype.address = "";
        QueryRawContractStateRequest.prototype.queryData = $util.newBuffer([]);
        QueryRawContractStateRequest.create = function create(properties) {
          return new QueryRawContractStateRequest(properties);
        };
        QueryRawContractStateRequest.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.address != null && Object.hasOwnProperty.call(m, "address")) w.uint32(10).string(m.address);
          if (m.queryData != null && Object.hasOwnProperty.call(m, "queryData"))
            w.uint32(18).bytes(m.queryData);
          return w;
        };
        QueryRawContractStateRequest.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmwasm.wasm.v1beta1.QueryRawContractStateRequest();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.address = r.string();
                break;
              case 2:
                m.queryData = r.bytes();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return QueryRawContractStateRequest;
      })();
      v1beta1.QueryRawContractStateResponse = (function () {
        function QueryRawContractStateResponse(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        QueryRawContractStateResponse.prototype.data = $util.newBuffer([]);
        QueryRawContractStateResponse.create = function create(properties) {
          return new QueryRawContractStateResponse(properties);
        };
        QueryRawContractStateResponse.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.data != null && Object.hasOwnProperty.call(m, "data")) w.uint32(10).bytes(m.data);
          return w;
        };
        QueryRawContractStateResponse.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmwasm.wasm.v1beta1.QueryRawContractStateResponse();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.data = r.bytes();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return QueryRawContractStateResponse;
      })();
      v1beta1.QuerySmartContractStateRequest = (function () {
        function QuerySmartContractStateRequest(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        QuerySmartContractStateRequest.prototype.address = "";
        QuerySmartContractStateRequest.prototype.queryData = $util.newBuffer([]);
        QuerySmartContractStateRequest.create = function create(properties) {
          return new QuerySmartContractStateRequest(properties);
        };
        QuerySmartContractStateRequest.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.address != null && Object.hasOwnProperty.call(m, "address")) w.uint32(10).string(m.address);
          if (m.queryData != null && Object.hasOwnProperty.call(m, "queryData"))
            w.uint32(18).bytes(m.queryData);
          return w;
        };
        QuerySmartContractStateRequest.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmwasm.wasm.v1beta1.QuerySmartContractStateRequest();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.address = r.string();
                break;
              case 2:
                m.queryData = r.bytes();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return QuerySmartContractStateRequest;
      })();
      v1beta1.QuerySmartContractStateResponse = (function () {
        function QuerySmartContractStateResponse(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        QuerySmartContractStateResponse.prototype.data = $util.newBuffer([]);
        QuerySmartContractStateResponse.create = function create(properties) {
          return new QuerySmartContractStateResponse(properties);
        };
        QuerySmartContractStateResponse.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.data != null && Object.hasOwnProperty.call(m, "data")) w.uint32(10).bytes(m.data);
          return w;
        };
        QuerySmartContractStateResponse.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmwasm.wasm.v1beta1.QuerySmartContractStateResponse();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.data = r.bytes();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return QuerySmartContractStateResponse;
      })();
      v1beta1.QueryCodeRequest = (function () {
        function QueryCodeRequest(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        QueryCodeRequest.prototype.codeId = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        QueryCodeRequest.create = function create(properties) {
          return new QueryCodeRequest(properties);
        };
        QueryCodeRequest.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.codeId != null && Object.hasOwnProperty.call(m, "codeId")) w.uint32(8).uint64(m.codeId);
          return w;
        };
        QueryCodeRequest.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmwasm.wasm.v1beta1.QueryCodeRequest();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.codeId = r.uint64();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return QueryCodeRequest;
      })();
      v1beta1.CodeInfoResponse = (function () {
        function CodeInfoResponse(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        CodeInfoResponse.prototype.codeId = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        CodeInfoResponse.prototype.creator = "";
        CodeInfoResponse.prototype.dataHash = $util.newBuffer([]);
        CodeInfoResponse.prototype.source = "";
        CodeInfoResponse.prototype.builder = "";
        CodeInfoResponse.create = function create(properties) {
          return new CodeInfoResponse(properties);
        };
        CodeInfoResponse.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.codeId != null && Object.hasOwnProperty.call(m, "codeId")) w.uint32(8).uint64(m.codeId);
          if (m.creator != null && Object.hasOwnProperty.call(m, "creator")) w.uint32(18).string(m.creator);
          if (m.dataHash != null && Object.hasOwnProperty.call(m, "dataHash")) w.uint32(26).bytes(m.dataHash);
          if (m.source != null && Object.hasOwnProperty.call(m, "source")) w.uint32(34).string(m.source);
          if (m.builder != null && Object.hasOwnProperty.call(m, "builder")) w.uint32(42).string(m.builder);
          return w;
        };
        CodeInfoResponse.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmwasm.wasm.v1beta1.CodeInfoResponse();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.codeId = r.uint64();
                break;
              case 2:
                m.creator = r.string();
                break;
              case 3:
                m.dataHash = r.bytes();
                break;
              case 4:
                m.source = r.string();
                break;
              case 5:
                m.builder = r.string();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return CodeInfoResponse;
      })();
      v1beta1.QueryCodeResponse = (function () {
        function QueryCodeResponse(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        QueryCodeResponse.prototype.codeInfo = null;
        QueryCodeResponse.prototype.data = $util.newBuffer([]);
        QueryCodeResponse.create = function create(properties) {
          return new QueryCodeResponse(properties);
        };
        QueryCodeResponse.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.codeInfo != null && Object.hasOwnProperty.call(m, "codeInfo"))
            $root.cosmwasm.wasm.v1beta1.CodeInfoResponse.encode(m.codeInfo, w.uint32(10).fork()).ldelim();
          if (m.data != null && Object.hasOwnProperty.call(m, "data")) w.uint32(18).bytes(m.data);
          return w;
        };
        QueryCodeResponse.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmwasm.wasm.v1beta1.QueryCodeResponse();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.codeInfo = $root.cosmwasm.wasm.v1beta1.CodeInfoResponse.decode(r, r.uint32());
                break;
              case 2:
                m.data = r.bytes();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return QueryCodeResponse;
      })();
      v1beta1.QueryCodesRequest = (function () {
        function QueryCodesRequest(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        QueryCodesRequest.prototype.pagination = null;
        QueryCodesRequest.create = function create(properties) {
          return new QueryCodesRequest(properties);
        };
        QueryCodesRequest.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.pagination != null && Object.hasOwnProperty.call(m, "pagination"))
            $root.cosmos.base.query.v1beta1.PageRequest.encode(m.pagination, w.uint32(10).fork()).ldelim();
          return w;
        };
        QueryCodesRequest.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmwasm.wasm.v1beta1.QueryCodesRequest();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.pagination = $root.cosmos.base.query.v1beta1.PageRequest.decode(r, r.uint32());
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return QueryCodesRequest;
      })();
      v1beta1.QueryCodesResponse = (function () {
        function QueryCodesResponse(p) {
          this.codeInfos = [];
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        QueryCodesResponse.prototype.codeInfos = $util.emptyArray;
        QueryCodesResponse.prototype.pagination = null;
        QueryCodesResponse.create = function create(properties) {
          return new QueryCodesResponse(properties);
        };
        QueryCodesResponse.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.codeInfos != null && m.codeInfos.length) {
            for (var i = 0; i < m.codeInfos.length; ++i)
              $root.cosmwasm.wasm.v1beta1.CodeInfoResponse.encode(
                m.codeInfos[i],
                w.uint32(10).fork(),
              ).ldelim();
          }
          if (m.pagination != null && Object.hasOwnProperty.call(m, "pagination"))
            $root.cosmos.base.query.v1beta1.PageResponse.encode(m.pagination, w.uint32(18).fork()).ldelim();
          return w;
        };
        QueryCodesResponse.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmwasm.wasm.v1beta1.QueryCodesResponse();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                if (!(m.codeInfos && m.codeInfos.length)) m.codeInfos = [];
                m.codeInfos.push($root.cosmwasm.wasm.v1beta1.CodeInfoResponse.decode(r, r.uint32()));
                break;
              case 2:
                m.pagination = $root.cosmos.base.query.v1beta1.PageResponse.decode(r, r.uint32());
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return QueryCodesResponse;
      })();
      v1beta1.AccessType = (function () {
        const valuesById = {},
          values = Object.create(valuesById);
        values[(valuesById[0] = "ACCESS_TYPE_UNSPECIFIED")] = 0;
        values[(valuesById[1] = "ACCESS_TYPE_NOBODY")] = 1;
        values[(valuesById[2] = "ACCESS_TYPE_ONLY_ADDRESS")] = 2;
        values[(valuesById[3] = "ACCESS_TYPE_EVERYBODY")] = 3;
        return values;
      })();
      v1beta1.AccessTypeParam = (function () {
        function AccessTypeParam(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        AccessTypeParam.prototype.value = 0;
        AccessTypeParam.create = function create(properties) {
          return new AccessTypeParam(properties);
        };
        AccessTypeParam.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.value != null && Object.hasOwnProperty.call(m, "value")) w.uint32(8).int32(m.value);
          return w;
        };
        AccessTypeParam.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmwasm.wasm.v1beta1.AccessTypeParam();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.value = r.int32();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return AccessTypeParam;
      })();
      v1beta1.AccessConfig = (function () {
        function AccessConfig(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        AccessConfig.prototype.permission = 0;
        AccessConfig.prototype.address = "";
        AccessConfig.create = function create(properties) {
          return new AccessConfig(properties);
        };
        AccessConfig.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.permission != null && Object.hasOwnProperty.call(m, "permission"))
            w.uint32(8).int32(m.permission);
          if (m.address != null && Object.hasOwnProperty.call(m, "address")) w.uint32(18).string(m.address);
          return w;
        };
        AccessConfig.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmwasm.wasm.v1beta1.AccessConfig();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.permission = r.int32();
                break;
              case 2:
                m.address = r.string();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return AccessConfig;
      })();
      v1beta1.Params = (function () {
        function Params(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        Params.prototype.codeUploadAccess = null;
        Params.prototype.instantiateDefaultPermission = 0;
        Params.prototype.maxWasmCodeSize = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        Params.create = function create(properties) {
          return new Params(properties);
        };
        Params.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.codeUploadAccess != null && Object.hasOwnProperty.call(m, "codeUploadAccess"))
            $root.cosmwasm.wasm.v1beta1.AccessConfig.encode(m.codeUploadAccess, w.uint32(10).fork()).ldelim();
          if (
            m.instantiateDefaultPermission != null &&
            Object.hasOwnProperty.call(m, "instantiateDefaultPermission")
          )
            w.uint32(16).int32(m.instantiateDefaultPermission);
          if (m.maxWasmCodeSize != null && Object.hasOwnProperty.call(m, "maxWasmCodeSize"))
            w.uint32(24).uint64(m.maxWasmCodeSize);
          return w;
        };
        Params.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmwasm.wasm.v1beta1.Params();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.codeUploadAccess = $root.cosmwasm.wasm.v1beta1.AccessConfig.decode(r, r.uint32());
                break;
              case 2:
                m.instantiateDefaultPermission = r.int32();
                break;
              case 3:
                m.maxWasmCodeSize = r.uint64();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return Params;
      })();
      v1beta1.CodeInfo = (function () {
        function CodeInfo(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        CodeInfo.prototype.codeHash = $util.newBuffer([]);
        CodeInfo.prototype.creator = "";
        CodeInfo.prototype.source = "";
        CodeInfo.prototype.builder = "";
        CodeInfo.prototype.instantiateConfig = null;
        CodeInfo.create = function create(properties) {
          return new CodeInfo(properties);
        };
        CodeInfo.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.codeHash != null && Object.hasOwnProperty.call(m, "codeHash")) w.uint32(10).bytes(m.codeHash);
          if (m.creator != null && Object.hasOwnProperty.call(m, "creator")) w.uint32(18).string(m.creator);
          if (m.source != null && Object.hasOwnProperty.call(m, "source")) w.uint32(26).string(m.source);
          if (m.builder != null && Object.hasOwnProperty.call(m, "builder")) w.uint32(34).string(m.builder);
          if (m.instantiateConfig != null && Object.hasOwnProperty.call(m, "instantiateConfig"))
            $root.cosmwasm.wasm.v1beta1.AccessConfig.encode(
              m.instantiateConfig,
              w.uint32(42).fork(),
            ).ldelim();
          return w;
        };
        CodeInfo.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmwasm.wasm.v1beta1.CodeInfo();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.codeHash = r.bytes();
                break;
              case 2:
                m.creator = r.string();
                break;
              case 3:
                m.source = r.string();
                break;
              case 4:
                m.builder = r.string();
                break;
              case 5:
                m.instantiateConfig = $root.cosmwasm.wasm.v1beta1.AccessConfig.decode(r, r.uint32());
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return CodeInfo;
      })();
      v1beta1.ContractInfo = (function () {
        function ContractInfo(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        ContractInfo.prototype.codeId = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        ContractInfo.prototype.creator = "";
        ContractInfo.prototype.admin = "";
        ContractInfo.prototype.label = "";
        ContractInfo.prototype.created = null;
        ContractInfo.create = function create(properties) {
          return new ContractInfo(properties);
        };
        ContractInfo.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.codeId != null && Object.hasOwnProperty.call(m, "codeId")) w.uint32(8).uint64(m.codeId);
          if (m.creator != null && Object.hasOwnProperty.call(m, "creator")) w.uint32(18).string(m.creator);
          if (m.admin != null && Object.hasOwnProperty.call(m, "admin")) w.uint32(26).string(m.admin);
          if (m.label != null && Object.hasOwnProperty.call(m, "label")) w.uint32(34).string(m.label);
          if (m.created != null && Object.hasOwnProperty.call(m, "created"))
            $root.cosmwasm.wasm.v1beta1.AbsoluteTxPosition.encode(m.created, w.uint32(42).fork()).ldelim();
          return w;
        };
        ContractInfo.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmwasm.wasm.v1beta1.ContractInfo();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.codeId = r.uint64();
                break;
              case 2:
                m.creator = r.string();
                break;
              case 3:
                m.admin = r.string();
                break;
              case 4:
                m.label = r.string();
                break;
              case 5:
                m.created = $root.cosmwasm.wasm.v1beta1.AbsoluteTxPosition.decode(r, r.uint32());
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return ContractInfo;
      })();
      v1beta1.ContractCodeHistoryOperationType = (function () {
        const valuesById = {},
          values = Object.create(valuesById);
        values[(valuesById[0] = "CONTRACT_CODE_HISTORY_OPERATION_TYPE_UNSPECIFIED")] = 0;
        values[(valuesById[1] = "CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT")] = 1;
        values[(valuesById[2] = "CONTRACT_CODE_HISTORY_OPERATION_TYPE_MIGRATE")] = 2;
        values[(valuesById[3] = "CONTRACT_CODE_HISTORY_OPERATION_TYPE_GENESIS")] = 3;
        return values;
      })();
      v1beta1.ContractCodeHistoryEntry = (function () {
        function ContractCodeHistoryEntry(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        ContractCodeHistoryEntry.prototype.operation = 0;
        ContractCodeHistoryEntry.prototype.codeId = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        ContractCodeHistoryEntry.prototype.updated = null;
        ContractCodeHistoryEntry.prototype.msg = $util.newBuffer([]);
        ContractCodeHistoryEntry.create = function create(properties) {
          return new ContractCodeHistoryEntry(properties);
        };
        ContractCodeHistoryEntry.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.operation != null && Object.hasOwnProperty.call(m, "operation"))
            w.uint32(8).int32(m.operation);
          if (m.codeId != null && Object.hasOwnProperty.call(m, "codeId")) w.uint32(16).uint64(m.codeId);
          if (m.updated != null && Object.hasOwnProperty.call(m, "updated"))
            $root.cosmwasm.wasm.v1beta1.AbsoluteTxPosition.encode(m.updated, w.uint32(26).fork()).ldelim();
          if (m.msg != null && Object.hasOwnProperty.call(m, "msg")) w.uint32(34).bytes(m.msg);
          return w;
        };
        ContractCodeHistoryEntry.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmwasm.wasm.v1beta1.ContractCodeHistoryEntry();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.operation = r.int32();
                break;
              case 2:
                m.codeId = r.uint64();
                break;
              case 3:
                m.updated = $root.cosmwasm.wasm.v1beta1.AbsoluteTxPosition.decode(r, r.uint32());
                break;
              case 4:
                m.msg = r.bytes();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return ContractCodeHistoryEntry;
      })();
      v1beta1.AbsoluteTxPosition = (function () {
        function AbsoluteTxPosition(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        AbsoluteTxPosition.prototype.blockHeight = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        AbsoluteTxPosition.prototype.txIndex = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        AbsoluteTxPosition.create = function create(properties) {
          return new AbsoluteTxPosition(properties);
        };
        AbsoluteTxPosition.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.blockHeight != null && Object.hasOwnProperty.call(m, "blockHeight"))
            w.uint32(8).uint64(m.blockHeight);
          if (m.txIndex != null && Object.hasOwnProperty.call(m, "txIndex")) w.uint32(16).uint64(m.txIndex);
          return w;
        };
        AbsoluteTxPosition.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmwasm.wasm.v1beta1.AbsoluteTxPosition();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.blockHeight = r.uint64();
                break;
              case 2:
                m.txIndex = r.uint64();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return AbsoluteTxPosition;
      })();
      v1beta1.Model = (function () {
        function Model(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        Model.prototype.key = $util.newBuffer([]);
        Model.prototype.value = $util.newBuffer([]);
        Model.create = function create(properties) {
          return new Model(properties);
        };
        Model.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.key != null && Object.hasOwnProperty.call(m, "key")) w.uint32(10).bytes(m.key);
          if (m.value != null && Object.hasOwnProperty.call(m, "value")) w.uint32(18).bytes(m.value);
          return w;
        };
        Model.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmwasm.wasm.v1beta1.Model();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.key = r.bytes();
                break;
              case 2:
                m.value = r.bytes();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return Model;
      })();
      return v1beta1;
    })();
    return wasm;
  })();
  return cosmwasm;
})();
exports.google = $root.google = (() => {
  const google = {};
  google.api = (function () {
    const api = {};
    api.Http = (function () {
      function Http(p) {
        this.rules = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      Http.prototype.rules = $util.emptyArray;
      Http.create = function create(properties) {
        return new Http(properties);
      };
      Http.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.rules != null && m.rules.length) {
          for (var i = 0; i < m.rules.length; ++i)
            $root.google.api.HttpRule.encode(m.rules[i], w.uint32(10).fork()).ldelim();
        }
        return w;
      };
      Http.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.google.api.Http();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              if (!(m.rules && m.rules.length)) m.rules = [];
              m.rules.push($root.google.api.HttpRule.decode(r, r.uint32()));
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return Http;
    })();
    api.HttpRule = (function () {
      function HttpRule(p) {
        this.additionalBindings = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      HttpRule.prototype.get = "";
      HttpRule.prototype.put = "";
      HttpRule.prototype.post = "";
      HttpRule.prototype["delete"] = "";
      HttpRule.prototype.patch = "";
      HttpRule.prototype.custom = null;
      HttpRule.prototype.selector = "";
      HttpRule.prototype.body = "";
      HttpRule.prototype.additionalBindings = $util.emptyArray;
      let $oneOfFields;
      Object.defineProperty(HttpRule.prototype, "pattern", {
        get: $util.oneOfGetter(($oneOfFields = ["get", "put", "post", "delete", "patch", "custom"])),
        set: $util.oneOfSetter($oneOfFields),
      });
      HttpRule.create = function create(properties) {
        return new HttpRule(properties);
      };
      HttpRule.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.selector != null && Object.hasOwnProperty.call(m, "selector")) w.uint32(10).string(m.selector);
        if (m.get != null && Object.hasOwnProperty.call(m, "get")) w.uint32(18).string(m.get);
        if (m.put != null && Object.hasOwnProperty.call(m, "put")) w.uint32(26).string(m.put);
        if (m.post != null && Object.hasOwnProperty.call(m, "post")) w.uint32(34).string(m.post);
        if (m["delete"] != null && Object.hasOwnProperty.call(m, "delete")) w.uint32(42).string(m["delete"]);
        if (m.patch != null && Object.hasOwnProperty.call(m, "patch")) w.uint32(50).string(m.patch);
        if (m.body != null && Object.hasOwnProperty.call(m, "body")) w.uint32(58).string(m.body);
        if (m.custom != null && Object.hasOwnProperty.call(m, "custom"))
          $root.google.api.CustomHttpPattern.encode(m.custom, w.uint32(66).fork()).ldelim();
        if (m.additionalBindings != null && m.additionalBindings.length) {
          for (var i = 0; i < m.additionalBindings.length; ++i)
            $root.google.api.HttpRule.encode(m.additionalBindings[i], w.uint32(90).fork()).ldelim();
        }
        return w;
      };
      HttpRule.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.google.api.HttpRule();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 2:
              m.get = r.string();
              break;
            case 3:
              m.put = r.string();
              break;
            case 4:
              m.post = r.string();
              break;
            case 5:
              m["delete"] = r.string();
              break;
            case 6:
              m.patch = r.string();
              break;
            case 8:
              m.custom = $root.google.api.CustomHttpPattern.decode(r, r.uint32());
              break;
            case 1:
              m.selector = r.string();
              break;
            case 7:
              m.body = r.string();
              break;
            case 11:
              if (!(m.additionalBindings && m.additionalBindings.length)) m.additionalBindings = [];
              m.additionalBindings.push($root.google.api.HttpRule.decode(r, r.uint32()));
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return HttpRule;
    })();
    api.CustomHttpPattern = (function () {
      function CustomHttpPattern(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      CustomHttpPattern.prototype.kind = "";
      CustomHttpPattern.prototype.path = "";
      CustomHttpPattern.create = function create(properties) {
        return new CustomHttpPattern(properties);
      };
      CustomHttpPattern.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.kind != null && Object.hasOwnProperty.call(m, "kind")) w.uint32(10).string(m.kind);
        if (m.path != null && Object.hasOwnProperty.call(m, "path")) w.uint32(18).string(m.path);
        return w;
      };
      CustomHttpPattern.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.google.api.CustomHttpPattern();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.kind = r.string();
              break;
            case 2:
              m.path = r.string();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return CustomHttpPattern;
    })();
    return api;
  })();
  google.protobuf = (function () {
    const protobuf = {};
    protobuf.FileDescriptorSet = (function () {
      function FileDescriptorSet(p) {
        this.file = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      FileDescriptorSet.prototype.file = $util.emptyArray;
      FileDescriptorSet.create = function create(properties) {
        return new FileDescriptorSet(properties);
      };
      FileDescriptorSet.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.file != null && m.file.length) {
          for (var i = 0; i < m.file.length; ++i)
            $root.google.protobuf.FileDescriptorProto.encode(m.file[i], w.uint32(10).fork()).ldelim();
        }
        return w;
      };
      FileDescriptorSet.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.google.protobuf.FileDescriptorSet();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              if (!(m.file && m.file.length)) m.file = [];
              m.file.push($root.google.protobuf.FileDescriptorProto.decode(r, r.uint32()));
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return FileDescriptorSet;
    })();
    protobuf.FileDescriptorProto = (function () {
      function FileDescriptorProto(p) {
        this.dependency = [];
        this.publicDependency = [];
        this.weakDependency = [];
        this.messageType = [];
        this.enumType = [];
        this.service = [];
        this.extension = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      FileDescriptorProto.prototype.name = "";
      FileDescriptorProto.prototype["package"] = "";
      FileDescriptorProto.prototype.dependency = $util.emptyArray;
      FileDescriptorProto.prototype.publicDependency = $util.emptyArray;
      FileDescriptorProto.prototype.weakDependency = $util.emptyArray;
      FileDescriptorProto.prototype.messageType = $util.emptyArray;
      FileDescriptorProto.prototype.enumType = $util.emptyArray;
      FileDescriptorProto.prototype.service = $util.emptyArray;
      FileDescriptorProto.prototype.extension = $util.emptyArray;
      FileDescriptorProto.prototype.options = null;
      FileDescriptorProto.prototype.sourceCodeInfo = null;
      FileDescriptorProto.prototype.syntax = "";
      FileDescriptorProto.create = function create(properties) {
        return new FileDescriptorProto(properties);
      };
      FileDescriptorProto.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.name != null && Object.hasOwnProperty.call(m, "name")) w.uint32(10).string(m.name);
        if (m["package"] != null && Object.hasOwnProperty.call(m, "package"))
          w.uint32(18).string(m["package"]);
        if (m.dependency != null && m.dependency.length) {
          for (var i = 0; i < m.dependency.length; ++i) w.uint32(26).string(m.dependency[i]);
        }
        if (m.messageType != null && m.messageType.length) {
          for (var i = 0; i < m.messageType.length; ++i)
            $root.google.protobuf.DescriptorProto.encode(m.messageType[i], w.uint32(34).fork()).ldelim();
        }
        if (m.enumType != null && m.enumType.length) {
          for (var i = 0; i < m.enumType.length; ++i)
            $root.google.protobuf.EnumDescriptorProto.encode(m.enumType[i], w.uint32(42).fork()).ldelim();
        }
        if (m.service != null && m.service.length) {
          for (var i = 0; i < m.service.length; ++i)
            $root.google.protobuf.ServiceDescriptorProto.encode(m.service[i], w.uint32(50).fork()).ldelim();
        }
        if (m.extension != null && m.extension.length) {
          for (var i = 0; i < m.extension.length; ++i)
            $root.google.protobuf.FieldDescriptorProto.encode(m.extension[i], w.uint32(58).fork()).ldelim();
        }
        if (m.options != null && Object.hasOwnProperty.call(m, "options"))
          $root.google.protobuf.FileOptions.encode(m.options, w.uint32(66).fork()).ldelim();
        if (m.sourceCodeInfo != null && Object.hasOwnProperty.call(m, "sourceCodeInfo"))
          $root.google.protobuf.SourceCodeInfo.encode(m.sourceCodeInfo, w.uint32(74).fork()).ldelim();
        if (m.publicDependency != null && m.publicDependency.length) {
          for (var i = 0; i < m.publicDependency.length; ++i) w.uint32(80).int32(m.publicDependency[i]);
        }
        if (m.weakDependency != null && m.weakDependency.length) {
          for (var i = 0; i < m.weakDependency.length; ++i) w.uint32(88).int32(m.weakDependency[i]);
        }
        if (m.syntax != null && Object.hasOwnProperty.call(m, "syntax")) w.uint32(98).string(m.syntax);
        return w;
      };
      FileDescriptorProto.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.google.protobuf.FileDescriptorProto();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.name = r.string();
              break;
            case 2:
              m["package"] = r.string();
              break;
            case 3:
              if (!(m.dependency && m.dependency.length)) m.dependency = [];
              m.dependency.push(r.string());
              break;
            case 10:
              if (!(m.publicDependency && m.publicDependency.length)) m.publicDependency = [];
              if ((t & 7) === 2) {
                var c2 = r.uint32() + r.pos;
                while (r.pos < c2) m.publicDependency.push(r.int32());
              } else m.publicDependency.push(r.int32());
              break;
            case 11:
              if (!(m.weakDependency && m.weakDependency.length)) m.weakDependency = [];
              if ((t & 7) === 2) {
                var c2 = r.uint32() + r.pos;
                while (r.pos < c2) m.weakDependency.push(r.int32());
              } else m.weakDependency.push(r.int32());
              break;
            case 4:
              if (!(m.messageType && m.messageType.length)) m.messageType = [];
              m.messageType.push($root.google.protobuf.DescriptorProto.decode(r, r.uint32()));
              break;
            case 5:
              if (!(m.enumType && m.enumType.length)) m.enumType = [];
              m.enumType.push($root.google.protobuf.EnumDescriptorProto.decode(r, r.uint32()));
              break;
            case 6:
              if (!(m.service && m.service.length)) m.service = [];
              m.service.push($root.google.protobuf.ServiceDescriptorProto.decode(r, r.uint32()));
              break;
            case 7:
              if (!(m.extension && m.extension.length)) m.extension = [];
              m.extension.push($root.google.protobuf.FieldDescriptorProto.decode(r, r.uint32()));
              break;
            case 8:
              m.options = $root.google.protobuf.FileOptions.decode(r, r.uint32());
              break;
            case 9:
              m.sourceCodeInfo = $root.google.protobuf.SourceCodeInfo.decode(r, r.uint32());
              break;
            case 12:
              m.syntax = r.string();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return FileDescriptorProto;
    })();
    protobuf.DescriptorProto = (function () {
      function DescriptorProto(p) {
        this.field = [];
        this.extension = [];
        this.nestedType = [];
        this.enumType = [];
        this.extensionRange = [];
        this.oneofDecl = [];
        this.reservedRange = [];
        this.reservedName = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      DescriptorProto.prototype.name = "";
      DescriptorProto.prototype.field = $util.emptyArray;
      DescriptorProto.prototype.extension = $util.emptyArray;
      DescriptorProto.prototype.nestedType = $util.emptyArray;
      DescriptorProto.prototype.enumType = $util.emptyArray;
      DescriptorProto.prototype.extensionRange = $util.emptyArray;
      DescriptorProto.prototype.oneofDecl = $util.emptyArray;
      DescriptorProto.prototype.options = null;
      DescriptorProto.prototype.reservedRange = $util.emptyArray;
      DescriptorProto.prototype.reservedName = $util.emptyArray;
      DescriptorProto.create = function create(properties) {
        return new DescriptorProto(properties);
      };
      DescriptorProto.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.name != null && Object.hasOwnProperty.call(m, "name")) w.uint32(10).string(m.name);
        if (m.field != null && m.field.length) {
          for (var i = 0; i < m.field.length; ++i)
            $root.google.protobuf.FieldDescriptorProto.encode(m.field[i], w.uint32(18).fork()).ldelim();
        }
        if (m.nestedType != null && m.nestedType.length) {
          for (var i = 0; i < m.nestedType.length; ++i)
            $root.google.protobuf.DescriptorProto.encode(m.nestedType[i], w.uint32(26).fork()).ldelim();
        }
        if (m.enumType != null && m.enumType.length) {
          for (var i = 0; i < m.enumType.length; ++i)
            $root.google.protobuf.EnumDescriptorProto.encode(m.enumType[i], w.uint32(34).fork()).ldelim();
        }
        if (m.extensionRange != null && m.extensionRange.length) {
          for (var i = 0; i < m.extensionRange.length; ++i)
            $root.google.protobuf.DescriptorProto.ExtensionRange.encode(
              m.extensionRange[i],
              w.uint32(42).fork(),
            ).ldelim();
        }
        if (m.extension != null && m.extension.length) {
          for (var i = 0; i < m.extension.length; ++i)
            $root.google.protobuf.FieldDescriptorProto.encode(m.extension[i], w.uint32(50).fork()).ldelim();
        }
        if (m.options != null && Object.hasOwnProperty.call(m, "options"))
          $root.google.protobuf.MessageOptions.encode(m.options, w.uint32(58).fork()).ldelim();
        if (m.oneofDecl != null && m.oneofDecl.length) {
          for (var i = 0; i < m.oneofDecl.length; ++i)
            $root.google.protobuf.OneofDescriptorProto.encode(m.oneofDecl[i], w.uint32(66).fork()).ldelim();
        }
        if (m.reservedRange != null && m.reservedRange.length) {
          for (var i = 0; i < m.reservedRange.length; ++i)
            $root.google.protobuf.DescriptorProto.ReservedRange.encode(
              m.reservedRange[i],
              w.uint32(74).fork(),
            ).ldelim();
        }
        if (m.reservedName != null && m.reservedName.length) {
          for (var i = 0; i < m.reservedName.length; ++i) w.uint32(82).string(m.reservedName[i]);
        }
        return w;
      };
      DescriptorProto.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.google.protobuf.DescriptorProto();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.name = r.string();
              break;
            case 2:
              if (!(m.field && m.field.length)) m.field = [];
              m.field.push($root.google.protobuf.FieldDescriptorProto.decode(r, r.uint32()));
              break;
            case 6:
              if (!(m.extension && m.extension.length)) m.extension = [];
              m.extension.push($root.google.protobuf.FieldDescriptorProto.decode(r, r.uint32()));
              break;
            case 3:
              if (!(m.nestedType && m.nestedType.length)) m.nestedType = [];
              m.nestedType.push($root.google.protobuf.DescriptorProto.decode(r, r.uint32()));
              break;
            case 4:
              if (!(m.enumType && m.enumType.length)) m.enumType = [];
              m.enumType.push($root.google.protobuf.EnumDescriptorProto.decode(r, r.uint32()));
              break;
            case 5:
              if (!(m.extensionRange && m.extensionRange.length)) m.extensionRange = [];
              m.extensionRange.push(
                $root.google.protobuf.DescriptorProto.ExtensionRange.decode(r, r.uint32()),
              );
              break;
            case 8:
              if (!(m.oneofDecl && m.oneofDecl.length)) m.oneofDecl = [];
              m.oneofDecl.push($root.google.protobuf.OneofDescriptorProto.decode(r, r.uint32()));
              break;
            case 7:
              m.options = $root.google.protobuf.MessageOptions.decode(r, r.uint32());
              break;
            case 9:
              if (!(m.reservedRange && m.reservedRange.length)) m.reservedRange = [];
              m.reservedRange.push($root.google.protobuf.DescriptorProto.ReservedRange.decode(r, r.uint32()));
              break;
            case 10:
              if (!(m.reservedName && m.reservedName.length)) m.reservedName = [];
              m.reservedName.push(r.string());
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      DescriptorProto.ExtensionRange = (function () {
        function ExtensionRange(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        ExtensionRange.prototype.start = 0;
        ExtensionRange.prototype.end = 0;
        ExtensionRange.create = function create(properties) {
          return new ExtensionRange(properties);
        };
        ExtensionRange.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.start != null && Object.hasOwnProperty.call(m, "start")) w.uint32(8).int32(m.start);
          if (m.end != null && Object.hasOwnProperty.call(m, "end")) w.uint32(16).int32(m.end);
          return w;
        };
        ExtensionRange.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.google.protobuf.DescriptorProto.ExtensionRange();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.start = r.int32();
                break;
              case 2:
                m.end = r.int32();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return ExtensionRange;
      })();
      DescriptorProto.ReservedRange = (function () {
        function ReservedRange(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        ReservedRange.prototype.start = 0;
        ReservedRange.prototype.end = 0;
        ReservedRange.create = function create(properties) {
          return new ReservedRange(properties);
        };
        ReservedRange.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.start != null && Object.hasOwnProperty.call(m, "start")) w.uint32(8).int32(m.start);
          if (m.end != null && Object.hasOwnProperty.call(m, "end")) w.uint32(16).int32(m.end);
          return w;
        };
        ReservedRange.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.google.protobuf.DescriptorProto.ReservedRange();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.start = r.int32();
                break;
              case 2:
                m.end = r.int32();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return ReservedRange;
      })();
      return DescriptorProto;
    })();
    protobuf.FieldDescriptorProto = (function () {
      function FieldDescriptorProto(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      FieldDescriptorProto.prototype.name = "";
      FieldDescriptorProto.prototype.number = 0;
      FieldDescriptorProto.prototype.label = 1;
      FieldDescriptorProto.prototype.type = 1;
      FieldDescriptorProto.prototype.typeName = "";
      FieldDescriptorProto.prototype.extendee = "";
      FieldDescriptorProto.prototype.defaultValue = "";
      FieldDescriptorProto.prototype.oneofIndex = 0;
      FieldDescriptorProto.prototype.jsonName = "";
      FieldDescriptorProto.prototype.options = null;
      FieldDescriptorProto.create = function create(properties) {
        return new FieldDescriptorProto(properties);
      };
      FieldDescriptorProto.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.name != null && Object.hasOwnProperty.call(m, "name")) w.uint32(10).string(m.name);
        if (m.extendee != null && Object.hasOwnProperty.call(m, "extendee")) w.uint32(18).string(m.extendee);
        if (m.number != null && Object.hasOwnProperty.call(m, "number")) w.uint32(24).int32(m.number);
        if (m.label != null && Object.hasOwnProperty.call(m, "label")) w.uint32(32).int32(m.label);
        if (m.type != null && Object.hasOwnProperty.call(m, "type")) w.uint32(40).int32(m.type);
        if (m.typeName != null && Object.hasOwnProperty.call(m, "typeName")) w.uint32(50).string(m.typeName);
        if (m.defaultValue != null && Object.hasOwnProperty.call(m, "defaultValue"))
          w.uint32(58).string(m.defaultValue);
        if (m.options != null && Object.hasOwnProperty.call(m, "options"))
          $root.google.protobuf.FieldOptions.encode(m.options, w.uint32(66).fork()).ldelim();
        if (m.oneofIndex != null && Object.hasOwnProperty.call(m, "oneofIndex"))
          w.uint32(72).int32(m.oneofIndex);
        if (m.jsonName != null && Object.hasOwnProperty.call(m, "jsonName")) w.uint32(82).string(m.jsonName);
        return w;
      };
      FieldDescriptorProto.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.google.protobuf.FieldDescriptorProto();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.name = r.string();
              break;
            case 3:
              m.number = r.int32();
              break;
            case 4:
              m.label = r.int32();
              break;
            case 5:
              m.type = r.int32();
              break;
            case 6:
              m.typeName = r.string();
              break;
            case 2:
              m.extendee = r.string();
              break;
            case 7:
              m.defaultValue = r.string();
              break;
            case 9:
              m.oneofIndex = r.int32();
              break;
            case 10:
              m.jsonName = r.string();
              break;
            case 8:
              m.options = $root.google.protobuf.FieldOptions.decode(r, r.uint32());
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      FieldDescriptorProto.Type = (function () {
        const valuesById = {},
          values = Object.create(valuesById);
        values[(valuesById[1] = "TYPE_DOUBLE")] = 1;
        values[(valuesById[2] = "TYPE_FLOAT")] = 2;
        values[(valuesById[3] = "TYPE_INT64")] = 3;
        values[(valuesById[4] = "TYPE_UINT64")] = 4;
        values[(valuesById[5] = "TYPE_INT32")] = 5;
        values[(valuesById[6] = "TYPE_FIXED64")] = 6;
        values[(valuesById[7] = "TYPE_FIXED32")] = 7;
        values[(valuesById[8] = "TYPE_BOOL")] = 8;
        values[(valuesById[9] = "TYPE_STRING")] = 9;
        values[(valuesById[10] = "TYPE_GROUP")] = 10;
        values[(valuesById[11] = "TYPE_MESSAGE")] = 11;
        values[(valuesById[12] = "TYPE_BYTES")] = 12;
        values[(valuesById[13] = "TYPE_UINT32")] = 13;
        values[(valuesById[14] = "TYPE_ENUM")] = 14;
        values[(valuesById[15] = "TYPE_SFIXED32")] = 15;
        values[(valuesById[16] = "TYPE_SFIXED64")] = 16;
        values[(valuesById[17] = "TYPE_SINT32")] = 17;
        values[(valuesById[18] = "TYPE_SINT64")] = 18;
        return values;
      })();
      FieldDescriptorProto.Label = (function () {
        const valuesById = {},
          values = Object.create(valuesById);
        values[(valuesById[1] = "LABEL_OPTIONAL")] = 1;
        values[(valuesById[2] = "LABEL_REQUIRED")] = 2;
        values[(valuesById[3] = "LABEL_REPEATED")] = 3;
        return values;
      })();
      return FieldDescriptorProto;
    })();
    protobuf.OneofDescriptorProto = (function () {
      function OneofDescriptorProto(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      OneofDescriptorProto.prototype.name = "";
      OneofDescriptorProto.prototype.options = null;
      OneofDescriptorProto.create = function create(properties) {
        return new OneofDescriptorProto(properties);
      };
      OneofDescriptorProto.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.name != null && Object.hasOwnProperty.call(m, "name")) w.uint32(10).string(m.name);
        if (m.options != null && Object.hasOwnProperty.call(m, "options"))
          $root.google.protobuf.OneofOptions.encode(m.options, w.uint32(18).fork()).ldelim();
        return w;
      };
      OneofDescriptorProto.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.google.protobuf.OneofDescriptorProto();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.name = r.string();
              break;
            case 2:
              m.options = $root.google.protobuf.OneofOptions.decode(r, r.uint32());
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return OneofDescriptorProto;
    })();
    protobuf.EnumDescriptorProto = (function () {
      function EnumDescriptorProto(p) {
        this.value = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      EnumDescriptorProto.prototype.name = "";
      EnumDescriptorProto.prototype.value = $util.emptyArray;
      EnumDescriptorProto.prototype.options = null;
      EnumDescriptorProto.create = function create(properties) {
        return new EnumDescriptorProto(properties);
      };
      EnumDescriptorProto.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.name != null && Object.hasOwnProperty.call(m, "name")) w.uint32(10).string(m.name);
        if (m.value != null && m.value.length) {
          for (var i = 0; i < m.value.length; ++i)
            $root.google.protobuf.EnumValueDescriptorProto.encode(m.value[i], w.uint32(18).fork()).ldelim();
        }
        if (m.options != null && Object.hasOwnProperty.call(m, "options"))
          $root.google.protobuf.EnumOptions.encode(m.options, w.uint32(26).fork()).ldelim();
        return w;
      };
      EnumDescriptorProto.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.google.protobuf.EnumDescriptorProto();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.name = r.string();
              break;
            case 2:
              if (!(m.value && m.value.length)) m.value = [];
              m.value.push($root.google.protobuf.EnumValueDescriptorProto.decode(r, r.uint32()));
              break;
            case 3:
              m.options = $root.google.protobuf.EnumOptions.decode(r, r.uint32());
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return EnumDescriptorProto;
    })();
    protobuf.EnumValueDescriptorProto = (function () {
      function EnumValueDescriptorProto(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      EnumValueDescriptorProto.prototype.name = "";
      EnumValueDescriptorProto.prototype.number = 0;
      EnumValueDescriptorProto.prototype.options = null;
      EnumValueDescriptorProto.create = function create(properties) {
        return new EnumValueDescriptorProto(properties);
      };
      EnumValueDescriptorProto.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.name != null && Object.hasOwnProperty.call(m, "name")) w.uint32(10).string(m.name);
        if (m.number != null && Object.hasOwnProperty.call(m, "number")) w.uint32(16).int32(m.number);
        if (m.options != null && Object.hasOwnProperty.call(m, "options"))
          $root.google.protobuf.EnumValueOptions.encode(m.options, w.uint32(26).fork()).ldelim();
        return w;
      };
      EnumValueDescriptorProto.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.google.protobuf.EnumValueDescriptorProto();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.name = r.string();
              break;
            case 2:
              m.number = r.int32();
              break;
            case 3:
              m.options = $root.google.protobuf.EnumValueOptions.decode(r, r.uint32());
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return EnumValueDescriptorProto;
    })();
    protobuf.ServiceDescriptorProto = (function () {
      function ServiceDescriptorProto(p) {
        this.method = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      ServiceDescriptorProto.prototype.name = "";
      ServiceDescriptorProto.prototype.method = $util.emptyArray;
      ServiceDescriptorProto.prototype.options = null;
      ServiceDescriptorProto.create = function create(properties) {
        return new ServiceDescriptorProto(properties);
      };
      ServiceDescriptorProto.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.name != null && Object.hasOwnProperty.call(m, "name")) w.uint32(10).string(m.name);
        if (m.method != null && m.method.length) {
          for (var i = 0; i < m.method.length; ++i)
            $root.google.protobuf.MethodDescriptorProto.encode(m.method[i], w.uint32(18).fork()).ldelim();
        }
        if (m.options != null && Object.hasOwnProperty.call(m, "options"))
          $root.google.protobuf.ServiceOptions.encode(m.options, w.uint32(26).fork()).ldelim();
        return w;
      };
      ServiceDescriptorProto.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.google.protobuf.ServiceDescriptorProto();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.name = r.string();
              break;
            case 2:
              if (!(m.method && m.method.length)) m.method = [];
              m.method.push($root.google.protobuf.MethodDescriptorProto.decode(r, r.uint32()));
              break;
            case 3:
              m.options = $root.google.protobuf.ServiceOptions.decode(r, r.uint32());
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return ServiceDescriptorProto;
    })();
    protobuf.MethodDescriptorProto = (function () {
      function MethodDescriptorProto(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      MethodDescriptorProto.prototype.name = "";
      MethodDescriptorProto.prototype.inputType = "";
      MethodDescriptorProto.prototype.outputType = "";
      MethodDescriptorProto.prototype.options = null;
      MethodDescriptorProto.prototype.clientStreaming = false;
      MethodDescriptorProto.prototype.serverStreaming = false;
      MethodDescriptorProto.create = function create(properties) {
        return new MethodDescriptorProto(properties);
      };
      MethodDescriptorProto.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.name != null && Object.hasOwnProperty.call(m, "name")) w.uint32(10).string(m.name);
        if (m.inputType != null && Object.hasOwnProperty.call(m, "inputType"))
          w.uint32(18).string(m.inputType);
        if (m.outputType != null && Object.hasOwnProperty.call(m, "outputType"))
          w.uint32(26).string(m.outputType);
        if (m.options != null && Object.hasOwnProperty.call(m, "options"))
          $root.google.protobuf.MethodOptions.encode(m.options, w.uint32(34).fork()).ldelim();
        if (m.clientStreaming != null && Object.hasOwnProperty.call(m, "clientStreaming"))
          w.uint32(40).bool(m.clientStreaming);
        if (m.serverStreaming != null && Object.hasOwnProperty.call(m, "serverStreaming"))
          w.uint32(48).bool(m.serverStreaming);
        return w;
      };
      MethodDescriptorProto.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.google.protobuf.MethodDescriptorProto();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.name = r.string();
              break;
            case 2:
              m.inputType = r.string();
              break;
            case 3:
              m.outputType = r.string();
              break;
            case 4:
              m.options = $root.google.protobuf.MethodOptions.decode(r, r.uint32());
              break;
            case 5:
              m.clientStreaming = r.bool();
              break;
            case 6:
              m.serverStreaming = r.bool();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return MethodDescriptorProto;
    })();
    protobuf.FileOptions = (function () {
      function FileOptions(p) {
        this.uninterpretedOption = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      FileOptions.prototype.javaPackage = "";
      FileOptions.prototype.javaOuterClassname = "";
      FileOptions.prototype.javaMultipleFiles = false;
      FileOptions.prototype.javaGenerateEqualsAndHash = false;
      FileOptions.prototype.javaStringCheckUtf8 = false;
      FileOptions.prototype.optimizeFor = 1;
      FileOptions.prototype.goPackage = "";
      FileOptions.prototype.ccGenericServices = false;
      FileOptions.prototype.javaGenericServices = false;
      FileOptions.prototype.pyGenericServices = false;
      FileOptions.prototype.deprecated = false;
      FileOptions.prototype.ccEnableArenas = false;
      FileOptions.prototype.objcClassPrefix = "";
      FileOptions.prototype.csharpNamespace = "";
      FileOptions.prototype.uninterpretedOption = $util.emptyArray;
      FileOptions.create = function create(properties) {
        return new FileOptions(properties);
      };
      FileOptions.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.javaPackage != null && Object.hasOwnProperty.call(m, "javaPackage"))
          w.uint32(10).string(m.javaPackage);
        if (m.javaOuterClassname != null && Object.hasOwnProperty.call(m, "javaOuterClassname"))
          w.uint32(66).string(m.javaOuterClassname);
        if (m.optimizeFor != null && Object.hasOwnProperty.call(m, "optimizeFor"))
          w.uint32(72).int32(m.optimizeFor);
        if (m.javaMultipleFiles != null && Object.hasOwnProperty.call(m, "javaMultipleFiles"))
          w.uint32(80).bool(m.javaMultipleFiles);
        if (m.goPackage != null && Object.hasOwnProperty.call(m, "goPackage"))
          w.uint32(90).string(m.goPackage);
        if (m.ccGenericServices != null && Object.hasOwnProperty.call(m, "ccGenericServices"))
          w.uint32(128).bool(m.ccGenericServices);
        if (m.javaGenericServices != null && Object.hasOwnProperty.call(m, "javaGenericServices"))
          w.uint32(136).bool(m.javaGenericServices);
        if (m.pyGenericServices != null && Object.hasOwnProperty.call(m, "pyGenericServices"))
          w.uint32(144).bool(m.pyGenericServices);
        if (m.javaGenerateEqualsAndHash != null && Object.hasOwnProperty.call(m, "javaGenerateEqualsAndHash"))
          w.uint32(160).bool(m.javaGenerateEqualsAndHash);
        if (m.deprecated != null && Object.hasOwnProperty.call(m, "deprecated"))
          w.uint32(184).bool(m.deprecated);
        if (m.javaStringCheckUtf8 != null && Object.hasOwnProperty.call(m, "javaStringCheckUtf8"))
          w.uint32(216).bool(m.javaStringCheckUtf8);
        if (m.ccEnableArenas != null && Object.hasOwnProperty.call(m, "ccEnableArenas"))
          w.uint32(248).bool(m.ccEnableArenas);
        if (m.objcClassPrefix != null && Object.hasOwnProperty.call(m, "objcClassPrefix"))
          w.uint32(290).string(m.objcClassPrefix);
        if (m.csharpNamespace != null && Object.hasOwnProperty.call(m, "csharpNamespace"))
          w.uint32(298).string(m.csharpNamespace);
        if (m.uninterpretedOption != null && m.uninterpretedOption.length) {
          for (var i = 0; i < m.uninterpretedOption.length; ++i)
            $root.google.protobuf.UninterpretedOption.encode(
              m.uninterpretedOption[i],
              w.uint32(7994).fork(),
            ).ldelim();
        }
        return w;
      };
      FileOptions.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.google.protobuf.FileOptions();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.javaPackage = r.string();
              break;
            case 8:
              m.javaOuterClassname = r.string();
              break;
            case 10:
              m.javaMultipleFiles = r.bool();
              break;
            case 20:
              m.javaGenerateEqualsAndHash = r.bool();
              break;
            case 27:
              m.javaStringCheckUtf8 = r.bool();
              break;
            case 9:
              m.optimizeFor = r.int32();
              break;
            case 11:
              m.goPackage = r.string();
              break;
            case 16:
              m.ccGenericServices = r.bool();
              break;
            case 17:
              m.javaGenericServices = r.bool();
              break;
            case 18:
              m.pyGenericServices = r.bool();
              break;
            case 23:
              m.deprecated = r.bool();
              break;
            case 31:
              m.ccEnableArenas = r.bool();
              break;
            case 36:
              m.objcClassPrefix = r.string();
              break;
            case 37:
              m.csharpNamespace = r.string();
              break;
            case 999:
              if (!(m.uninterpretedOption && m.uninterpretedOption.length)) m.uninterpretedOption = [];
              m.uninterpretedOption.push($root.google.protobuf.UninterpretedOption.decode(r, r.uint32()));
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      FileOptions.OptimizeMode = (function () {
        const valuesById = {},
          values = Object.create(valuesById);
        values[(valuesById[1] = "SPEED")] = 1;
        values[(valuesById[2] = "CODE_SIZE")] = 2;
        values[(valuesById[3] = "LITE_RUNTIME")] = 3;
        return values;
      })();
      return FileOptions;
    })();
    protobuf.MessageOptions = (function () {
      function MessageOptions(p) {
        this.uninterpretedOption = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      MessageOptions.prototype.messageSetWireFormat = false;
      MessageOptions.prototype.noStandardDescriptorAccessor = false;
      MessageOptions.prototype.deprecated = false;
      MessageOptions.prototype.mapEntry = false;
      MessageOptions.prototype.uninterpretedOption = $util.emptyArray;
      MessageOptions.create = function create(properties) {
        return new MessageOptions(properties);
      };
      MessageOptions.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.messageSetWireFormat != null && Object.hasOwnProperty.call(m, "messageSetWireFormat"))
          w.uint32(8).bool(m.messageSetWireFormat);
        if (
          m.noStandardDescriptorAccessor != null &&
          Object.hasOwnProperty.call(m, "noStandardDescriptorAccessor")
        )
          w.uint32(16).bool(m.noStandardDescriptorAccessor);
        if (m.deprecated != null && Object.hasOwnProperty.call(m, "deprecated"))
          w.uint32(24).bool(m.deprecated);
        if (m.mapEntry != null && Object.hasOwnProperty.call(m, "mapEntry")) w.uint32(56).bool(m.mapEntry);
        if (m.uninterpretedOption != null && m.uninterpretedOption.length) {
          for (var i = 0; i < m.uninterpretedOption.length; ++i)
            $root.google.protobuf.UninterpretedOption.encode(
              m.uninterpretedOption[i],
              w.uint32(7994).fork(),
            ).ldelim();
        }
        return w;
      };
      MessageOptions.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.google.protobuf.MessageOptions();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.messageSetWireFormat = r.bool();
              break;
            case 2:
              m.noStandardDescriptorAccessor = r.bool();
              break;
            case 3:
              m.deprecated = r.bool();
              break;
            case 7:
              m.mapEntry = r.bool();
              break;
            case 999:
              if (!(m.uninterpretedOption && m.uninterpretedOption.length)) m.uninterpretedOption = [];
              m.uninterpretedOption.push($root.google.protobuf.UninterpretedOption.decode(r, r.uint32()));
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return MessageOptions;
    })();
    protobuf.FieldOptions = (function () {
      function FieldOptions(p) {
        this.uninterpretedOption = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      FieldOptions.prototype.ctype = 0;
      FieldOptions.prototype.packed = false;
      FieldOptions.prototype.jstype = 0;
      FieldOptions.prototype.lazy = false;
      FieldOptions.prototype.deprecated = false;
      FieldOptions.prototype.weak = false;
      FieldOptions.prototype.uninterpretedOption = $util.emptyArray;
      FieldOptions.create = function create(properties) {
        return new FieldOptions(properties);
      };
      FieldOptions.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.ctype != null && Object.hasOwnProperty.call(m, "ctype")) w.uint32(8).int32(m.ctype);
        if (m.packed != null && Object.hasOwnProperty.call(m, "packed")) w.uint32(16).bool(m.packed);
        if (m.deprecated != null && Object.hasOwnProperty.call(m, "deprecated"))
          w.uint32(24).bool(m.deprecated);
        if (m.lazy != null && Object.hasOwnProperty.call(m, "lazy")) w.uint32(40).bool(m.lazy);
        if (m.jstype != null && Object.hasOwnProperty.call(m, "jstype")) w.uint32(48).int32(m.jstype);
        if (m.weak != null && Object.hasOwnProperty.call(m, "weak")) w.uint32(80).bool(m.weak);
        if (m.uninterpretedOption != null && m.uninterpretedOption.length) {
          for (var i = 0; i < m.uninterpretedOption.length; ++i)
            $root.google.protobuf.UninterpretedOption.encode(
              m.uninterpretedOption[i],
              w.uint32(7994).fork(),
            ).ldelim();
        }
        return w;
      };
      FieldOptions.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.google.protobuf.FieldOptions();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.ctype = r.int32();
              break;
            case 2:
              m.packed = r.bool();
              break;
            case 6:
              m.jstype = r.int32();
              break;
            case 5:
              m.lazy = r.bool();
              break;
            case 3:
              m.deprecated = r.bool();
              break;
            case 10:
              m.weak = r.bool();
              break;
            case 999:
              if (!(m.uninterpretedOption && m.uninterpretedOption.length)) m.uninterpretedOption = [];
              m.uninterpretedOption.push($root.google.protobuf.UninterpretedOption.decode(r, r.uint32()));
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      FieldOptions.CType = (function () {
        const valuesById = {},
          values = Object.create(valuesById);
        values[(valuesById[0] = "STRING")] = 0;
        values[(valuesById[1] = "CORD")] = 1;
        values[(valuesById[2] = "STRING_PIECE")] = 2;
        return values;
      })();
      FieldOptions.JSType = (function () {
        const valuesById = {},
          values = Object.create(valuesById);
        values[(valuesById[0] = "JS_NORMAL")] = 0;
        values[(valuesById[1] = "JS_STRING")] = 1;
        values[(valuesById[2] = "JS_NUMBER")] = 2;
        return values;
      })();
      return FieldOptions;
    })();
    protobuf.OneofOptions = (function () {
      function OneofOptions(p) {
        this.uninterpretedOption = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      OneofOptions.prototype.uninterpretedOption = $util.emptyArray;
      OneofOptions.create = function create(properties) {
        return new OneofOptions(properties);
      };
      OneofOptions.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.uninterpretedOption != null && m.uninterpretedOption.length) {
          for (var i = 0; i < m.uninterpretedOption.length; ++i)
            $root.google.protobuf.UninterpretedOption.encode(
              m.uninterpretedOption[i],
              w.uint32(7994).fork(),
            ).ldelim();
        }
        return w;
      };
      OneofOptions.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.google.protobuf.OneofOptions();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 999:
              if (!(m.uninterpretedOption && m.uninterpretedOption.length)) m.uninterpretedOption = [];
              m.uninterpretedOption.push($root.google.protobuf.UninterpretedOption.decode(r, r.uint32()));
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return OneofOptions;
    })();
    protobuf.EnumOptions = (function () {
      function EnumOptions(p) {
        this.uninterpretedOption = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      EnumOptions.prototype.allowAlias = false;
      EnumOptions.prototype.deprecated = false;
      EnumOptions.prototype.uninterpretedOption = $util.emptyArray;
      EnumOptions.create = function create(properties) {
        return new EnumOptions(properties);
      };
      EnumOptions.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.allowAlias != null && Object.hasOwnProperty.call(m, "allowAlias"))
          w.uint32(16).bool(m.allowAlias);
        if (m.deprecated != null && Object.hasOwnProperty.call(m, "deprecated"))
          w.uint32(24).bool(m.deprecated);
        if (m.uninterpretedOption != null && m.uninterpretedOption.length) {
          for (var i = 0; i < m.uninterpretedOption.length; ++i)
            $root.google.protobuf.UninterpretedOption.encode(
              m.uninterpretedOption[i],
              w.uint32(7994).fork(),
            ).ldelim();
        }
        return w;
      };
      EnumOptions.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.google.protobuf.EnumOptions();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 2:
              m.allowAlias = r.bool();
              break;
            case 3:
              m.deprecated = r.bool();
              break;
            case 999:
              if (!(m.uninterpretedOption && m.uninterpretedOption.length)) m.uninterpretedOption = [];
              m.uninterpretedOption.push($root.google.protobuf.UninterpretedOption.decode(r, r.uint32()));
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return EnumOptions;
    })();
    protobuf.EnumValueOptions = (function () {
      function EnumValueOptions(p) {
        this.uninterpretedOption = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      EnumValueOptions.prototype.deprecated = false;
      EnumValueOptions.prototype.uninterpretedOption = $util.emptyArray;
      EnumValueOptions.create = function create(properties) {
        return new EnumValueOptions(properties);
      };
      EnumValueOptions.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.deprecated != null && Object.hasOwnProperty.call(m, "deprecated"))
          w.uint32(8).bool(m.deprecated);
        if (m.uninterpretedOption != null && m.uninterpretedOption.length) {
          for (var i = 0; i < m.uninterpretedOption.length; ++i)
            $root.google.protobuf.UninterpretedOption.encode(
              m.uninterpretedOption[i],
              w.uint32(7994).fork(),
            ).ldelim();
        }
        return w;
      };
      EnumValueOptions.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.google.protobuf.EnumValueOptions();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.deprecated = r.bool();
              break;
            case 999:
              if (!(m.uninterpretedOption && m.uninterpretedOption.length)) m.uninterpretedOption = [];
              m.uninterpretedOption.push($root.google.protobuf.UninterpretedOption.decode(r, r.uint32()));
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return EnumValueOptions;
    })();
    protobuf.ServiceOptions = (function () {
      function ServiceOptions(p) {
        this.uninterpretedOption = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      ServiceOptions.prototype.deprecated = false;
      ServiceOptions.prototype.uninterpretedOption = $util.emptyArray;
      ServiceOptions.create = function create(properties) {
        return new ServiceOptions(properties);
      };
      ServiceOptions.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.deprecated != null && Object.hasOwnProperty.call(m, "deprecated"))
          w.uint32(264).bool(m.deprecated);
        if (m.uninterpretedOption != null && m.uninterpretedOption.length) {
          for (var i = 0; i < m.uninterpretedOption.length; ++i)
            $root.google.protobuf.UninterpretedOption.encode(
              m.uninterpretedOption[i],
              w.uint32(7994).fork(),
            ).ldelim();
        }
        return w;
      };
      ServiceOptions.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.google.protobuf.ServiceOptions();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 33:
              m.deprecated = r.bool();
              break;
            case 999:
              if (!(m.uninterpretedOption && m.uninterpretedOption.length)) m.uninterpretedOption = [];
              m.uninterpretedOption.push($root.google.protobuf.UninterpretedOption.decode(r, r.uint32()));
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return ServiceOptions;
    })();
    protobuf.MethodOptions = (function () {
      function MethodOptions(p) {
        this.uninterpretedOption = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      MethodOptions.prototype.deprecated = false;
      MethodOptions.prototype.uninterpretedOption = $util.emptyArray;
      MethodOptions.prototype[".google.api.http"] = null;
      MethodOptions.create = function create(properties) {
        return new MethodOptions(properties);
      };
      MethodOptions.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.deprecated != null && Object.hasOwnProperty.call(m, "deprecated"))
          w.uint32(264).bool(m.deprecated);
        if (m.uninterpretedOption != null && m.uninterpretedOption.length) {
          for (var i = 0; i < m.uninterpretedOption.length; ++i)
            $root.google.protobuf.UninterpretedOption.encode(
              m.uninterpretedOption[i],
              w.uint32(7994).fork(),
            ).ldelim();
        }
        if (m[".google.api.http"] != null && Object.hasOwnProperty.call(m, ".google.api.http"))
          $root.google.api.HttpRule.encode(m[".google.api.http"], w.uint32(578365826).fork()).ldelim();
        return w;
      };
      MethodOptions.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.google.protobuf.MethodOptions();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 33:
              m.deprecated = r.bool();
              break;
            case 999:
              if (!(m.uninterpretedOption && m.uninterpretedOption.length)) m.uninterpretedOption = [];
              m.uninterpretedOption.push($root.google.protobuf.UninterpretedOption.decode(r, r.uint32()));
              break;
            case 72295728:
              m[".google.api.http"] = $root.google.api.HttpRule.decode(r, r.uint32());
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return MethodOptions;
    })();
    protobuf.UninterpretedOption = (function () {
      function UninterpretedOption(p) {
        this.name = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      UninterpretedOption.prototype.name = $util.emptyArray;
      UninterpretedOption.prototype.identifierValue = "";
      UninterpretedOption.prototype.positiveIntValue = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      UninterpretedOption.prototype.negativeIntValue = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      UninterpretedOption.prototype.doubleValue = 0;
      UninterpretedOption.prototype.stringValue = $util.newBuffer([]);
      UninterpretedOption.prototype.aggregateValue = "";
      UninterpretedOption.create = function create(properties) {
        return new UninterpretedOption(properties);
      };
      UninterpretedOption.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.name != null && m.name.length) {
          for (var i = 0; i < m.name.length; ++i)
            $root.google.protobuf.UninterpretedOption.NamePart.encode(
              m.name[i],
              w.uint32(18).fork(),
            ).ldelim();
        }
        if (m.identifierValue != null && Object.hasOwnProperty.call(m, "identifierValue"))
          w.uint32(26).string(m.identifierValue);
        if (m.positiveIntValue != null && Object.hasOwnProperty.call(m, "positiveIntValue"))
          w.uint32(32).uint64(m.positiveIntValue);
        if (m.negativeIntValue != null && Object.hasOwnProperty.call(m, "negativeIntValue"))
          w.uint32(40).int64(m.negativeIntValue);
        if (m.doubleValue != null && Object.hasOwnProperty.call(m, "doubleValue"))
          w.uint32(49).double(m.doubleValue);
        if (m.stringValue != null && Object.hasOwnProperty.call(m, "stringValue"))
          w.uint32(58).bytes(m.stringValue);
        if (m.aggregateValue != null && Object.hasOwnProperty.call(m, "aggregateValue"))
          w.uint32(66).string(m.aggregateValue);
        return w;
      };
      UninterpretedOption.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.google.protobuf.UninterpretedOption();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 2:
              if (!(m.name && m.name.length)) m.name = [];
              m.name.push($root.google.protobuf.UninterpretedOption.NamePart.decode(r, r.uint32()));
              break;
            case 3:
              m.identifierValue = r.string();
              break;
            case 4:
              m.positiveIntValue = r.uint64();
              break;
            case 5:
              m.negativeIntValue = r.int64();
              break;
            case 6:
              m.doubleValue = r.double();
              break;
            case 7:
              m.stringValue = r.bytes();
              break;
            case 8:
              m.aggregateValue = r.string();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      UninterpretedOption.NamePart = (function () {
        function NamePart(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        NamePart.prototype.namePart = "";
        NamePart.prototype.isExtension = false;
        NamePart.create = function create(properties) {
          return new NamePart(properties);
        };
        NamePart.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          w.uint32(10).string(m.namePart);
          w.uint32(16).bool(m.isExtension);
          return w;
        };
        NamePart.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.google.protobuf.UninterpretedOption.NamePart();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.namePart = r.string();
                break;
              case 2:
                m.isExtension = r.bool();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          if (!m.hasOwnProperty("namePart"))
            throw $util.ProtocolError("missing required 'namePart'", { instance: m });
          if (!m.hasOwnProperty("isExtension"))
            throw $util.ProtocolError("missing required 'isExtension'", { instance: m });
          return m;
        };
        return NamePart;
      })();
      return UninterpretedOption;
    })();
    protobuf.SourceCodeInfo = (function () {
      function SourceCodeInfo(p) {
        this.location = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      SourceCodeInfo.prototype.location = $util.emptyArray;
      SourceCodeInfo.create = function create(properties) {
        return new SourceCodeInfo(properties);
      };
      SourceCodeInfo.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.location != null && m.location.length) {
          for (var i = 0; i < m.location.length; ++i)
            $root.google.protobuf.SourceCodeInfo.Location.encode(m.location[i], w.uint32(10).fork()).ldelim();
        }
        return w;
      };
      SourceCodeInfo.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.google.protobuf.SourceCodeInfo();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              if (!(m.location && m.location.length)) m.location = [];
              m.location.push($root.google.protobuf.SourceCodeInfo.Location.decode(r, r.uint32()));
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      SourceCodeInfo.Location = (function () {
        function Location(p) {
          this.path = [];
          this.span = [];
          this.leadingDetachedComments = [];
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        Location.prototype.path = $util.emptyArray;
        Location.prototype.span = $util.emptyArray;
        Location.prototype.leadingComments = "";
        Location.prototype.trailingComments = "";
        Location.prototype.leadingDetachedComments = $util.emptyArray;
        Location.create = function create(properties) {
          return new Location(properties);
        };
        Location.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.path != null && m.path.length) {
            w.uint32(10).fork();
            for (var i = 0; i < m.path.length; ++i) w.int32(m.path[i]);
            w.ldelim();
          }
          if (m.span != null && m.span.length) {
            w.uint32(18).fork();
            for (var i = 0; i < m.span.length; ++i) w.int32(m.span[i]);
            w.ldelim();
          }
          if (m.leadingComments != null && Object.hasOwnProperty.call(m, "leadingComments"))
            w.uint32(26).string(m.leadingComments);
          if (m.trailingComments != null && Object.hasOwnProperty.call(m, "trailingComments"))
            w.uint32(34).string(m.trailingComments);
          if (m.leadingDetachedComments != null && m.leadingDetachedComments.length) {
            for (var i = 0; i < m.leadingDetachedComments.length; ++i)
              w.uint32(50).string(m.leadingDetachedComments[i]);
          }
          return w;
        };
        Location.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.google.protobuf.SourceCodeInfo.Location();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                if (!(m.path && m.path.length)) m.path = [];
                if ((t & 7) === 2) {
                  var c2 = r.uint32() + r.pos;
                  while (r.pos < c2) m.path.push(r.int32());
                } else m.path.push(r.int32());
                break;
              case 2:
                if (!(m.span && m.span.length)) m.span = [];
                if ((t & 7) === 2) {
                  var c2 = r.uint32() + r.pos;
                  while (r.pos < c2) m.span.push(r.int32());
                } else m.span.push(r.int32());
                break;
              case 3:
                m.leadingComments = r.string();
                break;
              case 4:
                m.trailingComments = r.string();
                break;
              case 6:
                if (!(m.leadingDetachedComments && m.leadingDetachedComments.length))
                  m.leadingDetachedComments = [];
                m.leadingDetachedComments.push(r.string());
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return Location;
      })();
      return SourceCodeInfo;
    })();
    protobuf.GeneratedCodeInfo = (function () {
      function GeneratedCodeInfo(p) {
        this.annotation = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      GeneratedCodeInfo.prototype.annotation = $util.emptyArray;
      GeneratedCodeInfo.create = function create(properties) {
        return new GeneratedCodeInfo(properties);
      };
      GeneratedCodeInfo.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.annotation != null && m.annotation.length) {
          for (var i = 0; i < m.annotation.length; ++i)
            $root.google.protobuf.GeneratedCodeInfo.Annotation.encode(
              m.annotation[i],
              w.uint32(10).fork(),
            ).ldelim();
        }
        return w;
      };
      GeneratedCodeInfo.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.google.protobuf.GeneratedCodeInfo();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              if (!(m.annotation && m.annotation.length)) m.annotation = [];
              m.annotation.push($root.google.protobuf.GeneratedCodeInfo.Annotation.decode(r, r.uint32()));
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      GeneratedCodeInfo.Annotation = (function () {
        function Annotation(p) {
          this.path = [];
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        Annotation.prototype.path = $util.emptyArray;
        Annotation.prototype.sourceFile = "";
        Annotation.prototype.begin = 0;
        Annotation.prototype.end = 0;
        Annotation.create = function create(properties) {
          return new Annotation(properties);
        };
        Annotation.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.path != null && m.path.length) {
            w.uint32(10).fork();
            for (var i = 0; i < m.path.length; ++i) w.int32(m.path[i]);
            w.ldelim();
          }
          if (m.sourceFile != null && Object.hasOwnProperty.call(m, "sourceFile"))
            w.uint32(18).string(m.sourceFile);
          if (m.begin != null && Object.hasOwnProperty.call(m, "begin")) w.uint32(24).int32(m.begin);
          if (m.end != null && Object.hasOwnProperty.call(m, "end")) w.uint32(32).int32(m.end);
          return w;
        };
        Annotation.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.google.protobuf.GeneratedCodeInfo.Annotation();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                if (!(m.path && m.path.length)) m.path = [];
                if ((t & 7) === 2) {
                  var c2 = r.uint32() + r.pos;
                  while (r.pos < c2) m.path.push(r.int32());
                } else m.path.push(r.int32());
                break;
              case 2:
                m.sourceFile = r.string();
                break;
              case 3:
                m.begin = r.int32();
                break;
              case 4:
                m.end = r.int32();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return Annotation;
      })();
      return GeneratedCodeInfo;
    })();
    return protobuf;
  })();
  return google;
})();
exports.cosmos = $root.cosmos = (() => {
  const cosmos = {};
  cosmos.base = (function () {
    const base = {};
    base.v1beta1 = (function () {
      const v1beta1 = {};
      v1beta1.Coin = (function () {
        function Coin(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        Coin.prototype.denom = "";
        Coin.prototype.amount = "";
        Coin.create = function create(properties) {
          return new Coin(properties);
        };
        Coin.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.denom != null && Object.hasOwnProperty.call(m, "denom")) w.uint32(10).string(m.denom);
          if (m.amount != null && Object.hasOwnProperty.call(m, "amount")) w.uint32(18).string(m.amount);
          return w;
        };
        Coin.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmos.base.v1beta1.Coin();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.denom = r.string();
                break;
              case 2:
                m.amount = r.string();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return Coin;
      })();
      v1beta1.DecCoin = (function () {
        function DecCoin(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        DecCoin.prototype.denom = "";
        DecCoin.prototype.amount = "";
        DecCoin.create = function create(properties) {
          return new DecCoin(properties);
        };
        DecCoin.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.denom != null && Object.hasOwnProperty.call(m, "denom")) w.uint32(10).string(m.denom);
          if (m.amount != null && Object.hasOwnProperty.call(m, "amount")) w.uint32(18).string(m.amount);
          return w;
        };
        DecCoin.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmos.base.v1beta1.DecCoin();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.denom = r.string();
                break;
              case 2:
                m.amount = r.string();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return DecCoin;
      })();
      v1beta1.IntProto = (function () {
        function IntProto(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        IntProto.prototype.int = "";
        IntProto.create = function create(properties) {
          return new IntProto(properties);
        };
        IntProto.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.int != null && Object.hasOwnProperty.call(m, "int")) w.uint32(10).string(m.int);
          return w;
        };
        IntProto.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmos.base.v1beta1.IntProto();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.int = r.string();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return IntProto;
      })();
      v1beta1.DecProto = (function () {
        function DecProto(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        DecProto.prototype.dec = "";
        DecProto.create = function create(properties) {
          return new DecProto(properties);
        };
        DecProto.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.dec != null && Object.hasOwnProperty.call(m, "dec")) w.uint32(10).string(m.dec);
          return w;
        };
        DecProto.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmos.base.v1beta1.DecProto();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.dec = r.string();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return DecProto;
      })();
      return v1beta1;
    })();
    base.query = (function () {
      const query = {};
      query.v1beta1 = (function () {
        const v1beta1 = {};
        v1beta1.PageRequest = (function () {
          function PageRequest(p) {
            if (p)
              for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
          }
          PageRequest.prototype.key = $util.newBuffer([]);
          PageRequest.prototype.offset = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
          PageRequest.prototype.limit = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
          PageRequest.prototype.countTotal = false;
          PageRequest.create = function create(properties) {
            return new PageRequest(properties);
          };
          PageRequest.encode = function encode(m, w) {
            if (!w) w = $Writer.create();
            if (m.key != null && Object.hasOwnProperty.call(m, "key")) w.uint32(10).bytes(m.key);
            if (m.offset != null && Object.hasOwnProperty.call(m, "offset")) w.uint32(16).uint64(m.offset);
            if (m.limit != null && Object.hasOwnProperty.call(m, "limit")) w.uint32(24).uint64(m.limit);
            if (m.countTotal != null && Object.hasOwnProperty.call(m, "countTotal"))
              w.uint32(32).bool(m.countTotal);
            return w;
          };
          PageRequest.decode = function decode(r, l) {
            if (!(r instanceof $Reader)) r = $Reader.create(r);
            var c = l === undefined ? r.len : r.pos + l,
              m = new $root.cosmos.base.query.v1beta1.PageRequest();
            while (r.pos < c) {
              var t = r.uint32();
              switch (t >>> 3) {
                case 1:
                  m.key = r.bytes();
                  break;
                case 2:
                  m.offset = r.uint64();
                  break;
                case 3:
                  m.limit = r.uint64();
                  break;
                case 4:
                  m.countTotal = r.bool();
                  break;
                default:
                  r.skipType(t & 7);
                  break;
              }
            }
            return m;
          };
          return PageRequest;
        })();
        v1beta1.PageResponse = (function () {
          function PageResponse(p) {
            if (p)
              for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
          }
          PageResponse.prototype.nextKey = $util.newBuffer([]);
          PageResponse.prototype.total = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
          PageResponse.create = function create(properties) {
            return new PageResponse(properties);
          };
          PageResponse.encode = function encode(m, w) {
            if (!w) w = $Writer.create();
            if (m.nextKey != null && Object.hasOwnProperty.call(m, "nextKey")) w.uint32(10).bytes(m.nextKey);
            if (m.total != null && Object.hasOwnProperty.call(m, "total")) w.uint32(16).uint64(m.total);
            return w;
          };
          PageResponse.decode = function decode(r, l) {
            if (!(r instanceof $Reader)) r = $Reader.create(r);
            var c = l === undefined ? r.len : r.pos + l,
              m = new $root.cosmos.base.query.v1beta1.PageResponse();
            while (r.pos < c) {
              var t = r.uint32();
              switch (t >>> 3) {
                case 1:
                  m.nextKey = r.bytes();
                  break;
                case 2:
                  m.total = r.uint64();
                  break;
                default:
                  r.skipType(t & 7);
                  break;
              }
            }
            return m;
          };
          return PageResponse;
        })();
        return v1beta1;
      })();
      return query;
    })();
    return base;
  })();
  return cosmos;
})();
module.exports = $root;
