/* eslint-disable */
import { Duration } from "../../../../google/protobuf/duration";
import { Height } from "../../../../ibc/core/client/v1/client";
import { MerkleRoot } from "../../../../ibc/core/commitment/v1/commitment";
import { SignedHeader } from "../../../../tendermint/types/types";
import { ValidatorSet } from "../../../../tendermint/types/validator";
import Long from "long";
import { Timestamp } from "../../../../google/protobuf/timestamp";
import { ProofSpec } from "../../../../confio/proofs";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "ibc.lightclients.tendermint.v1";

/**
 * ClientState from Tendermint tracks the current validator set, latest height,
 * and a possible frozen height.
 */
export interface ClientState {
  chainId: string;
  trustLevel?: Fraction;
  /**
   * duration of the period since the LastestTimestamp during which the
   * submitted headers are valid for upgrade
   */
  trustingPeriod?: Duration;
  /** duration of the staking unbonding period */
  unbondingPeriod?: Duration;
  /** defines how much new (untrusted) header's Time can drift into the future. */
  maxClockDrift?: Duration;
  /** Block height when the client was frozen due to a misbehaviour */
  frozenHeight?: Height;
  /** Latest height the client was updated to */
  latestHeight?: Height;
  /** Proof specifications used in verifying counterparty state */
  proofSpecs: ProofSpec[];
  /**
   * Path at which next upgraded client will be committed.
   * Each element corresponds to the key for a single CommitmentProof in the chained proof.
   * NOTE: ClientState must stored under `{upgradePath}/{upgradeHeight}/clientState`
   * ConsensusState must be stored under `{upgradepath}/{upgradeHeight}/consensusState`
   * For SDK chains using the default upgrade module, upgrade_path should be []string{"upgrade", "upgradedIBCState"}`
   */
  upgradePath: string[];
  /**
   * This flag, when set to true, will allow governance to recover a client
   * which has expired
   */
  allowUpdateAfterExpiry: boolean;
  /**
   * This flag, when set to true, will allow governance to unfreeze a client
   * whose chain has experienced a misbehaviour event
   */
  allowUpdateAfterMisbehaviour: boolean;
}

/** ConsensusState defines the consensus state from Tendermint. */
export interface ConsensusState {
  /**
   * timestamp that corresponds to the block height in which the ConsensusState
   * was stored.
   */
  timestamp?: Date;
  /** commitment root (i.e app hash) */
  root?: MerkleRoot;
  nextValidatorsHash: Uint8Array;
}

/**
 * Misbehaviour is a wrapper over two conflicting Headers
 * that implements Misbehaviour interface expected by ICS-02
 */
export interface Misbehaviour {
  clientId: string;
  header1?: Header;
  header2?: Header;
}

/**
 * Header defines the Tendermint client consensus Header.
 * It encapsulates all the information necessary to update from a trusted
 * Tendermint ConsensusState. The inclusion of TrustedHeight and
 * TrustedValidators allows this update to process correctly, so long as the
 * ConsensusState for the TrustedHeight exists, this removes race conditions
 * among relayers The SignedHeader and ValidatorSet are the new untrusted update
 * fields for the client. The TrustedHeight is the height of a stored
 * ConsensusState on the client that will be used to verify the new untrusted
 * header. The Trusted ConsensusState must be within the unbonding period of
 * current time in order to correctly verify, and the TrustedValidators must
 * hash to TrustedConsensusState.NextValidatorsHash since that is the last
 * trusted validator set at the TrustedHeight.
 */
export interface Header {
  signedHeader?: SignedHeader;
  validatorSet?: ValidatorSet;
  trustedHeight?: Height;
  trustedValidators?: ValidatorSet;
}

/** Fraction defines the protobuf message type for tmmath.Fraction that only supports positive values. */
export interface Fraction {
  numerator: Long;
  denominator: Long;
}

const baseClientState: object = {
  chainId: "",
  upgradePath: "",
  allowUpdateAfterExpiry: false,
  allowUpdateAfterMisbehaviour: false,
};

