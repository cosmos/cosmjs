"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tendermint = exports.google = exports.cosmos = void 0;
var $protobuf = require("protobufjs/minimal");
const $Reader = $protobuf.Reader,
  $Writer = $protobuf.Writer,
  $util = $protobuf.util;
const $root = {};
exports.cosmos = $root.cosmos = (() => {
  const cosmos = {};
  cosmos.bank = (function () {
    const bank = {};
    bank.v1beta1 = (function () {
      const v1beta1 = {};
      v1beta1.Params = (function () {
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
              $root.cosmos.bank.v1beta1.SendEnabled.encode(m.sendEnabled[i], w.uint32(10).fork()).ldelim();
          }
          if (m.defaultSendEnabled != null && Object.hasOwnProperty.call(m, "defaultSendEnabled"))
            w.uint32(16).bool(m.defaultSendEnabled);
          return w;
        };
        Params.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmos.bank.v1beta1.Params();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                if (!(m.sendEnabled && m.sendEnabled.length)) m.sendEnabled = [];
                m.sendEnabled.push($root.cosmos.bank.v1beta1.SendEnabled.decode(r, r.uint32()));
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
      v1beta1.SendEnabled = (function () {
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
            m = new $root.cosmos.bank.v1beta1.SendEnabled();
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
      v1beta1.Input = (function () {
        function Input(p) {
          this.coins = [];
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        Input.prototype.address = "";
        Input.prototype.coins = $util.emptyArray;
        Input.create = function create(properties) {
          return new Input(properties);
        };
        Input.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.address != null && Object.hasOwnProperty.call(m, "address")) w.uint32(10).string(m.address);
          if (m.coins != null && m.coins.length) {
            for (var i = 0; i < m.coins.length; ++i)
              $root.cosmos.base.v1beta1.Coin.encode(m.coins[i], w.uint32(18).fork()).ldelim();
          }
          return w;
        };
        Input.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmos.bank.v1beta1.Input();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.address = r.string();
                break;
              case 2:
                if (!(m.coins && m.coins.length)) m.coins = [];
                m.coins.push($root.cosmos.base.v1beta1.Coin.decode(r, r.uint32()));
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
      v1beta1.Output = (function () {
        function Output(p) {
          this.coins = [];
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        Output.prototype.address = "";
        Output.prototype.coins = $util.emptyArray;
        Output.create = function create(properties) {
          return new Output(properties);
        };
        Output.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.address != null && Object.hasOwnProperty.call(m, "address")) w.uint32(10).string(m.address);
          if (m.coins != null && m.coins.length) {
            for (var i = 0; i < m.coins.length; ++i)
              $root.cosmos.base.v1beta1.Coin.encode(m.coins[i], w.uint32(18).fork()).ldelim();
          }
          return w;
        };
        Output.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmos.bank.v1beta1.Output();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.address = r.string();
                break;
              case 2:
                if (!(m.coins && m.coins.length)) m.coins = [];
                m.coins.push($root.cosmos.base.v1beta1.Coin.decode(r, r.uint32()));
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
      v1beta1.Supply = (function () {
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
              $root.cosmos.base.v1beta1.Coin.encode(m.total[i], w.uint32(10).fork()).ldelim();
          }
          return w;
        };
        Supply.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmos.bank.v1beta1.Supply();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                if (!(m.total && m.total.length)) m.total = [];
                m.total.push($root.cosmos.base.v1beta1.Coin.decode(r, r.uint32()));
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
      v1beta1.DenomUnit = (function () {
        function DenomUnit(p) {
          this.aliases = [];
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        DenomUnit.prototype.denom = "";
        DenomUnit.prototype.exponent = 0;
        DenomUnit.prototype.aliases = $util.emptyArray;
        DenomUnit.create = function create(properties) {
          return new DenomUnit(properties);
        };
        DenomUnit.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.denom != null && Object.hasOwnProperty.call(m, "denom")) w.uint32(10).string(m.denom);
          if (m.exponent != null && Object.hasOwnProperty.call(m, "exponent"))
            w.uint32(16).uint32(m.exponent);
          if (m.aliases != null && m.aliases.length) {
            for (var i = 0; i < m.aliases.length; ++i) w.uint32(26).string(m.aliases[i]);
          }
          return w;
        };
        DenomUnit.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmos.bank.v1beta1.DenomUnit();
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
        return DenomUnit;
      })();
      v1beta1.Metadata = (function () {
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
              $root.cosmos.bank.v1beta1.DenomUnit.encode(m.denomUnits[i], w.uint32(18).fork()).ldelim();
          }
          if (m.base != null && Object.hasOwnProperty.call(m, "base")) w.uint32(26).string(m.base);
          if (m.display != null && Object.hasOwnProperty.call(m, "display")) w.uint32(34).string(m.display);
          return w;
        };
        Metadata.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmos.bank.v1beta1.Metadata();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.description = r.string();
                break;
              case 2:
                if (!(m.denomUnits && m.denomUnits.length)) m.denomUnits = [];
                m.denomUnits.push($root.cosmos.bank.v1beta1.DenomUnit.decode(r, r.uint32()));
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
      v1beta1.MsgSend = (function () {
        function MsgSend(p) {
          this.amount = [];
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        MsgSend.prototype.fromAddress = "";
        MsgSend.prototype.toAddress = "";
        MsgSend.prototype.amount = $util.emptyArray;
        MsgSend.create = function create(properties) {
          return new MsgSend(properties);
        };
        MsgSend.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.fromAddress != null && Object.hasOwnProperty.call(m, "fromAddress"))
            w.uint32(10).string(m.fromAddress);
          if (m.toAddress != null && Object.hasOwnProperty.call(m, "toAddress"))
            w.uint32(18).string(m.toAddress);
          if (m.amount != null && m.amount.length) {
            for (var i = 0; i < m.amount.length; ++i)
              $root.cosmos.base.v1beta1.Coin.encode(m.amount[i], w.uint32(26).fork()).ldelim();
          }
          return w;
        };
        MsgSend.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmos.bank.v1beta1.MsgSend();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.fromAddress = r.string();
                break;
              case 2:
                m.toAddress = r.string();
                break;
              case 3:
                if (!(m.amount && m.amount.length)) m.amount = [];
                m.amount.push($root.cosmos.base.v1beta1.Coin.decode(r, r.uint32()));
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
      v1beta1.MsgMultiSend = (function () {
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
              $root.cosmos.bank.v1beta1.Input.encode(m.inputs[i], w.uint32(10).fork()).ldelim();
          }
          if (m.outputs != null && m.outputs.length) {
            for (var i = 0; i < m.outputs.length; ++i)
              $root.cosmos.bank.v1beta1.Output.encode(m.outputs[i], w.uint32(18).fork()).ldelim();
          }
          return w;
        };
        MsgMultiSend.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmos.bank.v1beta1.MsgMultiSend();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                if (!(m.inputs && m.inputs.length)) m.inputs = [];
                m.inputs.push($root.cosmos.bank.v1beta1.Input.decode(r, r.uint32()));
                break;
              case 2:
                if (!(m.outputs && m.outputs.length)) m.outputs = [];
                m.outputs.push($root.cosmos.bank.v1beta1.Output.decode(r, r.uint32()));
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
      return v1beta1;
    })();
    return bank;
  })();
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
    return base;
  })();
  cosmos.crypto = (function () {
    const crypto = {};
    crypto.multisig = (function () {
      const multisig = {};
      multisig.v1beta1 = (function () {
        const v1beta1 = {};
        v1beta1.MultiSignature = (function () {
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
              m = new $root.cosmos.crypto.multisig.v1beta1.MultiSignature();
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
        v1beta1.CompactBitArray = (function () {
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
              m = new $root.cosmos.crypto.multisig.v1beta1.CompactBitArray();
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
        return v1beta1;
      })();
      return multisig;
    })();
    crypto.secp256k1 = (function () {
      const secp256k1 = {};
      secp256k1.PubKey = (function () {
        function PubKey(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        PubKey.prototype.key = $util.newBuffer([]);
        PubKey.create = function create(properties) {
          return new PubKey(properties);
        };
        PubKey.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.key != null && Object.hasOwnProperty.call(m, "key")) w.uint32(10).bytes(m.key);
          return w;
        };
        PubKey.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmos.crypto.secp256k1.PubKey();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.key = r.bytes();
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
      secp256k1.PrivKey = (function () {
        function PrivKey(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        PrivKey.prototype.key = $util.newBuffer([]);
        PrivKey.create = function create(properties) {
          return new PrivKey(properties);
        };
        PrivKey.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.key != null && Object.hasOwnProperty.call(m, "key")) w.uint32(10).bytes(m.key);
          return w;
        };
        PrivKey.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmos.crypto.secp256k1.PrivKey();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.key = r.bytes();
                break;
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return PrivKey;
      })();
      return secp256k1;
    })();
    return crypto;
  })();
  cosmos.tx = (function () {
    const tx = {};
    tx.v1beta1 = (function () {
      const v1beta1 = {};
      v1beta1.Tx = (function () {
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
            $root.cosmos.tx.v1beta1.TxBody.encode(m.body, w.uint32(10).fork()).ldelim();
          if (m.authInfo != null && Object.hasOwnProperty.call(m, "authInfo"))
            $root.cosmos.tx.v1beta1.AuthInfo.encode(m.authInfo, w.uint32(18).fork()).ldelim();
          if (m.signatures != null && m.signatures.length) {
            for (var i = 0; i < m.signatures.length; ++i) w.uint32(26).bytes(m.signatures[i]);
          }
          return w;
        };
        Tx.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmos.tx.v1beta1.Tx();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.body = $root.cosmos.tx.v1beta1.TxBody.decode(r, r.uint32());
                break;
              case 2:
                m.authInfo = $root.cosmos.tx.v1beta1.AuthInfo.decode(r, r.uint32());
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
      v1beta1.TxRaw = (function () {
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
            m = new $root.cosmos.tx.v1beta1.TxRaw();
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
      v1beta1.SignDoc = (function () {
        function SignDoc(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        SignDoc.prototype.bodyBytes = $util.newBuffer([]);
        SignDoc.prototype.authInfoBytes = $util.newBuffer([]);
        SignDoc.prototype.chainId = "";
        SignDoc.prototype.accountNumber = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
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
          return w;
        };
        SignDoc.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmos.tx.v1beta1.SignDoc();
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
              default:
                r.skipType(t & 7);
                break;
            }
          }
          return m;
        };
        return SignDoc;
      })();
      v1beta1.TxBody = (function () {
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
            m = new $root.cosmos.tx.v1beta1.TxBody();
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
      v1beta1.AuthInfo = (function () {
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
              $root.cosmos.tx.v1beta1.SignerInfo.encode(m.signerInfos[i], w.uint32(10).fork()).ldelim();
          }
          if (m.fee != null && Object.hasOwnProperty.call(m, "fee"))
            $root.cosmos.tx.v1beta1.Fee.encode(m.fee, w.uint32(18).fork()).ldelim();
          return w;
        };
        AuthInfo.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmos.tx.v1beta1.AuthInfo();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                if (!(m.signerInfos && m.signerInfos.length)) m.signerInfos = [];
                m.signerInfos.push($root.cosmos.tx.v1beta1.SignerInfo.decode(r, r.uint32()));
                break;
              case 2:
                m.fee = $root.cosmos.tx.v1beta1.Fee.decode(r, r.uint32());
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
      v1beta1.SignerInfo = (function () {
        function SignerInfo(p) {
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        SignerInfo.prototype.publicKey = null;
        SignerInfo.prototype.modeInfo = null;
        SignerInfo.prototype.sequence = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        SignerInfo.create = function create(properties) {
          return new SignerInfo(properties);
        };
        SignerInfo.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.publicKey != null && Object.hasOwnProperty.call(m, "publicKey"))
            $root.google.protobuf.Any.encode(m.publicKey, w.uint32(10).fork()).ldelim();
          if (m.modeInfo != null && Object.hasOwnProperty.call(m, "modeInfo"))
            $root.cosmos.tx.v1beta1.ModeInfo.encode(m.modeInfo, w.uint32(18).fork()).ldelim();
          if (m.sequence != null && Object.hasOwnProperty.call(m, "sequence"))
            w.uint32(24).uint64(m.sequence);
          return w;
        };
        SignerInfo.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmos.tx.v1beta1.SignerInfo();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.publicKey = $root.google.protobuf.Any.decode(r, r.uint32());
                break;
              case 2:
                m.modeInfo = $root.cosmos.tx.v1beta1.ModeInfo.decode(r, r.uint32());
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
        return SignerInfo;
      })();
      v1beta1.ModeInfo = (function () {
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
            $root.cosmos.tx.v1beta1.ModeInfo.Single.encode(m.single, w.uint32(10).fork()).ldelim();
          if (m.multi != null && Object.hasOwnProperty.call(m, "multi"))
            $root.cosmos.tx.v1beta1.ModeInfo.Multi.encode(m.multi, w.uint32(18).fork()).ldelim();
          return w;
        };
        ModeInfo.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmos.tx.v1beta1.ModeInfo();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                m.single = $root.cosmos.tx.v1beta1.ModeInfo.Single.decode(r, r.uint32());
                break;
              case 2:
                m.multi = $root.cosmos.tx.v1beta1.ModeInfo.Multi.decode(r, r.uint32());
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
              m = new $root.cosmos.tx.v1beta1.ModeInfo.Single();
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
              $root.cosmos.crypto.multisig.v1beta1.CompactBitArray.encode(
                m.bitarray,
                w.uint32(10).fork(),
              ).ldelim();
            if (m.modeInfos != null && m.modeInfos.length) {
              for (var i = 0; i < m.modeInfos.length; ++i)
                $root.cosmos.tx.v1beta1.ModeInfo.encode(m.modeInfos[i], w.uint32(18).fork()).ldelim();
            }
            return w;
          };
          Multi.decode = function decode(r, l) {
            if (!(r instanceof $Reader)) r = $Reader.create(r);
            var c = l === undefined ? r.len : r.pos + l,
              m = new $root.cosmos.tx.v1beta1.ModeInfo.Multi();
            while (r.pos < c) {
              var t = r.uint32();
              switch (t >>> 3) {
                case 1:
                  m.bitarray = $root.cosmos.crypto.multisig.v1beta1.CompactBitArray.decode(r, r.uint32());
                  break;
                case 2:
                  if (!(m.modeInfos && m.modeInfos.length)) m.modeInfos = [];
                  m.modeInfos.push($root.cosmos.tx.v1beta1.ModeInfo.decode(r, r.uint32()));
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
      v1beta1.Fee = (function () {
        function Fee(p) {
          this.amount = [];
          if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
              if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
        }
        Fee.prototype.amount = $util.emptyArray;
        Fee.prototype.gasLimit = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        Fee.prototype.payer = "";
        Fee.prototype.granter = "";
        Fee.create = function create(properties) {
          return new Fee(properties);
        };
        Fee.encode = function encode(m, w) {
          if (!w) w = $Writer.create();
          if (m.amount != null && m.amount.length) {
            for (var i = 0; i < m.amount.length; ++i)
              $root.cosmos.base.v1beta1.Coin.encode(m.amount[i], w.uint32(10).fork()).ldelim();
          }
          if (m.gasLimit != null && Object.hasOwnProperty.call(m, "gasLimit"))
            w.uint32(16).uint64(m.gasLimit);
          if (m.payer != null && Object.hasOwnProperty.call(m, "payer")) w.uint32(26).string(m.payer);
          if (m.granter != null && Object.hasOwnProperty.call(m, "granter")) w.uint32(34).string(m.granter);
          return w;
        };
        Fee.decode = function decode(r, l) {
          if (!(r instanceof $Reader)) r = $Reader.create(r);
          var c = l === undefined ? r.len : r.pos + l,
            m = new $root.cosmos.tx.v1beta1.Fee();
          while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
              case 1:
                if (!(m.amount && m.amount.length)) m.amount = [];
                m.amount.push($root.cosmos.base.v1beta1.Coin.decode(r, r.uint32()));
                break;
              case 2:
                m.gasLimit = r.uint64();
                break;
              case 3:
                m.payer = r.string();
                break;
              case 4:
                m.granter = r.string();
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
      return v1beta1;
    })();
    tx.signing = (function () {
      const signing = {};
      signing.v1beta1 = (function () {
        const v1beta1 = {};
        v1beta1.SignMode = (function () {
          const valuesById = {},
            values = Object.create(valuesById);
          values[(valuesById[0] = "SIGN_MODE_UNSPECIFIED")] = 0;
          values[(valuesById[1] = "SIGN_MODE_DIRECT")] = 1;
          values[(valuesById[2] = "SIGN_MODE_TEXTUAL")] = 2;
          values[(valuesById[127] = "SIGN_MODE_LEGACY_AMINO_JSON")] = 127;
          return values;
        })();
        v1beta1.SignatureDescriptors = (function () {
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
                $root.cosmos.tx.signing.v1beta1.SignatureDescriptor.encode(
                  m.signatures[i],
                  w.uint32(10).fork(),
                ).ldelim();
            }
            return w;
          };
          SignatureDescriptors.decode = function decode(r, l) {
            if (!(r instanceof $Reader)) r = $Reader.create(r);
            var c = l === undefined ? r.len : r.pos + l,
              m = new $root.cosmos.tx.signing.v1beta1.SignatureDescriptors();
            while (r.pos < c) {
              var t = r.uint32();
              switch (t >>> 3) {
                case 1:
                  if (!(m.signatures && m.signatures.length)) m.signatures = [];
                  m.signatures.push(
                    $root.cosmos.tx.signing.v1beta1.SignatureDescriptor.decode(r, r.uint32()),
                  );
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
        v1beta1.SignatureDescriptor = (function () {
          function SignatureDescriptor(p) {
            if (p)
              for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
          }
          SignatureDescriptor.prototype.publicKey = null;
          SignatureDescriptor.prototype.data = null;
          SignatureDescriptor.prototype.sequence = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
          SignatureDescriptor.create = function create(properties) {
            return new SignatureDescriptor(properties);
          };
          SignatureDescriptor.encode = function encode(m, w) {
            if (!w) w = $Writer.create();
            if (m.publicKey != null && Object.hasOwnProperty.call(m, "publicKey"))
              $root.google.protobuf.Any.encode(m.publicKey, w.uint32(10).fork()).ldelim();
            if (m.data != null && Object.hasOwnProperty.call(m, "data"))
              $root.cosmos.tx.signing.v1beta1.SignatureDescriptor.Data.encode(
                m.data,
                w.uint32(18).fork(),
              ).ldelim();
            if (m.sequence != null && Object.hasOwnProperty.call(m, "sequence"))
              w.uint32(24).uint64(m.sequence);
            return w;
          };
          SignatureDescriptor.decode = function decode(r, l) {
            if (!(r instanceof $Reader)) r = $Reader.create(r);
            var c = l === undefined ? r.len : r.pos + l,
              m = new $root.cosmos.tx.signing.v1beta1.SignatureDescriptor();
            while (r.pos < c) {
              var t = r.uint32();
              switch (t >>> 3) {
                case 1:
                  m.publicKey = $root.google.protobuf.Any.decode(r, r.uint32());
                  break;
                case 2:
                  m.data = $root.cosmos.tx.signing.v1beta1.SignatureDescriptor.Data.decode(r, r.uint32());
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
                $root.cosmos.tx.signing.v1beta1.SignatureDescriptor.Data.Single.encode(
                  m.single,
                  w.uint32(10).fork(),
                ).ldelim();
              if (m.multi != null && Object.hasOwnProperty.call(m, "multi"))
                $root.cosmos.tx.signing.v1beta1.SignatureDescriptor.Data.Multi.encode(
                  m.multi,
                  w.uint32(18).fork(),
                ).ldelim();
              return w;
            };
            Data.decode = function decode(r, l) {
              if (!(r instanceof $Reader)) r = $Reader.create(r);
              var c = l === undefined ? r.len : r.pos + l,
                m = new $root.cosmos.tx.signing.v1beta1.SignatureDescriptor.Data();
              while (r.pos < c) {
                var t = r.uint32();
                switch (t >>> 3) {
                  case 1:
                    m.single = $root.cosmos.tx.signing.v1beta1.SignatureDescriptor.Data.Single.decode(
                      r,
                      r.uint32(),
                    );
                    break;
                  case 2:
                    m.multi = $root.cosmos.tx.signing.v1beta1.SignatureDescriptor.Data.Multi.decode(
                      r,
                      r.uint32(),
                    );
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
                  m = new $root.cosmos.tx.signing.v1beta1.SignatureDescriptor.Data.Single();
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
                  $root.cosmos.crypto.multisig.v1beta1.CompactBitArray.encode(
                    m.bitarray,
                    w.uint32(10).fork(),
                  ).ldelim();
                if (m.signatures != null && m.signatures.length) {
                  for (var i = 0; i < m.signatures.length; ++i)
                    $root.cosmos.tx.signing.v1beta1.SignatureDescriptor.Data.encode(
                      m.signatures[i],
                      w.uint32(18).fork(),
                    ).ldelim();
                }
                return w;
              };
              Multi.decode = function decode(r, l) {
                if (!(r instanceof $Reader)) r = $Reader.create(r);
                var c = l === undefined ? r.len : r.pos + l,
                  m = new $root.cosmos.tx.signing.v1beta1.SignatureDescriptor.Data.Multi();
                while (r.pos < c) {
                  var t = r.uint32();
                  switch (t >>> 3) {
                    case 1:
                      m.bitarray = $root.cosmos.crypto.multisig.v1beta1.CompactBitArray.decode(r, r.uint32());
                      break;
                    case 2:
                      if (!(m.signatures && m.signatures.length)) m.signatures = [];
                      m.signatures.push(
                        $root.cosmos.tx.signing.v1beta1.SignatureDescriptor.Data.decode(r, r.uint32()),
                      );
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
        return v1beta1;
      })();
      return signing;
    })();
    return tx;
  })();
  return cosmos;
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
    return protobuf;
  })();
  return google;
})();
exports.tendermint = $root.tendermint = (() => {
  const tendermint = {};
  tendermint.crypto = (function () {
    const crypto = {};
    crypto.PublicKey = (function () {
      function PublicKey(p) {
        if (p)
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null) this[ks[i]] = p[ks[i]];
      }
      PublicKey.prototype.ed25519 = $util.newBuffer([]);
      let $oneOfFields;
      Object.defineProperty(PublicKey.prototype, "sum", {
        get: $util.oneOfGetter(($oneOfFields = ["ed25519"])),
        set: $util.oneOfSetter($oneOfFields),
      });
      PublicKey.create = function create(properties) {
        return new PublicKey(properties);
      };
      PublicKey.encode = function encode(m, w) {
        if (!w) w = $Writer.create();
        if (m.ed25519 != null && Object.hasOwnProperty.call(m, "ed25519")) w.uint32(10).bytes(m.ed25519);
        return w;
      };
      PublicKey.decode = function decode(r, l) {
        if (!(r instanceof $Reader)) r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l,
          m = new $root.tendermint.crypto.PublicKey();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.ed25519 = r.bytes();
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
    return crypto;
  })();
  return tendermint;
})();
module.exports = $root;
