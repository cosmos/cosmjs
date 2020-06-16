/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.cosmos_sdk = (function() {

    /**
     * Namespace cosmos_sdk.
     * @exports cosmos_sdk
     * @namespace
     */
    var cosmos_sdk = {};

    cosmos_sdk.x = (function() {

        /**
         * Namespace x.
         * @memberof cosmos_sdk
         * @namespace
         */
        var x = {};

        x.bank = (function() {

            /**
             * Namespace bank.
             * @memberof cosmos_sdk.x
             * @namespace
             */
            var bank = {};

            bank.v1 = (function() {

                /**
                 * Namespace v1.
                 * @memberof cosmos_sdk.x.bank
                 * @namespace
                 */
                var v1 = {};

                v1.MsgSend = (function() {

                    /**
                     * Properties of a MsgSend.
                     * @memberof cosmos_sdk.x.bank.v1
                     * @interface IMsgSend
                     * @property {Uint8Array|null} [fromAddress] MsgSend fromAddress
                     * @property {Uint8Array|null} [toAddress] MsgSend toAddress
                     * @property {Array.<cosmos_sdk.v1.ICoin>|null} [amount] MsgSend amount
                     */

                    /**
                     * Constructs a new MsgSend.
                     * @memberof cosmos_sdk.x.bank.v1
                     * @classdesc Represents a MsgSend.
                     * @implements IMsgSend
                     * @constructor
                     * @param {cosmos_sdk.x.bank.v1.IMsgSend=} [p] Properties to set
                     */
                    function MsgSend(p) {
                        this.amount = [];
                        if (p)
                            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                                if (p[ks[i]] != null)
                                    this[ks[i]] = p[ks[i]];
                    }

                    /**
                     * MsgSend fromAddress.
                     * @member {Uint8Array} fromAddress
                     * @memberof cosmos_sdk.x.bank.v1.MsgSend
                     * @instance
                     */
                    MsgSend.prototype.fromAddress = $util.newBuffer([]);

                    /**
                     * MsgSend toAddress.
                     * @member {Uint8Array} toAddress
                     * @memberof cosmos_sdk.x.bank.v1.MsgSend
                     * @instance
                     */
                    MsgSend.prototype.toAddress = $util.newBuffer([]);

                    /**
                     * MsgSend amount.
                     * @member {Array.<cosmos_sdk.v1.ICoin>} amount
                     * @memberof cosmos_sdk.x.bank.v1.MsgSend
                     * @instance
                     */
                    MsgSend.prototype.amount = $util.emptyArray;

                    /**
                     * Creates a new MsgSend instance using the specified properties.
                     * @function create
                     * @memberof cosmos_sdk.x.bank.v1.MsgSend
                     * @static
                     * @param {cosmos_sdk.x.bank.v1.IMsgSend=} [properties] Properties to set
                     * @returns {cosmos_sdk.x.bank.v1.MsgSend} MsgSend instance
                     */
                    MsgSend.create = function create(properties) {
                        return new MsgSend(properties);
                    };

                    /**
                     * Encodes the specified MsgSend message. Does not implicitly {@link cosmos_sdk.x.bank.v1.MsgSend.verify|verify} messages.
                     * @function encode
                     * @memberof cosmos_sdk.x.bank.v1.MsgSend
                     * @static
                     * @param {cosmos_sdk.x.bank.v1.IMsgSend} m MsgSend message or plain object to encode
                     * @param {$protobuf.Writer} [w] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    MsgSend.encode = function encode(m, w) {
                        if (!w)
                            w = $Writer.create();
                        if (m.fromAddress != null && Object.hasOwnProperty.call(m, "fromAddress"))
                            w.uint32(10).bytes(m.fromAddress);
                        if (m.toAddress != null && Object.hasOwnProperty.call(m, "toAddress"))
                            w.uint32(18).bytes(m.toAddress);
                        if (m.amount != null && m.amount.length) {
                            for (var i = 0; i < m.amount.length; ++i)
                                $root.cosmos_sdk.v1.Coin.encode(m.amount[i], w.uint32(26).fork()).ldelim();
                        }
                        return w;
                    };

                    /**
                     * Decodes a MsgSend message from the specified reader or buffer.
                     * @function decode
                     * @memberof cosmos_sdk.x.bank.v1.MsgSend
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                     * @param {number} [l] Message length if known beforehand
                     * @returns {cosmos_sdk.x.bank.v1.MsgSend} MsgSend
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    MsgSend.decode = function decode(r, l) {
                        if (!(r instanceof $Reader))
                            r = $Reader.create(r);
                        var c = l === undefined ? r.len : r.pos + l, m = new $root.cosmos_sdk.x.bank.v1.MsgSend();
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
                                if (!(m.amount && m.amount.length))
                                    m.amount = [];
                                m.amount.push($root.cosmos_sdk.v1.Coin.decode(r, r.uint32()));
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

                v1.Input = (function() {

                    /**
                     * Properties of an Input.
                     * @memberof cosmos_sdk.x.bank.v1
                     * @interface IInput
                     * @property {Uint8Array|null} [address] Input address
                     * @property {Array.<cosmos_sdk.v1.ICoin>|null} [coins] Input coins
                     */

                    /**
                     * Constructs a new Input.
                     * @memberof cosmos_sdk.x.bank.v1
                     * @classdesc Represents an Input.
                     * @implements IInput
                     * @constructor
                     * @param {cosmos_sdk.x.bank.v1.IInput=} [p] Properties to set
                     */
                    function Input(p) {
                        this.coins = [];
                        if (p)
                            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                                if (p[ks[i]] != null)
                                    this[ks[i]] = p[ks[i]];
                    }

                    /**
                     * Input address.
                     * @member {Uint8Array} address
                     * @memberof cosmos_sdk.x.bank.v1.Input
                     * @instance
                     */
                    Input.prototype.address = $util.newBuffer([]);

                    /**
                     * Input coins.
                     * @member {Array.<cosmos_sdk.v1.ICoin>} coins
                     * @memberof cosmos_sdk.x.bank.v1.Input
                     * @instance
                     */
                    Input.prototype.coins = $util.emptyArray;

                    /**
                     * Creates a new Input instance using the specified properties.
                     * @function create
                     * @memberof cosmos_sdk.x.bank.v1.Input
                     * @static
                     * @param {cosmos_sdk.x.bank.v1.IInput=} [properties] Properties to set
                     * @returns {cosmos_sdk.x.bank.v1.Input} Input instance
                     */
                    Input.create = function create(properties) {
                        return new Input(properties);
                    };

                    /**
                     * Encodes the specified Input message. Does not implicitly {@link cosmos_sdk.x.bank.v1.Input.verify|verify} messages.
                     * @function encode
                     * @memberof cosmos_sdk.x.bank.v1.Input
                     * @static
                     * @param {cosmos_sdk.x.bank.v1.IInput} m Input message or plain object to encode
                     * @param {$protobuf.Writer} [w] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Input.encode = function encode(m, w) {
                        if (!w)
                            w = $Writer.create();
                        if (m.address != null && Object.hasOwnProperty.call(m, "address"))
                            w.uint32(10).bytes(m.address);
                        if (m.coins != null && m.coins.length) {
                            for (var i = 0; i < m.coins.length; ++i)
                                $root.cosmos_sdk.v1.Coin.encode(m.coins[i], w.uint32(18).fork()).ldelim();
                        }
                        return w;
                    };

                    /**
                     * Decodes an Input message from the specified reader or buffer.
                     * @function decode
                     * @memberof cosmos_sdk.x.bank.v1.Input
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                     * @param {number} [l] Message length if known beforehand
                     * @returns {cosmos_sdk.x.bank.v1.Input} Input
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Input.decode = function decode(r, l) {
                        if (!(r instanceof $Reader))
                            r = $Reader.create(r);
                        var c = l === undefined ? r.len : r.pos + l, m = new $root.cosmos_sdk.x.bank.v1.Input();
                        while (r.pos < c) {
                            var t = r.uint32();
                            switch (t >>> 3) {
                            case 1:
                                m.address = r.bytes();
                                break;
                            case 2:
                                if (!(m.coins && m.coins.length))
                                    m.coins = [];
                                m.coins.push($root.cosmos_sdk.v1.Coin.decode(r, r.uint32()));
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

                v1.Output = (function() {

                    /**
                     * Properties of an Output.
                     * @memberof cosmos_sdk.x.bank.v1
                     * @interface IOutput
                     * @property {Uint8Array|null} [address] Output address
                     * @property {Array.<cosmos_sdk.v1.ICoin>|null} [coins] Output coins
                     */

                    /**
                     * Constructs a new Output.
                     * @memberof cosmos_sdk.x.bank.v1
                     * @classdesc Represents an Output.
                     * @implements IOutput
                     * @constructor
                     * @param {cosmos_sdk.x.bank.v1.IOutput=} [p] Properties to set
                     */
                    function Output(p) {
                        this.coins = [];
                        if (p)
                            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                                if (p[ks[i]] != null)
                                    this[ks[i]] = p[ks[i]];
                    }

                    /**
                     * Output address.
                     * @member {Uint8Array} address
                     * @memberof cosmos_sdk.x.bank.v1.Output
                     * @instance
                     */
                    Output.prototype.address = $util.newBuffer([]);

                    /**
                     * Output coins.
                     * @member {Array.<cosmos_sdk.v1.ICoin>} coins
                     * @memberof cosmos_sdk.x.bank.v1.Output
                     * @instance
                     */
                    Output.prototype.coins = $util.emptyArray;

                    /**
                     * Creates a new Output instance using the specified properties.
                     * @function create
                     * @memberof cosmos_sdk.x.bank.v1.Output
                     * @static
                     * @param {cosmos_sdk.x.bank.v1.IOutput=} [properties] Properties to set
                     * @returns {cosmos_sdk.x.bank.v1.Output} Output instance
                     */
                    Output.create = function create(properties) {
                        return new Output(properties);
                    };

                    /**
                     * Encodes the specified Output message. Does not implicitly {@link cosmos_sdk.x.bank.v1.Output.verify|verify} messages.
                     * @function encode
                     * @memberof cosmos_sdk.x.bank.v1.Output
                     * @static
                     * @param {cosmos_sdk.x.bank.v1.IOutput} m Output message or plain object to encode
                     * @param {$protobuf.Writer} [w] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Output.encode = function encode(m, w) {
                        if (!w)
                            w = $Writer.create();
                        if (m.address != null && Object.hasOwnProperty.call(m, "address"))
                            w.uint32(10).bytes(m.address);
                        if (m.coins != null && m.coins.length) {
                            for (var i = 0; i < m.coins.length; ++i)
                                $root.cosmos_sdk.v1.Coin.encode(m.coins[i], w.uint32(18).fork()).ldelim();
                        }
                        return w;
                    };

                    /**
                     * Decodes an Output message from the specified reader or buffer.
                     * @function decode
                     * @memberof cosmos_sdk.x.bank.v1.Output
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                     * @param {number} [l] Message length if known beforehand
                     * @returns {cosmos_sdk.x.bank.v1.Output} Output
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Output.decode = function decode(r, l) {
                        if (!(r instanceof $Reader))
                            r = $Reader.create(r);
                        var c = l === undefined ? r.len : r.pos + l, m = new $root.cosmos_sdk.x.bank.v1.Output();
                        while (r.pos < c) {
                            var t = r.uint32();
                            switch (t >>> 3) {
                            case 1:
                                m.address = r.bytes();
                                break;
                            case 2:
                                if (!(m.coins && m.coins.length))
                                    m.coins = [];
                                m.coins.push($root.cosmos_sdk.v1.Coin.decode(r, r.uint32()));
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

                v1.MsgMultiSend = (function() {

                    /**
                     * Properties of a MsgMultiSend.
                     * @memberof cosmos_sdk.x.bank.v1
                     * @interface IMsgMultiSend
                     * @property {Array.<cosmos_sdk.x.bank.v1.IInput>|null} [inputs] MsgMultiSend inputs
                     * @property {Array.<cosmos_sdk.x.bank.v1.IOutput>|null} [outputs] MsgMultiSend outputs
                     */

                    /**
                     * Constructs a new MsgMultiSend.
                     * @memberof cosmos_sdk.x.bank.v1
                     * @classdesc Represents a MsgMultiSend.
                     * @implements IMsgMultiSend
                     * @constructor
                     * @param {cosmos_sdk.x.bank.v1.IMsgMultiSend=} [p] Properties to set
                     */
                    function MsgMultiSend(p) {
                        this.inputs = [];
                        this.outputs = [];
                        if (p)
                            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                                if (p[ks[i]] != null)
                                    this[ks[i]] = p[ks[i]];
                    }

                    /**
                     * MsgMultiSend inputs.
                     * @member {Array.<cosmos_sdk.x.bank.v1.IInput>} inputs
                     * @memberof cosmos_sdk.x.bank.v1.MsgMultiSend
                     * @instance
                     */
                    MsgMultiSend.prototype.inputs = $util.emptyArray;

                    /**
                     * MsgMultiSend outputs.
                     * @member {Array.<cosmos_sdk.x.bank.v1.IOutput>} outputs
                     * @memberof cosmos_sdk.x.bank.v1.MsgMultiSend
                     * @instance
                     */
                    MsgMultiSend.prototype.outputs = $util.emptyArray;

                    /**
                     * Creates a new MsgMultiSend instance using the specified properties.
                     * @function create
                     * @memberof cosmos_sdk.x.bank.v1.MsgMultiSend
                     * @static
                     * @param {cosmos_sdk.x.bank.v1.IMsgMultiSend=} [properties] Properties to set
                     * @returns {cosmos_sdk.x.bank.v1.MsgMultiSend} MsgMultiSend instance
                     */
                    MsgMultiSend.create = function create(properties) {
                        return new MsgMultiSend(properties);
                    };

                    /**
                     * Encodes the specified MsgMultiSend message. Does not implicitly {@link cosmos_sdk.x.bank.v1.MsgMultiSend.verify|verify} messages.
                     * @function encode
                     * @memberof cosmos_sdk.x.bank.v1.MsgMultiSend
                     * @static
                     * @param {cosmos_sdk.x.bank.v1.IMsgMultiSend} m MsgMultiSend message or plain object to encode
                     * @param {$protobuf.Writer} [w] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    MsgMultiSend.encode = function encode(m, w) {
                        if (!w)
                            w = $Writer.create();
                        if (m.inputs != null && m.inputs.length) {
                            for (var i = 0; i < m.inputs.length; ++i)
                                $root.cosmos_sdk.x.bank.v1.Input.encode(m.inputs[i], w.uint32(10).fork()).ldelim();
                        }
                        if (m.outputs != null && m.outputs.length) {
                            for (var i = 0; i < m.outputs.length; ++i)
                                $root.cosmos_sdk.x.bank.v1.Output.encode(m.outputs[i], w.uint32(18).fork()).ldelim();
                        }
                        return w;
                    };

                    /**
                     * Decodes a MsgMultiSend message from the specified reader or buffer.
                     * @function decode
                     * @memberof cosmos_sdk.x.bank.v1.MsgMultiSend
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                     * @param {number} [l] Message length if known beforehand
                     * @returns {cosmos_sdk.x.bank.v1.MsgMultiSend} MsgMultiSend
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    MsgMultiSend.decode = function decode(r, l) {
                        if (!(r instanceof $Reader))
                            r = $Reader.create(r);
                        var c = l === undefined ? r.len : r.pos + l, m = new $root.cosmos_sdk.x.bank.v1.MsgMultiSend();
                        while (r.pos < c) {
                            var t = r.uint32();
                            switch (t >>> 3) {
                            case 1:
                                if (!(m.inputs && m.inputs.length))
                                    m.inputs = [];
                                m.inputs.push($root.cosmos_sdk.x.bank.v1.Input.decode(r, r.uint32()));
                                break;
                            case 2:
                                if (!(m.outputs && m.outputs.length))
                                    m.outputs = [];
                                m.outputs.push($root.cosmos_sdk.x.bank.v1.Output.decode(r, r.uint32()));
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

                v1.Supply = (function() {

                    /**
                     * Properties of a Supply.
                     * @memberof cosmos_sdk.x.bank.v1
                     * @interface ISupply
                     * @property {Array.<cosmos_sdk.v1.ICoin>|null} [total] Supply total
                     */

                    /**
                     * Constructs a new Supply.
                     * @memberof cosmos_sdk.x.bank.v1
                     * @classdesc Represents a Supply.
                     * @implements ISupply
                     * @constructor
                     * @param {cosmos_sdk.x.bank.v1.ISupply=} [p] Properties to set
                     */
                    function Supply(p) {
                        this.total = [];
                        if (p)
                            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                                if (p[ks[i]] != null)
                                    this[ks[i]] = p[ks[i]];
                    }

                    /**
                     * Supply total.
                     * @member {Array.<cosmos_sdk.v1.ICoin>} total
                     * @memberof cosmos_sdk.x.bank.v1.Supply
                     * @instance
                     */
                    Supply.prototype.total = $util.emptyArray;

                    /**
                     * Creates a new Supply instance using the specified properties.
                     * @function create
                     * @memberof cosmos_sdk.x.bank.v1.Supply
                     * @static
                     * @param {cosmos_sdk.x.bank.v1.ISupply=} [properties] Properties to set
                     * @returns {cosmos_sdk.x.bank.v1.Supply} Supply instance
                     */
                    Supply.create = function create(properties) {
                        return new Supply(properties);
                    };

                    /**
                     * Encodes the specified Supply message. Does not implicitly {@link cosmos_sdk.x.bank.v1.Supply.verify|verify} messages.
                     * @function encode
                     * @memberof cosmos_sdk.x.bank.v1.Supply
                     * @static
                     * @param {cosmos_sdk.x.bank.v1.ISupply} m Supply message or plain object to encode
                     * @param {$protobuf.Writer} [w] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Supply.encode = function encode(m, w) {
                        if (!w)
                            w = $Writer.create();
                        if (m.total != null && m.total.length) {
                            for (var i = 0; i < m.total.length; ++i)
                                $root.cosmos_sdk.v1.Coin.encode(m.total[i], w.uint32(10).fork()).ldelim();
                        }
                        return w;
                    };

                    /**
                     * Decodes a Supply message from the specified reader or buffer.
                     * @function decode
                     * @memberof cosmos_sdk.x.bank.v1.Supply
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                     * @param {number} [l] Message length if known beforehand
                     * @returns {cosmos_sdk.x.bank.v1.Supply} Supply
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Supply.decode = function decode(r, l) {
                        if (!(r instanceof $Reader))
                            r = $Reader.create(r);
                        var c = l === undefined ? r.len : r.pos + l, m = new $root.cosmos_sdk.x.bank.v1.Supply();
                        while (r.pos < c) {
                            var t = r.uint32();
                            switch (t >>> 3) {
                            case 1:
                                if (!(m.total && m.total.length))
                                    m.total = [];
                                m.total.push($root.cosmos_sdk.v1.Coin.decode(r, r.uint32()));
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

                return v1;
            })();

            return bank;
        })();

        return x;
    })();

    cosmos_sdk.v1 = (function() {

        /**
         * Namespace v1.
         * @memberof cosmos_sdk
         * @namespace
         */
        var v1 = {};

        v1.Coin = (function() {

            /**
             * Properties of a Coin.
             * @memberof cosmos_sdk.v1
             * @interface ICoin
             * @property {string|null} [denom] Coin denom
             * @property {string|null} [amount] Coin amount
             */

            /**
             * Constructs a new Coin.
             * @memberof cosmos_sdk.v1
             * @classdesc Represents a Coin.
             * @implements ICoin
             * @constructor
             * @param {cosmos_sdk.v1.ICoin=} [p] Properties to set
             */
            function Coin(p) {
                if (p)
                    for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null)
                            this[ks[i]] = p[ks[i]];
            }

            /**
             * Coin denom.
             * @member {string} denom
             * @memberof cosmos_sdk.v1.Coin
             * @instance
             */
            Coin.prototype.denom = "";

            /**
             * Coin amount.
             * @member {string} amount
             * @memberof cosmos_sdk.v1.Coin
             * @instance
             */
            Coin.prototype.amount = "";

            /**
             * Creates a new Coin instance using the specified properties.
             * @function create
             * @memberof cosmos_sdk.v1.Coin
             * @static
             * @param {cosmos_sdk.v1.ICoin=} [properties] Properties to set
             * @returns {cosmos_sdk.v1.Coin} Coin instance
             */
            Coin.create = function create(properties) {
                return new Coin(properties);
            };

            /**
             * Encodes the specified Coin message. Does not implicitly {@link cosmos_sdk.v1.Coin.verify|verify} messages.
             * @function encode
             * @memberof cosmos_sdk.v1.Coin
             * @static
             * @param {cosmos_sdk.v1.ICoin} m Coin message or plain object to encode
             * @param {$protobuf.Writer} [w] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Coin.encode = function encode(m, w) {
                if (!w)
                    w = $Writer.create();
                if (m.denom != null && Object.hasOwnProperty.call(m, "denom"))
                    w.uint32(10).string(m.denom);
                if (m.amount != null && Object.hasOwnProperty.call(m, "amount"))
                    w.uint32(18).string(m.amount);
                return w;
            };

            /**
             * Decodes a Coin message from the specified reader or buffer.
             * @function decode
             * @memberof cosmos_sdk.v1.Coin
             * @static
             * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
             * @param {number} [l] Message length if known beforehand
             * @returns {cosmos_sdk.v1.Coin} Coin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Coin.decode = function decode(r, l) {
                if (!(r instanceof $Reader))
                    r = $Reader.create(r);
                var c = l === undefined ? r.len : r.pos + l, m = new $root.cosmos_sdk.v1.Coin();
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

        v1.DecCoin = (function() {

            /**
             * Properties of a DecCoin.
             * @memberof cosmos_sdk.v1
             * @interface IDecCoin
             * @property {string|null} [denom] DecCoin denom
             * @property {string|null} [amount] DecCoin amount
             */

            /**
             * Constructs a new DecCoin.
             * @memberof cosmos_sdk.v1
             * @classdesc Represents a DecCoin.
             * @implements IDecCoin
             * @constructor
             * @param {cosmos_sdk.v1.IDecCoin=} [p] Properties to set
             */
            function DecCoin(p) {
                if (p)
                    for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null)
                            this[ks[i]] = p[ks[i]];
            }

            /**
             * DecCoin denom.
             * @member {string} denom
             * @memberof cosmos_sdk.v1.DecCoin
             * @instance
             */
            DecCoin.prototype.denom = "";

            /**
             * DecCoin amount.
             * @member {string} amount
             * @memberof cosmos_sdk.v1.DecCoin
             * @instance
             */
            DecCoin.prototype.amount = "";

            /**
             * Creates a new DecCoin instance using the specified properties.
             * @function create
             * @memberof cosmos_sdk.v1.DecCoin
             * @static
             * @param {cosmos_sdk.v1.IDecCoin=} [properties] Properties to set
             * @returns {cosmos_sdk.v1.DecCoin} DecCoin instance
             */
            DecCoin.create = function create(properties) {
                return new DecCoin(properties);
            };

            /**
             * Encodes the specified DecCoin message. Does not implicitly {@link cosmos_sdk.v1.DecCoin.verify|verify} messages.
             * @function encode
             * @memberof cosmos_sdk.v1.DecCoin
             * @static
             * @param {cosmos_sdk.v1.IDecCoin} m DecCoin message or plain object to encode
             * @param {$protobuf.Writer} [w] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DecCoin.encode = function encode(m, w) {
                if (!w)
                    w = $Writer.create();
                if (m.denom != null && Object.hasOwnProperty.call(m, "denom"))
                    w.uint32(10).string(m.denom);
                if (m.amount != null && Object.hasOwnProperty.call(m, "amount"))
                    w.uint32(18).string(m.amount);
                return w;
            };

            /**
             * Decodes a DecCoin message from the specified reader or buffer.
             * @function decode
             * @memberof cosmos_sdk.v1.DecCoin
             * @static
             * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
             * @param {number} [l] Message length if known beforehand
             * @returns {cosmos_sdk.v1.DecCoin} DecCoin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DecCoin.decode = function decode(r, l) {
                if (!(r instanceof $Reader))
                    r = $Reader.create(r);
                var c = l === undefined ? r.len : r.pos + l, m = new $root.cosmos_sdk.v1.DecCoin();
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

        v1.IntProto = (function() {

            /**
             * Properties of an IntProto.
             * @memberof cosmos_sdk.v1
             * @interface IIntProto
             * @property {string|null} [int] IntProto int
             */

            /**
             * Constructs a new IntProto.
             * @memberof cosmos_sdk.v1
             * @classdesc Represents an IntProto.
             * @implements IIntProto
             * @constructor
             * @param {cosmos_sdk.v1.IIntProto=} [p] Properties to set
             */
            function IntProto(p) {
                if (p)
                    for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null)
                            this[ks[i]] = p[ks[i]];
            }

            /**
             * IntProto int.
             * @member {string} int
             * @memberof cosmos_sdk.v1.IntProto
             * @instance
             */
            IntProto.prototype.int = "";

            /**
             * Creates a new IntProto instance using the specified properties.
             * @function create
             * @memberof cosmos_sdk.v1.IntProto
             * @static
             * @param {cosmos_sdk.v1.IIntProto=} [properties] Properties to set
             * @returns {cosmos_sdk.v1.IntProto} IntProto instance
             */
            IntProto.create = function create(properties) {
                return new IntProto(properties);
            };

            /**
             * Encodes the specified IntProto message. Does not implicitly {@link cosmos_sdk.v1.IntProto.verify|verify} messages.
             * @function encode
             * @memberof cosmos_sdk.v1.IntProto
             * @static
             * @param {cosmos_sdk.v1.IIntProto} m IntProto message or plain object to encode
             * @param {$protobuf.Writer} [w] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            IntProto.encode = function encode(m, w) {
                if (!w)
                    w = $Writer.create();
                if (m.int != null && Object.hasOwnProperty.call(m, "int"))
                    w.uint32(10).string(m.int);
                return w;
            };

            /**
             * Decodes an IntProto message from the specified reader or buffer.
             * @function decode
             * @memberof cosmos_sdk.v1.IntProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
             * @param {number} [l] Message length if known beforehand
             * @returns {cosmos_sdk.v1.IntProto} IntProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            IntProto.decode = function decode(r, l) {
                if (!(r instanceof $Reader))
                    r = $Reader.create(r);
                var c = l === undefined ? r.len : r.pos + l, m = new $root.cosmos_sdk.v1.IntProto();
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

        v1.DecProto = (function() {

            /**
             * Properties of a DecProto.
             * @memberof cosmos_sdk.v1
             * @interface IDecProto
             * @property {string|null} [dec] DecProto dec
             */

            /**
             * Constructs a new DecProto.
             * @memberof cosmos_sdk.v1
             * @classdesc Represents a DecProto.
             * @implements IDecProto
             * @constructor
             * @param {cosmos_sdk.v1.IDecProto=} [p] Properties to set
             */
            function DecProto(p) {
                if (p)
                    for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null)
                            this[ks[i]] = p[ks[i]];
            }

            /**
             * DecProto dec.
             * @member {string} dec
             * @memberof cosmos_sdk.v1.DecProto
             * @instance
             */
            DecProto.prototype.dec = "";

            /**
             * Creates a new DecProto instance using the specified properties.
             * @function create
             * @memberof cosmos_sdk.v1.DecProto
             * @static
             * @param {cosmos_sdk.v1.IDecProto=} [properties] Properties to set
             * @returns {cosmos_sdk.v1.DecProto} DecProto instance
             */
            DecProto.create = function create(properties) {
                return new DecProto(properties);
            };

            /**
             * Encodes the specified DecProto message. Does not implicitly {@link cosmos_sdk.v1.DecProto.verify|verify} messages.
             * @function encode
             * @memberof cosmos_sdk.v1.DecProto
             * @static
             * @param {cosmos_sdk.v1.IDecProto} m DecProto message or plain object to encode
             * @param {$protobuf.Writer} [w] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DecProto.encode = function encode(m, w) {
                if (!w)
                    w = $Writer.create();
                if (m.dec != null && Object.hasOwnProperty.call(m, "dec"))
                    w.uint32(10).string(m.dec);
                return w;
            };

            /**
             * Decodes a DecProto message from the specified reader or buffer.
             * @function decode
             * @memberof cosmos_sdk.v1.DecProto
             * @static
             * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
             * @param {number} [l] Message length if known beforehand
             * @returns {cosmos_sdk.v1.DecProto} DecProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DecProto.decode = function decode(r, l) {
                if (!(r instanceof $Reader))
                    r = $Reader.create(r);
                var c = l === undefined ? r.len : r.pos + l, m = new $root.cosmos_sdk.v1.DecProto();
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

        v1.ValAddresses = (function() {

            /**
             * Properties of a ValAddresses.
             * @memberof cosmos_sdk.v1
             * @interface IValAddresses
             * @property {Array.<Uint8Array>|null} [addresses] ValAddresses addresses
             */

            /**
             * Constructs a new ValAddresses.
             * @memberof cosmos_sdk.v1
             * @classdesc Represents a ValAddresses.
             * @implements IValAddresses
             * @constructor
             * @param {cosmos_sdk.v1.IValAddresses=} [p] Properties to set
             */
            function ValAddresses(p) {
                this.addresses = [];
                if (p)
                    for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null)
                            this[ks[i]] = p[ks[i]];
            }

            /**
             * ValAddresses addresses.
             * @member {Array.<Uint8Array>} addresses
             * @memberof cosmos_sdk.v1.ValAddresses
             * @instance
             */
            ValAddresses.prototype.addresses = $util.emptyArray;

            /**
             * Creates a new ValAddresses instance using the specified properties.
             * @function create
             * @memberof cosmos_sdk.v1.ValAddresses
             * @static
             * @param {cosmos_sdk.v1.IValAddresses=} [properties] Properties to set
             * @returns {cosmos_sdk.v1.ValAddresses} ValAddresses instance
             */
            ValAddresses.create = function create(properties) {
                return new ValAddresses(properties);
            };

            /**
             * Encodes the specified ValAddresses message. Does not implicitly {@link cosmos_sdk.v1.ValAddresses.verify|verify} messages.
             * @function encode
             * @memberof cosmos_sdk.v1.ValAddresses
             * @static
             * @param {cosmos_sdk.v1.IValAddresses} m ValAddresses message or plain object to encode
             * @param {$protobuf.Writer} [w] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ValAddresses.encode = function encode(m, w) {
                if (!w)
                    w = $Writer.create();
                if (m.addresses != null && m.addresses.length) {
                    for (var i = 0; i < m.addresses.length; ++i)
                        w.uint32(10).bytes(m.addresses[i]);
                }
                return w;
            };

            /**
             * Decodes a ValAddresses message from the specified reader or buffer.
             * @function decode
             * @memberof cosmos_sdk.v1.ValAddresses
             * @static
             * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
             * @param {number} [l] Message length if known beforehand
             * @returns {cosmos_sdk.v1.ValAddresses} ValAddresses
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ValAddresses.decode = function decode(r, l) {
                if (!(r instanceof $Reader))
                    r = $Reader.create(r);
                var c = l === undefined ? r.len : r.pos + l, m = new $root.cosmos_sdk.v1.ValAddresses();
                while (r.pos < c) {
                    var t = r.uint32();
                    switch (t >>> 3) {
                    case 1:
                        if (!(m.addresses && m.addresses.length))
                            m.addresses = [];
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

        v1.GasInfo = (function() {

            /**
             * Properties of a GasInfo.
             * @memberof cosmos_sdk.v1
             * @interface IGasInfo
             * @property {number|Long|null} [gasWanted] GasInfo gasWanted
             * @property {number|Long|null} [gasUsed] GasInfo gasUsed
             */

            /**
             * Constructs a new GasInfo.
             * @memberof cosmos_sdk.v1
             * @classdesc Represents a GasInfo.
             * @implements IGasInfo
             * @constructor
             * @param {cosmos_sdk.v1.IGasInfo=} [p] Properties to set
             */
            function GasInfo(p) {
                if (p)
                    for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null)
                            this[ks[i]] = p[ks[i]];
            }

            /**
             * GasInfo gasWanted.
             * @member {number|Long} gasWanted
             * @memberof cosmos_sdk.v1.GasInfo
             * @instance
             */
            GasInfo.prototype.gasWanted = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * GasInfo gasUsed.
             * @member {number|Long} gasUsed
             * @memberof cosmos_sdk.v1.GasInfo
             * @instance
             */
            GasInfo.prototype.gasUsed = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

            /**
             * Creates a new GasInfo instance using the specified properties.
             * @function create
             * @memberof cosmos_sdk.v1.GasInfo
             * @static
             * @param {cosmos_sdk.v1.IGasInfo=} [properties] Properties to set
             * @returns {cosmos_sdk.v1.GasInfo} GasInfo instance
             */
            GasInfo.create = function create(properties) {
                return new GasInfo(properties);
            };

            /**
             * Encodes the specified GasInfo message. Does not implicitly {@link cosmos_sdk.v1.GasInfo.verify|verify} messages.
             * @function encode
             * @memberof cosmos_sdk.v1.GasInfo
             * @static
             * @param {cosmos_sdk.v1.IGasInfo} m GasInfo message or plain object to encode
             * @param {$protobuf.Writer} [w] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GasInfo.encode = function encode(m, w) {
                if (!w)
                    w = $Writer.create();
                if (m.gasWanted != null && Object.hasOwnProperty.call(m, "gasWanted"))
                    w.uint32(8).uint64(m.gasWanted);
                if (m.gasUsed != null && Object.hasOwnProperty.call(m, "gasUsed"))
                    w.uint32(16).uint64(m.gasUsed);
                return w;
            };

            /**
             * Decodes a GasInfo message from the specified reader or buffer.
             * @function decode
             * @memberof cosmos_sdk.v1.GasInfo
             * @static
             * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
             * @param {number} [l] Message length if known beforehand
             * @returns {cosmos_sdk.v1.GasInfo} GasInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GasInfo.decode = function decode(r, l) {
                if (!(r instanceof $Reader))
                    r = $Reader.create(r);
                var c = l === undefined ? r.len : r.pos + l, m = new $root.cosmos_sdk.v1.GasInfo();
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

        v1.Result = (function() {

            /**
             * Properties of a Result.
             * @memberof cosmos_sdk.v1
             * @interface IResult
             * @property {Uint8Array|null} [data] Result data
             * @property {string|null} [log] Result log
             * @property {Array.<tendermint.abci.types.IEvent>|null} [events] Result events
             */

            /**
             * Constructs a new Result.
             * @memberof cosmos_sdk.v1
             * @classdesc Represents a Result.
             * @implements IResult
             * @constructor
             * @param {cosmos_sdk.v1.IResult=} [p] Properties to set
             */
            function Result(p) {
                this.events = [];
                if (p)
                    for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null)
                            this[ks[i]] = p[ks[i]];
            }

            /**
             * Result data.
             * @member {Uint8Array} data
             * @memberof cosmos_sdk.v1.Result
             * @instance
             */
            Result.prototype.data = $util.newBuffer([]);

            /**
             * Result log.
             * @member {string} log
             * @memberof cosmos_sdk.v1.Result
             * @instance
             */
            Result.prototype.log = "";

            /**
             * Result events.
             * @member {Array.<tendermint.abci.types.IEvent>} events
             * @memberof cosmos_sdk.v1.Result
             * @instance
             */
            Result.prototype.events = $util.emptyArray;

            /**
             * Creates a new Result instance using the specified properties.
             * @function create
             * @memberof cosmos_sdk.v1.Result
             * @static
             * @param {cosmos_sdk.v1.IResult=} [properties] Properties to set
             * @returns {cosmos_sdk.v1.Result} Result instance
             */
            Result.create = function create(properties) {
                return new Result(properties);
            };

            /**
             * Encodes the specified Result message. Does not implicitly {@link cosmos_sdk.v1.Result.verify|verify} messages.
             * @function encode
             * @memberof cosmos_sdk.v1.Result
             * @static
             * @param {cosmos_sdk.v1.IResult} m Result message or plain object to encode
             * @param {$protobuf.Writer} [w] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Result.encode = function encode(m, w) {
                if (!w)
                    w = $Writer.create();
                if (m.data != null && Object.hasOwnProperty.call(m, "data"))
                    w.uint32(10).bytes(m.data);
                if (m.log != null && Object.hasOwnProperty.call(m, "log"))
                    w.uint32(18).string(m.log);
                if (m.events != null && m.events.length) {
                    for (var i = 0; i < m.events.length; ++i)
                        $root.tendermint.abci.types.Event.encode(m.events[i], w.uint32(26).fork()).ldelim();
                }
                return w;
            };

            /**
             * Decodes a Result message from the specified reader or buffer.
             * @function decode
             * @memberof cosmos_sdk.v1.Result
             * @static
             * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
             * @param {number} [l] Message length if known beforehand
             * @returns {cosmos_sdk.v1.Result} Result
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Result.decode = function decode(r, l) {
                if (!(r instanceof $Reader))
                    r = $Reader.create(r);
                var c = l === undefined ? r.len : r.pos + l, m = new $root.cosmos_sdk.v1.Result();
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
                        if (!(m.events && m.events.length))
                            m.events = [];
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

        v1.SimulationResponse = (function() {

            /**
             * Properties of a SimulationResponse.
             * @memberof cosmos_sdk.v1
             * @interface ISimulationResponse
             * @property {cosmos_sdk.v1.IGasInfo|null} [gasInfo] SimulationResponse gasInfo
             * @property {cosmos_sdk.v1.IResult|null} [result] SimulationResponse result
             */

            /**
             * Constructs a new SimulationResponse.
             * @memberof cosmos_sdk.v1
             * @classdesc Represents a SimulationResponse.
             * @implements ISimulationResponse
             * @constructor
             * @param {cosmos_sdk.v1.ISimulationResponse=} [p] Properties to set
             */
            function SimulationResponse(p) {
                if (p)
                    for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null)
                            this[ks[i]] = p[ks[i]];
            }

            /**
             * SimulationResponse gasInfo.
             * @member {cosmos_sdk.v1.IGasInfo|null|undefined} gasInfo
             * @memberof cosmos_sdk.v1.SimulationResponse
             * @instance
             */
            SimulationResponse.prototype.gasInfo = null;

            /**
             * SimulationResponse result.
             * @member {cosmos_sdk.v1.IResult|null|undefined} result
             * @memberof cosmos_sdk.v1.SimulationResponse
             * @instance
             */
            SimulationResponse.prototype.result = null;

            /**
             * Creates a new SimulationResponse instance using the specified properties.
             * @function create
             * @memberof cosmos_sdk.v1.SimulationResponse
             * @static
             * @param {cosmos_sdk.v1.ISimulationResponse=} [properties] Properties to set
             * @returns {cosmos_sdk.v1.SimulationResponse} SimulationResponse instance
             */
            SimulationResponse.create = function create(properties) {
                return new SimulationResponse(properties);
            };

            /**
             * Encodes the specified SimulationResponse message. Does not implicitly {@link cosmos_sdk.v1.SimulationResponse.verify|verify} messages.
             * @function encode
             * @memberof cosmos_sdk.v1.SimulationResponse
             * @static
             * @param {cosmos_sdk.v1.ISimulationResponse} m SimulationResponse message or plain object to encode
             * @param {$protobuf.Writer} [w] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SimulationResponse.encode = function encode(m, w) {
                if (!w)
                    w = $Writer.create();
                if (m.gasInfo != null && Object.hasOwnProperty.call(m, "gasInfo"))
                    $root.cosmos_sdk.v1.GasInfo.encode(m.gasInfo, w.uint32(10).fork()).ldelim();
                if (m.result != null && Object.hasOwnProperty.call(m, "result"))
                    $root.cosmos_sdk.v1.Result.encode(m.result, w.uint32(18).fork()).ldelim();
                return w;
            };

            /**
             * Decodes a SimulationResponse message from the specified reader or buffer.
             * @function decode
             * @memberof cosmos_sdk.v1.SimulationResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
             * @param {number} [l] Message length if known beforehand
             * @returns {cosmos_sdk.v1.SimulationResponse} SimulationResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SimulationResponse.decode = function decode(r, l) {
                if (!(r instanceof $Reader))
                    r = $Reader.create(r);
                var c = l === undefined ? r.len : r.pos + l, m = new $root.cosmos_sdk.v1.SimulationResponse();
                while (r.pos < c) {
                    var t = r.uint32();
                    switch (t >>> 3) {
                    case 1:
                        m.gasInfo = $root.cosmos_sdk.v1.GasInfo.decode(r, r.uint32());
                        break;
                    case 2:
                        m.result = $root.cosmos_sdk.v1.Result.decode(r, r.uint32());
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

        v1.MsgData = (function() {

            /**
             * Properties of a MsgData.
             * @memberof cosmos_sdk.v1
             * @interface IMsgData
             * @property {string|null} [msgType] MsgData msgType
             * @property {Uint8Array|null} [data] MsgData data
             */

            /**
             * Constructs a new MsgData.
             * @memberof cosmos_sdk.v1
             * @classdesc Represents a MsgData.
             * @implements IMsgData
             * @constructor
             * @param {cosmos_sdk.v1.IMsgData=} [p] Properties to set
             */
            function MsgData(p) {
                if (p)
                    for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null)
                            this[ks[i]] = p[ks[i]];
            }

            /**
             * MsgData msgType.
             * @member {string} msgType
             * @memberof cosmos_sdk.v1.MsgData
             * @instance
             */
            MsgData.prototype.msgType = "";

            /**
             * MsgData data.
             * @member {Uint8Array} data
             * @memberof cosmos_sdk.v1.MsgData
             * @instance
             */
            MsgData.prototype.data = $util.newBuffer([]);

            /**
             * Creates a new MsgData instance using the specified properties.
             * @function create
             * @memberof cosmos_sdk.v1.MsgData
             * @static
             * @param {cosmos_sdk.v1.IMsgData=} [properties] Properties to set
             * @returns {cosmos_sdk.v1.MsgData} MsgData instance
             */
            MsgData.create = function create(properties) {
                return new MsgData(properties);
            };

            /**
             * Encodes the specified MsgData message. Does not implicitly {@link cosmos_sdk.v1.MsgData.verify|verify} messages.
             * @function encode
             * @memberof cosmos_sdk.v1.MsgData
             * @static
             * @param {cosmos_sdk.v1.IMsgData} m MsgData message or plain object to encode
             * @param {$protobuf.Writer} [w] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MsgData.encode = function encode(m, w) {
                if (!w)
                    w = $Writer.create();
                if (m.msgType != null && Object.hasOwnProperty.call(m, "msgType"))
                    w.uint32(10).string(m.msgType);
                if (m.data != null && Object.hasOwnProperty.call(m, "data"))
                    w.uint32(18).bytes(m.data);
                return w;
            };

            /**
             * Decodes a MsgData message from the specified reader or buffer.
             * @function decode
             * @memberof cosmos_sdk.v1.MsgData
             * @static
             * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
             * @param {number} [l] Message length if known beforehand
             * @returns {cosmos_sdk.v1.MsgData} MsgData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MsgData.decode = function decode(r, l) {
                if (!(r instanceof $Reader))
                    r = $Reader.create(r);
                var c = l === undefined ? r.len : r.pos + l, m = new $root.cosmos_sdk.v1.MsgData();
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

        v1.TxData = (function() {

            /**
             * Properties of a TxData.
             * @memberof cosmos_sdk.v1
             * @interface ITxData
             * @property {Array.<cosmos_sdk.v1.IMsgData>|null} [data] TxData data
             */

            /**
             * Constructs a new TxData.
             * @memberof cosmos_sdk.v1
             * @classdesc Represents a TxData.
             * @implements ITxData
             * @constructor
             * @param {cosmos_sdk.v1.ITxData=} [p] Properties to set
             */
            function TxData(p) {
                this.data = [];
                if (p)
                    for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null)
                            this[ks[i]] = p[ks[i]];
            }

            /**
             * TxData data.
             * @member {Array.<cosmos_sdk.v1.IMsgData>} data
             * @memberof cosmos_sdk.v1.TxData
             * @instance
             */
            TxData.prototype.data = $util.emptyArray;

            /**
             * Creates a new TxData instance using the specified properties.
             * @function create
             * @memberof cosmos_sdk.v1.TxData
             * @static
             * @param {cosmos_sdk.v1.ITxData=} [properties] Properties to set
             * @returns {cosmos_sdk.v1.TxData} TxData instance
             */
            TxData.create = function create(properties) {
                return new TxData(properties);
            };

            /**
             * Encodes the specified TxData message. Does not implicitly {@link cosmos_sdk.v1.TxData.verify|verify} messages.
             * @function encode
             * @memberof cosmos_sdk.v1.TxData
             * @static
             * @param {cosmos_sdk.v1.ITxData} m TxData message or plain object to encode
             * @param {$protobuf.Writer} [w] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TxData.encode = function encode(m, w) {
                if (!w)
                    w = $Writer.create();
                if (m.data != null && m.data.length) {
                    for (var i = 0; i < m.data.length; ++i)
                        $root.cosmos_sdk.v1.MsgData.encode(m.data[i], w.uint32(10).fork()).ldelim();
                }
                return w;
            };

            /**
             * Decodes a TxData message from the specified reader or buffer.
             * @function decode
             * @memberof cosmos_sdk.v1.TxData
             * @static
             * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
             * @param {number} [l] Message length if known beforehand
             * @returns {cosmos_sdk.v1.TxData} TxData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TxData.decode = function decode(r, l) {
                if (!(r instanceof $Reader))
                    r = $Reader.create(r);
                var c = l === undefined ? r.len : r.pos + l, m = new $root.cosmos_sdk.v1.TxData();
                while (r.pos < c) {
                    var t = r.uint32();
                    switch (t >>> 3) {
                    case 1:
                        if (!(m.data && m.data.length))
                            m.data = [];
                        m.data.push($root.cosmos_sdk.v1.MsgData.decode(r, r.uint32()));
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

        return v1;
    })();

    cosmos_sdk.tx = (function() {

        /**
         * Namespace tx.
         * @memberof cosmos_sdk
         * @namespace
         */
        var tx = {};

        tx.v1 = (function() {

            /**
             * Namespace v1.
             * @memberof cosmos_sdk.tx
             * @namespace
             */
            var v1 = {};

            v1.Tx = (function() {

                /**
                 * Properties of a Tx.
                 * @memberof cosmos_sdk.tx.v1
                 * @interface ITx
                 * @property {cosmos_sdk.tx.v1.ITxBody|null} [body] Tx body
                 * @property {cosmos_sdk.tx.v1.IAuthInfo|null} [authInfo] Tx authInfo
                 * @property {Array.<Uint8Array>|null} [signatures] Tx signatures
                 */

                /**
                 * Constructs a new Tx.
                 * @memberof cosmos_sdk.tx.v1
                 * @classdesc Represents a Tx.
                 * @implements ITx
                 * @constructor
                 * @param {cosmos_sdk.tx.v1.ITx=} [p] Properties to set
                 */
                function Tx(p) {
                    this.signatures = [];
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * Tx body.
                 * @member {cosmos_sdk.tx.v1.ITxBody|null|undefined} body
                 * @memberof cosmos_sdk.tx.v1.Tx
                 * @instance
                 */
                Tx.prototype.body = null;

                /**
                 * Tx authInfo.
                 * @member {cosmos_sdk.tx.v1.IAuthInfo|null|undefined} authInfo
                 * @memberof cosmos_sdk.tx.v1.Tx
                 * @instance
                 */
                Tx.prototype.authInfo = null;

                /**
                 * Tx signatures.
                 * @member {Array.<Uint8Array>} signatures
                 * @memberof cosmos_sdk.tx.v1.Tx
                 * @instance
                 */
                Tx.prototype.signatures = $util.emptyArray;

                /**
                 * Creates a new Tx instance using the specified properties.
                 * @function create
                 * @memberof cosmos_sdk.tx.v1.Tx
                 * @static
                 * @param {cosmos_sdk.tx.v1.ITx=} [properties] Properties to set
                 * @returns {cosmos_sdk.tx.v1.Tx} Tx instance
                 */
                Tx.create = function create(properties) {
                    return new Tx(properties);
                };

                /**
                 * Encodes the specified Tx message. Does not implicitly {@link cosmos_sdk.tx.v1.Tx.verify|verify} messages.
                 * @function encode
                 * @memberof cosmos_sdk.tx.v1.Tx
                 * @static
                 * @param {cosmos_sdk.tx.v1.ITx} m Tx message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Tx.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.body != null && Object.hasOwnProperty.call(m, "body"))
                        $root.cosmos_sdk.tx.v1.TxBody.encode(m.body, w.uint32(10).fork()).ldelim();
                    if (m.authInfo != null && Object.hasOwnProperty.call(m, "authInfo"))
                        $root.cosmos_sdk.tx.v1.AuthInfo.encode(m.authInfo, w.uint32(18).fork()).ldelim();
                    if (m.signatures != null && m.signatures.length) {
                        for (var i = 0; i < m.signatures.length; ++i)
                            w.uint32(26).bytes(m.signatures[i]);
                    }
                    return w;
                };

                /**
                 * Decodes a Tx message from the specified reader or buffer.
                 * @function decode
                 * @memberof cosmos_sdk.tx.v1.Tx
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {cosmos_sdk.tx.v1.Tx} Tx
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Tx.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.cosmos_sdk.tx.v1.Tx();
                    while (r.pos < c) {
                        var t = r.uint32();
                        switch (t >>> 3) {
                        case 1:
                            m.body = $root.cosmos_sdk.tx.v1.TxBody.decode(r, r.uint32());
                            break;
                        case 2:
                            m.authInfo = $root.cosmos_sdk.tx.v1.AuthInfo.decode(r, r.uint32());
                            break;
                        case 3:
                            if (!(m.signatures && m.signatures.length))
                                m.signatures = [];
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

            v1.SignDoc = (function() {

                /**
                 * Properties of a SignDoc.
                 * @memberof cosmos_sdk.tx.v1
                 * @interface ISignDoc
                 * @property {cosmos_sdk.tx.v1.ITxBody|null} [body] SignDoc body
                 * @property {cosmos_sdk.tx.v1.IAuthInfo|null} [authInfo] SignDoc authInfo
                 * @property {string|null} [chainId] SignDoc chainId
                 * @property {number|Long|null} [accountNumber] SignDoc accountNumber
                 * @property {number|Long|null} [accountSequence] SignDoc accountSequence
                 */

                /**
                 * Constructs a new SignDoc.
                 * @memberof cosmos_sdk.tx.v1
                 * @classdesc Represents a SignDoc.
                 * @implements ISignDoc
                 * @constructor
                 * @param {cosmos_sdk.tx.v1.ISignDoc=} [p] Properties to set
                 */
                function SignDoc(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * SignDoc body.
                 * @member {cosmos_sdk.tx.v1.ITxBody|null|undefined} body
                 * @memberof cosmos_sdk.tx.v1.SignDoc
                 * @instance
                 */
                SignDoc.prototype.body = null;

                /**
                 * SignDoc authInfo.
                 * @member {cosmos_sdk.tx.v1.IAuthInfo|null|undefined} authInfo
                 * @memberof cosmos_sdk.tx.v1.SignDoc
                 * @instance
                 */
                SignDoc.prototype.authInfo = null;

                /**
                 * SignDoc chainId.
                 * @member {string} chainId
                 * @memberof cosmos_sdk.tx.v1.SignDoc
                 * @instance
                 */
                SignDoc.prototype.chainId = "";

                /**
                 * SignDoc accountNumber.
                 * @member {number|Long} accountNumber
                 * @memberof cosmos_sdk.tx.v1.SignDoc
                 * @instance
                 */
                SignDoc.prototype.accountNumber = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * SignDoc accountSequence.
                 * @member {number|Long} accountSequence
                 * @memberof cosmos_sdk.tx.v1.SignDoc
                 * @instance
                 */
                SignDoc.prototype.accountSequence = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * Creates a new SignDoc instance using the specified properties.
                 * @function create
                 * @memberof cosmos_sdk.tx.v1.SignDoc
                 * @static
                 * @param {cosmos_sdk.tx.v1.ISignDoc=} [properties] Properties to set
                 * @returns {cosmos_sdk.tx.v1.SignDoc} SignDoc instance
                 */
                SignDoc.create = function create(properties) {
                    return new SignDoc(properties);
                };

                /**
                 * Encodes the specified SignDoc message. Does not implicitly {@link cosmos_sdk.tx.v1.SignDoc.verify|verify} messages.
                 * @function encode
                 * @memberof cosmos_sdk.tx.v1.SignDoc
                 * @static
                 * @param {cosmos_sdk.tx.v1.ISignDoc} m SignDoc message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SignDoc.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.body != null && Object.hasOwnProperty.call(m, "body"))
                        $root.cosmos_sdk.tx.v1.TxBody.encode(m.body, w.uint32(10).fork()).ldelim();
                    if (m.authInfo != null && Object.hasOwnProperty.call(m, "authInfo"))
                        $root.cosmos_sdk.tx.v1.AuthInfo.encode(m.authInfo, w.uint32(18).fork()).ldelim();
                    if (m.chainId != null && Object.hasOwnProperty.call(m, "chainId"))
                        w.uint32(26).string(m.chainId);
                    if (m.accountNumber != null && Object.hasOwnProperty.call(m, "accountNumber"))
                        w.uint32(32).uint64(m.accountNumber);
                    if (m.accountSequence != null && Object.hasOwnProperty.call(m, "accountSequence"))
                        w.uint32(40).uint64(m.accountSequence);
                    return w;
                };

                /**
                 * Decodes a SignDoc message from the specified reader or buffer.
                 * @function decode
                 * @memberof cosmos_sdk.tx.v1.SignDoc
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {cosmos_sdk.tx.v1.SignDoc} SignDoc
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SignDoc.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.cosmos_sdk.tx.v1.SignDoc();
                    while (r.pos < c) {
                        var t = r.uint32();
                        switch (t >>> 3) {
                        case 1:
                            m.body = $root.cosmos_sdk.tx.v1.TxBody.decode(r, r.uint32());
                            break;
                        case 2:
                            m.authInfo = $root.cosmos_sdk.tx.v1.AuthInfo.decode(r, r.uint32());
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

            v1.TxBody = (function() {

                /**
                 * Properties of a TxBody.
                 * @memberof cosmos_sdk.tx.v1
                 * @interface ITxBody
                 * @property {Array.<google.protobuf.IAny>|null} [messages] TxBody messages
                 * @property {string|null} [memo] TxBody memo
                 * @property {number|Long|null} [timeoutHeight] TxBody timeoutHeight
                 * @property {Array.<google.protobuf.IAny>|null} [extensionOptions] TxBody extensionOptions
                 * @property {Array.<google.protobuf.IAny>|null} [nonCriticalExtensionOptions] TxBody nonCriticalExtensionOptions
                 */

                /**
                 * Constructs a new TxBody.
                 * @memberof cosmos_sdk.tx.v1
                 * @classdesc Represents a TxBody.
                 * @implements ITxBody
                 * @constructor
                 * @param {cosmos_sdk.tx.v1.ITxBody=} [p] Properties to set
                 */
                function TxBody(p) {
                    this.messages = [];
                    this.extensionOptions = [];
                    this.nonCriticalExtensionOptions = [];
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * TxBody messages.
                 * @member {Array.<google.protobuf.IAny>} messages
                 * @memberof cosmos_sdk.tx.v1.TxBody
                 * @instance
                 */
                TxBody.prototype.messages = $util.emptyArray;

                /**
                 * TxBody memo.
                 * @member {string} memo
                 * @memberof cosmos_sdk.tx.v1.TxBody
                 * @instance
                 */
                TxBody.prototype.memo = "";

                /**
                 * TxBody timeoutHeight.
                 * @member {number|Long} timeoutHeight
                 * @memberof cosmos_sdk.tx.v1.TxBody
                 * @instance
                 */
                TxBody.prototype.timeoutHeight = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * TxBody extensionOptions.
                 * @member {Array.<google.protobuf.IAny>} extensionOptions
                 * @memberof cosmos_sdk.tx.v1.TxBody
                 * @instance
                 */
                TxBody.prototype.extensionOptions = $util.emptyArray;

                /**
                 * TxBody nonCriticalExtensionOptions.
                 * @member {Array.<google.protobuf.IAny>} nonCriticalExtensionOptions
                 * @memberof cosmos_sdk.tx.v1.TxBody
                 * @instance
                 */
                TxBody.prototype.nonCriticalExtensionOptions = $util.emptyArray;

                /**
                 * Creates a new TxBody instance using the specified properties.
                 * @function create
                 * @memberof cosmos_sdk.tx.v1.TxBody
                 * @static
                 * @param {cosmos_sdk.tx.v1.ITxBody=} [properties] Properties to set
                 * @returns {cosmos_sdk.tx.v1.TxBody} TxBody instance
                 */
                TxBody.create = function create(properties) {
                    return new TxBody(properties);
                };

                /**
                 * Encodes the specified TxBody message. Does not implicitly {@link cosmos_sdk.tx.v1.TxBody.verify|verify} messages.
                 * @function encode
                 * @memberof cosmos_sdk.tx.v1.TxBody
                 * @static
                 * @param {cosmos_sdk.tx.v1.ITxBody} m TxBody message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                TxBody.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.messages != null && m.messages.length) {
                        for (var i = 0; i < m.messages.length; ++i)
                            $root.google.protobuf.Any.encode(m.messages[i], w.uint32(10).fork()).ldelim();
                    }
                    if (m.memo != null && Object.hasOwnProperty.call(m, "memo"))
                        w.uint32(18).string(m.memo);
                    if (m.timeoutHeight != null && Object.hasOwnProperty.call(m, "timeoutHeight"))
                        w.uint32(24).int64(m.timeoutHeight);
                    if (m.extensionOptions != null && m.extensionOptions.length) {
                        for (var i = 0; i < m.extensionOptions.length; ++i)
                            $root.google.protobuf.Any.encode(m.extensionOptions[i], w.uint32(8186).fork()).ldelim();
                    }
                    if (m.nonCriticalExtensionOptions != null && m.nonCriticalExtensionOptions.length) {
                        for (var i = 0; i < m.nonCriticalExtensionOptions.length; ++i)
                            $root.google.protobuf.Any.encode(m.nonCriticalExtensionOptions[i], w.uint32(16378).fork()).ldelim();
                    }
                    return w;
                };

                /**
                 * Decodes a TxBody message from the specified reader or buffer.
                 * @function decode
                 * @memberof cosmos_sdk.tx.v1.TxBody
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {cosmos_sdk.tx.v1.TxBody} TxBody
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                TxBody.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.cosmos_sdk.tx.v1.TxBody();
                    while (r.pos < c) {
                        var t = r.uint32();
                        switch (t >>> 3) {
                        case 1:
                            if (!(m.messages && m.messages.length))
                                m.messages = [];
                            m.messages.push($root.google.protobuf.Any.decode(r, r.uint32()));
                            break;
                        case 2:
                            m.memo = r.string();
                            break;
                        case 3:
                            m.timeoutHeight = r.int64();
                            break;
                        case 1023:
                            if (!(m.extensionOptions && m.extensionOptions.length))
                                m.extensionOptions = [];
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

            v1.AuthInfo = (function() {

                /**
                 * Properties of an AuthInfo.
                 * @memberof cosmos_sdk.tx.v1
                 * @interface IAuthInfo
                 * @property {Array.<cosmos_sdk.tx.v1.ISignerInfo>|null} [signerInfos] AuthInfo signerInfos
                 * @property {cosmos_sdk.tx.v1.IFee|null} [fee] AuthInfo fee
                 */

                /**
                 * Constructs a new AuthInfo.
                 * @memberof cosmos_sdk.tx.v1
                 * @classdesc Represents an AuthInfo.
                 * @implements IAuthInfo
                 * @constructor
                 * @param {cosmos_sdk.tx.v1.IAuthInfo=} [p] Properties to set
                 */
                function AuthInfo(p) {
                    this.signerInfos = [];
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * AuthInfo signerInfos.
                 * @member {Array.<cosmos_sdk.tx.v1.ISignerInfo>} signerInfos
                 * @memberof cosmos_sdk.tx.v1.AuthInfo
                 * @instance
                 */
                AuthInfo.prototype.signerInfos = $util.emptyArray;

                /**
                 * AuthInfo fee.
                 * @member {cosmos_sdk.tx.v1.IFee|null|undefined} fee
                 * @memberof cosmos_sdk.tx.v1.AuthInfo
                 * @instance
                 */
                AuthInfo.prototype.fee = null;

                /**
                 * Creates a new AuthInfo instance using the specified properties.
                 * @function create
                 * @memberof cosmos_sdk.tx.v1.AuthInfo
                 * @static
                 * @param {cosmos_sdk.tx.v1.IAuthInfo=} [properties] Properties to set
                 * @returns {cosmos_sdk.tx.v1.AuthInfo} AuthInfo instance
                 */
                AuthInfo.create = function create(properties) {
                    return new AuthInfo(properties);
                };

                /**
                 * Encodes the specified AuthInfo message. Does not implicitly {@link cosmos_sdk.tx.v1.AuthInfo.verify|verify} messages.
                 * @function encode
                 * @memberof cosmos_sdk.tx.v1.AuthInfo
                 * @static
                 * @param {cosmos_sdk.tx.v1.IAuthInfo} m AuthInfo message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AuthInfo.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.signerInfos != null && m.signerInfos.length) {
                        for (var i = 0; i < m.signerInfos.length; ++i)
                            $root.cosmos_sdk.tx.v1.SignerInfo.encode(m.signerInfos[i], w.uint32(10).fork()).ldelim();
                    }
                    if (m.fee != null && Object.hasOwnProperty.call(m, "fee"))
                        $root.cosmos_sdk.tx.v1.Fee.encode(m.fee, w.uint32(18).fork()).ldelim();
                    return w;
                };

                /**
                 * Decodes an AuthInfo message from the specified reader or buffer.
                 * @function decode
                 * @memberof cosmos_sdk.tx.v1.AuthInfo
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {cosmos_sdk.tx.v1.AuthInfo} AuthInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AuthInfo.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.cosmos_sdk.tx.v1.AuthInfo();
                    while (r.pos < c) {
                        var t = r.uint32();
                        switch (t >>> 3) {
                        case 1:
                            if (!(m.signerInfos && m.signerInfos.length))
                                m.signerInfos = [];
                            m.signerInfos.push($root.cosmos_sdk.tx.v1.SignerInfo.decode(r, r.uint32()));
                            break;
                        case 2:
                            m.fee = $root.cosmos_sdk.tx.v1.Fee.decode(r, r.uint32());
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

            v1.SignerInfo = (function() {

                /**
                 * Properties of a SignerInfo.
                 * @memberof cosmos_sdk.tx.v1
                 * @interface ISignerInfo
                 * @property {google.protobuf.IAny|null} [publicKey] SignerInfo publicKey
                 * @property {cosmos_sdk.tx.v1.IModeInfo|null} [modeInfo] SignerInfo modeInfo
                 */

                /**
                 * Constructs a new SignerInfo.
                 * @memberof cosmos_sdk.tx.v1
                 * @classdesc Represents a SignerInfo.
                 * @implements ISignerInfo
                 * @constructor
                 * @param {cosmos_sdk.tx.v1.ISignerInfo=} [p] Properties to set
                 */
                function SignerInfo(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * SignerInfo publicKey.
                 * @member {google.protobuf.IAny|null|undefined} publicKey
                 * @memberof cosmos_sdk.tx.v1.SignerInfo
                 * @instance
                 */
                SignerInfo.prototype.publicKey = null;

                /**
                 * SignerInfo modeInfo.
                 * @member {cosmos_sdk.tx.v1.IModeInfo|null|undefined} modeInfo
                 * @memberof cosmos_sdk.tx.v1.SignerInfo
                 * @instance
                 */
                SignerInfo.prototype.modeInfo = null;

                /**
                 * Creates a new SignerInfo instance using the specified properties.
                 * @function create
                 * @memberof cosmos_sdk.tx.v1.SignerInfo
                 * @static
                 * @param {cosmos_sdk.tx.v1.ISignerInfo=} [properties] Properties to set
                 * @returns {cosmos_sdk.tx.v1.SignerInfo} SignerInfo instance
                 */
                SignerInfo.create = function create(properties) {
                    return new SignerInfo(properties);
                };

                /**
                 * Encodes the specified SignerInfo message. Does not implicitly {@link cosmos_sdk.tx.v1.SignerInfo.verify|verify} messages.
                 * @function encode
                 * @memberof cosmos_sdk.tx.v1.SignerInfo
                 * @static
                 * @param {cosmos_sdk.tx.v1.ISignerInfo} m SignerInfo message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                SignerInfo.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.publicKey != null && Object.hasOwnProperty.call(m, "publicKey"))
                        $root.google.protobuf.Any.encode(m.publicKey, w.uint32(10).fork()).ldelim();
                    if (m.modeInfo != null && Object.hasOwnProperty.call(m, "modeInfo"))
                        $root.cosmos_sdk.tx.v1.ModeInfo.encode(m.modeInfo, w.uint32(18).fork()).ldelim();
                    return w;
                };

                /**
                 * Decodes a SignerInfo message from the specified reader or buffer.
                 * @function decode
                 * @memberof cosmos_sdk.tx.v1.SignerInfo
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {cosmos_sdk.tx.v1.SignerInfo} SignerInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                SignerInfo.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.cosmos_sdk.tx.v1.SignerInfo();
                    while (r.pos < c) {
                        var t = r.uint32();
                        switch (t >>> 3) {
                        case 1:
                            m.publicKey = $root.google.protobuf.Any.decode(r, r.uint32());
                            break;
                        case 2:
                            m.modeInfo = $root.cosmos_sdk.tx.v1.ModeInfo.decode(r, r.uint32());
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

            v1.ModeInfo = (function() {

                /**
                 * Properties of a ModeInfo.
                 * @memberof cosmos_sdk.tx.v1
                 * @interface IModeInfo
                 * @property {cosmos_sdk.tx.v1.ModeInfo.ISingle|null} [single] ModeInfo single
                 * @property {cosmos_sdk.tx.v1.ModeInfo.IMulti|null} [multi] ModeInfo multi
                 */

                /**
                 * Constructs a new ModeInfo.
                 * @memberof cosmos_sdk.tx.v1
                 * @classdesc Represents a ModeInfo.
                 * @implements IModeInfo
                 * @constructor
                 * @param {cosmos_sdk.tx.v1.IModeInfo=} [p] Properties to set
                 */
                function ModeInfo(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * ModeInfo single.
                 * @member {cosmos_sdk.tx.v1.ModeInfo.ISingle|null|undefined} single
                 * @memberof cosmos_sdk.tx.v1.ModeInfo
                 * @instance
                 */
                ModeInfo.prototype.single = null;

                /**
                 * ModeInfo multi.
                 * @member {cosmos_sdk.tx.v1.ModeInfo.IMulti|null|undefined} multi
                 * @memberof cosmos_sdk.tx.v1.ModeInfo
                 * @instance
                 */
                ModeInfo.prototype.multi = null;

                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;

                /**
                 * ModeInfo sum.
                 * @member {"single"|"multi"|undefined} sum
                 * @memberof cosmos_sdk.tx.v1.ModeInfo
                 * @instance
                 */
                Object.defineProperty(ModeInfo.prototype, "sum", {
                    get: $util.oneOfGetter($oneOfFields = ["single", "multi"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Creates a new ModeInfo instance using the specified properties.
                 * @function create
                 * @memberof cosmos_sdk.tx.v1.ModeInfo
                 * @static
                 * @param {cosmos_sdk.tx.v1.IModeInfo=} [properties] Properties to set
                 * @returns {cosmos_sdk.tx.v1.ModeInfo} ModeInfo instance
                 */
                ModeInfo.create = function create(properties) {
                    return new ModeInfo(properties);
                };

                /**
                 * Encodes the specified ModeInfo message. Does not implicitly {@link cosmos_sdk.tx.v1.ModeInfo.verify|verify} messages.
                 * @function encode
                 * @memberof cosmos_sdk.tx.v1.ModeInfo
                 * @static
                 * @param {cosmos_sdk.tx.v1.IModeInfo} m ModeInfo message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ModeInfo.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.single != null && Object.hasOwnProperty.call(m, "single"))
                        $root.cosmos_sdk.tx.v1.ModeInfo.Single.encode(m.single, w.uint32(10).fork()).ldelim();
                    if (m.multi != null && Object.hasOwnProperty.call(m, "multi"))
                        $root.cosmos_sdk.tx.v1.ModeInfo.Multi.encode(m.multi, w.uint32(18).fork()).ldelim();
                    return w;
                };

                /**
                 * Decodes a ModeInfo message from the specified reader or buffer.
                 * @function decode
                 * @memberof cosmos_sdk.tx.v1.ModeInfo
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {cosmos_sdk.tx.v1.ModeInfo} ModeInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ModeInfo.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.cosmos_sdk.tx.v1.ModeInfo();
                    while (r.pos < c) {
                        var t = r.uint32();
                        switch (t >>> 3) {
                        case 1:
                            m.single = $root.cosmos_sdk.tx.v1.ModeInfo.Single.decode(r, r.uint32());
                            break;
                        case 2:
                            m.multi = $root.cosmos_sdk.tx.v1.ModeInfo.Multi.decode(r, r.uint32());
                            break;
                        default:
                            r.skipType(t & 7);
                            break;
                        }
                    }
                    return m;
                };

                ModeInfo.Single = (function() {

                    /**
                     * Properties of a Single.
                     * @memberof cosmos_sdk.tx.v1.ModeInfo
                     * @interface ISingle
                     * @property {cosmos_sdk.tx.signing.v1.SignMode|null} [mode] Single mode
                     */

                    /**
                     * Constructs a new Single.
                     * @memberof cosmos_sdk.tx.v1.ModeInfo
                     * @classdesc Represents a Single.
                     * @implements ISingle
                     * @constructor
                     * @param {cosmos_sdk.tx.v1.ModeInfo.ISingle=} [p] Properties to set
                     */
                    function Single(p) {
                        if (p)
                            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                                if (p[ks[i]] != null)
                                    this[ks[i]] = p[ks[i]];
                    }

                    /**
                     * Single mode.
                     * @member {cosmos_sdk.tx.signing.v1.SignMode} mode
                     * @memberof cosmos_sdk.tx.v1.ModeInfo.Single
                     * @instance
                     */
                    Single.prototype.mode = 0;

                    /**
                     * Creates a new Single instance using the specified properties.
                     * @function create
                     * @memberof cosmos_sdk.tx.v1.ModeInfo.Single
                     * @static
                     * @param {cosmos_sdk.tx.v1.ModeInfo.ISingle=} [properties] Properties to set
                     * @returns {cosmos_sdk.tx.v1.ModeInfo.Single} Single instance
                     */
                    Single.create = function create(properties) {
                        return new Single(properties);
                    };

                    /**
                     * Encodes the specified Single message. Does not implicitly {@link cosmos_sdk.tx.v1.ModeInfo.Single.verify|verify} messages.
                     * @function encode
                     * @memberof cosmos_sdk.tx.v1.ModeInfo.Single
                     * @static
                     * @param {cosmos_sdk.tx.v1.ModeInfo.ISingle} m Single message or plain object to encode
                     * @param {$protobuf.Writer} [w] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Single.encode = function encode(m, w) {
                        if (!w)
                            w = $Writer.create();
                        if (m.mode != null && Object.hasOwnProperty.call(m, "mode"))
                            w.uint32(8).int32(m.mode);
                        return w;
                    };

                    /**
                     * Decodes a Single message from the specified reader or buffer.
                     * @function decode
                     * @memberof cosmos_sdk.tx.v1.ModeInfo.Single
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                     * @param {number} [l] Message length if known beforehand
                     * @returns {cosmos_sdk.tx.v1.ModeInfo.Single} Single
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Single.decode = function decode(r, l) {
                        if (!(r instanceof $Reader))
                            r = $Reader.create(r);
                        var c = l === undefined ? r.len : r.pos + l, m = new $root.cosmos_sdk.tx.v1.ModeInfo.Single();
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

                ModeInfo.Multi = (function() {

                    /**
                     * Properties of a Multi.
                     * @memberof cosmos_sdk.tx.v1.ModeInfo
                     * @interface IMulti
                     * @property {cosmos_sdk.crypto.v1.ICompactBitArray|null} [bitarray] Multi bitarray
                     * @property {Array.<cosmos_sdk.tx.v1.IModeInfo>|null} [modeInfos] Multi modeInfos
                     */

                    /**
                     * Constructs a new Multi.
                     * @memberof cosmos_sdk.tx.v1.ModeInfo
                     * @classdesc Represents a Multi.
                     * @implements IMulti
                     * @constructor
                     * @param {cosmos_sdk.tx.v1.ModeInfo.IMulti=} [p] Properties to set
                     */
                    function Multi(p) {
                        this.modeInfos = [];
                        if (p)
                            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                                if (p[ks[i]] != null)
                                    this[ks[i]] = p[ks[i]];
                    }

                    /**
                     * Multi bitarray.
                     * @member {cosmos_sdk.crypto.v1.ICompactBitArray|null|undefined} bitarray
                     * @memberof cosmos_sdk.tx.v1.ModeInfo.Multi
                     * @instance
                     */
                    Multi.prototype.bitarray = null;

                    /**
                     * Multi modeInfos.
                     * @member {Array.<cosmos_sdk.tx.v1.IModeInfo>} modeInfos
                     * @memberof cosmos_sdk.tx.v1.ModeInfo.Multi
                     * @instance
                     */
                    Multi.prototype.modeInfos = $util.emptyArray;

                    /**
                     * Creates a new Multi instance using the specified properties.
                     * @function create
                     * @memberof cosmos_sdk.tx.v1.ModeInfo.Multi
                     * @static
                     * @param {cosmos_sdk.tx.v1.ModeInfo.IMulti=} [properties] Properties to set
                     * @returns {cosmos_sdk.tx.v1.ModeInfo.Multi} Multi instance
                     */
                    Multi.create = function create(properties) {
                        return new Multi(properties);
                    };

                    /**
                     * Encodes the specified Multi message. Does not implicitly {@link cosmos_sdk.tx.v1.ModeInfo.Multi.verify|verify} messages.
                     * @function encode
                     * @memberof cosmos_sdk.tx.v1.ModeInfo.Multi
                     * @static
                     * @param {cosmos_sdk.tx.v1.ModeInfo.IMulti} m Multi message or plain object to encode
                     * @param {$protobuf.Writer} [w] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Multi.encode = function encode(m, w) {
                        if (!w)
                            w = $Writer.create();
                        if (m.bitarray != null && Object.hasOwnProperty.call(m, "bitarray"))
                            $root.cosmos_sdk.crypto.v1.CompactBitArray.encode(m.bitarray, w.uint32(10).fork()).ldelim();
                        if (m.modeInfos != null && m.modeInfos.length) {
                            for (var i = 0; i < m.modeInfos.length; ++i)
                                $root.cosmos_sdk.tx.v1.ModeInfo.encode(m.modeInfos[i], w.uint32(18).fork()).ldelim();
                        }
                        return w;
                    };

                    /**
                     * Decodes a Multi message from the specified reader or buffer.
                     * @function decode
                     * @memberof cosmos_sdk.tx.v1.ModeInfo.Multi
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                     * @param {number} [l] Message length if known beforehand
                     * @returns {cosmos_sdk.tx.v1.ModeInfo.Multi} Multi
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Multi.decode = function decode(r, l) {
                        if (!(r instanceof $Reader))
                            r = $Reader.create(r);
                        var c = l === undefined ? r.len : r.pos + l, m = new $root.cosmos_sdk.tx.v1.ModeInfo.Multi();
                        while (r.pos < c) {
                            var t = r.uint32();
                            switch (t >>> 3) {
                            case 1:
                                m.bitarray = $root.cosmos_sdk.crypto.v1.CompactBitArray.decode(r, r.uint32());
                                break;
                            case 2:
                                if (!(m.modeInfos && m.modeInfos.length))
                                    m.modeInfos = [];
                                m.modeInfos.push($root.cosmos_sdk.tx.v1.ModeInfo.decode(r, r.uint32()));
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

            v1.Fee = (function() {

                /**
                 * Properties of a Fee.
                 * @memberof cosmos_sdk.tx.v1
                 * @interface IFee
                 * @property {Array.<cosmos_sdk.v1.ICoin>|null} [amount] Fee amount
                 * @property {number|Long|null} [gasLimit] Fee gasLimit
                 */

                /**
                 * Constructs a new Fee.
                 * @memberof cosmos_sdk.tx.v1
                 * @classdesc Represents a Fee.
                 * @implements IFee
                 * @constructor
                 * @param {cosmos_sdk.tx.v1.IFee=} [p] Properties to set
                 */
                function Fee(p) {
                    this.amount = [];
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * Fee amount.
                 * @member {Array.<cosmos_sdk.v1.ICoin>} amount
                 * @memberof cosmos_sdk.tx.v1.Fee
                 * @instance
                 */
                Fee.prototype.amount = $util.emptyArray;

                /**
                 * Fee gasLimit.
                 * @member {number|Long} gasLimit
                 * @memberof cosmos_sdk.tx.v1.Fee
                 * @instance
                 */
                Fee.prototype.gasLimit = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * Creates a new Fee instance using the specified properties.
                 * @function create
                 * @memberof cosmos_sdk.tx.v1.Fee
                 * @static
                 * @param {cosmos_sdk.tx.v1.IFee=} [properties] Properties to set
                 * @returns {cosmos_sdk.tx.v1.Fee} Fee instance
                 */
                Fee.create = function create(properties) {
                    return new Fee(properties);
                };

                /**
                 * Encodes the specified Fee message. Does not implicitly {@link cosmos_sdk.tx.v1.Fee.verify|verify} messages.
                 * @function encode
                 * @memberof cosmos_sdk.tx.v1.Fee
                 * @static
                 * @param {cosmos_sdk.tx.v1.IFee} m Fee message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Fee.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.amount != null && m.amount.length) {
                        for (var i = 0; i < m.amount.length; ++i)
                            $root.cosmos_sdk.v1.Coin.encode(m.amount[i], w.uint32(10).fork()).ldelim();
                    }
                    if (m.gasLimit != null && Object.hasOwnProperty.call(m, "gasLimit"))
                        w.uint32(16).uint64(m.gasLimit);
                    return w;
                };

                /**
                 * Decodes a Fee message from the specified reader or buffer.
                 * @function decode
                 * @memberof cosmos_sdk.tx.v1.Fee
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {cosmos_sdk.tx.v1.Fee} Fee
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Fee.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.cosmos_sdk.tx.v1.Fee();
                    while (r.pos < c) {
                        var t = r.uint32();
                        switch (t >>> 3) {
                        case 1:
                            if (!(m.amount && m.amount.length))
                                m.amount = [];
                            m.amount.push($root.cosmos_sdk.v1.Coin.decode(r, r.uint32()));
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

            return v1;
        })();

        tx.signing = (function() {

            /**
             * Namespace signing.
             * @memberof cosmos_sdk.tx
             * @namespace
             */
            var signing = {};

            signing.v1 = (function() {

                /**
                 * Namespace v1.
                 * @memberof cosmos_sdk.tx.signing
                 * @namespace
                 */
                var v1 = {};

                /**
                 * SignMode enum.
                 * @name cosmos_sdk.tx.signing.v1.SignMode
                 * @enum {number}
                 * @property {number} SIGN_MODE_UNSPECIFIED=0 SIGN_MODE_UNSPECIFIED value
                 * @property {number} SIGN_MODE_DIRECT=1 SIGN_MODE_DIRECT value
                 * @property {number} SIGN_MODE_TEXTUAL=2 SIGN_MODE_TEXTUAL value
                 * @property {number} SIGN_MODE_LEGACY_AMINO_JSON=127 SIGN_MODE_LEGACY_AMINO_JSON value
                 */
                v1.SignMode = (function() {
                    var valuesById = {}, values = Object.create(valuesById);
                    values[valuesById[0] = "SIGN_MODE_UNSPECIFIED"] = 0;
                    values[valuesById[1] = "SIGN_MODE_DIRECT"] = 1;
                    values[valuesById[2] = "SIGN_MODE_TEXTUAL"] = 2;
                    values[valuesById[127] = "SIGN_MODE_LEGACY_AMINO_JSON"] = 127;
                    return values;
                })();

                return v1;
            })();

            return signing;
        })();

        return tx;
    })();

    cosmos_sdk.crypto = (function() {

        /**
         * Namespace crypto.
         * @memberof cosmos_sdk
         * @namespace
         */
        var crypto = {};

        crypto.v1 = (function() {

            /**
             * Namespace v1.
             * @memberof cosmos_sdk.crypto
             * @namespace
             */
            var v1 = {};

            v1.PublicKey = (function() {

                /**
                 * Properties of a PublicKey.
                 * @memberof cosmos_sdk.crypto.v1
                 * @interface IPublicKey
                 * @property {Uint8Array|null} [secp256k1] PublicKey secp256k1
                 * @property {Uint8Array|null} [ed25519] PublicKey ed25519
                 * @property {Uint8Array|null} [sr25519] PublicKey sr25519
                 * @property {cosmos_sdk.crypto.v1.IPubKeyMultisigThreshold|null} [multisig] PublicKey multisig
                 * @property {Uint8Array|null} [secp256r1] PublicKey secp256r1
                 * @property {google.protobuf.IAny|null} [anyPubkey] PublicKey anyPubkey
                 */

                /**
                 * Constructs a new PublicKey.
                 * @memberof cosmos_sdk.crypto.v1
                 * @classdesc Represents a PublicKey.
                 * @implements IPublicKey
                 * @constructor
                 * @param {cosmos_sdk.crypto.v1.IPublicKey=} [p] Properties to set
                 */
                function PublicKey(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * PublicKey secp256k1.
                 * @member {Uint8Array} secp256k1
                 * @memberof cosmos_sdk.crypto.v1.PublicKey
                 * @instance
                 */
                PublicKey.prototype.secp256k1 = $util.newBuffer([]);

                /**
                 * PublicKey ed25519.
                 * @member {Uint8Array} ed25519
                 * @memberof cosmos_sdk.crypto.v1.PublicKey
                 * @instance
                 */
                PublicKey.prototype.ed25519 = $util.newBuffer([]);

                /**
                 * PublicKey sr25519.
                 * @member {Uint8Array} sr25519
                 * @memberof cosmos_sdk.crypto.v1.PublicKey
                 * @instance
                 */
                PublicKey.prototype.sr25519 = $util.newBuffer([]);

                /**
                 * PublicKey multisig.
                 * @member {cosmos_sdk.crypto.v1.IPubKeyMultisigThreshold|null|undefined} multisig
                 * @memberof cosmos_sdk.crypto.v1.PublicKey
                 * @instance
                 */
                PublicKey.prototype.multisig = null;

                /**
                 * PublicKey secp256r1.
                 * @member {Uint8Array} secp256r1
                 * @memberof cosmos_sdk.crypto.v1.PublicKey
                 * @instance
                 */
                PublicKey.prototype.secp256r1 = $util.newBuffer([]);

                /**
                 * PublicKey anyPubkey.
                 * @member {google.protobuf.IAny|null|undefined} anyPubkey
                 * @memberof cosmos_sdk.crypto.v1.PublicKey
                 * @instance
                 */
                PublicKey.prototype.anyPubkey = null;

                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;

                /**
                 * PublicKey sum.
                 * @member {"secp256k1"|"ed25519"|"sr25519"|"multisig"|"secp256r1"|"anyPubkey"|undefined} sum
                 * @memberof cosmos_sdk.crypto.v1.PublicKey
                 * @instance
                 */
                Object.defineProperty(PublicKey.prototype, "sum", {
                    get: $util.oneOfGetter($oneOfFields = ["secp256k1", "ed25519", "sr25519", "multisig", "secp256r1", "anyPubkey"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Creates a new PublicKey instance using the specified properties.
                 * @function create
                 * @memberof cosmos_sdk.crypto.v1.PublicKey
                 * @static
                 * @param {cosmos_sdk.crypto.v1.IPublicKey=} [properties] Properties to set
                 * @returns {cosmos_sdk.crypto.v1.PublicKey} PublicKey instance
                 */
                PublicKey.create = function create(properties) {
                    return new PublicKey(properties);
                };

                /**
                 * Encodes the specified PublicKey message. Does not implicitly {@link cosmos_sdk.crypto.v1.PublicKey.verify|verify} messages.
                 * @function encode
                 * @memberof cosmos_sdk.crypto.v1.PublicKey
                 * @static
                 * @param {cosmos_sdk.crypto.v1.IPublicKey} m PublicKey message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PublicKey.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.secp256k1 != null && Object.hasOwnProperty.call(m, "secp256k1"))
                        w.uint32(10).bytes(m.secp256k1);
                    if (m.ed25519 != null && Object.hasOwnProperty.call(m, "ed25519"))
                        w.uint32(18).bytes(m.ed25519);
                    if (m.sr25519 != null && Object.hasOwnProperty.call(m, "sr25519"))
                        w.uint32(26).bytes(m.sr25519);
                    if (m.multisig != null && Object.hasOwnProperty.call(m, "multisig"))
                        $root.cosmos_sdk.crypto.v1.PubKeyMultisigThreshold.encode(m.multisig, w.uint32(34).fork()).ldelim();
                    if (m.secp256r1 != null && Object.hasOwnProperty.call(m, "secp256r1"))
                        w.uint32(42).bytes(m.secp256r1);
                    if (m.anyPubkey != null && Object.hasOwnProperty.call(m, "anyPubkey"))
                        $root.google.protobuf.Any.encode(m.anyPubkey, w.uint32(122).fork()).ldelim();
                    return w;
                };

                /**
                 * Decodes a PublicKey message from the specified reader or buffer.
                 * @function decode
                 * @memberof cosmos_sdk.crypto.v1.PublicKey
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {cosmos_sdk.crypto.v1.PublicKey} PublicKey
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PublicKey.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.cosmos_sdk.crypto.v1.PublicKey();
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
                            m.multisig = $root.cosmos_sdk.crypto.v1.PubKeyMultisigThreshold.decode(r, r.uint32());
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

            v1.PubKeyMultisigThreshold = (function() {

                /**
                 * Properties of a PubKeyMultisigThreshold.
                 * @memberof cosmos_sdk.crypto.v1
                 * @interface IPubKeyMultisigThreshold
                 * @property {number|null} [threshold] PubKeyMultisigThreshold threshold
                 * @property {Array.<cosmos_sdk.crypto.v1.IPublicKey>|null} [publicKeys] PubKeyMultisigThreshold publicKeys
                 */

                /**
                 * Constructs a new PubKeyMultisigThreshold.
                 * @memberof cosmos_sdk.crypto.v1
                 * @classdesc Represents a PubKeyMultisigThreshold.
                 * @implements IPubKeyMultisigThreshold
                 * @constructor
                 * @param {cosmos_sdk.crypto.v1.IPubKeyMultisigThreshold=} [p] Properties to set
                 */
                function PubKeyMultisigThreshold(p) {
                    this.publicKeys = [];
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * PubKeyMultisigThreshold threshold.
                 * @member {number} threshold
                 * @memberof cosmos_sdk.crypto.v1.PubKeyMultisigThreshold
                 * @instance
                 */
                PubKeyMultisigThreshold.prototype.threshold = 0;

                /**
                 * PubKeyMultisigThreshold publicKeys.
                 * @member {Array.<cosmos_sdk.crypto.v1.IPublicKey>} publicKeys
                 * @memberof cosmos_sdk.crypto.v1.PubKeyMultisigThreshold
                 * @instance
                 */
                PubKeyMultisigThreshold.prototype.publicKeys = $util.emptyArray;

                /**
                 * Creates a new PubKeyMultisigThreshold instance using the specified properties.
                 * @function create
                 * @memberof cosmos_sdk.crypto.v1.PubKeyMultisigThreshold
                 * @static
                 * @param {cosmos_sdk.crypto.v1.IPubKeyMultisigThreshold=} [properties] Properties to set
                 * @returns {cosmos_sdk.crypto.v1.PubKeyMultisigThreshold} PubKeyMultisigThreshold instance
                 */
                PubKeyMultisigThreshold.create = function create(properties) {
                    return new PubKeyMultisigThreshold(properties);
                };

                /**
                 * Encodes the specified PubKeyMultisigThreshold message. Does not implicitly {@link cosmos_sdk.crypto.v1.PubKeyMultisigThreshold.verify|verify} messages.
                 * @function encode
                 * @memberof cosmos_sdk.crypto.v1.PubKeyMultisigThreshold
                 * @static
                 * @param {cosmos_sdk.crypto.v1.IPubKeyMultisigThreshold} m PubKeyMultisigThreshold message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PubKeyMultisigThreshold.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.threshold != null && Object.hasOwnProperty.call(m, "threshold"))
                        w.uint32(8).uint32(m.threshold);
                    if (m.publicKeys != null && m.publicKeys.length) {
                        for (var i = 0; i < m.publicKeys.length; ++i)
                            $root.cosmos_sdk.crypto.v1.PublicKey.encode(m.publicKeys[i], w.uint32(18).fork()).ldelim();
                    }
                    return w;
                };

                /**
                 * Decodes a PubKeyMultisigThreshold message from the specified reader or buffer.
                 * @function decode
                 * @memberof cosmos_sdk.crypto.v1.PubKeyMultisigThreshold
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {cosmos_sdk.crypto.v1.PubKeyMultisigThreshold} PubKeyMultisigThreshold
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PubKeyMultisigThreshold.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.cosmos_sdk.crypto.v1.PubKeyMultisigThreshold();
                    while (r.pos < c) {
                        var t = r.uint32();
                        switch (t >>> 3) {
                        case 1:
                            m.threshold = r.uint32();
                            break;
                        case 2:
                            if (!(m.publicKeys && m.publicKeys.length))
                                m.publicKeys = [];
                            m.publicKeys.push($root.cosmos_sdk.crypto.v1.PublicKey.decode(r, r.uint32()));
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

            v1.MultiSignature = (function() {

                /**
                 * Properties of a MultiSignature.
                 * @memberof cosmos_sdk.crypto.v1
                 * @interface IMultiSignature
                 * @property {Array.<Uint8Array>|null} [signatures] MultiSignature signatures
                 */

                /**
                 * Constructs a new MultiSignature.
                 * @memberof cosmos_sdk.crypto.v1
                 * @classdesc Represents a MultiSignature.
                 * @implements IMultiSignature
                 * @constructor
                 * @param {cosmos_sdk.crypto.v1.IMultiSignature=} [p] Properties to set
                 */
                function MultiSignature(p) {
                    this.signatures = [];
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * MultiSignature signatures.
                 * @member {Array.<Uint8Array>} signatures
                 * @memberof cosmos_sdk.crypto.v1.MultiSignature
                 * @instance
                 */
                MultiSignature.prototype.signatures = $util.emptyArray;

                /**
                 * Creates a new MultiSignature instance using the specified properties.
                 * @function create
                 * @memberof cosmos_sdk.crypto.v1.MultiSignature
                 * @static
                 * @param {cosmos_sdk.crypto.v1.IMultiSignature=} [properties] Properties to set
                 * @returns {cosmos_sdk.crypto.v1.MultiSignature} MultiSignature instance
                 */
                MultiSignature.create = function create(properties) {
                    return new MultiSignature(properties);
                };

                /**
                 * Encodes the specified MultiSignature message. Does not implicitly {@link cosmos_sdk.crypto.v1.MultiSignature.verify|verify} messages.
                 * @function encode
                 * @memberof cosmos_sdk.crypto.v1.MultiSignature
                 * @static
                 * @param {cosmos_sdk.crypto.v1.IMultiSignature} m MultiSignature message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                MultiSignature.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.signatures != null && m.signatures.length) {
                        for (var i = 0; i < m.signatures.length; ++i)
                            w.uint32(10).bytes(m.signatures[i]);
                    }
                    return w;
                };

                /**
                 * Decodes a MultiSignature message from the specified reader or buffer.
                 * @function decode
                 * @memberof cosmos_sdk.crypto.v1.MultiSignature
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {cosmos_sdk.crypto.v1.MultiSignature} MultiSignature
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                MultiSignature.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.cosmos_sdk.crypto.v1.MultiSignature();
                    while (r.pos < c) {
                        var t = r.uint32();
                        switch (t >>> 3) {
                        case 1:
                            if (!(m.signatures && m.signatures.length))
                                m.signatures = [];
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

            v1.CompactBitArray = (function() {

                /**
                 * Properties of a CompactBitArray.
                 * @memberof cosmos_sdk.crypto.v1
                 * @interface ICompactBitArray
                 * @property {number|null} [extraBitsStored] CompactBitArray extraBitsStored
                 * @property {Uint8Array|null} [elems] CompactBitArray elems
                 */

                /**
                 * Constructs a new CompactBitArray.
                 * @memberof cosmos_sdk.crypto.v1
                 * @classdesc Represents a CompactBitArray.
                 * @implements ICompactBitArray
                 * @constructor
                 * @param {cosmos_sdk.crypto.v1.ICompactBitArray=} [p] Properties to set
                 */
                function CompactBitArray(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * CompactBitArray extraBitsStored.
                 * @member {number} extraBitsStored
                 * @memberof cosmos_sdk.crypto.v1.CompactBitArray
                 * @instance
                 */
                CompactBitArray.prototype.extraBitsStored = 0;

                /**
                 * CompactBitArray elems.
                 * @member {Uint8Array} elems
                 * @memberof cosmos_sdk.crypto.v1.CompactBitArray
                 * @instance
                 */
                CompactBitArray.prototype.elems = $util.newBuffer([]);

                /**
                 * Creates a new CompactBitArray instance using the specified properties.
                 * @function create
                 * @memberof cosmos_sdk.crypto.v1.CompactBitArray
                 * @static
                 * @param {cosmos_sdk.crypto.v1.ICompactBitArray=} [properties] Properties to set
                 * @returns {cosmos_sdk.crypto.v1.CompactBitArray} CompactBitArray instance
                 */
                CompactBitArray.create = function create(properties) {
                    return new CompactBitArray(properties);
                };

                /**
                 * Encodes the specified CompactBitArray message. Does not implicitly {@link cosmos_sdk.crypto.v1.CompactBitArray.verify|verify} messages.
                 * @function encode
                 * @memberof cosmos_sdk.crypto.v1.CompactBitArray
                 * @static
                 * @param {cosmos_sdk.crypto.v1.ICompactBitArray} m CompactBitArray message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                CompactBitArray.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.extraBitsStored != null && Object.hasOwnProperty.call(m, "extraBitsStored"))
                        w.uint32(8).uint32(m.extraBitsStored);
                    if (m.elems != null && Object.hasOwnProperty.call(m, "elems"))
                        w.uint32(18).bytes(m.elems);
                    return w;
                };

                /**
                 * Decodes a CompactBitArray message from the specified reader or buffer.
                 * @function decode
                 * @memberof cosmos_sdk.crypto.v1.CompactBitArray
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {cosmos_sdk.crypto.v1.CompactBitArray} CompactBitArray
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                CompactBitArray.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.cosmos_sdk.crypto.v1.CompactBitArray();
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

            return v1;
        })();

        return crypto;
    })();

    return cosmos_sdk;
})();

$root.tendermint = (function() {

    /**
     * Namespace tendermint.
     * @exports tendermint
     * @namespace
     */
    var tendermint = {};

    tendermint.abci = (function() {

        /**
         * Namespace abci.
         * @memberof tendermint
         * @namespace
         */
        var abci = {};

        abci.types = (function() {

            /**
             * Namespace types.
             * @memberof tendermint.abci
             * @namespace
             */
            var types = {};

            types.Request = (function() {

                /**
                 * Properties of a Request.
                 * @memberof tendermint.abci.types
                 * @interface IRequest
                 * @property {tendermint.abci.types.IRequestEcho|null} [echo] Request echo
                 * @property {tendermint.abci.types.IRequestFlush|null} [flush] Request flush
                 * @property {tendermint.abci.types.IRequestInfo|null} [info] Request info
                 * @property {tendermint.abci.types.IRequestSetOption|null} [setOption] Request setOption
                 * @property {tendermint.abci.types.IRequestInitChain|null} [initChain] Request initChain
                 * @property {tendermint.abci.types.IRequestQuery|null} [query] Request query
                 * @property {tendermint.abci.types.IRequestBeginBlock|null} [beginBlock] Request beginBlock
                 * @property {tendermint.abci.types.IRequestCheckTx|null} [checkTx] Request checkTx
                 * @property {tendermint.abci.types.IRequestDeliverTx|null} [deliverTx] Request deliverTx
                 * @property {tendermint.abci.types.IRequestEndBlock|null} [endBlock] Request endBlock
                 * @property {tendermint.abci.types.IRequestCommit|null} [commit] Request commit
                 */

                /**
                 * Constructs a new Request.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a Request.
                 * @implements IRequest
                 * @constructor
                 * @param {tendermint.abci.types.IRequest=} [p] Properties to set
                 */
                function Request(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * Request echo.
                 * @member {tendermint.abci.types.IRequestEcho|null|undefined} echo
                 * @memberof tendermint.abci.types.Request
                 * @instance
                 */
                Request.prototype.echo = null;

                /**
                 * Request flush.
                 * @member {tendermint.abci.types.IRequestFlush|null|undefined} flush
                 * @memberof tendermint.abci.types.Request
                 * @instance
                 */
                Request.prototype.flush = null;

                /**
                 * Request info.
                 * @member {tendermint.abci.types.IRequestInfo|null|undefined} info
                 * @memberof tendermint.abci.types.Request
                 * @instance
                 */
                Request.prototype.info = null;

                /**
                 * Request setOption.
                 * @member {tendermint.abci.types.IRequestSetOption|null|undefined} setOption
                 * @memberof tendermint.abci.types.Request
                 * @instance
                 */
                Request.prototype.setOption = null;

                /**
                 * Request initChain.
                 * @member {tendermint.abci.types.IRequestInitChain|null|undefined} initChain
                 * @memberof tendermint.abci.types.Request
                 * @instance
                 */
                Request.prototype.initChain = null;

                /**
                 * Request query.
                 * @member {tendermint.abci.types.IRequestQuery|null|undefined} query
                 * @memberof tendermint.abci.types.Request
                 * @instance
                 */
                Request.prototype.query = null;

                /**
                 * Request beginBlock.
                 * @member {tendermint.abci.types.IRequestBeginBlock|null|undefined} beginBlock
                 * @memberof tendermint.abci.types.Request
                 * @instance
                 */
                Request.prototype.beginBlock = null;

                /**
                 * Request checkTx.
                 * @member {tendermint.abci.types.IRequestCheckTx|null|undefined} checkTx
                 * @memberof tendermint.abci.types.Request
                 * @instance
                 */
                Request.prototype.checkTx = null;

                /**
                 * Request deliverTx.
                 * @member {tendermint.abci.types.IRequestDeliverTx|null|undefined} deliverTx
                 * @memberof tendermint.abci.types.Request
                 * @instance
                 */
                Request.prototype.deliverTx = null;

                /**
                 * Request endBlock.
                 * @member {tendermint.abci.types.IRequestEndBlock|null|undefined} endBlock
                 * @memberof tendermint.abci.types.Request
                 * @instance
                 */
                Request.prototype.endBlock = null;

                /**
                 * Request commit.
                 * @member {tendermint.abci.types.IRequestCommit|null|undefined} commit
                 * @memberof tendermint.abci.types.Request
                 * @instance
                 */
                Request.prototype.commit = null;

                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;

                /**
                 * Request value.
                 * @member {"echo"|"flush"|"info"|"setOption"|"initChain"|"query"|"beginBlock"|"checkTx"|"deliverTx"|"endBlock"|"commit"|undefined} value
                 * @memberof tendermint.abci.types.Request
                 * @instance
                 */
                Object.defineProperty(Request.prototype, "value", {
                    get: $util.oneOfGetter($oneOfFields = ["echo", "flush", "info", "setOption", "initChain", "query", "beginBlock", "checkTx", "deliverTx", "endBlock", "commit"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Creates a new Request instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.Request
                 * @static
                 * @param {tendermint.abci.types.IRequest=} [properties] Properties to set
                 * @returns {tendermint.abci.types.Request} Request instance
                 */
                Request.create = function create(properties) {
                    return new Request(properties);
                };

                /**
                 * Encodes the specified Request message. Does not implicitly {@link tendermint.abci.types.Request.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.Request
                 * @static
                 * @param {tendermint.abci.types.IRequest} m Request message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Request.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
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

                /**
                 * Decodes a Request message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.Request
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.Request} Request
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Request.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.Request();
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

            types.RequestEcho = (function() {

                /**
                 * Properties of a RequestEcho.
                 * @memberof tendermint.abci.types
                 * @interface IRequestEcho
                 * @property {string|null} [message] RequestEcho message
                 */

                /**
                 * Constructs a new RequestEcho.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a RequestEcho.
                 * @implements IRequestEcho
                 * @constructor
                 * @param {tendermint.abci.types.IRequestEcho=} [p] Properties to set
                 */
                function RequestEcho(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * RequestEcho message.
                 * @member {string} message
                 * @memberof tendermint.abci.types.RequestEcho
                 * @instance
                 */
                RequestEcho.prototype.message = "";

                /**
                 * Creates a new RequestEcho instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.RequestEcho
                 * @static
                 * @param {tendermint.abci.types.IRequestEcho=} [properties] Properties to set
                 * @returns {tendermint.abci.types.RequestEcho} RequestEcho instance
                 */
                RequestEcho.create = function create(properties) {
                    return new RequestEcho(properties);
                };

                /**
                 * Encodes the specified RequestEcho message. Does not implicitly {@link tendermint.abci.types.RequestEcho.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.RequestEcho
                 * @static
                 * @param {tendermint.abci.types.IRequestEcho} m RequestEcho message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RequestEcho.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.message != null && Object.hasOwnProperty.call(m, "message"))
                        w.uint32(10).string(m.message);
                    return w;
                };

                /**
                 * Decodes a RequestEcho message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.RequestEcho
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.RequestEcho} RequestEcho
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RequestEcho.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.RequestEcho();
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

            types.RequestFlush = (function() {

                /**
                 * Properties of a RequestFlush.
                 * @memberof tendermint.abci.types
                 * @interface IRequestFlush
                 */

                /**
                 * Constructs a new RequestFlush.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a RequestFlush.
                 * @implements IRequestFlush
                 * @constructor
                 * @param {tendermint.abci.types.IRequestFlush=} [p] Properties to set
                 */
                function RequestFlush(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * Creates a new RequestFlush instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.RequestFlush
                 * @static
                 * @param {tendermint.abci.types.IRequestFlush=} [properties] Properties to set
                 * @returns {tendermint.abci.types.RequestFlush} RequestFlush instance
                 */
                RequestFlush.create = function create(properties) {
                    return new RequestFlush(properties);
                };

                /**
                 * Encodes the specified RequestFlush message. Does not implicitly {@link tendermint.abci.types.RequestFlush.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.RequestFlush
                 * @static
                 * @param {tendermint.abci.types.IRequestFlush} m RequestFlush message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RequestFlush.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    return w;
                };

                /**
                 * Decodes a RequestFlush message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.RequestFlush
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.RequestFlush} RequestFlush
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RequestFlush.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.RequestFlush();
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

            types.RequestInfo = (function() {

                /**
                 * Properties of a RequestInfo.
                 * @memberof tendermint.abci.types
                 * @interface IRequestInfo
                 * @property {string|null} [version] RequestInfo version
                 * @property {number|Long|null} [blockVersion] RequestInfo blockVersion
                 * @property {number|Long|null} [p2pVersion] RequestInfo p2pVersion
                 */

                /**
                 * Constructs a new RequestInfo.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a RequestInfo.
                 * @implements IRequestInfo
                 * @constructor
                 * @param {tendermint.abci.types.IRequestInfo=} [p] Properties to set
                 */
                function RequestInfo(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * RequestInfo version.
                 * @member {string} version
                 * @memberof tendermint.abci.types.RequestInfo
                 * @instance
                 */
                RequestInfo.prototype.version = "";

                /**
                 * RequestInfo blockVersion.
                 * @member {number|Long} blockVersion
                 * @memberof tendermint.abci.types.RequestInfo
                 * @instance
                 */
                RequestInfo.prototype.blockVersion = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * RequestInfo p2pVersion.
                 * @member {number|Long} p2pVersion
                 * @memberof tendermint.abci.types.RequestInfo
                 * @instance
                 */
                RequestInfo.prototype.p2pVersion = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * Creates a new RequestInfo instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.RequestInfo
                 * @static
                 * @param {tendermint.abci.types.IRequestInfo=} [properties] Properties to set
                 * @returns {tendermint.abci.types.RequestInfo} RequestInfo instance
                 */
                RequestInfo.create = function create(properties) {
                    return new RequestInfo(properties);
                };

                /**
                 * Encodes the specified RequestInfo message. Does not implicitly {@link tendermint.abci.types.RequestInfo.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.RequestInfo
                 * @static
                 * @param {tendermint.abci.types.IRequestInfo} m RequestInfo message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RequestInfo.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.version != null && Object.hasOwnProperty.call(m, "version"))
                        w.uint32(10).string(m.version);
                    if (m.blockVersion != null && Object.hasOwnProperty.call(m, "blockVersion"))
                        w.uint32(16).uint64(m.blockVersion);
                    if (m.p2pVersion != null && Object.hasOwnProperty.call(m, "p2pVersion"))
                        w.uint32(24).uint64(m.p2pVersion);
                    return w;
                };

                /**
                 * Decodes a RequestInfo message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.RequestInfo
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.RequestInfo} RequestInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RequestInfo.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.RequestInfo();
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

            types.RequestSetOption = (function() {

                /**
                 * Properties of a RequestSetOption.
                 * @memberof tendermint.abci.types
                 * @interface IRequestSetOption
                 * @property {string|null} [key] RequestSetOption key
                 * @property {string|null} [value] RequestSetOption value
                 */

                /**
                 * Constructs a new RequestSetOption.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a RequestSetOption.
                 * @implements IRequestSetOption
                 * @constructor
                 * @param {tendermint.abci.types.IRequestSetOption=} [p] Properties to set
                 */
                function RequestSetOption(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * RequestSetOption key.
                 * @member {string} key
                 * @memberof tendermint.abci.types.RequestSetOption
                 * @instance
                 */
                RequestSetOption.prototype.key = "";

                /**
                 * RequestSetOption value.
                 * @member {string} value
                 * @memberof tendermint.abci.types.RequestSetOption
                 * @instance
                 */
                RequestSetOption.prototype.value = "";

                /**
                 * Creates a new RequestSetOption instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.RequestSetOption
                 * @static
                 * @param {tendermint.abci.types.IRequestSetOption=} [properties] Properties to set
                 * @returns {tendermint.abci.types.RequestSetOption} RequestSetOption instance
                 */
                RequestSetOption.create = function create(properties) {
                    return new RequestSetOption(properties);
                };

                /**
                 * Encodes the specified RequestSetOption message. Does not implicitly {@link tendermint.abci.types.RequestSetOption.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.RequestSetOption
                 * @static
                 * @param {tendermint.abci.types.IRequestSetOption} m RequestSetOption message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RequestSetOption.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.key != null && Object.hasOwnProperty.call(m, "key"))
                        w.uint32(10).string(m.key);
                    if (m.value != null && Object.hasOwnProperty.call(m, "value"))
                        w.uint32(18).string(m.value);
                    return w;
                };

                /**
                 * Decodes a RequestSetOption message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.RequestSetOption
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.RequestSetOption} RequestSetOption
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RequestSetOption.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.RequestSetOption();
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

            types.RequestInitChain = (function() {

                /**
                 * Properties of a RequestInitChain.
                 * @memberof tendermint.abci.types
                 * @interface IRequestInitChain
                 * @property {google.protobuf.ITimestamp|null} [time] RequestInitChain time
                 * @property {string|null} [chainId] RequestInitChain chainId
                 * @property {tendermint.abci.types.IConsensusParams|null} [consensusParams] RequestInitChain consensusParams
                 * @property {Array.<tendermint.abci.types.IValidatorUpdate>|null} [validators] RequestInitChain validators
                 * @property {Uint8Array|null} [appStateBytes] RequestInitChain appStateBytes
                 */

                /**
                 * Constructs a new RequestInitChain.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a RequestInitChain.
                 * @implements IRequestInitChain
                 * @constructor
                 * @param {tendermint.abci.types.IRequestInitChain=} [p] Properties to set
                 */
                function RequestInitChain(p) {
                    this.validators = [];
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * RequestInitChain time.
                 * @member {google.protobuf.ITimestamp|null|undefined} time
                 * @memberof tendermint.abci.types.RequestInitChain
                 * @instance
                 */
                RequestInitChain.prototype.time = null;

                /**
                 * RequestInitChain chainId.
                 * @member {string} chainId
                 * @memberof tendermint.abci.types.RequestInitChain
                 * @instance
                 */
                RequestInitChain.prototype.chainId = "";

                /**
                 * RequestInitChain consensusParams.
                 * @member {tendermint.abci.types.IConsensusParams|null|undefined} consensusParams
                 * @memberof tendermint.abci.types.RequestInitChain
                 * @instance
                 */
                RequestInitChain.prototype.consensusParams = null;

                /**
                 * RequestInitChain validators.
                 * @member {Array.<tendermint.abci.types.IValidatorUpdate>} validators
                 * @memberof tendermint.abci.types.RequestInitChain
                 * @instance
                 */
                RequestInitChain.prototype.validators = $util.emptyArray;

                /**
                 * RequestInitChain appStateBytes.
                 * @member {Uint8Array} appStateBytes
                 * @memberof tendermint.abci.types.RequestInitChain
                 * @instance
                 */
                RequestInitChain.prototype.appStateBytes = $util.newBuffer([]);

                /**
                 * Creates a new RequestInitChain instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.RequestInitChain
                 * @static
                 * @param {tendermint.abci.types.IRequestInitChain=} [properties] Properties to set
                 * @returns {tendermint.abci.types.RequestInitChain} RequestInitChain instance
                 */
                RequestInitChain.create = function create(properties) {
                    return new RequestInitChain(properties);
                };

                /**
                 * Encodes the specified RequestInitChain message. Does not implicitly {@link tendermint.abci.types.RequestInitChain.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.RequestInitChain
                 * @static
                 * @param {tendermint.abci.types.IRequestInitChain} m RequestInitChain message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RequestInitChain.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.time != null && Object.hasOwnProperty.call(m, "time"))
                        $root.google.protobuf.Timestamp.encode(m.time, w.uint32(10).fork()).ldelim();
                    if (m.chainId != null && Object.hasOwnProperty.call(m, "chainId"))
                        w.uint32(18).string(m.chainId);
                    if (m.consensusParams != null && Object.hasOwnProperty.call(m, "consensusParams"))
                        $root.tendermint.abci.types.ConsensusParams.encode(m.consensusParams, w.uint32(26).fork()).ldelim();
                    if (m.validators != null && m.validators.length) {
                        for (var i = 0; i < m.validators.length; ++i)
                            $root.tendermint.abci.types.ValidatorUpdate.encode(m.validators[i], w.uint32(34).fork()).ldelim();
                    }
                    if (m.appStateBytes != null && Object.hasOwnProperty.call(m, "appStateBytes"))
                        w.uint32(42).bytes(m.appStateBytes);
                    return w;
                };

                /**
                 * Decodes a RequestInitChain message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.RequestInitChain
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.RequestInitChain} RequestInitChain
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RequestInitChain.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.RequestInitChain();
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
                            if (!(m.validators && m.validators.length))
                                m.validators = [];
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

            types.RequestQuery = (function() {

                /**
                 * Properties of a RequestQuery.
                 * @memberof tendermint.abci.types
                 * @interface IRequestQuery
                 * @property {Uint8Array|null} [data] RequestQuery data
                 * @property {string|null} [path] RequestQuery path
                 * @property {number|Long|null} [height] RequestQuery height
                 * @property {boolean|null} [prove] RequestQuery prove
                 */

                /**
                 * Constructs a new RequestQuery.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a RequestQuery.
                 * @implements IRequestQuery
                 * @constructor
                 * @param {tendermint.abci.types.IRequestQuery=} [p] Properties to set
                 */
                function RequestQuery(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * RequestQuery data.
                 * @member {Uint8Array} data
                 * @memberof tendermint.abci.types.RequestQuery
                 * @instance
                 */
                RequestQuery.prototype.data = $util.newBuffer([]);

                /**
                 * RequestQuery path.
                 * @member {string} path
                 * @memberof tendermint.abci.types.RequestQuery
                 * @instance
                 */
                RequestQuery.prototype.path = "";

                /**
                 * RequestQuery height.
                 * @member {number|Long} height
                 * @memberof tendermint.abci.types.RequestQuery
                 * @instance
                 */
                RequestQuery.prototype.height = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * RequestQuery prove.
                 * @member {boolean} prove
                 * @memberof tendermint.abci.types.RequestQuery
                 * @instance
                 */
                RequestQuery.prototype.prove = false;

                /**
                 * Creates a new RequestQuery instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.RequestQuery
                 * @static
                 * @param {tendermint.abci.types.IRequestQuery=} [properties] Properties to set
                 * @returns {tendermint.abci.types.RequestQuery} RequestQuery instance
                 */
                RequestQuery.create = function create(properties) {
                    return new RequestQuery(properties);
                };

                /**
                 * Encodes the specified RequestQuery message. Does not implicitly {@link tendermint.abci.types.RequestQuery.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.RequestQuery
                 * @static
                 * @param {tendermint.abci.types.IRequestQuery} m RequestQuery message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RequestQuery.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.data != null && Object.hasOwnProperty.call(m, "data"))
                        w.uint32(10).bytes(m.data);
                    if (m.path != null && Object.hasOwnProperty.call(m, "path"))
                        w.uint32(18).string(m.path);
                    if (m.height != null && Object.hasOwnProperty.call(m, "height"))
                        w.uint32(24).int64(m.height);
                    if (m.prove != null && Object.hasOwnProperty.call(m, "prove"))
                        w.uint32(32).bool(m.prove);
                    return w;
                };

                /**
                 * Decodes a RequestQuery message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.RequestQuery
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.RequestQuery} RequestQuery
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RequestQuery.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.RequestQuery();
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

            types.RequestBeginBlock = (function() {

                /**
                 * Properties of a RequestBeginBlock.
                 * @memberof tendermint.abci.types
                 * @interface IRequestBeginBlock
                 * @property {Uint8Array|null} [hash] RequestBeginBlock hash
                 * @property {tendermint.abci.types.IHeader|null} [header] RequestBeginBlock header
                 * @property {tendermint.abci.types.ILastCommitInfo|null} [lastCommitInfo] RequestBeginBlock lastCommitInfo
                 * @property {Array.<tendermint.abci.types.IEvidence>|null} [byzantineValidators] RequestBeginBlock byzantineValidators
                 */

                /**
                 * Constructs a new RequestBeginBlock.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a RequestBeginBlock.
                 * @implements IRequestBeginBlock
                 * @constructor
                 * @param {tendermint.abci.types.IRequestBeginBlock=} [p] Properties to set
                 */
                function RequestBeginBlock(p) {
                    this.byzantineValidators = [];
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * RequestBeginBlock hash.
                 * @member {Uint8Array} hash
                 * @memberof tendermint.abci.types.RequestBeginBlock
                 * @instance
                 */
                RequestBeginBlock.prototype.hash = $util.newBuffer([]);

                /**
                 * RequestBeginBlock header.
                 * @member {tendermint.abci.types.IHeader|null|undefined} header
                 * @memberof tendermint.abci.types.RequestBeginBlock
                 * @instance
                 */
                RequestBeginBlock.prototype.header = null;

                /**
                 * RequestBeginBlock lastCommitInfo.
                 * @member {tendermint.abci.types.ILastCommitInfo|null|undefined} lastCommitInfo
                 * @memberof tendermint.abci.types.RequestBeginBlock
                 * @instance
                 */
                RequestBeginBlock.prototype.lastCommitInfo = null;

                /**
                 * RequestBeginBlock byzantineValidators.
                 * @member {Array.<tendermint.abci.types.IEvidence>} byzantineValidators
                 * @memberof tendermint.abci.types.RequestBeginBlock
                 * @instance
                 */
                RequestBeginBlock.prototype.byzantineValidators = $util.emptyArray;

                /**
                 * Creates a new RequestBeginBlock instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.RequestBeginBlock
                 * @static
                 * @param {tendermint.abci.types.IRequestBeginBlock=} [properties] Properties to set
                 * @returns {tendermint.abci.types.RequestBeginBlock} RequestBeginBlock instance
                 */
                RequestBeginBlock.create = function create(properties) {
                    return new RequestBeginBlock(properties);
                };

                /**
                 * Encodes the specified RequestBeginBlock message. Does not implicitly {@link tendermint.abci.types.RequestBeginBlock.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.RequestBeginBlock
                 * @static
                 * @param {tendermint.abci.types.IRequestBeginBlock} m RequestBeginBlock message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RequestBeginBlock.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.hash != null && Object.hasOwnProperty.call(m, "hash"))
                        w.uint32(10).bytes(m.hash);
                    if (m.header != null && Object.hasOwnProperty.call(m, "header"))
                        $root.tendermint.abci.types.Header.encode(m.header, w.uint32(18).fork()).ldelim();
                    if (m.lastCommitInfo != null && Object.hasOwnProperty.call(m, "lastCommitInfo"))
                        $root.tendermint.abci.types.LastCommitInfo.encode(m.lastCommitInfo, w.uint32(26).fork()).ldelim();
                    if (m.byzantineValidators != null && m.byzantineValidators.length) {
                        for (var i = 0; i < m.byzantineValidators.length; ++i)
                            $root.tendermint.abci.types.Evidence.encode(m.byzantineValidators[i], w.uint32(34).fork()).ldelim();
                    }
                    return w;
                };

                /**
                 * Decodes a RequestBeginBlock message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.RequestBeginBlock
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.RequestBeginBlock} RequestBeginBlock
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RequestBeginBlock.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.RequestBeginBlock();
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
                            if (!(m.byzantineValidators && m.byzantineValidators.length))
                                m.byzantineValidators = [];
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

            /**
             * CheckTxType enum.
             * @name tendermint.abci.types.CheckTxType
             * @enum {number}
             * @property {number} New=0 New value
             * @property {number} Recheck=1 Recheck value
             */
            types.CheckTxType = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "New"] = 0;
                values[valuesById[1] = "Recheck"] = 1;
                return values;
            })();

            types.RequestCheckTx = (function() {

                /**
                 * Properties of a RequestCheckTx.
                 * @memberof tendermint.abci.types
                 * @interface IRequestCheckTx
                 * @property {Uint8Array|null} [tx] RequestCheckTx tx
                 * @property {tendermint.abci.types.CheckTxType|null} [type] RequestCheckTx type
                 */

                /**
                 * Constructs a new RequestCheckTx.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a RequestCheckTx.
                 * @implements IRequestCheckTx
                 * @constructor
                 * @param {tendermint.abci.types.IRequestCheckTx=} [p] Properties to set
                 */
                function RequestCheckTx(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * RequestCheckTx tx.
                 * @member {Uint8Array} tx
                 * @memberof tendermint.abci.types.RequestCheckTx
                 * @instance
                 */
                RequestCheckTx.prototype.tx = $util.newBuffer([]);

                /**
                 * RequestCheckTx type.
                 * @member {tendermint.abci.types.CheckTxType} type
                 * @memberof tendermint.abci.types.RequestCheckTx
                 * @instance
                 */
                RequestCheckTx.prototype.type = 0;

                /**
                 * Creates a new RequestCheckTx instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.RequestCheckTx
                 * @static
                 * @param {tendermint.abci.types.IRequestCheckTx=} [properties] Properties to set
                 * @returns {tendermint.abci.types.RequestCheckTx} RequestCheckTx instance
                 */
                RequestCheckTx.create = function create(properties) {
                    return new RequestCheckTx(properties);
                };

                /**
                 * Encodes the specified RequestCheckTx message. Does not implicitly {@link tendermint.abci.types.RequestCheckTx.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.RequestCheckTx
                 * @static
                 * @param {tendermint.abci.types.IRequestCheckTx} m RequestCheckTx message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RequestCheckTx.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.tx != null && Object.hasOwnProperty.call(m, "tx"))
                        w.uint32(10).bytes(m.tx);
                    if (m.type != null && Object.hasOwnProperty.call(m, "type"))
                        w.uint32(16).int32(m.type);
                    return w;
                };

                /**
                 * Decodes a RequestCheckTx message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.RequestCheckTx
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.RequestCheckTx} RequestCheckTx
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RequestCheckTx.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.RequestCheckTx();
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

            types.RequestDeliverTx = (function() {

                /**
                 * Properties of a RequestDeliverTx.
                 * @memberof tendermint.abci.types
                 * @interface IRequestDeliverTx
                 * @property {Uint8Array|null} [tx] RequestDeliverTx tx
                 */

                /**
                 * Constructs a new RequestDeliverTx.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a RequestDeliverTx.
                 * @implements IRequestDeliverTx
                 * @constructor
                 * @param {tendermint.abci.types.IRequestDeliverTx=} [p] Properties to set
                 */
                function RequestDeliverTx(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * RequestDeliverTx tx.
                 * @member {Uint8Array} tx
                 * @memberof tendermint.abci.types.RequestDeliverTx
                 * @instance
                 */
                RequestDeliverTx.prototype.tx = $util.newBuffer([]);

                /**
                 * Creates a new RequestDeliverTx instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.RequestDeliverTx
                 * @static
                 * @param {tendermint.abci.types.IRequestDeliverTx=} [properties] Properties to set
                 * @returns {tendermint.abci.types.RequestDeliverTx} RequestDeliverTx instance
                 */
                RequestDeliverTx.create = function create(properties) {
                    return new RequestDeliverTx(properties);
                };

                /**
                 * Encodes the specified RequestDeliverTx message. Does not implicitly {@link tendermint.abci.types.RequestDeliverTx.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.RequestDeliverTx
                 * @static
                 * @param {tendermint.abci.types.IRequestDeliverTx} m RequestDeliverTx message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RequestDeliverTx.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.tx != null && Object.hasOwnProperty.call(m, "tx"))
                        w.uint32(10).bytes(m.tx);
                    return w;
                };

                /**
                 * Decodes a RequestDeliverTx message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.RequestDeliverTx
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.RequestDeliverTx} RequestDeliverTx
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RequestDeliverTx.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.RequestDeliverTx();
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

            types.RequestEndBlock = (function() {

                /**
                 * Properties of a RequestEndBlock.
                 * @memberof tendermint.abci.types
                 * @interface IRequestEndBlock
                 * @property {number|Long|null} [height] RequestEndBlock height
                 */

                /**
                 * Constructs a new RequestEndBlock.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a RequestEndBlock.
                 * @implements IRequestEndBlock
                 * @constructor
                 * @param {tendermint.abci.types.IRequestEndBlock=} [p] Properties to set
                 */
                function RequestEndBlock(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * RequestEndBlock height.
                 * @member {number|Long} height
                 * @memberof tendermint.abci.types.RequestEndBlock
                 * @instance
                 */
                RequestEndBlock.prototype.height = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * Creates a new RequestEndBlock instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.RequestEndBlock
                 * @static
                 * @param {tendermint.abci.types.IRequestEndBlock=} [properties] Properties to set
                 * @returns {tendermint.abci.types.RequestEndBlock} RequestEndBlock instance
                 */
                RequestEndBlock.create = function create(properties) {
                    return new RequestEndBlock(properties);
                };

                /**
                 * Encodes the specified RequestEndBlock message. Does not implicitly {@link tendermint.abci.types.RequestEndBlock.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.RequestEndBlock
                 * @static
                 * @param {tendermint.abci.types.IRequestEndBlock} m RequestEndBlock message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RequestEndBlock.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.height != null && Object.hasOwnProperty.call(m, "height"))
                        w.uint32(8).int64(m.height);
                    return w;
                };

                /**
                 * Decodes a RequestEndBlock message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.RequestEndBlock
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.RequestEndBlock} RequestEndBlock
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RequestEndBlock.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.RequestEndBlock();
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

            types.RequestCommit = (function() {

                /**
                 * Properties of a RequestCommit.
                 * @memberof tendermint.abci.types
                 * @interface IRequestCommit
                 */

                /**
                 * Constructs a new RequestCommit.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a RequestCommit.
                 * @implements IRequestCommit
                 * @constructor
                 * @param {tendermint.abci.types.IRequestCommit=} [p] Properties to set
                 */
                function RequestCommit(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * Creates a new RequestCommit instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.RequestCommit
                 * @static
                 * @param {tendermint.abci.types.IRequestCommit=} [properties] Properties to set
                 * @returns {tendermint.abci.types.RequestCommit} RequestCommit instance
                 */
                RequestCommit.create = function create(properties) {
                    return new RequestCommit(properties);
                };

                /**
                 * Encodes the specified RequestCommit message. Does not implicitly {@link tendermint.abci.types.RequestCommit.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.RequestCommit
                 * @static
                 * @param {tendermint.abci.types.IRequestCommit} m RequestCommit message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                RequestCommit.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    return w;
                };

                /**
                 * Decodes a RequestCommit message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.RequestCommit
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.RequestCommit} RequestCommit
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                RequestCommit.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.RequestCommit();
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

            types.Response = (function() {

                /**
                 * Properties of a Response.
                 * @memberof tendermint.abci.types
                 * @interface IResponse
                 * @property {tendermint.abci.types.IResponseException|null} [exception] Response exception
                 * @property {tendermint.abci.types.IResponseEcho|null} [echo] Response echo
                 * @property {tendermint.abci.types.IResponseFlush|null} [flush] Response flush
                 * @property {tendermint.abci.types.IResponseInfo|null} [info] Response info
                 * @property {tendermint.abci.types.IResponseSetOption|null} [setOption] Response setOption
                 * @property {tendermint.abci.types.IResponseInitChain|null} [initChain] Response initChain
                 * @property {tendermint.abci.types.IResponseQuery|null} [query] Response query
                 * @property {tendermint.abci.types.IResponseBeginBlock|null} [beginBlock] Response beginBlock
                 * @property {tendermint.abci.types.IResponseCheckTx|null} [checkTx] Response checkTx
                 * @property {tendermint.abci.types.IResponseDeliverTx|null} [deliverTx] Response deliverTx
                 * @property {tendermint.abci.types.IResponseEndBlock|null} [endBlock] Response endBlock
                 * @property {tendermint.abci.types.IResponseCommit|null} [commit] Response commit
                 */

                /**
                 * Constructs a new Response.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a Response.
                 * @implements IResponse
                 * @constructor
                 * @param {tendermint.abci.types.IResponse=} [p] Properties to set
                 */
                function Response(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * Response exception.
                 * @member {tendermint.abci.types.IResponseException|null|undefined} exception
                 * @memberof tendermint.abci.types.Response
                 * @instance
                 */
                Response.prototype.exception = null;

                /**
                 * Response echo.
                 * @member {tendermint.abci.types.IResponseEcho|null|undefined} echo
                 * @memberof tendermint.abci.types.Response
                 * @instance
                 */
                Response.prototype.echo = null;

                /**
                 * Response flush.
                 * @member {tendermint.abci.types.IResponseFlush|null|undefined} flush
                 * @memberof tendermint.abci.types.Response
                 * @instance
                 */
                Response.prototype.flush = null;

                /**
                 * Response info.
                 * @member {tendermint.abci.types.IResponseInfo|null|undefined} info
                 * @memberof tendermint.abci.types.Response
                 * @instance
                 */
                Response.prototype.info = null;

                /**
                 * Response setOption.
                 * @member {tendermint.abci.types.IResponseSetOption|null|undefined} setOption
                 * @memberof tendermint.abci.types.Response
                 * @instance
                 */
                Response.prototype.setOption = null;

                /**
                 * Response initChain.
                 * @member {tendermint.abci.types.IResponseInitChain|null|undefined} initChain
                 * @memberof tendermint.abci.types.Response
                 * @instance
                 */
                Response.prototype.initChain = null;

                /**
                 * Response query.
                 * @member {tendermint.abci.types.IResponseQuery|null|undefined} query
                 * @memberof tendermint.abci.types.Response
                 * @instance
                 */
                Response.prototype.query = null;

                /**
                 * Response beginBlock.
                 * @member {tendermint.abci.types.IResponseBeginBlock|null|undefined} beginBlock
                 * @memberof tendermint.abci.types.Response
                 * @instance
                 */
                Response.prototype.beginBlock = null;

                /**
                 * Response checkTx.
                 * @member {tendermint.abci.types.IResponseCheckTx|null|undefined} checkTx
                 * @memberof tendermint.abci.types.Response
                 * @instance
                 */
                Response.prototype.checkTx = null;

                /**
                 * Response deliverTx.
                 * @member {tendermint.abci.types.IResponseDeliverTx|null|undefined} deliverTx
                 * @memberof tendermint.abci.types.Response
                 * @instance
                 */
                Response.prototype.deliverTx = null;

                /**
                 * Response endBlock.
                 * @member {tendermint.abci.types.IResponseEndBlock|null|undefined} endBlock
                 * @memberof tendermint.abci.types.Response
                 * @instance
                 */
                Response.prototype.endBlock = null;

                /**
                 * Response commit.
                 * @member {tendermint.abci.types.IResponseCommit|null|undefined} commit
                 * @memberof tendermint.abci.types.Response
                 * @instance
                 */
                Response.prototype.commit = null;

                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;

                /**
                 * Response value.
                 * @member {"exception"|"echo"|"flush"|"info"|"setOption"|"initChain"|"query"|"beginBlock"|"checkTx"|"deliverTx"|"endBlock"|"commit"|undefined} value
                 * @memberof tendermint.abci.types.Response
                 * @instance
                 */
                Object.defineProperty(Response.prototype, "value", {
                    get: $util.oneOfGetter($oneOfFields = ["exception", "echo", "flush", "info", "setOption", "initChain", "query", "beginBlock", "checkTx", "deliverTx", "endBlock", "commit"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Creates a new Response instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.Response
                 * @static
                 * @param {tendermint.abci.types.IResponse=} [properties] Properties to set
                 * @returns {tendermint.abci.types.Response} Response instance
                 */
                Response.create = function create(properties) {
                    return new Response(properties);
                };

                /**
                 * Encodes the specified Response message. Does not implicitly {@link tendermint.abci.types.Response.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.Response
                 * @static
                 * @param {tendermint.abci.types.IResponse} m Response message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Response.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
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

                /**
                 * Decodes a Response message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.Response
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.Response} Response
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Response.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.Response();
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

            types.ResponseException = (function() {

                /**
                 * Properties of a ResponseException.
                 * @memberof tendermint.abci.types
                 * @interface IResponseException
                 * @property {string|null} [error] ResponseException error
                 */

                /**
                 * Constructs a new ResponseException.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a ResponseException.
                 * @implements IResponseException
                 * @constructor
                 * @param {tendermint.abci.types.IResponseException=} [p] Properties to set
                 */
                function ResponseException(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * ResponseException error.
                 * @member {string} error
                 * @memberof tendermint.abci.types.ResponseException
                 * @instance
                 */
                ResponseException.prototype.error = "";

                /**
                 * Creates a new ResponseException instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.ResponseException
                 * @static
                 * @param {tendermint.abci.types.IResponseException=} [properties] Properties to set
                 * @returns {tendermint.abci.types.ResponseException} ResponseException instance
                 */
                ResponseException.create = function create(properties) {
                    return new ResponseException(properties);
                };

                /**
                 * Encodes the specified ResponseException message. Does not implicitly {@link tendermint.abci.types.ResponseException.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.ResponseException
                 * @static
                 * @param {tendermint.abci.types.IResponseException} m ResponseException message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ResponseException.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.error != null && Object.hasOwnProperty.call(m, "error"))
                        w.uint32(10).string(m.error);
                    return w;
                };

                /**
                 * Decodes a ResponseException message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.ResponseException
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.ResponseException} ResponseException
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ResponseException.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.ResponseException();
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

            types.ResponseEcho = (function() {

                /**
                 * Properties of a ResponseEcho.
                 * @memberof tendermint.abci.types
                 * @interface IResponseEcho
                 * @property {string|null} [message] ResponseEcho message
                 */

                /**
                 * Constructs a new ResponseEcho.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a ResponseEcho.
                 * @implements IResponseEcho
                 * @constructor
                 * @param {tendermint.abci.types.IResponseEcho=} [p] Properties to set
                 */
                function ResponseEcho(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * ResponseEcho message.
                 * @member {string} message
                 * @memberof tendermint.abci.types.ResponseEcho
                 * @instance
                 */
                ResponseEcho.prototype.message = "";

                /**
                 * Creates a new ResponseEcho instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.ResponseEcho
                 * @static
                 * @param {tendermint.abci.types.IResponseEcho=} [properties] Properties to set
                 * @returns {tendermint.abci.types.ResponseEcho} ResponseEcho instance
                 */
                ResponseEcho.create = function create(properties) {
                    return new ResponseEcho(properties);
                };

                /**
                 * Encodes the specified ResponseEcho message. Does not implicitly {@link tendermint.abci.types.ResponseEcho.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.ResponseEcho
                 * @static
                 * @param {tendermint.abci.types.IResponseEcho} m ResponseEcho message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ResponseEcho.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.message != null && Object.hasOwnProperty.call(m, "message"))
                        w.uint32(10).string(m.message);
                    return w;
                };

                /**
                 * Decodes a ResponseEcho message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.ResponseEcho
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.ResponseEcho} ResponseEcho
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ResponseEcho.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.ResponseEcho();
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

            types.ResponseFlush = (function() {

                /**
                 * Properties of a ResponseFlush.
                 * @memberof tendermint.abci.types
                 * @interface IResponseFlush
                 */

                /**
                 * Constructs a new ResponseFlush.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a ResponseFlush.
                 * @implements IResponseFlush
                 * @constructor
                 * @param {tendermint.abci.types.IResponseFlush=} [p] Properties to set
                 */
                function ResponseFlush(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * Creates a new ResponseFlush instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.ResponseFlush
                 * @static
                 * @param {tendermint.abci.types.IResponseFlush=} [properties] Properties to set
                 * @returns {tendermint.abci.types.ResponseFlush} ResponseFlush instance
                 */
                ResponseFlush.create = function create(properties) {
                    return new ResponseFlush(properties);
                };

                /**
                 * Encodes the specified ResponseFlush message. Does not implicitly {@link tendermint.abci.types.ResponseFlush.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.ResponseFlush
                 * @static
                 * @param {tendermint.abci.types.IResponseFlush} m ResponseFlush message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ResponseFlush.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    return w;
                };

                /**
                 * Decodes a ResponseFlush message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.ResponseFlush
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.ResponseFlush} ResponseFlush
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ResponseFlush.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.ResponseFlush();
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

            types.ResponseInfo = (function() {

                /**
                 * Properties of a ResponseInfo.
                 * @memberof tendermint.abci.types
                 * @interface IResponseInfo
                 * @property {string|null} [data] ResponseInfo data
                 * @property {string|null} [version] ResponseInfo version
                 * @property {number|Long|null} [appVersion] ResponseInfo appVersion
                 * @property {number|Long|null} [lastBlockHeight] ResponseInfo lastBlockHeight
                 * @property {Uint8Array|null} [lastBlockAppHash] ResponseInfo lastBlockAppHash
                 */

                /**
                 * Constructs a new ResponseInfo.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a ResponseInfo.
                 * @implements IResponseInfo
                 * @constructor
                 * @param {tendermint.abci.types.IResponseInfo=} [p] Properties to set
                 */
                function ResponseInfo(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * ResponseInfo data.
                 * @member {string} data
                 * @memberof tendermint.abci.types.ResponseInfo
                 * @instance
                 */
                ResponseInfo.prototype.data = "";

                /**
                 * ResponseInfo version.
                 * @member {string} version
                 * @memberof tendermint.abci.types.ResponseInfo
                 * @instance
                 */
                ResponseInfo.prototype.version = "";

                /**
                 * ResponseInfo appVersion.
                 * @member {number|Long} appVersion
                 * @memberof tendermint.abci.types.ResponseInfo
                 * @instance
                 */
                ResponseInfo.prototype.appVersion = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * ResponseInfo lastBlockHeight.
                 * @member {number|Long} lastBlockHeight
                 * @memberof tendermint.abci.types.ResponseInfo
                 * @instance
                 */
                ResponseInfo.prototype.lastBlockHeight = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * ResponseInfo lastBlockAppHash.
                 * @member {Uint8Array} lastBlockAppHash
                 * @memberof tendermint.abci.types.ResponseInfo
                 * @instance
                 */
                ResponseInfo.prototype.lastBlockAppHash = $util.newBuffer([]);

                /**
                 * Creates a new ResponseInfo instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.ResponseInfo
                 * @static
                 * @param {tendermint.abci.types.IResponseInfo=} [properties] Properties to set
                 * @returns {tendermint.abci.types.ResponseInfo} ResponseInfo instance
                 */
                ResponseInfo.create = function create(properties) {
                    return new ResponseInfo(properties);
                };

                /**
                 * Encodes the specified ResponseInfo message. Does not implicitly {@link tendermint.abci.types.ResponseInfo.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.ResponseInfo
                 * @static
                 * @param {tendermint.abci.types.IResponseInfo} m ResponseInfo message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ResponseInfo.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.data != null && Object.hasOwnProperty.call(m, "data"))
                        w.uint32(10).string(m.data);
                    if (m.version != null && Object.hasOwnProperty.call(m, "version"))
                        w.uint32(18).string(m.version);
                    if (m.appVersion != null && Object.hasOwnProperty.call(m, "appVersion"))
                        w.uint32(24).uint64(m.appVersion);
                    if (m.lastBlockHeight != null && Object.hasOwnProperty.call(m, "lastBlockHeight"))
                        w.uint32(32).int64(m.lastBlockHeight);
                    if (m.lastBlockAppHash != null && Object.hasOwnProperty.call(m, "lastBlockAppHash"))
                        w.uint32(42).bytes(m.lastBlockAppHash);
                    return w;
                };

                /**
                 * Decodes a ResponseInfo message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.ResponseInfo
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.ResponseInfo} ResponseInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ResponseInfo.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.ResponseInfo();
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

            types.ResponseSetOption = (function() {

                /**
                 * Properties of a ResponseSetOption.
                 * @memberof tendermint.abci.types
                 * @interface IResponseSetOption
                 * @property {number|null} [code] ResponseSetOption code
                 * @property {string|null} [log] ResponseSetOption log
                 * @property {string|null} [info] ResponseSetOption info
                 */

                /**
                 * Constructs a new ResponseSetOption.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a ResponseSetOption.
                 * @implements IResponseSetOption
                 * @constructor
                 * @param {tendermint.abci.types.IResponseSetOption=} [p] Properties to set
                 */
                function ResponseSetOption(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * ResponseSetOption code.
                 * @member {number} code
                 * @memberof tendermint.abci.types.ResponseSetOption
                 * @instance
                 */
                ResponseSetOption.prototype.code = 0;

                /**
                 * ResponseSetOption log.
                 * @member {string} log
                 * @memberof tendermint.abci.types.ResponseSetOption
                 * @instance
                 */
                ResponseSetOption.prototype.log = "";

                /**
                 * ResponseSetOption info.
                 * @member {string} info
                 * @memberof tendermint.abci.types.ResponseSetOption
                 * @instance
                 */
                ResponseSetOption.prototype.info = "";

                /**
                 * Creates a new ResponseSetOption instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.ResponseSetOption
                 * @static
                 * @param {tendermint.abci.types.IResponseSetOption=} [properties] Properties to set
                 * @returns {tendermint.abci.types.ResponseSetOption} ResponseSetOption instance
                 */
                ResponseSetOption.create = function create(properties) {
                    return new ResponseSetOption(properties);
                };

                /**
                 * Encodes the specified ResponseSetOption message. Does not implicitly {@link tendermint.abci.types.ResponseSetOption.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.ResponseSetOption
                 * @static
                 * @param {tendermint.abci.types.IResponseSetOption} m ResponseSetOption message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ResponseSetOption.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.code != null && Object.hasOwnProperty.call(m, "code"))
                        w.uint32(8).uint32(m.code);
                    if (m.log != null && Object.hasOwnProperty.call(m, "log"))
                        w.uint32(26).string(m.log);
                    if (m.info != null && Object.hasOwnProperty.call(m, "info"))
                        w.uint32(34).string(m.info);
                    return w;
                };

                /**
                 * Decodes a ResponseSetOption message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.ResponseSetOption
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.ResponseSetOption} ResponseSetOption
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ResponseSetOption.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.ResponseSetOption();
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

            types.ResponseInitChain = (function() {

                /**
                 * Properties of a ResponseInitChain.
                 * @memberof tendermint.abci.types
                 * @interface IResponseInitChain
                 * @property {tendermint.abci.types.IConsensusParams|null} [consensusParams] ResponseInitChain consensusParams
                 * @property {Array.<tendermint.abci.types.IValidatorUpdate>|null} [validators] ResponseInitChain validators
                 */

                /**
                 * Constructs a new ResponseInitChain.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a ResponseInitChain.
                 * @implements IResponseInitChain
                 * @constructor
                 * @param {tendermint.abci.types.IResponseInitChain=} [p] Properties to set
                 */
                function ResponseInitChain(p) {
                    this.validators = [];
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * ResponseInitChain consensusParams.
                 * @member {tendermint.abci.types.IConsensusParams|null|undefined} consensusParams
                 * @memberof tendermint.abci.types.ResponseInitChain
                 * @instance
                 */
                ResponseInitChain.prototype.consensusParams = null;

                /**
                 * ResponseInitChain validators.
                 * @member {Array.<tendermint.abci.types.IValidatorUpdate>} validators
                 * @memberof tendermint.abci.types.ResponseInitChain
                 * @instance
                 */
                ResponseInitChain.prototype.validators = $util.emptyArray;

                /**
                 * Creates a new ResponseInitChain instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.ResponseInitChain
                 * @static
                 * @param {tendermint.abci.types.IResponseInitChain=} [properties] Properties to set
                 * @returns {tendermint.abci.types.ResponseInitChain} ResponseInitChain instance
                 */
                ResponseInitChain.create = function create(properties) {
                    return new ResponseInitChain(properties);
                };

                /**
                 * Encodes the specified ResponseInitChain message. Does not implicitly {@link tendermint.abci.types.ResponseInitChain.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.ResponseInitChain
                 * @static
                 * @param {tendermint.abci.types.IResponseInitChain} m ResponseInitChain message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ResponseInitChain.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.consensusParams != null && Object.hasOwnProperty.call(m, "consensusParams"))
                        $root.tendermint.abci.types.ConsensusParams.encode(m.consensusParams, w.uint32(10).fork()).ldelim();
                    if (m.validators != null && m.validators.length) {
                        for (var i = 0; i < m.validators.length; ++i)
                            $root.tendermint.abci.types.ValidatorUpdate.encode(m.validators[i], w.uint32(18).fork()).ldelim();
                    }
                    return w;
                };

                /**
                 * Decodes a ResponseInitChain message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.ResponseInitChain
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.ResponseInitChain} ResponseInitChain
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ResponseInitChain.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.ResponseInitChain();
                    while (r.pos < c) {
                        var t = r.uint32();
                        switch (t >>> 3) {
                        case 1:
                            m.consensusParams = $root.tendermint.abci.types.ConsensusParams.decode(r, r.uint32());
                            break;
                        case 2:
                            if (!(m.validators && m.validators.length))
                                m.validators = [];
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

            types.ResponseQuery = (function() {

                /**
                 * Properties of a ResponseQuery.
                 * @memberof tendermint.abci.types
                 * @interface IResponseQuery
                 * @property {number|null} [code] ResponseQuery code
                 * @property {string|null} [log] ResponseQuery log
                 * @property {string|null} [info] ResponseQuery info
                 * @property {number|Long|null} [index] ResponseQuery index
                 * @property {Uint8Array|null} [key] ResponseQuery key
                 * @property {Uint8Array|null} [value] ResponseQuery value
                 * @property {tendermint.crypto.merkle.IProof|null} [proof] ResponseQuery proof
                 * @property {number|Long|null} [height] ResponseQuery height
                 * @property {string|null} [codespace] ResponseQuery codespace
                 */

                /**
                 * Constructs a new ResponseQuery.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a ResponseQuery.
                 * @implements IResponseQuery
                 * @constructor
                 * @param {tendermint.abci.types.IResponseQuery=} [p] Properties to set
                 */
                function ResponseQuery(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * ResponseQuery code.
                 * @member {number} code
                 * @memberof tendermint.abci.types.ResponseQuery
                 * @instance
                 */
                ResponseQuery.prototype.code = 0;

                /**
                 * ResponseQuery log.
                 * @member {string} log
                 * @memberof tendermint.abci.types.ResponseQuery
                 * @instance
                 */
                ResponseQuery.prototype.log = "";

                /**
                 * ResponseQuery info.
                 * @member {string} info
                 * @memberof tendermint.abci.types.ResponseQuery
                 * @instance
                 */
                ResponseQuery.prototype.info = "";

                /**
                 * ResponseQuery index.
                 * @member {number|Long} index
                 * @memberof tendermint.abci.types.ResponseQuery
                 * @instance
                 */
                ResponseQuery.prototype.index = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * ResponseQuery key.
                 * @member {Uint8Array} key
                 * @memberof tendermint.abci.types.ResponseQuery
                 * @instance
                 */
                ResponseQuery.prototype.key = $util.newBuffer([]);

                /**
                 * ResponseQuery value.
                 * @member {Uint8Array} value
                 * @memberof tendermint.abci.types.ResponseQuery
                 * @instance
                 */
                ResponseQuery.prototype.value = $util.newBuffer([]);

                /**
                 * ResponseQuery proof.
                 * @member {tendermint.crypto.merkle.IProof|null|undefined} proof
                 * @memberof tendermint.abci.types.ResponseQuery
                 * @instance
                 */
                ResponseQuery.prototype.proof = null;

                /**
                 * ResponseQuery height.
                 * @member {number|Long} height
                 * @memberof tendermint.abci.types.ResponseQuery
                 * @instance
                 */
                ResponseQuery.prototype.height = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * ResponseQuery codespace.
                 * @member {string} codespace
                 * @memberof tendermint.abci.types.ResponseQuery
                 * @instance
                 */
                ResponseQuery.prototype.codespace = "";

                /**
                 * Creates a new ResponseQuery instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.ResponseQuery
                 * @static
                 * @param {tendermint.abci.types.IResponseQuery=} [properties] Properties to set
                 * @returns {tendermint.abci.types.ResponseQuery} ResponseQuery instance
                 */
                ResponseQuery.create = function create(properties) {
                    return new ResponseQuery(properties);
                };

                /**
                 * Encodes the specified ResponseQuery message. Does not implicitly {@link tendermint.abci.types.ResponseQuery.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.ResponseQuery
                 * @static
                 * @param {tendermint.abci.types.IResponseQuery} m ResponseQuery message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ResponseQuery.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.code != null && Object.hasOwnProperty.call(m, "code"))
                        w.uint32(8).uint32(m.code);
                    if (m.log != null && Object.hasOwnProperty.call(m, "log"))
                        w.uint32(26).string(m.log);
                    if (m.info != null && Object.hasOwnProperty.call(m, "info"))
                        w.uint32(34).string(m.info);
                    if (m.index != null && Object.hasOwnProperty.call(m, "index"))
                        w.uint32(40).int64(m.index);
                    if (m.key != null && Object.hasOwnProperty.call(m, "key"))
                        w.uint32(50).bytes(m.key);
                    if (m.value != null && Object.hasOwnProperty.call(m, "value"))
                        w.uint32(58).bytes(m.value);
                    if (m.proof != null && Object.hasOwnProperty.call(m, "proof"))
                        $root.tendermint.crypto.merkle.Proof.encode(m.proof, w.uint32(66).fork()).ldelim();
                    if (m.height != null && Object.hasOwnProperty.call(m, "height"))
                        w.uint32(72).int64(m.height);
                    if (m.codespace != null && Object.hasOwnProperty.call(m, "codespace"))
                        w.uint32(82).string(m.codespace);
                    return w;
                };

                /**
                 * Decodes a ResponseQuery message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.ResponseQuery
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.ResponseQuery} ResponseQuery
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ResponseQuery.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.ResponseQuery();
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

            types.ResponseBeginBlock = (function() {

                /**
                 * Properties of a ResponseBeginBlock.
                 * @memberof tendermint.abci.types
                 * @interface IResponseBeginBlock
                 * @property {Array.<tendermint.abci.types.IEvent>|null} [events] ResponseBeginBlock events
                 */

                /**
                 * Constructs a new ResponseBeginBlock.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a ResponseBeginBlock.
                 * @implements IResponseBeginBlock
                 * @constructor
                 * @param {tendermint.abci.types.IResponseBeginBlock=} [p] Properties to set
                 */
                function ResponseBeginBlock(p) {
                    this.events = [];
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * ResponseBeginBlock events.
                 * @member {Array.<tendermint.abci.types.IEvent>} events
                 * @memberof tendermint.abci.types.ResponseBeginBlock
                 * @instance
                 */
                ResponseBeginBlock.prototype.events = $util.emptyArray;

                /**
                 * Creates a new ResponseBeginBlock instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.ResponseBeginBlock
                 * @static
                 * @param {tendermint.abci.types.IResponseBeginBlock=} [properties] Properties to set
                 * @returns {tendermint.abci.types.ResponseBeginBlock} ResponseBeginBlock instance
                 */
                ResponseBeginBlock.create = function create(properties) {
                    return new ResponseBeginBlock(properties);
                };

                /**
                 * Encodes the specified ResponseBeginBlock message. Does not implicitly {@link tendermint.abci.types.ResponseBeginBlock.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.ResponseBeginBlock
                 * @static
                 * @param {tendermint.abci.types.IResponseBeginBlock} m ResponseBeginBlock message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ResponseBeginBlock.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.events != null && m.events.length) {
                        for (var i = 0; i < m.events.length; ++i)
                            $root.tendermint.abci.types.Event.encode(m.events[i], w.uint32(10).fork()).ldelim();
                    }
                    return w;
                };

                /**
                 * Decodes a ResponseBeginBlock message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.ResponseBeginBlock
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.ResponseBeginBlock} ResponseBeginBlock
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ResponseBeginBlock.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.ResponseBeginBlock();
                    while (r.pos < c) {
                        var t = r.uint32();
                        switch (t >>> 3) {
                        case 1:
                            if (!(m.events && m.events.length))
                                m.events = [];
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

            types.ResponseCheckTx = (function() {

                /**
                 * Properties of a ResponseCheckTx.
                 * @memberof tendermint.abci.types
                 * @interface IResponseCheckTx
                 * @property {number|null} [code] ResponseCheckTx code
                 * @property {Uint8Array|null} [data] ResponseCheckTx data
                 * @property {string|null} [log] ResponseCheckTx log
                 * @property {string|null} [info] ResponseCheckTx info
                 * @property {number|Long|null} [gasWanted] ResponseCheckTx gasWanted
                 * @property {number|Long|null} [gasUsed] ResponseCheckTx gasUsed
                 * @property {Array.<tendermint.abci.types.IEvent>|null} [events] ResponseCheckTx events
                 * @property {string|null} [codespace] ResponseCheckTx codespace
                 */

                /**
                 * Constructs a new ResponseCheckTx.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a ResponseCheckTx.
                 * @implements IResponseCheckTx
                 * @constructor
                 * @param {tendermint.abci.types.IResponseCheckTx=} [p] Properties to set
                 */
                function ResponseCheckTx(p) {
                    this.events = [];
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * ResponseCheckTx code.
                 * @member {number} code
                 * @memberof tendermint.abci.types.ResponseCheckTx
                 * @instance
                 */
                ResponseCheckTx.prototype.code = 0;

                /**
                 * ResponseCheckTx data.
                 * @member {Uint8Array} data
                 * @memberof tendermint.abci.types.ResponseCheckTx
                 * @instance
                 */
                ResponseCheckTx.prototype.data = $util.newBuffer([]);

                /**
                 * ResponseCheckTx log.
                 * @member {string} log
                 * @memberof tendermint.abci.types.ResponseCheckTx
                 * @instance
                 */
                ResponseCheckTx.prototype.log = "";

                /**
                 * ResponseCheckTx info.
                 * @member {string} info
                 * @memberof tendermint.abci.types.ResponseCheckTx
                 * @instance
                 */
                ResponseCheckTx.prototype.info = "";

                /**
                 * ResponseCheckTx gasWanted.
                 * @member {number|Long} gasWanted
                 * @memberof tendermint.abci.types.ResponseCheckTx
                 * @instance
                 */
                ResponseCheckTx.prototype.gasWanted = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * ResponseCheckTx gasUsed.
                 * @member {number|Long} gasUsed
                 * @memberof tendermint.abci.types.ResponseCheckTx
                 * @instance
                 */
                ResponseCheckTx.prototype.gasUsed = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * ResponseCheckTx events.
                 * @member {Array.<tendermint.abci.types.IEvent>} events
                 * @memberof tendermint.abci.types.ResponseCheckTx
                 * @instance
                 */
                ResponseCheckTx.prototype.events = $util.emptyArray;

                /**
                 * ResponseCheckTx codespace.
                 * @member {string} codespace
                 * @memberof tendermint.abci.types.ResponseCheckTx
                 * @instance
                 */
                ResponseCheckTx.prototype.codespace = "";

                /**
                 * Creates a new ResponseCheckTx instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.ResponseCheckTx
                 * @static
                 * @param {tendermint.abci.types.IResponseCheckTx=} [properties] Properties to set
                 * @returns {tendermint.abci.types.ResponseCheckTx} ResponseCheckTx instance
                 */
                ResponseCheckTx.create = function create(properties) {
                    return new ResponseCheckTx(properties);
                };

                /**
                 * Encodes the specified ResponseCheckTx message. Does not implicitly {@link tendermint.abci.types.ResponseCheckTx.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.ResponseCheckTx
                 * @static
                 * @param {tendermint.abci.types.IResponseCheckTx} m ResponseCheckTx message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ResponseCheckTx.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.code != null && Object.hasOwnProperty.call(m, "code"))
                        w.uint32(8).uint32(m.code);
                    if (m.data != null && Object.hasOwnProperty.call(m, "data"))
                        w.uint32(18).bytes(m.data);
                    if (m.log != null && Object.hasOwnProperty.call(m, "log"))
                        w.uint32(26).string(m.log);
                    if (m.info != null && Object.hasOwnProperty.call(m, "info"))
                        w.uint32(34).string(m.info);
                    if (m.gasWanted != null && Object.hasOwnProperty.call(m, "gasWanted"))
                        w.uint32(40).int64(m.gasWanted);
                    if (m.gasUsed != null && Object.hasOwnProperty.call(m, "gasUsed"))
                        w.uint32(48).int64(m.gasUsed);
                    if (m.events != null && m.events.length) {
                        for (var i = 0; i < m.events.length; ++i)
                            $root.tendermint.abci.types.Event.encode(m.events[i], w.uint32(58).fork()).ldelim();
                    }
                    if (m.codespace != null && Object.hasOwnProperty.call(m, "codespace"))
                        w.uint32(66).string(m.codespace);
                    return w;
                };

                /**
                 * Decodes a ResponseCheckTx message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.ResponseCheckTx
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.ResponseCheckTx} ResponseCheckTx
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ResponseCheckTx.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.ResponseCheckTx();
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
                            if (!(m.events && m.events.length))
                                m.events = [];
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

            types.ResponseDeliverTx = (function() {

                /**
                 * Properties of a ResponseDeliverTx.
                 * @memberof tendermint.abci.types
                 * @interface IResponseDeliverTx
                 * @property {number|null} [code] ResponseDeliverTx code
                 * @property {Uint8Array|null} [data] ResponseDeliverTx data
                 * @property {string|null} [log] ResponseDeliverTx log
                 * @property {string|null} [info] ResponseDeliverTx info
                 * @property {number|Long|null} [gasWanted] ResponseDeliverTx gasWanted
                 * @property {number|Long|null} [gasUsed] ResponseDeliverTx gasUsed
                 * @property {Array.<tendermint.abci.types.IEvent>|null} [events] ResponseDeliverTx events
                 * @property {string|null} [codespace] ResponseDeliverTx codespace
                 */

                /**
                 * Constructs a new ResponseDeliverTx.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a ResponseDeliverTx.
                 * @implements IResponseDeliverTx
                 * @constructor
                 * @param {tendermint.abci.types.IResponseDeliverTx=} [p] Properties to set
                 */
                function ResponseDeliverTx(p) {
                    this.events = [];
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * ResponseDeliverTx code.
                 * @member {number} code
                 * @memberof tendermint.abci.types.ResponseDeliverTx
                 * @instance
                 */
                ResponseDeliverTx.prototype.code = 0;

                /**
                 * ResponseDeliverTx data.
                 * @member {Uint8Array} data
                 * @memberof tendermint.abci.types.ResponseDeliverTx
                 * @instance
                 */
                ResponseDeliverTx.prototype.data = $util.newBuffer([]);

                /**
                 * ResponseDeliverTx log.
                 * @member {string} log
                 * @memberof tendermint.abci.types.ResponseDeliverTx
                 * @instance
                 */
                ResponseDeliverTx.prototype.log = "";

                /**
                 * ResponseDeliverTx info.
                 * @member {string} info
                 * @memberof tendermint.abci.types.ResponseDeliverTx
                 * @instance
                 */
                ResponseDeliverTx.prototype.info = "";

                /**
                 * ResponseDeliverTx gasWanted.
                 * @member {number|Long} gasWanted
                 * @memberof tendermint.abci.types.ResponseDeliverTx
                 * @instance
                 */
                ResponseDeliverTx.prototype.gasWanted = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * ResponseDeliverTx gasUsed.
                 * @member {number|Long} gasUsed
                 * @memberof tendermint.abci.types.ResponseDeliverTx
                 * @instance
                 */
                ResponseDeliverTx.prototype.gasUsed = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * ResponseDeliverTx events.
                 * @member {Array.<tendermint.abci.types.IEvent>} events
                 * @memberof tendermint.abci.types.ResponseDeliverTx
                 * @instance
                 */
                ResponseDeliverTx.prototype.events = $util.emptyArray;

                /**
                 * ResponseDeliverTx codespace.
                 * @member {string} codespace
                 * @memberof tendermint.abci.types.ResponseDeliverTx
                 * @instance
                 */
                ResponseDeliverTx.prototype.codespace = "";

                /**
                 * Creates a new ResponseDeliverTx instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.ResponseDeliverTx
                 * @static
                 * @param {tendermint.abci.types.IResponseDeliverTx=} [properties] Properties to set
                 * @returns {tendermint.abci.types.ResponseDeliverTx} ResponseDeliverTx instance
                 */
                ResponseDeliverTx.create = function create(properties) {
                    return new ResponseDeliverTx(properties);
                };

                /**
                 * Encodes the specified ResponseDeliverTx message. Does not implicitly {@link tendermint.abci.types.ResponseDeliverTx.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.ResponseDeliverTx
                 * @static
                 * @param {tendermint.abci.types.IResponseDeliverTx} m ResponseDeliverTx message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ResponseDeliverTx.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.code != null && Object.hasOwnProperty.call(m, "code"))
                        w.uint32(8).uint32(m.code);
                    if (m.data != null && Object.hasOwnProperty.call(m, "data"))
                        w.uint32(18).bytes(m.data);
                    if (m.log != null && Object.hasOwnProperty.call(m, "log"))
                        w.uint32(26).string(m.log);
                    if (m.info != null && Object.hasOwnProperty.call(m, "info"))
                        w.uint32(34).string(m.info);
                    if (m.gasWanted != null && Object.hasOwnProperty.call(m, "gasWanted"))
                        w.uint32(40).int64(m.gasWanted);
                    if (m.gasUsed != null && Object.hasOwnProperty.call(m, "gasUsed"))
                        w.uint32(48).int64(m.gasUsed);
                    if (m.events != null && m.events.length) {
                        for (var i = 0; i < m.events.length; ++i)
                            $root.tendermint.abci.types.Event.encode(m.events[i], w.uint32(58).fork()).ldelim();
                    }
                    if (m.codespace != null && Object.hasOwnProperty.call(m, "codespace"))
                        w.uint32(66).string(m.codespace);
                    return w;
                };

                /**
                 * Decodes a ResponseDeliverTx message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.ResponseDeliverTx
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.ResponseDeliverTx} ResponseDeliverTx
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ResponseDeliverTx.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.ResponseDeliverTx();
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
                            if (!(m.events && m.events.length))
                                m.events = [];
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

            types.ResponseEndBlock = (function() {

                /**
                 * Properties of a ResponseEndBlock.
                 * @memberof tendermint.abci.types
                 * @interface IResponseEndBlock
                 * @property {Array.<tendermint.abci.types.IValidatorUpdate>|null} [validatorUpdates] ResponseEndBlock validatorUpdates
                 * @property {tendermint.abci.types.IConsensusParams|null} [consensusParamUpdates] ResponseEndBlock consensusParamUpdates
                 * @property {Array.<tendermint.abci.types.IEvent>|null} [events] ResponseEndBlock events
                 */

                /**
                 * Constructs a new ResponseEndBlock.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a ResponseEndBlock.
                 * @implements IResponseEndBlock
                 * @constructor
                 * @param {tendermint.abci.types.IResponseEndBlock=} [p] Properties to set
                 */
                function ResponseEndBlock(p) {
                    this.validatorUpdates = [];
                    this.events = [];
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * ResponseEndBlock validatorUpdates.
                 * @member {Array.<tendermint.abci.types.IValidatorUpdate>} validatorUpdates
                 * @memberof tendermint.abci.types.ResponseEndBlock
                 * @instance
                 */
                ResponseEndBlock.prototype.validatorUpdates = $util.emptyArray;

                /**
                 * ResponseEndBlock consensusParamUpdates.
                 * @member {tendermint.abci.types.IConsensusParams|null|undefined} consensusParamUpdates
                 * @memberof tendermint.abci.types.ResponseEndBlock
                 * @instance
                 */
                ResponseEndBlock.prototype.consensusParamUpdates = null;

                /**
                 * ResponseEndBlock events.
                 * @member {Array.<tendermint.abci.types.IEvent>} events
                 * @memberof tendermint.abci.types.ResponseEndBlock
                 * @instance
                 */
                ResponseEndBlock.prototype.events = $util.emptyArray;

                /**
                 * Creates a new ResponseEndBlock instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.ResponseEndBlock
                 * @static
                 * @param {tendermint.abci.types.IResponseEndBlock=} [properties] Properties to set
                 * @returns {tendermint.abci.types.ResponseEndBlock} ResponseEndBlock instance
                 */
                ResponseEndBlock.create = function create(properties) {
                    return new ResponseEndBlock(properties);
                };

                /**
                 * Encodes the specified ResponseEndBlock message. Does not implicitly {@link tendermint.abci.types.ResponseEndBlock.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.ResponseEndBlock
                 * @static
                 * @param {tendermint.abci.types.IResponseEndBlock} m ResponseEndBlock message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ResponseEndBlock.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.validatorUpdates != null && m.validatorUpdates.length) {
                        for (var i = 0; i < m.validatorUpdates.length; ++i)
                            $root.tendermint.abci.types.ValidatorUpdate.encode(m.validatorUpdates[i], w.uint32(10).fork()).ldelim();
                    }
                    if (m.consensusParamUpdates != null && Object.hasOwnProperty.call(m, "consensusParamUpdates"))
                        $root.tendermint.abci.types.ConsensusParams.encode(m.consensusParamUpdates, w.uint32(18).fork()).ldelim();
                    if (m.events != null && m.events.length) {
                        for (var i = 0; i < m.events.length; ++i)
                            $root.tendermint.abci.types.Event.encode(m.events[i], w.uint32(26).fork()).ldelim();
                    }
                    return w;
                };

                /**
                 * Decodes a ResponseEndBlock message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.ResponseEndBlock
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.ResponseEndBlock} ResponseEndBlock
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ResponseEndBlock.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.ResponseEndBlock();
                    while (r.pos < c) {
                        var t = r.uint32();
                        switch (t >>> 3) {
                        case 1:
                            if (!(m.validatorUpdates && m.validatorUpdates.length))
                                m.validatorUpdates = [];
                            m.validatorUpdates.push($root.tendermint.abci.types.ValidatorUpdate.decode(r, r.uint32()));
                            break;
                        case 2:
                            m.consensusParamUpdates = $root.tendermint.abci.types.ConsensusParams.decode(r, r.uint32());
                            break;
                        case 3:
                            if (!(m.events && m.events.length))
                                m.events = [];
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

            types.ResponseCommit = (function() {

                /**
                 * Properties of a ResponseCommit.
                 * @memberof tendermint.abci.types
                 * @interface IResponseCommit
                 * @property {Uint8Array|null} [data] ResponseCommit data
                 */

                /**
                 * Constructs a new ResponseCommit.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a ResponseCommit.
                 * @implements IResponseCommit
                 * @constructor
                 * @param {tendermint.abci.types.IResponseCommit=} [p] Properties to set
                 */
                function ResponseCommit(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * ResponseCommit data.
                 * @member {Uint8Array} data
                 * @memberof tendermint.abci.types.ResponseCommit
                 * @instance
                 */
                ResponseCommit.prototype.data = $util.newBuffer([]);

                /**
                 * Creates a new ResponseCommit instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.ResponseCommit
                 * @static
                 * @param {tendermint.abci.types.IResponseCommit=} [properties] Properties to set
                 * @returns {tendermint.abci.types.ResponseCommit} ResponseCommit instance
                 */
                ResponseCommit.create = function create(properties) {
                    return new ResponseCommit(properties);
                };

                /**
                 * Encodes the specified ResponseCommit message. Does not implicitly {@link tendermint.abci.types.ResponseCommit.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.ResponseCommit
                 * @static
                 * @param {tendermint.abci.types.IResponseCommit} m ResponseCommit message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ResponseCommit.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.data != null && Object.hasOwnProperty.call(m, "data"))
                        w.uint32(18).bytes(m.data);
                    return w;
                };

                /**
                 * Decodes a ResponseCommit message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.ResponseCommit
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.ResponseCommit} ResponseCommit
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ResponseCommit.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.ResponseCommit();
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

            types.ConsensusParams = (function() {

                /**
                 * Properties of a ConsensusParams.
                 * @memberof tendermint.abci.types
                 * @interface IConsensusParams
                 * @property {tendermint.abci.types.IBlockParams|null} [block] ConsensusParams block
                 * @property {tendermint.abci.types.IEvidenceParams|null} [evidence] ConsensusParams evidence
                 * @property {tendermint.abci.types.IValidatorParams|null} [validator] ConsensusParams validator
                 */

                /**
                 * Constructs a new ConsensusParams.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a ConsensusParams.
                 * @implements IConsensusParams
                 * @constructor
                 * @param {tendermint.abci.types.IConsensusParams=} [p] Properties to set
                 */
                function ConsensusParams(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * ConsensusParams block.
                 * @member {tendermint.abci.types.IBlockParams|null|undefined} block
                 * @memberof tendermint.abci.types.ConsensusParams
                 * @instance
                 */
                ConsensusParams.prototype.block = null;

                /**
                 * ConsensusParams evidence.
                 * @member {tendermint.abci.types.IEvidenceParams|null|undefined} evidence
                 * @memberof tendermint.abci.types.ConsensusParams
                 * @instance
                 */
                ConsensusParams.prototype.evidence = null;

                /**
                 * ConsensusParams validator.
                 * @member {tendermint.abci.types.IValidatorParams|null|undefined} validator
                 * @memberof tendermint.abci.types.ConsensusParams
                 * @instance
                 */
                ConsensusParams.prototype.validator = null;

                /**
                 * Creates a new ConsensusParams instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.ConsensusParams
                 * @static
                 * @param {tendermint.abci.types.IConsensusParams=} [properties] Properties to set
                 * @returns {tendermint.abci.types.ConsensusParams} ConsensusParams instance
                 */
                ConsensusParams.create = function create(properties) {
                    return new ConsensusParams(properties);
                };

                /**
                 * Encodes the specified ConsensusParams message. Does not implicitly {@link tendermint.abci.types.ConsensusParams.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.ConsensusParams
                 * @static
                 * @param {tendermint.abci.types.IConsensusParams} m ConsensusParams message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ConsensusParams.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.block != null && Object.hasOwnProperty.call(m, "block"))
                        $root.tendermint.abci.types.BlockParams.encode(m.block, w.uint32(10).fork()).ldelim();
                    if (m.evidence != null && Object.hasOwnProperty.call(m, "evidence"))
                        $root.tendermint.abci.types.EvidenceParams.encode(m.evidence, w.uint32(18).fork()).ldelim();
                    if (m.validator != null && Object.hasOwnProperty.call(m, "validator"))
                        $root.tendermint.abci.types.ValidatorParams.encode(m.validator, w.uint32(26).fork()).ldelim();
                    return w;
                };

                /**
                 * Decodes a ConsensusParams message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.ConsensusParams
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.ConsensusParams} ConsensusParams
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ConsensusParams.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.ConsensusParams();
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

            types.BlockParams = (function() {

                /**
                 * Properties of a BlockParams.
                 * @memberof tendermint.abci.types
                 * @interface IBlockParams
                 * @property {number|Long|null} [maxBytes] BlockParams maxBytes
                 * @property {number|Long|null} [maxGas] BlockParams maxGas
                 */

                /**
                 * Constructs a new BlockParams.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a BlockParams.
                 * @implements IBlockParams
                 * @constructor
                 * @param {tendermint.abci.types.IBlockParams=} [p] Properties to set
                 */
                function BlockParams(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * BlockParams maxBytes.
                 * @member {number|Long} maxBytes
                 * @memberof tendermint.abci.types.BlockParams
                 * @instance
                 */
                BlockParams.prototype.maxBytes = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * BlockParams maxGas.
                 * @member {number|Long} maxGas
                 * @memberof tendermint.abci.types.BlockParams
                 * @instance
                 */
                BlockParams.prototype.maxGas = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * Creates a new BlockParams instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.BlockParams
                 * @static
                 * @param {tendermint.abci.types.IBlockParams=} [properties] Properties to set
                 * @returns {tendermint.abci.types.BlockParams} BlockParams instance
                 */
                BlockParams.create = function create(properties) {
                    return new BlockParams(properties);
                };

                /**
                 * Encodes the specified BlockParams message. Does not implicitly {@link tendermint.abci.types.BlockParams.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.BlockParams
                 * @static
                 * @param {tendermint.abci.types.IBlockParams} m BlockParams message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                BlockParams.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.maxBytes != null && Object.hasOwnProperty.call(m, "maxBytes"))
                        w.uint32(8).int64(m.maxBytes);
                    if (m.maxGas != null && Object.hasOwnProperty.call(m, "maxGas"))
                        w.uint32(16).int64(m.maxGas);
                    return w;
                };

                /**
                 * Decodes a BlockParams message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.BlockParams
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.BlockParams} BlockParams
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                BlockParams.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.BlockParams();
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

            types.EvidenceParams = (function() {

                /**
                 * Properties of an EvidenceParams.
                 * @memberof tendermint.abci.types
                 * @interface IEvidenceParams
                 * @property {number|Long|null} [maxAgeNumBlocks] EvidenceParams maxAgeNumBlocks
                 * @property {google.protobuf.IDuration|null} [maxAgeDuration] EvidenceParams maxAgeDuration
                 */

                /**
                 * Constructs a new EvidenceParams.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents an EvidenceParams.
                 * @implements IEvidenceParams
                 * @constructor
                 * @param {tendermint.abci.types.IEvidenceParams=} [p] Properties to set
                 */
                function EvidenceParams(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * EvidenceParams maxAgeNumBlocks.
                 * @member {number|Long} maxAgeNumBlocks
                 * @memberof tendermint.abci.types.EvidenceParams
                 * @instance
                 */
                EvidenceParams.prototype.maxAgeNumBlocks = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * EvidenceParams maxAgeDuration.
                 * @member {google.protobuf.IDuration|null|undefined} maxAgeDuration
                 * @memberof tendermint.abci.types.EvidenceParams
                 * @instance
                 */
                EvidenceParams.prototype.maxAgeDuration = null;

                /**
                 * Creates a new EvidenceParams instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.EvidenceParams
                 * @static
                 * @param {tendermint.abci.types.IEvidenceParams=} [properties] Properties to set
                 * @returns {tendermint.abci.types.EvidenceParams} EvidenceParams instance
                 */
                EvidenceParams.create = function create(properties) {
                    return new EvidenceParams(properties);
                };

                /**
                 * Encodes the specified EvidenceParams message. Does not implicitly {@link tendermint.abci.types.EvidenceParams.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.EvidenceParams
                 * @static
                 * @param {tendermint.abci.types.IEvidenceParams} m EvidenceParams message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                EvidenceParams.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.maxAgeNumBlocks != null && Object.hasOwnProperty.call(m, "maxAgeNumBlocks"))
                        w.uint32(8).int64(m.maxAgeNumBlocks);
                    if (m.maxAgeDuration != null && Object.hasOwnProperty.call(m, "maxAgeDuration"))
                        $root.google.protobuf.Duration.encode(m.maxAgeDuration, w.uint32(18).fork()).ldelim();
                    return w;
                };

                /**
                 * Decodes an EvidenceParams message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.EvidenceParams
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.EvidenceParams} EvidenceParams
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                EvidenceParams.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.EvidenceParams();
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

            types.ValidatorParams = (function() {

                /**
                 * Properties of a ValidatorParams.
                 * @memberof tendermint.abci.types
                 * @interface IValidatorParams
                 * @property {Array.<string>|null} [pubKeyTypes] ValidatorParams pubKeyTypes
                 */

                /**
                 * Constructs a new ValidatorParams.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a ValidatorParams.
                 * @implements IValidatorParams
                 * @constructor
                 * @param {tendermint.abci.types.IValidatorParams=} [p] Properties to set
                 */
                function ValidatorParams(p) {
                    this.pubKeyTypes = [];
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * ValidatorParams pubKeyTypes.
                 * @member {Array.<string>} pubKeyTypes
                 * @memberof tendermint.abci.types.ValidatorParams
                 * @instance
                 */
                ValidatorParams.prototype.pubKeyTypes = $util.emptyArray;

                /**
                 * Creates a new ValidatorParams instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.ValidatorParams
                 * @static
                 * @param {tendermint.abci.types.IValidatorParams=} [properties] Properties to set
                 * @returns {tendermint.abci.types.ValidatorParams} ValidatorParams instance
                 */
                ValidatorParams.create = function create(properties) {
                    return new ValidatorParams(properties);
                };

                /**
                 * Encodes the specified ValidatorParams message. Does not implicitly {@link tendermint.abci.types.ValidatorParams.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.ValidatorParams
                 * @static
                 * @param {tendermint.abci.types.IValidatorParams} m ValidatorParams message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ValidatorParams.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.pubKeyTypes != null && m.pubKeyTypes.length) {
                        for (var i = 0; i < m.pubKeyTypes.length; ++i)
                            w.uint32(10).string(m.pubKeyTypes[i]);
                    }
                    return w;
                };

                /**
                 * Decodes a ValidatorParams message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.ValidatorParams
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.ValidatorParams} ValidatorParams
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ValidatorParams.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.ValidatorParams();
                    while (r.pos < c) {
                        var t = r.uint32();
                        switch (t >>> 3) {
                        case 1:
                            if (!(m.pubKeyTypes && m.pubKeyTypes.length))
                                m.pubKeyTypes = [];
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

            types.LastCommitInfo = (function() {

                /**
                 * Properties of a LastCommitInfo.
                 * @memberof tendermint.abci.types
                 * @interface ILastCommitInfo
                 * @property {number|null} [round] LastCommitInfo round
                 * @property {Array.<tendermint.abci.types.IVoteInfo>|null} [votes] LastCommitInfo votes
                 */

                /**
                 * Constructs a new LastCommitInfo.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a LastCommitInfo.
                 * @implements ILastCommitInfo
                 * @constructor
                 * @param {tendermint.abci.types.ILastCommitInfo=} [p] Properties to set
                 */
                function LastCommitInfo(p) {
                    this.votes = [];
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * LastCommitInfo round.
                 * @member {number} round
                 * @memberof tendermint.abci.types.LastCommitInfo
                 * @instance
                 */
                LastCommitInfo.prototype.round = 0;

                /**
                 * LastCommitInfo votes.
                 * @member {Array.<tendermint.abci.types.IVoteInfo>} votes
                 * @memberof tendermint.abci.types.LastCommitInfo
                 * @instance
                 */
                LastCommitInfo.prototype.votes = $util.emptyArray;

                /**
                 * Creates a new LastCommitInfo instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.LastCommitInfo
                 * @static
                 * @param {tendermint.abci.types.ILastCommitInfo=} [properties] Properties to set
                 * @returns {tendermint.abci.types.LastCommitInfo} LastCommitInfo instance
                 */
                LastCommitInfo.create = function create(properties) {
                    return new LastCommitInfo(properties);
                };

                /**
                 * Encodes the specified LastCommitInfo message. Does not implicitly {@link tendermint.abci.types.LastCommitInfo.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.LastCommitInfo
                 * @static
                 * @param {tendermint.abci.types.ILastCommitInfo} m LastCommitInfo message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                LastCommitInfo.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.round != null && Object.hasOwnProperty.call(m, "round"))
                        w.uint32(8).int32(m.round);
                    if (m.votes != null && m.votes.length) {
                        for (var i = 0; i < m.votes.length; ++i)
                            $root.tendermint.abci.types.VoteInfo.encode(m.votes[i], w.uint32(18).fork()).ldelim();
                    }
                    return w;
                };

                /**
                 * Decodes a LastCommitInfo message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.LastCommitInfo
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.LastCommitInfo} LastCommitInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                LastCommitInfo.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.LastCommitInfo();
                    while (r.pos < c) {
                        var t = r.uint32();
                        switch (t >>> 3) {
                        case 1:
                            m.round = r.int32();
                            break;
                        case 2:
                            if (!(m.votes && m.votes.length))
                                m.votes = [];
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

            types.Event = (function() {

                /**
                 * Properties of an Event.
                 * @memberof tendermint.abci.types
                 * @interface IEvent
                 * @property {string|null} [type] Event type
                 * @property {Array.<tendermint.libs.kv.IPair>|null} [attributes] Event attributes
                 */

                /**
                 * Constructs a new Event.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents an Event.
                 * @implements IEvent
                 * @constructor
                 * @param {tendermint.abci.types.IEvent=} [p] Properties to set
                 */
                function Event(p) {
                    this.attributes = [];
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * Event type.
                 * @member {string} type
                 * @memberof tendermint.abci.types.Event
                 * @instance
                 */
                Event.prototype.type = "";

                /**
                 * Event attributes.
                 * @member {Array.<tendermint.libs.kv.IPair>} attributes
                 * @memberof tendermint.abci.types.Event
                 * @instance
                 */
                Event.prototype.attributes = $util.emptyArray;

                /**
                 * Creates a new Event instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.Event
                 * @static
                 * @param {tendermint.abci.types.IEvent=} [properties] Properties to set
                 * @returns {tendermint.abci.types.Event} Event instance
                 */
                Event.create = function create(properties) {
                    return new Event(properties);
                };

                /**
                 * Encodes the specified Event message. Does not implicitly {@link tendermint.abci.types.Event.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.Event
                 * @static
                 * @param {tendermint.abci.types.IEvent} m Event message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Event.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.type != null && Object.hasOwnProperty.call(m, "type"))
                        w.uint32(10).string(m.type);
                    if (m.attributes != null && m.attributes.length) {
                        for (var i = 0; i < m.attributes.length; ++i)
                            $root.tendermint.libs.kv.Pair.encode(m.attributes[i], w.uint32(18).fork()).ldelim();
                    }
                    return w;
                };

                /**
                 * Decodes an Event message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.Event
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.Event} Event
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Event.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.Event();
                    while (r.pos < c) {
                        var t = r.uint32();
                        switch (t >>> 3) {
                        case 1:
                            m.type = r.string();
                            break;
                        case 2:
                            if (!(m.attributes && m.attributes.length))
                                m.attributes = [];
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

            types.Header = (function() {

                /**
                 * Properties of a Header.
                 * @memberof tendermint.abci.types
                 * @interface IHeader
                 * @property {tendermint.abci.types.IVersion|null} [version] Header version
                 * @property {string|null} [chainId] Header chainId
                 * @property {number|Long|null} [height] Header height
                 * @property {google.protobuf.ITimestamp|null} [time] Header time
                 * @property {tendermint.abci.types.IBlockID|null} [lastBlockId] Header lastBlockId
                 * @property {Uint8Array|null} [lastCommitHash] Header lastCommitHash
                 * @property {Uint8Array|null} [dataHash] Header dataHash
                 * @property {Uint8Array|null} [validatorsHash] Header validatorsHash
                 * @property {Uint8Array|null} [nextValidatorsHash] Header nextValidatorsHash
                 * @property {Uint8Array|null} [consensusHash] Header consensusHash
                 * @property {Uint8Array|null} [appHash] Header appHash
                 * @property {Uint8Array|null} [lastResultsHash] Header lastResultsHash
                 * @property {Uint8Array|null} [evidenceHash] Header evidenceHash
                 * @property {Uint8Array|null} [proposerAddress] Header proposerAddress
                 */

                /**
                 * Constructs a new Header.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a Header.
                 * @implements IHeader
                 * @constructor
                 * @param {tendermint.abci.types.IHeader=} [p] Properties to set
                 */
                function Header(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * Header version.
                 * @member {tendermint.abci.types.IVersion|null|undefined} version
                 * @memberof tendermint.abci.types.Header
                 * @instance
                 */
                Header.prototype.version = null;

                /**
                 * Header chainId.
                 * @member {string} chainId
                 * @memberof tendermint.abci.types.Header
                 * @instance
                 */
                Header.prototype.chainId = "";

                /**
                 * Header height.
                 * @member {number|Long} height
                 * @memberof tendermint.abci.types.Header
                 * @instance
                 */
                Header.prototype.height = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * Header time.
                 * @member {google.protobuf.ITimestamp|null|undefined} time
                 * @memberof tendermint.abci.types.Header
                 * @instance
                 */
                Header.prototype.time = null;

                /**
                 * Header lastBlockId.
                 * @member {tendermint.abci.types.IBlockID|null|undefined} lastBlockId
                 * @memberof tendermint.abci.types.Header
                 * @instance
                 */
                Header.prototype.lastBlockId = null;

                /**
                 * Header lastCommitHash.
                 * @member {Uint8Array} lastCommitHash
                 * @memberof tendermint.abci.types.Header
                 * @instance
                 */
                Header.prototype.lastCommitHash = $util.newBuffer([]);

                /**
                 * Header dataHash.
                 * @member {Uint8Array} dataHash
                 * @memberof tendermint.abci.types.Header
                 * @instance
                 */
                Header.prototype.dataHash = $util.newBuffer([]);

                /**
                 * Header validatorsHash.
                 * @member {Uint8Array} validatorsHash
                 * @memberof tendermint.abci.types.Header
                 * @instance
                 */
                Header.prototype.validatorsHash = $util.newBuffer([]);

                /**
                 * Header nextValidatorsHash.
                 * @member {Uint8Array} nextValidatorsHash
                 * @memberof tendermint.abci.types.Header
                 * @instance
                 */
                Header.prototype.nextValidatorsHash = $util.newBuffer([]);

                /**
                 * Header consensusHash.
                 * @member {Uint8Array} consensusHash
                 * @memberof tendermint.abci.types.Header
                 * @instance
                 */
                Header.prototype.consensusHash = $util.newBuffer([]);

                /**
                 * Header appHash.
                 * @member {Uint8Array} appHash
                 * @memberof tendermint.abci.types.Header
                 * @instance
                 */
                Header.prototype.appHash = $util.newBuffer([]);

                /**
                 * Header lastResultsHash.
                 * @member {Uint8Array} lastResultsHash
                 * @memberof tendermint.abci.types.Header
                 * @instance
                 */
                Header.prototype.lastResultsHash = $util.newBuffer([]);

                /**
                 * Header evidenceHash.
                 * @member {Uint8Array} evidenceHash
                 * @memberof tendermint.abci.types.Header
                 * @instance
                 */
                Header.prototype.evidenceHash = $util.newBuffer([]);

                /**
                 * Header proposerAddress.
                 * @member {Uint8Array} proposerAddress
                 * @memberof tendermint.abci.types.Header
                 * @instance
                 */
                Header.prototype.proposerAddress = $util.newBuffer([]);

                /**
                 * Creates a new Header instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.Header
                 * @static
                 * @param {tendermint.abci.types.IHeader=} [properties] Properties to set
                 * @returns {tendermint.abci.types.Header} Header instance
                 */
                Header.create = function create(properties) {
                    return new Header(properties);
                };

                /**
                 * Encodes the specified Header message. Does not implicitly {@link tendermint.abci.types.Header.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.Header
                 * @static
                 * @param {tendermint.abci.types.IHeader} m Header message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Header.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.version != null && Object.hasOwnProperty.call(m, "version"))
                        $root.tendermint.abci.types.Version.encode(m.version, w.uint32(10).fork()).ldelim();
                    if (m.chainId != null && Object.hasOwnProperty.call(m, "chainId"))
                        w.uint32(18).string(m.chainId);
                    if (m.height != null && Object.hasOwnProperty.call(m, "height"))
                        w.uint32(24).int64(m.height);
                    if (m.time != null && Object.hasOwnProperty.call(m, "time"))
                        $root.google.protobuf.Timestamp.encode(m.time, w.uint32(34).fork()).ldelim();
                    if (m.lastBlockId != null && Object.hasOwnProperty.call(m, "lastBlockId"))
                        $root.tendermint.abci.types.BlockID.encode(m.lastBlockId, w.uint32(42).fork()).ldelim();
                    if (m.lastCommitHash != null && Object.hasOwnProperty.call(m, "lastCommitHash"))
                        w.uint32(50).bytes(m.lastCommitHash);
                    if (m.dataHash != null && Object.hasOwnProperty.call(m, "dataHash"))
                        w.uint32(58).bytes(m.dataHash);
                    if (m.validatorsHash != null && Object.hasOwnProperty.call(m, "validatorsHash"))
                        w.uint32(66).bytes(m.validatorsHash);
                    if (m.nextValidatorsHash != null && Object.hasOwnProperty.call(m, "nextValidatorsHash"))
                        w.uint32(74).bytes(m.nextValidatorsHash);
                    if (m.consensusHash != null && Object.hasOwnProperty.call(m, "consensusHash"))
                        w.uint32(82).bytes(m.consensusHash);
                    if (m.appHash != null && Object.hasOwnProperty.call(m, "appHash"))
                        w.uint32(90).bytes(m.appHash);
                    if (m.lastResultsHash != null && Object.hasOwnProperty.call(m, "lastResultsHash"))
                        w.uint32(98).bytes(m.lastResultsHash);
                    if (m.evidenceHash != null && Object.hasOwnProperty.call(m, "evidenceHash"))
                        w.uint32(106).bytes(m.evidenceHash);
                    if (m.proposerAddress != null && Object.hasOwnProperty.call(m, "proposerAddress"))
                        w.uint32(114).bytes(m.proposerAddress);
                    return w;
                };

                /**
                 * Decodes a Header message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.Header
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.Header} Header
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Header.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.Header();
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

            types.Version = (function() {

                /**
                 * Properties of a Version.
                 * @memberof tendermint.abci.types
                 * @interface IVersion
                 * @property {number|Long|null} [Block] Version Block
                 * @property {number|Long|null} [App] Version App
                 */

                /**
                 * Constructs a new Version.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a Version.
                 * @implements IVersion
                 * @constructor
                 * @param {tendermint.abci.types.IVersion=} [p] Properties to set
                 */
                function Version(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * Version Block.
                 * @member {number|Long} Block
                 * @memberof tendermint.abci.types.Version
                 * @instance
                 */
                Version.prototype.Block = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * Version App.
                 * @member {number|Long} App
                 * @memberof tendermint.abci.types.Version
                 * @instance
                 */
                Version.prototype.App = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

                /**
                 * Creates a new Version instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.Version
                 * @static
                 * @param {tendermint.abci.types.IVersion=} [properties] Properties to set
                 * @returns {tendermint.abci.types.Version} Version instance
                 */
                Version.create = function create(properties) {
                    return new Version(properties);
                };

                /**
                 * Encodes the specified Version message. Does not implicitly {@link tendermint.abci.types.Version.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.Version
                 * @static
                 * @param {tendermint.abci.types.IVersion} m Version message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Version.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.Block != null && Object.hasOwnProperty.call(m, "Block"))
                        w.uint32(8).uint64(m.Block);
                    if (m.App != null && Object.hasOwnProperty.call(m, "App"))
                        w.uint32(16).uint64(m.App);
                    return w;
                };

                /**
                 * Decodes a Version message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.Version
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.Version} Version
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Version.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.Version();
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

            types.BlockID = (function() {

                /**
                 * Properties of a BlockID.
                 * @memberof tendermint.abci.types
                 * @interface IBlockID
                 * @property {Uint8Array|null} [hash] BlockID hash
                 * @property {tendermint.abci.types.IPartSetHeader|null} [partsHeader] BlockID partsHeader
                 */

                /**
                 * Constructs a new BlockID.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a BlockID.
                 * @implements IBlockID
                 * @constructor
                 * @param {tendermint.abci.types.IBlockID=} [p] Properties to set
                 */
                function BlockID(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * BlockID hash.
                 * @member {Uint8Array} hash
                 * @memberof tendermint.abci.types.BlockID
                 * @instance
                 */
                BlockID.prototype.hash = $util.newBuffer([]);

                /**
                 * BlockID partsHeader.
                 * @member {tendermint.abci.types.IPartSetHeader|null|undefined} partsHeader
                 * @memberof tendermint.abci.types.BlockID
                 * @instance
                 */
                BlockID.prototype.partsHeader = null;

                /**
                 * Creates a new BlockID instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.BlockID
                 * @static
                 * @param {tendermint.abci.types.IBlockID=} [properties] Properties to set
                 * @returns {tendermint.abci.types.BlockID} BlockID instance
                 */
                BlockID.create = function create(properties) {
                    return new BlockID(properties);
                };

                /**
                 * Encodes the specified BlockID message. Does not implicitly {@link tendermint.abci.types.BlockID.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.BlockID
                 * @static
                 * @param {tendermint.abci.types.IBlockID} m BlockID message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                BlockID.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.hash != null && Object.hasOwnProperty.call(m, "hash"))
                        w.uint32(10).bytes(m.hash);
                    if (m.partsHeader != null && Object.hasOwnProperty.call(m, "partsHeader"))
                        $root.tendermint.abci.types.PartSetHeader.encode(m.partsHeader, w.uint32(18).fork()).ldelim();
                    return w;
                };

                /**
                 * Decodes a BlockID message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.BlockID
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.BlockID} BlockID
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                BlockID.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.BlockID();
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

            types.PartSetHeader = (function() {

                /**
                 * Properties of a PartSetHeader.
                 * @memberof tendermint.abci.types
                 * @interface IPartSetHeader
                 * @property {number|null} [total] PartSetHeader total
                 * @property {Uint8Array|null} [hash] PartSetHeader hash
                 */

                /**
                 * Constructs a new PartSetHeader.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a PartSetHeader.
                 * @implements IPartSetHeader
                 * @constructor
                 * @param {tendermint.abci.types.IPartSetHeader=} [p] Properties to set
                 */
                function PartSetHeader(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * PartSetHeader total.
                 * @member {number} total
                 * @memberof tendermint.abci.types.PartSetHeader
                 * @instance
                 */
                PartSetHeader.prototype.total = 0;

                /**
                 * PartSetHeader hash.
                 * @member {Uint8Array} hash
                 * @memberof tendermint.abci.types.PartSetHeader
                 * @instance
                 */
                PartSetHeader.prototype.hash = $util.newBuffer([]);

                /**
                 * Creates a new PartSetHeader instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.PartSetHeader
                 * @static
                 * @param {tendermint.abci.types.IPartSetHeader=} [properties] Properties to set
                 * @returns {tendermint.abci.types.PartSetHeader} PartSetHeader instance
                 */
                PartSetHeader.create = function create(properties) {
                    return new PartSetHeader(properties);
                };

                /**
                 * Encodes the specified PartSetHeader message. Does not implicitly {@link tendermint.abci.types.PartSetHeader.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.PartSetHeader
                 * @static
                 * @param {tendermint.abci.types.IPartSetHeader} m PartSetHeader message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PartSetHeader.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.total != null && Object.hasOwnProperty.call(m, "total"))
                        w.uint32(8).int32(m.total);
                    if (m.hash != null && Object.hasOwnProperty.call(m, "hash"))
                        w.uint32(18).bytes(m.hash);
                    return w;
                };

                /**
                 * Decodes a PartSetHeader message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.PartSetHeader
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.PartSetHeader} PartSetHeader
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PartSetHeader.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.PartSetHeader();
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

            types.Validator = (function() {

                /**
                 * Properties of a Validator.
                 * @memberof tendermint.abci.types
                 * @interface IValidator
                 * @property {Uint8Array|null} [address] Validator address
                 * @property {number|Long|null} [power] Validator power
                 */

                /**
                 * Constructs a new Validator.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a Validator.
                 * @implements IValidator
                 * @constructor
                 * @param {tendermint.abci.types.IValidator=} [p] Properties to set
                 */
                function Validator(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * Validator address.
                 * @member {Uint8Array} address
                 * @memberof tendermint.abci.types.Validator
                 * @instance
                 */
                Validator.prototype.address = $util.newBuffer([]);

                /**
                 * Validator power.
                 * @member {number|Long} power
                 * @memberof tendermint.abci.types.Validator
                 * @instance
                 */
                Validator.prototype.power = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * Creates a new Validator instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.Validator
                 * @static
                 * @param {tendermint.abci.types.IValidator=} [properties] Properties to set
                 * @returns {tendermint.abci.types.Validator} Validator instance
                 */
                Validator.create = function create(properties) {
                    return new Validator(properties);
                };

                /**
                 * Encodes the specified Validator message. Does not implicitly {@link tendermint.abci.types.Validator.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.Validator
                 * @static
                 * @param {tendermint.abci.types.IValidator} m Validator message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Validator.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.address != null && Object.hasOwnProperty.call(m, "address"))
                        w.uint32(10).bytes(m.address);
                    if (m.power != null && Object.hasOwnProperty.call(m, "power"))
                        w.uint32(24).int64(m.power);
                    return w;
                };

                /**
                 * Decodes a Validator message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.Validator
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.Validator} Validator
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Validator.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.Validator();
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

            types.ValidatorUpdate = (function() {

                /**
                 * Properties of a ValidatorUpdate.
                 * @memberof tendermint.abci.types
                 * @interface IValidatorUpdate
                 * @property {tendermint.abci.types.IPubKey|null} [pubKey] ValidatorUpdate pubKey
                 * @property {number|Long|null} [power] ValidatorUpdate power
                 */

                /**
                 * Constructs a new ValidatorUpdate.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a ValidatorUpdate.
                 * @implements IValidatorUpdate
                 * @constructor
                 * @param {tendermint.abci.types.IValidatorUpdate=} [p] Properties to set
                 */
                function ValidatorUpdate(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * ValidatorUpdate pubKey.
                 * @member {tendermint.abci.types.IPubKey|null|undefined} pubKey
                 * @memberof tendermint.abci.types.ValidatorUpdate
                 * @instance
                 */
                ValidatorUpdate.prototype.pubKey = null;

                /**
                 * ValidatorUpdate power.
                 * @member {number|Long} power
                 * @memberof tendermint.abci.types.ValidatorUpdate
                 * @instance
                 */
                ValidatorUpdate.prototype.power = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * Creates a new ValidatorUpdate instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.ValidatorUpdate
                 * @static
                 * @param {tendermint.abci.types.IValidatorUpdate=} [properties] Properties to set
                 * @returns {tendermint.abci.types.ValidatorUpdate} ValidatorUpdate instance
                 */
                ValidatorUpdate.create = function create(properties) {
                    return new ValidatorUpdate(properties);
                };

                /**
                 * Encodes the specified ValidatorUpdate message. Does not implicitly {@link tendermint.abci.types.ValidatorUpdate.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.ValidatorUpdate
                 * @static
                 * @param {tendermint.abci.types.IValidatorUpdate} m ValidatorUpdate message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ValidatorUpdate.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.pubKey != null && Object.hasOwnProperty.call(m, "pubKey"))
                        $root.tendermint.abci.types.PubKey.encode(m.pubKey, w.uint32(10).fork()).ldelim();
                    if (m.power != null && Object.hasOwnProperty.call(m, "power"))
                        w.uint32(16).int64(m.power);
                    return w;
                };

                /**
                 * Decodes a ValidatorUpdate message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.ValidatorUpdate
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.ValidatorUpdate} ValidatorUpdate
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ValidatorUpdate.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.ValidatorUpdate();
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

            types.VoteInfo = (function() {

                /**
                 * Properties of a VoteInfo.
                 * @memberof tendermint.abci.types
                 * @interface IVoteInfo
                 * @property {tendermint.abci.types.IValidator|null} [validator] VoteInfo validator
                 * @property {boolean|null} [signedLastBlock] VoteInfo signedLastBlock
                 */

                /**
                 * Constructs a new VoteInfo.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a VoteInfo.
                 * @implements IVoteInfo
                 * @constructor
                 * @param {tendermint.abci.types.IVoteInfo=} [p] Properties to set
                 */
                function VoteInfo(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * VoteInfo validator.
                 * @member {tendermint.abci.types.IValidator|null|undefined} validator
                 * @memberof tendermint.abci.types.VoteInfo
                 * @instance
                 */
                VoteInfo.prototype.validator = null;

                /**
                 * VoteInfo signedLastBlock.
                 * @member {boolean} signedLastBlock
                 * @memberof tendermint.abci.types.VoteInfo
                 * @instance
                 */
                VoteInfo.prototype.signedLastBlock = false;

                /**
                 * Creates a new VoteInfo instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.VoteInfo
                 * @static
                 * @param {tendermint.abci.types.IVoteInfo=} [properties] Properties to set
                 * @returns {tendermint.abci.types.VoteInfo} VoteInfo instance
                 */
                VoteInfo.create = function create(properties) {
                    return new VoteInfo(properties);
                };

                /**
                 * Encodes the specified VoteInfo message. Does not implicitly {@link tendermint.abci.types.VoteInfo.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.VoteInfo
                 * @static
                 * @param {tendermint.abci.types.IVoteInfo} m VoteInfo message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                VoteInfo.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.validator != null && Object.hasOwnProperty.call(m, "validator"))
                        $root.tendermint.abci.types.Validator.encode(m.validator, w.uint32(10).fork()).ldelim();
                    if (m.signedLastBlock != null && Object.hasOwnProperty.call(m, "signedLastBlock"))
                        w.uint32(16).bool(m.signedLastBlock);
                    return w;
                };

                /**
                 * Decodes a VoteInfo message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.VoteInfo
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.VoteInfo} VoteInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                VoteInfo.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.VoteInfo();
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

            types.PubKey = (function() {

                /**
                 * Properties of a PubKey.
                 * @memberof tendermint.abci.types
                 * @interface IPubKey
                 * @property {string|null} [type] PubKey type
                 * @property {Uint8Array|null} [data] PubKey data
                 */

                /**
                 * Constructs a new PubKey.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a PubKey.
                 * @implements IPubKey
                 * @constructor
                 * @param {tendermint.abci.types.IPubKey=} [p] Properties to set
                 */
                function PubKey(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * PubKey type.
                 * @member {string} type
                 * @memberof tendermint.abci.types.PubKey
                 * @instance
                 */
                PubKey.prototype.type = "";

                /**
                 * PubKey data.
                 * @member {Uint8Array} data
                 * @memberof tendermint.abci.types.PubKey
                 * @instance
                 */
                PubKey.prototype.data = $util.newBuffer([]);

                /**
                 * Creates a new PubKey instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.PubKey
                 * @static
                 * @param {tendermint.abci.types.IPubKey=} [properties] Properties to set
                 * @returns {tendermint.abci.types.PubKey} PubKey instance
                 */
                PubKey.create = function create(properties) {
                    return new PubKey(properties);
                };

                /**
                 * Encodes the specified PubKey message. Does not implicitly {@link tendermint.abci.types.PubKey.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.PubKey
                 * @static
                 * @param {tendermint.abci.types.IPubKey} m PubKey message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                PubKey.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.type != null && Object.hasOwnProperty.call(m, "type"))
                        w.uint32(10).string(m.type);
                    if (m.data != null && Object.hasOwnProperty.call(m, "data"))
                        w.uint32(18).bytes(m.data);
                    return w;
                };

                /**
                 * Decodes a PubKey message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.PubKey
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.PubKey} PubKey
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                PubKey.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.PubKey();
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

            types.Evidence = (function() {

                /**
                 * Properties of an Evidence.
                 * @memberof tendermint.abci.types
                 * @interface IEvidence
                 * @property {string|null} [type] Evidence type
                 * @property {tendermint.abci.types.IValidator|null} [validator] Evidence validator
                 * @property {number|Long|null} [height] Evidence height
                 * @property {google.protobuf.ITimestamp|null} [time] Evidence time
                 * @property {number|Long|null} [totalVotingPower] Evidence totalVotingPower
                 */

                /**
                 * Constructs a new Evidence.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents an Evidence.
                 * @implements IEvidence
                 * @constructor
                 * @param {tendermint.abci.types.IEvidence=} [p] Properties to set
                 */
                function Evidence(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * Evidence type.
                 * @member {string} type
                 * @memberof tendermint.abci.types.Evidence
                 * @instance
                 */
                Evidence.prototype.type = "";

                /**
                 * Evidence validator.
                 * @member {tendermint.abci.types.IValidator|null|undefined} validator
                 * @memberof tendermint.abci.types.Evidence
                 * @instance
                 */
                Evidence.prototype.validator = null;

                /**
                 * Evidence height.
                 * @member {number|Long} height
                 * @memberof tendermint.abci.types.Evidence
                 * @instance
                 */
                Evidence.prototype.height = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * Evidence time.
                 * @member {google.protobuf.ITimestamp|null|undefined} time
                 * @memberof tendermint.abci.types.Evidence
                 * @instance
                 */
                Evidence.prototype.time = null;

                /**
                 * Evidence totalVotingPower.
                 * @member {number|Long} totalVotingPower
                 * @memberof tendermint.abci.types.Evidence
                 * @instance
                 */
                Evidence.prototype.totalVotingPower = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * Creates a new Evidence instance using the specified properties.
                 * @function create
                 * @memberof tendermint.abci.types.Evidence
                 * @static
                 * @param {tendermint.abci.types.IEvidence=} [properties] Properties to set
                 * @returns {tendermint.abci.types.Evidence} Evidence instance
                 */
                Evidence.create = function create(properties) {
                    return new Evidence(properties);
                };

                /**
                 * Encodes the specified Evidence message. Does not implicitly {@link tendermint.abci.types.Evidence.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.abci.types.Evidence
                 * @static
                 * @param {tendermint.abci.types.IEvidence} m Evidence message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Evidence.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.type != null && Object.hasOwnProperty.call(m, "type"))
                        w.uint32(10).string(m.type);
                    if (m.validator != null && Object.hasOwnProperty.call(m, "validator"))
                        $root.tendermint.abci.types.Validator.encode(m.validator, w.uint32(18).fork()).ldelim();
                    if (m.height != null && Object.hasOwnProperty.call(m, "height"))
                        w.uint32(24).int64(m.height);
                    if (m.time != null && Object.hasOwnProperty.call(m, "time"))
                        $root.google.protobuf.Timestamp.encode(m.time, w.uint32(34).fork()).ldelim();
                    if (m.totalVotingPower != null && Object.hasOwnProperty.call(m, "totalVotingPower"))
                        w.uint32(40).int64(m.totalVotingPower);
                    return w;
                };

                /**
                 * Decodes an Evidence message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.abci.types.Evidence
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.abci.types.Evidence} Evidence
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Evidence.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.abci.types.Evidence();
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

            types.ABCIApplication = (function() {

                /**
                 * Constructs a new ABCIApplication service.
                 * @memberof tendermint.abci.types
                 * @classdesc Represents a ABCIApplication
                 * @extends $protobuf.rpc.Service
                 * @constructor
                 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
                 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
                 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
                 */
                function ABCIApplication(rpcImpl, requestDelimited, responseDelimited) {
                    $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
                }

                (ABCIApplication.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = ABCIApplication;

                /**
                 * Creates new ABCIApplication service using the specified rpc implementation.
                 * @function create
                 * @memberof tendermint.abci.types.ABCIApplication
                 * @static
                 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
                 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
                 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
                 * @returns {ABCIApplication} RPC service. Useful where requests and/or responses are streamed.
                 */
                ABCIApplication.create = function create(rpcImpl, requestDelimited, responseDelimited) {
                    return new this(rpcImpl, requestDelimited, responseDelimited);
                };

                /**
                 * Callback as used by {@link tendermint.abci.types.ABCIApplication#echo}.
                 * @memberof tendermint.abci.types.ABCIApplication
                 * @typedef EchoCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {tendermint.abci.types.ResponseEcho} [response] ResponseEcho
                 */

                /**
                 * Calls Echo.
                 * @function echo
                 * @memberof tendermint.abci.types.ABCIApplication
                 * @instance
                 * @param {tendermint.abci.types.IRequestEcho} request RequestEcho message or plain object
                 * @param {tendermint.abci.types.ABCIApplication.EchoCallback} callback Node-style callback called with the error, if any, and ResponseEcho
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(ABCIApplication.prototype.echo = function echo(request, callback) {
                    return this.rpcCall(echo, $root.tendermint.abci.types.RequestEcho, $root.tendermint.abci.types.ResponseEcho, request, callback);
                }, "name", { value: "Echo" });

                /**
                 * Calls Echo.
                 * @function echo
                 * @memberof tendermint.abci.types.ABCIApplication
                 * @instance
                 * @param {tendermint.abci.types.IRequestEcho} request RequestEcho message or plain object
                 * @returns {Promise<tendermint.abci.types.ResponseEcho>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link tendermint.abci.types.ABCIApplication#flush}.
                 * @memberof tendermint.abci.types.ABCIApplication
                 * @typedef FlushCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {tendermint.abci.types.ResponseFlush} [response] ResponseFlush
                 */

                /**
                 * Calls Flush.
                 * @function flush
                 * @memberof tendermint.abci.types.ABCIApplication
                 * @instance
                 * @param {tendermint.abci.types.IRequestFlush} request RequestFlush message or plain object
                 * @param {tendermint.abci.types.ABCIApplication.FlushCallback} callback Node-style callback called with the error, if any, and ResponseFlush
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(ABCIApplication.prototype.flush = function flush(request, callback) {
                    return this.rpcCall(flush, $root.tendermint.abci.types.RequestFlush, $root.tendermint.abci.types.ResponseFlush, request, callback);
                }, "name", { value: "Flush" });

                /**
                 * Calls Flush.
                 * @function flush
                 * @memberof tendermint.abci.types.ABCIApplication
                 * @instance
                 * @param {tendermint.abci.types.IRequestFlush} request RequestFlush message or plain object
                 * @returns {Promise<tendermint.abci.types.ResponseFlush>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link tendermint.abci.types.ABCIApplication#info}.
                 * @memberof tendermint.abci.types.ABCIApplication
                 * @typedef InfoCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {tendermint.abci.types.ResponseInfo} [response] ResponseInfo
                 */

                /**
                 * Calls Info.
                 * @function info
                 * @memberof tendermint.abci.types.ABCIApplication
                 * @instance
                 * @param {tendermint.abci.types.IRequestInfo} request RequestInfo message or plain object
                 * @param {tendermint.abci.types.ABCIApplication.InfoCallback} callback Node-style callback called with the error, if any, and ResponseInfo
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(ABCIApplication.prototype.info = function info(request, callback) {
                    return this.rpcCall(info, $root.tendermint.abci.types.RequestInfo, $root.tendermint.abci.types.ResponseInfo, request, callback);
                }, "name", { value: "Info" });

                /**
                 * Calls Info.
                 * @function info
                 * @memberof tendermint.abci.types.ABCIApplication
                 * @instance
                 * @param {tendermint.abci.types.IRequestInfo} request RequestInfo message or plain object
                 * @returns {Promise<tendermint.abci.types.ResponseInfo>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link tendermint.abci.types.ABCIApplication#setOption}.
                 * @memberof tendermint.abci.types.ABCIApplication
                 * @typedef SetOptionCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {tendermint.abci.types.ResponseSetOption} [response] ResponseSetOption
                 */

                /**
                 * Calls SetOption.
                 * @function setOption
                 * @memberof tendermint.abci.types.ABCIApplication
                 * @instance
                 * @param {tendermint.abci.types.IRequestSetOption} request RequestSetOption message or plain object
                 * @param {tendermint.abci.types.ABCIApplication.SetOptionCallback} callback Node-style callback called with the error, if any, and ResponseSetOption
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(ABCIApplication.prototype.setOption = function setOption(request, callback) {
                    return this.rpcCall(setOption, $root.tendermint.abci.types.RequestSetOption, $root.tendermint.abci.types.ResponseSetOption, request, callback);
                }, "name", { value: "SetOption" });

                /**
                 * Calls SetOption.
                 * @function setOption
                 * @memberof tendermint.abci.types.ABCIApplication
                 * @instance
                 * @param {tendermint.abci.types.IRequestSetOption} request RequestSetOption message or plain object
                 * @returns {Promise<tendermint.abci.types.ResponseSetOption>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link tendermint.abci.types.ABCIApplication#deliverTx}.
                 * @memberof tendermint.abci.types.ABCIApplication
                 * @typedef DeliverTxCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {tendermint.abci.types.ResponseDeliverTx} [response] ResponseDeliverTx
                 */

                /**
                 * Calls DeliverTx.
                 * @function deliverTx
                 * @memberof tendermint.abci.types.ABCIApplication
                 * @instance
                 * @param {tendermint.abci.types.IRequestDeliverTx} request RequestDeliverTx message or plain object
                 * @param {tendermint.abci.types.ABCIApplication.DeliverTxCallback} callback Node-style callback called with the error, if any, and ResponseDeliverTx
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(ABCIApplication.prototype.deliverTx = function deliverTx(request, callback) {
                    return this.rpcCall(deliverTx, $root.tendermint.abci.types.RequestDeliverTx, $root.tendermint.abci.types.ResponseDeliverTx, request, callback);
                }, "name", { value: "DeliverTx" });

                /**
                 * Calls DeliverTx.
                 * @function deliverTx
                 * @memberof tendermint.abci.types.ABCIApplication
                 * @instance
                 * @param {tendermint.abci.types.IRequestDeliverTx} request RequestDeliverTx message or plain object
                 * @returns {Promise<tendermint.abci.types.ResponseDeliverTx>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link tendermint.abci.types.ABCIApplication#checkTx}.
                 * @memberof tendermint.abci.types.ABCIApplication
                 * @typedef CheckTxCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {tendermint.abci.types.ResponseCheckTx} [response] ResponseCheckTx
                 */

                /**
                 * Calls CheckTx.
                 * @function checkTx
                 * @memberof tendermint.abci.types.ABCIApplication
                 * @instance
                 * @param {tendermint.abci.types.IRequestCheckTx} request RequestCheckTx message or plain object
                 * @param {tendermint.abci.types.ABCIApplication.CheckTxCallback} callback Node-style callback called with the error, if any, and ResponseCheckTx
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(ABCIApplication.prototype.checkTx = function checkTx(request, callback) {
                    return this.rpcCall(checkTx, $root.tendermint.abci.types.RequestCheckTx, $root.tendermint.abci.types.ResponseCheckTx, request, callback);
                }, "name", { value: "CheckTx" });

                /**
                 * Calls CheckTx.
                 * @function checkTx
                 * @memberof tendermint.abci.types.ABCIApplication
                 * @instance
                 * @param {tendermint.abci.types.IRequestCheckTx} request RequestCheckTx message or plain object
                 * @returns {Promise<tendermint.abci.types.ResponseCheckTx>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link tendermint.abci.types.ABCIApplication#query}.
                 * @memberof tendermint.abci.types.ABCIApplication
                 * @typedef QueryCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {tendermint.abci.types.ResponseQuery} [response] ResponseQuery
                 */

                /**
                 * Calls Query.
                 * @function query
                 * @memberof tendermint.abci.types.ABCIApplication
                 * @instance
                 * @param {tendermint.abci.types.IRequestQuery} request RequestQuery message or plain object
                 * @param {tendermint.abci.types.ABCIApplication.QueryCallback} callback Node-style callback called with the error, if any, and ResponseQuery
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(ABCIApplication.prototype.query = function query(request, callback) {
                    return this.rpcCall(query, $root.tendermint.abci.types.RequestQuery, $root.tendermint.abci.types.ResponseQuery, request, callback);
                }, "name", { value: "Query" });

                /**
                 * Calls Query.
                 * @function query
                 * @memberof tendermint.abci.types.ABCIApplication
                 * @instance
                 * @param {tendermint.abci.types.IRequestQuery} request RequestQuery message or plain object
                 * @returns {Promise<tendermint.abci.types.ResponseQuery>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link tendermint.abci.types.ABCIApplication#commit}.
                 * @memberof tendermint.abci.types.ABCIApplication
                 * @typedef CommitCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {tendermint.abci.types.ResponseCommit} [response] ResponseCommit
                 */

                /**
                 * Calls Commit.
                 * @function commit
                 * @memberof tendermint.abci.types.ABCIApplication
                 * @instance
                 * @param {tendermint.abci.types.IRequestCommit} request RequestCommit message or plain object
                 * @param {tendermint.abci.types.ABCIApplication.CommitCallback} callback Node-style callback called with the error, if any, and ResponseCommit
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(ABCIApplication.prototype.commit = function commit(request, callback) {
                    return this.rpcCall(commit, $root.tendermint.abci.types.RequestCommit, $root.tendermint.abci.types.ResponseCommit, request, callback);
                }, "name", { value: "Commit" });

                /**
                 * Calls Commit.
                 * @function commit
                 * @memberof tendermint.abci.types.ABCIApplication
                 * @instance
                 * @param {tendermint.abci.types.IRequestCommit} request RequestCommit message or plain object
                 * @returns {Promise<tendermint.abci.types.ResponseCommit>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link tendermint.abci.types.ABCIApplication#initChain}.
                 * @memberof tendermint.abci.types.ABCIApplication
                 * @typedef InitChainCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {tendermint.abci.types.ResponseInitChain} [response] ResponseInitChain
                 */

                /**
                 * Calls InitChain.
                 * @function initChain
                 * @memberof tendermint.abci.types.ABCIApplication
                 * @instance
                 * @param {tendermint.abci.types.IRequestInitChain} request RequestInitChain message or plain object
                 * @param {tendermint.abci.types.ABCIApplication.InitChainCallback} callback Node-style callback called with the error, if any, and ResponseInitChain
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(ABCIApplication.prototype.initChain = function initChain(request, callback) {
                    return this.rpcCall(initChain, $root.tendermint.abci.types.RequestInitChain, $root.tendermint.abci.types.ResponseInitChain, request, callback);
                }, "name", { value: "InitChain" });

                /**
                 * Calls InitChain.
                 * @function initChain
                 * @memberof tendermint.abci.types.ABCIApplication
                 * @instance
                 * @param {tendermint.abci.types.IRequestInitChain} request RequestInitChain message or plain object
                 * @returns {Promise<tendermint.abci.types.ResponseInitChain>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link tendermint.abci.types.ABCIApplication#beginBlock}.
                 * @memberof tendermint.abci.types.ABCIApplication
                 * @typedef BeginBlockCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {tendermint.abci.types.ResponseBeginBlock} [response] ResponseBeginBlock
                 */

                /**
                 * Calls BeginBlock.
                 * @function beginBlock
                 * @memberof tendermint.abci.types.ABCIApplication
                 * @instance
                 * @param {tendermint.abci.types.IRequestBeginBlock} request RequestBeginBlock message or plain object
                 * @param {tendermint.abci.types.ABCIApplication.BeginBlockCallback} callback Node-style callback called with the error, if any, and ResponseBeginBlock
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(ABCIApplication.prototype.beginBlock = function beginBlock(request, callback) {
                    return this.rpcCall(beginBlock, $root.tendermint.abci.types.RequestBeginBlock, $root.tendermint.abci.types.ResponseBeginBlock, request, callback);
                }, "name", { value: "BeginBlock" });

                /**
                 * Calls BeginBlock.
                 * @function beginBlock
                 * @memberof tendermint.abci.types.ABCIApplication
                 * @instance
                 * @param {tendermint.abci.types.IRequestBeginBlock} request RequestBeginBlock message or plain object
                 * @returns {Promise<tendermint.abci.types.ResponseBeginBlock>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link tendermint.abci.types.ABCIApplication#endBlock}.
                 * @memberof tendermint.abci.types.ABCIApplication
                 * @typedef EndBlockCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {tendermint.abci.types.ResponseEndBlock} [response] ResponseEndBlock
                 */

                /**
                 * Calls EndBlock.
                 * @function endBlock
                 * @memberof tendermint.abci.types.ABCIApplication
                 * @instance
                 * @param {tendermint.abci.types.IRequestEndBlock} request RequestEndBlock message or plain object
                 * @param {tendermint.abci.types.ABCIApplication.EndBlockCallback} callback Node-style callback called with the error, if any, and ResponseEndBlock
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(ABCIApplication.prototype.endBlock = function endBlock(request, callback) {
                    return this.rpcCall(endBlock, $root.tendermint.abci.types.RequestEndBlock, $root.tendermint.abci.types.ResponseEndBlock, request, callback);
                }, "name", { value: "EndBlock" });

                /**
                 * Calls EndBlock.
                 * @function endBlock
                 * @memberof tendermint.abci.types.ABCIApplication
                 * @instance
                 * @param {tendermint.abci.types.IRequestEndBlock} request RequestEndBlock message or plain object
                 * @returns {Promise<tendermint.abci.types.ResponseEndBlock>} Promise
                 * @variation 2
                 */

                return ABCIApplication;
            })();

            return types;
        })();

        return abci;
    })();

    tendermint.crypto = (function() {

        /**
         * Namespace crypto.
         * @memberof tendermint
         * @namespace
         */
        var crypto = {};

        crypto.merkle = (function() {

            /**
             * Namespace merkle.
             * @memberof tendermint.crypto
             * @namespace
             */
            var merkle = {};

            merkle.ProofOp = (function() {

                /**
                 * Properties of a ProofOp.
                 * @memberof tendermint.crypto.merkle
                 * @interface IProofOp
                 * @property {string|null} [type] ProofOp type
                 * @property {Uint8Array|null} [key] ProofOp key
                 * @property {Uint8Array|null} [data] ProofOp data
                 */

                /**
                 * Constructs a new ProofOp.
                 * @memberof tendermint.crypto.merkle
                 * @classdesc Represents a ProofOp.
                 * @implements IProofOp
                 * @constructor
                 * @param {tendermint.crypto.merkle.IProofOp=} [p] Properties to set
                 */
                function ProofOp(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * ProofOp type.
                 * @member {string} type
                 * @memberof tendermint.crypto.merkle.ProofOp
                 * @instance
                 */
                ProofOp.prototype.type = "";

                /**
                 * ProofOp key.
                 * @member {Uint8Array} key
                 * @memberof tendermint.crypto.merkle.ProofOp
                 * @instance
                 */
                ProofOp.prototype.key = $util.newBuffer([]);

                /**
                 * ProofOp data.
                 * @member {Uint8Array} data
                 * @memberof tendermint.crypto.merkle.ProofOp
                 * @instance
                 */
                ProofOp.prototype.data = $util.newBuffer([]);

                /**
                 * Creates a new ProofOp instance using the specified properties.
                 * @function create
                 * @memberof tendermint.crypto.merkle.ProofOp
                 * @static
                 * @param {tendermint.crypto.merkle.IProofOp=} [properties] Properties to set
                 * @returns {tendermint.crypto.merkle.ProofOp} ProofOp instance
                 */
                ProofOp.create = function create(properties) {
                    return new ProofOp(properties);
                };

                /**
                 * Encodes the specified ProofOp message. Does not implicitly {@link tendermint.crypto.merkle.ProofOp.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.crypto.merkle.ProofOp
                 * @static
                 * @param {tendermint.crypto.merkle.IProofOp} m ProofOp message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ProofOp.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.type != null && Object.hasOwnProperty.call(m, "type"))
                        w.uint32(10).string(m.type);
                    if (m.key != null && Object.hasOwnProperty.call(m, "key"))
                        w.uint32(18).bytes(m.key);
                    if (m.data != null && Object.hasOwnProperty.call(m, "data"))
                        w.uint32(26).bytes(m.data);
                    return w;
                };

                /**
                 * Decodes a ProofOp message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.crypto.merkle.ProofOp
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.crypto.merkle.ProofOp} ProofOp
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ProofOp.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.crypto.merkle.ProofOp();
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

            merkle.Proof = (function() {

                /**
                 * Properties of a Proof.
                 * @memberof tendermint.crypto.merkle
                 * @interface IProof
                 * @property {Array.<tendermint.crypto.merkle.IProofOp>|null} [ops] Proof ops
                 */

                /**
                 * Constructs a new Proof.
                 * @memberof tendermint.crypto.merkle
                 * @classdesc Represents a Proof.
                 * @implements IProof
                 * @constructor
                 * @param {tendermint.crypto.merkle.IProof=} [p] Properties to set
                 */
                function Proof(p) {
                    this.ops = [];
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * Proof ops.
                 * @member {Array.<tendermint.crypto.merkle.IProofOp>} ops
                 * @memberof tendermint.crypto.merkle.Proof
                 * @instance
                 */
                Proof.prototype.ops = $util.emptyArray;

                /**
                 * Creates a new Proof instance using the specified properties.
                 * @function create
                 * @memberof tendermint.crypto.merkle.Proof
                 * @static
                 * @param {tendermint.crypto.merkle.IProof=} [properties] Properties to set
                 * @returns {tendermint.crypto.merkle.Proof} Proof instance
                 */
                Proof.create = function create(properties) {
                    return new Proof(properties);
                };

                /**
                 * Encodes the specified Proof message. Does not implicitly {@link tendermint.crypto.merkle.Proof.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.crypto.merkle.Proof
                 * @static
                 * @param {tendermint.crypto.merkle.IProof} m Proof message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Proof.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.ops != null && m.ops.length) {
                        for (var i = 0; i < m.ops.length; ++i)
                            $root.tendermint.crypto.merkle.ProofOp.encode(m.ops[i], w.uint32(10).fork()).ldelim();
                    }
                    return w;
                };

                /**
                 * Decodes a Proof message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.crypto.merkle.Proof
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.crypto.merkle.Proof} Proof
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Proof.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.crypto.merkle.Proof();
                    while (r.pos < c) {
                        var t = r.uint32();
                        switch (t >>> 3) {
                        case 1:
                            if (!(m.ops && m.ops.length))
                                m.ops = [];
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

    tendermint.libs = (function() {

        /**
         * Namespace libs.
         * @memberof tendermint
         * @namespace
         */
        var libs = {};

        libs.kv = (function() {

            /**
             * Namespace kv.
             * @memberof tendermint.libs
             * @namespace
             */
            var kv = {};

            kv.Pair = (function() {

                /**
                 * Properties of a Pair.
                 * @memberof tendermint.libs.kv
                 * @interface IPair
                 * @property {Uint8Array|null} [key] Pair key
                 * @property {Uint8Array|null} [value] Pair value
                 */

                /**
                 * Constructs a new Pair.
                 * @memberof tendermint.libs.kv
                 * @classdesc Represents a Pair.
                 * @implements IPair
                 * @constructor
                 * @param {tendermint.libs.kv.IPair=} [p] Properties to set
                 */
                function Pair(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * Pair key.
                 * @member {Uint8Array} key
                 * @memberof tendermint.libs.kv.Pair
                 * @instance
                 */
                Pair.prototype.key = $util.newBuffer([]);

                /**
                 * Pair value.
                 * @member {Uint8Array} value
                 * @memberof tendermint.libs.kv.Pair
                 * @instance
                 */
                Pair.prototype.value = $util.newBuffer([]);

                /**
                 * Creates a new Pair instance using the specified properties.
                 * @function create
                 * @memberof tendermint.libs.kv.Pair
                 * @static
                 * @param {tendermint.libs.kv.IPair=} [properties] Properties to set
                 * @returns {tendermint.libs.kv.Pair} Pair instance
                 */
                Pair.create = function create(properties) {
                    return new Pair(properties);
                };

                /**
                 * Encodes the specified Pair message. Does not implicitly {@link tendermint.libs.kv.Pair.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.libs.kv.Pair
                 * @static
                 * @param {tendermint.libs.kv.IPair} m Pair message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Pair.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.key != null && Object.hasOwnProperty.call(m, "key"))
                        w.uint32(10).bytes(m.key);
                    if (m.value != null && Object.hasOwnProperty.call(m, "value"))
                        w.uint32(18).bytes(m.value);
                    return w;
                };

                /**
                 * Decodes a Pair message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.libs.kv.Pair
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.libs.kv.Pair} Pair
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Pair.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.libs.kv.Pair();
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

            kv.KI64Pair = (function() {

                /**
                 * Properties of a KI64Pair.
                 * @memberof tendermint.libs.kv
                 * @interface IKI64Pair
                 * @property {Uint8Array|null} [key] KI64Pair key
                 * @property {number|Long|null} [value] KI64Pair value
                 */

                /**
                 * Constructs a new KI64Pair.
                 * @memberof tendermint.libs.kv
                 * @classdesc Represents a KI64Pair.
                 * @implements IKI64Pair
                 * @constructor
                 * @param {tendermint.libs.kv.IKI64Pair=} [p] Properties to set
                 */
                function KI64Pair(p) {
                    if (p)
                        for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                            if (p[ks[i]] != null)
                                this[ks[i]] = p[ks[i]];
                }

                /**
                 * KI64Pair key.
                 * @member {Uint8Array} key
                 * @memberof tendermint.libs.kv.KI64Pair
                 * @instance
                 */
                KI64Pair.prototype.key = $util.newBuffer([]);

                /**
                 * KI64Pair value.
                 * @member {number|Long} value
                 * @memberof tendermint.libs.kv.KI64Pair
                 * @instance
                 */
                KI64Pair.prototype.value = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

                /**
                 * Creates a new KI64Pair instance using the specified properties.
                 * @function create
                 * @memberof tendermint.libs.kv.KI64Pair
                 * @static
                 * @param {tendermint.libs.kv.IKI64Pair=} [properties] Properties to set
                 * @returns {tendermint.libs.kv.KI64Pair} KI64Pair instance
                 */
                KI64Pair.create = function create(properties) {
                    return new KI64Pair(properties);
                };

                /**
                 * Encodes the specified KI64Pair message. Does not implicitly {@link tendermint.libs.kv.KI64Pair.verify|verify} messages.
                 * @function encode
                 * @memberof tendermint.libs.kv.KI64Pair
                 * @static
                 * @param {tendermint.libs.kv.IKI64Pair} m KI64Pair message or plain object to encode
                 * @param {$protobuf.Writer} [w] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                KI64Pair.encode = function encode(m, w) {
                    if (!w)
                        w = $Writer.create();
                    if (m.key != null && Object.hasOwnProperty.call(m, "key"))
                        w.uint32(10).bytes(m.key);
                    if (m.value != null && Object.hasOwnProperty.call(m, "value"))
                        w.uint32(16).int64(m.value);
                    return w;
                };

                /**
                 * Decodes a KI64Pair message from the specified reader or buffer.
                 * @function decode
                 * @memberof tendermint.libs.kv.KI64Pair
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
                 * @param {number} [l] Message length if known beforehand
                 * @returns {tendermint.libs.kv.KI64Pair} KI64Pair
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                KI64Pair.decode = function decode(r, l) {
                    if (!(r instanceof $Reader))
                        r = $Reader.create(r);
                    var c = l === undefined ? r.len : r.pos + l, m = new $root.tendermint.libs.kv.KI64Pair();
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

$root.google = (function() {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    var google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        var protobuf = {};

        protobuf.Any = (function() {

            /**
             * Properties of an Any.
             * @memberof google.protobuf
             * @interface IAny
             * @property {string|null} [type_url] Any type_url
             * @property {Uint8Array|null} [value] Any value
             */

            /**
             * Constructs a new Any.
             * @memberof google.protobuf
             * @classdesc Represents an Any.
             * @implements IAny
             * @constructor
             * @param {google.protobuf.IAny=} [p] Properties to set
             */
            function Any(p) {
                if (p)
                    for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null)
                            this[ks[i]] = p[ks[i]];
            }

            /**
             * Any type_url.
             * @member {string} type_url
             * @memberof google.protobuf.Any
             * @instance
             */
            Any.prototype.type_url = "";

            /**
             * Any value.
             * @member {Uint8Array} value
             * @memberof google.protobuf.Any
             * @instance
             */
            Any.prototype.value = $util.newBuffer([]);

            /**
             * Creates a new Any instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny=} [properties] Properties to set
             * @returns {google.protobuf.Any} Any instance
             */
            Any.create = function create(properties) {
                return new Any(properties);
            };

            /**
             * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny} m Any message or plain object to encode
             * @param {$protobuf.Writer} [w] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Any.encode = function encode(m, w) {
                if (!w)
                    w = $Writer.create();
                if (m.type_url != null && Object.hasOwnProperty.call(m, "type_url"))
                    w.uint32(10).string(m.type_url);
                if (m.value != null && Object.hasOwnProperty.call(m, "value"))
                    w.uint32(18).bytes(m.value);
                return w;
            };

            /**
             * Decodes an Any message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Any
             * @static
             * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
             * @param {number} [l] Message length if known beforehand
             * @returns {google.protobuf.Any} Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Any.decode = function decode(r, l) {
                if (!(r instanceof $Reader))
                    r = $Reader.create(r);
                var c = l === undefined ? r.len : r.pos + l, m = new $root.google.protobuf.Any();
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

        protobuf.Timestamp = (function() {

            /**
             * Properties of a Timestamp.
             * @memberof google.protobuf
             * @interface ITimestamp
             * @property {number|Long|null} [seconds] Timestamp seconds
             * @property {number|null} [nanos] Timestamp nanos
             */

            /**
             * Constructs a new Timestamp.
             * @memberof google.protobuf
             * @classdesc Represents a Timestamp.
             * @implements ITimestamp
             * @constructor
             * @param {google.protobuf.ITimestamp=} [p] Properties to set
             */
            function Timestamp(p) {
                if (p)
                    for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null)
                            this[ks[i]] = p[ks[i]];
            }

            /**
             * Timestamp seconds.
             * @member {number|Long} seconds
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Timestamp nanos.
             * @member {number} nanos
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.nanos = 0;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             * @returns {google.protobuf.Timestamp} Timestamp instance
             */
            Timestamp.create = function create(properties) {
                return new Timestamp(properties);
            };

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} m Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [w] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encode = function encode(m, w) {
                if (!w)
                    w = $Writer.create();
                if (m.seconds != null && Object.hasOwnProperty.call(m, "seconds"))
                    w.uint32(8).int64(m.seconds);
                if (m.nanos != null && Object.hasOwnProperty.call(m, "nanos"))
                    w.uint32(16).int32(m.nanos);
                return w;
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
             * @param {number} [l] Message length if known beforehand
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decode = function decode(r, l) {
                if (!(r instanceof $Reader))
                    r = $Reader.create(r);
                var c = l === undefined ? r.len : r.pos + l, m = new $root.google.protobuf.Timestamp();
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

        protobuf.Duration = (function() {

            /**
             * Properties of a Duration.
             * @memberof google.protobuf
             * @interface IDuration
             * @property {number|Long|null} [seconds] Duration seconds
             * @property {number|null} [nanos] Duration nanos
             */

            /**
             * Constructs a new Duration.
             * @memberof google.protobuf
             * @classdesc Represents a Duration.
             * @implements IDuration
             * @constructor
             * @param {google.protobuf.IDuration=} [p] Properties to set
             */
            function Duration(p) {
                if (p)
                    for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                        if (p[ks[i]] != null)
                            this[ks[i]] = p[ks[i]];
            }

            /**
             * Duration seconds.
             * @member {number|Long} seconds
             * @memberof google.protobuf.Duration
             * @instance
             */
            Duration.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Duration nanos.
             * @member {number} nanos
             * @memberof google.protobuf.Duration
             * @instance
             */
            Duration.prototype.nanos = 0;

            /**
             * Creates a new Duration instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Duration
             * @static
             * @param {google.protobuf.IDuration=} [properties] Properties to set
             * @returns {google.protobuf.Duration} Duration instance
             */
            Duration.create = function create(properties) {
                return new Duration(properties);
            };

            /**
             * Encodes the specified Duration message. Does not implicitly {@link google.protobuf.Duration.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Duration
             * @static
             * @param {google.protobuf.IDuration} m Duration message or plain object to encode
             * @param {$protobuf.Writer} [w] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Duration.encode = function encode(m, w) {
                if (!w)
                    w = $Writer.create();
                if (m.seconds != null && Object.hasOwnProperty.call(m, "seconds"))
                    w.uint32(8).int64(m.seconds);
                if (m.nanos != null && Object.hasOwnProperty.call(m, "nanos"))
                    w.uint32(16).int32(m.nanos);
                return w;
            };

            /**
             * Decodes a Duration message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Duration
             * @static
             * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
             * @param {number} [l] Message length if known beforehand
             * @returns {google.protobuf.Duration} Duration
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Duration.decode = function decode(r, l) {
                if (!(r instanceof $Reader))
                    r = $Reader.create(r);
                var c = l === undefined ? r.len : r.pos + l, m = new $root.google.protobuf.Duration();
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