export const ClientState = {
  encode(message: ClientState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chainId !== "") {
      writer.uint32(10).string(message.chainId);
    }
    if (message.trustLevel !== undefined) {
      Fraction.encode(message.trustLevel, writer.uint32(18).fork()).ldelim();
    }
    if (message.trustingPeriod !== undefined) {
      Duration.encode(message.trustingPeriod, writer.uint32(26).fork()).ldelim();
    }
    if (message.unbondingPeriod !== undefined) {
      Duration.encode(message.unbondingPeriod, writer.uint32(34).fork()).ldelim();
    }
    if (message.maxClockDrift !== undefined) {
      Duration.encode(message.maxClockDrift, writer.uint32(42).fork()).ldelim();
    }
    if (message.frozenHeight !== undefined) {
      Height.encode(message.frozenHeight, writer.uint32(50).fork()).ldelim();
    }
    if (message.latestHeight !== undefined) {
      Height.encode(message.latestHeight, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.proofSpecs) {
      ProofSpec.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.upgradePath) {
      writer.uint32(74).string(v!);
    }
    if (message.allowUpdateAfterExpiry === true) {
      writer.uint32(80).bool(message.allowUpdateAfterExpiry);
    }
    if (message.allowUpdateAfterMisbehaviour === true) {
      writer.uint32(88).bool(message.allowUpdateAfterMisbehaviour);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClientState {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseClientState } as ClientState;
    message.proofSpecs = [];
    message.upgradePath = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.chainId = reader.string();
          break;
        case 2:
          message.trustLevel = Fraction.decode(reader, reader.uint32());
          break;
        case 3:
          message.trustingPeriod = Duration.decode(reader, reader.uint32());
          break;
        case 4:
          message.unbondingPeriod = Duration.decode(reader, reader.uint32());
          break;
        case 5:
          message.maxClockDrift = Duration.decode(reader, reader.uint32());
          break;
        case 6:
          message.frozenHeight = Height.decode(reader, reader.uint32());
          break;
        case 7:
          message.latestHeight = Height.decode(reader, reader.uint32());
          break;
        case 8:
          message.proofSpecs.push(ProofSpec.decode(reader, reader.uint32()));
          break;
        case 9:
          message.upgradePath.push(reader.string());
          break;
        case 10:
          message.allowUpdateAfterExpiry = reader.bool();
          break;
        case 11:
          message.allowUpdateAfterMisbehaviour = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ClientState {
    const message = { ...baseClientState } as ClientState;
    message.proofSpecs = [];
    message.upgradePath = [];
    if (object.chainId !== undefined && object.chainId !== null) {
      message.chainId = String(object.chainId);
    } else {
      message.chainId = "";
    }
    if (object.trustLevel !== undefined && object.trustLevel !== null) {
      message.trustLevel = Fraction.fromJSON(object.trustLevel);
    } else {
      message.trustLevel = undefined;
    }
    if (object.trustingPeriod !== undefined && object.trustingPeriod !== null) {
      message.trustingPeriod = Duration.fromJSON(object.trustingPeriod);
    } else {
      message.trustingPeriod = undefined;
    }
    if (object.unbondingPeriod !== undefined && object.unbondingPeriod !== null) {
      message.unbondingPeriod = Duration.fromJSON(object.unbondingPeriod);
    } else {
      message.unbondingPeriod = undefined;
    }
    if (object.maxClockDrift !== undefined && object.maxClockDrift !== null) {
      message.maxClockDrift = Duration.fromJSON(object.maxClockDrift);
    } else {
      message.maxClockDrift = undefined;
    }
    if (object.frozenHeight !== undefined && object.frozenHeight !== null) {
      message.frozenHeight = Height.fromJSON(object.frozenHeight);
    } else {
      message.frozenHeight = undefined;
    }
    if (object.latestHeight !== undefined && object.latestHeight !== null) {
      message.latestHeight = Height.fromJSON(object.latestHeight);
    } else {
      message.latestHeight = undefined;
    }
    if (object.proofSpecs !== undefined && object.proofSpecs !== null) {
      for (const e of object.proofSpecs) {
        message.proofSpecs.push(ProofSpec.fromJSON(e));
      }
    }
    if (object.upgradePath !== undefined && object.upgradePath !== null) {
      for (const e of object.upgradePath) {
        message.upgradePath.push(String(e));
      }
    }
    if (object.allowUpdateAfterExpiry !== undefined && object.allowUpdateAfterExpiry !== null) {
      message.allowUpdateAfterExpiry = Boolean(object.allowUpdateAfterExpiry);
    } else {
      message.allowUpdateAfterExpiry = false;
    }
    if (object.allowUpdateAfterMisbehaviour !== undefined && object.allowUpdateAfterMisbehaviour !== null) {
      message.allowUpdateAfterMisbehaviour = Boolean(object.allowUpdateAfterMisbehaviour);
    } else {
      message.allowUpdateAfterMisbehaviour = false;
    }
    return message;
  },

  toJSON(message: ClientState): unknown {
    const obj: any = {};
    message.chainId !== undefined && (obj.chainId = message.chainId);
    message.trustLevel !== undefined &&
      (obj.trustLevel = message.trustLevel ? Fraction.toJSON(message.trustLevel) : undefined);
    message.trustingPeriod !== undefined &&
      (obj.trustingPeriod = message.trustingPeriod ? Duration.toJSON(message.trustingPeriod) : undefined);
    message.unbondingPeriod !== undefined &&
      (obj.unbondingPeriod = message.unbondingPeriod ? Duration.toJSON(message.unbondingPeriod) : undefined);
    message.maxClockDrift !== undefined &&
      (obj.maxClockDrift = message.maxClockDrift ? Duration.toJSON(message.maxClockDrift) : undefined);
    message.frozenHeight !== undefined &&
      (obj.frozenHeight = message.frozenHeight ? Height.toJSON(message.frozenHeight) : undefined);
    message.latestHeight !== undefined &&
      (obj.latestHeight = message.latestHeight ? Height.toJSON(message.latestHeight) : undefined);
    if (message.proofSpecs) {
      obj.proofSpecs = message.proofSpecs.map((e) => (e ? ProofSpec.toJSON(e) : undefined));
    } else {
      obj.proofSpecs = [];
    }
    if (message.upgradePath) {
      obj.upgradePath = message.upgradePath.map((e) => e);
    } else {
      obj.upgradePath = [];
    }
    message.allowUpdateAfterExpiry !== undefined &&
      (obj.allowUpdateAfterExpiry = message.allowUpdateAfterExpiry);
    message.allowUpdateAfterMisbehaviour !== undefined &&
      (obj.allowUpdateAfterMisbehaviour = message.allowUpdateAfterMisbehaviour);
    return obj;
  },

  fromPartial(object: DeepPartial<ClientState>): ClientState {
    const message = { ...baseClientState } as ClientState;
    message.proofSpecs = [];
    message.upgradePath = [];
    if (object.chainId !== undefined && object.chainId !== null) {
      message.chainId = object.chainId;
    } else {
      message.chainId = "";
    }
    if (object.trustLevel !== undefined && object.trustLevel !== null) {
      message.trustLevel = Fraction.fromPartial(object.trustLevel);
    } else {
      message.trustLevel = undefined;
    }
    if (object.trustingPeriod !== undefined && object.trustingPeriod !== null) {
      message.trustingPeriod = Duration.fromPartial(object.trustingPeriod);
    } else {
      message.trustingPeriod = undefined;
    }
    if (object.unbondingPeriod !== undefined && object.unbondingPeriod !== null) {
      message.unbondingPeriod = Duration.fromPartial(object.unbondingPeriod);
    } else {
      message.unbondingPeriod = undefined;
    }
    if (object.maxClockDrift !== undefined && object.maxClockDrift !== null) {
      message.maxClockDrift = Duration.fromPartial(object.maxClockDrift);
    } else {
      message.maxClockDrift = undefined;
    }
    if (object.frozenHeight !== undefined && object.frozenHeight !== null) {
      message.frozenHeight = Height.fromPartial(object.frozenHeight);
    } else {
      message.frozenHeight = undefined;
    }
    if (object.latestHeight !== undefined && object.latestHeight !== null) {
      message.latestHeight = Height.fromPartial(object.latestHeight);
    } else {
      message.latestHeight = undefined;
    }
    if (object.proofSpecs !== undefined && object.proofSpecs !== null) {
      for (const e of object.proofSpecs) {
        message.proofSpecs.push(ProofSpec.fromPartial(e));
      }
    }
    if (object.upgradePath !== undefined && object.upgradePath !== null) {
      for (const e of object.upgradePath) {
        message.upgradePath.push(e);
      }
    }
    if (object.allowUpdateAfterExpiry !== undefined && object.allowUpdateAfterExpiry !== null) {
      message.allowUpdateAfterExpiry = object.allowUpdateAfterExpiry;
    } else {
      message.allowUpdateAfterExpiry = false;
    }
    if (object.allowUpdateAfterMisbehaviour !== undefined && object.allowUpdateAfterMisbehaviour !== null) {
      message.allowUpdateAfterMisbehaviour = object.allowUpdateAfterMisbehaviour;
    } else {
      message.allowUpdateAfterMisbehaviour = false;
    }
    return message;
  },
};

const baseConsensusState: object = {};

export const ConsensusState = {
  encode(message: ConsensusState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(10).fork()).ldelim();
    }
    if (message.root !== undefined) {
      MerkleRoot.encode(message.root, writer.uint32(18).fork()).ldelim();
    }
    if (message.nextValidatorsHash.length !== 0) {
      writer.uint32(26).bytes(message.nextValidatorsHash);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ConsensusState {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseConsensusState } as ConsensusState;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 2:
          message.root = MerkleRoot.decode(reader, reader.uint32());
          break;
        case 3:
          message.nextValidatorsHash = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ConsensusState {
    const message = { ...baseConsensusState } as ConsensusState;
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = fromJsonTimestamp(object.timestamp);
    } else {
      message.timestamp = undefined;
    }
    if (object.root !== undefined && object.root !== null) {
      message.root = MerkleRoot.fromJSON(object.root);
    } else {
      message.root = undefined;
    }
    if (object.nextValidatorsHash !== undefined && object.nextValidatorsHash !== null) {
      message.nextValidatorsHash = bytesFromBase64(object.nextValidatorsHash);
    }
    return message;
  },

  toJSON(message: ConsensusState): unknown {
    const obj: any = {};
    message.timestamp !== undefined &&
      (obj.timestamp = message.timestamp !== undefined ? message.timestamp.toISOString() : null);
    message.root !== undefined && (obj.root = message.root ? MerkleRoot.toJSON(message.root) : undefined);
    message.nextValidatorsHash !== undefined &&
      (obj.nextValidatorsHash = base64FromBytes(
        message.nextValidatorsHash !== undefined ? message.nextValidatorsHash : new Uint8Array(),
      ));
    return obj;
  },

  fromPartial(object: DeepPartial<ConsensusState>): ConsensusState {
    const message = { ...baseConsensusState } as ConsensusState;
    if (object.timestamp !== undefined && object.timestamp !== null) {
      message.timestamp = object.timestamp;
    } else {
      message.timestamp = undefined;
    }
    if (object.root !== undefined && object.root !== null) {
      message.root = MerkleRoot.fromPartial(object.root);
    } else {
      message.root = undefined;
    }
    if (object.nextValidatorsHash !== undefined && object.nextValidatorsHash !== null) {
      message.nextValidatorsHash = object.nextValidatorsHash;
    } else {
      message.nextValidatorsHash = new Uint8Array();
    }
    return message;
  },
};

const baseMisbehaviour: object = { clientId: "" };

export const Misbehaviour = {
  encode(message: Misbehaviour, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.clientId !== "") {
      writer.uint32(10).string(message.clientId);
    }
    if (message.header1 !== undefined) {
      Header.encode(message.header1, writer.uint32(18).fork()).ldelim();
    }
    if (message.header2 !== undefined) {
      Header.encode(message.header2, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Misbehaviour {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMisbehaviour } as Misbehaviour;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clientId = reader.string();
          break;
        case 2:
          message.header1 = Header.decode(reader, reader.uint32());
          break;
        case 3:
          message.header2 = Header.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Misbehaviour {
    const message = { ...baseMisbehaviour } as Misbehaviour;
    if (object.clientId !== undefined && object.clientId !== null) {
      message.clientId = String(object.clientId);
    } else {
      message.clientId = "";
    }
    if (object.header1 !== undefined && object.header1 !== null) {
      message.header1 = Header.fromJSON(object.header1);
    } else {
      message.header1 = undefined;
    }
    if (object.header2 !== undefined && object.header2 !== null) {
      message.header2 = Header.fromJSON(object.header2);
    } else {
      message.header2 = undefined;
    }
    return message;
  },

  toJSON(message: Misbehaviour): unknown {
    const obj: any = {};
    message.clientId !== undefined && (obj.clientId = message.clientId);
    message.header1 !== undefined &&
      (obj.header1 = message.header1 ? Header.toJSON(message.header1) : undefined);
    message.header2 !== undefined &&
      (obj.header2 = message.header2 ? Header.toJSON(message.header2) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<Misbehaviour>): Misbehaviour {
    const message = { ...baseMisbehaviour } as Misbehaviour;
    if (object.clientId !== undefined && object.clientId !== null) {
      message.clientId = object.clientId;
    } else {
      message.clientId = "";
    }
    if (object.header1 !== undefined && object.header1 !== null) {
      message.header1 = Header.fromPartial(object.header1);
    } else {
      message.header1 = undefined;
    }
    if (object.header2 !== undefined && object.header2 !== null) {
      message.header2 = Header.fromPartial(object.header2);
    } else {
      message.header2 = undefined;
    }
    return message;
  },
};

const baseHeader: object = {};

export const Header = {
  encode(message: Header, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signedHeader !== undefined) {
      SignedHeader.encode(message.signedHeader, writer.uint32(10).fork()).ldelim();
    }
    if (message.validatorSet !== undefined) {
      ValidatorSet.encode(message.validatorSet, writer.uint32(18).fork()).ldelim();
    }
    if (message.trustedHeight !== undefined) {
      Height.encode(message.trustedHeight, writer.uint32(26).fork()).ldelim();
    }
    if (message.trustedValidators !== undefined) {
      ValidatorSet.encode(message.trustedValidators, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Header {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseHeader } as Header;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.signedHeader = SignedHeader.decode(reader, reader.uint32());
          break;
        case 2:
          message.validatorSet = ValidatorSet.decode(reader, reader.uint32());
          break;
        case 3:
          message.trustedHeight = Height.decode(reader, reader.uint32());
          break;
        case 4:
          message.trustedValidators = ValidatorSet.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Header {
    const message = { ...baseHeader } as Header;
    if (object.signedHeader !== undefined && object.signedHeader !== null) {
      message.signedHeader = SignedHeader.fromJSON(object.signedHeader);
    } else {
      message.signedHeader = undefined;
    }
    if (object.validatorSet !== undefined && object.validatorSet !== null) {
      message.validatorSet = ValidatorSet.fromJSON(object.validatorSet);
    } else {
      message.validatorSet = undefined;
    }
    if (object.trustedHeight !== undefined && object.trustedHeight !== null) {
      message.trustedHeight = Height.fromJSON(object.trustedHeight);
    } else {
      message.trustedHeight = undefined;
    }
    if (object.trustedValidators !== undefined && object.trustedValidators !== null) {
      message.trustedValidators = ValidatorSet.fromJSON(object.trustedValidators);
    } else {
      message.trustedValidators = undefined;
    }
    return message;
  },

  toJSON(message: Header): unknown {
    const obj: any = {};
    message.signedHeader !== undefined &&
      (obj.signedHeader = message.signedHeader ? SignedHeader.toJSON(message.signedHeader) : undefined);
    message.validatorSet !== undefined &&
      (obj.validatorSet = message.validatorSet ? ValidatorSet.toJSON(message.validatorSet) : undefined);
    message.trustedHeight !== undefined &&
      (obj.trustedHeight = message.trustedHeight ? Height.toJSON(message.trustedHeight) : undefined);
    message.trustedValidators !== undefined &&
      (obj.trustedValidators = message.trustedValidators
        ? ValidatorSet.toJSON(message.trustedValidators)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<Header>): Header {
    const message = { ...baseHeader } as Header;
    if (object.signedHeader !== undefined && object.signedHeader !== null) {
      message.signedHeader = SignedHeader.fromPartial(object.signedHeader);
    } else {
      message.signedHeader = undefined;
    }
    if (object.validatorSet !== undefined && object.validatorSet !== null) {
      message.validatorSet = ValidatorSet.fromPartial(object.validatorSet);
    } else {
      message.validatorSet = undefined;
    }
    if (object.trustedHeight !== undefined && object.trustedHeight !== null) {
      message.trustedHeight = Height.fromPartial(object.trustedHeight);
    } else {
      message.trustedHeight = undefined;
    }
    if (object.trustedValidators !== undefined && object.trustedValidators !== null) {
      message.trustedValidators = ValidatorSet.fromPartial(object.trustedValidators);
    } else {
      message.trustedValidators = undefined;
    }
    return message;
  },
};

const baseFraction: object = { numerator: Long.UZERO, denominator: Long.UZERO };

export const Fraction = {
  encode(message: Fraction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.numerator.isZero()) {
      writer.uint32(8).uint64(message.numerator);
    }
    if (!message.denominator.isZero()) {
      writer.uint32(16).uint64(message.denominator);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Fraction {
    const reader = input instanceof Uint8Array ? new _m0.Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseFraction } as Fraction;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.numerator = reader.uint64() as Long;
          break;
        case 2:
          message.denominator = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Fraction {
    const message = { ...baseFraction } as Fraction;
    if (object.numerator !== undefined && object.numerator !== null) {
      message.numerator = Long.fromString(object.numerator);
    } else {
      message.numerator = Long.UZERO;
    }
    if (object.denominator !== undefined && object.denominator !== null) {
      message.denominator = Long.fromString(object.denominator);
    } else {
      message.denominator = Long.UZERO;
    }
    return message;
  },

  toJSON(message: Fraction): unknown {
    const obj: any = {};
    message.numerator !== undefined && (obj.numerator = (message.numerator || Long.UZERO).toString());
    message.denominator !== undefined && (obj.denominator = (message.denominator || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<Fraction>): Fraction {
    const message = { ...baseFraction } as Fraction;
    if (object.numerator !== undefined && object.numerator !== null) {
      message.numerator = object.numerator as Long;
    } else {
      message.numerator = Long.UZERO;
    }
    if (object.denominator !== undefined && object.denominator !== null) {
      message.denominator = object.denominator as Long;
    } else {
      message.denominator = Long.UZERO;
    }
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob || ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (let i = 0; i < arr.byteLength; ++i) {
    bin.push(String.fromCharCode(arr[i]));
  }
  return btoa(bin.join(""));
}

type Builtin = Date | Function | Uint8Array | string | number | undefined | Long;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function toTimestamp(date: Date): Timestamp {
  const seconds = numberToLong(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds.toNumber() * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function numberToLong(number: number) {
  return Long.fromNumber(number);
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
