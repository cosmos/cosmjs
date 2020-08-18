"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.google = exports.tendermint = exports.ibc = exports.cosmos = void 0;
var $protobuf = require("protobufjs/minimal");
const $Reader = $protobuf.Reader,
  $Writer = $protobuf.Writer,
  $util = $protobuf.util;
const $root = {};
exports.cosmos = $root.cosmos = (() => {
  const cosmos = {};
  cosmos.Coin = (function () {
    function Coin(p) {
      if (p)
        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
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
        m = new $root.cosmos.Coin();
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
  cosmos.DecCoin = (function () {
    function DecCoin(p) {
      if (p)
        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
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
        m = new $root.cosmos.DecCoin();
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
  cosmos.IntProto = (function () {
    function IntProto(p) {
      if (p)
        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
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
        m = new $root.cosmos.IntProto();
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
  cosmos.DecProto = (function () {
    function DecProto(p) {
      if (p)
        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
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
        m = new $root.cosmos.DecProto();
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
  cosmos.ValAddresses = (function () {
    function ValAddresses(p) {
      this.addresses = [];
      if (p)
        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
    }
    ValAddresses.prototype.addresses = $util.emptyArray;
    ValAddresses.create = function create(properties) {
      return new ValAddresses(properties);
    };
    ValAddresses.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.addresses != null && m.addresses.length) {
        for (var i = 0; i < m.addresses.length; ++i) w.uint32(10).bytes(m.addresses[i]);
      }
      return w;
    };
    ValAddresses.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
        m = new $root.cosmos.ValAddresses();
      while (r.pos < c) {
        var t = r.uint32();
        switch (t >>> 3) {
          case 1:
            if (!(m.addresses && m.addresses.length)) m.addresses = [];
            m.addresses.push(r.bytes());
            break;
          default:
            r.skipType(t & 7);
            break;
        }
      }
      return m;
    };
    return ValAddresses;
  })();
  cosmos.GasInfo = (function () {
    function GasInfo(p) {
      if (p)
        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
    }
    GasInfo.prototype.gasWanted = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
    GasInfo.prototype.gasUsed = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
    GasInfo.create = function create(properties) {
      return new GasInfo(properties);
    };
    GasInfo.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.gasWanted != null && Object.hasOwnProperty.call(m, "gasWanted")) w.uint32(8).uint64(m.gasWanted);
      if (m.gasUsed != null && Object.hasOwnProperty.call(m, "gasUsed")) w.uint32(16).uint64(m.gasUsed);
      return w;
    };
    GasInfo.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
        m = new $root.cosmos.GasInfo();
      while (r.pos < c) {
        var t = r.uint32();
        switch (t >>> 3) {
          case 1:
            m.gasWanted = r.uint64();
            break;
          case 2:
            m.gasUsed = r.uint64();
            break;
          default:
            r.skipType(t & 7);
            break;
        }
      }
      return m;
    };
    return GasInfo;
  })();
  cosmos.Result = (function () {
    function Result(p) {
      this.events = [];
      if (p)
        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
    }
    Result.prototype.data = $util.newBuffer([]);
    Result.prototype.log = "";
    Result.prototype.events = $util.emptyArray;
    Result.create = function create(properties) {
      return new Result(properties);
    };
    Result.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.data != null && Object.hasOwnProperty.call(m, "data")) w.uint32(10).bytes(m.data);
      if (m.log != null && Object.hasOwnProperty.call(m, "log")) w.uint32(18).string(m.log);
      if (m.events != null && m.events.length) {
        for (var i = 0; i < m.events.length; ++i)
          $root.tendermint.abci.types.Event.encode(m.events[i], w.uint32(26).fork()).ldelim();
      }
      return w;
    };
    Result.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
        m = new $root.cosmos.Result();
      while (r.pos < c) {
        var t = r.uint32();
        switch (t >>> 3) {
          case 1:
            m.data = r.bytes();
            break;
          case 2:
            m.log = r.string();
            break;
          case 3:
            if (!(m.events && m.events.length)) m.events = [];
            m.events.push($root.tendermint.abci.types.Event.decode(r, r.uint32()));
            break;
          default:
            r.skipType(t & 7);
            break;
        }
      }
      return m;
    };
    return Result;
  })();
  cosmos.SimulationResponse = (function () {
    function SimulationResponse(p) {
      if (p)
        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
    }
    SimulationResponse.prototype.gasInfo = null;
    SimulationResponse.prototype.result = null;
    SimulationResponse.create = function create(properties) {
      return new SimulationResponse(properties);
    };
    SimulationResponse.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.gasInfo != null && Object.hasOwnProperty.call(m, "gasInfo"))
        $root.cosmos.GasInfo.encode(m.gasInfo, w.uint32(10).fork()).ldelim();
      if (m.result != null && Object.hasOwnProperty.call(m, "result"))
        $root.cosmos.Result.encode(m.result, w.uint32(18).fork()).ldelim();
      return w;
    };
    SimulationResponse.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
        m = new $root.cosmos.SimulationResponse();
      while (r.pos < c) {
        var t = r.uint32();
        switch (t >>> 3) {
          case 1:
            m.gasInfo = $root.cosmos.GasInfo.decode(r, r.uint32());
            break;
          case 2:
            m.result = $root.cosmos.Result.decode(r, r.uint32());
            break;
          default:
            r.skipType(t & 7);
            break;
        }
      }
      return m;
    };
    return SimulationResponse;
  })();
  cosmos.MsgData = (function () {
    function MsgData(p) {
      if (p)
        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
    }
    MsgData.prototype.msgType = "";
    MsgData.prototype.data = $util.newBuffer([]);
    MsgData.create = function create(properties) {
      return new MsgData(properties);
    };
    MsgData.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.msgType != null && Object.hasOwnProperty.call(m, "msgType")) w.uint32(10).string(m.msgType);
      if (m.data != null && Object.hasOwnProperty.call(m, "data")) w.uint32(18).bytes(m.data);
      return w;
    };
    MsgData.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
        m = new $root.cosmos.MsgData();
      while (r.pos < c) {
        var t = r.uint32();
        switch (t >>> 3) {
          case 1:
            m.msgType = r.string();
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
    return MsgData;
  })();
  cosmos.TxData = (function () {
    function TxData(p) {
      this.data = [];
      if (p)
        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
    }
    TxData.prototype.data = $util.emptyArray;
    TxData.create = function create(properties) {
      return new TxData(properties);
    };
    TxData.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.data != null && m.data.length) {
        for (var i = 0; i < m.data.length; ++i)
          $root.cosmos.MsgData.encode(m.data[i], w.uint32(10).fork()).ldelim();
      }
      return w;
    };
    TxData.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
        m = new $root.cosmos.TxData();
      while (r.pos < c) {
        var t = r.uint32();
        switch (t >>> 3) {
          case 1:
            if (!(m.data && m.data.length)) m.data = [];
            m.data.push($root.cosmos.MsgData.decode(r, r.uint32()));
            break;
          default:
            r.skipType(t & 7);
            break;
        }
      }
      return m;
    };
    return TxData;
  })();
  cosmos.TxResponse = (function () {
    function TxResponse(p) {
      this.logs = [];
      if (p)
        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
    }
    TxResponse.prototype.height = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    TxResponse.prototype.txhash = "";
    TxResponse.prototype.codespace = "";
    TxResponse.prototype.code = 0;
    TxResponse.prototype.data = "";
    TxResponse.prototype.rawLog = "";
    TxResponse.prototype.logs = $util.emptyArray;
    TxResponse.prototype.info = "";
    TxResponse.prototype.gasWanted = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    TxResponse.prototype.gasUsed = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
    TxResponse.prototype.tx = null;
    TxResponse.prototype.timestamp = "";
    TxResponse.create = function create(properties) {
      return new TxResponse(properties);
    };
    TxResponse.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.height != null && Object.hasOwnProperty.call(m, "height")) w.uint32(8).int64(m.height);
      if (m.txhash != null && Object.hasOwnProperty.call(m, "txhash")) w.uint32(18).string(m.txhash);
      if (m.codespace != null && Object.hasOwnProperty.call(m, "codespace")) w.uint32(26).string(m.codespace);
      if (m.code != null && Object.hasOwnProperty.call(m, "code")) w.uint32(32).uint32(m.code);
      if (m.data != null && Object.hasOwnProperty.call(m, "data")) w.uint32(42).string(m.data);
      if (m.rawLog != null && Object.hasOwnProperty.call(m, "rawLog")) w.uint32(50).string(m.rawLog);
      if (m.logs != null && m.logs.length) {
        for (var i = 0; i < m.logs.length; ++i)
          $root.cosmos.ABCIMessageLog.encode(m.logs[i], w.uint32(58).fork()).ldelim();
      }
      if (m.info != null && Object.hasOwnProperty.call(m, "info")) w.uint32(66).string(m.info);
      if (m.gasWanted != null && Object.hasOwnProperty.call(m, "gasWanted")) w.uint32(72).int64(m.gasWanted);
      if (m.gasUsed != null && Object.hasOwnProperty.call(m, "gasUsed")) w.uint32(80).int64(m.gasUsed);
      if (m.tx != null && Object.hasOwnProperty.call(m, "tx"))
        $root.google.protobuf.Any.encode(m.tx, w.uint32(90).fork()).ldelim();
      if (m.timestamp != null && Object.hasOwnProperty.call(m, "timestamp")) w.uint32(98).string(m.timestamp);
      return w;
    };
    TxResponse.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
        m = new $root.cosmos.TxResponse();
      while (r.pos < c) {
        var t = r.uint32();
        switch (t >>> 3) {
          case 1:
            m.height = r.int64();
            break;
          case 2:
            m.txhash = r.string();
            break;
          case 3:
            m.codespace = r.string();
            break;
          case 4:
            m.code = r.uint32();
            break;
          case 5:
            m.data = r.string();
            break;
          case 6:
            m.rawLog = r.string();
            break;
          case 7:
            if (!(m.logs && m.logs.length)) m.logs = [];
            m.logs.push($root.cosmos.ABCIMessageLog.decode(r, r.uint32()));
            break;
          case 8:
            m.info = r.string();
            break;
          case 9:
            m.gasWanted = r.int64();
            break;
          case 10:
            m.gasUsed = r.int64();
            break;
          case 11:
            m.tx = $root.google.protobuf.Any.decode(r, r.uint32());
            break;
          case 12:
            m.timestamp = r.string();
            break;
          default:
            r.skipType(t & 7);
            break;
        }
      }
      return m;
    };
    return TxResponse;
  })();
  cosmos.ABCIMessageLog = (function () {
    function ABCIMessageLog(p) {
      this.events = [];
      if (p)
        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
    }
    ABCIMessageLog.prototype.msgIndex = 0;
    ABCIMessageLog.prototype.log = "";
    ABCIMessageLog.prototype.events = $util.emptyArray;
    ABCIMessageLog.create = function create(properties) {
      return new ABCIMessageLog(properties);
    };
    ABCIMessageLog.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.msgIndex != null && Object.hasOwnProperty.call(m, "msgIndex")) w.uint32(8).uint32(m.msgIndex);
      if (m.log != null && Object.hasOwnProperty.call(m, "log")) w.uint32(18).string(m.log);
      if (m.events != null && m.events.length) {
        for (var i = 0; i < m.events.length; ++i)
          $root.cosmos.StringEvent.encode(m.events[i], w.uint32(26).fork()).ldelim();
      }
      return w;
    };
    ABCIMessageLog.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
        m = new $root.cosmos.ABCIMessageLog();
      while (r.pos < c) {
        var t = r.uint32();
        switch (t >>> 3) {
          case 1:
            m.msgIndex = r.uint32();
            break;
          case 2:
            m.log = r.string();
            break;
          case 3:
            if (!(m.events && m.events.length)) m.events = [];
            m.events.push($root.cosmos.StringEvent.decode(r, r.uint32()));
            break;
          default:
            r.skipType(t & 7);
            break;
        }
      }
      return m;
    };
    return ABCIMessageLog;
  })();
  cosmos.StringEvent = (function () {
    function StringEvent(p) {
      this.attributes = [];
      if (p)
        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
    }
    StringEvent.prototype.type = "";
    StringEvent.prototype.attributes = $util.emptyArray;
    StringEvent.create = function create(properties) {
      return new StringEvent(properties);
    };
    StringEvent.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.type != null && Object.hasOwnProperty.call(m, "type")) w.uint32(10).string(m.type);
      if (m.attributes != null && m.attributes.length) {
        for (var i = 0; i < m.attributes.length; ++i)
          $root.cosmos.Attribute.encode(m.attributes[i], w.uint32(18).fork()).ldelim();
      }
      return w;
    };
    StringEvent.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
        m = new $root.cosmos.StringEvent();
      while (r.pos < c) {
        var t = r.uint32();
        switch (t >>> 3) {
          case 1:
            m.type = r.string();
            break;
          case 2:
            if (!(m.attributes && m.attributes.length)) m.attributes = [];
            m.attributes.push($root.cosmos.Attribute.decode(r, r.uint32()));
            break;
          default:
            r.skipType(t & 7);
            break;
        }
      }
      return m;
    };
    return StringEvent;
  })();
  cosmos.Attribute = (function () {
    function Attribute(p) {
      if (p)
        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i) if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
    }
    Attribute.prototype.key = "";
    Attribute.prototype.value = "";
    Attribute.create = function create(properties) {
      return new Attribute(properties);
    };
    Attribute.encode = function encode(m, w) {
      if (!w) w = $Writer.create();
      if (m.key != null && Object.hasOwnProperty.call(m, "key")) w.uint32(10).string(m.key);
      if (m.value != null && Object.hasOwnProperty.call(m, "value")) w.uint32(18).string(m.value);
      return w;
    };
    Attribute.decode = function decode(r, l) {
      if (!(r instanceof $Reader)) r = $Reader.create(r);
      var c = l === undefined ? r.len : r.pos + l,
        m = new $root.cosmos.Attribute();
      while (r.pos < c) {
        var t = r.uint32();
        switch (t >>> 3) {
          case 1:
            m.key = r.string();
            break;
          case 2:
            m.value = r.string();
            break;
          default:
            r.skipType(t & 7);
            break;
        }
      }
      return m;
    };
    return Attribute;
  })();
  cosmos.auth = (function () {
    const auth = {};
    auth.BaseAccount = (function () {
      function BaseAccount(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      BaseAccount.prototype.address = $util.newBuffer([]);
      BaseAccount.prototype.pubKey = $util.newBuffer([]);
      BaseAccount.prototype.accountNumber = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      BaseAccount.prototype.sequence = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      BaseAccount.create = function create(properties) {
        return new BaseAccount(properties);
      };
      BaseAccount.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.address != null && Object.hasOwnProperty.call(m, "address")) w.uint32(10).bytes(m.address);
        if (m.pubKey != null && Object.hasOwnProperty.call(m, "pubKey")) w.uint32(18).bytes(m.pubKey);
        if (m.accountNumber != null && Object.hasOwnProperty.call(m, "accountNumber"))
          w.uint32(24).uint64(m.accountNumber);
        if (m.sequence != null && Object.hasOwnProperty.call(m, "sequence")) w.uint32(32).uint64(m.sequence);
        return w;
      };
      BaseAccount.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.cosmos.auth.BaseAccount();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.address = r.bytes();
              break;
            case 2:
              m.pubKey = r.bytes();
              break;
            case 3:
              m.accountNumber = r.uint64();
              break;
            case 4:
              m.sequence = r.uint64();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return BaseAccount;
    })();
    auth.ModuleAccount = (function () {
      function ModuleAccount(p) {
        this.permissions = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      ModuleAccount.prototype.baseAccount = null;
      ModuleAccount.prototype.name = "";
      ModuleAccount.prototype.permissions = $util.emptyArray;
      ModuleAccount.create = function create(properties) {
        return new ModuleAccount(properties);
      };
      ModuleAccount.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.baseAccount != null && Object.hasOwnProperty.call(m, "baseAccount"))
          $root.cosmos.auth.BaseAccount.encode(m.baseAccount, w.uint32(10).fork()).ldelim();
        if (m.name != null && Object.hasOwnProperty.call(m, "name")) w.uint32(18).string(m.name);
        if (m.permissions != null && m.permissions.length) {
          for (var i = 0; i < m.permissions.length; ++i) w.uint32(26).string(m.permissions[i]);
        }
        return w;
      };
      ModuleAccount.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.cosmos.auth.ModuleAccount();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.baseAccount = $root.cosmos.auth.BaseAccount.decode(r, r.uint32());
              break;
            case 2:
              m.name = r.string();
              break;
            case 3:
              if (!(m.permissions && m.permissions.length)) m.permissions = [];
              m.permissions.push(r.string());
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return ModuleAccount;
    })();
    auth.Params = (function () {
      function Params(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      Params.prototype.maxMemoCharacters = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      Params.prototype.txSigLimit = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      Params.prototype.txSizeCostPerByte = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      Params.prototype.sigVerifyCostEd25519 = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      Params.prototype.sigVerifyCostSecp256k1 = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      Params.create = function create(properties) {
        return new Params(properties);
      };
      Params.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.maxMemoCharacters != null && Object.hasOwnProperty.call(m, "maxMemoCharacters"))
          w.uint32(8).uint64(m.maxMemoCharacters);
        if (m.txSigLimit != null && Object.hasOwnProperty.call(m, "txSigLimit"))
          w.uint32(16).uint64(m.txSigLimit);
        if (m.txSizeCostPerByte != null && Object.hasOwnProperty.call(m, "txSizeCostPerByte"))
          w.uint32(24).uint64(m.txSizeCostPerByte);
        if (m.sigVerifyCostEd25519 != null && Object.hasOwnProperty.call(m, "sigVerifyCostEd25519"))
          w.uint32(32).uint64(m.sigVerifyCostEd25519);
        if (m.sigVerifyCostSecp256k1 != null && Object.hasOwnProperty.call(m, "sigVerifyCostSecp256k1"))
          w.uint32(40).uint64(m.sigVerifyCostSecp256k1);
        return w;
      };
      Params.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.cosmos.auth.Params();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.maxMemoCharacters = r.uint64();
              break;
            case 2:
              m.txSigLimit = r.uint64();
              break;
            case 3:
              m.txSizeCostPerByte = r.uint64();
              break;
            case 4:
              m.sigVerifyCostEd25519 = r.uint64();
              break;
            case 5:
              m.sigVerifyCostSecp256k1 = r.uint64();
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
    auth.Query = (function () {
      function Query(rpcImpl, requestDelimited, responseDelimited) {
        $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
      }
      (Query.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = Query;
      Query.create = function create(rpcImpl, requestDelimited, responseDelimited) {
        return new this(rpcImpl, requestDelimited, responseDelimited);
      };
      Object.defineProperty(
        (Query.prototype.account = function account(request, callback) {
          return this.rpcCall(
            account,
            $root.cosmos.auth.QueryAccountRequest,
            $root.cosmos.auth.QueryAccountResponse,
            request,
            callback,
          );
        }),
        "name",
        { value: "Account" },
      );
      Object.defineProperty(
        (Query.prototype.params = function params(request, callback) {
          return this.rpcCall(
            params,
            $root.cosmos.auth.QueryParamsRequest,
            $root.cosmos.auth.QueryParamsResponse,
            request,
            callback,
          );
        }),
        "name",
        { value: "Params" },
      );
      return Query;
    })();
    auth.QueryAccountRequest = (function () {
      function QueryAccountRequest(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      QueryAccountRequest.prototype.address = $util.newBuffer([]);
      QueryAccountRequest.create = function create(properties) {
        return new QueryAccountRequest(properties);
      };
      QueryAccountRequest.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.address != null && Object.hasOwnProperty.call(m, "address")) w.uint32(10).bytes(m.address);
        return w;
      };
      QueryAccountRequest.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.cosmos.auth.QueryAccountRequest();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.address = r.bytes();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return QueryAccountRequest;
    })();
    auth.QueryAccountResponse = (function () {
      function QueryAccountResponse(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      QueryAccountResponse.prototype.account = null;
      QueryAccountResponse.create = function create(properties) {
        return new QueryAccountResponse(properties);
      };
      QueryAccountResponse.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.account != null && Object.hasOwnProperty.call(m, "account"))
          $root.google.protobuf.Any.encode(m.account, w.uint32(10).fork()).ldelim();
        return w;
      };
      QueryAccountResponse.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.cosmos.auth.QueryAccountResponse();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.account = $root.google.protobuf.Any.decode(r, r.uint32());
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return QueryAccountResponse;
    })();
    auth.QueryParamsRequest = (function () {
      function QueryParamsRequest(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      QueryParamsRequest.create = function create(properties) {
        return new QueryParamsRequest(properties);
      };
      QueryParamsRequest.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        return w;
      };
      QueryParamsRequest.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.cosmos.auth.QueryParamsRequest();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return QueryParamsRequest;
    })();
    auth.QueryParamsResponse = (function () {
      function QueryParamsResponse(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      QueryParamsResponse.prototype.params = null;
      QueryParamsResponse.create = function create(properties) {
        return new QueryParamsResponse(properties);
      };
      QueryParamsResponse.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.params != null && Object.hasOwnProperty.call(m, "params"))
          $root.cosmos.auth.Params.encode(m.params, w.uint32(10).fork()).ldelim();
        return w;
      };
      QueryParamsResponse.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.cosmos.auth.QueryParamsResponse();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.params = $root.cosmos.auth.Params.decode(r, r.uint32());
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return QueryParamsResponse;
    })();
    return auth;
  })();
  cosmos.bank = (function () {
    const bank = {};
    bank.Params = (function () {
      function Params(p) {
        this.sendEnabled = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      Params.prototype.sendEnabled = $util.emptyArray;
      Params.prototype.defaultSendEnabled = false;
      Params.create = function create(properties) {
        return new Params(properties);
      };
      Params.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.sendEnabled != null && m.sendEnabled.length) {
          for (var i = 0; i < m.sendEnabled.length; ++i)
            $root.cosmos.bank.SendEnabled.encode(m.sendEnabled[i], w.uint32(10).fork()).ldelim();
        }
        if (m.defaultSendEnabled != null && Object.hasOwnProperty.call(m, "defaultSendEnabled"))
          w.uint32(16).bool(m.defaultSendEnabled);
        return w;
      };
      Params.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.cosmos.bank.Params();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              if (!(m.sendEnabled && m.sendEnabled.length)) m.sendEnabled = [];
              m.sendEnabled.push($root.cosmos.bank.SendEnabled.decode(r, r.uint32()));
              break;
            case 2:
              m.defaultSendEnabled = r.bool();
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
    bank.SendEnabled = (function () {
      function SendEnabled(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      SendEnabled.prototype.denom = "";
      SendEnabled.prototype.enabled = false;
      SendEnabled.create = function create(properties) {
        return new SendEnabled(properties);
      };
      SendEnabled.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.denom != null && Object.hasOwnProperty.call(m, "denom")) w.uint32(10).string(m.denom);
        if (m.enabled != null && Object.hasOwnProperty.call(m, "enabled")) w.uint32(16).bool(m.enabled);
        return w;
      };
      SendEnabled.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.cosmos.bank.SendEnabled();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.denom = r.string();
              break;
            case 2:
              m.enabled = r.bool();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return SendEnabled;
    })();
    bank.MsgSend = (function () {
      function MsgSend(p) {
        this.amount = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      MsgSend.prototype.fromAddress = $util.newBuffer([]);
      MsgSend.prototype.toAddress = $util.newBuffer([]);
      MsgSend.prototype.amount = $util.emptyArray;
      MsgSend.create = function create(properties) {
        return new MsgSend(properties);
      };
      MsgSend.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.fromAddress != null && Object.hasOwnProperty.call(m, "fromAddress"))
          w.uint32(10).bytes(m.fromAddress);
        if (m.toAddress != null && Object.hasOwnProperty.call(m, "toAddress"))
          w.uint32(18).bytes(m.toAddress);
        if (m.amount != null && m.amount.length) {
          for (var i = 0; i < m.amount.length; ++i)
            $root.cosmos.Coin.encode(m.amount[i], w.uint32(26).fork()).ldelim();
        }
        return w;
      };
      MsgSend.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.cosmos.bank.MsgSend();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.fromAddress = r.bytes();
              break;
            case 2:
              m.toAddress = r.bytes();
              break;
            case 3:
              if (!(m.amount && m.amount.length)) m.amount = [];
              m.amount.push($root.cosmos.Coin.decode(r, r.uint32()));
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return MsgSend;
    })();
    bank.Input = (function () {
      function Input(p) {
        this.coins = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      Input.prototype.address = $util.newBuffer([]);
      Input.prototype.coins = $util.emptyArray;
      Input.create = function create(properties) {
        return new Input(properties);
      };
      Input.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.address != null && Object.hasOwnProperty.call(m, "address")) w.uint32(10).bytes(m.address);
        if (m.coins != null && m.coins.length) {
          for (var i = 0; i < m.coins.length; ++i)
            $root.cosmos.Coin.encode(m.coins[i], w.uint32(18).fork()).ldelim();
        }
        return w;
      };
      Input.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.cosmos.bank.Input();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.address = r.bytes();
              break;
            case 2:
              if (!(m.coins && m.coins.length)) m.coins = [];
              m.coins.push($root.cosmos.Coin.decode(r, r.uint32()));
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return Input;
    })();
    bank.Output = (function () {
      function Output(p) {
        this.coins = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      Output.prototype.address = $util.newBuffer([]);
      Output.prototype.coins = $util.emptyArray;
      Output.create = function create(properties) {
        return new Output(properties);
      };
      Output.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.address != null && Object.hasOwnProperty.call(m, "address")) w.uint32(10).bytes(m.address);
        if (m.coins != null && m.coins.length) {
          for (var i = 0; i < m.coins.length; ++i)
            $root.cosmos.Coin.encode(m.coins[i], w.uint32(18).fork()).ldelim();
        }
        return w;
      };
      Output.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.cosmos.bank.Output();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.address = r.bytes();
              break;
            case 2:
              if (!(m.coins && m.coins.length)) m.coins = [];
              m.coins.push($root.cosmos.Coin.decode(r, r.uint32()));
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return Output;
    })();
    bank.MsgMultiSend = (function () {
      function MsgMultiSend(p) {
        this.inputs = [];
        this.outputs = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      MsgMultiSend.prototype.inputs = $util.emptyArray;
      MsgMultiSend.prototype.outputs = $util.emptyArray;
      MsgMultiSend.create = function create(properties) {
        return new MsgMultiSend(properties);
      };
      MsgMultiSend.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.inputs != null && m.inputs.length) {
          for (var i = 0; i < m.inputs.length; ++i)
            $root.cosmos.bank.Input.encode(m.inputs[i], w.uint32(10).fork()).ldelim();
        }
        if (m.outputs != null && m.outputs.length) {
          for (var i = 0; i < m.outputs.length; ++i)
            $root.cosmos.bank.Output.encode(m.outputs[i], w.uint32(18).fork()).ldelim();
        }
        return w;
      };
      MsgMultiSend.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.cosmos.bank.MsgMultiSend();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              if (!(m.inputs && m.inputs.length)) m.inputs = [];
              m.inputs.push($root.cosmos.bank.Input.decode(r, r.uint32()));
              break;
            case 2:
              if (!(m.outputs && m.outputs.length)) m.outputs = [];
              m.outputs.push($root.cosmos.bank.Output.decode(r, r.uint32()));
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return MsgMultiSend;
    })();
    bank.Supply = (function () {
      function Supply(p) {
        this.total = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      Supply.prototype.total = $util.emptyArray;
      Supply.create = function create(properties) {
        return new Supply(properties);
      };
      Supply.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.total != null && m.total.length) {
          for (var i = 0; i < m.total.length; ++i)
            $root.cosmos.Coin.encode(m.total[i], w.uint32(10).fork()).ldelim();
        }
        return w;
      };
      Supply.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.cosmos.bank.Supply();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              if (!(m.total && m.total.length)) m.total = [];
              m.total.push($root.cosmos.Coin.decode(r, r.uint32()));
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return Supply;
    })();
    bank.DenomUnits = (function () {
      function DenomUnits(p) {
        this.aliases = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      DenomUnits.prototype.denom = "";
      DenomUnits.prototype.exponent = 0;
      DenomUnits.prototype.aliases = $util.emptyArray;
      DenomUnits.create = function create(properties) {
        return new DenomUnits(properties);
      };
      DenomUnits.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.denom != null && Object.hasOwnProperty.call(m, "denom")) w.uint32(10).string(m.denom);
        if (m.exponent != null && Object.hasOwnProperty.call(m, "exponent")) w.uint32(16).uint32(m.exponent);
        if (m.aliases != null && m.aliases.length) {
          for (var i = 0; i < m.aliases.length; ++i) w.uint32(26).string(m.aliases[i]);
        }
        return w;
      };
      DenomUnits.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.cosmos.bank.DenomUnits();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.denom = r.string();
              break;
            case 2:
              m.exponent = r.uint32();
              break;
            case 3:
              if (!(m.aliases && m.aliases.length)) m.aliases = [];
              m.aliases.push(r.string());
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return DenomUnits;
    })();
    bank.Metadata = (function () {
      function Metadata(p) {
        this.denomUnits = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      Metadata.prototype.description = "";
      Metadata.prototype.denomUnits = $util.emptyArray;
      Metadata.prototype.base = "";
      Metadata.prototype.display = "";
      Metadata.create = function create(properties) {
        return new Metadata(properties);
      };
      Metadata.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.description != null && Object.hasOwnProperty.call(m, "description"))
          w.uint32(10).string(m.description);
        if (m.denomUnits != null && m.denomUnits.length) {
          for (var i = 0; i < m.denomUnits.length; ++i)
            $root.cosmos.bank.DenomUnits.encode(m.denomUnits[i], w.uint32(18).fork()).ldelim();
        }
        if (m.base != null && Object.hasOwnProperty.call(m, "base")) w.uint32(26).string(m.base);
        if (m.display != null && Object.hasOwnProperty.call(m, "display")) w.uint32(34).string(m.display);
        return w;
      };
      Metadata.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.cosmos.bank.Metadata();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.description = r.string();
              break;
            case 2:
              if (!(m.denomUnits && m.denomUnits.length)) m.denomUnits = [];
              m.denomUnits.push($root.cosmos.bank.DenomUnits.decode(r, r.uint32()));
              break;
            case 3:
              m.base = r.string();
              break;
            case 4:
              m.display = r.string();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return Metadata;
    })();
    bank.Query = (function () {
      function Query(rpcImpl, requestDelimited, responseDelimited) {
        $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
      }
      (Query.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = Query;
      Query.create = function create(rpcImpl, requestDelimited, responseDelimited) {
        return new this(rpcImpl, requestDelimited, responseDelimited);
      };
      Object.defineProperty(
        (Query.prototype.balance = function balance(request, callback) {
          return this.rpcCall(
            balance,
            $root.cosmos.bank.QueryBalanceRequest,
            $root.cosmos.bank.QueryBalanceResponse,
            request,
            callback,
          );
        }),
        "name",
        { value: "Balance" },
      );
      Object.defineProperty(
        (Query.prototype.allBalances = function allBalances(request, callback) {
          return this.rpcCall(
            allBalances,
            $root.cosmos.bank.QueryAllBalancesRequest,
            $root.cosmos.bank.QueryAllBalancesResponse,
            request,
            callback,
          );
        }),
        "name",
        { value: "AllBalances" },
      );
      Object.defineProperty(
        (Query.prototype.totalSupply = function totalSupply(request, callback) {
          return this.rpcCall(
            totalSupply,
            $root.cosmos.bank.QueryTotalSupplyRequest,
            $root.cosmos.bank.QueryTotalSupplyResponse,
            request,
            callback,
          );
        }),
        "name",
        { value: "TotalSupply" },
      );
      Object.defineProperty(
        (Query.prototype.supplyOf = function supplyOf(request, callback) {
          return this.rpcCall(
            supplyOf,
            $root.cosmos.bank.QuerySupplyOfRequest,
            $root.cosmos.bank.QuerySupplyOfResponse,
            request,
            callback,
          );
        }),
        "name",
        { value: "SupplyOf" },
      );
      return Query;
    })();
    bank.QueryBalanceRequest = (function () {
      function QueryBalanceRequest(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      QueryBalanceRequest.prototype.address = $util.newBuffer([]);
      QueryBalanceRequest.prototype.denom = "";
      QueryBalanceRequest.create = function create(properties) {
        return new QueryBalanceRequest(properties);
      };
      QueryBalanceRequest.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.address != null && Object.hasOwnProperty.call(m, "address")) w.uint32(10).bytes(m.address);
        if (m.denom != null && Object.hasOwnProperty.call(m, "denom")) w.uint32(18).string(m.denom);
        return w;
      };
      QueryBalanceRequest.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.cosmos.bank.QueryBalanceRequest();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.address = r.bytes();
              break;
            case 2:
              m.denom = r.string();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return QueryBalanceRequest;
    })();
    bank.QueryBalanceResponse = (function () {
      function QueryBalanceResponse(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      QueryBalanceResponse.prototype.balance = null;
      QueryBalanceResponse.create = function create(properties) {
        return new QueryBalanceResponse(properties);
      };
      QueryBalanceResponse.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.balance != null && Object.hasOwnProperty.call(m, "balance"))
          $root.cosmos.Coin.encode(m.balance, w.uint32(10).fork()).ldelim();
        return w;
      };
      QueryBalanceResponse.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.cosmos.bank.QueryBalanceResponse();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.balance = $root.cosmos.Coin.decode(r, r.uint32());
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return QueryBalanceResponse;
    })();
    bank.QueryAllBalancesRequest = (function () {
      function QueryAllBalancesRequest(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      QueryAllBalancesRequest.prototype.address = $util.newBuffer([]);
      QueryAllBalancesRequest.prototype.pagination = null;
      QueryAllBalancesRequest.create = function create(properties) {
        return new QueryAllBalancesRequest(properties);
      };
      QueryAllBalancesRequest.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.address != null && Object.hasOwnProperty.call(m, "address")) w.uint32(10).bytes(m.address);
        if (m.pagination != null && Object.hasOwnProperty.call(m, "pagination"))
          $root.cosmos.query.PageRequest.encode(m.pagination, w.uint32(18).fork()).ldelim();
        return w;
      };
      QueryAllBalancesRequest.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.cosmos.bank.QueryAllBalancesRequest();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.address = r.bytes();
              break;
            case 2:
              m.pagination = $root.cosmos.query.PageRequest.decode(r, r.uint32());
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return QueryAllBalancesRequest;
    })();
    bank.QueryAllBalancesResponse = (function () {
      function QueryAllBalancesResponse(p) {
        this.balances = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      QueryAllBalancesResponse.prototype.balances = $util.emptyArray;
      QueryAllBalancesResponse.prototype.pagination = null;
      QueryAllBalancesResponse.create = function create(properties) {
        return new QueryAllBalancesResponse(properties);
      };
      QueryAllBalancesResponse.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.balances != null && m.balances.length) {
          for (var i = 0; i < m.balances.length; ++i)
            $root.cosmos.Coin.encode(m.balances[i], w.uint32(10).fork()).ldelim();
        }
        if (m.pagination != null && Object.hasOwnProperty.call(m, "pagination"))
          $root.cosmos.query.PageResponse.encode(m.pagination, w.uint32(18).fork()).ldelim();
        return w;
      };
      QueryAllBalancesResponse.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.cosmos.bank.QueryAllBalancesResponse();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              if (!(m.balances && m.balances.length)) m.balances = [];
              m.balances.push($root.cosmos.Coin.decode(r, r.uint32()));
              break;
            case 2:
              m.pagination = $root.cosmos.query.PageResponse.decode(r, r.uint32());
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return QueryAllBalancesResponse;
    })();
    bank.QueryTotalSupplyRequest = (function () {
      function QueryTotalSupplyRequest(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      QueryTotalSupplyRequest.create = function create(properties) {
        return new QueryTotalSupplyRequest(properties);
      };
      QueryTotalSupplyRequest.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        return w;
      };
      QueryTotalSupplyRequest.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.cosmos.bank.QueryTotalSupplyRequest();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return QueryTotalSupplyRequest;
    })();
    bank.QueryTotalSupplyResponse = (function () {
      function QueryTotalSupplyResponse(p) {
        this.supply = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      QueryTotalSupplyResponse.prototype.supply = $util.emptyArray;
      QueryTotalSupplyResponse.create = function create(properties) {
        return new QueryTotalSupplyResponse(properties);
      };
      QueryTotalSupplyResponse.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.supply != null && m.supply.length) {
          for (var i = 0; i < m.supply.length; ++i)
            $root.cosmos.Coin.encode(m.supply[i], w.uint32(10).fork()).ldelim();
        }
        return w;
      };
      QueryTotalSupplyResponse.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.cosmos.bank.QueryTotalSupplyResponse();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              if (!(m.supply && m.supply.length)) m.supply = [];
              m.supply.push($root.cosmos.Coin.decode(r, r.uint32()));
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return QueryTotalSupplyResponse;
    })();
    bank.QuerySupplyOfRequest = (function () {
      function QuerySupplyOfRequest(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      QuerySupplyOfRequest.prototype.denom = "";
      QuerySupplyOfRequest.create = function create(properties) {
        return new QuerySupplyOfRequest(properties);
      };
      QuerySupplyOfRequest.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.denom != null && Object.hasOwnProperty.call(m, "denom")) w.uint32(10).string(m.denom);
        return w;
      };
      QuerySupplyOfRequest.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.cosmos.bank.QuerySupplyOfRequest();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.denom = r.string();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return QuerySupplyOfRequest;
    })();
    bank.QuerySupplyOfResponse = (function () {
      function QuerySupplyOfResponse(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      QuerySupplyOfResponse.prototype.amount = null;
      QuerySupplyOfResponse.create = function create(properties) {
        return new QuerySupplyOfResponse(properties);
      };
      QuerySupplyOfResponse.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.amount != null && Object.hasOwnProperty.call(m, "amount"))
          $root.cosmos.Coin.encode(m.amount, w.uint32(10).fork()).ldelim();
        return w;
      };
      QuerySupplyOfResponse.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.cosmos.bank.QuerySupplyOfResponse();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.amount = $root.cosmos.Coin.decode(r, r.uint32());
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return QuerySupplyOfResponse;
    })();
    return bank;
  })();
  cosmos.crypto = (function () {
    const crypto = {};
    crypto.PublicKey = (function () {
      function PublicKey(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      PublicKey.prototype.secp256k1 = $util.newBuffer([]);
      PublicKey.prototype.ed25519 = $util.newBuffer([]);
      PublicKey.prototype.sr25519 = $util.newBuffer([]);
      PublicKey.prototype.multisig = null;
      PublicKey.prototype.secp256r1 = $util.newBuffer([]);
      PublicKey.prototype.anyPubkey = null;
      let $oneOfFields;
      Object.defineProperty(PublicKey.prototype, "sum", {
        get: $util.oneOfGetter(
          ($oneOfFields = ["secp256k1", "ed25519", "sr25519", "multisig", "secp256r1", "anyPubkey"]),
        ),
        set: $util.oneOfSetter($oneOfFields),
      });
      PublicKey.create = function create(properties) {
        return new PublicKey(properties);
      };
      PublicKey.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.secp256k1 != null && Object.hasOwnProperty.call(m, "secp256k1"))
          w.uint32(10).bytes(m.secp256k1);
        if (m.ed25519 != null && Object.hasOwnProperty.call(m, "ed25519")) w.uint32(18).bytes(m.ed25519);
        if (m.sr25519 != null && Object.hasOwnProperty.call(m, "sr25519")) w.uint32(26).bytes(m.sr25519);
        if (m.multisig != null && Object.hasOwnProperty.call(m, "multisig"))
          $root.cosmos.crypto.PubKeyMultisigThreshold.encode(m.multisig, w.uint32(34).fork()).ldelim();
        if (m.secp256r1 != null && Object.hasOwnProperty.call(m, "secp256r1"))
          w.uint32(42).bytes(m.secp256r1);
        if (m.anyPubkey != null && Object.hasOwnProperty.call(m, "anyPubkey"))
          $root.google.protobuf.Any.encode(m.anyPubkey, w.uint32(122).fork()).ldelim();
        return w;
      };
      PublicKey.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.cosmos.crypto.PublicKey();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.secp256k1 = r.bytes();
              break;
            case 2:
              m.ed25519 = r.bytes();
              break;
            case 3:
              m.sr25519 = r.bytes();
              break;
            case 4:
              m.multisig = $root.cosmos.crypto.PubKeyMultisigThreshold.decode(r, r.uint32());
              break;
            case 5:
              m.secp256r1 = r.bytes();
              break;
            case 15:
              m.anyPubkey = $root.google.protobuf.Any.decode(r, r.uint32());
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return PublicKey;
    })();
    crypto.PubKeyMultisigThreshold = (function () {
      function PubKeyMultisigThreshold(p) {
        this.publicKeys = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      PubKeyMultisigThreshold.prototype.threshold = 0;
      PubKeyMultisigThreshold.prototype.publicKeys = $util.emptyArray;
      PubKeyMultisigThreshold.create = function create(properties) {
        return new PubKeyMultisigThreshold(properties);
      };
      PubKeyMultisigThreshold.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.threshold != null && Object.hasOwnProperty.call(m, "threshold"))
          w.uint32(8).uint32(m.threshold);
        if (m.publicKeys != null && m.publicKeys.length) {
          for (var i = 0; i < m.publicKeys.length; ++i)
            $root.cosmos.crypto.PublicKey.encode(m.publicKeys[i], w.uint32(18).fork()).ldelim();
        }
        return w;
      };
      PubKeyMultisigThreshold.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.cosmos.crypto.PubKeyMultisigThreshold();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.threshold = r.uint32();
              break;
            case 2:
              if (!(m.publicKeys && m.publicKeys.length)) m.publicKeys = [];
              m.publicKeys.push($root.cosmos.crypto.PublicKey.decode(r, r.uint32()));
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return PubKeyMultisigThreshold;
    })();
    crypto.MultiSignature = (function () {
      function MultiSignature(p) {
        this.signatures = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      MultiSignature.prototype.signatures = $util.emptyArray;
      MultiSignature.create = function create(properties) {
        return new MultiSignature(properties);
      };
      MultiSignature.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.signatures != null && m.signatures.length) {
          for (var i = 0; i < m.signatures.length; ++i) w.uint32(10).bytes(m.signatures[i]);
        }
        return w;
      };
      MultiSignature.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.cosmos.crypto.MultiSignature();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              if (!(m.signatures && m.signatures.length)) m.signatures = [];
              m.signatures.push(r.bytes());
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return MultiSignature;
    })();
    crypto.CompactBitArray = (function () {
      function CompactBitArray(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      CompactBitArray.prototype.extraBitsStored = 0;
      CompactBitArray.prototype.elems = $util.newBuffer([]);
      CompactBitArray.create = function create(properties) {
        return new CompactBitArray(properties);
      };
      CompactBitArray.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.extraBitsStored != null && Object.hasOwnProperty.call(m, "extraBitsStored"))
          w.uint32(8).uint32(m.extraBitsStored);
        if (m.elems != null && Object.hasOwnProperty.call(m, "elems")) w.uint32(18).bytes(m.elems);
        return w;
      };
      CompactBitArray.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.cosmos.crypto.CompactBitArray();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.extraBitsStored = r.uint32();
              break;
            case 2:
              m.elems = r.bytes();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return CompactBitArray;
    })();
    return crypto;
  })();
  cosmos.query = (function () {
    const query = {};
    query.PageRequest = (function () {
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
          m = new $root.cosmos.query.PageRequest();
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
    query.PageResponse = (function () {
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
          m = new $root.cosmos.query.PageResponse();
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
    return query;
  })();
  cosmos.tx = (function () {
    const tx = {};
    tx.Tx = (function () {
      function Tx(p) {
        this.signatures = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      Tx.prototype.body = null;
      Tx.prototype.authInfo = null;
      Tx.prototype.signatures = $util.emptyArray;
      Tx.create = function create(properties) {
        return new Tx(properties);
      };
      Tx.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.body != null && Object.hasOwnProperty.call(m, "body"))
          $root.cosmos.tx.TxBody.encode(m.body, w.uint32(10).fork()).ldelim();
        if (m.authInfo != null && Object.hasOwnProperty.call(m, "authInfo"))
          $root.cosmos.tx.AuthInfo.encode(m.authInfo, w.uint32(18).fork()).ldelim();
        if (m.signatures != null && m.signatures.length) {
          for (var i = 0; i < m.signatures.length; ++i) w.uint32(26).bytes(m.signatures[i]);
        }
        return w;
      };
      Tx.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.cosmos.tx.Tx();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.body = $root.cosmos.tx.TxBody.decode(r, r.uint32());
              break;
            case 2:
              m.authInfo = $root.cosmos.tx.AuthInfo.decode(r, r.uint32());
              break;
            case 3:
              if (!(m.signatures && m.signatures.length)) m.signatures = [];
              m.signatures.push(r.bytes());
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return Tx;
    })();
    tx.TxRaw = (function () {
      function TxRaw(p) {
        this.signatures = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      TxRaw.prototype.bodyBytes = $util.newBuffer([]);
      TxRaw.prototype.authInfoBytes = $util.newBuffer([]);
      TxRaw.prototype.signatures = $util.emptyArray;
      TxRaw.create = function create(properties) {
        return new TxRaw(properties);
      };
      TxRaw.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.bodyBytes != null && Object.hasOwnProperty.call(m, "bodyBytes"))
          w.uint32(10).bytes(m.bodyBytes);
        if (m.authInfoBytes != null && Object.hasOwnProperty.call(m, "authInfoBytes"))
          w.uint32(18).bytes(m.authInfoBytes);
        if (m.signatures != null && m.signatures.length) {
          for (var i = 0; i < m.signatures.length; ++i) w.uint32(26).bytes(m.signatures[i]);
        }
        return w;
      };
      TxRaw.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.cosmos.tx.TxRaw();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.bodyBytes = r.bytes();
              break;
            case 2:
              m.authInfoBytes = r.bytes();
              break;
            case 3:
              if (!(m.signatures && m.signatures.length)) m.signatures = [];
              m.signatures.push(r.bytes());
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return TxRaw;
    })();
    tx.SignDoc = (function () {
      function SignDoc(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      SignDoc.prototype.bodyBytes = $util.newBuffer([]);
      SignDoc.prototype.authInfoBytes = $util.newBuffer([]);
      SignDoc.prototype.chainId = "";
      SignDoc.prototype.accountNumber = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      SignDoc.prototype.accountSequence = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      SignDoc.create = function create(properties) {
        return new SignDoc(properties);
      };
      SignDoc.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.bodyBytes != null && Object.hasOwnProperty.call(m, "bodyBytes"))
          w.uint32(10).bytes(m.bodyBytes);
        if (m.authInfoBytes != null && Object.hasOwnProperty.call(m, "authInfoBytes"))
          w.uint32(18).bytes(m.authInfoBytes);
        if (m.chainId != null && Object.hasOwnProperty.call(m, "chainId")) w.uint32(26).string(m.chainId);
        if (m.accountNumber != null && Object.hasOwnProperty.call(m, "accountNumber"))
          w.uint32(32).uint64(m.accountNumber);
        if (m.accountSequence != null && Object.hasOwnProperty.call(m, "accountSequence"))
          w.uint32(40).uint64(m.accountSequence);
        return w;
      };
      SignDoc.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.cosmos.tx.SignDoc();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.bodyBytes = r.bytes();
              break;
            case 2:
              m.authInfoBytes = r.bytes();
              break;
            case 3:
              m.chainId = r.string();
              break;
            case 4:
              m.accountNumber = r.uint64();
              break;
            case 5:
              m.accountSequence = r.uint64();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return SignDoc;
    })();
    tx.TxBody = (function () {
      function TxBody(p) {
        this.messages = [];
        this.extensionOptions = [];
        this.nonCriticalExtensionOptions = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      TxBody.prototype.messages = $util.emptyArray;
      TxBody.prototype.memo = "";
      TxBody.prototype.timeoutHeight = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      TxBody.prototype.extensionOptions = $util.emptyArray;
      TxBody.prototype.nonCriticalExtensionOptions = $util.emptyArray;
      TxBody.create = function create(properties) {
        return new TxBody(properties);
      };
      TxBody.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.messages != null && m.messages.length) {
          for (var i = 0; i < m.messages.length; ++i)
            $root.google.protobuf.Any.encode(m.messages[i], w.uint32(10).fork()).ldelim();
        }
        if (m.memo != null && Object.hasOwnProperty.call(m, "memo")) w.uint32(18).string(m.memo);
        if (m.timeoutHeight != null && Object.hasOwnProperty.call(m, "timeoutHeight"))
          w.uint32(24).uint64(m.timeoutHeight);
        if (m.extensionOptions != null && m.extensionOptions.length) {
          for (var i = 0; i < m.extensionOptions.length; ++i)
            $root.google.protobuf.Any.encode(m.extensionOptions[i], w.uint32(8186).fork()).ldelim();
        }
        if (m.nonCriticalExtensionOptions != null && m.nonCriticalExtensionOptions.length) {
          for (var i = 0; i < m.nonCriticalExtensionOptions.length; ++i)
            $root.google.protobuf.Any.encode(
              m.nonCriticalExtensionOptions[i],
              w.uint32(16378).fork(),
            ).ldelim();
        }
        return w;
      };
      TxBody.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.cosmos.tx.TxBody();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              if (!(m.messages && m.messages.length)) m.messages = [];
              m.messages.push($root.google.protobuf.Any.decode(r, r.uint32()));
              break;
            case 2:
              m.memo = r.string();
              break;
            case 3:
              m.timeoutHeight = r.uint64();
              break;
            case 1023:
              if (!(m.extensionOptions && m.extensionOptions.length)) m.extensionOptions = [];
              m.extensionOptions.push($root.google.protobuf.Any.decode(r, r.uint32()));
              break;
            case 2047:
              if (!(m.nonCriticalExtensionOptions && m.nonCriticalExtensionOptions.length))
                m.nonCriticalExtensionOptions = [];
              m.nonCriticalExtensionOptions.push($root.google.protobuf.Any.decode(r, r.uint32()));
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return TxBody;
    })();
    tx.AuthInfo = (function () {
      function AuthInfo(p) {
        this.signerInfos = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      AuthInfo.prototype.signerInfos = $util.emptyArray;
      AuthInfo.prototype.fee = null;
      AuthInfo.create = function create(properties) {
        return new AuthInfo(properties);
      };
      AuthInfo.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.signerInfos != null && m.signerInfos.length) {
          for (var i = 0; i < m.signerInfos.length; ++i)
            $root.cosmos.tx.SignerInfo.encode(m.signerInfos[i], w.uint32(10).fork()).ldelim();
        }
        if (m.fee != null && Object.hasOwnProperty.call(m, "fee"))
          $root.cosmos.tx.Fee.encode(m.fee, w.uint32(18).fork()).ldelim();
        return w;
      };
      AuthInfo.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.cosmos.tx.AuthInfo();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              if (!(m.signerInfos && m.signerInfos.length)) m.signerInfos = [];
              m.signerInfos.push($root.cosmos.tx.SignerInfo.decode(r, r.uint32()));
              break;
            case 2:
              m.fee = $root.cosmos.tx.Fee.decode(r, r.uint32());
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return AuthInfo;
    })();
    tx.SignerInfo = (function () {
      function SignerInfo(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      SignerInfo.prototype.publicKey = null;
      SignerInfo.prototype.modeInfo = null;
      SignerInfo.create = function create(properties) {
        return new SignerInfo(properties);
      };
      SignerInfo.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.publicKey != null && Object.hasOwnProperty.call(m, "publicKey"))
          $root.cosmos.crypto.PublicKey.encode(m.publicKey, w.uint32(10).fork()).ldelim();
        if (m.modeInfo != null && Object.hasOwnProperty.call(m, "modeInfo"))
          $root.cosmos.tx.ModeInfo.encode(m.modeInfo, w.uint32(18).fork()).ldelim();
        return w;
      };
      SignerInfo.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.cosmos.tx.SignerInfo();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.publicKey = $root.cosmos.crypto.PublicKey.decode(r, r.uint32());
              break;
            case 2:
              m.modeInfo = $root.cosmos.tx.ModeInfo.decode(r, r.uint32());
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return SignerInfo;
    })();
    tx.ModeInfo = (function () {
      function ModeInfo(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      ModeInfo.prototype.single = null;
      ModeInfo.prototype.multi = null;
      let $oneOfFields;
      Object.defineProperty(ModeInfo.prototype, "sum", {
        get: $util.oneOfGetter(($oneOfFields = ["single", "multi"])),
        set: $util.oneOfSetter($oneOfFields),
      });
      ModeInfo.create = function create(properties) {
        return new ModeInfo(properties);
      };
      ModeInfo.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.single != null && Object.hasOwnProperty.call(m, "single"))
          $root.cosmos.tx.ModeInfo.Single.encode(m.single, w.uint32(10).fork()).ldelim();
        if (m.multi != null && Object.hasOwnProperty.call(m, "multi"))
          $root.cosmos.tx.ModeInfo.Multi.encode(m.multi, w.uint32(18).fork()).ldelim();
        return w;
      };
      ModeInfo.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.cosmos.tx.ModeInfo();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.single = $root.cosmos.tx.ModeInfo.Single.decode(r, r.uint32());
              break;
            case 2:
              m.multi = $root.cosmos.tx.ModeInfo.Multi.decode(r, r.uint32());
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      ModeInfo.Single = (function () {
        function Single(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        Single.prototype.mode = 0;
        Single.create = function create(properties) {
          return new Single(properties);
        };
        Single.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.mode != null && Object.hasOwnProperty.call(m, "mode")) w.uint32(8).int32(m.mode);
          return w;
        };
        Single.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmos.tx.ModeInfo.Single();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.mode = r.int32();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return Single;
      })();
      ModeInfo.Multi = (function () {
        function Multi(p) {
          this.modeInfos = [];
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        Multi.prototype.bitarray = null;
        Multi.prototype.modeInfos = $util.emptyArray;
        Multi.create = function create(properties) {
          return new Multi(properties);
        };
        Multi.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.bitarray != null && Object.hasOwnProperty.call(m, "bitarray"))
            $root.cosmos.crypto.CompactBitArray.encode(m.bitarray, w.uint32(10).fork()).ldelim();
          if (m.modeInfos != null && m.modeInfos.length) {
            for (var i = 0; i < m.modeInfos.length; ++i)
              $root.cosmos.tx.ModeInfo.encode(m.modeInfos[i], w.uint32(18).fork()).ldelim();
          }
          return w;
        };
        Multi.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmos.tx.ModeInfo.Multi();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.bitarray = $root.cosmos.crypto.CompactBitArray.decode(r, r.uint32());
                break;
              case 2:
                if (!(m.modeInfos && m.modeInfos.length)) m.modeInfos = [];
                m.modeInfos.push($root.cosmos.tx.ModeInfo.decode(r, r.uint32()));
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return Multi;
      })();
      return ModeInfo;
    })();
    tx.Fee = (function () {
      function Fee(p) {
        this.amount = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      Fee.prototype.amount = $util.emptyArray;
      Fee.prototype.gasLimit = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      Fee.create = function create(properties) {
        return new Fee(properties);
      };
      Fee.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.amount != null && m.amount.length) {
          for (var i = 0; i < m.amount.length; ++i)
            $root.cosmos.Coin.encode(m.amount[i], w.uint32(10).fork()).ldelim();
        }
        if (m.gasLimit != null && Object.hasOwnProperty.call(m, "gasLimit")) w.uint32(16).uint64(m.gasLimit);
        return w;
      };
      Fee.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.cosmos.tx.Fee();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              if (!(m.amount && m.amount.length)) m.amount = [];
              m.amount.push($root.cosmos.Coin.decode(r, r.uint32()));
              break;
            case 2:
              m.gasLimit = r.uint64();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return Fee;
    })();
    tx.signing = (function () {
      const signing = {};
      signing.SignMode = (function () {
        const valuesById = {},
          values = Object.create(valuesById);
        values[(valuesById[0] = "SIGN_MODE_UNSPECIFIED")] = 0;
        values[(valuesById[1] = "SIGN_MODE_DIRECT")] = 1;
        values[(valuesById[2] = "SIGN_MODE_TEXTUAL")] = 2;
        values[(valuesById[127] = "SIGN_MODE_LEGACY_AMINO_JSON")] = 127;
        return values;
      })();
      signing.SignatureDescriptors = (function () {
        function SignatureDescriptors(p) {
          this.signatures = [];
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        SignatureDescriptors.prototype.signatures = $util.emptyArray;
        SignatureDescriptors.create = function create(properties) {
          return new SignatureDescriptors(properties);
        };
        SignatureDescriptors.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.signatures != null && m.signatures.length) {
            for (var i = 0; i < m.signatures.length; ++i)
              $root.cosmos.tx.signing.SignatureDescriptor.encode(
                m.signatures[i],
                w.uint32(10).fork(),
              ).ldelim();
          }
          return w;
        };
        SignatureDescriptors.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmos.tx.signing.SignatureDescriptors();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                if (!(m.signatures && m.signatures.length)) m.signatures = [];
                m.signatures.push($root.cosmos.tx.signing.SignatureDescriptor.decode(r, r.uint32()));
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return SignatureDescriptors;
      })();
      signing.SignatureDescriptor = (function () {
        function SignatureDescriptor(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        SignatureDescriptor.prototype.publicKey = null;
        SignatureDescriptor.prototype.data = null;
        SignatureDescriptor.create = function create(properties) {
          return new SignatureDescriptor(properties);
        };
        SignatureDescriptor.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.publicKey != null && Object.hasOwnProperty.call(m, "publicKey"))
            $root.cosmos.crypto.PublicKey.encode(m.publicKey, w.uint32(10).fork()).ldelim();
          if (m.data != null && Object.hasOwnProperty.call(m, "data"))
            $root.cosmos.tx.signing.SignatureDescriptor.Data.encode(m.data, w.uint32(18).fork()).ldelim();
          return w;
        };
        SignatureDescriptor.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmos.tx.signing.SignatureDescriptor();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.publicKey = $root.cosmos.crypto.PublicKey.decode(r, r.uint32());
                break;
              case 2:
                m.data = $root.cosmos.tx.signing.SignatureDescriptor.Data.decode(r, r.uint32());
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        SignatureDescriptor.Data = (function () {
          function Data(p) {
            if (p)
              for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
          }
          Data.prototype.single = null;
          Data.prototype.multi = null;
          let $oneOfFields;
          Object.defineProperty(Data.prototype, "sum", {
            get: $util.oneOfGetter(($oneOfFields = ["single", "multi"])),
            set: $util.oneOfSetter($oneOfFields),
          });
          Data.create = function create(properties) {
            return new Data(properties);
          };
          Data.encode = function encode(m, w) {
            if (!w) w = $Writer.create();
            if (m.single != null && Object.hasOwnProperty.call(m, "single"))
              $root.cosmos.tx.signing.SignatureDescriptor.Data.Single.encode(
                m.single,
                w.uint32(10).fork(),
              ).ldelim();
            if (m.multi != null && Object.hasOwnProperty.call(m, "multi"))
              $root.cosmos.tx.signing.SignatureDescriptor.Data.Multi.encode(
                m.multi,
                w.uint32(18).fork(),
              ).ldelim();
            return w;
          };
          Data.decode = function decode(r, l) {
            if (!(r instanceof $Reader)) r = $Reader.create(r);
            var c = l === undefined ? r.len : r.pos + l,
              m = new $root.cosmos.tx.signing.SignatureDescriptor.Data();
            while (r.pos < c) {
              var t = r.uint32();
              switch (t >>> 3) {
                case 1:
                  m.single = $root.cosmos.tx.signing.SignatureDescriptor.Data.Single.decode(r, r.uint32());
                  break;
                case 2:
                  m.multi = $root.cosmos.tx.signing.SignatureDescriptor.Data.Multi.decode(r, r.uint32());
                  break;
                default:
                  r.skipType(t & 7);
                  break;
              }
            }
            return m;
          };
          Data.Single = (function () {
            function Single(p) {
              if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                  if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
            }
            Single.prototype.mode = 0;
            Single.prototype.signature = $util.newBuffer([]);
            Single.create = function create(properties) {
              return new Single(properties);
            };
            Single.encode = function encode(m, w) {
              if (!w) w = $Writer.create();
              if (m.mode != null && Object.hasOwnProperty.call(m, "mode")) w.uint32(8).int32(m.mode);
              if (m.signature != null && Object.hasOwnProperty.call(m, "signature"))
                w.uint32(18).bytes(m.signature);
              return w;
            };
            Single.decode = function decode(r, l) {
              if (!(r instanceof $Reader)) r = $Reader.create(r);
              var c = l === undefined ? r.len : r.pos + l,
                m = new $root.cosmos.tx.signing.SignatureDescriptor.Data.Single();
              while (r.pos < c) {
                var t = r.uint32();
                switch (t >>> 3) {
                  case 1:
                    m.mode = r.int32();
                    break;
                  case 2:
                    m.signature = r.bytes();
                    break;
                  default:
                    r.skipType(t & 7);
                    break;
                }
              }
              return m;
            };
            return Single;
          })();
          Data.Multi = (function () {
            function Multi(p) {
              this.signatures = [];
              if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                  if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
            }
            Multi.prototype.bitarray = null;
            Multi.prototype.signatures = $util.emptyArray;
            Multi.create = function create(properties) {
              return new Multi(properties);
            };
            Multi.encode = function encode(m, w) {
              if (!w) w = $Writer.create();
              if (m.bitarray != null && Object.hasOwnProperty.call(m, "bitarray"))
                $root.cosmos.crypto.CompactBitArray.encode(m.bitarray, w.uint32(10).fork()).ldelim();
              if (m.signatures != null && m.signatures.length) {
                for (var i = 0; i < m.signatures.length; ++i)
                  $root.cosmos.tx.signing.SignatureDescriptor.Data.encode(
                    m.signatures[i],
                    w.uint32(18).fork(),
                  ).ldelim();
              }
              return w;
            };
            Multi.decode = function decode(r, l) {
              if (!(r instanceof $Reader)) r = $Reader.create(r);
              var c = l === undefined ? r.len : r.pos + l,
                m = new $root.cosmos.tx.signing.SignatureDescriptor.Data.Multi();
              while (r.pos < c) {
                var t = r.uint32();
                switch (t >>> 3) {
                  case 1:
                    m.bitarray = $root.cosmos.crypto.CompactBitArray.decode(r, r.uint32());
                    break;
                  case 2:
                    if (!(m.signatures && m.signatures.length)) m.signatures = [];
                    m.signatures.push($root.cosmos.tx.signing.SignatureDescriptor.Data.decode(r, r.uint32()));
                    break;
                  default:
                    r.skipType(t & 7);
                    break;
                }
              }
              return m;
            };
            return Multi;
          })();
          return Data;
        })();
        return SignatureDescriptor;
      })();
      return signing;
    })();
    return tx;
  })();
  return cosmos;
})();
exports.ibc = $root.ibc = (() => {
  const ibc = {};
  ibc.channel = (function () {
    const channel = {};
    channel.MsgChannelOpenInit = (function () {
      function MsgChannelOpenInit(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      MsgChannelOpenInit.prototype.portId = "";
      MsgChannelOpenInit.prototype.channelId = "";
      MsgChannelOpenInit.prototype.channel = null;
      MsgChannelOpenInit.prototype.signer = $util.newBuffer([]);
      MsgChannelOpenInit.create = function create(properties) {
        return new MsgChannelOpenInit(properties);
      };
      MsgChannelOpenInit.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.portId != null && Object.hasOwnProperty.call(m, "portId")) w.uint32(10).string(m.portId);
        if (m.channelId != null && Object.hasOwnProperty.call(m, "channelId"))
          w.uint32(18).string(m.channelId);
        if (m.channel != null && Object.hasOwnProperty.call(m, "channel"))
          $root.ibc.channel.Channel.encode(m.channel, w.uint32(26).fork()).ldelim();
        if (m.signer != null && Object.hasOwnProperty.call(m, "signer")) w.uint32(34).bytes(m.signer);
        return w;
      };
      MsgChannelOpenInit.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.channel.MsgChannelOpenInit();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.portId = r.string();
              break;
            case 2:
              m.channelId = r.string();
              break;
            case 3:
              m.channel = $root.ibc.channel.Channel.decode(r, r.uint32());
              break;
            case 4:
              m.signer = r.bytes();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return MsgChannelOpenInit;
    })();
    channel.MsgChannelOpenTry = (function () {
      function MsgChannelOpenTry(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      MsgChannelOpenTry.prototype.portId = "";
      MsgChannelOpenTry.prototype.channelId = "";
      MsgChannelOpenTry.prototype.channel = null;
      MsgChannelOpenTry.prototype.counterpartyVersion = "";
      MsgChannelOpenTry.prototype.proofInit = $util.newBuffer([]);
      MsgChannelOpenTry.prototype.proofHeight = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      MsgChannelOpenTry.prototype.signer = $util.newBuffer([]);
      MsgChannelOpenTry.create = function create(properties) {
        return new MsgChannelOpenTry(properties);
      };
      MsgChannelOpenTry.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.portId != null && Object.hasOwnProperty.call(m, "portId")) w.uint32(10).string(m.portId);
        if (m.channelId != null && Object.hasOwnProperty.call(m, "channelId"))
          w.uint32(18).string(m.channelId);
        if (m.channel != null && Object.hasOwnProperty.call(m, "channel"))
          $root.ibc.channel.Channel.encode(m.channel, w.uint32(26).fork()).ldelim();
        if (m.counterpartyVersion != null && Object.hasOwnProperty.call(m, "counterpartyVersion"))
          w.uint32(34).string(m.counterpartyVersion);
        if (m.proofInit != null && Object.hasOwnProperty.call(m, "proofInit"))
          w.uint32(42).bytes(m.proofInit);
        if (m.proofHeight != null && Object.hasOwnProperty.call(m, "proofHeight"))
          w.uint32(48).uint64(m.proofHeight);
        if (m.signer != null && Object.hasOwnProperty.call(m, "signer")) w.uint32(58).bytes(m.signer);
        return w;
      };
      MsgChannelOpenTry.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.channel.MsgChannelOpenTry();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.portId = r.string();
              break;
            case 2:
              m.channelId = r.string();
              break;
            case 3:
              m.channel = $root.ibc.channel.Channel.decode(r, r.uint32());
              break;
            case 4:
              m.counterpartyVersion = r.string();
              break;
            case 5:
              m.proofInit = r.bytes();
              break;
            case 6:
              m.proofHeight = r.uint64();
              break;
            case 7:
              m.signer = r.bytes();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return MsgChannelOpenTry;
    })();
    channel.MsgChannelOpenAck = (function () {
      function MsgChannelOpenAck(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      MsgChannelOpenAck.prototype.portId = "";
      MsgChannelOpenAck.prototype.channelId = "";
      MsgChannelOpenAck.prototype.counterpartyVersion = "";
      MsgChannelOpenAck.prototype.proofTry = $util.newBuffer([]);
      MsgChannelOpenAck.prototype.proofHeight = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      MsgChannelOpenAck.prototype.signer = $util.newBuffer([]);
      MsgChannelOpenAck.create = function create(properties) {
        return new MsgChannelOpenAck(properties);
      };
      MsgChannelOpenAck.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.portId != null && Object.hasOwnProperty.call(m, "portId")) w.uint32(10).string(m.portId);
        if (m.channelId != null && Object.hasOwnProperty.call(m, "channelId"))
          w.uint32(18).string(m.channelId);
        if (m.counterpartyVersion != null && Object.hasOwnProperty.call(m, "counterpartyVersion"))
          w.uint32(26).string(m.counterpartyVersion);
        if (m.proofTry != null && Object.hasOwnProperty.call(m, "proofTry")) w.uint32(34).bytes(m.proofTry);
        if (m.proofHeight != null && Object.hasOwnProperty.call(m, "proofHeight"))
          w.uint32(40).uint64(m.proofHeight);
        if (m.signer != null && Object.hasOwnProperty.call(m, "signer")) w.uint32(50).bytes(m.signer);
        return w;
      };
      MsgChannelOpenAck.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.channel.MsgChannelOpenAck();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.portId = r.string();
              break;
            case 2:
              m.channelId = r.string();
              break;
            case 3:
              m.counterpartyVersion = r.string();
              break;
            case 4:
              m.proofTry = r.bytes();
              break;
            case 5:
              m.proofHeight = r.uint64();
              break;
            case 6:
              m.signer = r.bytes();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return MsgChannelOpenAck;
    })();
    channel.MsgChannelOpenConfirm = (function () {
      function MsgChannelOpenConfirm(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      MsgChannelOpenConfirm.prototype.portId = "";
      MsgChannelOpenConfirm.prototype.channelId = "";
      MsgChannelOpenConfirm.prototype.proofAck = $util.newBuffer([]);
      MsgChannelOpenConfirm.prototype.proofHeight = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      MsgChannelOpenConfirm.prototype.signer = $util.newBuffer([]);
      MsgChannelOpenConfirm.create = function create(properties) {
        return new MsgChannelOpenConfirm(properties);
      };
      MsgChannelOpenConfirm.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.portId != null && Object.hasOwnProperty.call(m, "portId")) w.uint32(10).string(m.portId);
        if (m.channelId != null && Object.hasOwnProperty.call(m, "channelId"))
          w.uint32(18).string(m.channelId);
        if (m.proofAck != null && Object.hasOwnProperty.call(m, "proofAck")) w.uint32(26).bytes(m.proofAck);
        if (m.proofHeight != null && Object.hasOwnProperty.call(m, "proofHeight"))
          w.uint32(32).uint64(m.proofHeight);
        if (m.signer != null && Object.hasOwnProperty.call(m, "signer")) w.uint32(42).bytes(m.signer);
        return w;
      };
      MsgChannelOpenConfirm.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.channel.MsgChannelOpenConfirm();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.portId = r.string();
              break;
            case 2:
              m.channelId = r.string();
              break;
            case 3:
              m.proofAck = r.bytes();
              break;
            case 4:
              m.proofHeight = r.uint64();
              break;
            case 5:
              m.signer = r.bytes();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return MsgChannelOpenConfirm;
    })();
    channel.MsgChannelCloseInit = (function () {
      function MsgChannelCloseInit(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      MsgChannelCloseInit.prototype.portId = "";
      MsgChannelCloseInit.prototype.channelId = "";
      MsgChannelCloseInit.prototype.signer = $util.newBuffer([]);
      MsgChannelCloseInit.create = function create(properties) {
        return new MsgChannelCloseInit(properties);
      };
      MsgChannelCloseInit.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.portId != null && Object.hasOwnProperty.call(m, "portId")) w.uint32(10).string(m.portId);
        if (m.channelId != null && Object.hasOwnProperty.call(m, "channelId"))
          w.uint32(18).string(m.channelId);
        if (m.signer != null && Object.hasOwnProperty.call(m, "signer")) w.uint32(26).bytes(m.signer);
        return w;
      };
      MsgChannelCloseInit.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.channel.MsgChannelCloseInit();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.portId = r.string();
              break;
            case 2:
              m.channelId = r.string();
              break;
            case 3:
              m.signer = r.bytes();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return MsgChannelCloseInit;
    })();
    channel.MsgChannelCloseConfirm = (function () {
      function MsgChannelCloseConfirm(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      MsgChannelCloseConfirm.prototype.portId = "";
      MsgChannelCloseConfirm.prototype.channelId = "";
      MsgChannelCloseConfirm.prototype.proofInit = $util.newBuffer([]);
      MsgChannelCloseConfirm.prototype.proofHeight = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      MsgChannelCloseConfirm.prototype.signer = $util.newBuffer([]);
      MsgChannelCloseConfirm.create = function create(properties) {
        return new MsgChannelCloseConfirm(properties);
      };
      MsgChannelCloseConfirm.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.portId != null && Object.hasOwnProperty.call(m, "portId")) w.uint32(10).string(m.portId);
        if (m.channelId != null && Object.hasOwnProperty.call(m, "channelId"))
          w.uint32(18).string(m.channelId);
        if (m.proofInit != null && Object.hasOwnProperty.call(m, "proofInit"))
          w.uint32(26).bytes(m.proofInit);
        if (m.proofHeight != null && Object.hasOwnProperty.call(m, "proofHeight"))
          w.uint32(32).uint64(m.proofHeight);
        if (m.signer != null && Object.hasOwnProperty.call(m, "signer")) w.uint32(42).bytes(m.signer);
        return w;
      };
      MsgChannelCloseConfirm.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.channel.MsgChannelCloseConfirm();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.portId = r.string();
              break;
            case 2:
              m.channelId = r.string();
              break;
            case 3:
              m.proofInit = r.bytes();
              break;
            case 4:
              m.proofHeight = r.uint64();
              break;
            case 5:
              m.signer = r.bytes();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return MsgChannelCloseConfirm;
    })();
    channel.MsgRecvPacket = (function () {
      function MsgRecvPacket(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      MsgRecvPacket.prototype.packet = null;
      MsgRecvPacket.prototype.proof = $util.newBuffer([]);
      MsgRecvPacket.prototype.proofHeight = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      MsgRecvPacket.prototype.signer = $util.newBuffer([]);
      MsgRecvPacket.create = function create(properties) {
        return new MsgRecvPacket(properties);
      };
      MsgRecvPacket.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.packet != null && Object.hasOwnProperty.call(m, "packet"))
          $root.ibc.channel.Packet.encode(m.packet, w.uint32(10).fork()).ldelim();
        if (m.proof != null && Object.hasOwnProperty.call(m, "proof")) w.uint32(18).bytes(m.proof);
        if (m.proofHeight != null && Object.hasOwnProperty.call(m, "proofHeight"))
          w.uint32(24).uint64(m.proofHeight);
        if (m.signer != null && Object.hasOwnProperty.call(m, "signer")) w.uint32(34).bytes(m.signer);
        return w;
      };
      MsgRecvPacket.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.channel.MsgRecvPacket();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.packet = $root.ibc.channel.Packet.decode(r, r.uint32());
              break;
            case 2:
              m.proof = r.bytes();
              break;
            case 3:
              m.proofHeight = r.uint64();
              break;
            case 4:
              m.signer = r.bytes();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return MsgRecvPacket;
    })();
    channel.MsgTimeout = (function () {
      function MsgTimeout(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      MsgTimeout.prototype.packet = null;
      MsgTimeout.prototype.proof = $util.newBuffer([]);
      MsgTimeout.prototype.proofHeight = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      MsgTimeout.prototype.nextSequenceRecv = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      MsgTimeout.prototype.signer = $util.newBuffer([]);
      MsgTimeout.create = function create(properties) {
        return new MsgTimeout(properties);
      };
      MsgTimeout.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.packet != null && Object.hasOwnProperty.call(m, "packet"))
          $root.ibc.channel.Packet.encode(m.packet, w.uint32(10).fork()).ldelim();
        if (m.proof != null && Object.hasOwnProperty.call(m, "proof")) w.uint32(18).bytes(m.proof);
        if (m.proofHeight != null && Object.hasOwnProperty.call(m, "proofHeight"))
          w.uint32(24).uint64(m.proofHeight);
        if (m.nextSequenceRecv != null && Object.hasOwnProperty.call(m, "nextSequenceRecv"))
          w.uint32(32).uint64(m.nextSequenceRecv);
        if (m.signer != null && Object.hasOwnProperty.call(m, "signer")) w.uint32(42).bytes(m.signer);
        return w;
      };
      MsgTimeout.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.channel.MsgTimeout();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.packet = $root.ibc.channel.Packet.decode(r, r.uint32());
              break;
            case 2:
              m.proof = r.bytes();
              break;
            case 3:
              m.proofHeight = r.uint64();
              break;
            case 4:
              m.nextSequenceRecv = r.uint64();
              break;
            case 5:
              m.signer = r.bytes();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return MsgTimeout;
    })();
    channel.MsgAcknowledgement = (function () {
      function MsgAcknowledgement(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      MsgAcknowledgement.prototype.packet = null;
      MsgAcknowledgement.prototype.acknowledgement = $util.newBuffer([]);
      MsgAcknowledgement.prototype.proof = $util.newBuffer([]);
      MsgAcknowledgement.prototype.proofHeight = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      MsgAcknowledgement.prototype.signer = $util.newBuffer([]);
      MsgAcknowledgement.create = function create(properties) {
        return new MsgAcknowledgement(properties);
      };
      MsgAcknowledgement.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.packet != null && Object.hasOwnProperty.call(m, "packet"))
          $root.ibc.channel.Packet.encode(m.packet, w.uint32(10).fork()).ldelim();
        if (m.acknowledgement != null && Object.hasOwnProperty.call(m, "acknowledgement"))
          w.uint32(18).bytes(m.acknowledgement);
        if (m.proof != null && Object.hasOwnProperty.call(m, "proof")) w.uint32(26).bytes(m.proof);
        if (m.proofHeight != null && Object.hasOwnProperty.call(m, "proofHeight"))
          w.uint32(32).uint64(m.proofHeight);
        if (m.signer != null && Object.hasOwnProperty.call(m, "signer")) w.uint32(42).bytes(m.signer);
        return w;
      };
      MsgAcknowledgement.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.channel.MsgAcknowledgement();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.packet = $root.ibc.channel.Packet.decode(r, r.uint32());
              break;
            case 2:
              m.acknowledgement = r.bytes();
              break;
            case 3:
              m.proof = r.bytes();
              break;
            case 4:
              m.proofHeight = r.uint64();
              break;
            case 5:
              m.signer = r.bytes();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return MsgAcknowledgement;
    })();
    channel.Channel = (function () {
      function Channel(p) {
        this.connectionHops = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      Channel.prototype.state = 0;
      Channel.prototype.ordering = 0;
      Channel.prototype.counterparty = null;
      Channel.prototype.connectionHops = $util.emptyArray;
      Channel.prototype.version = "";
      Channel.create = function create(properties) {
        return new Channel(properties);
      };
      Channel.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.state != null && Object.hasOwnProperty.call(m, "state")) w.uint32(8).int32(m.state);
        if (m.ordering != null && Object.hasOwnProperty.call(m, "ordering")) w.uint32(16).int32(m.ordering);
        if (m.counterparty != null && Object.hasOwnProperty.call(m, "counterparty"))
          $root.ibc.channel.Counterparty.encode(m.counterparty, w.uint32(26).fork()).ldelim();
        if (m.connectionHops != null && m.connectionHops.length) {
          for (var i = 0; i < m.connectionHops.length; ++i) w.uint32(34).string(m.connectionHops[i]);
        }
        if (m.version != null && Object.hasOwnProperty.call(m, "version")) w.uint32(42).string(m.version);
        return w;
      };
      Channel.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.channel.Channel();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.state = r.int32();
              break;
            case 2:
              m.ordering = r.int32();
              break;
            case 3:
              m.counterparty = $root.ibc.channel.Counterparty.decode(r, r.uint32());
              break;
            case 4:
              if (!(m.connectionHops && m.connectionHops.length)) m.connectionHops = [];
              m.connectionHops.push(r.string());
              break;
            case 5:
              m.version = r.string();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return Channel;
    })();
    channel.IdentifiedChannel = (function () {
      function IdentifiedChannel(p) {
        this.connectionHops = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      IdentifiedChannel.prototype.state = 0;
      IdentifiedChannel.prototype.ordering = 0;
      IdentifiedChannel.prototype.counterparty = null;
      IdentifiedChannel.prototype.connectionHops = $util.emptyArray;
      IdentifiedChannel.prototype.version = "";
      IdentifiedChannel.prototype.portId = "";
      IdentifiedChannel.prototype.channelId = "";
      IdentifiedChannel.create = function create(properties) {
        return new IdentifiedChannel(properties);
      };
      IdentifiedChannel.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.state != null && Object.hasOwnProperty.call(m, "state")) w.uint32(8).int32(m.state);
        if (m.ordering != null && Object.hasOwnProperty.call(m, "ordering")) w.uint32(16).int32(m.ordering);
        if (m.counterparty != null && Object.hasOwnProperty.call(m, "counterparty"))
          $root.ibc.channel.Counterparty.encode(m.counterparty, w.uint32(26).fork()).ldelim();
        if (m.connectionHops != null && m.connectionHops.length) {
          for (var i = 0; i < m.connectionHops.length; ++i) w.uint32(34).string(m.connectionHops[i]);
        }
        if (m.version != null && Object.hasOwnProperty.call(m, "version")) w.uint32(42).string(m.version);
        if (m.portId != null && Object.hasOwnProperty.call(m, "portId")) w.uint32(50).string(m.portId);
        if (m.channelId != null && Object.hasOwnProperty.call(m, "channelId"))
          w.uint32(58).string(m.channelId);
        return w;
      };
      IdentifiedChannel.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.channel.IdentifiedChannel();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.state = r.int32();
              break;
            case 2:
              m.ordering = r.int32();
              break;
            case 3:
              m.counterparty = $root.ibc.channel.Counterparty.decode(r, r.uint32());
              break;
            case 4:
              if (!(m.connectionHops && m.connectionHops.length)) m.connectionHops = [];
              m.connectionHops.push(r.string());
              break;
            case 5:
              m.version = r.string();
              break;
            case 6:
              m.portId = r.string();
              break;
            case 7:
              m.channelId = r.string();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return IdentifiedChannel;
    })();
    channel.State = (function () {
      const valuesById = {},
        values = Object.create(valuesById);
      values[(valuesById[0] = "STATE_UNINITIALIZED_UNSPECIFIED")] = 0;
      values[(valuesById[1] = "STATE_INIT")] = 1;
      values[(valuesById[2] = "STATE_TRYOPEN")] = 2;
      values[(valuesById[3] = "STATE_OPEN")] = 3;
      values[(valuesById[4] = "STATE_CLOSED")] = 4;
      return values;
    })();
    channel.Order = (function () {
      const valuesById = {},
        values = Object.create(valuesById);
      values[(valuesById[0] = "ORDER_NONE_UNSPECIFIED")] = 0;
      values[(valuesById[1] = "ORDER_UNORDERED")] = 1;
      values[(valuesById[2] = "ORDER_ORDERED")] = 2;
      return values;
    })();
    channel.Counterparty = (function () {
      function Counterparty(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      Counterparty.prototype.portId = "";
      Counterparty.prototype.channelId = "";
      Counterparty.create = function create(properties) {
        return new Counterparty(properties);
      };
      Counterparty.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.portId != null && Object.hasOwnProperty.call(m, "portId")) w.uint32(10).string(m.portId);
        if (m.channelId != null && Object.hasOwnProperty.call(m, "channelId"))
          w.uint32(18).string(m.channelId);
        return w;
      };
      Counterparty.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.channel.Counterparty();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.portId = r.string();
              break;
            case 2:
              m.channelId = r.string();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return Counterparty;
    })();
    channel.Packet = (function () {
      function Packet(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      Packet.prototype.sequence = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      Packet.prototype.sourcePort = "";
      Packet.prototype.sourceChannel = "";
      Packet.prototype.destinationPort = "";
      Packet.prototype.destinationChannel = "";
      Packet.prototype.data = $util.newBuffer([]);
      Packet.prototype.timeoutHeight = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      Packet.prototype.timeoutTimestamp = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      Packet.create = function create(properties) {
        return new Packet(properties);
      };
      Packet.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.sequence != null && Object.hasOwnProperty.call(m, "sequence")) w.uint32(8).uint64(m.sequence);
        if (m.sourcePort != null && Object.hasOwnProperty.call(m, "sourcePort"))
          w.uint32(18).string(m.sourcePort);
        if (m.sourceChannel != null && Object.hasOwnProperty.call(m, "sourceChannel"))
          w.uint32(26).string(m.sourceChannel);
        if (m.destinationPort != null && Object.hasOwnProperty.call(m, "destinationPort"))
          w.uint32(34).string(m.destinationPort);
        if (m.destinationChannel != null && Object.hasOwnProperty.call(m, "destinationChannel"))
          w.uint32(42).string(m.destinationChannel);
        if (m.data != null && Object.hasOwnProperty.call(m, "data")) w.uint32(50).bytes(m.data);
        if (m.timeoutHeight != null && Object.hasOwnProperty.call(m, "timeoutHeight"))
          w.uint32(56).uint64(m.timeoutHeight);
        if (m.timeoutTimestamp != null && Object.hasOwnProperty.call(m, "timeoutTimestamp"))
          w.uint32(64).uint64(m.timeoutTimestamp);
        return w;
      };
      Packet.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.channel.Packet();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.sequence = r.uint64();
              break;
            case 2:
              m.sourcePort = r.string();
              break;
            case 3:
              m.sourceChannel = r.string();
              break;
            case 4:
              m.destinationPort = r.string();
              break;
            case 5:
              m.destinationChannel = r.string();
              break;
            case 6:
              m.data = r.bytes();
              break;
            case 7:
              m.timeoutHeight = r.uint64();
              break;
            case 8:
              m.timeoutTimestamp = r.uint64();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return Packet;
    })();
    channel.PacketAckCommitment = (function () {
      function PacketAckCommitment(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      PacketAckCommitment.prototype.portId = "";
      PacketAckCommitment.prototype.channelId = "";
      PacketAckCommitment.prototype.sequence = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      PacketAckCommitment.prototype.hash = $util.newBuffer([]);
      PacketAckCommitment.create = function create(properties) {
        return new PacketAckCommitment(properties);
      };
      PacketAckCommitment.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.portId != null && Object.hasOwnProperty.call(m, "portId")) w.uint32(10).string(m.portId);
        if (m.channelId != null && Object.hasOwnProperty.call(m, "channelId"))
          w.uint32(18).string(m.channelId);
        if (m.sequence != null && Object.hasOwnProperty.call(m, "sequence")) w.uint32(24).uint64(m.sequence);
        if (m.hash != null && Object.hasOwnProperty.call(m, "hash")) w.uint32(34).bytes(m.hash);
        return w;
      };
      PacketAckCommitment.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.channel.PacketAckCommitment();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.portId = r.string();
              break;
            case 2:
              m.channelId = r.string();
              break;
            case 3:
              m.sequence = r.uint64();
              break;
            case 4:
              m.hash = r.bytes();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return PacketAckCommitment;
    })();
    channel.Query = (function () {
      function Query(rpcImpl, requestDelimited, responseDelimited) {
        $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
      }
      (Query.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = Query;
      Query.create = function create(rpcImpl, requestDelimited, responseDelimited) {
        return new this(rpcImpl, requestDelimited, responseDelimited);
      };
      Object.defineProperty(
        (Query.prototype.channel = function channel(request, callback) {
          return this.rpcCall(
            channel,
            $root.ibc.channel.QueryChannelRequest,
            $root.ibc.channel.QueryChannelResponse,
            request,
            callback,
          );
        }),
        "name",
        { value: "Channel" },
      );
      Object.defineProperty(
        (Query.prototype.channels = function channels(request, callback) {
          return this.rpcCall(
            channels,
            $root.ibc.channel.QueryChannelsRequest,
            $root.ibc.channel.QueryChannelsResponse,
            request,
            callback,
          );
        }),
        "name",
        { value: "Channels" },
      );
      Object.defineProperty(
        (Query.prototype.connectionChannels = function connectionChannels(request, callback) {
          return this.rpcCall(
            connectionChannels,
            $root.ibc.channel.QueryConnectionChannelsRequest,
            $root.ibc.channel.QueryConnectionChannelsResponse,
            request,
            callback,
          );
        }),
        "name",
        { value: "ConnectionChannels" },
      );
      Object.defineProperty(
        (Query.prototype.packetCommitment = function packetCommitment(request, callback) {
          return this.rpcCall(
            packetCommitment,
            $root.ibc.channel.QueryPacketCommitmentRequest,
            $root.ibc.channel.QueryPacketCommitmentResponse,
            request,
            callback,
          );
        }),
        "name",
        { value: "PacketCommitment" },
      );
      Object.defineProperty(
        (Query.prototype.packetCommitments = function packetCommitments(request, callback) {
          return this.rpcCall(
            packetCommitments,
            $root.ibc.channel.QueryPacketCommitmentsRequest,
            $root.ibc.channel.QueryPacketCommitmentsResponse,
            request,
            callback,
          );
        }),
        "name",
        { value: "PacketCommitments" },
      );
      Object.defineProperty(
        (Query.prototype.packetAcknowledgement = function packetAcknowledgement(request, callback) {
          return this.rpcCall(
            packetAcknowledgement,
            $root.ibc.channel.QueryPacketAcknowledgementRequest,
            $root.ibc.channel.QueryPacketAcknowledgementResponse,
            request,
            callback,
          );
        }),
        "name",
        { value: "PacketAcknowledgement" },
      );
      Object.defineProperty(
        (Query.prototype.unrelayedPackets = function unrelayedPackets(request, callback) {
          return this.rpcCall(
            unrelayedPackets,
            $root.ibc.channel.QueryUnrelayedPacketsRequest,
            $root.ibc.channel.QueryUnrelayedPacketsResponse,
            request,
            callback,
          );
        }),
        "name",
        { value: "UnrelayedPackets" },
      );
      Object.defineProperty(
        (Query.prototype.nextSequenceReceive = function nextSequenceReceive(request, callback) {
          return this.rpcCall(
            nextSequenceReceive,
            $root.ibc.channel.QueryNextSequenceReceiveRequest,
            $root.ibc.channel.QueryNextSequenceReceiveResponse,
            request,
            callback,
          );
        }),
        "name",
        { value: "NextSequenceReceive" },
      );
      return Query;
    })();
    channel.QueryChannelRequest = (function () {
      function QueryChannelRequest(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      QueryChannelRequest.prototype.portId = "";
      QueryChannelRequest.prototype.channelId = "";
      QueryChannelRequest.create = function create(properties) {
        return new QueryChannelRequest(properties);
      };
      QueryChannelRequest.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.portId != null && Object.hasOwnProperty.call(m, "portId")) w.uint32(10).string(m.portId);
        if (m.channelId != null && Object.hasOwnProperty.call(m, "channelId"))
          w.uint32(18).string(m.channelId);
        return w;
      };
      QueryChannelRequest.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.channel.QueryChannelRequest();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.portId = r.string();
              break;
            case 2:
              m.channelId = r.string();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return QueryChannelRequest;
    })();
    channel.QueryChannelResponse = (function () {
      function QueryChannelResponse(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      QueryChannelResponse.prototype.channel = null;
      QueryChannelResponse.prototype.proof = $util.newBuffer([]);
      QueryChannelResponse.prototype.proofPath = "";
      QueryChannelResponse.prototype.proofHeight = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      QueryChannelResponse.create = function create(properties) {
        return new QueryChannelResponse(properties);
      };
      QueryChannelResponse.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.channel != null && Object.hasOwnProperty.call(m, "channel"))
          $root.ibc.channel.Channel.encode(m.channel, w.uint32(10).fork()).ldelim();
        if (m.proof != null && Object.hasOwnProperty.call(m, "proof")) w.uint32(18).bytes(m.proof);
        if (m.proofPath != null && Object.hasOwnProperty.call(m, "proofPath"))
          w.uint32(26).string(m.proofPath);
        if (m.proofHeight != null && Object.hasOwnProperty.call(m, "proofHeight"))
          w.uint32(32).uint64(m.proofHeight);
        return w;
      };
      QueryChannelResponse.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.channel.QueryChannelResponse();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.channel = $root.ibc.channel.Channel.decode(r, r.uint32());
              break;
            case 2:
              m.proof = r.bytes();
              break;
            case 3:
              m.proofPath = r.string();
              break;
            case 4:
              m.proofHeight = r.uint64();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return QueryChannelResponse;
    })();
    channel.QueryChannelsRequest = (function () {
      function QueryChannelsRequest(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      QueryChannelsRequest.prototype.pagination = null;
      QueryChannelsRequest.create = function create(properties) {
        return new QueryChannelsRequest(properties);
      };
      QueryChannelsRequest.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.pagination != null && Object.hasOwnProperty.call(m, "pagination"))
          $root.cosmos.query.PageRequest.encode(m.pagination, w.uint32(10).fork()).ldelim();
        return w;
      };
      QueryChannelsRequest.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.channel.QueryChannelsRequest();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.pagination = $root.cosmos.query.PageRequest.decode(r, r.uint32());
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return QueryChannelsRequest;
    })();
    channel.QueryChannelsResponse = (function () {
      function QueryChannelsResponse(p) {
        this.channels = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      QueryChannelsResponse.prototype.channels = $util.emptyArray;
      QueryChannelsResponse.prototype.pagination = null;
      QueryChannelsResponse.prototype.height = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      QueryChannelsResponse.create = function create(properties) {
        return new QueryChannelsResponse(properties);
      };
      QueryChannelsResponse.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.channels != null && m.channels.length) {
          for (var i = 0; i < m.channels.length; ++i)
            $root.ibc.channel.IdentifiedChannel.encode(m.channels[i], w.uint32(10).fork()).ldelim();
        }
        if (m.pagination != null && Object.hasOwnProperty.call(m, "pagination"))
          $root.cosmos.query.PageResponse.encode(m.pagination, w.uint32(18).fork()).ldelim();
        if (m.height != null && Object.hasOwnProperty.call(m, "height")) w.uint32(24).int64(m.height);
        return w;
      };
      QueryChannelsResponse.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.channel.QueryChannelsResponse();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              if (!(m.channels && m.channels.length)) m.channels = [];
              m.channels.push($root.ibc.channel.IdentifiedChannel.decode(r, r.uint32()));
              break;
            case 2:
              m.pagination = $root.cosmos.query.PageResponse.decode(r, r.uint32());
              break;
            case 3:
              m.height = r.int64();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return QueryChannelsResponse;
    })();
    channel.QueryConnectionChannelsRequest = (function () {
      function QueryConnectionChannelsRequest(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      QueryConnectionChannelsRequest.prototype.connection = "";
      QueryConnectionChannelsRequest.prototype.pagination = null;
      QueryConnectionChannelsRequest.create = function create(properties) {
        return new QueryConnectionChannelsRequest(properties);
      };
      QueryConnectionChannelsRequest.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.connection != null && Object.hasOwnProperty.call(m, "connection"))
          w.uint32(10).string(m.connection);
        if (m.pagination != null && Object.hasOwnProperty.call(m, "pagination"))
          $root.cosmos.query.PageRequest.encode(m.pagination, w.uint32(18).fork()).ldelim();
        return w;
      };
      QueryConnectionChannelsRequest.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.channel.QueryConnectionChannelsRequest();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.connection = r.string();
              break;
            case 2:
              m.pagination = $root.cosmos.query.PageRequest.decode(r, r.uint32());
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return QueryConnectionChannelsRequest;
    })();
    channel.QueryConnectionChannelsResponse = (function () {
      function QueryConnectionChannelsResponse(p) {
        this.channels = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      QueryConnectionChannelsResponse.prototype.channels = $util.emptyArray;
      QueryConnectionChannelsResponse.prototype.pagination = null;
      QueryConnectionChannelsResponse.prototype.height = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      QueryConnectionChannelsResponse.create = function create(properties) {
        return new QueryConnectionChannelsResponse(properties);
      };
      QueryConnectionChannelsResponse.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.channels != null && m.channels.length) {
          for (var i = 0; i < m.channels.length; ++i)
            $root.ibc.channel.IdentifiedChannel.encode(m.channels[i], w.uint32(10).fork()).ldelim();
        }
        if (m.pagination != null && Object.hasOwnProperty.call(m, "pagination"))
          $root.cosmos.query.PageResponse.encode(m.pagination, w.uint32(18).fork()).ldelim();
        if (m.height != null && Object.hasOwnProperty.call(m, "height")) w.uint32(24).int64(m.height);
        return w;
      };
      QueryConnectionChannelsResponse.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.channel.QueryConnectionChannelsResponse();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              if (!(m.channels && m.channels.length)) m.channels = [];
              m.channels.push($root.ibc.channel.IdentifiedChannel.decode(r, r.uint32()));
              break;
            case 2:
              m.pagination = $root.cosmos.query.PageResponse.decode(r, r.uint32());
              break;
            case 3:
              m.height = r.int64();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return QueryConnectionChannelsResponse;
    })();
    channel.QueryPacketCommitmentRequest = (function () {
      function QueryPacketCommitmentRequest(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      QueryPacketCommitmentRequest.prototype.portId = "";
      QueryPacketCommitmentRequest.prototype.channelId = "";
      QueryPacketCommitmentRequest.prototype.sequence = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      QueryPacketCommitmentRequest.create = function create(properties) {
        return new QueryPacketCommitmentRequest(properties);
      };
      QueryPacketCommitmentRequest.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.portId != null && Object.hasOwnProperty.call(m, "portId")) w.uint32(10).string(m.portId);
        if (m.channelId != null && Object.hasOwnProperty.call(m, "channelId"))
          w.uint32(18).string(m.channelId);
        if (m.sequence != null && Object.hasOwnProperty.call(m, "sequence")) w.uint32(24).uint64(m.sequence);
        return w;
      };
      QueryPacketCommitmentRequest.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.channel.QueryPacketCommitmentRequest();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.portId = r.string();
              break;
            case 2:
              m.channelId = r.string();
              break;
            case 3:
              m.sequence = r.uint64();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return QueryPacketCommitmentRequest;
    })();
    channel.QueryPacketCommitmentResponse = (function () {
      function QueryPacketCommitmentResponse(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      QueryPacketCommitmentResponse.prototype.commitment = $util.newBuffer([]);
      QueryPacketCommitmentResponse.prototype.proof = $util.newBuffer([]);
      QueryPacketCommitmentResponse.prototype.proofPath = "";
      QueryPacketCommitmentResponse.prototype.proofHeight = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      QueryPacketCommitmentResponse.create = function create(properties) {
        return new QueryPacketCommitmentResponse(properties);
      };
      QueryPacketCommitmentResponse.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.commitment != null && Object.hasOwnProperty.call(m, "commitment"))
          w.uint32(10).bytes(m.commitment);
        if (m.proof != null && Object.hasOwnProperty.call(m, "proof")) w.uint32(18).bytes(m.proof);
        if (m.proofPath != null && Object.hasOwnProperty.call(m, "proofPath"))
          w.uint32(26).string(m.proofPath);
        if (m.proofHeight != null && Object.hasOwnProperty.call(m, "proofHeight"))
          w.uint32(32).uint64(m.proofHeight);
        return w;
      };
      QueryPacketCommitmentResponse.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.channel.QueryPacketCommitmentResponse();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.commitment = r.bytes();
              break;
            case 2:
              m.proof = r.bytes();
              break;
            case 3:
              m.proofPath = r.string();
              break;
            case 4:
              m.proofHeight = r.uint64();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return QueryPacketCommitmentResponse;
    })();
    channel.QueryPacketCommitmentsRequest = (function () {
      function QueryPacketCommitmentsRequest(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      QueryPacketCommitmentsRequest.prototype.portId = "";
      QueryPacketCommitmentsRequest.prototype.channelId = "";
      QueryPacketCommitmentsRequest.prototype.pagination = null;
      QueryPacketCommitmentsRequest.create = function create(properties) {
        return new QueryPacketCommitmentsRequest(properties);
      };
      QueryPacketCommitmentsRequest.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.portId != null && Object.hasOwnProperty.call(m, "portId")) w.uint32(10).string(m.portId);
        if (m.channelId != null && Object.hasOwnProperty.call(m, "channelId"))
          w.uint32(18).string(m.channelId);
        if (m.pagination != null && Object.hasOwnProperty.call(m, "pagination"))
          $root.cosmos.query.PageRequest.encode(m.pagination, w.uint32(26).fork()).ldelim();
        return w;
      };
      QueryPacketCommitmentsRequest.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.channel.QueryPacketCommitmentsRequest();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.portId = r.string();
              break;
            case 2:
              m.channelId = r.string();
              break;
            case 3:
              m.pagination = $root.cosmos.query.PageRequest.decode(r, r.uint32());
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return QueryPacketCommitmentsRequest;
    })();
    channel.QueryPacketCommitmentsResponse = (function () {
      function QueryPacketCommitmentsResponse(p) {
        this.commitments = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      QueryPacketCommitmentsResponse.prototype.commitments = $util.emptyArray;
      QueryPacketCommitmentsResponse.prototype.pagination = null;
      QueryPacketCommitmentsResponse.prototype.height = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      QueryPacketCommitmentsResponse.create = function create(properties) {
        return new QueryPacketCommitmentsResponse(properties);
      };
      QueryPacketCommitmentsResponse.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.commitments != null && m.commitments.length) {
          for (var i = 0; i < m.commitments.length; ++i)
            $root.ibc.channel.PacketAckCommitment.encode(m.commitments[i], w.uint32(10).fork()).ldelim();
        }
        if (m.pagination != null && Object.hasOwnProperty.call(m, "pagination"))
          $root.cosmos.query.PageResponse.encode(m.pagination, w.uint32(18).fork()).ldelim();
        if (m.height != null && Object.hasOwnProperty.call(m, "height")) w.uint32(24).int64(m.height);
        return w;
      };
      QueryPacketCommitmentsResponse.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.channel.QueryPacketCommitmentsResponse();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              if (!(m.commitments && m.commitments.length)) m.commitments = [];
              m.commitments.push($root.ibc.channel.PacketAckCommitment.decode(r, r.uint32()));
              break;
            case 2:
              m.pagination = $root.cosmos.query.PageResponse.decode(r, r.uint32());
              break;
            case 3:
              m.height = r.int64();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return QueryPacketCommitmentsResponse;
    })();
    channel.QueryPacketAcknowledgementRequest = (function () {
      function QueryPacketAcknowledgementRequest(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      QueryPacketAcknowledgementRequest.prototype.portId = "";
      QueryPacketAcknowledgementRequest.prototype.channelId = "";
      QueryPacketAcknowledgementRequest.prototype.sequence = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      QueryPacketAcknowledgementRequest.create = function create(properties) {
        return new QueryPacketAcknowledgementRequest(properties);
      };
      QueryPacketAcknowledgementRequest.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.portId != null && Object.hasOwnProperty.call(m, "portId")) w.uint32(10).string(m.portId);
        if (m.channelId != null && Object.hasOwnProperty.call(m, "channelId"))
          w.uint32(18).string(m.channelId);
        if (m.sequence != null && Object.hasOwnProperty.call(m, "sequence")) w.uint32(24).uint64(m.sequence);
        return w;
      };
      QueryPacketAcknowledgementRequest.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.channel.QueryPacketAcknowledgementRequest();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.portId = r.string();
              break;
            case 2:
              m.channelId = r.string();
              break;
            case 3:
              m.sequence = r.uint64();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return QueryPacketAcknowledgementRequest;
    })();
    channel.QueryPacketAcknowledgementResponse = (function () {
      function QueryPacketAcknowledgementResponse(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      QueryPacketAcknowledgementResponse.prototype.acknowledgement = $util.newBuffer([]);
      QueryPacketAcknowledgementResponse.prototype.proof = $util.newBuffer([]);
      QueryPacketAcknowledgementResponse.prototype.proofPath = "";
      QueryPacketAcknowledgementResponse.prototype.proofHeight = $util.Long
        ? $util.Long.fromBits(0, 0, true)
        : 0;
      QueryPacketAcknowledgementResponse.create = function create(properties) {
        return new QueryPacketAcknowledgementResponse(properties);
      };
      QueryPacketAcknowledgementResponse.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.acknowledgement != null && Object.hasOwnProperty.call(m, "acknowledgement"))
          w.uint32(10).bytes(m.acknowledgement);
        if (m.proof != null && Object.hasOwnProperty.call(m, "proof")) w.uint32(18).bytes(m.proof);
        if (m.proofPath != null && Object.hasOwnProperty.call(m, "proofPath"))
          w.uint32(26).string(m.proofPath);
        if (m.proofHeight != null && Object.hasOwnProperty.call(m, "proofHeight"))
          w.uint32(32).uint64(m.proofHeight);
        return w;
      };
      QueryPacketAcknowledgementResponse.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.channel.QueryPacketAcknowledgementResponse();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.acknowledgement = r.bytes();
              break;
            case 2:
              m.proof = r.bytes();
              break;
            case 3:
              m.proofPath = r.string();
              break;
            case 4:
              m.proofHeight = r.uint64();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return QueryPacketAcknowledgementResponse;
    })();
    channel.QueryUnrelayedPacketsRequest = (function () {
      function QueryUnrelayedPacketsRequest(p) {
        this.packetCommitmentSequences = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      QueryUnrelayedPacketsRequest.prototype.portId = "";
      QueryUnrelayedPacketsRequest.prototype.channelId = "";
      QueryUnrelayedPacketsRequest.prototype.packetCommitmentSequences = $util.emptyArray;
      QueryUnrelayedPacketsRequest.prototype.acknowledgements = false;
      QueryUnrelayedPacketsRequest.create = function create(properties) {
        return new QueryUnrelayedPacketsRequest(properties);
      };
      QueryUnrelayedPacketsRequest.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.portId != null && Object.hasOwnProperty.call(m, "portId")) w.uint32(10).string(m.portId);
        if (m.channelId != null && Object.hasOwnProperty.call(m, "channelId"))
          w.uint32(18).string(m.channelId);
        if (m.packetCommitmentSequences != null && m.packetCommitmentSequences.length) {
          w.uint32(26).fork();
          for (var i = 0; i < m.packetCommitmentSequences.length; ++i)
            w.uint64(m.packetCommitmentSequences[i]);
          w.ldelim();
        }
        if (m.acknowledgements != null && Object.hasOwnProperty.call(m, "acknowledgements"))
          w.uint32(32).bool(m.acknowledgements);
        return w;
      };
      QueryUnrelayedPacketsRequest.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.channel.QueryUnrelayedPacketsRequest();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.portId = r.string();
              break;
            case 2:
              m.channelId = r.string();
              break;
            case 3:
              if (!(m.packetCommitmentSequences && m.packetCommitmentSequences.length))
                m.packetCommitmentSequences = [];
              if ((t & 7) === 2) {
                var c2 = r.uint32() + r.pos;
                while (r.pos < c2) m.packetCommitmentSequences.push(r.uint64());
              } else m.packetCommitmentSequences.push(r.uint64());
              break;
            case 4:
              m.acknowledgements = r.bool();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return QueryUnrelayedPacketsRequest;
    })();
    channel.QueryUnrelayedPacketsResponse = (function () {
      function QueryUnrelayedPacketsResponse(p) {
        this.sequences = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      QueryUnrelayedPacketsResponse.prototype.sequences = $util.emptyArray;
      QueryUnrelayedPacketsResponse.prototype.height = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      QueryUnrelayedPacketsResponse.create = function create(properties) {
        return new QueryUnrelayedPacketsResponse(properties);
      };
      QueryUnrelayedPacketsResponse.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.sequences != null && m.sequences.length) {
          w.uint32(10).fork();
          for (var i = 0; i < m.sequences.length; ++i) w.uint64(m.sequences[i]);
          w.ldelim();
        }
        if (m.height != null && Object.hasOwnProperty.call(m, "height")) w.uint32(16).int64(m.height);
        return w;
      };
      QueryUnrelayedPacketsResponse.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.channel.QueryUnrelayedPacketsResponse();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              if (!(m.sequences && m.sequences.length)) m.sequences = [];
              if ((t & 7) === 2) {
                var c2 = r.uint32() + r.pos;
                while (r.pos < c2) m.sequences.push(r.uint64());
              } else m.sequences.push(r.uint64());
              break;
            case 2:
              m.height = r.int64();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return QueryUnrelayedPacketsResponse;
    })();
    channel.QueryNextSequenceReceiveRequest = (function () {
      function QueryNextSequenceReceiveRequest(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      QueryNextSequenceReceiveRequest.prototype.portId = "";
      QueryNextSequenceReceiveRequest.prototype.channelId = "";
      QueryNextSequenceReceiveRequest.create = function create(properties) {
        return new QueryNextSequenceReceiveRequest(properties);
      };
      QueryNextSequenceReceiveRequest.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.portId != null && Object.hasOwnProperty.call(m, "portId")) w.uint32(10).string(m.portId);
        if (m.channelId != null && Object.hasOwnProperty.call(m, "channelId"))
          w.uint32(18).string(m.channelId);
        return w;
      };
      QueryNextSequenceReceiveRequest.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.channel.QueryNextSequenceReceiveRequest();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.portId = r.string();
              break;
            case 2:
              m.channelId = r.string();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return QueryNextSequenceReceiveRequest;
    })();
    channel.QueryNextSequenceReceiveResponse = (function () {
      function QueryNextSequenceReceiveResponse(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      QueryNextSequenceReceiveResponse.prototype.nextSequenceReceive = $util.Long
        ? $util.Long.fromBits(0, 0, true)
        : 0;
      QueryNextSequenceReceiveResponse.prototype.proof = $util.newBuffer([]);
      QueryNextSequenceReceiveResponse.prototype.proofPath = "";
      QueryNextSequenceReceiveResponse.prototype.proofHeight = $util.Long
        ? $util.Long.fromBits(0, 0, true)
        : 0;
      QueryNextSequenceReceiveResponse.create = function create(properties) {
        return new QueryNextSequenceReceiveResponse(properties);
      };
      QueryNextSequenceReceiveResponse.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.nextSequenceReceive != null && Object.hasOwnProperty.call(m, "nextSequenceReceive"))
          w.uint32(8).uint64(m.nextSequenceReceive);
        if (m.proof != null && Object.hasOwnProperty.call(m, "proof")) w.uint32(18).bytes(m.proof);
        if (m.proofPath != null && Object.hasOwnProperty.call(m, "proofPath"))
          w.uint32(26).string(m.proofPath);
        if (m.proofHeight != null && Object.hasOwnProperty.call(m, "proofHeight"))
          w.uint32(32).uint64(m.proofHeight);
        return w;
      };
      QueryNextSequenceReceiveResponse.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.channel.QueryNextSequenceReceiveResponse();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.nextSequenceReceive = r.uint64();
              break;
            case 2:
              m.proof = r.bytes();
              break;
            case 3:
              m.proofPath = r.string();
              break;
            case 4:
              m.proofHeight = r.uint64();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return QueryNextSequenceReceiveResponse;
    })();
    channel.QueryChannelClientStateRequest = (function () {
      function QueryChannelClientStateRequest(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      QueryChannelClientStateRequest.prototype.portId = "";
      QueryChannelClientStateRequest.prototype.channelId = "";
      QueryChannelClientStateRequest.create = function create(properties) {
        return new QueryChannelClientStateRequest(properties);
      };
      QueryChannelClientStateRequest.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.portId != null && Object.hasOwnProperty.call(m, "portId")) w.uint32(10).string(m.portId);
        if (m.channelId != null && Object.hasOwnProperty.call(m, "channelId"))
          w.uint32(18).string(m.channelId);
        return w;
      };
      QueryChannelClientStateRequest.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.channel.QueryChannelClientStateRequest();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.portId = r.string();
              break;
            case 2:
              m.channelId = r.string();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return QueryChannelClientStateRequest;
    })();
    channel.QueryChannelConsensusStateRequest = (function () {
      function QueryChannelConsensusStateRequest(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      QueryChannelConsensusStateRequest.prototype.portId = "";
      QueryChannelConsensusStateRequest.prototype.channelId = "";
      QueryChannelConsensusStateRequest.create = function create(properties) {
        return new QueryChannelConsensusStateRequest(properties);
      };
      QueryChannelConsensusStateRequest.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.portId != null && Object.hasOwnProperty.call(m, "portId")) w.uint32(10).string(m.portId);
        if (m.channelId != null && Object.hasOwnProperty.call(m, "channelId"))
          w.uint32(18).string(m.channelId);
        return w;
      };
      QueryChannelConsensusStateRequest.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.channel.QueryChannelConsensusStateRequest();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.portId = r.string();
              break;
            case 2:
              m.channelId = r.string();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return QueryChannelConsensusStateRequest;
    })();
    return channel;
  })();
  ibc.commitment = (function () {
    const commitment = {};
    commitment.MerkleRoot = (function () {
      function MerkleRoot(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      MerkleRoot.prototype.hash = $util.newBuffer([]);
      MerkleRoot.create = function create(properties) {
        return new MerkleRoot(properties);
      };
      MerkleRoot.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.hash != null && Object.hasOwnProperty.call(m, "hash")) w.uint32(10).bytes(m.hash);
        return w;
      };
      MerkleRoot.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.commitment.MerkleRoot();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.hash = r.bytes();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return MerkleRoot;
    })();
    commitment.MerklePrefix = (function () {
      function MerklePrefix(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      MerklePrefix.prototype.keyPrefix = $util.newBuffer([]);
      MerklePrefix.create = function create(properties) {
        return new MerklePrefix(properties);
      };
      MerklePrefix.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.keyPrefix != null && Object.hasOwnProperty.call(m, "keyPrefix"))
          w.uint32(10).bytes(m.keyPrefix);
        return w;
      };
      MerklePrefix.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.commitment.MerklePrefix();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.keyPrefix = r.bytes();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return MerklePrefix;
    })();
    commitment.MerklePath = (function () {
      function MerklePath(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      MerklePath.prototype.keyPath = null;
      MerklePath.create = function create(properties) {
        return new MerklePath(properties);
      };
      MerklePath.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.keyPath != null && Object.hasOwnProperty.call(m, "keyPath"))
          $root.ibc.commitment.KeyPath.encode(m.keyPath, w.uint32(10).fork()).ldelim();
        return w;
      };
      MerklePath.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.commitment.MerklePath();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.keyPath = $root.ibc.commitment.KeyPath.decode(r, r.uint32());
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return MerklePath;
    })();
    commitment.MerkleProof = (function () {
      function MerkleProof(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      MerkleProof.prototype.proof = null;
      MerkleProof.create = function create(properties) {
        return new MerkleProof(properties);
      };
      MerkleProof.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.proof != null && Object.hasOwnProperty.call(m, "proof"))
          $root.tendermint.crypto.merkle.Proof.encode(m.proof, w.uint32(10).fork()).ldelim();
        return w;
      };
      MerkleProof.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.commitment.MerkleProof();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.proof = $root.tendermint.crypto.merkle.Proof.decode(r, r.uint32());
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return MerkleProof;
    })();
    commitment.KeyPath = (function () {
      function KeyPath(p) {
        this.keys = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      KeyPath.prototype.keys = $util.emptyArray;
      KeyPath.create = function create(properties) {
        return new KeyPath(properties);
      };
      KeyPath.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.keys != null && m.keys.length) {
          for (var i = 0; i < m.keys.length; ++i)
            $root.ibc.commitment.Key.encode(m.keys[i], w.uint32(10).fork()).ldelim();
        }
        return w;
      };
      KeyPath.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.commitment.KeyPath();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              if (!(m.keys && m.keys.length)) m.keys = [];
              m.keys.push($root.ibc.commitment.Key.decode(r, r.uint32()));
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return KeyPath;
    })();
    commitment.Key = (function () {
      function Key(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      Key.prototype.name = $util.newBuffer([]);
      Key.prototype.enc = 0;
      Key.create = function create(properties) {
        return new Key(properties);
      };
      Key.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.name != null && Object.hasOwnProperty.call(m, "name")) w.uint32(10).bytes(m.name);
        if (m.enc != null && Object.hasOwnProperty.call(m, "enc")) w.uint32(16).int32(m.enc);
        return w;
      };
      Key.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.commitment.Key();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.name = r.bytes();
              break;
            case 2:
              m.enc = r.int32();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return Key;
    })();
    commitment.KeyEncoding = (function () {
      const valuesById = {},
        values = Object.create(valuesById);
      values[(valuesById[0] = "KEY_ENCODING_URL_UNSPECIFIED")] = 0;
      values[(valuesById[1] = "KEY_ENCODING_HEX")] = 1;
      return values;
    })();
    return commitment;
  })();
  ibc.connection = (function () {
    const connection = {};
    connection.MsgConnectionOpenInit = (function () {
      function MsgConnectionOpenInit(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      MsgConnectionOpenInit.prototype.clientId = "";
      MsgConnectionOpenInit.prototype.connectionId = "";
      MsgConnectionOpenInit.prototype.counterparty = null;
      MsgConnectionOpenInit.prototype.signer = $util.newBuffer([]);
      MsgConnectionOpenInit.create = function create(properties) {
        return new MsgConnectionOpenInit(properties);
      };
      MsgConnectionOpenInit.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.clientId != null && Object.hasOwnProperty.call(m, "clientId")) w.uint32(10).string(m.clientId);
        if (m.connectionId != null && Object.hasOwnProperty.call(m, "connectionId"))
          w.uint32(18).string(m.connectionId);
        if (m.counterparty != null && Object.hasOwnProperty.call(m, "counterparty"))
          $root.ibc.connection.Counterparty.encode(m.counterparty, w.uint32(26).fork()).ldelim();
        if (m.signer != null && Object.hasOwnProperty.call(m, "signer")) w.uint32(34).bytes(m.signer);
        return w;
      };
      MsgConnectionOpenInit.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.connection.MsgConnectionOpenInit();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.clientId = r.string();
              break;
            case 2:
              m.connectionId = r.string();
              break;
            case 3:
              m.counterparty = $root.ibc.connection.Counterparty.decode(r, r.uint32());
              break;
            case 4:
              m.signer = r.bytes();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return MsgConnectionOpenInit;
    })();
    connection.MsgConnectionOpenTry = (function () {
      function MsgConnectionOpenTry(p) {
        this.counterpartyVersions = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      MsgConnectionOpenTry.prototype.clientId = "";
      MsgConnectionOpenTry.prototype.connectionId = "";
      MsgConnectionOpenTry.prototype.counterparty = null;
      MsgConnectionOpenTry.prototype.counterpartyVersions = $util.emptyArray;
      MsgConnectionOpenTry.prototype.proofInit = $util.newBuffer([]);
      MsgConnectionOpenTry.prototype.proofHeight = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      MsgConnectionOpenTry.prototype.proofConsensus = $util.newBuffer([]);
      MsgConnectionOpenTry.prototype.consensusHeight = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      MsgConnectionOpenTry.prototype.signer = $util.newBuffer([]);
      MsgConnectionOpenTry.create = function create(properties) {
        return new MsgConnectionOpenTry(properties);
      };
      MsgConnectionOpenTry.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.clientId != null && Object.hasOwnProperty.call(m, "clientId")) w.uint32(10).string(m.clientId);
        if (m.connectionId != null && Object.hasOwnProperty.call(m, "connectionId"))
          w.uint32(18).string(m.connectionId);
        if (m.counterparty != null && Object.hasOwnProperty.call(m, "counterparty"))
          $root.ibc.connection.Counterparty.encode(m.counterparty, w.uint32(26).fork()).ldelim();
        if (m.counterpartyVersions != null && m.counterpartyVersions.length) {
          for (var i = 0; i < m.counterpartyVersions.length; ++i)
            w.uint32(34).string(m.counterpartyVersions[i]);
        }
        if (m.proofInit != null && Object.hasOwnProperty.call(m, "proofInit"))
          w.uint32(42).bytes(m.proofInit);
        if (m.proofHeight != null && Object.hasOwnProperty.call(m, "proofHeight"))
          w.uint32(48).uint64(m.proofHeight);
        if (m.proofConsensus != null && Object.hasOwnProperty.call(m, "proofConsensus"))
          w.uint32(58).bytes(m.proofConsensus);
        if (m.consensusHeight != null && Object.hasOwnProperty.call(m, "consensusHeight"))
          w.uint32(64).uint64(m.consensusHeight);
        if (m.signer != null && Object.hasOwnProperty.call(m, "signer")) w.uint32(74).bytes(m.signer);
        return w;
      };
      MsgConnectionOpenTry.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.connection.MsgConnectionOpenTry();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.clientId = r.string();
              break;
            case 2:
              m.connectionId = r.string();
              break;
            case 3:
              m.counterparty = $root.ibc.connection.Counterparty.decode(r, r.uint32());
              break;
            case 4:
              if (!(m.counterpartyVersions && m.counterpartyVersions.length)) m.counterpartyVersions = [];
              m.counterpartyVersions.push(r.string());
              break;
            case 5:
              m.proofInit = r.bytes();
              break;
            case 6:
              m.proofHeight = r.uint64();
              break;
            case 7:
              m.proofConsensus = r.bytes();
              break;
            case 8:
              m.consensusHeight = r.uint64();
              break;
            case 9:
              m.signer = r.bytes();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return MsgConnectionOpenTry;
    })();
    connection.MsgConnectionOpenAck = (function () {
      function MsgConnectionOpenAck(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      MsgConnectionOpenAck.prototype.connectionId = "";
      MsgConnectionOpenAck.prototype.version = "";
      MsgConnectionOpenAck.prototype.proofTry = $util.newBuffer([]);
      MsgConnectionOpenAck.prototype.proofHeight = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      MsgConnectionOpenAck.prototype.proofConsensus = $util.newBuffer([]);
      MsgConnectionOpenAck.prototype.consensusHeight = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      MsgConnectionOpenAck.prototype.signer = $util.newBuffer([]);
      MsgConnectionOpenAck.create = function create(properties) {
        return new MsgConnectionOpenAck(properties);
      };
      MsgConnectionOpenAck.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.connectionId != null && Object.hasOwnProperty.call(m, "connectionId"))
          w.uint32(10).string(m.connectionId);
        if (m.version != null && Object.hasOwnProperty.call(m, "version")) w.uint32(18).string(m.version);
        if (m.proofTry != null && Object.hasOwnProperty.call(m, "proofTry")) w.uint32(26).bytes(m.proofTry);
        if (m.proofHeight != null && Object.hasOwnProperty.call(m, "proofHeight"))
          w.uint32(32).uint64(m.proofHeight);
        if (m.proofConsensus != null && Object.hasOwnProperty.call(m, "proofConsensus"))
          w.uint32(42).bytes(m.proofConsensus);
        if (m.consensusHeight != null && Object.hasOwnProperty.call(m, "consensusHeight"))
          w.uint32(48).uint64(m.consensusHeight);
        if (m.signer != null && Object.hasOwnProperty.call(m, "signer")) w.uint32(58).bytes(m.signer);
        return w;
      };
      MsgConnectionOpenAck.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.connection.MsgConnectionOpenAck();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.connectionId = r.string();
              break;
            case 2:
              m.version = r.string();
              break;
            case 3:
              m.proofTry = r.bytes();
              break;
            case 4:
              m.proofHeight = r.uint64();
              break;
            case 5:
              m.proofConsensus = r.bytes();
              break;
            case 6:
              m.consensusHeight = r.uint64();
              break;
            case 7:
              m.signer = r.bytes();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return MsgConnectionOpenAck;
    })();
    connection.MsgConnectionOpenConfirm = (function () {
      function MsgConnectionOpenConfirm(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      MsgConnectionOpenConfirm.prototype.connectionId = "";
      MsgConnectionOpenConfirm.prototype.proofAck = $util.newBuffer([]);
      MsgConnectionOpenConfirm.prototype.proofHeight = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      MsgConnectionOpenConfirm.prototype.signer = $util.newBuffer([]);
      MsgConnectionOpenConfirm.create = function create(properties) {
        return new MsgConnectionOpenConfirm(properties);
      };
      MsgConnectionOpenConfirm.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.connectionId != null && Object.hasOwnProperty.call(m, "connectionId"))
          w.uint32(10).string(m.connectionId);
        if (m.proofAck != null && Object.hasOwnProperty.call(m, "proofAck")) w.uint32(18).bytes(m.proofAck);
        if (m.proofHeight != null && Object.hasOwnProperty.call(m, "proofHeight"))
          w.uint32(24).uint64(m.proofHeight);
        if (m.signer != null && Object.hasOwnProperty.call(m, "signer")) w.uint32(34).bytes(m.signer);
        return w;
      };
      MsgConnectionOpenConfirm.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.connection.MsgConnectionOpenConfirm();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.connectionId = r.string();
              break;
            case 2:
              m.proofAck = r.bytes();
              break;
            case 3:
              m.proofHeight = r.uint64();
              break;
            case 4:
              m.signer = r.bytes();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return MsgConnectionOpenConfirm;
    })();
    connection.ConnectionEnd = (function () {
      function ConnectionEnd(p) {
        this.versions = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      ConnectionEnd.prototype.clientId = "";
      ConnectionEnd.prototype.versions = $util.emptyArray;
      ConnectionEnd.prototype.state = 0;
      ConnectionEnd.prototype.counterparty = null;
      ConnectionEnd.create = function create(properties) {
        return new ConnectionEnd(properties);
      };
      ConnectionEnd.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.clientId != null && Object.hasOwnProperty.call(m, "clientId")) w.uint32(10).string(m.clientId);
        if (m.versions != null && m.versions.length) {
          for (var i = 0; i < m.versions.length; ++i) w.uint32(18).string(m.versions[i]);
        }
        if (m.state != null && Object.hasOwnProperty.call(m, "state")) w.uint32(24).int32(m.state);
        if (m.counterparty != null && Object.hasOwnProperty.call(m, "counterparty"))
          $root.ibc.connection.Counterparty.encode(m.counterparty, w.uint32(34).fork()).ldelim();
        return w;
      };
      ConnectionEnd.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.connection.ConnectionEnd();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.clientId = r.string();
              break;
            case 2:
              if (!(m.versions && m.versions.length)) m.versions = [];
              m.versions.push(r.string());
              break;
            case 3:
              m.state = r.int32();
              break;
            case 4:
              m.counterparty = $root.ibc.connection.Counterparty.decode(r, r.uint32());
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return ConnectionEnd;
    })();
    connection.IdentifiedConnection = (function () {
      function IdentifiedConnection(p) {
        this.versions = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      IdentifiedConnection.prototype.id = "";
      IdentifiedConnection.prototype.clientId = "";
      IdentifiedConnection.prototype.versions = $util.emptyArray;
      IdentifiedConnection.prototype.state = 0;
      IdentifiedConnection.prototype.counterparty = null;
      IdentifiedConnection.create = function create(properties) {
        return new IdentifiedConnection(properties);
      };
      IdentifiedConnection.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.id != null && Object.hasOwnProperty.call(m, "id")) w.uint32(10).string(m.id);
        if (m.clientId != null && Object.hasOwnProperty.call(m, "clientId")) w.uint32(18).string(m.clientId);
        if (m.versions != null && m.versions.length) {
          for (var i = 0; i < m.versions.length; ++i) w.uint32(26).string(m.versions[i]);
        }
        if (m.state != null && Object.hasOwnProperty.call(m, "state")) w.uint32(32).int32(m.state);
        if (m.counterparty != null && Object.hasOwnProperty.call(m, "counterparty"))
          $root.ibc.connection.Counterparty.encode(m.counterparty, w.uint32(42).fork()).ldelim();
        return w;
      };
      IdentifiedConnection.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.connection.IdentifiedConnection();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.id = r.string();
              break;
            case 2:
              m.clientId = r.string();
              break;
            case 3:
              if (!(m.versions && m.versions.length)) m.versions = [];
              m.versions.push(r.string());
              break;
            case 4:
              m.state = r.int32();
              break;
            case 5:
              m.counterparty = $root.ibc.connection.Counterparty.decode(r, r.uint32());
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return IdentifiedConnection;
    })();
    connection.State = (function () {
      const valuesById = {},
        values = Object.create(valuesById);
      values[(valuesById[0] = "STATE_UNINITIALIZED_UNSPECIFIED")] = 0;
      values[(valuesById[1] = "STATE_INIT")] = 1;
      values[(valuesById[2] = "STATE_TRYOPEN")] = 2;
      values[(valuesById[3] = "STATE_OPEN")] = 3;
      return values;
    })();
    connection.Counterparty = (function () {
      function Counterparty(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      Counterparty.prototype.clientId = "";
      Counterparty.prototype.connectionId = "";
      Counterparty.prototype.prefix = null;
      Counterparty.create = function create(properties) {
        return new Counterparty(properties);
      };
      Counterparty.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.clientId != null && Object.hasOwnProperty.call(m, "clientId")) w.uint32(10).string(m.clientId);
        if (m.connectionId != null && Object.hasOwnProperty.call(m, "connectionId"))
          w.uint32(18).string(m.connectionId);
        if (m.prefix != null && Object.hasOwnProperty.call(m, "prefix"))
          $root.ibc.commitment.MerklePrefix.encode(m.prefix, w.uint32(26).fork()).ldelim();
        return w;
      };
      Counterparty.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.connection.Counterparty();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.clientId = r.string();
              break;
            case 2:
              m.connectionId = r.string();
              break;
            case 3:
              m.prefix = $root.ibc.commitment.MerklePrefix.decode(r, r.uint32());
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return Counterparty;
    })();
    connection.ClientPaths = (function () {
      function ClientPaths(p) {
        this.paths = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      ClientPaths.prototype.paths = $util.emptyArray;
      ClientPaths.create = function create(properties) {
        return new ClientPaths(properties);
      };
      ClientPaths.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.paths != null && m.paths.length) {
          for (var i = 0; i < m.paths.length; ++i) w.uint32(10).string(m.paths[i]);
        }
        return w;
      };
      ClientPaths.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.connection.ClientPaths();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              if (!(m.paths && m.paths.length)) m.paths = [];
              m.paths.push(r.string());
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return ClientPaths;
    })();
    connection.ConnectionPaths = (function () {
      function ConnectionPaths(p) {
        this.paths = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      ConnectionPaths.prototype.clientId = "";
      ConnectionPaths.prototype.paths = $util.emptyArray;
      ConnectionPaths.create = function create(properties) {
        return new ConnectionPaths(properties);
      };
      ConnectionPaths.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.clientId != null && Object.hasOwnProperty.call(m, "clientId")) w.uint32(10).string(m.clientId);
        if (m.paths != null && m.paths.length) {
          for (var i = 0; i < m.paths.length; ++i) w.uint32(18).string(m.paths[i]);
        }
        return w;
      };
      ConnectionPaths.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.connection.ConnectionPaths();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.clientId = r.string();
              break;
            case 2:
              if (!(m.paths && m.paths.length)) m.paths = [];
              m.paths.push(r.string());
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return ConnectionPaths;
    })();
    connection.Version = (function () {
      function Version(p) {
        this.features = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      Version.prototype.identifier = "";
      Version.prototype.features = $util.emptyArray;
      Version.create = function create(properties) {
        return new Version(properties);
      };
      Version.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.identifier != null && Object.hasOwnProperty.call(m, "identifier"))
          w.uint32(10).string(m.identifier);
        if (m.features != null && m.features.length) {
          for (var i = 0; i < m.features.length; ++i) w.uint32(18).string(m.features[i]);
        }
        return w;
      };
      Version.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.connection.Version();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.identifier = r.string();
              break;
            case 2:
              if (!(m.features && m.features.length)) m.features = [];
              m.features.push(r.string());
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return Version;
    })();
    connection.Query = (function () {
      function Query(rpcImpl, requestDelimited, responseDelimited) {
        $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
      }
      (Query.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = Query;
      Query.create = function create(rpcImpl, requestDelimited, responseDelimited) {
        return new this(rpcImpl, requestDelimited, responseDelimited);
      };
      Object.defineProperty(
        (Query.prototype.connection = function connection(request, callback) {
          return this.rpcCall(
            connection,
            $root.ibc.connection.QueryConnectionRequest,
            $root.ibc.connection.QueryConnectionResponse,
            request,
            callback,
          );
        }),
        "name",
        { value: "Connection" },
      );
      Object.defineProperty(
        (Query.prototype.connections = function connections(request, callback) {
          return this.rpcCall(
            connections,
            $root.ibc.connection.QueryConnectionsRequest,
            $root.ibc.connection.QueryConnectionsResponse,
            request,
            callback,
          );
        }),
        "name",
        { value: "Connections" },
      );
      Object.defineProperty(
        (Query.prototype.clientConnections = function clientConnections(request, callback) {
          return this.rpcCall(
            clientConnections,
            $root.ibc.connection.QueryClientConnectionsRequest,
            $root.ibc.connection.QueryClientConnectionsResponse,
            request,
            callback,
          );
        }),
        "name",
        { value: "ClientConnections" },
      );
      return Query;
    })();
    connection.QueryConnectionRequest = (function () {
      function QueryConnectionRequest(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      QueryConnectionRequest.prototype.connectionId = "";
      QueryConnectionRequest.create = function create(properties) {
        return new QueryConnectionRequest(properties);
      };
      QueryConnectionRequest.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.connectionId != null && Object.hasOwnProperty.call(m, "connectionId"))
          w.uint32(10).string(m.connectionId);
        return w;
      };
      QueryConnectionRequest.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.connection.QueryConnectionRequest();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.connectionId = r.string();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return QueryConnectionRequest;
    })();
    connection.QueryConnectionResponse = (function () {
      function QueryConnectionResponse(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      QueryConnectionResponse.prototype.connection = null;
      QueryConnectionResponse.prototype.proof = $util.newBuffer([]);
      QueryConnectionResponse.prototype.proofPath = "";
      QueryConnectionResponse.prototype.proofHeight = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      QueryConnectionResponse.create = function create(properties) {
        return new QueryConnectionResponse(properties);
      };
      QueryConnectionResponse.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.connection != null && Object.hasOwnProperty.call(m, "connection"))
          $root.ibc.connection.ConnectionEnd.encode(m.connection, w.uint32(10).fork()).ldelim();
        if (m.proof != null && Object.hasOwnProperty.call(m, "proof")) w.uint32(18).bytes(m.proof);
        if (m.proofPath != null && Object.hasOwnProperty.call(m, "proofPath"))
          w.uint32(26).string(m.proofPath);
        if (m.proofHeight != null && Object.hasOwnProperty.call(m, "proofHeight"))
          w.uint32(32).uint64(m.proofHeight);
        return w;
      };
      QueryConnectionResponse.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.connection.QueryConnectionResponse();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.connection = $root.ibc.connection.ConnectionEnd.decode(r, r.uint32());
              break;
            case 2:
              m.proof = r.bytes();
              break;
            case 3:
              m.proofPath = r.string();
              break;
            case 4:
              m.proofHeight = r.uint64();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return QueryConnectionResponse;
    })();
    connection.QueryConnectionsRequest = (function () {
      function QueryConnectionsRequest(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      QueryConnectionsRequest.prototype.pagination = null;
      QueryConnectionsRequest.create = function create(properties) {
        return new QueryConnectionsRequest(properties);
      };
      QueryConnectionsRequest.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.pagination != null && Object.hasOwnProperty.call(m, "pagination"))
          $root.cosmos.query.PageRequest.encode(m.pagination, w.uint32(10).fork()).ldelim();
        return w;
      };
      QueryConnectionsRequest.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.connection.QueryConnectionsRequest();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.pagination = $root.cosmos.query.PageRequest.decode(r, r.uint32());
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return QueryConnectionsRequest;
    })();
    connection.QueryConnectionsResponse = (function () {
      function QueryConnectionsResponse(p) {
        this.connections = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      QueryConnectionsResponse.prototype.connections = $util.emptyArray;
      QueryConnectionsResponse.prototype.pagination = null;
      QueryConnectionsResponse.prototype.height = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      QueryConnectionsResponse.create = function create(properties) {
        return new QueryConnectionsResponse(properties);
      };
      QueryConnectionsResponse.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.connections != null && m.connections.length) {
          for (var i = 0; i < m.connections.length; ++i)
            $root.ibc.connection.IdentifiedConnection.encode(m.connections[i], w.uint32(10).fork()).ldelim();
        }
        if (m.pagination != null && Object.hasOwnProperty.call(m, "pagination"))
          $root.cosmos.query.PageResponse.encode(m.pagination, w.uint32(18).fork()).ldelim();
        if (m.height != null && Object.hasOwnProperty.call(m, "height")) w.uint32(24).int64(m.height);
        return w;
      };
      QueryConnectionsResponse.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.connection.QueryConnectionsResponse();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              if (!(m.connections && m.connections.length)) m.connections = [];
              m.connections.push($root.ibc.connection.IdentifiedConnection.decode(r, r.uint32()));
              break;
            case 2:
              m.pagination = $root.cosmos.query.PageResponse.decode(r, r.uint32());
              break;
            case 3:
              m.height = r.int64();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return QueryConnectionsResponse;
    })();
    connection.QueryClientConnectionsRequest = (function () {
      function QueryClientConnectionsRequest(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      QueryClientConnectionsRequest.prototype.clientId = "";
      QueryClientConnectionsRequest.create = function create(properties) {
        return new QueryClientConnectionsRequest(properties);
      };
      QueryClientConnectionsRequest.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.clientId != null && Object.hasOwnProperty.call(m, "clientId")) w.uint32(10).string(m.clientId);
        return w;
      };
      QueryClientConnectionsRequest.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.connection.QueryClientConnectionsRequest();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.clientId = r.string();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return QueryClientConnectionsRequest;
    })();
    connection.QueryClientConnectionsResponse = (function () {
      function QueryClientConnectionsResponse(p) {
        this.connectionPaths = [];
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      QueryClientConnectionsResponse.prototype.connectionPaths = $util.emptyArray;
      QueryClientConnectionsResponse.prototype.proof = $util.newBuffer([]);
      QueryClientConnectionsResponse.prototype.proofPath = "";
      QueryClientConnectionsResponse.prototype.proofHeight = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      QueryClientConnectionsResponse.create = function create(properties) {
        return new QueryClientConnectionsResponse(properties);
      };
      QueryClientConnectionsResponse.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.connectionPaths != null && m.connectionPaths.length) {
          for (var i = 0; i < m.connectionPaths.length; ++i) w.uint32(10).string(m.connectionPaths[i]);
        }
        if (m.proof != null && Object.hasOwnProperty.call(m, "proof")) w.uint32(18).bytes(m.proof);
        if (m.proofPath != null && Object.hasOwnProperty.call(m, "proofPath"))
          w.uint32(26).string(m.proofPath);
        if (m.proofHeight != null && Object.hasOwnProperty.call(m, "proofHeight"))
          w.uint32(32).uint64(m.proofHeight);
        return w;
      };
      QueryClientConnectionsResponse.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.ibc.connection.QueryClientConnectionsResponse();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              if (!(m.connectionPaths && m.connectionPaths.length)) m.connectionPaths = [];
              m.connectionPaths.push(r.string());
              break;
            case 2:
              m.proof = r.bytes();
              break;
            case 3:
              m.proofPath = r.string();
              break;
            case 4:
              m.proofHeight = r.uint64();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return QueryClientConnectionsResponse;
    })();
    return connection;
  })();
  return ibc;
})();
exports.tendermint = $root.tendermint = (() => {
  const tendermint = {};
  tendermint.abci = (function () {
    const abci = {};
    abci.types = (function () {
      const types = {};
      types.Request = (function () {
        function Request(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        Request.prototype.echo = null;
        Request.prototype.flush = null;
        Request.prototype.info = null;
        Request.prototype.setOption = null;
        Request.prototype.initChain = null;
        Request.prototype.query = null;
        Request.prototype.beginBlock = null;
        Request.prototype.checkTx = null;
        Request.prototype.deliverTx = null;
        Request.prototype.endBlock = null;
        Request.prototype.commit = null;
        let $oneOfFields;
        Object.defineProperty(Request.prototype, "value", {
          get: $util.oneOfGetter(
            ($oneOfFields = [
              "echo",
              "flush",
              "info",
              "setOption",
              "initChain",
              "query",
              "beginBlock",
              "checkTx",
              "deliverTx",
              "endBlock",
              "commit",
            ]),
          ),
          set: $util.oneOfSetter($oneOfFields),
        });
        Request.create = function create(properties) {
          return new Request(properties);
        };
        Request.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.echo != null && Object.hasOwnProperty.call(m, "echo"))
            $root.tendermint.abci.types.RequestEcho.encode(m.echo, w.uint32(18).fork()).ldelim();
          if (m.flush != null && Object.hasOwnProperty.call(m, "flush"))
            $root.tendermint.abci.types.RequestFlush.encode(m.flush, w.uint32(26).fork()).ldelim();
          if (m.info != null && Object.hasOwnProperty.call(m, "info"))
            $root.tendermint.abci.types.RequestInfo.encode(m.info, w.uint32(34).fork()).ldelim();
          if (m.setOption != null && Object.hasOwnProperty.call(m, "setOption"))
            $root.tendermint.abci.types.RequestSetOption.encode(m.setOption, w.uint32(42).fork()).ldelim();
          if (m.initChain != null && Object.hasOwnProperty.call(m, "initChain"))
            $root.tendermint.abci.types.RequestInitChain.encode(m.initChain, w.uint32(50).fork()).ldelim();
          if (m.query != null && Object.hasOwnProperty.call(m, "query"))
            $root.tendermint.abci.types.RequestQuery.encode(m.query, w.uint32(58).fork()).ldelim();
          if (m.beginBlock != null && Object.hasOwnProperty.call(m, "beginBlock"))
            $root.tendermint.abci.types.RequestBeginBlock.encode(m.beginBlock, w.uint32(66).fork()).ldelim();
          if (m.checkTx != null && Object.hasOwnProperty.call(m, "checkTx"))
            $root.tendermint.abci.types.RequestCheckTx.encode(m.checkTx, w.uint32(74).fork()).ldelim();
          if (m.endBlock != null && Object.hasOwnProperty.call(m, "endBlock"))
            $root.tendermint.abci.types.RequestEndBlock.encode(m.endBlock, w.uint32(90).fork()).ldelim();
          if (m.commit != null && Object.hasOwnProperty.call(m, "commit"))
            $root.tendermint.abci.types.RequestCommit.encode(m.commit, w.uint32(98).fork()).ldelim();
          if (m.deliverTx != null && Object.hasOwnProperty.call(m, "deliverTx"))
            $root.tendermint.abci.types.RequestDeliverTx.encode(m.deliverTx, w.uint32(154).fork()).ldelim();
          return w;
        };
        Request.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.Request();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 2:
                m.echo = $root.tendermint.abci.types.RequestEcho.decode(r, r.uint32());
                break;
              case 3:
                m.flush = $root.tendermint.abci.types.RequestFlush.decode(r, r.uint32());
                break;
              case 4:
                m.info = $root.tendermint.abci.types.RequestInfo.decode(r, r.uint32());
                break;
              case 5:
                m.setOption = $root.tendermint.abci.types.RequestSetOption.decode(r, r.uint32());
                break;
              case 6:
                m.initChain = $root.tendermint.abci.types.RequestInitChain.decode(r, r.uint32());
                break;
              case 7:
                m.query = $root.tendermint.abci.types.RequestQuery.decode(r, r.uint32());
                break;
              case 8:
                m.beginBlock = $root.tendermint.abci.types.RequestBeginBlock.decode(r, r.uint32());
                break;
              case 9:
                m.checkTx = $root.tendermint.abci.types.RequestCheckTx.decode(r, r.uint32());
                break;
              case 19:
                m.deliverTx = $root.tendermint.abci.types.RequestDeliverTx.decode(r, r.uint32());
                break;
              case 11:
                m.endBlock = $root.tendermint.abci.types.RequestEndBlock.decode(r, r.uint32());
                break;
              case 12:
                m.commit = $root.tendermint.abci.types.RequestCommit.decode(r, r.uint32());
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return Request;
      })();
      types.RequestEcho = (function () {
        function RequestEcho(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        RequestEcho.prototype.message = "";
        RequestEcho.create = function create(properties) {
          return new RequestEcho(properties);
        };
        RequestEcho.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.message != null && Object.hasOwnProperty.call(m, "message")) w.uint32(10).string(m.message);
          return w;
        };
        RequestEcho.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.RequestEcho();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.message = r.string();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return RequestEcho;
      })();
      types.RequestFlush = (function () {
        function RequestFlush(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        RequestFlush.create = function create(properties) {
          return new RequestFlush(properties);
        };
        RequestFlush.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          return w;
        };
        RequestFlush.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.RequestFlush();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return RequestFlush;
      })();
      types.RequestInfo = (function () {
        function RequestInfo(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        RequestInfo.prototype.version = "";
        RequestInfo.prototype.blockVersion = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        RequestInfo.prototype.p2pVersion = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        RequestInfo.create = function create(properties) {
          return new RequestInfo(properties);
        };
        RequestInfo.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.version != null && Object.hasOwnProperty.call(m, "version")) w.uint32(10).string(m.version);
          if (m.blockVersion != null && Object.hasOwnProperty.call(m, "blockVersion"))
            w.uint32(16).uint64(m.blockVersion);
          if (m.p2pVersion != null && Object.hasOwnProperty.call(m, "p2pVersion"))
            w.uint32(24).uint64(m.p2pVersion);
          return w;
        };
        RequestInfo.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.RequestInfo();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.version = r.string();
                break;
              case 2:
                m.blockVersion = r.uint64();
                break;
              case 3:
                m.p2pVersion = r.uint64();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return RequestInfo;
      })();
      types.RequestSetOption = (function () {
        function RequestSetOption(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        RequestSetOption.prototype.key = "";
        RequestSetOption.prototype.value = "";
        RequestSetOption.create = function create(properties) {
          return new RequestSetOption(properties);
        };
        RequestSetOption.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.key != null && Object.hasOwnProperty.call(m, "key")) w.uint32(10).string(m.key);
          if (m.value != null && Object.hasOwnProperty.call(m, "value")) w.uint32(18).string(m.value);
          return w;
        };
        RequestSetOption.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.RequestSetOption();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.key = r.string();
                break;
              case 2:
                m.value = r.string();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return RequestSetOption;
      })();
      types.RequestInitChain = (function () {
        function RequestInitChain(p) {
          this.validators = [];
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        RequestInitChain.prototype.time = null;
        RequestInitChain.prototype.chainId = "";
        RequestInitChain.prototype.consensusParams = null;
        RequestInitChain.prototype.validators = $util.emptyArray;
        RequestInitChain.prototype.appStateBytes = $util.newBuffer([]);
        RequestInitChain.create = function create(properties) {
          return new RequestInitChain(properties);
        };
        RequestInitChain.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.time != null && Object.hasOwnProperty.call(m, "time"))
            $root.google.protobuf.Timestamp.encode(m.time, w.uint32(10).fork()).ldelim();
          if (m.chainId != null && Object.hasOwnProperty.call(m, "chainId")) w.uint32(18).string(m.chainId);
          if (m.consensusParams != null && Object.hasOwnProperty.call(m, "consensusParams"))
            $root.tendermint.abci.types.ConsensusParams.encode(
              m.consensusParams,
              w.uint32(26).fork(),
            ).ldelim();
          if (m.validators != null && m.validators.length) {
            for (var i = 0; i < m.validators.length; ++i)
              $root.tendermint.abci.types.ValidatorUpdate.encode(
                m.validators[i],
                w.uint32(34).fork(),
              ).ldelim();
          }
          if (m.appStateBytes != null && Object.hasOwnProperty.call(m, "appStateBytes"))
            w.uint32(42).bytes(m.appStateBytes);
          return w;
        };
        RequestInitChain.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.RequestInitChain();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.time = $root.google.protobuf.Timestamp.decode(r, r.uint32());
                break;
              case 2:
                m.chainId = r.string();
                break;
              case 3:
                m.consensusParams = $root.tendermint.abci.types.ConsensusParams.decode(r, r.uint32());
                break;
              case 4:
                if (!(m.validators && m.validators.length)) m.validators = [];
                m.validators.push($root.tendermint.abci.types.ValidatorUpdate.decode(r, r.uint32()));
                break;
              case 5:
                m.appStateBytes = r.bytes();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return RequestInitChain;
      })();
      types.RequestQuery = (function () {
        function RequestQuery(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        RequestQuery.prototype.data = $util.newBuffer([]);
        RequestQuery.prototype.path = "";
        RequestQuery.prototype.height = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
        RequestQuery.prototype.prove = false;
        RequestQuery.create = function create(properties) {
          return new RequestQuery(properties);
        };
        RequestQuery.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.data != null && Object.hasOwnProperty.call(m, "data")) w.uint32(10).bytes(m.data);
          if (m.path != null && Object.hasOwnProperty.call(m, "path")) w.uint32(18).string(m.path);
          if (m.height != null && Object.hasOwnProperty.call(m, "height")) w.uint32(24).int64(m.height);
          if (m.prove != null && Object.hasOwnProperty.call(m, "prove")) w.uint32(32).bool(m.prove);
          return w;
        };
        RequestQuery.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.RequestQuery();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.data = r.bytes();
                break;
              case 2:
                m.path = r.string();
                break;
              case 3:
                m.height = r.int64();
                break;
              case 4:
                m.prove = r.bool();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return RequestQuery;
      })();
      types.RequestBeginBlock = (function () {
        function RequestBeginBlock(p) {
          this.byzantineValidators = [];
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        RequestBeginBlock.prototype.hash = $util.newBuffer([]);
        RequestBeginBlock.prototype.header = null;
        RequestBeginBlock.prototype.lastCommitInfo = null;
        RequestBeginBlock.prototype.byzantineValidators = $util.emptyArray;
        RequestBeginBlock.create = function create(properties) {
          return new RequestBeginBlock(properties);
        };
        RequestBeginBlock.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.hash != null && Object.hasOwnProperty.call(m, "hash")) w.uint32(10).bytes(m.hash);
          if (m.header != null && Object.hasOwnProperty.call(m, "header"))
            $root.tendermint.abci.types.Header.encode(m.header, w.uint32(18).fork()).ldelim();
          if (m.lastCommitInfo != null && Object.hasOwnProperty.call(m, "lastCommitInfo"))
            $root.tendermint.abci.types.LastCommitInfo.encode(m.lastCommitInfo, w.uint32(26).fork()).ldelim();
          if (m.byzantineValidators != null && m.byzantineValidators.length) {
            for (var i = 0; i < m.byzantineValidators.length; ++i)
              $root.tendermint.abci.types.Evidence.encode(
                m.byzantineValidators[i],
                w.uint32(34).fork(),
              ).ldelim();
          }
          return w;
        };
        RequestBeginBlock.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.RequestBeginBlock();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.hash = r.bytes();
                break;
              case 2:
                m.header = $root.tendermint.abci.types.Header.decode(r, r.uint32());
                break;
              case 3:
                m.lastCommitInfo = $root.tendermint.abci.types.LastCommitInfo.decode(r, r.uint32());
                break;
              case 4:
                if (!(m.byzantineValidators && m.byzantineValidators.length)) m.byzantineValidators = [];
                m.byzantineValidators.push($root.tendermint.abci.types.Evidence.decode(r, r.uint32()));
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return RequestBeginBlock;
      })();
      types.CheckTxType = (function () {
        const valuesById = {},
          values = Object.create(valuesById);
        values[(valuesById[0] = "New")] = 0;
        values[(valuesById[1] = "Recheck")] = 1;
        return values;
      })();
      types.RequestCheckTx = (function () {
        function RequestCheckTx(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        RequestCheckTx.prototype.tx = $util.newBuffer([]);
        RequestCheckTx.prototype.type = 0;
        RequestCheckTx.create = function create(properties) {
          return new RequestCheckTx(properties);
        };
        RequestCheckTx.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.tx != null && Object.hasOwnProperty.call(m, "tx")) w.uint32(10).bytes(m.tx);
          if (m.type != null && Object.hasOwnProperty.call(m, "type")) w.uint32(16).int32(m.type);
          return w;
        };
        RequestCheckTx.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.RequestCheckTx();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.tx = r.bytes();
                break;
              case 2:
                m.type = r.int32();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return RequestCheckTx;
      })();
      types.RequestDeliverTx = (function () {
        function RequestDeliverTx(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        RequestDeliverTx.prototype.tx = $util.newBuffer([]);
        RequestDeliverTx.create = function create(properties) {
          return new RequestDeliverTx(properties);
        };
        RequestDeliverTx.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.tx != null && Object.hasOwnProperty.call(m, "tx")) w.uint32(10).bytes(m.tx);
          return w;
        };
        RequestDeliverTx.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.RequestDeliverTx();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.tx = r.bytes();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return RequestDeliverTx;
      })();
      types.RequestEndBlock = (function () {
        function RequestEndBlock(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        RequestEndBlock.prototype.height = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
        RequestEndBlock.create = function create(properties) {
          return new RequestEndBlock(properties);
        };
        RequestEndBlock.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.height != null && Object.hasOwnProperty.call(m, "height")) w.uint32(8).int64(m.height);
          return w;
        };
        RequestEndBlock.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.RequestEndBlock();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.height = r.int64();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return RequestEndBlock;
      })();
      types.RequestCommit = (function () {
        function RequestCommit(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        RequestCommit.create = function create(properties) {
          return new RequestCommit(properties);
        };
        RequestCommit.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          return w;
        };
        RequestCommit.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.RequestCommit();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return RequestCommit;
      })();
      types.Response = (function () {
        function Response(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        Response.prototype.exception = null;
        Response.prototype.echo = null;
        Response.prototype.flush = null;
        Response.prototype.info = null;
        Response.prototype.setOption = null;
        Response.prototype.initChain = null;
        Response.prototype.query = null;
        Response.prototype.beginBlock = null;
        Response.prototype.checkTx = null;
        Response.prototype.deliverTx = null;
        Response.prototype.endBlock = null;
        Response.prototype.commit = null;
        let $oneOfFields;
        Object.defineProperty(Response.prototype, "value", {
          get: $util.oneOfGetter(
            ($oneOfFields = [
              "exception",
              "echo",
              "flush",
              "info",
              "setOption",
              "initChain",
              "query",
              "beginBlock",
              "checkTx",
              "deliverTx",
              "endBlock",
              "commit",
            ]),
          ),
          set: $util.oneOfSetter($oneOfFields),
        });
        Response.create = function create(properties) {
          return new Response(properties);
        };
        Response.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.exception != null && Object.hasOwnProperty.call(m, "exception"))
            $root.tendermint.abci.types.ResponseException.encode(m.exception, w.uint32(10).fork()).ldelim();
          if (m.echo != null && Object.hasOwnProperty.call(m, "echo"))
            $root.tendermint.abci.types.ResponseEcho.encode(m.echo, w.uint32(18).fork()).ldelim();
          if (m.flush != null && Object.hasOwnProperty.call(m, "flush"))
            $root.tendermint.abci.types.ResponseFlush.encode(m.flush, w.uint32(26).fork()).ldelim();
          if (m.info != null && Object.hasOwnProperty.call(m, "info"))
            $root.tendermint.abci.types.ResponseInfo.encode(m.info, w.uint32(34).fork()).ldelim();
          if (m.setOption != null && Object.hasOwnProperty.call(m, "setOption"))
            $root.tendermint.abci.types.ResponseSetOption.encode(m.setOption, w.uint32(42).fork()).ldelim();
          if (m.initChain != null && Object.hasOwnProperty.call(m, "initChain"))
            $root.tendermint.abci.types.ResponseInitChain.encode(m.initChain, w.uint32(50).fork()).ldelim();
          if (m.query != null && Object.hasOwnProperty.call(m, "query"))
            $root.tendermint.abci.types.ResponseQuery.encode(m.query, w.uint32(58).fork()).ldelim();
          if (m.beginBlock != null && Object.hasOwnProperty.call(m, "beginBlock"))
            $root.tendermint.abci.types.ResponseBeginBlock.encode(m.beginBlock, w.uint32(66).fork()).ldelim();
          if (m.checkTx != null && Object.hasOwnProperty.call(m, "checkTx"))
            $root.tendermint.abci.types.ResponseCheckTx.encode(m.checkTx, w.uint32(74).fork()).ldelim();
          if (m.deliverTx != null && Object.hasOwnProperty.call(m, "deliverTx"))
            $root.tendermint.abci.types.ResponseDeliverTx.encode(m.deliverTx, w.uint32(82).fork()).ldelim();
          if (m.endBlock != null && Object.hasOwnProperty.call(m, "endBlock"))
            $root.tendermint.abci.types.ResponseEndBlock.encode(m.endBlock, w.uint32(90).fork()).ldelim();
          if (m.commit != null && Object.hasOwnProperty.call(m, "commit"))
            $root.tendermint.abci.types.ResponseCommit.encode(m.commit, w.uint32(98).fork()).ldelim();
          return w;
        };
        Response.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.Response();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.exception = $root.tendermint.abci.types.ResponseException.decode(r, r.uint32());
                break;
              case 2:
                m.echo = $root.tendermint.abci.types.ResponseEcho.decode(r, r.uint32());
                break;
              case 3:
                m.flush = $root.tendermint.abci.types.ResponseFlush.decode(r, r.uint32());
                break;
              case 4:
                m.info = $root.tendermint.abci.types.ResponseInfo.decode(r, r.uint32());
                break;
              case 5:
                m.setOption = $root.tendermint.abci.types.ResponseSetOption.decode(r, r.uint32());
                break;
              case 6:
                m.initChain = $root.tendermint.abci.types.ResponseInitChain.decode(r, r.uint32());
                break;
              case 7:
                m.query = $root.tendermint.abci.types.ResponseQuery.decode(r, r.uint32());
                break;
              case 8:
                m.beginBlock = $root.tendermint.abci.types.ResponseBeginBlock.decode(r, r.uint32());
                break;
              case 9:
                m.checkTx = $root.tendermint.abci.types.ResponseCheckTx.decode(r, r.uint32());
                break;
              case 10:
                m.deliverTx = $root.tendermint.abci.types.ResponseDeliverTx.decode(r, r.uint32());
                break;
              case 11:
                m.endBlock = $root.tendermint.abci.types.ResponseEndBlock.decode(r, r.uint32());
                break;
              case 12:
                m.commit = $root.tendermint.abci.types.ResponseCommit.decode(r, r.uint32());
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return Response;
      })();
      types.ResponseException = (function () {
        function ResponseException(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        ResponseException.prototype.error = "";
        ResponseException.create = function create(properties) {
          return new ResponseException(properties);
        };
        ResponseException.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.error != null && Object.hasOwnProperty.call(m, "error")) w.uint32(10).string(m.error);
          return w;
        };
        ResponseException.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.ResponseException();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.error = r.string();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return ResponseException;
      })();
      types.ResponseEcho = (function () {
        function ResponseEcho(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        ResponseEcho.prototype.message = "";
        ResponseEcho.create = function create(properties) {
          return new ResponseEcho(properties);
        };
        ResponseEcho.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.message != null && Object.hasOwnProperty.call(m, "message")) w.uint32(10).string(m.message);
          return w;
        };
        ResponseEcho.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.ResponseEcho();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.message = r.string();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return ResponseEcho;
      })();
      types.ResponseFlush = (function () {
        function ResponseFlush(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        ResponseFlush.create = function create(properties) {
          return new ResponseFlush(properties);
        };
        ResponseFlush.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          return w;
        };
        ResponseFlush.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.ResponseFlush();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return ResponseFlush;
      })();
      types.ResponseInfo = (function () {
        function ResponseInfo(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        ResponseInfo.prototype.data = "";
        ResponseInfo.prototype.version = "";
        ResponseInfo.prototype.appVersion = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        ResponseInfo.prototype.lastBlockHeight = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
        ResponseInfo.prototype.lastBlockAppHash = $util.newBuffer([]);
        ResponseInfo.create = function create(properties) {
          return new ResponseInfo(properties);
        };
        ResponseInfo.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.data != null && Object.hasOwnProperty.call(m, "data")) w.uint32(10).string(m.data);
          if (m.version != null && Object.hasOwnProperty.call(m, "version")) w.uint32(18).string(m.version);
          if (m.appVersion != null && Object.hasOwnProperty.call(m, "appVersion"))
            w.uint32(24).uint64(m.appVersion);
          if (m.lastBlockHeight != null && Object.hasOwnProperty.call(m, "lastBlockHeight"))
            w.uint32(32).int64(m.lastBlockHeight);
          if (m.lastBlockAppHash != null && Object.hasOwnProperty.call(m, "lastBlockAppHash"))
            w.uint32(42).bytes(m.lastBlockAppHash);
          return w;
        };
        ResponseInfo.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.ResponseInfo();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.data = r.string();
                break;
              case 2:
                m.version = r.string();
                break;
              case 3:
                m.appVersion = r.uint64();
                break;
              case 4:
                m.lastBlockHeight = r.int64();
                break;
              case 5:
                m.lastBlockAppHash = r.bytes();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return ResponseInfo;
      })();
      types.ResponseSetOption = (function () {
        function ResponseSetOption(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        ResponseSetOption.prototype.code = 0;
        ResponseSetOption.prototype.log = "";
        ResponseSetOption.prototype.info = "";
        ResponseSetOption.create = function create(properties) {
          return new ResponseSetOption(properties);
        };
        ResponseSetOption.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.code != null && Object.hasOwnProperty.call(m, "code")) w.uint32(8).uint32(m.code);
          if (m.log != null && Object.hasOwnProperty.call(m, "log")) w.uint32(26).string(m.log);
          if (m.info != null && Object.hasOwnProperty.call(m, "info")) w.uint32(34).string(m.info);
          return w;
        };
        ResponseSetOption.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.ResponseSetOption();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.code = r.uint32();
                break;
              case 3:
                m.log = r.string();
                break;
              case 4:
                m.info = r.string();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return ResponseSetOption;
      })();
      types.ResponseInitChain = (function () {
        function ResponseInitChain(p) {
          this.validators = [];
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        ResponseInitChain.prototype.consensusParams = null;
        ResponseInitChain.prototype.validators = $util.emptyArray;
        ResponseInitChain.create = function create(properties) {
          return new ResponseInitChain(properties);
        };
        ResponseInitChain.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.consensusParams != null && Object.hasOwnProperty.call(m, "consensusParams"))
            $root.tendermint.abci.types.ConsensusParams.encode(
              m.consensusParams,
              w.uint32(10).fork(),
            ).ldelim();
          if (m.validators != null && m.validators.length) {
            for (var i = 0; i < m.validators.length; ++i)
              $root.tendermint.abci.types.ValidatorUpdate.encode(
                m.validators[i],
                w.uint32(18).fork(),
              ).ldelim();
          }
          return w;
        };
        ResponseInitChain.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.ResponseInitChain();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.consensusParams = $root.tendermint.abci.types.ConsensusParams.decode(r, r.uint32());
                break;
              case 2:
                if (!(m.validators && m.validators.length)) m.validators = [];
                m.validators.push($root.tendermint.abci.types.ValidatorUpdate.decode(r, r.uint32()));
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return ResponseInitChain;
      })();
      types.ResponseQuery = (function () {
        function ResponseQuery(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        ResponseQuery.prototype.code = 0;
        ResponseQuery.prototype.log = "";
        ResponseQuery.prototype.info = "";
        ResponseQuery.prototype.index = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
        ResponseQuery.prototype.key = $util.newBuffer([]);
        ResponseQuery.prototype.value = $util.newBuffer([]);
        ResponseQuery.prototype.proof = null;
        ResponseQuery.prototype.height = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
        ResponseQuery.prototype.codespace = "";
        ResponseQuery.create = function create(properties) {
          return new ResponseQuery(properties);
        };
        ResponseQuery.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.code != null && Object.hasOwnProperty.call(m, "code")) w.uint32(8).uint32(m.code);
          if (m.log != null && Object.hasOwnProperty.call(m, "log")) w.uint32(26).string(m.log);
          if (m.info != null && Object.hasOwnProperty.call(m, "info")) w.uint32(34).string(m.info);
          if (m.index != null && Object.hasOwnProperty.call(m, "index")) w.uint32(40).int64(m.index);
          if (m.key != null && Object.hasOwnProperty.call(m, "key")) w.uint32(50).bytes(m.key);
          if (m.value != null && Object.hasOwnProperty.call(m, "value")) w.uint32(58).bytes(m.value);
          if (m.proof != null && Object.hasOwnProperty.call(m, "proof"))
            $root.tendermint.crypto.merkle.Proof.encode(m.proof, w.uint32(66).fork()).ldelim();
          if (m.height != null && Object.hasOwnProperty.call(m, "height")) w.uint32(72).int64(m.height);
          if (m.codespace != null && Object.hasOwnProperty.call(m, "codespace"))
            w.uint32(82).string(m.codespace);
          return w;
        };
        ResponseQuery.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.ResponseQuery();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.code = r.uint32();
                break;
              case 3:
                m.log = r.string();
                break;
              case 4:
                m.info = r.string();
                break;
              case 5:
                m.index = r.int64();
                break;
              case 6:
                m.key = r.bytes();
                break;
              case 7:
                m.value = r.bytes();
                break;
              case 8:
                m.proof = $root.tendermint.crypto.merkle.Proof.decode(r, r.uint32());
                break;
              case 9:
                m.height = r.int64();
                break;
              case 10:
                m.codespace = r.string();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return ResponseQuery;
      })();
      types.ResponseBeginBlock = (function () {
        function ResponseBeginBlock(p) {
          this.events = [];
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        ResponseBeginBlock.prototype.events = $util.emptyArray;
        ResponseBeginBlock.create = function create(properties) {
          return new ResponseBeginBlock(properties);
        };
        ResponseBeginBlock.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.events != null && m.events.length) {
            for (var i = 0; i < m.events.length; ++i)
              $root.tendermint.abci.types.Event.encode(m.events[i], w.uint32(10).fork()).ldelim();
          }
          return w;
        };
        ResponseBeginBlock.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.ResponseBeginBlock();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                if (!(m.events && m.events.length)) m.events = [];
                m.events.push($root.tendermint.abci.types.Event.decode(r, r.uint32()));
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return ResponseBeginBlock;
      })();
      types.ResponseCheckTx = (function () {
        function ResponseCheckTx(p) {
          this.events = [];
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        ResponseCheckTx.prototype.code = 0;
        ResponseCheckTx.prototype.data = $util.newBuffer([]);
        ResponseCheckTx.prototype.log = "";
        ResponseCheckTx.prototype.info = "";
        ResponseCheckTx.prototype.gasWanted = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
        ResponseCheckTx.prototype.gasUsed = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
        ResponseCheckTx.prototype.events = $util.emptyArray;
        ResponseCheckTx.prototype.codespace = "";
        ResponseCheckTx.create = function create(properties) {
          return new ResponseCheckTx(properties);
        };
        ResponseCheckTx.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.code != null && Object.hasOwnProperty.call(m, "code")) w.uint32(8).uint32(m.code);
          if (m.data != null && Object.hasOwnProperty.call(m, "data")) w.uint32(18).bytes(m.data);
          if (m.log != null && Object.hasOwnProperty.call(m, "log")) w.uint32(26).string(m.log);
          if (m.info != null && Object.hasOwnProperty.call(m, "info")) w.uint32(34).string(m.info);
          if (m.gasWanted != null && Object.hasOwnProperty.call(m, "gasWanted"))
            w.uint32(40).int64(m.gasWanted);
          if (m.gasUsed != null && Object.hasOwnProperty.call(m, "gasUsed")) w.uint32(48).int64(m.gasUsed);
          if (m.events != null && m.events.length) {
            for (var i = 0; i < m.events.length; ++i)
              $root.tendermint.abci.types.Event.encode(m.events[i], w.uint32(58).fork()).ldelim();
          }
          if (m.codespace != null && Object.hasOwnProperty.call(m, "codespace"))
            w.uint32(66).string(m.codespace);
          return w;
        };
        ResponseCheckTx.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.ResponseCheckTx();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.code = r.uint32();
                break;
              case 2:
                m.data = r.bytes();
                break;
              case 3:
                m.log = r.string();
                break;
              case 4:
                m.info = r.string();
                break;
              case 5:
                m.gasWanted = r.int64();
                break;
              case 6:
                m.gasUsed = r.int64();
                break;
              case 7:
                if (!(m.events && m.events.length)) m.events = [];
                m.events.push($root.tendermint.abci.types.Event.decode(r, r.uint32()));
                break;
              case 8:
                m.codespace = r.string();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return ResponseCheckTx;
      })();
      types.ResponseDeliverTx = (function () {
        function ResponseDeliverTx(p) {
          this.events = [];
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        ResponseDeliverTx.prototype.code = 0;
        ResponseDeliverTx.prototype.data = $util.newBuffer([]);
        ResponseDeliverTx.prototype.log = "";
        ResponseDeliverTx.prototype.info = "";
        ResponseDeliverTx.prototype.gasWanted = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
        ResponseDeliverTx.prototype.gasUsed = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
        ResponseDeliverTx.prototype.events = $util.emptyArray;
        ResponseDeliverTx.prototype.codespace = "";
        ResponseDeliverTx.create = function create(properties) {
          return new ResponseDeliverTx(properties);
        };
        ResponseDeliverTx.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.code != null && Object.hasOwnProperty.call(m, "code")) w.uint32(8).uint32(m.code);
          if (m.data != null && Object.hasOwnProperty.call(m, "data")) w.uint32(18).bytes(m.data);
          if (m.log != null && Object.hasOwnProperty.call(m, "log")) w.uint32(26).string(m.log);
          if (m.info != null && Object.hasOwnProperty.call(m, "info")) w.uint32(34).string(m.info);
          if (m.gasWanted != null && Object.hasOwnProperty.call(m, "gasWanted"))
            w.uint32(40).int64(m.gasWanted);
          if (m.gasUsed != null && Object.hasOwnProperty.call(m, "gasUsed")) w.uint32(48).int64(m.gasUsed);
          if (m.events != null && m.events.length) {
            for (var i = 0; i < m.events.length; ++i)
              $root.tendermint.abci.types.Event.encode(m.events[i], w.uint32(58).fork()).ldelim();
          }
          if (m.codespace != null && Object.hasOwnProperty.call(m, "codespace"))
            w.uint32(66).string(m.codespace);
          return w;
        };
        ResponseDeliverTx.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.ResponseDeliverTx();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.code = r.uint32();
                break;
              case 2:
                m.data = r.bytes();
                break;
              case 3:
                m.log = r.string();
                break;
              case 4:
                m.info = r.string();
                break;
              case 5:
                m.gasWanted = r.int64();
                break;
              case 6:
                m.gasUsed = r.int64();
                break;
              case 7:
                if (!(m.events && m.events.length)) m.events = [];
                m.events.push($root.tendermint.abci.types.Event.decode(r, r.uint32()));
                break;
              case 8:
                m.codespace = r.string();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return ResponseDeliverTx;
      })();
      types.ResponseEndBlock = (function () {
        function ResponseEndBlock(p) {
          this.validatorUpdates = [];
          this.events = [];
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        ResponseEndBlock.prototype.validatorUpdates = $util.emptyArray;
        ResponseEndBlock.prototype.consensusParamUpdates = null;
        ResponseEndBlock.prototype.events = $util.emptyArray;
        ResponseEndBlock.create = function create(properties) {
          return new ResponseEndBlock(properties);
        };
        ResponseEndBlock.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.validatorUpdates != null && m.validatorUpdates.length) {
            for (var i = 0; i < m.validatorUpdates.length; ++i)
              $root.tendermint.abci.types.ValidatorUpdate.encode(
                m.validatorUpdates[i],
                w.uint32(10).fork(),
              ).ldelim();
          }
          if (m.consensusParamUpdates != null && Object.hasOwnProperty.call(m, "consensusParamUpdates"))
            $root.tendermint.abci.types.ConsensusParams.encode(
              m.consensusParamUpdates,
              w.uint32(18).fork(),
            ).ldelim();
          if (m.events != null && m.events.length) {
            for (var i = 0; i < m.events.length; ++i)
              $root.tendermint.abci.types.Event.encode(m.events[i], w.uint32(26).fork()).ldelim();
          }
          return w;
        };
        ResponseEndBlock.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.ResponseEndBlock();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                if (!(m.validatorUpdates && m.validatorUpdates.length)) m.validatorUpdates = [];
                m.validatorUpdates.push($root.tendermint.abci.types.ValidatorUpdate.decode(r, r.uint32()));
                break;
              case 2:
                m.consensusParamUpdates = $root.tendermint.abci.types.ConsensusParams.decode(r, r.uint32());
                break;
              case 3:
                if (!(m.events && m.events.length)) m.events = [];
                m.events.push($root.tendermint.abci.types.Event.decode(r, r.uint32()));
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return ResponseEndBlock;
      })();
      types.ResponseCommit = (function () {
        function ResponseCommit(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        ResponseCommit.prototype.data = $util.newBuffer([]);
        ResponseCommit.create = function create(properties) {
          return new ResponseCommit(properties);
        };
        ResponseCommit.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.data != null && Object.hasOwnProperty.call(m, "data")) w.uint32(18).bytes(m.data);
          return w;
        };
        ResponseCommit.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.ResponseCommit();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
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
        return ResponseCommit;
      })();
      types.ConsensusParams = (function () {
        function ConsensusParams(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        ConsensusParams.prototype.block = null;
        ConsensusParams.prototype.evidence = null;
        ConsensusParams.prototype.validator = null;
        ConsensusParams.create = function create(properties) {
          return new ConsensusParams(properties);
        };
        ConsensusParams.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.block != null && Object.hasOwnProperty.call(m, "block"))
            $root.tendermint.abci.types.BlockParams.encode(m.block, w.uint32(10).fork()).ldelim();
          if (m.evidence != null && Object.hasOwnProperty.call(m, "evidence"))
            $root.tendermint.abci.types.EvidenceParams.encode(m.evidence, w.uint32(18).fork()).ldelim();
          if (m.validator != null && Object.hasOwnProperty.call(m, "validator"))
            $root.tendermint.abci.types.ValidatorParams.encode(m.validator, w.uint32(26).fork()).ldelim();
          return w;
        };
        ConsensusParams.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.ConsensusParams();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.block = $root.tendermint.abci.types.BlockParams.decode(r, r.uint32());
                break;
              case 2:
                m.evidence = $root.tendermint.abci.types.EvidenceParams.decode(r, r.uint32());
                break;
              case 3:
                m.validator = $root.tendermint.abci.types.ValidatorParams.decode(r, r.uint32());
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return ConsensusParams;
      })();
      types.BlockParams = (function () {
        function BlockParams(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        BlockParams.prototype.maxBytes = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
        BlockParams.prototype.maxGas = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
        BlockParams.create = function create(properties) {
          return new BlockParams(properties);
        };
        BlockParams.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.maxBytes != null && Object.hasOwnProperty.call(m, "maxBytes")) w.uint32(8).int64(m.maxBytes);
          if (m.maxGas != null && Object.hasOwnProperty.call(m, "maxGas")) w.uint32(16).int64(m.maxGas);
          return w;
        };
        BlockParams.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.BlockParams();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.maxBytes = r.int64();
                break;
              case 2:
                m.maxGas = r.int64();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return BlockParams;
      })();
      types.EvidenceParams = (function () {
        function EvidenceParams(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        EvidenceParams.prototype.maxAgeNumBlocks = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
        EvidenceParams.prototype.maxAgeDuration = null;
        EvidenceParams.create = function create(properties) {
          return new EvidenceParams(properties);
        };
        EvidenceParams.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.maxAgeNumBlocks != null && Object.hasOwnProperty.call(m, "maxAgeNumBlocks"))
            w.uint32(8).int64(m.maxAgeNumBlocks);
          if (m.maxAgeDuration != null && Object.hasOwnProperty.call(m, "maxAgeDuration"))
            $root.google.protobuf.Duration.encode(m.maxAgeDuration, w.uint32(18).fork()).ldelim();
          return w;
        };
        EvidenceParams.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.EvidenceParams();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.maxAgeNumBlocks = r.int64();
                break;
              case 2:
                m.maxAgeDuration = $root.google.protobuf.Duration.decode(r, r.uint32());
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return EvidenceParams;
      })();
      types.ValidatorParams = (function () {
        function ValidatorParams(p) {
          this.pubKeyTypes = [];
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        ValidatorParams.prototype.pubKeyTypes = $util.emptyArray;
        ValidatorParams.create = function create(properties) {
          return new ValidatorParams(properties);
        };
        ValidatorParams.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.pubKeyTypes != null && m.pubKeyTypes.length) {
            for (var i = 0; i < m.pubKeyTypes.length; ++i) w.uint32(10).string(m.pubKeyTypes[i]);
          }
          return w;
        };
        ValidatorParams.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.ValidatorParams();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                if (!(m.pubKeyTypes && m.pubKeyTypes.length)) m.pubKeyTypes = [];
                m.pubKeyTypes.push(r.string());
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return ValidatorParams;
      })();
      types.LastCommitInfo = (function () {
        function LastCommitInfo(p) {
          this.votes = [];
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        LastCommitInfo.prototype.round = 0;
        LastCommitInfo.prototype.votes = $util.emptyArray;
        LastCommitInfo.create = function create(properties) {
          return new LastCommitInfo(properties);
        };
        LastCommitInfo.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.round != null && Object.hasOwnProperty.call(m, "round")) w.uint32(8).int32(m.round);
          if (m.votes != null && m.votes.length) {
            for (var i = 0; i < m.votes.length; ++i)
              $root.tendermint.abci.types.VoteInfo.encode(m.votes[i], w.uint32(18).fork()).ldelim();
          }
          return w;
        };
        LastCommitInfo.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.LastCommitInfo();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.round = r.int32();
                break;
              case 2:
                if (!(m.votes && m.votes.length)) m.votes = [];
                m.votes.push($root.tendermint.abci.types.VoteInfo.decode(r, r.uint32()));
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return LastCommitInfo;
      })();
      types.Event = (function () {
        function Event(p) {
          this.attributes = [];
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        Event.prototype.type = "";
        Event.prototype.attributes = $util.emptyArray;
        Event.create = function create(properties) {
          return new Event(properties);
        };
        Event.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.type != null && Object.hasOwnProperty.call(m, "type")) w.uint32(10).string(m.type);
          if (m.attributes != null && m.attributes.length) {
            for (var i = 0; i < m.attributes.length; ++i)
              $root.tendermint.libs.kv.Pair.encode(m.attributes[i], w.uint32(18).fork()).ldelim();
          }
          return w;
        };
        Event.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.Event();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.type = r.string();
                break;
              case 2:
                if (!(m.attributes && m.attributes.length)) m.attributes = [];
                m.attributes.push($root.tendermint.libs.kv.Pair.decode(r, r.uint32()));
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return Event;
      })();
      types.Header = (function () {
        function Header(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        Header.prototype.version = null;
        Header.prototype.chainId = "";
        Header.prototype.height = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
        Header.prototype.time = null;
        Header.prototype.lastBlockId = null;
        Header.prototype.lastCommitHash = $util.newBuffer([]);
        Header.prototype.dataHash = $util.newBuffer([]);
        Header.prototype.validatorsHash = $util.newBuffer([]);
        Header.prototype.nextValidatorsHash = $util.newBuffer([]);
        Header.prototype.consensusHash = $util.newBuffer([]);
        Header.prototype.appHash = $util.newBuffer([]);
        Header.prototype.lastResultsHash = $util.newBuffer([]);
        Header.prototype.evidenceHash = $util.newBuffer([]);
        Header.prototype.proposerAddress = $util.newBuffer([]);
        Header.create = function create(properties) {
          return new Header(properties);
        };
        Header.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.version != null && Object.hasOwnProperty.call(m, "version"))
            $root.tendermint.abci.types.Version.encode(m.version, w.uint32(10).fork()).ldelim();
          if (m.chainId != null && Object.hasOwnProperty.call(m, "chainId")) w.uint32(18).string(m.chainId);
          if (m.height != null && Object.hasOwnProperty.call(m, "height")) w.uint32(24).int64(m.height);
          if (m.time != null && Object.hasOwnProperty.call(m, "time"))
            $root.google.protobuf.Timestamp.encode(m.time, w.uint32(34).fork()).ldelim();
          if (m.lastBlockId != null && Object.hasOwnProperty.call(m, "lastBlockId"))
            $root.tendermint.abci.types.BlockID.encode(m.lastBlockId, w.uint32(42).fork()).ldelim();
          if (m.lastCommitHash != null && Object.hasOwnProperty.call(m, "lastCommitHash"))
            w.uint32(50).bytes(m.lastCommitHash);
          if (m.dataHash != null && Object.hasOwnProperty.call(m, "dataHash")) w.uint32(58).bytes(m.dataHash);
          if (m.validatorsHash != null && Object.hasOwnProperty.call(m, "validatorsHash"))
            w.uint32(66).bytes(m.validatorsHash);
          if (m.nextValidatorsHash != null && Object.hasOwnProperty.call(m, "nextValidatorsHash"))
            w.uint32(74).bytes(m.nextValidatorsHash);
          if (m.consensusHash != null && Object.hasOwnProperty.call(m, "consensusHash"))
            w.uint32(82).bytes(m.consensusHash);
          if (m.appHash != null && Object.hasOwnProperty.call(m, "appHash")) w.uint32(90).bytes(m.appHash);
          if (m.lastResultsHash != null && Object.hasOwnProperty.call(m, "lastResultsHash"))
            w.uint32(98).bytes(m.lastResultsHash);
          if (m.evidenceHash != null && Object.hasOwnProperty.call(m, "evidenceHash"))
            w.uint32(106).bytes(m.evidenceHash);
          if (m.proposerAddress != null && Object.hasOwnProperty.call(m, "proposerAddress"))
            w.uint32(114).bytes(m.proposerAddress);
          return w;
        };
        Header.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.Header();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.version = $root.tendermint.abci.types.Version.decode(r, r.uint32());
                break;
              case 2:
                m.chainId = r.string();
                break;
              case 3:
                m.height = r.int64();
                break;
              case 4:
                m.time = $root.google.protobuf.Timestamp.decode(r, r.uint32());
                break;
              case 5:
                m.lastBlockId = $root.tendermint.abci.types.BlockID.decode(r, r.uint32());
                break;
              case 6:
                m.lastCommitHash = r.bytes();
                break;
              case 7:
                m.dataHash = r.bytes();
                break;
              case 8:
                m.validatorsHash = r.bytes();
                break;
              case 9:
                m.nextValidatorsHash = r.bytes();
                break;
              case 10:
                m.consensusHash = r.bytes();
                break;
              case 11:
                m.appHash = r.bytes();
                break;
              case 12:
                m.lastResultsHash = r.bytes();
                break;
              case 13:
                m.evidenceHash = r.bytes();
                break;
              case 14:
                m.proposerAddress = r.bytes();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return Header;
      })();
      types.Version = (function () {
        function Version(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        Version.prototype.Block = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        Version.prototype.App = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        Version.create = function create(properties) {
          return new Version(properties);
        };
        Version.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.Block != null && Object.hasOwnProperty.call(m, "Block")) w.uint32(8).uint64(m.Block);
          if (m.App != null && Object.hasOwnProperty.call(m, "App")) w.uint32(16).uint64(m.App);
          return w;
        };
        Version.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.Version();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.Block = r.uint64();
                break;
              case 2:
                m.App = r.uint64();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return Version;
      })();
      types.BlockID = (function () {
        function BlockID(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        BlockID.prototype.hash = $util.newBuffer([]);
        BlockID.prototype.partsHeader = null;
        BlockID.create = function create(properties) {
          return new BlockID(properties);
        };
        BlockID.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.hash != null && Object.hasOwnProperty.call(m, "hash")) w.uint32(10).bytes(m.hash);
          if (m.partsHeader != null && Object.hasOwnProperty.call(m, "partsHeader"))
            $root.tendermint.abci.types.PartSetHeader.encode(m.partsHeader, w.uint32(18).fork()).ldelim();
          return w;
        };
        BlockID.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.BlockID();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.hash = r.bytes();
                break;
              case 2:
                m.partsHeader = $root.tendermint.abci.types.PartSetHeader.decode(r, r.uint32());
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return BlockID;
      })();
      types.PartSetHeader = (function () {
        function PartSetHeader(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        PartSetHeader.prototype.total = 0;
        PartSetHeader.prototype.hash = $util.newBuffer([]);
        PartSetHeader.create = function create(properties) {
          return new PartSetHeader(properties);
        };
        PartSetHeader.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.total != null && Object.hasOwnProperty.call(m, "total")) w.uint32(8).int32(m.total);
          if (m.hash != null && Object.hasOwnProperty.call(m, "hash")) w.uint32(18).bytes(m.hash);
          return w;
        };
        PartSetHeader.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.PartSetHeader();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.total = r.int32();
                break;
              case 2:
                m.hash = r.bytes();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return PartSetHeader;
      })();
      types.Validator = (function () {
        function Validator(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        Validator.prototype.address = $util.newBuffer([]);
        Validator.prototype.power = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
        Validator.create = function create(properties) {
          return new Validator(properties);
        };
        Validator.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.address != null && Object.hasOwnProperty.call(m, "address")) w.uint32(10).bytes(m.address);
          if (m.power != null && Object.hasOwnProperty.call(m, "power")) w.uint32(24).int64(m.power);
          return w;
        };
        Validator.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.Validator();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.address = r.bytes();
                break;
              case 3:
                m.power = r.int64();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return Validator;
      })();
      types.ValidatorUpdate = (function () {
        function ValidatorUpdate(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        ValidatorUpdate.prototype.pubKey = null;
        ValidatorUpdate.prototype.power = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
        ValidatorUpdate.create = function create(properties) {
          return new ValidatorUpdate(properties);
        };
        ValidatorUpdate.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.pubKey != null && Object.hasOwnProperty.call(m, "pubKey"))
            $root.tendermint.abci.types.PubKey.encode(m.pubKey, w.uint32(10).fork()).ldelim();
          if (m.power != null && Object.hasOwnProperty.call(m, "power")) w.uint32(16).int64(m.power);
          return w;
        };
        ValidatorUpdate.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.ValidatorUpdate();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.pubKey = $root.tendermint.abci.types.PubKey.decode(r, r.uint32());
                break;
              case 2:
                m.power = r.int64();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return ValidatorUpdate;
      })();
      types.VoteInfo = (function () {
        function VoteInfo(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        VoteInfo.prototype.validator = null;
        VoteInfo.prototype.signedLastBlock = false;
        VoteInfo.create = function create(properties) {
          return new VoteInfo(properties);
        };
        VoteInfo.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.validator != null && Object.hasOwnProperty.call(m, "validator"))
            $root.tendermint.abci.types.Validator.encode(m.validator, w.uint32(10).fork()).ldelim();
          if (m.signedLastBlock != null && Object.hasOwnProperty.call(m, "signedLastBlock"))
            w.uint32(16).bool(m.signedLastBlock);
          return w;
        };
        VoteInfo.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.VoteInfo();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.validator = $root.tendermint.abci.types.Validator.decode(r, r.uint32());
                break;
              case 2:
                m.signedLastBlock = r.bool();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return VoteInfo;
      })();
      types.PubKey = (function () {
        function PubKey(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        PubKey.prototype.type = "";
        PubKey.prototype.data = $util.newBuffer([]);
        PubKey.create = function create(properties) {
          return new PubKey(properties);
        };
        PubKey.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.type != null && Object.hasOwnProperty.call(m, "type")) w.uint32(10).string(m.type);
          if (m.data != null && Object.hasOwnProperty.call(m, "data")) w.uint32(18).bytes(m.data);
          return w;
        };
        PubKey.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.PubKey();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.type = r.string();
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
        return PubKey;
      })();
      types.Evidence = (function () {
        function Evidence(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        Evidence.prototype.type = "";
        Evidence.prototype.validator = null;
        Evidence.prototype.height = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
        Evidence.prototype.time = null;
        Evidence.prototype.totalVotingPower = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
        Evidence.create = function create(properties) {
          return new Evidence(properties);
        };
        Evidence.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.type != null && Object.hasOwnProperty.call(m, "type")) w.uint32(10).string(m.type);
          if (m.validator != null && Object.hasOwnProperty.call(m, "validator"))
            $root.tendermint.abci.types.Validator.encode(m.validator, w.uint32(18).fork()).ldelim();
          if (m.height != null && Object.hasOwnProperty.call(m, "height")) w.uint32(24).int64(m.height);
          if (m.time != null && Object.hasOwnProperty.call(m, "time"))
            $root.google.protobuf.Timestamp.encode(m.time, w.uint32(34).fork()).ldelim();
          if (m.totalVotingPower != null && Object.hasOwnProperty.call(m, "totalVotingPower"))
            w.uint32(40).int64(m.totalVotingPower);
          return w;
        };
        Evidence.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.abci.types.Evidence();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.type = r.string();
                break;
              case 2:
                m.validator = $root.tendermint.abci.types.Validator.decode(r, r.uint32());
                break;
              case 3:
                m.height = r.int64();
                break;
              case 4:
                m.time = $root.google.protobuf.Timestamp.decode(r, r.uint32());
                break;
              case 5:
                m.totalVotingPower = r.int64();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return Evidence;
      })();
      types.ABCIApplication = (function () {
        function ABCIApplication(rpcImpl, requestDelimited, responseDelimited) {
          $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
        }
        (ABCIApplication.prototype = Object.create(
          $protobuf.rpc.Service.prototype,
        )).constructor = ABCIApplication;
        ABCIApplication.create = function create(rpcImpl, requestDelimited, responseDelimited) {
          return new this(rpcImpl, requestDelimited, responseDelimited);
        };
        Object.defineProperty(
          (ABCIApplication.prototype.echo = function echo(request, callback) {
            return this.rpcCall(
              echo,
              $root.tendermint.abci.types.RequestEcho,
              $root.tendermint.abci.types.ResponseEcho,
              request,
              callback,
            );
          }),
          "name",
          { value: "Echo" },
        );
        Object.defineProperty(
          (ABCIApplication.prototype.flush = function flush(request, callback) {
            return this.rpcCall(
              flush,
              $root.tendermint.abci.types.RequestFlush,
              $root.tendermint.abci.types.ResponseFlush,
              request,
              callback,
            );
          }),
          "name",
          { value: "Flush" },
        );
        Object.defineProperty(
          (ABCIApplication.prototype.info = function info(request, callback) {
            return this.rpcCall(
              info,
              $root.tendermint.abci.types.RequestInfo,
              $root.tendermint.abci.types.ResponseInfo,
              request,
              callback,
            );
          }),
          "name",
          { value: "Info" },
        );
        Object.defineProperty(
          (ABCIApplication.prototype.setOption = function setOption(request, callback) {
            return this.rpcCall(
              setOption,
              $root.tendermint.abci.types.RequestSetOption,
              $root.tendermint.abci.types.ResponseSetOption,
              request,
              callback,
            );
          }),
          "name",
          { value: "SetOption" },
        );
        Object.defineProperty(
          (ABCIApplication.prototype.deliverTx = function deliverTx(request, callback) {
            return this.rpcCall(
              deliverTx,
              $root.tendermint.abci.types.RequestDeliverTx,
              $root.tendermint.abci.types.ResponseDeliverTx,
              request,
              callback,
            );
          }),
          "name",
          { value: "DeliverTx" },
        );
        Object.defineProperty(
          (ABCIApplication.prototype.checkTx = function checkTx(request, callback) {
            return this.rpcCall(
              checkTx,
              $root.tendermint.abci.types.RequestCheckTx,
              $root.tendermint.abci.types.ResponseCheckTx,
              request,
              callback,
            );
          }),
          "name",
          { value: "CheckTx" },
        );
        Object.defineProperty(
          (ABCIApplication.prototype.query = function query(request, callback) {
            return this.rpcCall(
              query,
              $root.tendermint.abci.types.RequestQuery,
              $root.tendermint.abci.types.ResponseQuery,
              request,
              callback,
            );
          }),
          "name",
          { value: "Query" },
        );
        Object.defineProperty(
          (ABCIApplication.prototype.commit = function commit(request, callback) {
            return this.rpcCall(
              commit,
              $root.tendermint.abci.types.RequestCommit,
              $root.tendermint.abci.types.ResponseCommit,
              request,
              callback,
            );
          }),
          "name",
          { value: "Commit" },
        );
        Object.defineProperty(
          (ABCIApplication.prototype.initChain = function initChain(request, callback) {
            return this.rpcCall(
              initChain,
              $root.tendermint.abci.types.RequestInitChain,
              $root.tendermint.abci.types.ResponseInitChain,
              request,
              callback,
            );
          }),
          "name",
          { value: "InitChain" },
        );
        Object.defineProperty(
          (ABCIApplication.prototype.beginBlock = function beginBlock(request, callback) {
            return this.rpcCall(
              beginBlock,
              $root.tendermint.abci.types.RequestBeginBlock,
              $root.tendermint.abci.types.ResponseBeginBlock,
              request,
              callback,
            );
          }),
          "name",
          { value: "BeginBlock" },
        );
        Object.defineProperty(
          (ABCIApplication.prototype.endBlock = function endBlock(request, callback) {
            return this.rpcCall(
              endBlock,
              $root.tendermint.abci.types.RequestEndBlock,
              $root.tendermint.abci.types.ResponseEndBlock,
              request,
              callback,
            );
          }),
          "name",
          { value: "EndBlock" },
        );
        return ABCIApplication;
      })();
      return types;
    })();
    return abci;
  })();
  tendermint.crypto = (function () {
    const crypto = {};
    crypto.merkle = (function () {
      const merkle = {};
      merkle.ProofOp = (function () {
        function ProofOp(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        ProofOp.prototype.type = "";
        ProofOp.prototype.key = $util.newBuffer([]);
        ProofOp.prototype.data = $util.newBuffer([]);
        ProofOp.create = function create(properties) {
          return new ProofOp(properties);
        };
        ProofOp.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.type != null && Object.hasOwnProperty.call(m, "type")) w.uint32(10).string(m.type);
          if (m.key != null && Object.hasOwnProperty.call(m, "key")) w.uint32(18).bytes(m.key);
          if (m.data != null && Object.hasOwnProperty.call(m, "data")) w.uint32(26).bytes(m.data);
          return w;
        };
        ProofOp.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.crypto.merkle.ProofOp();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.type = r.string();
                break;
              case 2:
                m.key = r.bytes();
                break;
              case 3:
                m.data = r.bytes();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return ProofOp;
      })();
      merkle.Proof = (function () {
        function Proof(p) {
          this.ops = [];
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        Proof.prototype.ops = $util.emptyArray;
        Proof.create = function create(properties) {
          return new Proof(properties);
        };
        Proof.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.ops != null && m.ops.length) {
            for (var i = 0; i < m.ops.length; ++i)
              $root.tendermint.crypto.merkle.ProofOp.encode(m.ops[i], w.uint32(10).fork()).ldelim();
          }
          return w;
        };
        Proof.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.crypto.merkle.Proof();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                if (!(m.ops && m.ops.length)) m.ops = [];
                m.ops.push($root.tendermint.crypto.merkle.ProofOp.decode(r, r.uint32()));
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return Proof;
      })();
      return merkle;
    })();
    return crypto;
  })();
  tendermint.libs = (function () {
    const libs = {};
    libs.kv = (function () {
      const kv = {};
      kv.Pair = (function () {
        function Pair(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        Pair.prototype.key = $util.newBuffer([]);
        Pair.prototype.value = $util.newBuffer([]);
        Pair.create = function create(properties) {
          return new Pair(properties);
        };
        Pair.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.key != null && Object.hasOwnProperty.call(m, "key")) w.uint32(10).bytes(m.key);
          if (m.value != null && Object.hasOwnProperty.call(m, "value")) w.uint32(18).bytes(m.value);
          return w;
        };
        Pair.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.libs.kv.Pair();
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
        return Pair;
      })();
      kv.KI64Pair = (function () {
        function KI64Pair(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        KI64Pair.prototype.key = $util.newBuffer([]);
        KI64Pair.prototype.value = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
        KI64Pair.create = function create(properties) {
          return new KI64Pair(properties);
        };
        KI64Pair.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.key != null && Object.hasOwnProperty.call(m, "key")) w.uint32(10).bytes(m.key);
          if (m.value != null && Object.hasOwnProperty.call(m, "value")) w.uint32(16).int64(m.value);
          return w;
        };
        KI64Pair.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.tendermint.libs.kv.KI64Pair();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.key = r.bytes();
                break;
              case 2:
                m.value = r.int64();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return KI64Pair;
      })();
      return kv;
    })();
    return libs;
  })();
  return tendermint;
})();
exports.google = $root.google = (() => {
  const google = {};
  google.protobuf = (function () {
    const protobuf = {};
    protobuf.Any = (function () {
      function Any(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      Any.prototype.type_url = "";
      Any.prototype.value = $util.newBuffer([]);
      Any.create = function create(properties) {
        return new Any(properties);
      };
      Any.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.type_url != null && Object.hasOwnProperty.call(m, "type_url")) w.uint32(10).string(m.type_url);
        if (m.value != null && Object.hasOwnProperty.call(m, "value")) w.uint32(18).bytes(m.value);
        return w;
      };
      Any.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.google.protobuf.Any();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.type_url = r.string();
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
      return Any;
    })();
    protobuf.Timestamp = (function () {
      function Timestamp(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      Timestamp.prototype.seconds = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      Timestamp.prototype.nanos = 0;
      Timestamp.create = function create(properties) {
        return new Timestamp(properties);
      };
      Timestamp.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.seconds != null && Object.hasOwnProperty.call(m, "seconds")) w.uint32(8).int64(m.seconds);
        if (m.nanos != null && Object.hasOwnProperty.call(m, "nanos")) w.uint32(16).int32(m.nanos);
        return w;
      };
      Timestamp.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.google.protobuf.Timestamp();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.seconds = r.int64();
              break;
            case 2:
              m.nanos = r.int32();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return Timestamp;
    })();
    protobuf.Duration = (function () {
      function Duration(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      Duration.prototype.seconds = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      Duration.prototype.nanos = 0;
      Duration.create = function create(properties) {
        return new Duration(properties);
      };
      Duration.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.seconds != null && Object.hasOwnProperty.call(m, "seconds")) w.uint32(8).int64(m.seconds);
        if (m.nanos != null && Object.hasOwnProperty.call(m, "nanos")) w.uint32(16).int32(m.nanos);
        return w;
      };
      Duration.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.google.protobuf.Duration();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.seconds = r.int64();
              break;
            case 2:
              m.nanos = r.int32();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      return Duration;
    })();
    return protobuf;
  })();
  return google;
})();
module.exports = $root;
