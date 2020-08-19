import * as $protobuf from "protobufjs";
/** Namespace cosmos. */
export namespace cosmos {
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
    constructor(p?: cosmos.ICoin);

    /** Coin denom. */
    public denom: string;

    /** Coin amount. */
    public amount: string;

    /**
     * Creates a new Coin instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Coin instance
     */
    public static create(properties?: cosmos.ICoin): cosmos.Coin;

    /**
     * Encodes the specified Coin message. Does not implicitly {@link cosmos.Coin.verify|verify} messages.
     * @param m Coin message or plain object to encode
     * @param [w] Writer to encode to
     * @returns Writer
     */
    public static encode(m: cosmos.ICoin, w?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Coin message from the specified reader or buffer.
     * @param r Reader or buffer to decode from
     * @param [l] Message length if known beforehand
     * @returns Coin
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.Coin;
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
    constructor(p?: cosmos.IDecCoin);

    /** DecCoin denom. */
    public denom: string;

    /** DecCoin amount. */
    public amount: string;

    /**
     * Creates a new DecCoin instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DecCoin instance
     */
    public static create(properties?: cosmos.IDecCoin): cosmos.DecCoin;

    /**
     * Encodes the specified DecCoin message. Does not implicitly {@link cosmos.DecCoin.verify|verify} messages.
     * @param m DecCoin message or plain object to encode
     * @param [w] Writer to encode to
     * @returns Writer
     */
    public static encode(m: cosmos.IDecCoin, w?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a DecCoin message from the specified reader or buffer.
     * @param r Reader or buffer to decode from
     * @param [l] Message length if known beforehand
     * @returns DecCoin
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.DecCoin;
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
    constructor(p?: cosmos.IIntProto);

    /** IntProto int. */
    public int: string;

    /**
     * Creates a new IntProto instance using the specified properties.
     * @param [properties] Properties to set
     * @returns IntProto instance
     */
    public static create(properties?: cosmos.IIntProto): cosmos.IntProto;

    /**
     * Encodes the specified IntProto message. Does not implicitly {@link cosmos.IntProto.verify|verify} messages.
     * @param m IntProto message or plain object to encode
     * @param [w] Writer to encode to
     * @returns Writer
     */
    public static encode(m: cosmos.IIntProto, w?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an IntProto message from the specified reader or buffer.
     * @param r Reader or buffer to decode from
     * @param [l] Message length if known beforehand
     * @returns IntProto
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.IntProto;
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
    constructor(p?: cosmos.IDecProto);

    /** DecProto dec. */
    public dec: string;

    /**
     * Creates a new DecProto instance using the specified properties.
     * @param [properties] Properties to set
     * @returns DecProto instance
     */
    public static create(properties?: cosmos.IDecProto): cosmos.DecProto;

    /**
     * Encodes the specified DecProto message. Does not implicitly {@link cosmos.DecProto.verify|verify} messages.
     * @param m DecProto message or plain object to encode
     * @param [w] Writer to encode to
     * @returns Writer
     */
    public static encode(m: cosmos.IDecProto, w?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a DecProto message from the specified reader or buffer.
     * @param r Reader or buffer to decode from
     * @param [l] Message length if known beforehand
     * @returns DecProto
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.DecProto;
  }

  /** Properties of a ValAddresses. */
  interface IValAddresses {
    /** ValAddresses addresses */
    addresses?: Uint8Array[] | null;
  }

  /** Represents a ValAddresses. */
  class ValAddresses implements IValAddresses {
    /**
     * Constructs a new ValAddresses.
     * @param [p] Properties to set
     */
    constructor(p?: cosmos.IValAddresses);

    /** ValAddresses addresses. */
    public addresses: Uint8Array[];

    /**
     * Creates a new ValAddresses instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ValAddresses instance
     */
    public static create(properties?: cosmos.IValAddresses): cosmos.ValAddresses;

    /**
     * Encodes the specified ValAddresses message. Does not implicitly {@link cosmos.ValAddresses.verify|verify} messages.
     * @param m ValAddresses message or plain object to encode
     * @param [w] Writer to encode to
     * @returns Writer
     */
    public static encode(m: cosmos.IValAddresses, w?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ValAddresses message from the specified reader or buffer.
     * @param r Reader or buffer to decode from
     * @param [l] Message length if known beforehand
     * @returns ValAddresses
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.ValAddresses;
  }

  /** Properties of a GasInfo. */
  interface IGasInfo {
    /** GasInfo gasWanted */
    gasWanted?: Long | null;

    /** GasInfo gasUsed */
    gasUsed?: Long | null;
  }

  /** Represents a GasInfo. */
  class GasInfo implements IGasInfo {
    /**
     * Constructs a new GasInfo.
     * @param [p] Properties to set
     */
    constructor(p?: cosmos.IGasInfo);

    /** GasInfo gasWanted. */
    public gasWanted: Long;

    /** GasInfo gasUsed. */
    public gasUsed: Long;

    /**
     * Creates a new GasInfo instance using the specified properties.
     * @param [properties] Properties to set
     * @returns GasInfo instance
     */
    public static create(properties?: cosmos.IGasInfo): cosmos.GasInfo;

    /**
     * Encodes the specified GasInfo message. Does not implicitly {@link cosmos.GasInfo.verify|verify} messages.
     * @param m GasInfo message or plain object to encode
     * @param [w] Writer to encode to
     * @returns Writer
     */
    public static encode(m: cosmos.IGasInfo, w?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a GasInfo message from the specified reader or buffer.
     * @param r Reader or buffer to decode from
     * @param [l] Message length if known beforehand
     * @returns GasInfo
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.GasInfo;
  }

  /** Properties of a Result. */
  interface IResult {
    /** Result data */
    data?: Uint8Array | null;

    /** Result log */
    log?: string | null;

    /** Result events */
    events?: tendermint.abci.types.IEvent[] | null;
  }

  /** Represents a Result. */
  class Result implements IResult {
    /**
     * Constructs a new Result.
     * @param [p] Properties to set
     */
    constructor(p?: cosmos.IResult);

    /** Result data. */
    public data: Uint8Array;

    /** Result log. */
    public log: string;

    /** Result events. */
    public events: tendermint.abci.types.IEvent[];

    /**
     * Creates a new Result instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Result instance
     */
    public static create(properties?: cosmos.IResult): cosmos.Result;

    /**
     * Encodes the specified Result message. Does not implicitly {@link cosmos.Result.verify|verify} messages.
     * @param m Result message or plain object to encode
     * @param [w] Writer to encode to
     * @returns Writer
     */
    public static encode(m: cosmos.IResult, w?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a Result message from the specified reader or buffer.
     * @param r Reader or buffer to decode from
     * @param [l] Message length if known beforehand
     * @returns Result
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.Result;
  }

  /** Properties of a SimulationResponse. */
  interface ISimulationResponse {
    /** SimulationResponse gasInfo */
    gasInfo?: cosmos.IGasInfo | null;

    /** SimulationResponse result */
    result?: cosmos.IResult | null;
  }

  /** Represents a SimulationResponse. */
  class SimulationResponse implements ISimulationResponse {
    /**
     * Constructs a new SimulationResponse.
     * @param [p] Properties to set
     */
    constructor(p?: cosmos.ISimulationResponse);

    /** SimulationResponse gasInfo. */
    public gasInfo?: cosmos.IGasInfo | null;

    /** SimulationResponse result. */
    public result?: cosmos.IResult | null;

    /**
     * Creates a new SimulationResponse instance using the specified properties.
     * @param [properties] Properties to set
     * @returns SimulationResponse instance
     */
    public static create(properties?: cosmos.ISimulationResponse): cosmos.SimulationResponse;

    /**
     * Encodes the specified SimulationResponse message. Does not implicitly {@link cosmos.SimulationResponse.verify|verify} messages.
     * @param m SimulationResponse message or plain object to encode
     * @param [w] Writer to encode to
     * @returns Writer
     */
    public static encode(m: cosmos.ISimulationResponse, w?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a SimulationResponse message from the specified reader or buffer.
     * @param r Reader or buffer to decode from
     * @param [l] Message length if known beforehand
     * @returns SimulationResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.SimulationResponse;
  }

  /** Properties of a MsgData. */
  interface IMsgData {
    /** MsgData msgType */
    msgType?: string | null;

    /** MsgData data */
    data?: Uint8Array | null;
  }

  /** Represents a MsgData. */
  class MsgData implements IMsgData {
    /**
     * Constructs a new MsgData.
     * @param [p] Properties to set
     */
    constructor(p?: cosmos.IMsgData);

    /** MsgData msgType. */
    public msgType: string;

    /** MsgData data. */
    public data: Uint8Array;

    /**
     * Creates a new MsgData instance using the specified properties.
     * @param [properties] Properties to set
     * @returns MsgData instance
     */
    public static create(properties?: cosmos.IMsgData): cosmos.MsgData;

    /**
     * Encodes the specified MsgData message. Does not implicitly {@link cosmos.MsgData.verify|verify} messages.
     * @param m MsgData message or plain object to encode
     * @param [w] Writer to encode to
     * @returns Writer
     */
    public static encode(m: cosmos.IMsgData, w?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a MsgData message from the specified reader or buffer.
     * @param r Reader or buffer to decode from
     * @param [l] Message length if known beforehand
     * @returns MsgData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.MsgData;
  }

  /** Properties of a TxData. */
  interface ITxData {
    /** TxData data */
    data?: cosmos.IMsgData[] | null;
  }

  /** Represents a TxData. */
  class TxData implements ITxData {
    /**
     * Constructs a new TxData.
     * @param [p] Properties to set
     */
    constructor(p?: cosmos.ITxData);

    /** TxData data. */
    public data: cosmos.IMsgData[];

    /**
     * Creates a new TxData instance using the specified properties.
     * @param [properties] Properties to set
     * @returns TxData instance
     */
    public static create(properties?: cosmos.ITxData): cosmos.TxData;

    /**
     * Encodes the specified TxData message. Does not implicitly {@link cosmos.TxData.verify|verify} messages.
     * @param m TxData message or plain object to encode
     * @param [w] Writer to encode to
     * @returns Writer
     */
    public static encode(m: cosmos.ITxData, w?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a TxData message from the specified reader or buffer.
     * @param r Reader or buffer to decode from
     * @param [l] Message length if known beforehand
     * @returns TxData
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.TxData;
  }

  /** Properties of a TxResponse. */
  interface ITxResponse {
    /** TxResponse height */
    height?: Long | null;

    /** TxResponse txhash */
    txhash?: string | null;

    /** TxResponse codespace */
    codespace?: string | null;

    /** TxResponse code */
    code?: number | null;

    /** TxResponse data */
    data?: string | null;

    /** TxResponse rawLog */
    rawLog?: string | null;

    /** TxResponse logs */
    logs?: cosmos.IABCIMessageLog[] | null;

    /** TxResponse info */
    info?: string | null;

    /** TxResponse gasWanted */
    gasWanted?: Long | null;

    /** TxResponse gasUsed */
    gasUsed?: Long | null;

    /** TxResponse tx */
    tx?: google.protobuf.IAny | null;

    /** TxResponse timestamp */
    timestamp?: string | null;
  }

  /** Represents a TxResponse. */
  class TxResponse implements ITxResponse {
    /**
     * Constructs a new TxResponse.
     * @param [p] Properties to set
     */
    constructor(p?: cosmos.ITxResponse);

    /** TxResponse height. */
    public height: Long;

    /** TxResponse txhash. */
    public txhash: string;

    /** TxResponse codespace. */
    public codespace: string;

    /** TxResponse code. */
    public code: number;

    /** TxResponse data. */
    public data: string;

    /** TxResponse rawLog. */
    public rawLog: string;

    /** TxResponse logs. */
    public logs: cosmos.IABCIMessageLog[];

    /** TxResponse info. */
    public info: string;

    /** TxResponse gasWanted. */
    public gasWanted: Long;

    /** TxResponse gasUsed. */
    public gasUsed: Long;

    /** TxResponse tx. */
    public tx?: google.protobuf.IAny | null;

    /** TxResponse timestamp. */
    public timestamp: string;

    /**
     * Creates a new TxResponse instance using the specified properties.
     * @param [properties] Properties to set
     * @returns TxResponse instance
     */
    public static create(properties?: cosmos.ITxResponse): cosmos.TxResponse;

    /**
     * Encodes the specified TxResponse message. Does not implicitly {@link cosmos.TxResponse.verify|verify} messages.
     * @param m TxResponse message or plain object to encode
     * @param [w] Writer to encode to
     * @returns Writer
     */
    public static encode(m: cosmos.ITxResponse, w?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a TxResponse message from the specified reader or buffer.
     * @param r Reader or buffer to decode from
     * @param [l] Message length if known beforehand
     * @returns TxResponse
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.TxResponse;
  }

  /** Properties of a ABCIMessageLog. */
  interface IABCIMessageLog {
    /** ABCIMessageLog msgIndex */
    msgIndex?: number | null;

    /** ABCIMessageLog log */
    log?: string | null;

    /** ABCIMessageLog events */
    events?: cosmos.IStringEvent[] | null;
  }

  /** Represents a ABCIMessageLog. */
  class ABCIMessageLog implements IABCIMessageLog {
    /**
     * Constructs a new ABCIMessageLog.
     * @param [p] Properties to set
     */
    constructor(p?: cosmos.IABCIMessageLog);

    /** ABCIMessageLog msgIndex. */
    public msgIndex: number;

    /** ABCIMessageLog log. */
    public log: string;

    /** ABCIMessageLog events. */
    public events: cosmos.IStringEvent[];

    /**
     * Creates a new ABCIMessageLog instance using the specified properties.
     * @param [properties] Properties to set
     * @returns ABCIMessageLog instance
     */
    public static create(properties?: cosmos.IABCIMessageLog): cosmos.ABCIMessageLog;

    /**
     * Encodes the specified ABCIMessageLog message. Does not implicitly {@link cosmos.ABCIMessageLog.verify|verify} messages.
     * @param m ABCIMessageLog message or plain object to encode
     * @param [w] Writer to encode to
     * @returns Writer
     */
    public static encode(m: cosmos.IABCIMessageLog, w?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a ABCIMessageLog message from the specified reader or buffer.
     * @param r Reader or buffer to decode from
     * @param [l] Message length if known beforehand
     * @returns ABCIMessageLog
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.ABCIMessageLog;
  }

  /** Properties of a StringEvent. */
  interface IStringEvent {
    /** StringEvent type */
    type?: string | null;

    /** StringEvent attributes */
    attributes?: cosmos.IAttribute[] | null;
  }

  /** Represents a StringEvent. */
  class StringEvent implements IStringEvent {
    /**
     * Constructs a new StringEvent.
     * @param [p] Properties to set
     */
    constructor(p?: cosmos.IStringEvent);

    /** StringEvent type. */
    public type: string;

    /** StringEvent attributes. */
    public attributes: cosmos.IAttribute[];

    /**
     * Creates a new StringEvent instance using the specified properties.
     * @param [properties] Properties to set
     * @returns StringEvent instance
     */
    public static create(properties?: cosmos.IStringEvent): cosmos.StringEvent;

    /**
     * Encodes the specified StringEvent message. Does not implicitly {@link cosmos.StringEvent.verify|verify} messages.
     * @param m StringEvent message or plain object to encode
     * @param [w] Writer to encode to
     * @returns Writer
     */
    public static encode(m: cosmos.IStringEvent, w?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a StringEvent message from the specified reader or buffer.
     * @param r Reader or buffer to decode from
     * @param [l] Message length if known beforehand
     * @returns StringEvent
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.StringEvent;
  }

  /** Properties of an Attribute. */
  interface IAttribute {
    /** Attribute key */
    key?: string | null;

    /** Attribute value */
    value?: string | null;
  }

  /** Represents an Attribute. */
  class Attribute implements IAttribute {
    /**
     * Constructs a new Attribute.
     * @param [p] Properties to set
     */
    constructor(p?: cosmos.IAttribute);

    /** Attribute key. */
    public key: string;

    /** Attribute value. */
    public value: string;

    /**
     * Creates a new Attribute instance using the specified properties.
     * @param [properties] Properties to set
     * @returns Attribute instance
     */
    public static create(properties?: cosmos.IAttribute): cosmos.Attribute;

    /**
     * Encodes the specified Attribute message. Does not implicitly {@link cosmos.Attribute.verify|verify} messages.
     * @param m Attribute message or plain object to encode
     * @param [w] Writer to encode to
     * @returns Writer
     */
    public static encode(m: cosmos.IAttribute, w?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes an Attribute message from the specified reader or buffer.
     * @param r Reader or buffer to decode from
     * @param [l] Message length if known beforehand
     * @returns Attribute
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.Attribute;
  }

  /** Namespace bank. */
  namespace bank {
    /** Properties of a Params. */
    interface IParams {
      /** Params sendEnabled */
      sendEnabled?: cosmos.bank.ISendEnabled[] | null;

      /** Params defaultSendEnabled */
      defaultSendEnabled?: boolean | null;
    }

    /** Represents a Params. */
    class Params implements IParams {
      /**
       * Constructs a new Params.
       * @param [p] Properties to set
       */
      constructor(p?: cosmos.bank.IParams);

      /** Params sendEnabled. */
      public sendEnabled: cosmos.bank.ISendEnabled[];

      /** Params defaultSendEnabled. */
      public defaultSendEnabled: boolean;

      /**
       * Creates a new Params instance using the specified properties.
       * @param [properties] Properties to set
       * @returns Params instance
       */
      public static create(properties?: cosmos.bank.IParams): cosmos.bank.Params;

      /**
       * Encodes the specified Params message. Does not implicitly {@link cosmos.bank.Params.verify|verify} messages.
       * @param m Params message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: cosmos.bank.IParams, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes a Params message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns Params
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.bank.Params;
    }

    /** Properties of a SendEnabled. */
    interface ISendEnabled {
      /** SendEnabled denom */
      denom?: string | null;

      /** SendEnabled enabled */
      enabled?: boolean | null;
    }

    /** Represents a SendEnabled. */
    class SendEnabled implements ISendEnabled {
      /**
       * Constructs a new SendEnabled.
       * @param [p] Properties to set
       */
      constructor(p?: cosmos.bank.ISendEnabled);

      /** SendEnabled denom. */
      public denom: string;

      /** SendEnabled enabled. */
      public enabled: boolean;

      /**
       * Creates a new SendEnabled instance using the specified properties.
       * @param [properties] Properties to set
       * @returns SendEnabled instance
       */
      public static create(properties?: cosmos.bank.ISendEnabled): cosmos.bank.SendEnabled;

      /**
       * Encodes the specified SendEnabled message. Does not implicitly {@link cosmos.bank.SendEnabled.verify|verify} messages.
       * @param m SendEnabled message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: cosmos.bank.ISendEnabled, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes a SendEnabled message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns SendEnabled
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.bank.SendEnabled;
    }

    /** Properties of a MsgSend. */
    interface IMsgSend {
      /** MsgSend fromAddress */
      fromAddress?: Uint8Array | null;

      /** MsgSend toAddress */
      toAddress?: Uint8Array | null;

      /** MsgSend amount */
      amount?: cosmos.ICoin[] | null;
    }

    /** Represents a MsgSend. */
    class MsgSend implements IMsgSend {
      /**
       * Constructs a new MsgSend.
       * @param [p] Properties to set
       */
      constructor(p?: cosmos.bank.IMsgSend);

      /** MsgSend fromAddress. */
      public fromAddress: Uint8Array;

      /** MsgSend toAddress. */
      public toAddress: Uint8Array;

      /** MsgSend amount. */
      public amount: cosmos.ICoin[];

      /**
       * Creates a new MsgSend instance using the specified properties.
       * @param [properties] Properties to set
       * @returns MsgSend instance
       */
      public static create(properties?: cosmos.bank.IMsgSend): cosmos.bank.MsgSend;

      /**
       * Encodes the specified MsgSend message. Does not implicitly {@link cosmos.bank.MsgSend.verify|verify} messages.
       * @param m MsgSend message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: cosmos.bank.IMsgSend, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes a MsgSend message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns MsgSend
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.bank.MsgSend;
    }

    /** Properties of an Input. */
    interface IInput {
      /** Input address */
      address?: Uint8Array | null;

      /** Input coins */
      coins?: cosmos.ICoin[] | null;
    }

    /** Represents an Input. */
    class Input implements IInput {
      /**
       * Constructs a new Input.
       * @param [p] Properties to set
       */
      constructor(p?: cosmos.bank.IInput);

      /** Input address. */
      public address: Uint8Array;

      /** Input coins. */
      public coins: cosmos.ICoin[];

      /**
       * Creates a new Input instance using the specified properties.
       * @param [properties] Properties to set
       * @returns Input instance
       */
      public static create(properties?: cosmos.bank.IInput): cosmos.bank.Input;

      /**
       * Encodes the specified Input message. Does not implicitly {@link cosmos.bank.Input.verify|verify} messages.
       * @param m Input message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: cosmos.bank.IInput, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes an Input message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns Input
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.bank.Input;
    }

    /** Properties of an Output. */
    interface IOutput {
      /** Output address */
      address?: Uint8Array | null;

      /** Output coins */
      coins?: cosmos.ICoin[] | null;
    }

    /** Represents an Output. */
    class Output implements IOutput {
      /**
       * Constructs a new Output.
       * @param [p] Properties to set
       */
      constructor(p?: cosmos.bank.IOutput);

      /** Output address. */
      public address: Uint8Array;

      /** Output coins. */
      public coins: cosmos.ICoin[];

      /**
       * Creates a new Output instance using the specified properties.
       * @param [properties] Properties to set
       * @returns Output instance
       */
      public static create(properties?: cosmos.bank.IOutput): cosmos.bank.Output;

      /**
       * Encodes the specified Output message. Does not implicitly {@link cosmos.bank.Output.verify|verify} messages.
       * @param m Output message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: cosmos.bank.IOutput, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes an Output message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns Output
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.bank.Output;
    }

    /** Properties of a MsgMultiSend. */
    interface IMsgMultiSend {
      /** MsgMultiSend inputs */
      inputs?: cosmos.bank.IInput[] | null;

      /** MsgMultiSend outputs */
      outputs?: cosmos.bank.IOutput[] | null;
    }

    /** Represents a MsgMultiSend. */
    class MsgMultiSend implements IMsgMultiSend {
      /**
       * Constructs a new MsgMultiSend.
       * @param [p] Properties to set
       */
      constructor(p?: cosmos.bank.IMsgMultiSend);

      /** MsgMultiSend inputs. */
      public inputs: cosmos.bank.IInput[];

      /** MsgMultiSend outputs. */
      public outputs: cosmos.bank.IOutput[];

      /**
       * Creates a new MsgMultiSend instance using the specified properties.
       * @param [properties] Properties to set
       * @returns MsgMultiSend instance
       */
      public static create(properties?: cosmos.bank.IMsgMultiSend): cosmos.bank.MsgMultiSend;

      /**
       * Encodes the specified MsgMultiSend message. Does not implicitly {@link cosmos.bank.MsgMultiSend.verify|verify} messages.
       * @param m MsgMultiSend message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: cosmos.bank.IMsgMultiSend, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes a MsgMultiSend message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns MsgMultiSend
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.bank.MsgMultiSend;
    }

    /** Properties of a Supply. */
    interface ISupply {
      /** Supply total */
      total?: cosmos.ICoin[] | null;
    }

    /** Represents a Supply. */
    class Supply implements ISupply {
      /**
       * Constructs a new Supply.
       * @param [p] Properties to set
       */
      constructor(p?: cosmos.bank.ISupply);

      /** Supply total. */
      public total: cosmos.ICoin[];

      /**
       * Creates a new Supply instance using the specified properties.
       * @param [properties] Properties to set
       * @returns Supply instance
       */
      public static create(properties?: cosmos.bank.ISupply): cosmos.bank.Supply;

      /**
       * Encodes the specified Supply message. Does not implicitly {@link cosmos.bank.Supply.verify|verify} messages.
       * @param m Supply message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: cosmos.bank.ISupply, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes a Supply message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns Supply
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.bank.Supply;
    }

    /** Properties of a DenomUnits. */
    interface IDenomUnits {
      /** DenomUnits denom */
      denom?: string | null;

      /** DenomUnits exponent */
      exponent?: number | null;

      /** DenomUnits aliases */
      aliases?: string[] | null;
    }

    /** Represents a DenomUnits. */
    class DenomUnits implements IDenomUnits {
      /**
       * Constructs a new DenomUnits.
       * @param [p] Properties to set
       */
      constructor(p?: cosmos.bank.IDenomUnits);

      /** DenomUnits denom. */
      public denom: string;

      /** DenomUnits exponent. */
      public exponent: number;

      /** DenomUnits aliases. */
      public aliases: string[];

      /**
       * Creates a new DenomUnits instance using the specified properties.
       * @param [properties] Properties to set
       * @returns DenomUnits instance
       */
      public static create(properties?: cosmos.bank.IDenomUnits): cosmos.bank.DenomUnits;

      /**
       * Encodes the specified DenomUnits message. Does not implicitly {@link cosmos.bank.DenomUnits.verify|verify} messages.
       * @param m DenomUnits message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: cosmos.bank.IDenomUnits, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes a DenomUnits message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns DenomUnits
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.bank.DenomUnits;
    }

    /** Properties of a Metadata. */
    interface IMetadata {
      /** Metadata description */
      description?: string | null;

      /** Metadata denomUnits */
      denomUnits?: cosmos.bank.IDenomUnits[] | null;

      /** Metadata base */
      base?: string | null;

      /** Metadata display */
      display?: string | null;
    }

    /** Represents a Metadata. */
    class Metadata implements IMetadata {
      /**
       * Constructs a new Metadata.
       * @param [p] Properties to set
       */
      constructor(p?: cosmos.bank.IMetadata);

      /** Metadata description. */
      public description: string;

      /** Metadata denomUnits. */
      public denomUnits: cosmos.bank.IDenomUnits[];

      /** Metadata base. */
      public base: string;

      /** Metadata display. */
      public display: string;

      /**
       * Creates a new Metadata instance using the specified properties.
       * @param [properties] Properties to set
       * @returns Metadata instance
       */
      public static create(properties?: cosmos.bank.IMetadata): cosmos.bank.Metadata;

      /**
       * Encodes the specified Metadata message. Does not implicitly {@link cosmos.bank.Metadata.verify|verify} messages.
       * @param m Metadata message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: cosmos.bank.IMetadata, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes a Metadata message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns Metadata
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.bank.Metadata;
    }
  }

  /** Namespace crypto. */
  namespace crypto {
    /** Properties of a PublicKey. */
    interface IPublicKey {
      /** PublicKey secp256k1 */
      secp256k1?: Uint8Array | null;

      /** PublicKey ed25519 */
      ed25519?: Uint8Array | null;

      /** PublicKey sr25519 */
      sr25519?: Uint8Array | null;

      /** PublicKey multisig */
      multisig?: cosmos.crypto.IPubKeyMultisigThreshold | null;

      /** PublicKey secp256r1 */
      secp256r1?: Uint8Array | null;

      /** PublicKey anyPubkey */
      anyPubkey?: google.protobuf.IAny | null;
    }

    /** Represents a PublicKey. */
    class PublicKey implements IPublicKey {
      /**
       * Constructs a new PublicKey.
       * @param [p] Properties to set
       */
      constructor(p?: cosmos.crypto.IPublicKey);

      /** PublicKey secp256k1. */
      public secp256k1: Uint8Array;

      /** PublicKey ed25519. */
      public ed25519: Uint8Array;

      /** PublicKey sr25519. */
      public sr25519: Uint8Array;

      /** PublicKey multisig. */
      public multisig?: cosmos.crypto.IPubKeyMultisigThreshold | null;

      /** PublicKey secp256r1. */
      public secp256r1: Uint8Array;

      /** PublicKey anyPubkey. */
      public anyPubkey?: google.protobuf.IAny | null;

      /** PublicKey sum. */
      public sum?: "secp256k1" | "ed25519" | "sr25519" | "multisig" | "secp256r1" | "anyPubkey";

      /**
       * Creates a new PublicKey instance using the specified properties.
       * @param [properties] Properties to set
       * @returns PublicKey instance
       */
      public static create(properties?: cosmos.crypto.IPublicKey): cosmos.crypto.PublicKey;

      /**
       * Encodes the specified PublicKey message. Does not implicitly {@link cosmos.crypto.PublicKey.verify|verify} messages.
       * @param m PublicKey message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: cosmos.crypto.IPublicKey, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes a PublicKey message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns PublicKey
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.crypto.PublicKey;
    }

    /** Properties of a PubKeyMultisigThreshold. */
    interface IPubKeyMultisigThreshold {
      /** PubKeyMultisigThreshold threshold */
      threshold?: number | null;

      /** PubKeyMultisigThreshold publicKeys */
      publicKeys?: cosmos.crypto.IPublicKey[] | null;
    }

    /** Represents a PubKeyMultisigThreshold. */
    class PubKeyMultisigThreshold implements IPubKeyMultisigThreshold {
      /**
       * Constructs a new PubKeyMultisigThreshold.
       * @param [p] Properties to set
       */
      constructor(p?: cosmos.crypto.IPubKeyMultisigThreshold);

      /** PubKeyMultisigThreshold threshold. */
      public threshold: number;

      /** PubKeyMultisigThreshold publicKeys. */
      public publicKeys: cosmos.crypto.IPublicKey[];

      /**
       * Creates a new PubKeyMultisigThreshold instance using the specified properties.
       * @param [properties] Properties to set
       * @returns PubKeyMultisigThreshold instance
       */
      public static create(
        properties?: cosmos.crypto.IPubKeyMultisigThreshold,
      ): cosmos.crypto.PubKeyMultisigThreshold;

      /**
       * Encodes the specified PubKeyMultisigThreshold message. Does not implicitly {@link cosmos.crypto.PubKeyMultisigThreshold.verify|verify} messages.
       * @param m PubKeyMultisigThreshold message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: cosmos.crypto.IPubKeyMultisigThreshold, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes a PubKeyMultisigThreshold message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns PubKeyMultisigThreshold
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(
        r: $protobuf.Reader | Uint8Array,
        l?: number,
      ): cosmos.crypto.PubKeyMultisigThreshold;
    }

    /** Properties of a MultiSignature. */
    interface IMultiSignature {
      /** MultiSignature signatures */
      signatures?: Uint8Array[] | null;
    }

    /** Represents a MultiSignature. */
    class MultiSignature implements IMultiSignature {
      /**
       * Constructs a new MultiSignature.
       * @param [p] Properties to set
       */
      constructor(p?: cosmos.crypto.IMultiSignature);

      /** MultiSignature signatures. */
      public signatures: Uint8Array[];

      /**
       * Creates a new MultiSignature instance using the specified properties.
       * @param [properties] Properties to set
       * @returns MultiSignature instance
       */
      public static create(properties?: cosmos.crypto.IMultiSignature): cosmos.crypto.MultiSignature;

      /**
       * Encodes the specified MultiSignature message. Does not implicitly {@link cosmos.crypto.MultiSignature.verify|verify} messages.
       * @param m MultiSignature message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: cosmos.crypto.IMultiSignature, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes a MultiSignature message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns MultiSignature
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.crypto.MultiSignature;
    }

    /** Properties of a CompactBitArray. */
    interface ICompactBitArray {
      /** CompactBitArray extraBitsStored */
      extraBitsStored?: number | null;

      /** CompactBitArray elems */
      elems?: Uint8Array | null;
    }

    /** Represents a CompactBitArray. */
    class CompactBitArray implements ICompactBitArray {
      /**
       * Constructs a new CompactBitArray.
       * @param [p] Properties to set
       */
      constructor(p?: cosmos.crypto.ICompactBitArray);

      /** CompactBitArray extraBitsStored. */
      public extraBitsStored: number;

      /** CompactBitArray elems. */
      public elems: Uint8Array;

      /**
       * Creates a new CompactBitArray instance using the specified properties.
       * @param [properties] Properties to set
       * @returns CompactBitArray instance
       */
      public static create(properties?: cosmos.crypto.ICompactBitArray): cosmos.crypto.CompactBitArray;

      /**
       * Encodes the specified CompactBitArray message. Does not implicitly {@link cosmos.crypto.CompactBitArray.verify|verify} messages.
       * @param m CompactBitArray message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: cosmos.crypto.ICompactBitArray, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes a CompactBitArray message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns CompactBitArray
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.crypto.CompactBitArray;
    }
  }

  /** Namespace tx. */
  namespace tx {
    /** Properties of a Tx. */
    interface ITx {
      /** Tx body */
      body?: cosmos.tx.ITxBody | null;

      /** Tx authInfo */
      authInfo?: cosmos.tx.IAuthInfo | null;

      /** Tx signatures */
      signatures?: Uint8Array[] | null;
    }

    /** Represents a Tx. */
    class Tx implements ITx {
      /**
       * Constructs a new Tx.
       * @param [p] Properties to set
       */
      constructor(p?: cosmos.tx.ITx);

      /** Tx body. */
      public body?: cosmos.tx.ITxBody | null;

      /** Tx authInfo. */
      public authInfo?: cosmos.tx.IAuthInfo | null;

      /** Tx signatures. */
      public signatures: Uint8Array[];

      /**
       * Creates a new Tx instance using the specified properties.
       * @param [properties] Properties to set
       * @returns Tx instance
       */
      public static create(properties?: cosmos.tx.ITx): cosmos.tx.Tx;

      /**
       * Encodes the specified Tx message. Does not implicitly {@link cosmos.tx.Tx.verify|verify} messages.
       * @param m Tx message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: cosmos.tx.ITx, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes a Tx message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns Tx
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.tx.Tx;
    }

    /** Properties of a TxRaw. */
    interface ITxRaw {
      /** TxRaw bodyBytes */
      bodyBytes?: Uint8Array | null;

      /** TxRaw authInfoBytes */
      authInfoBytes?: Uint8Array | null;

      /** TxRaw signatures */
      signatures?: Uint8Array[] | null;
    }

    /** Represents a TxRaw. */
    class TxRaw implements ITxRaw {
      /**
       * Constructs a new TxRaw.
       * @param [p] Properties to set
       */
      constructor(p?: cosmos.tx.ITxRaw);

      /** TxRaw bodyBytes. */
      public bodyBytes: Uint8Array;

      /** TxRaw authInfoBytes. */
      public authInfoBytes: Uint8Array;

      /** TxRaw signatures. */
      public signatures: Uint8Array[];

      /**
       * Creates a new TxRaw instance using the specified properties.
       * @param [properties] Properties to set
       * @returns TxRaw instance
       */
      public static create(properties?: cosmos.tx.ITxRaw): cosmos.tx.TxRaw;

      /**
       * Encodes the specified TxRaw message. Does not implicitly {@link cosmos.tx.TxRaw.verify|verify} messages.
       * @param m TxRaw message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: cosmos.tx.ITxRaw, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes a TxRaw message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns TxRaw
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.tx.TxRaw;
    }

    /** Properties of a SignDoc. */
    interface ISignDoc {
      /** SignDoc bodyBytes */
      bodyBytes?: Uint8Array | null;

      /** SignDoc authInfoBytes */
      authInfoBytes?: Uint8Array | null;

      /** SignDoc chainId */
      chainId?: string | null;

      /** SignDoc accountNumber */
      accountNumber?: Long | null;

      /** SignDoc accountSequence */
      accountSequence?: Long | null;
    }

    /** Represents a SignDoc. */
    class SignDoc implements ISignDoc {
      /**
       * Constructs a new SignDoc.
       * @param [p] Properties to set
       */
      constructor(p?: cosmos.tx.ISignDoc);

      /** SignDoc bodyBytes. */
      public bodyBytes: Uint8Array;

      /** SignDoc authInfoBytes. */
      public authInfoBytes: Uint8Array;

      /** SignDoc chainId. */
      public chainId: string;

      /** SignDoc accountNumber. */
      public accountNumber: Long;

      /** SignDoc accountSequence. */
      public accountSequence: Long;

      /**
       * Creates a new SignDoc instance using the specified properties.
       * @param [properties] Properties to set
       * @returns SignDoc instance
       */
      public static create(properties?: cosmos.tx.ISignDoc): cosmos.tx.SignDoc;

      /**
       * Encodes the specified SignDoc message. Does not implicitly {@link cosmos.tx.SignDoc.verify|verify} messages.
       * @param m SignDoc message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: cosmos.tx.ISignDoc, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes a SignDoc message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns SignDoc
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.tx.SignDoc;
    }

    /** Properties of a TxBody. */
    interface ITxBody {
      /** TxBody messages */
      messages?: google.protobuf.IAny[] | null;

      /** TxBody memo */
      memo?: string | null;

      /** TxBody timeoutHeight */
      timeoutHeight?: Long | null;

      /** TxBody extensionOptions */
      extensionOptions?: google.protobuf.IAny[] | null;

      /** TxBody nonCriticalExtensionOptions */
      nonCriticalExtensionOptions?: google.protobuf.IAny[] | null;
    }

    /** Represents a TxBody. */
    class TxBody implements ITxBody {
      /**
       * Constructs a new TxBody.
       * @param [p] Properties to set
       */
      constructor(p?: cosmos.tx.ITxBody);

      /** TxBody messages. */
      public messages: google.protobuf.IAny[];

      /** TxBody memo. */
      public memo: string;

      /** TxBody timeoutHeight. */
      public timeoutHeight: Long;

      /** TxBody extensionOptions. */
      public extensionOptions: google.protobuf.IAny[];

      /** TxBody nonCriticalExtensionOptions. */
      public nonCriticalExtensionOptions: google.protobuf.IAny[];

      /**
       * Creates a new TxBody instance using the specified properties.
       * @param [properties] Properties to set
       * @returns TxBody instance
       */
      public static create(properties?: cosmos.tx.ITxBody): cosmos.tx.TxBody;

      /**
       * Encodes the specified TxBody message. Does not implicitly {@link cosmos.tx.TxBody.verify|verify} messages.
       * @param m TxBody message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: cosmos.tx.ITxBody, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes a TxBody message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns TxBody
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.tx.TxBody;
    }

    /** Properties of an AuthInfo. */
    interface IAuthInfo {
      /** AuthInfo signerInfos */
      signerInfos?: cosmos.tx.ISignerInfo[] | null;

      /** AuthInfo fee */
      fee?: cosmos.tx.IFee | null;
    }

    /** Represents an AuthInfo. */
    class AuthInfo implements IAuthInfo {
      /**
       * Constructs a new AuthInfo.
       * @param [p] Properties to set
       */
      constructor(p?: cosmos.tx.IAuthInfo);

      /** AuthInfo signerInfos. */
      public signerInfos: cosmos.tx.ISignerInfo[];

      /** AuthInfo fee. */
      public fee?: cosmos.tx.IFee | null;

      /**
       * Creates a new AuthInfo instance using the specified properties.
       * @param [properties] Properties to set
       * @returns AuthInfo instance
       */
      public static create(properties?: cosmos.tx.IAuthInfo): cosmos.tx.AuthInfo;

      /**
       * Encodes the specified AuthInfo message. Does not implicitly {@link cosmos.tx.AuthInfo.verify|verify} messages.
       * @param m AuthInfo message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: cosmos.tx.IAuthInfo, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes an AuthInfo message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns AuthInfo
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.tx.AuthInfo;
    }

    /** Properties of a SignerInfo. */
    interface ISignerInfo {
      /** SignerInfo publicKey */
      publicKey?: cosmos.crypto.IPublicKey | null;

      /** SignerInfo modeInfo */
      modeInfo?: cosmos.tx.IModeInfo | null;
    }

    /** Represents a SignerInfo. */
    class SignerInfo implements ISignerInfo {
      /**
       * Constructs a new SignerInfo.
       * @param [p] Properties to set
       */
      constructor(p?: cosmos.tx.ISignerInfo);

      /** SignerInfo publicKey. */
      public publicKey?: cosmos.crypto.IPublicKey | null;

      /** SignerInfo modeInfo. */
      public modeInfo?: cosmos.tx.IModeInfo | null;

      /**
       * Creates a new SignerInfo instance using the specified properties.
       * @param [properties] Properties to set
       * @returns SignerInfo instance
       */
      public static create(properties?: cosmos.tx.ISignerInfo): cosmos.tx.SignerInfo;

      /**
       * Encodes the specified SignerInfo message. Does not implicitly {@link cosmos.tx.SignerInfo.verify|verify} messages.
       * @param m SignerInfo message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: cosmos.tx.ISignerInfo, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes a SignerInfo message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns SignerInfo
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.tx.SignerInfo;
    }

    /** Properties of a ModeInfo. */
    interface IModeInfo {
      /** ModeInfo single */
      single?: cosmos.tx.ModeInfo.ISingle | null;

      /** ModeInfo multi */
      multi?: cosmos.tx.ModeInfo.IMulti | null;
    }

    /** Represents a ModeInfo. */
    class ModeInfo implements IModeInfo {
      /**
       * Constructs a new ModeInfo.
       * @param [p] Properties to set
       */
      constructor(p?: cosmos.tx.IModeInfo);

      /** ModeInfo single. */
      public single?: cosmos.tx.ModeInfo.ISingle | null;

      /** ModeInfo multi. */
      public multi?: cosmos.tx.ModeInfo.IMulti | null;

      /** ModeInfo sum. */
      public sum?: "single" | "multi";

      /**
       * Creates a new ModeInfo instance using the specified properties.
       * @param [properties] Properties to set
       * @returns ModeInfo instance
       */
      public static create(properties?: cosmos.tx.IModeInfo): cosmos.tx.ModeInfo;

      /**
       * Encodes the specified ModeInfo message. Does not implicitly {@link cosmos.tx.ModeInfo.verify|verify} messages.
       * @param m ModeInfo message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: cosmos.tx.IModeInfo, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes a ModeInfo message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns ModeInfo
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.tx.ModeInfo;
    }

    namespace ModeInfo {
      /** Properties of a Single. */
      interface ISingle {
        /** Single mode */
        mode?: cosmos.tx.signing.SignMode | null;
      }

      /** Represents a Single. */
      class Single implements ISingle {
        /**
         * Constructs a new Single.
         * @param [p] Properties to set
         */
        constructor(p?: cosmos.tx.ModeInfo.ISingle);

        /** Single mode. */
        public mode: cosmos.tx.signing.SignMode;

        /**
         * Creates a new Single instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Single instance
         */
        public static create(properties?: cosmos.tx.ModeInfo.ISingle): cosmos.tx.ModeInfo.Single;

        /**
         * Encodes the specified Single message. Does not implicitly {@link cosmos.tx.ModeInfo.Single.verify|verify} messages.
         * @param m Single message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: cosmos.tx.ModeInfo.ISingle, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Single message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns Single
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.tx.ModeInfo.Single;
      }

      /** Properties of a Multi. */
      interface IMulti {
        /** Multi bitarray */
        bitarray?: cosmos.crypto.ICompactBitArray | null;

        /** Multi modeInfos */
        modeInfos?: cosmos.tx.IModeInfo[] | null;
      }

      /** Represents a Multi. */
      class Multi implements IMulti {
        /**
         * Constructs a new Multi.
         * @param [p] Properties to set
         */
        constructor(p?: cosmos.tx.ModeInfo.IMulti);

        /** Multi bitarray. */
        public bitarray?: cosmos.crypto.ICompactBitArray | null;

        /** Multi modeInfos. */
        public modeInfos: cosmos.tx.IModeInfo[];

        /**
         * Creates a new Multi instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Multi instance
         */
        public static create(properties?: cosmos.tx.ModeInfo.IMulti): cosmos.tx.ModeInfo.Multi;

        /**
         * Encodes the specified Multi message. Does not implicitly {@link cosmos.tx.ModeInfo.Multi.verify|verify} messages.
         * @param m Multi message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: cosmos.tx.ModeInfo.IMulti, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Multi message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns Multi
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.tx.ModeInfo.Multi;
      }
    }

    /** Properties of a Fee. */
    interface IFee {
      /** Fee amount */
      amount?: cosmos.ICoin[] | null;

      /** Fee gasLimit */
      gasLimit?: Long | null;
    }

    /** Represents a Fee. */
    class Fee implements IFee {
      /**
       * Constructs a new Fee.
       * @param [p] Properties to set
       */
      constructor(p?: cosmos.tx.IFee);

      /** Fee amount. */
      public amount: cosmos.ICoin[];

      /** Fee gasLimit. */
      public gasLimit: Long;

      /**
       * Creates a new Fee instance using the specified properties.
       * @param [properties] Properties to set
       * @returns Fee instance
       */
      public static create(properties?: cosmos.tx.IFee): cosmos.tx.Fee;

      /**
       * Encodes the specified Fee message. Does not implicitly {@link cosmos.tx.Fee.verify|verify} messages.
       * @param m Fee message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: cosmos.tx.IFee, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes a Fee message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns Fee
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): cosmos.tx.Fee;
    }

    /** Namespace signing. */
    namespace signing {
      /** SignMode enum. */
      enum SignMode {
        SIGN_MODE_UNSPECIFIED = 0,
        SIGN_MODE_DIRECT = 1,
        SIGN_MODE_TEXTUAL = 2,
        SIGN_MODE_LEGACY_AMINO_JSON = 127,
      }

      /** Properties of a SignatureDescriptors. */
      interface ISignatureDescriptors {
        /** SignatureDescriptors signatures */
        signatures?: cosmos.tx.signing.ISignatureDescriptor[] | null;
      }

      /** Represents a SignatureDescriptors. */
      class SignatureDescriptors implements ISignatureDescriptors {
        /**
         * Constructs a new SignatureDescriptors.
         * @param [p] Properties to set
         */
        constructor(p?: cosmos.tx.signing.ISignatureDescriptors);

        /** SignatureDescriptors signatures. */
        public signatures: cosmos.tx.signing.ISignatureDescriptor[];

        /**
         * Creates a new SignatureDescriptors instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SignatureDescriptors instance
         */
        public static create(
          properties?: cosmos.tx.signing.ISignatureDescriptors,
        ): cosmos.tx.signing.SignatureDescriptors;

        /**
         * Encodes the specified SignatureDescriptors message. Does not implicitly {@link cosmos.tx.signing.SignatureDescriptors.verify|verify} messages.
         * @param m SignatureDescriptors message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: cosmos.tx.signing.ISignatureDescriptors,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a SignatureDescriptors message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns SignatureDescriptors
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): cosmos.tx.signing.SignatureDescriptors;
      }

      /** Properties of a SignatureDescriptor. */
      interface ISignatureDescriptor {
        /** SignatureDescriptor publicKey */
        publicKey?: cosmos.crypto.IPublicKey | null;

        /** SignatureDescriptor data */
        data?: cosmos.tx.signing.SignatureDescriptor.IData | null;
      }

      /** Represents a SignatureDescriptor. */
      class SignatureDescriptor implements ISignatureDescriptor {
        /**
         * Constructs a new SignatureDescriptor.
         * @param [p] Properties to set
         */
        constructor(p?: cosmos.tx.signing.ISignatureDescriptor);

        /** SignatureDescriptor publicKey. */
        public publicKey?: cosmos.crypto.IPublicKey | null;

        /** SignatureDescriptor data. */
        public data?: cosmos.tx.signing.SignatureDescriptor.IData | null;

        /**
         * Creates a new SignatureDescriptor instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SignatureDescriptor instance
         */
        public static create(
          properties?: cosmos.tx.signing.ISignatureDescriptor,
        ): cosmos.tx.signing.SignatureDescriptor;

        /**
         * Encodes the specified SignatureDescriptor message. Does not implicitly {@link cosmos.tx.signing.SignatureDescriptor.verify|verify} messages.
         * @param m SignatureDescriptor message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: cosmos.tx.signing.ISignatureDescriptor,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a SignatureDescriptor message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns SignatureDescriptor
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): cosmos.tx.signing.SignatureDescriptor;
      }

      namespace SignatureDescriptor {
        /** Properties of a Data. */
        interface IData {
          /** Data single */
          single?: cosmos.tx.signing.SignatureDescriptor.Data.ISingle | null;

          /** Data multi */
          multi?: cosmos.tx.signing.SignatureDescriptor.Data.IMulti | null;
        }

        /** Represents a Data. */
        class Data implements IData {
          /**
           * Constructs a new Data.
           * @param [p] Properties to set
           */
          constructor(p?: cosmos.tx.signing.SignatureDescriptor.IData);

          /** Data single. */
          public single?: cosmos.tx.signing.SignatureDescriptor.Data.ISingle | null;

          /** Data multi. */
          public multi?: cosmos.tx.signing.SignatureDescriptor.Data.IMulti | null;

          /** Data sum. */
          public sum?: "single" | "multi";

          /**
           * Creates a new Data instance using the specified properties.
           * @param [properties] Properties to set
           * @returns Data instance
           */
          public static create(
            properties?: cosmos.tx.signing.SignatureDescriptor.IData,
          ): cosmos.tx.signing.SignatureDescriptor.Data;

          /**
           * Encodes the specified Data message. Does not implicitly {@link cosmos.tx.signing.SignatureDescriptor.Data.verify|verify} messages.
           * @param m Data message or plain object to encode
           * @param [w] Writer to encode to
           * @returns Writer
           */
          public static encode(
            m: cosmos.tx.signing.SignatureDescriptor.IData,
            w?: $protobuf.Writer,
          ): $protobuf.Writer;

          /**
           * Decodes a Data message from the specified reader or buffer.
           * @param r Reader or buffer to decode from
           * @param [l] Message length if known beforehand
           * @returns Data
           * @throws {Error} If the payload is not a reader or valid buffer
           * @throws {$protobuf.util.ProtocolError} If required fields are missing
           */
          public static decode(
            r: $protobuf.Reader | Uint8Array,
            l?: number,
          ): cosmos.tx.signing.SignatureDescriptor.Data;
        }

        namespace Data {
          /** Properties of a Single. */
          interface ISingle {
            /** Single mode */
            mode?: cosmos.tx.signing.SignMode | null;

            /** Single signature */
            signature?: Uint8Array | null;
          }

          /** Represents a Single. */
          class Single implements ISingle {
            /**
             * Constructs a new Single.
             * @param [p] Properties to set
             */
            constructor(p?: cosmos.tx.signing.SignatureDescriptor.Data.ISingle);

            /** Single mode. */
            public mode: cosmos.tx.signing.SignMode;

            /** Single signature. */
            public signature: Uint8Array;

            /**
             * Creates a new Single instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Single instance
             */
            public static create(
              properties?: cosmos.tx.signing.SignatureDescriptor.Data.ISingle,
            ): cosmos.tx.signing.SignatureDescriptor.Data.Single;

            /**
             * Encodes the specified Single message. Does not implicitly {@link cosmos.tx.signing.SignatureDescriptor.Data.Single.verify|verify} messages.
             * @param m Single message or plain object to encode
             * @param [w] Writer to encode to
             * @returns Writer
             */
            public static encode(
              m: cosmos.tx.signing.SignatureDescriptor.Data.ISingle,
              w?: $protobuf.Writer,
            ): $protobuf.Writer;

            /**
             * Decodes a Single message from the specified reader or buffer.
             * @param r Reader or buffer to decode from
             * @param [l] Message length if known beforehand
             * @returns Single
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(
              r: $protobuf.Reader | Uint8Array,
              l?: number,
            ): cosmos.tx.signing.SignatureDescriptor.Data.Single;
          }

          /** Properties of a Multi. */
          interface IMulti {
            /** Multi bitarray */
            bitarray?: cosmos.crypto.ICompactBitArray | null;

            /** Multi signatures */
            signatures?: cosmos.tx.signing.SignatureDescriptor.IData[] | null;
          }

          /** Represents a Multi. */
          class Multi implements IMulti {
            /**
             * Constructs a new Multi.
             * @param [p] Properties to set
             */
            constructor(p?: cosmos.tx.signing.SignatureDescriptor.Data.IMulti);

            /** Multi bitarray. */
            public bitarray?: cosmos.crypto.ICompactBitArray | null;

            /** Multi signatures. */
            public signatures: cosmos.tx.signing.SignatureDescriptor.IData[];

            /**
             * Creates a new Multi instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Multi instance
             */
            public static create(
              properties?: cosmos.tx.signing.SignatureDescriptor.Data.IMulti,
            ): cosmos.tx.signing.SignatureDescriptor.Data.Multi;

            /**
             * Encodes the specified Multi message. Does not implicitly {@link cosmos.tx.signing.SignatureDescriptor.Data.Multi.verify|verify} messages.
             * @param m Multi message or plain object to encode
             * @param [w] Writer to encode to
             * @returns Writer
             */
            public static encode(
              m: cosmos.tx.signing.SignatureDescriptor.Data.IMulti,
              w?: $protobuf.Writer,
            ): $protobuf.Writer;

            /**
             * Decodes a Multi message from the specified reader or buffer.
             * @param r Reader or buffer to decode from
             * @param [l] Message length if known beforehand
             * @returns Multi
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(
              r: $protobuf.Reader | Uint8Array,
              l?: number,
            ): cosmos.tx.signing.SignatureDescriptor.Data.Multi;
          }
        }
      }
    }
  }
}

/** Namespace tendermint. */
export namespace tendermint {
  /** Namespace abci. */
  namespace abci {
    /** Namespace types. */
    namespace types {
      /** Properties of a Request. */
      interface IRequest {
        /** Request echo */
        echo?: tendermint.abci.types.IRequestEcho | null;

        /** Request flush */
        flush?: tendermint.abci.types.IRequestFlush | null;

        /** Request info */
        info?: tendermint.abci.types.IRequestInfo | null;

        /** Request setOption */
        setOption?: tendermint.abci.types.IRequestSetOption | null;

        /** Request initChain */
        initChain?: tendermint.abci.types.IRequestInitChain | null;

        /** Request query */
        query?: tendermint.abci.types.IRequestQuery | null;

        /** Request beginBlock */
        beginBlock?: tendermint.abci.types.IRequestBeginBlock | null;

        /** Request checkTx */
        checkTx?: tendermint.abci.types.IRequestCheckTx | null;

        /** Request deliverTx */
        deliverTx?: tendermint.abci.types.IRequestDeliverTx | null;

        /** Request endBlock */
        endBlock?: tendermint.abci.types.IRequestEndBlock | null;

        /** Request commit */
        commit?: tendermint.abci.types.IRequestCommit | null;
      }

      /** Represents a Request. */
      class Request implements IRequest {
        /**
         * Constructs a new Request.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IRequest);

        /** Request echo. */
        public echo?: tendermint.abci.types.IRequestEcho | null;

        /** Request flush. */
        public flush?: tendermint.abci.types.IRequestFlush | null;

        /** Request info. */
        public info?: tendermint.abci.types.IRequestInfo | null;

        /** Request setOption. */
        public setOption?: tendermint.abci.types.IRequestSetOption | null;

        /** Request initChain. */
        public initChain?: tendermint.abci.types.IRequestInitChain | null;

        /** Request query. */
        public query?: tendermint.abci.types.IRequestQuery | null;

        /** Request beginBlock. */
        public beginBlock?: tendermint.abci.types.IRequestBeginBlock | null;

        /** Request checkTx. */
        public checkTx?: tendermint.abci.types.IRequestCheckTx | null;

        /** Request deliverTx. */
        public deliverTx?: tendermint.abci.types.IRequestDeliverTx | null;

        /** Request endBlock. */
        public endBlock?: tendermint.abci.types.IRequestEndBlock | null;

        /** Request commit. */
        public commit?: tendermint.abci.types.IRequestCommit | null;

        /** Request value. */
        public value?:
          | "echo"
          | "flush"
          | "info"
          | "setOption"
          | "initChain"
          | "query"
          | "beginBlock"
          | "checkTx"
          | "deliverTx"
          | "endBlock"
          | "commit";

        /**
         * Creates a new Request instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Request instance
         */
        public static create(properties?: tendermint.abci.types.IRequest): tendermint.abci.types.Request;

        /**
         * Encodes the specified Request message. Does not implicitly {@link tendermint.abci.types.Request.verify|verify} messages.
         * @param m Request message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: tendermint.abci.types.IRequest, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Request message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns Request
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: $protobuf.Reader | Uint8Array, l?: number): tendermint.abci.types.Request;
      }

      /** Properties of a RequestEcho. */
      interface IRequestEcho {
        /** RequestEcho message */
        message?: string | null;
      }

      /** Represents a RequestEcho. */
      class RequestEcho implements IRequestEcho {
        /**
         * Constructs a new RequestEcho.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IRequestEcho);

        /** RequestEcho message. */
        public message: string;

        /**
         * Creates a new RequestEcho instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RequestEcho instance
         */
        public static create(
          properties?: tendermint.abci.types.IRequestEcho,
        ): tendermint.abci.types.RequestEcho;

        /**
         * Encodes the specified RequestEcho message. Does not implicitly {@link tendermint.abci.types.RequestEcho.verify|verify} messages.
         * @param m RequestEcho message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: tendermint.abci.types.IRequestEcho, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RequestEcho message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns RequestEcho
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: $protobuf.Reader | Uint8Array, l?: number): tendermint.abci.types.RequestEcho;
      }

      /** Properties of a RequestFlush. */
      interface IRequestFlush {}

      /** Represents a RequestFlush. */
      class RequestFlush implements IRequestFlush {
        /**
         * Constructs a new RequestFlush.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IRequestFlush);

        /**
         * Creates a new RequestFlush instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RequestFlush instance
         */
        public static create(
          properties?: tendermint.abci.types.IRequestFlush,
        ): tendermint.abci.types.RequestFlush;

        /**
         * Encodes the specified RequestFlush message. Does not implicitly {@link tendermint.abci.types.RequestFlush.verify|verify} messages.
         * @param m RequestFlush message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: tendermint.abci.types.IRequestFlush, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RequestFlush message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns RequestFlush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): tendermint.abci.types.RequestFlush;
      }

      /** Properties of a RequestInfo. */
      interface IRequestInfo {
        /** RequestInfo version */
        version?: string | null;

        /** RequestInfo blockVersion */
        blockVersion?: Long | null;

        /** RequestInfo p2pVersion */
        p2pVersion?: Long | null;
      }

      /** Represents a RequestInfo. */
      class RequestInfo implements IRequestInfo {
        /**
         * Constructs a new RequestInfo.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IRequestInfo);

        /** RequestInfo version. */
        public version: string;

        /** RequestInfo blockVersion. */
        public blockVersion: Long;

        /** RequestInfo p2pVersion. */
        public p2pVersion: Long;

        /**
         * Creates a new RequestInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RequestInfo instance
         */
        public static create(
          properties?: tendermint.abci.types.IRequestInfo,
        ): tendermint.abci.types.RequestInfo;

        /**
         * Encodes the specified RequestInfo message. Does not implicitly {@link tendermint.abci.types.RequestInfo.verify|verify} messages.
         * @param m RequestInfo message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: tendermint.abci.types.IRequestInfo, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RequestInfo message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns RequestInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: $protobuf.Reader | Uint8Array, l?: number): tendermint.abci.types.RequestInfo;
      }

      /** Properties of a RequestSetOption. */
      interface IRequestSetOption {
        /** RequestSetOption key */
        key?: string | null;

        /** RequestSetOption value */
        value?: string | null;
      }

      /** Represents a RequestSetOption. */
      class RequestSetOption implements IRequestSetOption {
        /**
         * Constructs a new RequestSetOption.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IRequestSetOption);

        /** RequestSetOption key. */
        public key: string;

        /** RequestSetOption value. */
        public value: string;

        /**
         * Creates a new RequestSetOption instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RequestSetOption instance
         */
        public static create(
          properties?: tendermint.abci.types.IRequestSetOption,
        ): tendermint.abci.types.RequestSetOption;

        /**
         * Encodes the specified RequestSetOption message. Does not implicitly {@link tendermint.abci.types.RequestSetOption.verify|verify} messages.
         * @param m RequestSetOption message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: tendermint.abci.types.IRequestSetOption,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a RequestSetOption message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns RequestSetOption
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): tendermint.abci.types.RequestSetOption;
      }

      /** Properties of a RequestInitChain. */
      interface IRequestInitChain {
        /** RequestInitChain time */
        time?: google.protobuf.ITimestamp | null;

        /** RequestInitChain chainId */
        chainId?: string | null;

        /** RequestInitChain consensusParams */
        consensusParams?: tendermint.abci.types.IConsensusParams | null;

        /** RequestInitChain validators */
        validators?: tendermint.abci.types.IValidatorUpdate[] | null;

        /** RequestInitChain appStateBytes */
        appStateBytes?: Uint8Array | null;
      }

      /** Represents a RequestInitChain. */
      class RequestInitChain implements IRequestInitChain {
        /**
         * Constructs a new RequestInitChain.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IRequestInitChain);

        /** RequestInitChain time. */
        public time?: google.protobuf.ITimestamp | null;

        /** RequestInitChain chainId. */
        public chainId: string;

        /** RequestInitChain consensusParams. */
        public consensusParams?: tendermint.abci.types.IConsensusParams | null;

        /** RequestInitChain validators. */
        public validators: tendermint.abci.types.IValidatorUpdate[];

        /** RequestInitChain appStateBytes. */
        public appStateBytes: Uint8Array;

        /**
         * Creates a new RequestInitChain instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RequestInitChain instance
         */
        public static create(
          properties?: tendermint.abci.types.IRequestInitChain,
        ): tendermint.abci.types.RequestInitChain;

        /**
         * Encodes the specified RequestInitChain message. Does not implicitly {@link tendermint.abci.types.RequestInitChain.verify|verify} messages.
         * @param m RequestInitChain message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: tendermint.abci.types.IRequestInitChain,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a RequestInitChain message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns RequestInitChain
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): tendermint.abci.types.RequestInitChain;
      }

      /** Properties of a RequestQuery. */
      interface IRequestQuery {
        /** RequestQuery data */
        data?: Uint8Array | null;

        /** RequestQuery path */
        path?: string | null;

        /** RequestQuery height */
        height?: Long | null;

        /** RequestQuery prove */
        prove?: boolean | null;
      }

      /** Represents a RequestQuery. */
      class RequestQuery implements IRequestQuery {
        /**
         * Constructs a new RequestQuery.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IRequestQuery);

        /** RequestQuery data. */
        public data: Uint8Array;

        /** RequestQuery path. */
        public path: string;

        /** RequestQuery height. */
        public height: Long;

        /** RequestQuery prove. */
        public prove: boolean;

        /**
         * Creates a new RequestQuery instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RequestQuery instance
         */
        public static create(
          properties?: tendermint.abci.types.IRequestQuery,
        ): tendermint.abci.types.RequestQuery;

        /**
         * Encodes the specified RequestQuery message. Does not implicitly {@link tendermint.abci.types.RequestQuery.verify|verify} messages.
         * @param m RequestQuery message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: tendermint.abci.types.IRequestQuery, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RequestQuery message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns RequestQuery
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): tendermint.abci.types.RequestQuery;
      }

      /** Properties of a RequestBeginBlock. */
      interface IRequestBeginBlock {
        /** RequestBeginBlock hash */
        hash?: Uint8Array | null;

        /** RequestBeginBlock header */
        header?: tendermint.abci.types.IHeader | null;

        /** RequestBeginBlock lastCommitInfo */
        lastCommitInfo?: tendermint.abci.types.ILastCommitInfo | null;

        /** RequestBeginBlock byzantineValidators */
        byzantineValidators?: tendermint.abci.types.IEvidence[] | null;
      }

      /** Represents a RequestBeginBlock. */
      class RequestBeginBlock implements IRequestBeginBlock {
        /**
         * Constructs a new RequestBeginBlock.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IRequestBeginBlock);

        /** RequestBeginBlock hash. */
        public hash: Uint8Array;

        /** RequestBeginBlock header. */
        public header?: tendermint.abci.types.IHeader | null;

        /** RequestBeginBlock lastCommitInfo. */
        public lastCommitInfo?: tendermint.abci.types.ILastCommitInfo | null;

        /** RequestBeginBlock byzantineValidators. */
        public byzantineValidators: tendermint.abci.types.IEvidence[];

        /**
         * Creates a new RequestBeginBlock instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RequestBeginBlock instance
         */
        public static create(
          properties?: tendermint.abci.types.IRequestBeginBlock,
        ): tendermint.abci.types.RequestBeginBlock;

        /**
         * Encodes the specified RequestBeginBlock message. Does not implicitly {@link tendermint.abci.types.RequestBeginBlock.verify|verify} messages.
         * @param m RequestBeginBlock message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: tendermint.abci.types.IRequestBeginBlock,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a RequestBeginBlock message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns RequestBeginBlock
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): tendermint.abci.types.RequestBeginBlock;
      }

      /** CheckTxType enum. */
      enum CheckTxType {
        New = 0,
        Recheck = 1,
      }

      /** Properties of a RequestCheckTx. */
      interface IRequestCheckTx {
        /** RequestCheckTx tx */
        tx?: Uint8Array | null;

        /** RequestCheckTx type */
        type?: tendermint.abci.types.CheckTxType | null;
      }

      /** Represents a RequestCheckTx. */
      class RequestCheckTx implements IRequestCheckTx {
        /**
         * Constructs a new RequestCheckTx.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IRequestCheckTx);

        /** RequestCheckTx tx. */
        public tx: Uint8Array;

        /** RequestCheckTx type. */
        public type: tendermint.abci.types.CheckTxType;

        /**
         * Creates a new RequestCheckTx instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RequestCheckTx instance
         */
        public static create(
          properties?: tendermint.abci.types.IRequestCheckTx,
        ): tendermint.abci.types.RequestCheckTx;

        /**
         * Encodes the specified RequestCheckTx message. Does not implicitly {@link tendermint.abci.types.RequestCheckTx.verify|verify} messages.
         * @param m RequestCheckTx message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: tendermint.abci.types.IRequestCheckTx,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a RequestCheckTx message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns RequestCheckTx
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): tendermint.abci.types.RequestCheckTx;
      }

      /** Properties of a RequestDeliverTx. */
      interface IRequestDeliverTx {
        /** RequestDeliverTx tx */
        tx?: Uint8Array | null;
      }

      /** Represents a RequestDeliverTx. */
      class RequestDeliverTx implements IRequestDeliverTx {
        /**
         * Constructs a new RequestDeliverTx.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IRequestDeliverTx);

        /** RequestDeliverTx tx. */
        public tx: Uint8Array;

        /**
         * Creates a new RequestDeliverTx instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RequestDeliverTx instance
         */
        public static create(
          properties?: tendermint.abci.types.IRequestDeliverTx,
        ): tendermint.abci.types.RequestDeliverTx;

        /**
         * Encodes the specified RequestDeliverTx message. Does not implicitly {@link tendermint.abci.types.RequestDeliverTx.verify|verify} messages.
         * @param m RequestDeliverTx message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: tendermint.abci.types.IRequestDeliverTx,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a RequestDeliverTx message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns RequestDeliverTx
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): tendermint.abci.types.RequestDeliverTx;
      }

      /** Properties of a RequestEndBlock. */
      interface IRequestEndBlock {
        /** RequestEndBlock height */
        height?: Long | null;
      }

      /** Represents a RequestEndBlock. */
      class RequestEndBlock implements IRequestEndBlock {
        /**
         * Constructs a new RequestEndBlock.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IRequestEndBlock);

        /** RequestEndBlock height. */
        public height: Long;

        /**
         * Creates a new RequestEndBlock instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RequestEndBlock instance
         */
        public static create(
          properties?: tendermint.abci.types.IRequestEndBlock,
        ): tendermint.abci.types.RequestEndBlock;

        /**
         * Encodes the specified RequestEndBlock message. Does not implicitly {@link tendermint.abci.types.RequestEndBlock.verify|verify} messages.
         * @param m RequestEndBlock message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: tendermint.abci.types.IRequestEndBlock,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a RequestEndBlock message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns RequestEndBlock
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): tendermint.abci.types.RequestEndBlock;
      }

      /** Properties of a RequestCommit. */
      interface IRequestCommit {}

      /** Represents a RequestCommit. */
      class RequestCommit implements IRequestCommit {
        /**
         * Constructs a new RequestCommit.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IRequestCommit);

        /**
         * Creates a new RequestCommit instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RequestCommit instance
         */
        public static create(
          properties?: tendermint.abci.types.IRequestCommit,
        ): tendermint.abci.types.RequestCommit;

        /**
         * Encodes the specified RequestCommit message. Does not implicitly {@link tendermint.abci.types.RequestCommit.verify|verify} messages.
         * @param m RequestCommit message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: tendermint.abci.types.IRequestCommit, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RequestCommit message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns RequestCommit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): tendermint.abci.types.RequestCommit;
      }

      /** Properties of a Response. */
      interface IResponse {
        /** Response exception */
        exception?: tendermint.abci.types.IResponseException | null;

        /** Response echo */
        echo?: tendermint.abci.types.IResponseEcho | null;

        /** Response flush */
        flush?: tendermint.abci.types.IResponseFlush | null;

        /** Response info */
        info?: tendermint.abci.types.IResponseInfo | null;

        /** Response setOption */
        setOption?: tendermint.abci.types.IResponseSetOption | null;

        /** Response initChain */
        initChain?: tendermint.abci.types.IResponseInitChain | null;

        /** Response query */
        query?: tendermint.abci.types.IResponseQuery | null;

        /** Response beginBlock */
        beginBlock?: tendermint.abci.types.IResponseBeginBlock | null;

        /** Response checkTx */
        checkTx?: tendermint.abci.types.IResponseCheckTx | null;

        /** Response deliverTx */
        deliverTx?: tendermint.abci.types.IResponseDeliverTx | null;

        /** Response endBlock */
        endBlock?: tendermint.abci.types.IResponseEndBlock | null;

        /** Response commit */
        commit?: tendermint.abci.types.IResponseCommit | null;
      }

      /** Represents a Response. */
      class Response implements IResponse {
        /**
         * Constructs a new Response.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IResponse);

        /** Response exception. */
        public exception?: tendermint.abci.types.IResponseException | null;

        /** Response echo. */
        public echo?: tendermint.abci.types.IResponseEcho | null;

        /** Response flush. */
        public flush?: tendermint.abci.types.IResponseFlush | null;

        /** Response info. */
        public info?: tendermint.abci.types.IResponseInfo | null;

        /** Response setOption. */
        public setOption?: tendermint.abci.types.IResponseSetOption | null;

        /** Response initChain. */
        public initChain?: tendermint.abci.types.IResponseInitChain | null;

        /** Response query. */
        public query?: tendermint.abci.types.IResponseQuery | null;

        /** Response beginBlock. */
        public beginBlock?: tendermint.abci.types.IResponseBeginBlock | null;

        /** Response checkTx. */
        public checkTx?: tendermint.abci.types.IResponseCheckTx | null;

        /** Response deliverTx. */
        public deliverTx?: tendermint.abci.types.IResponseDeliverTx | null;

        /** Response endBlock. */
        public endBlock?: tendermint.abci.types.IResponseEndBlock | null;

        /** Response commit. */
        public commit?: tendermint.abci.types.IResponseCommit | null;

        /** Response value. */
        public value?:
          | "exception"
          | "echo"
          | "flush"
          | "info"
          | "setOption"
          | "initChain"
          | "query"
          | "beginBlock"
          | "checkTx"
          | "deliverTx"
          | "endBlock"
          | "commit";

        /**
         * Creates a new Response instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Response instance
         */
        public static create(properties?: tendermint.abci.types.IResponse): tendermint.abci.types.Response;

        /**
         * Encodes the specified Response message. Does not implicitly {@link tendermint.abci.types.Response.verify|verify} messages.
         * @param m Response message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: tendermint.abci.types.IResponse, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Response message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns Response
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: $protobuf.Reader | Uint8Array, l?: number): tendermint.abci.types.Response;
      }

      /** Properties of a ResponseException. */
      interface IResponseException {
        /** ResponseException error */
        error?: string | null;
      }

      /** Represents a ResponseException. */
      class ResponseException implements IResponseException {
        /**
         * Constructs a new ResponseException.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IResponseException);

        /** ResponseException error. */
        public error: string;

        /**
         * Creates a new ResponseException instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResponseException instance
         */
        public static create(
          properties?: tendermint.abci.types.IResponseException,
        ): tendermint.abci.types.ResponseException;

        /**
         * Encodes the specified ResponseException message. Does not implicitly {@link tendermint.abci.types.ResponseException.verify|verify} messages.
         * @param m ResponseException message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: tendermint.abci.types.IResponseException,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a ResponseException message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns ResponseException
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): tendermint.abci.types.ResponseException;
      }

      /** Properties of a ResponseEcho. */
      interface IResponseEcho {
        /** ResponseEcho message */
        message?: string | null;
      }

      /** Represents a ResponseEcho. */
      class ResponseEcho implements IResponseEcho {
        /**
         * Constructs a new ResponseEcho.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IResponseEcho);

        /** ResponseEcho message. */
        public message: string;

        /**
         * Creates a new ResponseEcho instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResponseEcho instance
         */
        public static create(
          properties?: tendermint.abci.types.IResponseEcho,
        ): tendermint.abci.types.ResponseEcho;

        /**
         * Encodes the specified ResponseEcho message. Does not implicitly {@link tendermint.abci.types.ResponseEcho.verify|verify} messages.
         * @param m ResponseEcho message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: tendermint.abci.types.IResponseEcho, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResponseEcho message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns ResponseEcho
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): tendermint.abci.types.ResponseEcho;
      }

      /** Properties of a ResponseFlush. */
      interface IResponseFlush {}

      /** Represents a ResponseFlush. */
      class ResponseFlush implements IResponseFlush {
        /**
         * Constructs a new ResponseFlush.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IResponseFlush);

        /**
         * Creates a new ResponseFlush instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResponseFlush instance
         */
        public static create(
          properties?: tendermint.abci.types.IResponseFlush,
        ): tendermint.abci.types.ResponseFlush;

        /**
         * Encodes the specified ResponseFlush message. Does not implicitly {@link tendermint.abci.types.ResponseFlush.verify|verify} messages.
         * @param m ResponseFlush message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: tendermint.abci.types.IResponseFlush, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResponseFlush message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns ResponseFlush
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): tendermint.abci.types.ResponseFlush;
      }

      /** Properties of a ResponseInfo. */
      interface IResponseInfo {
        /** ResponseInfo data */
        data?: string | null;

        /** ResponseInfo version */
        version?: string | null;

        /** ResponseInfo appVersion */
        appVersion?: Long | null;

        /** ResponseInfo lastBlockHeight */
        lastBlockHeight?: Long | null;

        /** ResponseInfo lastBlockAppHash */
        lastBlockAppHash?: Uint8Array | null;
      }

      /** Represents a ResponseInfo. */
      class ResponseInfo implements IResponseInfo {
        /**
         * Constructs a new ResponseInfo.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IResponseInfo);

        /** ResponseInfo data. */
        public data: string;

        /** ResponseInfo version. */
        public version: string;

        /** ResponseInfo appVersion. */
        public appVersion: Long;

        /** ResponseInfo lastBlockHeight. */
        public lastBlockHeight: Long;

        /** ResponseInfo lastBlockAppHash. */
        public lastBlockAppHash: Uint8Array;

        /**
         * Creates a new ResponseInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResponseInfo instance
         */
        public static create(
          properties?: tendermint.abci.types.IResponseInfo,
        ): tendermint.abci.types.ResponseInfo;

        /**
         * Encodes the specified ResponseInfo message. Does not implicitly {@link tendermint.abci.types.ResponseInfo.verify|verify} messages.
         * @param m ResponseInfo message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: tendermint.abci.types.IResponseInfo, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResponseInfo message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns ResponseInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): tendermint.abci.types.ResponseInfo;
      }

      /** Properties of a ResponseSetOption. */
      interface IResponseSetOption {
        /** ResponseSetOption code */
        code?: number | null;

        /** ResponseSetOption log */
        log?: string | null;

        /** ResponseSetOption info */
        info?: string | null;
      }

      /** Represents a ResponseSetOption. */
      class ResponseSetOption implements IResponseSetOption {
        /**
         * Constructs a new ResponseSetOption.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IResponseSetOption);

        /** ResponseSetOption code. */
        public code: number;

        /** ResponseSetOption log. */
        public log: string;

        /** ResponseSetOption info. */
        public info: string;

        /**
         * Creates a new ResponseSetOption instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResponseSetOption instance
         */
        public static create(
          properties?: tendermint.abci.types.IResponseSetOption,
        ): tendermint.abci.types.ResponseSetOption;

        /**
         * Encodes the specified ResponseSetOption message. Does not implicitly {@link tendermint.abci.types.ResponseSetOption.verify|verify} messages.
         * @param m ResponseSetOption message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: tendermint.abci.types.IResponseSetOption,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a ResponseSetOption message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns ResponseSetOption
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): tendermint.abci.types.ResponseSetOption;
      }

      /** Properties of a ResponseInitChain. */
      interface IResponseInitChain {
        /** ResponseInitChain consensusParams */
        consensusParams?: tendermint.abci.types.IConsensusParams | null;

        /** ResponseInitChain validators */
        validators?: tendermint.abci.types.IValidatorUpdate[] | null;
      }

      /** Represents a ResponseInitChain. */
      class ResponseInitChain implements IResponseInitChain {
        /**
         * Constructs a new ResponseInitChain.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IResponseInitChain);

        /** ResponseInitChain consensusParams. */
        public consensusParams?: tendermint.abci.types.IConsensusParams | null;

        /** ResponseInitChain validators. */
        public validators: tendermint.abci.types.IValidatorUpdate[];

        /**
         * Creates a new ResponseInitChain instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResponseInitChain instance
         */
        public static create(
          properties?: tendermint.abci.types.IResponseInitChain,
        ): tendermint.abci.types.ResponseInitChain;

        /**
         * Encodes the specified ResponseInitChain message. Does not implicitly {@link tendermint.abci.types.ResponseInitChain.verify|verify} messages.
         * @param m ResponseInitChain message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: tendermint.abci.types.IResponseInitChain,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a ResponseInitChain message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns ResponseInitChain
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): tendermint.abci.types.ResponseInitChain;
      }

      /** Properties of a ResponseQuery. */
      interface IResponseQuery {
        /** ResponseQuery code */
        code?: number | null;

        /** ResponseQuery log */
        log?: string | null;

        /** ResponseQuery info */
        info?: string | null;

        /** ResponseQuery index */
        index?: Long | null;

        /** ResponseQuery key */
        key?: Uint8Array | null;

        /** ResponseQuery value */
        value?: Uint8Array | null;

        /** ResponseQuery proof */
        proof?: tendermint.crypto.merkle.IProof | null;

        /** ResponseQuery height */
        height?: Long | null;

        /** ResponseQuery codespace */
        codespace?: string | null;
      }

      /** Represents a ResponseQuery. */
      class ResponseQuery implements IResponseQuery {
        /**
         * Constructs a new ResponseQuery.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IResponseQuery);

        /** ResponseQuery code. */
        public code: number;

        /** ResponseQuery log. */
        public log: string;

        /** ResponseQuery info. */
        public info: string;

        /** ResponseQuery index. */
        public index: Long;

        /** ResponseQuery key. */
        public key: Uint8Array;

        /** ResponseQuery value. */
        public value: Uint8Array;

        /** ResponseQuery proof. */
        public proof?: tendermint.crypto.merkle.IProof | null;

        /** ResponseQuery height. */
        public height: Long;

        /** ResponseQuery codespace. */
        public codespace: string;

        /**
         * Creates a new ResponseQuery instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResponseQuery instance
         */
        public static create(
          properties?: tendermint.abci.types.IResponseQuery,
        ): tendermint.abci.types.ResponseQuery;

        /**
         * Encodes the specified ResponseQuery message. Does not implicitly {@link tendermint.abci.types.ResponseQuery.verify|verify} messages.
         * @param m ResponseQuery message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: tendermint.abci.types.IResponseQuery, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResponseQuery message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns ResponseQuery
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): tendermint.abci.types.ResponseQuery;
      }

      /** Properties of a ResponseBeginBlock. */
      interface IResponseBeginBlock {
        /** ResponseBeginBlock events */
        events?: tendermint.abci.types.IEvent[] | null;
      }

      /** Represents a ResponseBeginBlock. */
      class ResponseBeginBlock implements IResponseBeginBlock {
        /**
         * Constructs a new ResponseBeginBlock.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IResponseBeginBlock);

        /** ResponseBeginBlock events. */
        public events: tendermint.abci.types.IEvent[];

        /**
         * Creates a new ResponseBeginBlock instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResponseBeginBlock instance
         */
        public static create(
          properties?: tendermint.abci.types.IResponseBeginBlock,
        ): tendermint.abci.types.ResponseBeginBlock;

        /**
         * Encodes the specified ResponseBeginBlock message. Does not implicitly {@link tendermint.abci.types.ResponseBeginBlock.verify|verify} messages.
         * @param m ResponseBeginBlock message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: tendermint.abci.types.IResponseBeginBlock,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a ResponseBeginBlock message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns ResponseBeginBlock
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): tendermint.abci.types.ResponseBeginBlock;
      }

      /** Properties of a ResponseCheckTx. */
      interface IResponseCheckTx {
        /** ResponseCheckTx code */
        code?: number | null;

        /** ResponseCheckTx data */
        data?: Uint8Array | null;

        /** ResponseCheckTx log */
        log?: string | null;

        /** ResponseCheckTx info */
        info?: string | null;

        /** ResponseCheckTx gasWanted */
        gasWanted?: Long | null;

        /** ResponseCheckTx gasUsed */
        gasUsed?: Long | null;

        /** ResponseCheckTx events */
        events?: tendermint.abci.types.IEvent[] | null;

        /** ResponseCheckTx codespace */
        codespace?: string | null;
      }

      /** Represents a ResponseCheckTx. */
      class ResponseCheckTx implements IResponseCheckTx {
        /**
         * Constructs a new ResponseCheckTx.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IResponseCheckTx);

        /** ResponseCheckTx code. */
        public code: number;

        /** ResponseCheckTx data. */
        public data: Uint8Array;

        /** ResponseCheckTx log. */
        public log: string;

        /** ResponseCheckTx info. */
        public info: string;

        /** ResponseCheckTx gasWanted. */
        public gasWanted: Long;

        /** ResponseCheckTx gasUsed. */
        public gasUsed: Long;

        /** ResponseCheckTx events. */
        public events: tendermint.abci.types.IEvent[];

        /** ResponseCheckTx codespace. */
        public codespace: string;

        /**
         * Creates a new ResponseCheckTx instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResponseCheckTx instance
         */
        public static create(
          properties?: tendermint.abci.types.IResponseCheckTx,
        ): tendermint.abci.types.ResponseCheckTx;

        /**
         * Encodes the specified ResponseCheckTx message. Does not implicitly {@link tendermint.abci.types.ResponseCheckTx.verify|verify} messages.
         * @param m ResponseCheckTx message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: tendermint.abci.types.IResponseCheckTx,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a ResponseCheckTx message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns ResponseCheckTx
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): tendermint.abci.types.ResponseCheckTx;
      }

      /** Properties of a ResponseDeliverTx. */
      interface IResponseDeliverTx {
        /** ResponseDeliverTx code */
        code?: number | null;

        /** ResponseDeliverTx data */
        data?: Uint8Array | null;

        /** ResponseDeliverTx log */
        log?: string | null;

        /** ResponseDeliverTx info */
        info?: string | null;

        /** ResponseDeliverTx gasWanted */
        gasWanted?: Long | null;

        /** ResponseDeliverTx gasUsed */
        gasUsed?: Long | null;

        /** ResponseDeliverTx events */
        events?: tendermint.abci.types.IEvent[] | null;

        /** ResponseDeliverTx codespace */
        codespace?: string | null;
      }

      /** Represents a ResponseDeliverTx. */
      class ResponseDeliverTx implements IResponseDeliverTx {
        /**
         * Constructs a new ResponseDeliverTx.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IResponseDeliverTx);

        /** ResponseDeliverTx code. */
        public code: number;

        /** ResponseDeliverTx data. */
        public data: Uint8Array;

        /** ResponseDeliverTx log. */
        public log: string;

        /** ResponseDeliverTx info. */
        public info: string;

        /** ResponseDeliverTx gasWanted. */
        public gasWanted: Long;

        /** ResponseDeliverTx gasUsed. */
        public gasUsed: Long;

        /** ResponseDeliverTx events. */
        public events: tendermint.abci.types.IEvent[];

        /** ResponseDeliverTx codespace. */
        public codespace: string;

        /**
         * Creates a new ResponseDeliverTx instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResponseDeliverTx instance
         */
        public static create(
          properties?: tendermint.abci.types.IResponseDeliverTx,
        ): tendermint.abci.types.ResponseDeliverTx;

        /**
         * Encodes the specified ResponseDeliverTx message. Does not implicitly {@link tendermint.abci.types.ResponseDeliverTx.verify|verify} messages.
         * @param m ResponseDeliverTx message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: tendermint.abci.types.IResponseDeliverTx,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a ResponseDeliverTx message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns ResponseDeliverTx
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): tendermint.abci.types.ResponseDeliverTx;
      }

      /** Properties of a ResponseEndBlock. */
      interface IResponseEndBlock {
        /** ResponseEndBlock validatorUpdates */
        validatorUpdates?: tendermint.abci.types.IValidatorUpdate[] | null;

        /** ResponseEndBlock consensusParamUpdates */
        consensusParamUpdates?: tendermint.abci.types.IConsensusParams | null;

        /** ResponseEndBlock events */
        events?: tendermint.abci.types.IEvent[] | null;
      }

      /** Represents a ResponseEndBlock. */
      class ResponseEndBlock implements IResponseEndBlock {
        /**
         * Constructs a new ResponseEndBlock.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IResponseEndBlock);

        /** ResponseEndBlock validatorUpdates. */
        public validatorUpdates: tendermint.abci.types.IValidatorUpdate[];

        /** ResponseEndBlock consensusParamUpdates. */
        public consensusParamUpdates?: tendermint.abci.types.IConsensusParams | null;

        /** ResponseEndBlock events. */
        public events: tendermint.abci.types.IEvent[];

        /**
         * Creates a new ResponseEndBlock instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResponseEndBlock instance
         */
        public static create(
          properties?: tendermint.abci.types.IResponseEndBlock,
        ): tendermint.abci.types.ResponseEndBlock;

        /**
         * Encodes the specified ResponseEndBlock message. Does not implicitly {@link tendermint.abci.types.ResponseEndBlock.verify|verify} messages.
         * @param m ResponseEndBlock message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: tendermint.abci.types.IResponseEndBlock,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a ResponseEndBlock message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns ResponseEndBlock
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): tendermint.abci.types.ResponseEndBlock;
      }

      /** Properties of a ResponseCommit. */
      interface IResponseCommit {
        /** ResponseCommit data */
        data?: Uint8Array | null;
      }

      /** Represents a ResponseCommit. */
      class ResponseCommit implements IResponseCommit {
        /**
         * Constructs a new ResponseCommit.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IResponseCommit);

        /** ResponseCommit data. */
        public data: Uint8Array;

        /**
         * Creates a new ResponseCommit instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResponseCommit instance
         */
        public static create(
          properties?: tendermint.abci.types.IResponseCommit,
        ): tendermint.abci.types.ResponseCommit;

        /**
         * Encodes the specified ResponseCommit message. Does not implicitly {@link tendermint.abci.types.ResponseCommit.verify|verify} messages.
         * @param m ResponseCommit message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: tendermint.abci.types.IResponseCommit,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a ResponseCommit message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns ResponseCommit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): tendermint.abci.types.ResponseCommit;
      }

      /** Properties of a ConsensusParams. */
      interface IConsensusParams {
        /** ConsensusParams block */
        block?: tendermint.abci.types.IBlockParams | null;

        /** ConsensusParams evidence */
        evidence?: tendermint.abci.types.IEvidenceParams | null;

        /** ConsensusParams validator */
        validator?: tendermint.abci.types.IValidatorParams | null;
      }

      /** Represents a ConsensusParams. */
      class ConsensusParams implements IConsensusParams {
        /**
         * Constructs a new ConsensusParams.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IConsensusParams);

        /** ConsensusParams block. */
        public block?: tendermint.abci.types.IBlockParams | null;

        /** ConsensusParams evidence. */
        public evidence?: tendermint.abci.types.IEvidenceParams | null;

        /** ConsensusParams validator. */
        public validator?: tendermint.abci.types.IValidatorParams | null;

        /**
         * Creates a new ConsensusParams instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ConsensusParams instance
         */
        public static create(
          properties?: tendermint.abci.types.IConsensusParams,
        ): tendermint.abci.types.ConsensusParams;

        /**
         * Encodes the specified ConsensusParams message. Does not implicitly {@link tendermint.abci.types.ConsensusParams.verify|verify} messages.
         * @param m ConsensusParams message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: tendermint.abci.types.IConsensusParams,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a ConsensusParams message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns ConsensusParams
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): tendermint.abci.types.ConsensusParams;
      }

      /** Properties of a BlockParams. */
      interface IBlockParams {
        /** BlockParams maxBytes */
        maxBytes?: Long | null;

        /** BlockParams maxGas */
        maxGas?: Long | null;
      }

      /** Represents a BlockParams. */
      class BlockParams implements IBlockParams {
        /**
         * Constructs a new BlockParams.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IBlockParams);

        /** BlockParams maxBytes. */
        public maxBytes: Long;

        /** BlockParams maxGas. */
        public maxGas: Long;

        /**
         * Creates a new BlockParams instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BlockParams instance
         */
        public static create(
          properties?: tendermint.abci.types.IBlockParams,
        ): tendermint.abci.types.BlockParams;

        /**
         * Encodes the specified BlockParams message. Does not implicitly {@link tendermint.abci.types.BlockParams.verify|verify} messages.
         * @param m BlockParams message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: tendermint.abci.types.IBlockParams, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BlockParams message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns BlockParams
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: $protobuf.Reader | Uint8Array, l?: number): tendermint.abci.types.BlockParams;
      }

      /** Properties of an EvidenceParams. */
      interface IEvidenceParams {
        /** EvidenceParams maxAgeNumBlocks */
        maxAgeNumBlocks?: Long | null;

        /** EvidenceParams maxAgeDuration */
        maxAgeDuration?: google.protobuf.IDuration | null;
      }

      /** Represents an EvidenceParams. */
      class EvidenceParams implements IEvidenceParams {
        /**
         * Constructs a new EvidenceParams.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IEvidenceParams);

        /** EvidenceParams maxAgeNumBlocks. */
        public maxAgeNumBlocks: Long;

        /** EvidenceParams maxAgeDuration. */
        public maxAgeDuration?: google.protobuf.IDuration | null;

        /**
         * Creates a new EvidenceParams instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EvidenceParams instance
         */
        public static create(
          properties?: tendermint.abci.types.IEvidenceParams,
        ): tendermint.abci.types.EvidenceParams;

        /**
         * Encodes the specified EvidenceParams message. Does not implicitly {@link tendermint.abci.types.EvidenceParams.verify|verify} messages.
         * @param m EvidenceParams message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: tendermint.abci.types.IEvidenceParams,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes an EvidenceParams message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns EvidenceParams
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): tendermint.abci.types.EvidenceParams;
      }

      /** Properties of a ValidatorParams. */
      interface IValidatorParams {
        /** ValidatorParams pubKeyTypes */
        pubKeyTypes?: string[] | null;
      }

      /** Represents a ValidatorParams. */
      class ValidatorParams implements IValidatorParams {
        /**
         * Constructs a new ValidatorParams.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IValidatorParams);

        /** ValidatorParams pubKeyTypes. */
        public pubKeyTypes: string[];

        /**
         * Creates a new ValidatorParams instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ValidatorParams instance
         */
        public static create(
          properties?: tendermint.abci.types.IValidatorParams,
        ): tendermint.abci.types.ValidatorParams;

        /**
         * Encodes the specified ValidatorParams message. Does not implicitly {@link tendermint.abci.types.ValidatorParams.verify|verify} messages.
         * @param m ValidatorParams message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: tendermint.abci.types.IValidatorParams,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a ValidatorParams message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns ValidatorParams
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): tendermint.abci.types.ValidatorParams;
      }

      /** Properties of a LastCommitInfo. */
      interface ILastCommitInfo {
        /** LastCommitInfo round */
        round?: number | null;

        /** LastCommitInfo votes */
        votes?: tendermint.abci.types.IVoteInfo[] | null;
      }

      /** Represents a LastCommitInfo. */
      class LastCommitInfo implements ILastCommitInfo {
        /**
         * Constructs a new LastCommitInfo.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.ILastCommitInfo);

        /** LastCommitInfo round. */
        public round: number;

        /** LastCommitInfo votes. */
        public votes: tendermint.abci.types.IVoteInfo[];

        /**
         * Creates a new LastCommitInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LastCommitInfo instance
         */
        public static create(
          properties?: tendermint.abci.types.ILastCommitInfo,
        ): tendermint.abci.types.LastCommitInfo;

        /**
         * Encodes the specified LastCommitInfo message. Does not implicitly {@link tendermint.abci.types.LastCommitInfo.verify|verify} messages.
         * @param m LastCommitInfo message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: tendermint.abci.types.ILastCommitInfo,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a LastCommitInfo message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns LastCommitInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): tendermint.abci.types.LastCommitInfo;
      }

      /** Properties of an Event. */
      interface IEvent {
        /** Event type */
        type?: string | null;

        /** Event attributes */
        attributes?: tendermint.libs.kv.IPair[] | null;
      }

      /** Represents an Event. */
      class Event implements IEvent {
        /**
         * Constructs a new Event.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IEvent);

        /** Event type. */
        public type: string;

        /** Event attributes. */
        public attributes: tendermint.libs.kv.IPair[];

        /**
         * Creates a new Event instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Event instance
         */
        public static create(properties?: tendermint.abci.types.IEvent): tendermint.abci.types.Event;

        /**
         * Encodes the specified Event message. Does not implicitly {@link tendermint.abci.types.Event.verify|verify} messages.
         * @param m Event message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: tendermint.abci.types.IEvent, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Event message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns Event
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: $protobuf.Reader | Uint8Array, l?: number): tendermint.abci.types.Event;
      }

      /** Properties of a Header. */
      interface IHeader {
        /** Header version */
        version?: tendermint.abci.types.IVersion | null;

        /** Header chainId */
        chainId?: string | null;

        /** Header height */
        height?: Long | null;

        /** Header time */
        time?: google.protobuf.ITimestamp | null;

        /** Header lastBlockId */
        lastBlockId?: tendermint.abci.types.IBlockID | null;

        /** Header lastCommitHash */
        lastCommitHash?: Uint8Array | null;

        /** Header dataHash */
        dataHash?: Uint8Array | null;

        /** Header validatorsHash */
        validatorsHash?: Uint8Array | null;

        /** Header nextValidatorsHash */
        nextValidatorsHash?: Uint8Array | null;

        /** Header consensusHash */
        consensusHash?: Uint8Array | null;

        /** Header appHash */
        appHash?: Uint8Array | null;

        /** Header lastResultsHash */
        lastResultsHash?: Uint8Array | null;

        /** Header evidenceHash */
        evidenceHash?: Uint8Array | null;

        /** Header proposerAddress */
        proposerAddress?: Uint8Array | null;
      }

      /** Represents a Header. */
      class Header implements IHeader {
        /**
         * Constructs a new Header.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IHeader);

        /** Header version. */
        public version?: tendermint.abci.types.IVersion | null;

        /** Header chainId. */
        public chainId: string;

        /** Header height. */
        public height: Long;

        /** Header time. */
        public time?: google.protobuf.ITimestamp | null;

        /** Header lastBlockId. */
        public lastBlockId?: tendermint.abci.types.IBlockID | null;

        /** Header lastCommitHash. */
        public lastCommitHash: Uint8Array;

        /** Header dataHash. */
        public dataHash: Uint8Array;

        /** Header validatorsHash. */
        public validatorsHash: Uint8Array;

        /** Header nextValidatorsHash. */
        public nextValidatorsHash: Uint8Array;

        /** Header consensusHash. */
        public consensusHash: Uint8Array;

        /** Header appHash. */
        public appHash: Uint8Array;

        /** Header lastResultsHash. */
        public lastResultsHash: Uint8Array;

        /** Header evidenceHash. */
        public evidenceHash: Uint8Array;

        /** Header proposerAddress. */
        public proposerAddress: Uint8Array;

        /**
         * Creates a new Header instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Header instance
         */
        public static create(properties?: tendermint.abci.types.IHeader): tendermint.abci.types.Header;

        /**
         * Encodes the specified Header message. Does not implicitly {@link tendermint.abci.types.Header.verify|verify} messages.
         * @param m Header message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: tendermint.abci.types.IHeader, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Header message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns Header
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: $protobuf.Reader | Uint8Array, l?: number): tendermint.abci.types.Header;
      }

      /** Properties of a Version. */
      interface IVersion {
        /** Version Block */
        Block?: Long | null;

        /** Version App */
        App?: Long | null;
      }

      /** Represents a Version. */
      class Version implements IVersion {
        /**
         * Constructs a new Version.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IVersion);

        /** Version Block. */
        public Block: Long;

        /** Version App. */
        public App: Long;

        /**
         * Creates a new Version instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Version instance
         */
        public static create(properties?: tendermint.abci.types.IVersion): tendermint.abci.types.Version;

        /**
         * Encodes the specified Version message. Does not implicitly {@link tendermint.abci.types.Version.verify|verify} messages.
         * @param m Version message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: tendermint.abci.types.IVersion, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Version message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns Version
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: $protobuf.Reader | Uint8Array, l?: number): tendermint.abci.types.Version;
      }

      /** Properties of a BlockID. */
      interface IBlockID {
        /** BlockID hash */
        hash?: Uint8Array | null;

        /** BlockID partsHeader */
        partsHeader?: tendermint.abci.types.IPartSetHeader | null;
      }

      /** Represents a BlockID. */
      class BlockID implements IBlockID {
        /**
         * Constructs a new BlockID.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IBlockID);

        /** BlockID hash. */
        public hash: Uint8Array;

        /** BlockID partsHeader. */
        public partsHeader?: tendermint.abci.types.IPartSetHeader | null;

        /**
         * Creates a new BlockID instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BlockID instance
         */
        public static create(properties?: tendermint.abci.types.IBlockID): tendermint.abci.types.BlockID;

        /**
         * Encodes the specified BlockID message. Does not implicitly {@link tendermint.abci.types.BlockID.verify|verify} messages.
         * @param m BlockID message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: tendermint.abci.types.IBlockID, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BlockID message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns BlockID
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: $protobuf.Reader | Uint8Array, l?: number): tendermint.abci.types.BlockID;
      }

      /** Properties of a PartSetHeader. */
      interface IPartSetHeader {
        /** PartSetHeader total */
        total?: number | null;

        /** PartSetHeader hash */
        hash?: Uint8Array | null;
      }

      /** Represents a PartSetHeader. */
      class PartSetHeader implements IPartSetHeader {
        /**
         * Constructs a new PartSetHeader.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IPartSetHeader);

        /** PartSetHeader total. */
        public total: number;

        /** PartSetHeader hash. */
        public hash: Uint8Array;

        /**
         * Creates a new PartSetHeader instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PartSetHeader instance
         */
        public static create(
          properties?: tendermint.abci.types.IPartSetHeader,
        ): tendermint.abci.types.PartSetHeader;

        /**
         * Encodes the specified PartSetHeader message. Does not implicitly {@link tendermint.abci.types.PartSetHeader.verify|verify} messages.
         * @param m PartSetHeader message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: tendermint.abci.types.IPartSetHeader, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PartSetHeader message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns PartSetHeader
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): tendermint.abci.types.PartSetHeader;
      }

      /** Properties of a Validator. */
      interface IValidator {
        /** Validator address */
        address?: Uint8Array | null;

        /** Validator power */
        power?: Long | null;
      }

      /** Represents a Validator. */
      class Validator implements IValidator {
        /**
         * Constructs a new Validator.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IValidator);

        /** Validator address. */
        public address: Uint8Array;

        /** Validator power. */
        public power: Long;

        /**
         * Creates a new Validator instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Validator instance
         */
        public static create(properties?: tendermint.abci.types.IValidator): tendermint.abci.types.Validator;

        /**
         * Encodes the specified Validator message. Does not implicitly {@link tendermint.abci.types.Validator.verify|verify} messages.
         * @param m Validator message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: tendermint.abci.types.IValidator, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Validator message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns Validator
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: $protobuf.Reader | Uint8Array, l?: number): tendermint.abci.types.Validator;
      }

      /** Properties of a ValidatorUpdate. */
      interface IValidatorUpdate {
        /** ValidatorUpdate pubKey */
        pubKey?: tendermint.abci.types.IPubKey | null;

        /** ValidatorUpdate power */
        power?: Long | null;
      }

      /** Represents a ValidatorUpdate. */
      class ValidatorUpdate implements IValidatorUpdate {
        /**
         * Constructs a new ValidatorUpdate.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IValidatorUpdate);

        /** ValidatorUpdate pubKey. */
        public pubKey?: tendermint.abci.types.IPubKey | null;

        /** ValidatorUpdate power. */
        public power: Long;

        /**
         * Creates a new ValidatorUpdate instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ValidatorUpdate instance
         */
        public static create(
          properties?: tendermint.abci.types.IValidatorUpdate,
        ): tendermint.abci.types.ValidatorUpdate;

        /**
         * Encodes the specified ValidatorUpdate message. Does not implicitly {@link tendermint.abci.types.ValidatorUpdate.verify|verify} messages.
         * @param m ValidatorUpdate message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(
          m: tendermint.abci.types.IValidatorUpdate,
          w?: $protobuf.Writer,
        ): $protobuf.Writer;

        /**
         * Decodes a ValidatorUpdate message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns ValidatorUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(
          r: $protobuf.Reader | Uint8Array,
          l?: number,
        ): tendermint.abci.types.ValidatorUpdate;
      }

      /** Properties of a VoteInfo. */
      interface IVoteInfo {
        /** VoteInfo validator */
        validator?: tendermint.abci.types.IValidator | null;

        /** VoteInfo signedLastBlock */
        signedLastBlock?: boolean | null;
      }

      /** Represents a VoteInfo. */
      class VoteInfo implements IVoteInfo {
        /**
         * Constructs a new VoteInfo.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IVoteInfo);

        /** VoteInfo validator. */
        public validator?: tendermint.abci.types.IValidator | null;

        /** VoteInfo signedLastBlock. */
        public signedLastBlock: boolean;

        /**
         * Creates a new VoteInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns VoteInfo instance
         */
        public static create(properties?: tendermint.abci.types.IVoteInfo): tendermint.abci.types.VoteInfo;

        /**
         * Encodes the specified VoteInfo message. Does not implicitly {@link tendermint.abci.types.VoteInfo.verify|verify} messages.
         * @param m VoteInfo message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: tendermint.abci.types.IVoteInfo, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a VoteInfo message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns VoteInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: $protobuf.Reader | Uint8Array, l?: number): tendermint.abci.types.VoteInfo;
      }

      /** Properties of a PubKey. */
      interface IPubKey {
        /** PubKey type */
        type?: string | null;

        /** PubKey data */
        data?: Uint8Array | null;
      }

      /** Represents a PubKey. */
      class PubKey implements IPubKey {
        /**
         * Constructs a new PubKey.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IPubKey);

        /** PubKey type. */
        public type: string;

        /** PubKey data. */
        public data: Uint8Array;

        /**
         * Creates a new PubKey instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PubKey instance
         */
        public static create(properties?: tendermint.abci.types.IPubKey): tendermint.abci.types.PubKey;

        /**
         * Encodes the specified PubKey message. Does not implicitly {@link tendermint.abci.types.PubKey.verify|verify} messages.
         * @param m PubKey message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: tendermint.abci.types.IPubKey, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PubKey message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns PubKey
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: $protobuf.Reader | Uint8Array, l?: number): tendermint.abci.types.PubKey;
      }

      /** Properties of an Evidence. */
      interface IEvidence {
        /** Evidence type */
        type?: string | null;

        /** Evidence validator */
        validator?: tendermint.abci.types.IValidator | null;

        /** Evidence height */
        height?: Long | null;

        /** Evidence time */
        time?: google.protobuf.ITimestamp | null;

        /** Evidence totalVotingPower */
        totalVotingPower?: Long | null;
      }

      /** Represents an Evidence. */
      class Evidence implements IEvidence {
        /**
         * Constructs a new Evidence.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.abci.types.IEvidence);

        /** Evidence type. */
        public type: string;

        /** Evidence validator. */
        public validator?: tendermint.abci.types.IValidator | null;

        /** Evidence height. */
        public height: Long;

        /** Evidence time. */
        public time?: google.protobuf.ITimestamp | null;

        /** Evidence totalVotingPower. */
        public totalVotingPower: Long;

        /**
         * Creates a new Evidence instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Evidence instance
         */
        public static create(properties?: tendermint.abci.types.IEvidence): tendermint.abci.types.Evidence;

        /**
         * Encodes the specified Evidence message. Does not implicitly {@link tendermint.abci.types.Evidence.verify|verify} messages.
         * @param m Evidence message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: tendermint.abci.types.IEvidence, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Evidence message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns Evidence
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: $protobuf.Reader | Uint8Array, l?: number): tendermint.abci.types.Evidence;
      }

      /** Represents a ABCIApplication */
      class ABCIApplication extends $protobuf.rpc.Service {
        /**
         * Constructs a new ABCIApplication service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Creates new ABCIApplication service using the specified rpc implementation.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         * @returns RPC service. Useful where requests and/or responses are streamed.
         */
        public static create(
          rpcImpl: $protobuf.RPCImpl,
          requestDelimited?: boolean,
          responseDelimited?: boolean,
        ): ABCIApplication;

        /**
         * Calls Echo.
         * @param request RequestEcho message or plain object
         * @param callback Node-style callback called with the error, if any, and ResponseEcho
         */
        public echo(
          request: tendermint.abci.types.IRequestEcho,
          callback: tendermint.abci.types.ABCIApplication.EchoCallback,
        ): void;

        /**
         * Calls Echo.
         * @param request RequestEcho message or plain object
         * @returns Promise
         */
        public echo(request: tendermint.abci.types.IRequestEcho): Promise<tendermint.abci.types.ResponseEcho>;

        /**
         * Calls Flush.
         * @param request RequestFlush message or plain object
         * @param callback Node-style callback called with the error, if any, and ResponseFlush
         */
        public flush(
          request: tendermint.abci.types.IRequestFlush,
          callback: tendermint.abci.types.ABCIApplication.FlushCallback,
        ): void;

        /**
         * Calls Flush.
         * @param request RequestFlush message or plain object
         * @returns Promise
         */
        public flush(
          request: tendermint.abci.types.IRequestFlush,
        ): Promise<tendermint.abci.types.ResponseFlush>;

        /**
         * Calls Info.
         * @param request RequestInfo message or plain object
         * @param callback Node-style callback called with the error, if any, and ResponseInfo
         */
        public info(
          request: tendermint.abci.types.IRequestInfo,
          callback: tendermint.abci.types.ABCIApplication.InfoCallback,
        ): void;

        /**
         * Calls Info.
         * @param request RequestInfo message or plain object
         * @returns Promise
         */
        public info(request: tendermint.abci.types.IRequestInfo): Promise<tendermint.abci.types.ResponseInfo>;

        /**
         * Calls SetOption.
         * @param request RequestSetOption message or plain object
         * @param callback Node-style callback called with the error, if any, and ResponseSetOption
         */
        public setOption(
          request: tendermint.abci.types.IRequestSetOption,
          callback: tendermint.abci.types.ABCIApplication.SetOptionCallback,
        ): void;

        /**
         * Calls SetOption.
         * @param request RequestSetOption message or plain object
         * @returns Promise
         */
        public setOption(
          request: tendermint.abci.types.IRequestSetOption,
        ): Promise<tendermint.abci.types.ResponseSetOption>;

        /**
         * Calls DeliverTx.
         * @param request RequestDeliverTx message or plain object
         * @param callback Node-style callback called with the error, if any, and ResponseDeliverTx
         */
        public deliverTx(
          request: tendermint.abci.types.IRequestDeliverTx,
          callback: tendermint.abci.types.ABCIApplication.DeliverTxCallback,
        ): void;

        /**
         * Calls DeliverTx.
         * @param request RequestDeliverTx message or plain object
         * @returns Promise
         */
        public deliverTx(
          request: tendermint.abci.types.IRequestDeliverTx,
        ): Promise<tendermint.abci.types.ResponseDeliverTx>;

        /**
         * Calls CheckTx.
         * @param request RequestCheckTx message or plain object
         * @param callback Node-style callback called with the error, if any, and ResponseCheckTx
         */
        public checkTx(
          request: tendermint.abci.types.IRequestCheckTx,
          callback: tendermint.abci.types.ABCIApplication.CheckTxCallback,
        ): void;

        /**
         * Calls CheckTx.
         * @param request RequestCheckTx message or plain object
         * @returns Promise
         */
        public checkTx(
          request: tendermint.abci.types.IRequestCheckTx,
        ): Promise<tendermint.abci.types.ResponseCheckTx>;

        /**
         * Calls Query.
         * @param request RequestQuery message or plain object
         * @param callback Node-style callback called with the error, if any, and ResponseQuery
         */
        public query(
          request: tendermint.abci.types.IRequestQuery,
          callback: tendermint.abci.types.ABCIApplication.QueryCallback,
        ): void;

        /**
         * Calls Query.
         * @param request RequestQuery message or plain object
         * @returns Promise
         */
        public query(
          request: tendermint.abci.types.IRequestQuery,
        ): Promise<tendermint.abci.types.ResponseQuery>;

        /**
         * Calls Commit.
         * @param request RequestCommit message or plain object
         * @param callback Node-style callback called with the error, if any, and ResponseCommit
         */
        public commit(
          request: tendermint.abci.types.IRequestCommit,
          callback: tendermint.abci.types.ABCIApplication.CommitCallback,
        ): void;

        /**
         * Calls Commit.
         * @param request RequestCommit message or plain object
         * @returns Promise
         */
        public commit(
          request: tendermint.abci.types.IRequestCommit,
        ): Promise<tendermint.abci.types.ResponseCommit>;

        /**
         * Calls InitChain.
         * @param request RequestInitChain message or plain object
         * @param callback Node-style callback called with the error, if any, and ResponseInitChain
         */
        public initChain(
          request: tendermint.abci.types.IRequestInitChain,
          callback: tendermint.abci.types.ABCIApplication.InitChainCallback,
        ): void;

        /**
         * Calls InitChain.
         * @param request RequestInitChain message or plain object
         * @returns Promise
         */
        public initChain(
          request: tendermint.abci.types.IRequestInitChain,
        ): Promise<tendermint.abci.types.ResponseInitChain>;

        /**
         * Calls BeginBlock.
         * @param request RequestBeginBlock message or plain object
         * @param callback Node-style callback called with the error, if any, and ResponseBeginBlock
         */
        public beginBlock(
          request: tendermint.abci.types.IRequestBeginBlock,
          callback: tendermint.abci.types.ABCIApplication.BeginBlockCallback,
        ): void;

        /**
         * Calls BeginBlock.
         * @param request RequestBeginBlock message or plain object
         * @returns Promise
         */
        public beginBlock(
          request: tendermint.abci.types.IRequestBeginBlock,
        ): Promise<tendermint.abci.types.ResponseBeginBlock>;

        /**
         * Calls EndBlock.
         * @param request RequestEndBlock message or plain object
         * @param callback Node-style callback called with the error, if any, and ResponseEndBlock
         */
        public endBlock(
          request: tendermint.abci.types.IRequestEndBlock,
          callback: tendermint.abci.types.ABCIApplication.EndBlockCallback,
        ): void;

        /**
         * Calls EndBlock.
         * @param request RequestEndBlock message or plain object
         * @returns Promise
         */
        public endBlock(
          request: tendermint.abci.types.IRequestEndBlock,
        ): Promise<tendermint.abci.types.ResponseEndBlock>;
      }

      namespace ABCIApplication {
        /**
         * Callback as used by {@link tendermint.abci.types.ABCIApplication#echo}.
         * @param error Error, if any
         * @param [response] ResponseEcho
         */
        type EchoCallback = (error: Error | null, response?: tendermint.abci.types.ResponseEcho) => void;

        /**
         * Callback as used by {@link tendermint.abci.types.ABCIApplication#flush}.
         * @param error Error, if any
         * @param [response] ResponseFlush
         */
        type FlushCallback = (error: Error | null, response?: tendermint.abci.types.ResponseFlush) => void;

        /**
         * Callback as used by {@link tendermint.abci.types.ABCIApplication#info}.
         * @param error Error, if any
         * @param [response] ResponseInfo
         */
        type InfoCallback = (error: Error | null, response?: tendermint.abci.types.ResponseInfo) => void;

        /**
         * Callback as used by {@link tendermint.abci.types.ABCIApplication#setOption}.
         * @param error Error, if any
         * @param [response] ResponseSetOption
         */
        type SetOptionCallback = (
          error: Error | null,
          response?: tendermint.abci.types.ResponseSetOption,
        ) => void;

        /**
         * Callback as used by {@link tendermint.abci.types.ABCIApplication#deliverTx}.
         * @param error Error, if any
         * @param [response] ResponseDeliverTx
         */
        type DeliverTxCallback = (
          error: Error | null,
          response?: tendermint.abci.types.ResponseDeliverTx,
        ) => void;

        /**
         * Callback as used by {@link tendermint.abci.types.ABCIApplication#checkTx}.
         * @param error Error, if any
         * @param [response] ResponseCheckTx
         */
        type CheckTxCallback = (
          error: Error | null,
          response?: tendermint.abci.types.ResponseCheckTx,
        ) => void;

        /**
         * Callback as used by {@link tendermint.abci.types.ABCIApplication#query}.
         * @param error Error, if any
         * @param [response] ResponseQuery
         */
        type QueryCallback = (error: Error | null, response?: tendermint.abci.types.ResponseQuery) => void;

        /**
         * Callback as used by {@link tendermint.abci.types.ABCIApplication#commit}.
         * @param error Error, if any
         * @param [response] ResponseCommit
         */
        type CommitCallback = (error: Error | null, response?: tendermint.abci.types.ResponseCommit) => void;

        /**
         * Callback as used by {@link tendermint.abci.types.ABCIApplication#initChain}.
         * @param error Error, if any
         * @param [response] ResponseInitChain
         */
        type InitChainCallback = (
          error: Error | null,
          response?: tendermint.abci.types.ResponseInitChain,
        ) => void;

        /**
         * Callback as used by {@link tendermint.abci.types.ABCIApplication#beginBlock}.
         * @param error Error, if any
         * @param [response] ResponseBeginBlock
         */
        type BeginBlockCallback = (
          error: Error | null,
          response?: tendermint.abci.types.ResponseBeginBlock,
        ) => void;

        /**
         * Callback as used by {@link tendermint.abci.types.ABCIApplication#endBlock}.
         * @param error Error, if any
         * @param [response] ResponseEndBlock
         */
        type EndBlockCallback = (
          error: Error | null,
          response?: tendermint.abci.types.ResponseEndBlock,
        ) => void;
      }
    }
  }

  /** Namespace crypto. */
  namespace crypto {
    /** Namespace merkle. */
    namespace merkle {
      /** Properties of a ProofOp. */
      interface IProofOp {
        /** ProofOp type */
        type?: string | null;

        /** ProofOp key */
        key?: Uint8Array | null;

        /** ProofOp data */
        data?: Uint8Array | null;
      }

      /** Represents a ProofOp. */
      class ProofOp implements IProofOp {
        /**
         * Constructs a new ProofOp.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.crypto.merkle.IProofOp);

        /** ProofOp type. */
        public type: string;

        /** ProofOp key. */
        public key: Uint8Array;

        /** ProofOp data. */
        public data: Uint8Array;

        /**
         * Creates a new ProofOp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ProofOp instance
         */
        public static create(
          properties?: tendermint.crypto.merkle.IProofOp,
        ): tendermint.crypto.merkle.ProofOp;

        /**
         * Encodes the specified ProofOp message. Does not implicitly {@link tendermint.crypto.merkle.ProofOp.verify|verify} messages.
         * @param m ProofOp message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: tendermint.crypto.merkle.IProofOp, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ProofOp message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns ProofOp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: $protobuf.Reader | Uint8Array, l?: number): tendermint.crypto.merkle.ProofOp;
      }

      /** Properties of a Proof. */
      interface IProof {
        /** Proof ops */
        ops?: tendermint.crypto.merkle.IProofOp[] | null;
      }

      /** Represents a Proof. */
      class Proof implements IProof {
        /**
         * Constructs a new Proof.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.crypto.merkle.IProof);

        /** Proof ops. */
        public ops: tendermint.crypto.merkle.IProofOp[];

        /**
         * Creates a new Proof instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Proof instance
         */
        public static create(properties?: tendermint.crypto.merkle.IProof): tendermint.crypto.merkle.Proof;

        /**
         * Encodes the specified Proof message. Does not implicitly {@link tendermint.crypto.merkle.Proof.verify|verify} messages.
         * @param m Proof message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: tendermint.crypto.merkle.IProof, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Proof message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns Proof
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: $protobuf.Reader | Uint8Array, l?: number): tendermint.crypto.merkle.Proof;
      }
    }
  }

  /** Namespace libs. */
  namespace libs {
    /** Namespace kv. */
    namespace kv {
      /** Properties of a Pair. */
      interface IPair {
        /** Pair key */
        key?: Uint8Array | null;

        /** Pair value */
        value?: Uint8Array | null;
      }

      /** Represents a Pair. */
      class Pair implements IPair {
        /**
         * Constructs a new Pair.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.libs.kv.IPair);

        /** Pair key. */
        public key: Uint8Array;

        /** Pair value. */
        public value: Uint8Array;

        /**
         * Creates a new Pair instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Pair instance
         */
        public static create(properties?: tendermint.libs.kv.IPair): tendermint.libs.kv.Pair;

        /**
         * Encodes the specified Pair message. Does not implicitly {@link tendermint.libs.kv.Pair.verify|verify} messages.
         * @param m Pair message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: tendermint.libs.kv.IPair, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Pair message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns Pair
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: $protobuf.Reader | Uint8Array, l?: number): tendermint.libs.kv.Pair;
      }

      /** Properties of a KI64Pair. */
      interface IKI64Pair {
        /** KI64Pair key */
        key?: Uint8Array | null;

        /** KI64Pair value */
        value?: Long | null;
      }

      /** Represents a KI64Pair. */
      class KI64Pair implements IKI64Pair {
        /**
         * Constructs a new KI64Pair.
         * @param [p] Properties to set
         */
        constructor(p?: tendermint.libs.kv.IKI64Pair);

        /** KI64Pair key. */
        public key: Uint8Array;

        /** KI64Pair value. */
        public value: Long;

        /**
         * Creates a new KI64Pair instance using the specified properties.
         * @param [properties] Properties to set
         * @returns KI64Pair instance
         */
        public static create(properties?: tendermint.libs.kv.IKI64Pair): tendermint.libs.kv.KI64Pair;

        /**
         * Encodes the specified KI64Pair message. Does not implicitly {@link tendermint.libs.kv.KI64Pair.verify|verify} messages.
         * @param m KI64Pair message or plain object to encode
         * @param [w] Writer to encode to
         * @returns Writer
         */
        public static encode(m: tendermint.libs.kv.IKI64Pair, w?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a KI64Pair message from the specified reader or buffer.
         * @param r Reader or buffer to decode from
         * @param [l] Message length if known beforehand
         * @returns KI64Pair
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(r: $protobuf.Reader | Uint8Array, l?: number): tendermint.libs.kv.KI64Pair;
      }
    }
  }
}

/** Namespace google. */
export namespace google {
  /** Namespace protobuf. */
  namespace protobuf {
    /** Properties of an Any. */
    interface IAny {
      /** Any type_url */
      type_url?: string | null;

      /** Any value */
      value?: Uint8Array | null;
    }

    /** Represents an Any. */
    class Any implements IAny {
      /**
       * Constructs a new Any.
       * @param [p] Properties to set
       */
      constructor(p?: google.protobuf.IAny);

      /** Any type_url. */
      public type_url: string;

      /** Any value. */
      public value: Uint8Array;

      /**
       * Creates a new Any instance using the specified properties.
       * @param [properties] Properties to set
       * @returns Any instance
       */
      public static create(properties?: google.protobuf.IAny): google.protobuf.Any;

      /**
       * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
       * @param m Any message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: google.protobuf.IAny, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes an Any message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns Any
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): google.protobuf.Any;
    }

    /** Properties of a Timestamp. */
    interface ITimestamp {
      /** Timestamp seconds */
      seconds?: Long | null;

      /** Timestamp nanos */
      nanos?: number | null;
    }

    /** Represents a Timestamp. */
    class Timestamp implements ITimestamp {
      /**
       * Constructs a new Timestamp.
       * @param [p] Properties to set
       */
      constructor(p?: google.protobuf.ITimestamp);

      /** Timestamp seconds. */
      public seconds: Long;

      /** Timestamp nanos. */
      public nanos: number;

      /**
       * Creates a new Timestamp instance using the specified properties.
       * @param [properties] Properties to set
       * @returns Timestamp instance
       */
      public static create(properties?: google.protobuf.ITimestamp): google.protobuf.Timestamp;

      /**
       * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
       * @param m Timestamp message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: google.protobuf.ITimestamp, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes a Timestamp message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns Timestamp
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): google.protobuf.Timestamp;
    }

    /** Properties of a Duration. */
    interface IDuration {
      /** Duration seconds */
      seconds?: Long | null;

      /** Duration nanos */
      nanos?: number | null;
    }

    /** Represents a Duration. */
    class Duration implements IDuration {
      /**
       * Constructs a new Duration.
       * @param [p] Properties to set
       */
      constructor(p?: google.protobuf.IDuration);

      /** Duration seconds. */
      public seconds: Long;

      /** Duration nanos. */
      public nanos: number;

      /**
       * Creates a new Duration instance using the specified properties.
       * @param [properties] Properties to set
       * @returns Duration instance
       */
      public static create(properties?: google.protobuf.IDuration): google.protobuf.Duration;

      /**
       * Encodes the specified Duration message. Does not implicitly {@link google.protobuf.Duration.verify|verify} messages.
       * @param m Duration message or plain object to encode
       * @param [w] Writer to encode to
       * @returns Writer
       */
      public static encode(m: google.protobuf.IDuration, w?: $protobuf.Writer): $protobuf.Writer;

      /**
       * Decodes a Duration message from the specified reader or buffer.
       * @param r Reader or buffer to decode from
       * @param [l] Message length if known beforehand
       * @returns Duration
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      public static decode(r: $protobuf.Reader | Uint8Array, l?: number): google.protobuf.Duration;
    }
  }
}
