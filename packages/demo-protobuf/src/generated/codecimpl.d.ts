import * as $protobuf from "protobufjs";
/** Namespace cosmos_sdk. */
export namespace cosmos_sdk {

    /** Namespace codec. */
    namespace codec {

        /** Namespace v1. */
        namespace v1 {

            /** Properties of a Dog. */
            interface IDog {

                /** Dog size */
                size?: (string|null);

                /** Dog name */
                name?: (string|null);
            }

            /** Represents a Dog. */
            class Dog implements IDog {

                /**
                 * Constructs a new Dog.
                 * @param [p] Properties to set
                 */
                constructor(p?: cosmos_sdk.codec.v1.IDog);

                /** Dog size. */
                public size: string;

                /** Dog name. */
                public name: string;

                /**
                 * Creates a new Dog instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Dog instance
                 */
                public static create(properties?: cosmos_sdk.codec.v1.IDog): cosmos_sdk.codec.v1.Dog;

                /**
                 * Encodes the specified Dog message. Does not implicitly {@link cosmos_sdk.codec.v1.Dog.verify|verify} messages.
                 * @param m Dog message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: cosmos_sdk.codec.v1.IDog, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Dog message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns Dog
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.codec.v1.Dog;
            }

            /** Properties of a Cat. */
            interface ICat {

                /** Cat moniker */
                moniker?: (string|null);

                /** Cat lives */
                lives?: (number|null);
            }

            /** Represents a Cat. */
            class Cat implements ICat {

                /**
                 * Constructs a new Cat.
                 * @param [p] Properties to set
                 */
                constructor(p?: cosmos_sdk.codec.v1.ICat);

                /** Cat moniker. */
                public moniker: string;

                /** Cat lives. */
                public lives: number;

                /**
                 * Creates a new Cat instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Cat instance
                 */
                public static create(properties?: cosmos_sdk.codec.v1.ICat): cosmos_sdk.codec.v1.Cat;

                /**
                 * Encodes the specified Cat message. Does not implicitly {@link cosmos_sdk.codec.v1.Cat.verify|verify} messages.
                 * @param m Cat message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: cosmos_sdk.codec.v1.ICat, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Cat message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns Cat
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.codec.v1.Cat;
            }

            /** Properties of a HasAnimal. */
            interface IHasAnimal {

                /** HasAnimal animal */
                animal?: (google.protobuf.IAny|null);

                /** HasAnimal x */
                x?: (number|Long|null);
            }

            /** Represents a HasAnimal. */
            class HasAnimal implements IHasAnimal {

                /**
                 * Constructs a new HasAnimal.
                 * @param [p] Properties to set
                 */
                constructor(p?: cosmos_sdk.codec.v1.IHasAnimal);

                /** HasAnimal animal. */
                public animal?: (google.protobuf.IAny|null);

                /** HasAnimal x. */
                public x: (number|Long);

                /**
                 * Creates a new HasAnimal instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns HasAnimal instance
                 */
                public static create(properties?: cosmos_sdk.codec.v1.IHasAnimal): cosmos_sdk.codec.v1.HasAnimal;

                /**
                 * Encodes the specified HasAnimal message. Does not implicitly {@link cosmos_sdk.codec.v1.HasAnimal.verify|verify} messages.
                 * @param m HasAnimal message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: cosmos_sdk.codec.v1.IHasAnimal, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a HasAnimal message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns HasAnimal
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.codec.v1.HasAnimal;
            }

            /** Properties of a HasHasAnimal. */
            interface IHasHasAnimal {

                /** HasHasAnimal hasAnimal */
                hasAnimal?: (google.protobuf.IAny|null);
            }

            /** Represents a HasHasAnimal. */
            class HasHasAnimal implements IHasHasAnimal {

                /**
                 * Constructs a new HasHasAnimal.
                 * @param [p] Properties to set
                 */
                constructor(p?: cosmos_sdk.codec.v1.IHasHasAnimal);

                /** HasHasAnimal hasAnimal. */
                public hasAnimal?: (google.protobuf.IAny|null);

                /**
                 * Creates a new HasHasAnimal instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns HasHasAnimal instance
                 */
                public static create(properties?: cosmos_sdk.codec.v1.IHasHasAnimal): cosmos_sdk.codec.v1.HasHasAnimal;

                /**
                 * Encodes the specified HasHasAnimal message. Does not implicitly {@link cosmos_sdk.codec.v1.HasHasAnimal.verify|verify} messages.
                 * @param m HasHasAnimal message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: cosmos_sdk.codec.v1.IHasHasAnimal, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a HasHasAnimal message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns HasHasAnimal
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.codec.v1.HasHasAnimal;
            }

            /** Properties of a HasHasHasAnimal. */
            interface IHasHasHasAnimal {

                /** HasHasHasAnimal hasHasAnimal */
                hasHasAnimal?: (google.protobuf.IAny|null);
            }

            /** Represents a HasHasHasAnimal. */
            class HasHasHasAnimal implements IHasHasHasAnimal {

                /**
                 * Constructs a new HasHasHasAnimal.
                 * @param [p] Properties to set
                 */
                constructor(p?: cosmos_sdk.codec.v1.IHasHasHasAnimal);

                /** HasHasHasAnimal hasHasAnimal. */
                public hasHasAnimal?: (google.protobuf.IAny|null);

                /**
                 * Creates a new HasHasHasAnimal instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns HasHasHasAnimal instance
                 */
                public static create(properties?: cosmos_sdk.codec.v1.IHasHasHasAnimal): cosmos_sdk.codec.v1.HasHasHasAnimal;

                /**
                 * Encodes the specified HasHasHasAnimal message. Does not implicitly {@link cosmos_sdk.codec.v1.HasHasHasAnimal.verify|verify} messages.
                 * @param m HasHasHasAnimal message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: cosmos_sdk.codec.v1.IHasHasHasAnimal, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a HasHasHasAnimal message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns HasHasHasAnimal
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.codec.v1.HasHasHasAnimal;
            }

            /** Represents a TestService */
            class TestService extends $protobuf.rpc.Service {

                /**
                 * Constructs a new TestService service.
                 * @param rpcImpl RPC implementation
                 * @param [requestDelimited=false] Whether requests are length-delimited
                 * @param [responseDelimited=false] Whether responses are length-delimited
                 */
                constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

                /**
                 * Creates new TestService service using the specified rpc implementation.
                 * @param rpcImpl RPC implementation
                 * @param [requestDelimited=false] Whether requests are length-delimited
                 * @param [responseDelimited=false] Whether responses are length-delimited
                 * @returns RPC service. Useful where requests and/or responses are streamed.
                 */
                public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): TestService;

                /**
                 * Calls Echo.
                 * @param request EchoRequest message or plain object
                 * @param callback Node-style callback called with the error, if any, and EchoResponse
                 */
                public echo(request: cosmos_sdk.codec.v1.IEchoRequest, callback: cosmos_sdk.codec.v1.TestService.EchoCallback): void;

                /**
                 * Calls Echo.
                 * @param request EchoRequest message or plain object
                 * @returns Promise
                 */
                public echo(request: cosmos_sdk.codec.v1.IEchoRequest): Promise<cosmos_sdk.codec.v1.EchoResponse>;

                /**
                 * Calls SayHello.
                 * @param request SayHelloRequest message or plain object
                 * @param callback Node-style callback called with the error, if any, and SayHelloResponse
                 */
                public sayHello(request: cosmos_sdk.codec.v1.ISayHelloRequest, callback: cosmos_sdk.codec.v1.TestService.SayHelloCallback): void;

                /**
                 * Calls SayHello.
                 * @param request SayHelloRequest message or plain object
                 * @returns Promise
                 */
                public sayHello(request: cosmos_sdk.codec.v1.ISayHelloRequest): Promise<cosmos_sdk.codec.v1.SayHelloResponse>;
            }

            namespace TestService {

                /**
                 * Callback as used by {@link cosmos_sdk.codec.v1.TestService#echo}.
                 * @param error Error, if any
                 * @param [response] EchoResponse
                 */
                type EchoCallback = (error: (Error|null), response?: cosmos_sdk.codec.v1.EchoResponse) => void;

                /**
                 * Callback as used by {@link cosmos_sdk.codec.v1.TestService#sayHello}.
                 * @param error Error, if any
                 * @param [response] SayHelloResponse
                 */
                type SayHelloCallback = (error: (Error|null), response?: cosmos_sdk.codec.v1.SayHelloResponse) => void;
            }

            /** Properties of an EchoRequest. */
            interface IEchoRequest {

                /** EchoRequest message */
                message?: (string|null);
            }

            /** Represents an EchoRequest. */
            class EchoRequest implements IEchoRequest {

                /**
                 * Constructs a new EchoRequest.
                 * @param [p] Properties to set
                 */
                constructor(p?: cosmos_sdk.codec.v1.IEchoRequest);

                /** EchoRequest message. */
                public message: string;

                /**
                 * Creates a new EchoRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns EchoRequest instance
                 */
                public static create(properties?: cosmos_sdk.codec.v1.IEchoRequest): cosmos_sdk.codec.v1.EchoRequest;

                /**
                 * Encodes the specified EchoRequest message. Does not implicitly {@link cosmos_sdk.codec.v1.EchoRequest.verify|verify} messages.
                 * @param m EchoRequest message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: cosmos_sdk.codec.v1.IEchoRequest, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an EchoRequest message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns EchoRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.codec.v1.EchoRequest;
            }

            /** Properties of an EchoResponse. */
            interface IEchoResponse {

                /** EchoResponse message */
                message?: (string|null);
            }

            /** Represents an EchoResponse. */
            class EchoResponse implements IEchoResponse {

                /**
                 * Constructs a new EchoResponse.
                 * @param [p] Properties to set
                 */
                constructor(p?: cosmos_sdk.codec.v1.IEchoResponse);

                /** EchoResponse message. */
                public message: string;

                /**
                 * Creates a new EchoResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns EchoResponse instance
                 */
                public static create(properties?: cosmos_sdk.codec.v1.IEchoResponse): cosmos_sdk.codec.v1.EchoResponse;

                /**
                 * Encodes the specified EchoResponse message. Does not implicitly {@link cosmos_sdk.codec.v1.EchoResponse.verify|verify} messages.
                 * @param m EchoResponse message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: cosmos_sdk.codec.v1.IEchoResponse, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an EchoResponse message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns EchoResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.codec.v1.EchoResponse;
            }

            /** Properties of a SayHelloRequest. */
            interface ISayHelloRequest {

                /** SayHelloRequest name */
                name?: (string|null);
            }

            /** Represents a SayHelloRequest. */
            class SayHelloRequest implements ISayHelloRequest {

                /**
                 * Constructs a new SayHelloRequest.
                 * @param [p] Properties to set
                 */
                constructor(p?: cosmos_sdk.codec.v1.ISayHelloRequest);

                /** SayHelloRequest name. */
                public name: string;

                /**
                 * Creates a new SayHelloRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SayHelloRequest instance
                 */
                public static create(properties?: cosmos_sdk.codec.v1.ISayHelloRequest): cosmos_sdk.codec.v1.SayHelloRequest;

                /**
                 * Encodes the specified SayHelloRequest message. Does not implicitly {@link cosmos_sdk.codec.v1.SayHelloRequest.verify|verify} messages.
                 * @param m SayHelloRequest message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: cosmos_sdk.codec.v1.ISayHelloRequest, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SayHelloRequest message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns SayHelloRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.codec.v1.SayHelloRequest;
            }

            /** Properties of a SayHelloResponse. */
            interface ISayHelloResponse {

                /** SayHelloResponse greeting */
                greeting?: (string|null);
            }

            /** Represents a SayHelloResponse. */
            class SayHelloResponse implements ISayHelloResponse {

                /**
                 * Constructs a new SayHelloResponse.
                 * @param [p] Properties to set
                 */
                constructor(p?: cosmos_sdk.codec.v1.ISayHelloResponse);

                /** SayHelloResponse greeting. */
                public greeting: string;

                /**
                 * Creates a new SayHelloResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SayHelloResponse instance
                 */
                public static create(properties?: cosmos_sdk.codec.v1.ISayHelloResponse): cosmos_sdk.codec.v1.SayHelloResponse;

                /**
                 * Encodes the specified SayHelloResponse message. Does not implicitly {@link cosmos_sdk.codec.v1.SayHelloResponse.verify|verify} messages.
                 * @param m SayHelloResponse message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: cosmos_sdk.codec.v1.ISayHelloResponse, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SayHelloResponse message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns SayHelloResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.codec.v1.SayHelloResponse;
            }
        }
    }

    /** Namespace crypto. */
    namespace crypto {

        /** Namespace v1. */
        namespace v1 {

            /** Properties of a PublicKey. */
            interface IPublicKey {

                /** PublicKey secp256k1 */
                secp256k1?: (Uint8Array|null);

                /** PublicKey ed25519 */
                ed25519?: (Uint8Array|null);

                /** PublicKey sr25519 */
                sr25519?: (Uint8Array|null);

                /** PublicKey multisig */
                multisig?: (cosmos_sdk.crypto.v1.IPubKeyMultisigThreshold|null);

                /** PublicKey secp256r1 */
                secp256r1?: (Uint8Array|null);

                /** PublicKey anyPubkey */
                anyPubkey?: (google.protobuf.IAny|null);
            }

            /** Represents a PublicKey. */
            class PublicKey implements IPublicKey {

                /**
                 * Constructs a new PublicKey.
                 * @param [p] Properties to set
                 */
                constructor(p?: cosmos_sdk.crypto.v1.IPublicKey);

                /** PublicKey secp256k1. */
                public secp256k1: Uint8Array;

                /** PublicKey ed25519. */
                public ed25519: Uint8Array;

                /** PublicKey sr25519. */
                public sr25519: Uint8Array;

                /** PublicKey multisig. */
                public multisig?: (cosmos_sdk.crypto.v1.IPubKeyMultisigThreshold|null);

                /** PublicKey secp256r1. */
                public secp256r1: Uint8Array;

                /** PublicKey anyPubkey. */
                public anyPubkey?: (google.protobuf.IAny|null);

                /** PublicKey sum. */
                public sum?: ("secp256k1"|"ed25519"|"sr25519"|"multisig"|"secp256r1"|"anyPubkey");

                /**
                 * Creates a new PublicKey instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PublicKey instance
                 */
                public static create(properties?: cosmos_sdk.crypto.v1.IPublicKey): cosmos_sdk.crypto.v1.PublicKey;

                /**
                 * Encodes the specified PublicKey message. Does not implicitly {@link cosmos_sdk.crypto.v1.PublicKey.verify|verify} messages.
                 * @param m PublicKey message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: cosmos_sdk.crypto.v1.IPublicKey, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PublicKey message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns PublicKey
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.crypto.v1.PublicKey;
            }

            /** Properties of a PubKeyMultisigThreshold. */
            interface IPubKeyMultisigThreshold {

                /** PubKeyMultisigThreshold threshold */
                threshold?: (number|null);

                /** PubKeyMultisigThreshold publicKeys */
                publicKeys?: (cosmos_sdk.crypto.v1.IPublicKey[]|null);
            }

            /** Represents a PubKeyMultisigThreshold. */
            class PubKeyMultisigThreshold implements IPubKeyMultisigThreshold {

                /**
                 * Constructs a new PubKeyMultisigThreshold.
                 * @param [p] Properties to set
                 */
                constructor(p?: cosmos_sdk.crypto.v1.IPubKeyMultisigThreshold);

                /** PubKeyMultisigThreshold threshold. */
                public threshold: number;

                /** PubKeyMultisigThreshold publicKeys. */
                public publicKeys: cosmos_sdk.crypto.v1.IPublicKey[];

                /**
                 * Creates a new PubKeyMultisigThreshold instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PubKeyMultisigThreshold instance
                 */
                public static create(properties?: cosmos_sdk.crypto.v1.IPubKeyMultisigThreshold): cosmos_sdk.crypto.v1.PubKeyMultisigThreshold;

                /**
                 * Encodes the specified PubKeyMultisigThreshold message. Does not implicitly {@link cosmos_sdk.crypto.v1.PubKeyMultisigThreshold.verify|verify} messages.
                 * @param m PubKeyMultisigThreshold message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: cosmos_sdk.crypto.v1.IPubKeyMultisigThreshold, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PubKeyMultisigThreshold message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns PubKeyMultisigThreshold
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.crypto.v1.PubKeyMultisigThreshold;
            }

            /** Properties of a MultiSignature. */
            interface IMultiSignature {

                /** MultiSignature signatures */
                signatures?: (Uint8Array[]|null);
            }

            /** Represents a MultiSignature. */
            class MultiSignature implements IMultiSignature {

                /**
                 * Constructs a new MultiSignature.
                 * @param [p] Properties to set
                 */
                constructor(p?: cosmos_sdk.crypto.v1.IMultiSignature);

                /** MultiSignature signatures. */
                public signatures: Uint8Array[];

                /**
                 * Creates a new MultiSignature instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns MultiSignature instance
                 */
                public static create(properties?: cosmos_sdk.crypto.v1.IMultiSignature): cosmos_sdk.crypto.v1.MultiSignature;

                /**
                 * Encodes the specified MultiSignature message. Does not implicitly {@link cosmos_sdk.crypto.v1.MultiSignature.verify|verify} messages.
                 * @param m MultiSignature message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: cosmos_sdk.crypto.v1.IMultiSignature, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a MultiSignature message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns MultiSignature
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.crypto.v1.MultiSignature;
            }

            /** Properties of a CompactBitArray. */
            interface ICompactBitArray {

                /** CompactBitArray extraBitsStored */
                extraBitsStored?: (number|null);

                /** CompactBitArray elems */
                elems?: (Uint8Array|null);
            }

            /** Represents a CompactBitArray. */
            class CompactBitArray implements ICompactBitArray {

                /**
                 * Constructs a new CompactBitArray.
                 * @param [p] Properties to set
                 */
                constructor(p?: cosmos_sdk.crypto.v1.ICompactBitArray);

                /** CompactBitArray extraBitsStored. */
                public extraBitsStored: number;

                /** CompactBitArray elems. */
                public elems: Uint8Array;

                /**
                 * Creates a new CompactBitArray instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CompactBitArray instance
                 */
                public static create(properties?: cosmos_sdk.crypto.v1.ICompactBitArray): cosmos_sdk.crypto.v1.CompactBitArray;

                /**
                 * Encodes the specified CompactBitArray message. Does not implicitly {@link cosmos_sdk.crypto.v1.CompactBitArray.verify|verify} messages.
                 * @param m CompactBitArray message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: cosmos_sdk.crypto.v1.ICompactBitArray, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CompactBitArray message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns CompactBitArray
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.crypto.v1.CompactBitArray;
            }
        }
    }

    /** Namespace tx. */
    namespace tx {

        /** Namespace signing. */
        namespace signing {

            /** Namespace v1. */
            namespace v1 {

                /** SignMode enum. */
                enum SignMode {
                    SIGN_MODE_UNSPECIFIED = 0,
                    SIGN_MODE_DIRECT = 1,
                    SIGN_MODE_TEXTUAL = 2,
                    SIGN_MODE_LEGACY_AMINO_JSON = 127
                }
            }
        }

        /** Namespace v1. */
        namespace v1 {

            /** Properties of a Tx. */
            interface ITx {

                /** Tx body */
                body?: (cosmos_sdk.tx.v1.ITxBody|null);

                /** Tx authInfo */
                authInfo?: (cosmos_sdk.tx.v1.IAuthInfo|null);

                /** Tx signatures */
                signatures?: (Uint8Array[]|null);
            }

            /** Represents a Tx. */
            class Tx implements ITx {

                /**
                 * Constructs a new Tx.
                 * @param [p] Properties to set
                 */
                constructor(p?: cosmos_sdk.tx.v1.ITx);

                /** Tx body. */
                public body?: (cosmos_sdk.tx.v1.ITxBody|null);

                /** Tx authInfo. */
                public authInfo?: (cosmos_sdk.tx.v1.IAuthInfo|null);

                /** Tx signatures. */
                public signatures: Uint8Array[];

                /**
                 * Creates a new Tx instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Tx instance
                 */
                public static create(properties?: cosmos_sdk.tx.v1.ITx): cosmos_sdk.tx.v1.Tx;

                /**
                 * Encodes the specified Tx message. Does not implicitly {@link cosmos_sdk.tx.v1.Tx.verify|verify} messages.
                 * @param m Tx message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: cosmos_sdk.tx.v1.ITx, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Tx message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns Tx
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.tx.v1.Tx;
            }

            /** Properties of a SignDoc. */
            interface ISignDoc {

                /** SignDoc body */
                body?: (cosmos_sdk.tx.v1.ITxBody|null);

                /** SignDoc authInfo */
                authInfo?: (cosmos_sdk.tx.v1.IAuthInfo|null);

                /** SignDoc chainId */
                chainId?: (string|null);

                /** SignDoc accountNumber */
                accountNumber?: (number|Long|null);

                /** SignDoc accountSequence */
                accountSequence?: (number|Long|null);
            }

            /** Represents a SignDoc. */
            class SignDoc implements ISignDoc {

                /**
                 * Constructs a new SignDoc.
                 * @param [p] Properties to set
                 */
                constructor(p?: cosmos_sdk.tx.v1.ISignDoc);

                /** SignDoc body. */
                public body?: (cosmos_sdk.tx.v1.ITxBody|null);

                /** SignDoc authInfo. */
                public authInfo?: (cosmos_sdk.tx.v1.IAuthInfo|null);

                /** SignDoc chainId. */
                public chainId: string;

                /** SignDoc accountNumber. */
                public accountNumber: (number|Long);

                /** SignDoc accountSequence. */
                public accountSequence: (number|Long);

                /**
                 * Creates a new SignDoc instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SignDoc instance
                 */
                public static create(properties?: cosmos_sdk.tx.v1.ISignDoc): cosmos_sdk.tx.v1.SignDoc;

                /**
                 * Encodes the specified SignDoc message. Does not implicitly {@link cosmos_sdk.tx.v1.SignDoc.verify|verify} messages.
                 * @param m SignDoc message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: cosmos_sdk.tx.v1.ISignDoc, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SignDoc message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns SignDoc
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.tx.v1.SignDoc;
            }

            /** Properties of a TxBody. */
            interface ITxBody {

                /** TxBody messages */
                messages?: (google.protobuf.IAny[]|null);

                /** TxBody memo */
                memo?: (string|null);

                /** TxBody timeoutHeight */
                timeoutHeight?: (number|Long|null);

                /** TxBody extensionOptions */
                extensionOptions?: (google.protobuf.IAny[]|null);

                /** TxBody nonCriticalExtensionOptions */
                nonCriticalExtensionOptions?: (google.protobuf.IAny[]|null);
            }

            /** Represents a TxBody. */
            class TxBody implements ITxBody {

                /**
                 * Constructs a new TxBody.
                 * @param [p] Properties to set
                 */
                constructor(p?: cosmos_sdk.tx.v1.ITxBody);

                /** TxBody messages. */
                public messages: google.protobuf.IAny[];

                /** TxBody memo. */
                public memo: string;

                /** TxBody timeoutHeight. */
                public timeoutHeight: (number|Long);

                /** TxBody extensionOptions. */
                public extensionOptions: google.protobuf.IAny[];

                /** TxBody nonCriticalExtensionOptions. */
                public nonCriticalExtensionOptions: google.protobuf.IAny[];

                /**
                 * Creates a new TxBody instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns TxBody instance
                 */
                public static create(properties?: cosmos_sdk.tx.v1.ITxBody): cosmos_sdk.tx.v1.TxBody;

                /**
                 * Encodes the specified TxBody message. Does not implicitly {@link cosmos_sdk.tx.v1.TxBody.verify|verify} messages.
                 * @param m TxBody message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: cosmos_sdk.tx.v1.ITxBody, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a TxBody message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns TxBody
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.tx.v1.TxBody;
            }

            /** Properties of an AuthInfo. */
            interface IAuthInfo {

                /** AuthInfo signerInfos */
                signerInfos?: (cosmos_sdk.tx.v1.ISignerInfo[]|null);

                /** AuthInfo fee */
                fee?: (cosmos_sdk.tx.v1.IFee|null);
            }

            /** Represents an AuthInfo. */
            class AuthInfo implements IAuthInfo {

                /**
                 * Constructs a new AuthInfo.
                 * @param [p] Properties to set
                 */
                constructor(p?: cosmos_sdk.tx.v1.IAuthInfo);

                /** AuthInfo signerInfos. */
                public signerInfos: cosmos_sdk.tx.v1.ISignerInfo[];

                /** AuthInfo fee. */
                public fee?: (cosmos_sdk.tx.v1.IFee|null);

                /**
                 * Creates a new AuthInfo instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns AuthInfo instance
                 */
                public static create(properties?: cosmos_sdk.tx.v1.IAuthInfo): cosmos_sdk.tx.v1.AuthInfo;

                /**
                 * Encodes the specified AuthInfo message. Does not implicitly {@link cosmos_sdk.tx.v1.AuthInfo.verify|verify} messages.
                 * @param m AuthInfo message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: cosmos_sdk.tx.v1.IAuthInfo, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an AuthInfo message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns AuthInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.tx.v1.AuthInfo;
            }

            /** Properties of a SignerInfo. */
            interface ISignerInfo {

                /** SignerInfo publicKey */
                publicKey?: (google.protobuf.IAny|null);

                /** SignerInfo modeInfo */
                modeInfo?: (cosmos_sdk.tx.v1.IModeInfo|null);
            }

            /** Represents a SignerInfo. */
            class SignerInfo implements ISignerInfo {

                /**
                 * Constructs a new SignerInfo.
                 * @param [p] Properties to set
                 */
                constructor(p?: cosmos_sdk.tx.v1.ISignerInfo);

                /** SignerInfo publicKey. */
                public publicKey?: (google.protobuf.IAny|null);

                /** SignerInfo modeInfo. */
                public modeInfo?: (cosmos_sdk.tx.v1.IModeInfo|null);

                /**
                 * Creates a new SignerInfo instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SignerInfo instance
                 */
                public static create(properties?: cosmos_sdk.tx.v1.ISignerInfo): cosmos_sdk.tx.v1.SignerInfo;

                /**
                 * Encodes the specified SignerInfo message. Does not implicitly {@link cosmos_sdk.tx.v1.SignerInfo.verify|verify} messages.
                 * @param m SignerInfo message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: cosmos_sdk.tx.v1.ISignerInfo, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SignerInfo message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns SignerInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.tx.v1.SignerInfo;
            }

            /** Properties of a ModeInfo. */
            interface IModeInfo {

                /** ModeInfo single */
                single?: (cosmos_sdk.tx.v1.ModeInfo.ISingle|null);

                /** ModeInfo multi */
                multi?: (cosmos_sdk.tx.v1.ModeInfo.IMulti|null);
            }

            /** Represents a ModeInfo. */
            class ModeInfo implements IModeInfo {

                /**
                 * Constructs a new ModeInfo.
                 * @param [p] Properties to set
                 */
                constructor(p?: cosmos_sdk.tx.v1.IModeInfo);

                /** ModeInfo single. */
                public single?: (cosmos_sdk.tx.v1.ModeInfo.ISingle|null);

                /** ModeInfo multi. */
                public multi?: (cosmos_sdk.tx.v1.ModeInfo.IMulti|null);

                /** ModeInfo sum. */
                public sum?: ("single"|"multi");

                /**
                 * Creates a new ModeInfo instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ModeInfo instance
                 */
                public static create(properties?: cosmos_sdk.tx.v1.IModeInfo): cosmos_sdk.tx.v1.ModeInfo;

                /**
                 * Encodes the specified ModeInfo message. Does not implicitly {@link cosmos_sdk.tx.v1.ModeInfo.verify|verify} messages.
                 * @param m ModeInfo message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: cosmos_sdk.tx.v1.IModeInfo, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ModeInfo message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns ModeInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.tx.v1.ModeInfo;
            }

            namespace ModeInfo {

                /** Properties of a Single. */
                interface ISingle {

                    /** Single mode */
                    mode?: (cosmos_sdk.tx.signing.v1.SignMode|null);
                }

                /** Represents a Single. */
                class Single implements ISingle {

                    /**
                     * Constructs a new Single.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.tx.v1.ModeInfo.ISingle);

                    /** Single mode. */
                    public mode: cosmos_sdk.tx.signing.v1.SignMode;

                    /**
                     * Creates a new Single instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Single instance
                     */
                    public static create(properties?: cosmos_sdk.tx.v1.ModeInfo.ISingle): cosmos_sdk.tx.v1.ModeInfo.Single;

                    /**
                     * Encodes the specified Single message. Does not implicitly {@link cosmos_sdk.tx.v1.ModeInfo.Single.verify|verify} messages.
                     * @param m Single message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.tx.v1.ModeInfo.ISingle, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Single message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns Single
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.tx.v1.ModeInfo.Single;
                }

                /** Properties of a Multi. */
                interface IMulti {

                    /** Multi bitarray */
                    bitarray?: (cosmos_sdk.crypto.v1.ICompactBitArray|null);

                    /** Multi modeInfos */
                    modeInfos?: (cosmos_sdk.tx.v1.IModeInfo[]|null);
                }

                /** Represents a Multi. */
                class Multi implements IMulti {

                    /**
                     * Constructs a new Multi.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.tx.v1.ModeInfo.IMulti);

                    /** Multi bitarray. */
                    public bitarray?: (cosmos_sdk.crypto.v1.ICompactBitArray|null);

                    /** Multi modeInfos. */
                    public modeInfos: cosmos_sdk.tx.v1.IModeInfo[];

                    /**
                     * Creates a new Multi instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Multi instance
                     */
                    public static create(properties?: cosmos_sdk.tx.v1.ModeInfo.IMulti): cosmos_sdk.tx.v1.ModeInfo.Multi;

                    /**
                     * Encodes the specified Multi message. Does not implicitly {@link cosmos_sdk.tx.v1.ModeInfo.Multi.verify|verify} messages.
                     * @param m Multi message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.tx.v1.ModeInfo.IMulti, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Multi message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns Multi
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.tx.v1.ModeInfo.Multi;
                }
            }

            /** Properties of a Fee. */
            interface IFee {

                /** Fee amount */
                amount?: (cosmos_sdk.v1.ICoin[]|null);

                /** Fee gasLimit */
                gasLimit?: (number|Long|null);
            }

            /** Represents a Fee. */
            class Fee implements IFee {

                /**
                 * Constructs a new Fee.
                 * @param [p] Properties to set
                 */
                constructor(p?: cosmos_sdk.tx.v1.IFee);

                /** Fee amount. */
                public amount: cosmos_sdk.v1.ICoin[];

                /** Fee gasLimit. */
                public gasLimit: (number|Long);

                /**
                 * Creates a new Fee instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Fee instance
                 */
                public static create(properties?: cosmos_sdk.tx.v1.IFee): cosmos_sdk.tx.v1.Fee;

                /**
                 * Encodes the specified Fee message. Does not implicitly {@link cosmos_sdk.tx.v1.Fee.verify|verify} messages.
                 * @param m Fee message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: cosmos_sdk.tx.v1.IFee, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Fee message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns Fee
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.tx.v1.Fee;
            }
        }
    }

    /** Namespace v1. */
    namespace v1 {

        /** Properties of a Coin. */
        interface ICoin {

            /** Coin denom */
            denom?: (string|null);

            /** Coin amount */
            amount?: (string|null);
        }

        /** Represents a Coin. */
        class Coin implements ICoin {

            /**
             * Constructs a new Coin.
             * @param [p] Properties to set
             */
            constructor(p?: cosmos_sdk.v1.ICoin);

            /** Coin denom. */
            public denom: string;

            /** Coin amount. */
            public amount: string;

            /**
             * Creates a new Coin instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Coin instance
             */
            public static create(properties?: cosmos_sdk.v1.ICoin): cosmos_sdk.v1.Coin;

            /**
             * Encodes the specified Coin message. Does not implicitly {@link cosmos_sdk.v1.Coin.verify|verify} messages.
             * @param m Coin message or plain object to encode
             * @param [w] Writer to encode to
             * @returns Writer
             */
            public static encode(m: cosmos_sdk.v1.ICoin, w?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Coin message from the specified reader or buffer.
             * @param r Reader or buffer to decode from
             * @param [l] Message length if known beforehand
             * @returns Coin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.v1.Coin;
        }

        /** Properties of a DecCoin. */
        interface IDecCoin {

            /** DecCoin denom */
            denom?: (string|null);

            /** DecCoin amount */
            amount?: (string|null);
        }

        /** Represents a DecCoin. */
        class DecCoin implements IDecCoin {

            /**
             * Constructs a new DecCoin.
             * @param [p] Properties to set
             */
            constructor(p?: cosmos_sdk.v1.IDecCoin);

            /** DecCoin denom. */
            public denom: string;

            /** DecCoin amount. */
            public amount: string;

            /**
             * Creates a new DecCoin instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DecCoin instance
             */
            public static create(properties?: cosmos_sdk.v1.IDecCoin): cosmos_sdk.v1.DecCoin;

            /**
             * Encodes the specified DecCoin message. Does not implicitly {@link cosmos_sdk.v1.DecCoin.verify|verify} messages.
             * @param m DecCoin message or plain object to encode
             * @param [w] Writer to encode to
             * @returns Writer
             */
            public static encode(m: cosmos_sdk.v1.IDecCoin, w?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DecCoin message from the specified reader or buffer.
             * @param r Reader or buffer to decode from
             * @param [l] Message length if known beforehand
             * @returns DecCoin
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.v1.DecCoin;
        }

        /** Properties of an IntProto. */
        interface IIntProto {

            /** IntProto int */
            int?: (string|null);
        }

        /** Represents an IntProto. */
        class IntProto implements IIntProto {

            /**
             * Constructs a new IntProto.
             * @param [p] Properties to set
             */
            constructor(p?: cosmos_sdk.v1.IIntProto);

            /** IntProto int. */
            public int: string;

            /**
             * Creates a new IntProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns IntProto instance
             */
            public static create(properties?: cosmos_sdk.v1.IIntProto): cosmos_sdk.v1.IntProto;

            /**
             * Encodes the specified IntProto message. Does not implicitly {@link cosmos_sdk.v1.IntProto.verify|verify} messages.
             * @param m IntProto message or plain object to encode
             * @param [w] Writer to encode to
             * @returns Writer
             */
            public static encode(m: cosmos_sdk.v1.IIntProto, w?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an IntProto message from the specified reader or buffer.
             * @param r Reader or buffer to decode from
             * @param [l] Message length if known beforehand
             * @returns IntProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.v1.IntProto;
        }

        /** Properties of a DecProto. */
        interface IDecProto {

            /** DecProto dec */
            dec?: (string|null);
        }

        /** Represents a DecProto. */
        class DecProto implements IDecProto {

            /**
             * Constructs a new DecProto.
             * @param [p] Properties to set
             */
            constructor(p?: cosmos_sdk.v1.IDecProto);

            /** DecProto dec. */
            public dec: string;

            /**
             * Creates a new DecProto instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DecProto instance
             */
            public static create(properties?: cosmos_sdk.v1.IDecProto): cosmos_sdk.v1.DecProto;

            /**
             * Encodes the specified DecProto message. Does not implicitly {@link cosmos_sdk.v1.DecProto.verify|verify} messages.
             * @param m DecProto message or plain object to encode
             * @param [w] Writer to encode to
             * @returns Writer
             */
            public static encode(m: cosmos_sdk.v1.IDecProto, w?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DecProto message from the specified reader or buffer.
             * @param r Reader or buffer to decode from
             * @param [l] Message length if known beforehand
             * @returns DecProto
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.v1.DecProto;
        }

        /** Properties of a ValAddresses. */
        interface IValAddresses {

            /** ValAddresses addresses */
            addresses?: (Uint8Array[]|null);
        }

        /** Represents a ValAddresses. */
        class ValAddresses implements IValAddresses {

            /**
             * Constructs a new ValAddresses.
             * @param [p] Properties to set
             */
            constructor(p?: cosmos_sdk.v1.IValAddresses);

            /** ValAddresses addresses. */
            public addresses: Uint8Array[];

            /**
             * Creates a new ValAddresses instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ValAddresses instance
             */
            public static create(properties?: cosmos_sdk.v1.IValAddresses): cosmos_sdk.v1.ValAddresses;

            /**
             * Encodes the specified ValAddresses message. Does not implicitly {@link cosmos_sdk.v1.ValAddresses.verify|verify} messages.
             * @param m ValAddresses message or plain object to encode
             * @param [w] Writer to encode to
             * @returns Writer
             */
            public static encode(m: cosmos_sdk.v1.IValAddresses, w?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ValAddresses message from the specified reader or buffer.
             * @param r Reader or buffer to decode from
             * @param [l] Message length if known beforehand
             * @returns ValAddresses
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.v1.ValAddresses;
        }

        /** Properties of a GasInfo. */
        interface IGasInfo {

            /** GasInfo gasWanted */
            gasWanted?: (number|Long|null);

            /** GasInfo gasUsed */
            gasUsed?: (number|Long|null);
        }

        /** Represents a GasInfo. */
        class GasInfo implements IGasInfo {

            /**
             * Constructs a new GasInfo.
             * @param [p] Properties to set
             */
            constructor(p?: cosmos_sdk.v1.IGasInfo);

            /** GasInfo gasWanted. */
            public gasWanted: (number|Long);

            /** GasInfo gasUsed. */
            public gasUsed: (number|Long);

            /**
             * Creates a new GasInfo instance using the specified properties.
             * @param [properties] Properties to set
             * @returns GasInfo instance
             */
            public static create(properties?: cosmos_sdk.v1.IGasInfo): cosmos_sdk.v1.GasInfo;

            /**
             * Encodes the specified GasInfo message. Does not implicitly {@link cosmos_sdk.v1.GasInfo.verify|verify} messages.
             * @param m GasInfo message or plain object to encode
             * @param [w] Writer to encode to
             * @returns Writer
             */
            public static encode(m: cosmos_sdk.v1.IGasInfo, w?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GasInfo message from the specified reader or buffer.
             * @param r Reader or buffer to decode from
             * @param [l] Message length if known beforehand
             * @returns GasInfo
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.v1.GasInfo;
        }

        /** Properties of a Result. */
        interface IResult {

            /** Result data */
            data?: (Uint8Array|null);

            /** Result log */
            log?: (string|null);

            /** Result events */
            events?: (tendermint.abci.types.IEvent[]|null);
        }

        /** Represents a Result. */
        class Result implements IResult {

            /**
             * Constructs a new Result.
             * @param [p] Properties to set
             */
            constructor(p?: cosmos_sdk.v1.IResult);

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
            public static create(properties?: cosmos_sdk.v1.IResult): cosmos_sdk.v1.Result;

            /**
             * Encodes the specified Result message. Does not implicitly {@link cosmos_sdk.v1.Result.verify|verify} messages.
             * @param m Result message or plain object to encode
             * @param [w] Writer to encode to
             * @returns Writer
             */
            public static encode(m: cosmos_sdk.v1.IResult, w?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Result message from the specified reader or buffer.
             * @param r Reader or buffer to decode from
             * @param [l] Message length if known beforehand
             * @returns Result
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.v1.Result;
        }

        /** Properties of a SimulationResponse. */
        interface ISimulationResponse {

            /** SimulationResponse gasInfo */
            gasInfo?: (cosmos_sdk.v1.IGasInfo|null);

            /** SimulationResponse result */
            result?: (cosmos_sdk.v1.IResult|null);
        }

        /** Represents a SimulationResponse. */
        class SimulationResponse implements ISimulationResponse {

            /**
             * Constructs a new SimulationResponse.
             * @param [p] Properties to set
             */
            constructor(p?: cosmos_sdk.v1.ISimulationResponse);

            /** SimulationResponse gasInfo. */
            public gasInfo?: (cosmos_sdk.v1.IGasInfo|null);

            /** SimulationResponse result. */
            public result?: (cosmos_sdk.v1.IResult|null);

            /**
             * Creates a new SimulationResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns SimulationResponse instance
             */
            public static create(properties?: cosmos_sdk.v1.ISimulationResponse): cosmos_sdk.v1.SimulationResponse;

            /**
             * Encodes the specified SimulationResponse message. Does not implicitly {@link cosmos_sdk.v1.SimulationResponse.verify|verify} messages.
             * @param m SimulationResponse message or plain object to encode
             * @param [w] Writer to encode to
             * @returns Writer
             */
            public static encode(m: cosmos_sdk.v1.ISimulationResponse, w?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a SimulationResponse message from the specified reader or buffer.
             * @param r Reader or buffer to decode from
             * @param [l] Message length if known beforehand
             * @returns SimulationResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.v1.SimulationResponse;
        }

        /** Properties of a MsgData. */
        interface IMsgData {

            /** MsgData msgType */
            msgType?: (string|null);

            /** MsgData data */
            data?: (Uint8Array|null);
        }

        /** Represents a MsgData. */
        class MsgData implements IMsgData {

            /**
             * Constructs a new MsgData.
             * @param [p] Properties to set
             */
            constructor(p?: cosmos_sdk.v1.IMsgData);

            /** MsgData msgType. */
            public msgType: string;

            /** MsgData data. */
            public data: Uint8Array;

            /**
             * Creates a new MsgData instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MsgData instance
             */
            public static create(properties?: cosmos_sdk.v1.IMsgData): cosmos_sdk.v1.MsgData;

            /**
             * Encodes the specified MsgData message. Does not implicitly {@link cosmos_sdk.v1.MsgData.verify|verify} messages.
             * @param m MsgData message or plain object to encode
             * @param [w] Writer to encode to
             * @returns Writer
             */
            public static encode(m: cosmos_sdk.v1.IMsgData, w?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MsgData message from the specified reader or buffer.
             * @param r Reader or buffer to decode from
             * @param [l] Message length if known beforehand
             * @returns MsgData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.v1.MsgData;
        }

        /** Properties of a TxData. */
        interface ITxData {

            /** TxData data */
            data?: (cosmos_sdk.v1.IMsgData[]|null);
        }

        /** Represents a TxData. */
        class TxData implements ITxData {

            /**
             * Constructs a new TxData.
             * @param [p] Properties to set
             */
            constructor(p?: cosmos_sdk.v1.ITxData);

            /** TxData data. */
            public data: cosmos_sdk.v1.IMsgData[];

            /**
             * Creates a new TxData instance using the specified properties.
             * @param [properties] Properties to set
             * @returns TxData instance
             */
            public static create(properties?: cosmos_sdk.v1.ITxData): cosmos_sdk.v1.TxData;

            /**
             * Encodes the specified TxData message. Does not implicitly {@link cosmos_sdk.v1.TxData.verify|verify} messages.
             * @param m TxData message or plain object to encode
             * @param [w] Writer to encode to
             * @returns Writer
             */
            public static encode(m: cosmos_sdk.v1.ITxData, w?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a TxData message from the specified reader or buffer.
             * @param r Reader or buffer to decode from
             * @param [l] Message length if known beforehand
             * @returns TxData
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.v1.TxData;
        }
    }

    /** Namespace x. */
    namespace x {

        /** Namespace auth. */
        namespace auth {

            /** Namespace v1. */
            namespace v1 {

                /** Properties of a BaseAccount. */
                interface IBaseAccount {

                    /** BaseAccount address */
                    address?: (Uint8Array|null);

                    /** BaseAccount pubKey */
                    pubKey?: (Uint8Array|null);

                    /** BaseAccount accountNumber */
                    accountNumber?: (number|Long|null);

                    /** BaseAccount sequence */
                    sequence?: (number|Long|null);
                }

                /** Represents a BaseAccount. */
                class BaseAccount implements IBaseAccount {

                    /**
                     * Constructs a new BaseAccount.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.auth.v1.IBaseAccount);

                    /** BaseAccount address. */
                    public address: Uint8Array;

                    /** BaseAccount pubKey. */
                    public pubKey: Uint8Array;

                    /** BaseAccount accountNumber. */
                    public accountNumber: (number|Long);

                    /** BaseAccount sequence. */
                    public sequence: (number|Long);

                    /**
                     * Creates a new BaseAccount instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns BaseAccount instance
                     */
                    public static create(properties?: cosmos_sdk.x.auth.v1.IBaseAccount): cosmos_sdk.x.auth.v1.BaseAccount;

                    /**
                     * Encodes the specified BaseAccount message. Does not implicitly {@link cosmos_sdk.x.auth.v1.BaseAccount.verify|verify} messages.
                     * @param m BaseAccount message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.auth.v1.IBaseAccount, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a BaseAccount message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns BaseAccount
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.auth.v1.BaseAccount;
                }

                /** Properties of a ModuleAccount. */
                interface IModuleAccount {

                    /** ModuleAccount baseAccount */
                    baseAccount?: (cosmos_sdk.x.auth.v1.IBaseAccount|null);

                    /** ModuleAccount name */
                    name?: (string|null);

                    /** ModuleAccount permissions */
                    permissions?: (string[]|null);
                }

                /** Represents a ModuleAccount. */
                class ModuleAccount implements IModuleAccount {

                    /**
                     * Constructs a new ModuleAccount.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.auth.v1.IModuleAccount);

                    /** ModuleAccount baseAccount. */
                    public baseAccount?: (cosmos_sdk.x.auth.v1.IBaseAccount|null);

                    /** ModuleAccount name. */
                    public name: string;

                    /** ModuleAccount permissions. */
                    public permissions: string[];

                    /**
                     * Creates a new ModuleAccount instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ModuleAccount instance
                     */
                    public static create(properties?: cosmos_sdk.x.auth.v1.IModuleAccount): cosmos_sdk.x.auth.v1.ModuleAccount;

                    /**
                     * Encodes the specified ModuleAccount message. Does not implicitly {@link cosmos_sdk.x.auth.v1.ModuleAccount.verify|verify} messages.
                     * @param m ModuleAccount message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.auth.v1.IModuleAccount, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ModuleAccount message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns ModuleAccount
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.auth.v1.ModuleAccount;
                }

                /** Properties of a Params. */
                interface IParams {

                    /** Params maxMemoCharacters */
                    maxMemoCharacters?: (number|Long|null);

                    /** Params txSigLimit */
                    txSigLimit?: (number|Long|null);

                    /** Params txSizeCostPerByte */
                    txSizeCostPerByte?: (number|Long|null);

                    /** Params sigVerifyCostEd25519 */
                    sigVerifyCostEd25519?: (number|Long|null);

                    /** Params sigVerifyCostSecp256k1 */
                    sigVerifyCostSecp256k1?: (number|Long|null);
                }

                /** Represents a Params. */
                class Params implements IParams {

                    /**
                     * Constructs a new Params.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.auth.v1.IParams);

                    /** Params maxMemoCharacters. */
                    public maxMemoCharacters: (number|Long);

                    /** Params txSigLimit. */
                    public txSigLimit: (number|Long);

                    /** Params txSizeCostPerByte. */
                    public txSizeCostPerByte: (number|Long);

                    /** Params sigVerifyCostEd25519. */
                    public sigVerifyCostEd25519: (number|Long);

                    /** Params sigVerifyCostSecp256k1. */
                    public sigVerifyCostSecp256k1: (number|Long);

                    /**
                     * Creates a new Params instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Params instance
                     */
                    public static create(properties?: cosmos_sdk.x.auth.v1.IParams): cosmos_sdk.x.auth.v1.Params;

                    /**
                     * Encodes the specified Params message. Does not implicitly {@link cosmos_sdk.x.auth.v1.Params.verify|verify} messages.
                     * @param m Params message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.auth.v1.IParams, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Params message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns Params
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.auth.v1.Params;
                }
            }

            /** Namespace vesting. */
            namespace vesting {

                /** Namespace v1. */
                namespace v1 {

                    /** Properties of a BaseVestingAccount. */
                    interface IBaseVestingAccount {

                        /** BaseVestingAccount baseAccount */
                        baseAccount?: (cosmos_sdk.x.auth.v1.IBaseAccount|null);

                        /** BaseVestingAccount originalVesting */
                        originalVesting?: (cosmos_sdk.v1.ICoin[]|null);

                        /** BaseVestingAccount delegatedFree */
                        delegatedFree?: (cosmos_sdk.v1.ICoin[]|null);

                        /** BaseVestingAccount delegatedVesting */
                        delegatedVesting?: (cosmos_sdk.v1.ICoin[]|null);

                        /** BaseVestingAccount endTime */
                        endTime?: (number|Long|null);
                    }

                    /** Represents a BaseVestingAccount. */
                    class BaseVestingAccount implements IBaseVestingAccount {

                        /**
                         * Constructs a new BaseVestingAccount.
                         * @param [p] Properties to set
                         */
                        constructor(p?: cosmos_sdk.x.auth.vesting.v1.IBaseVestingAccount);

                        /** BaseVestingAccount baseAccount. */
                        public baseAccount?: (cosmos_sdk.x.auth.v1.IBaseAccount|null);

                        /** BaseVestingAccount originalVesting. */
                        public originalVesting: cosmos_sdk.v1.ICoin[];

                        /** BaseVestingAccount delegatedFree. */
                        public delegatedFree: cosmos_sdk.v1.ICoin[];

                        /** BaseVestingAccount delegatedVesting. */
                        public delegatedVesting: cosmos_sdk.v1.ICoin[];

                        /** BaseVestingAccount endTime. */
                        public endTime: (number|Long);

                        /**
                         * Creates a new BaseVestingAccount instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns BaseVestingAccount instance
                         */
                        public static create(properties?: cosmos_sdk.x.auth.vesting.v1.IBaseVestingAccount): cosmos_sdk.x.auth.vesting.v1.BaseVestingAccount;

                        /**
                         * Encodes the specified BaseVestingAccount message. Does not implicitly {@link cosmos_sdk.x.auth.vesting.v1.BaseVestingAccount.verify|verify} messages.
                         * @param m BaseVestingAccount message or plain object to encode
                         * @param [w] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(m: cosmos_sdk.x.auth.vesting.v1.IBaseVestingAccount, w?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a BaseVestingAccount message from the specified reader or buffer.
                         * @param r Reader or buffer to decode from
                         * @param [l] Message length if known beforehand
                         * @returns BaseVestingAccount
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.auth.vesting.v1.BaseVestingAccount;
                    }

                    /** Properties of a ContinuousVestingAccount. */
                    interface IContinuousVestingAccount {

                        /** ContinuousVestingAccount baseVestingAccount */
                        baseVestingAccount?: (cosmos_sdk.x.auth.vesting.v1.IBaseVestingAccount|null);

                        /** ContinuousVestingAccount startTime */
                        startTime?: (number|Long|null);
                    }

                    /** Represents a ContinuousVestingAccount. */
                    class ContinuousVestingAccount implements IContinuousVestingAccount {

                        /**
                         * Constructs a new ContinuousVestingAccount.
                         * @param [p] Properties to set
                         */
                        constructor(p?: cosmos_sdk.x.auth.vesting.v1.IContinuousVestingAccount);

                        /** ContinuousVestingAccount baseVestingAccount. */
                        public baseVestingAccount?: (cosmos_sdk.x.auth.vesting.v1.IBaseVestingAccount|null);

                        /** ContinuousVestingAccount startTime. */
                        public startTime: (number|Long);

                        /**
                         * Creates a new ContinuousVestingAccount instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns ContinuousVestingAccount instance
                         */
                        public static create(properties?: cosmos_sdk.x.auth.vesting.v1.IContinuousVestingAccount): cosmos_sdk.x.auth.vesting.v1.ContinuousVestingAccount;

                        /**
                         * Encodes the specified ContinuousVestingAccount message. Does not implicitly {@link cosmos_sdk.x.auth.vesting.v1.ContinuousVestingAccount.verify|verify} messages.
                         * @param m ContinuousVestingAccount message or plain object to encode
                         * @param [w] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(m: cosmos_sdk.x.auth.vesting.v1.IContinuousVestingAccount, w?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a ContinuousVestingAccount message from the specified reader or buffer.
                         * @param r Reader or buffer to decode from
                         * @param [l] Message length if known beforehand
                         * @returns ContinuousVestingAccount
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.auth.vesting.v1.ContinuousVestingAccount;
                    }

                    /** Properties of a DelayedVestingAccount. */
                    interface IDelayedVestingAccount {

                        /** DelayedVestingAccount baseVestingAccount */
                        baseVestingAccount?: (cosmos_sdk.x.auth.vesting.v1.IBaseVestingAccount|null);
                    }

                    /** Represents a DelayedVestingAccount. */
                    class DelayedVestingAccount implements IDelayedVestingAccount {

                        /**
                         * Constructs a new DelayedVestingAccount.
                         * @param [p] Properties to set
                         */
                        constructor(p?: cosmos_sdk.x.auth.vesting.v1.IDelayedVestingAccount);

                        /** DelayedVestingAccount baseVestingAccount. */
                        public baseVestingAccount?: (cosmos_sdk.x.auth.vesting.v1.IBaseVestingAccount|null);

                        /**
                         * Creates a new DelayedVestingAccount instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns DelayedVestingAccount instance
                         */
                        public static create(properties?: cosmos_sdk.x.auth.vesting.v1.IDelayedVestingAccount): cosmos_sdk.x.auth.vesting.v1.DelayedVestingAccount;

                        /**
                         * Encodes the specified DelayedVestingAccount message. Does not implicitly {@link cosmos_sdk.x.auth.vesting.v1.DelayedVestingAccount.verify|verify} messages.
                         * @param m DelayedVestingAccount message or plain object to encode
                         * @param [w] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(m: cosmos_sdk.x.auth.vesting.v1.IDelayedVestingAccount, w?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a DelayedVestingAccount message from the specified reader or buffer.
                         * @param r Reader or buffer to decode from
                         * @param [l] Message length if known beforehand
                         * @returns DelayedVestingAccount
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.auth.vesting.v1.DelayedVestingAccount;
                    }

                    /** Properties of a Period. */
                    interface IPeriod {

                        /** Period length */
                        length?: (number|Long|null);

                        /** Period amount */
                        amount?: (cosmos_sdk.v1.ICoin[]|null);
                    }

                    /** Represents a Period. */
                    class Period implements IPeriod {

                        /**
                         * Constructs a new Period.
                         * @param [p] Properties to set
                         */
                        constructor(p?: cosmos_sdk.x.auth.vesting.v1.IPeriod);

                        /** Period length. */
                        public length: (number|Long);

                        /** Period amount. */
                        public amount: cosmos_sdk.v1.ICoin[];

                        /**
                         * Creates a new Period instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns Period instance
                         */
                        public static create(properties?: cosmos_sdk.x.auth.vesting.v1.IPeriod): cosmos_sdk.x.auth.vesting.v1.Period;

                        /**
                         * Encodes the specified Period message. Does not implicitly {@link cosmos_sdk.x.auth.vesting.v1.Period.verify|verify} messages.
                         * @param m Period message or plain object to encode
                         * @param [w] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(m: cosmos_sdk.x.auth.vesting.v1.IPeriod, w?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a Period message from the specified reader or buffer.
                         * @param r Reader or buffer to decode from
                         * @param [l] Message length if known beforehand
                         * @returns Period
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.auth.vesting.v1.Period;
                    }

                    /** Properties of a PeriodicVestingAccount. */
                    interface IPeriodicVestingAccount {

                        /** PeriodicVestingAccount baseVestingAccount */
                        baseVestingAccount?: (cosmos_sdk.x.auth.vesting.v1.IBaseVestingAccount|null);

                        /** PeriodicVestingAccount startTime */
                        startTime?: (number|Long|null);

                        /** PeriodicVestingAccount vestingPeriods */
                        vestingPeriods?: (cosmos_sdk.x.auth.vesting.v1.IPeriod[]|null);
                    }

                    /** Represents a PeriodicVestingAccount. */
                    class PeriodicVestingAccount implements IPeriodicVestingAccount {

                        /**
                         * Constructs a new PeriodicVestingAccount.
                         * @param [p] Properties to set
                         */
                        constructor(p?: cosmos_sdk.x.auth.vesting.v1.IPeriodicVestingAccount);

                        /** PeriodicVestingAccount baseVestingAccount. */
                        public baseVestingAccount?: (cosmos_sdk.x.auth.vesting.v1.IBaseVestingAccount|null);

                        /** PeriodicVestingAccount startTime. */
                        public startTime: (number|Long);

                        /** PeriodicVestingAccount vestingPeriods. */
                        public vestingPeriods: cosmos_sdk.x.auth.vesting.v1.IPeriod[];

                        /**
                         * Creates a new PeriodicVestingAccount instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns PeriodicVestingAccount instance
                         */
                        public static create(properties?: cosmos_sdk.x.auth.vesting.v1.IPeriodicVestingAccount): cosmos_sdk.x.auth.vesting.v1.PeriodicVestingAccount;

                        /**
                         * Encodes the specified PeriodicVestingAccount message. Does not implicitly {@link cosmos_sdk.x.auth.vesting.v1.PeriodicVestingAccount.verify|verify} messages.
                         * @param m PeriodicVestingAccount message or plain object to encode
                         * @param [w] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(m: cosmos_sdk.x.auth.vesting.v1.IPeriodicVestingAccount, w?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a PeriodicVestingAccount message from the specified reader or buffer.
                         * @param r Reader or buffer to decode from
                         * @param [l] Message length if known beforehand
                         * @returns PeriodicVestingAccount
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.auth.vesting.v1.PeriodicVestingAccount;
                    }
                }
            }
        }

        /** Namespace bank. */
        namespace bank {

            /** Namespace v1. */
            namespace v1 {

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
                    public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): Query;

                    /**
                     * Calls Balance.
                     * @param request QueryBalanceRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and QueryBalanceResponse
                     */
                    public balance(request: cosmos_sdk.x.bank.v1.IQueryBalanceRequest, callback: cosmos_sdk.x.bank.v1.Query.BalanceCallback): void;

                    /**
                     * Calls Balance.
                     * @param request QueryBalanceRequest message or plain object
                     * @returns Promise
                     */
                    public balance(request: cosmos_sdk.x.bank.v1.IQueryBalanceRequest): Promise<cosmos_sdk.x.bank.v1.QueryBalanceResponse>;

                    /**
                     * Calls AllBalances.
                     * @param request QueryAllBalancesRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and QueryAllBalancesResponse
                     */
                    public allBalances(request: cosmos_sdk.x.bank.v1.IQueryAllBalancesRequest, callback: cosmos_sdk.x.bank.v1.Query.AllBalancesCallback): void;

                    /**
                     * Calls AllBalances.
                     * @param request QueryAllBalancesRequest message or plain object
                     * @returns Promise
                     */
                    public allBalances(request: cosmos_sdk.x.bank.v1.IQueryAllBalancesRequest): Promise<cosmos_sdk.x.bank.v1.QueryAllBalancesResponse>;

                    /**
                     * Calls TotalSupply.
                     * @param request QueryTotalSupplyRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and QueryTotalSupplyResponse
                     */
                    public totalSupply(request: cosmos_sdk.x.bank.v1.IQueryTotalSupplyRequest, callback: cosmos_sdk.x.bank.v1.Query.TotalSupplyCallback): void;

                    /**
                     * Calls TotalSupply.
                     * @param request QueryTotalSupplyRequest message or plain object
                     * @returns Promise
                     */
                    public totalSupply(request: cosmos_sdk.x.bank.v1.IQueryTotalSupplyRequest): Promise<cosmos_sdk.x.bank.v1.QueryTotalSupplyResponse>;

                    /**
                     * Calls SupplyOf.
                     * @param request QuerySupplyOfRequest message or plain object
                     * @param callback Node-style callback called with the error, if any, and QuerySupplyOfResponse
                     */
                    public supplyOf(request: cosmos_sdk.x.bank.v1.IQuerySupplyOfRequest, callback: cosmos_sdk.x.bank.v1.Query.SupplyOfCallback): void;

                    /**
                     * Calls SupplyOf.
                     * @param request QuerySupplyOfRequest message or plain object
                     * @returns Promise
                     */
                    public supplyOf(request: cosmos_sdk.x.bank.v1.IQuerySupplyOfRequest): Promise<cosmos_sdk.x.bank.v1.QuerySupplyOfResponse>;
                }

                namespace Query {

                    /**
                     * Callback as used by {@link cosmos_sdk.x.bank.v1.Query#balance}.
                     * @param error Error, if any
                     * @param [response] QueryBalanceResponse
                     */
                    type BalanceCallback = (error: (Error|null), response?: cosmos_sdk.x.bank.v1.QueryBalanceResponse) => void;

                    /**
                     * Callback as used by {@link cosmos_sdk.x.bank.v1.Query#allBalances}.
                     * @param error Error, if any
                     * @param [response] QueryAllBalancesResponse
                     */
                    type AllBalancesCallback = (error: (Error|null), response?: cosmos_sdk.x.bank.v1.QueryAllBalancesResponse) => void;

                    /**
                     * Callback as used by {@link cosmos_sdk.x.bank.v1.Query#totalSupply}.
                     * @param error Error, if any
                     * @param [response] QueryTotalSupplyResponse
                     */
                    type TotalSupplyCallback = (error: (Error|null), response?: cosmos_sdk.x.bank.v1.QueryTotalSupplyResponse) => void;

                    /**
                     * Callback as used by {@link cosmos_sdk.x.bank.v1.Query#supplyOf}.
                     * @param error Error, if any
                     * @param [response] QuerySupplyOfResponse
                     */
                    type SupplyOfCallback = (error: (Error|null), response?: cosmos_sdk.x.bank.v1.QuerySupplyOfResponse) => void;
                }

                /** Properties of a QueryBalanceRequest. */
                interface IQueryBalanceRequest {

                    /** QueryBalanceRequest address */
                    address?: (Uint8Array|null);

                    /** QueryBalanceRequest denom */
                    denom?: (string|null);
                }

                /** Represents a QueryBalanceRequest. */
                class QueryBalanceRequest implements IQueryBalanceRequest {

                    /**
                     * Constructs a new QueryBalanceRequest.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.bank.v1.IQueryBalanceRequest);

                    /** QueryBalanceRequest address. */
                    public address: Uint8Array;

                    /** QueryBalanceRequest denom. */
                    public denom: string;

                    /**
                     * Creates a new QueryBalanceRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns QueryBalanceRequest instance
                     */
                    public static create(properties?: cosmos_sdk.x.bank.v1.IQueryBalanceRequest): cosmos_sdk.x.bank.v1.QueryBalanceRequest;

                    /**
                     * Encodes the specified QueryBalanceRequest message. Does not implicitly {@link cosmos_sdk.x.bank.v1.QueryBalanceRequest.verify|verify} messages.
                     * @param m QueryBalanceRequest message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.bank.v1.IQueryBalanceRequest, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a QueryBalanceRequest message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns QueryBalanceRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.bank.v1.QueryBalanceRequest;
                }

                /** Properties of a QueryBalanceResponse. */
                interface IQueryBalanceResponse {

                    /** QueryBalanceResponse balance */
                    balance?: (cosmos_sdk.v1.ICoin|null);
                }

                /** Represents a QueryBalanceResponse. */
                class QueryBalanceResponse implements IQueryBalanceResponse {

                    /**
                     * Constructs a new QueryBalanceResponse.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.bank.v1.IQueryBalanceResponse);

                    /** QueryBalanceResponse balance. */
                    public balance?: (cosmos_sdk.v1.ICoin|null);

                    /**
                     * Creates a new QueryBalanceResponse instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns QueryBalanceResponse instance
                     */
                    public static create(properties?: cosmos_sdk.x.bank.v1.IQueryBalanceResponse): cosmos_sdk.x.bank.v1.QueryBalanceResponse;

                    /**
                     * Encodes the specified QueryBalanceResponse message. Does not implicitly {@link cosmos_sdk.x.bank.v1.QueryBalanceResponse.verify|verify} messages.
                     * @param m QueryBalanceResponse message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.bank.v1.IQueryBalanceResponse, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a QueryBalanceResponse message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns QueryBalanceResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.bank.v1.QueryBalanceResponse;
                }

                /** Properties of a QueryAllBalancesRequest. */
                interface IQueryAllBalancesRequest {

                    /** QueryAllBalancesRequest address */
                    address?: (Uint8Array|null);
                }

                /** Represents a QueryAllBalancesRequest. */
                class QueryAllBalancesRequest implements IQueryAllBalancesRequest {

                    /**
                     * Constructs a new QueryAllBalancesRequest.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.bank.v1.IQueryAllBalancesRequest);

                    /** QueryAllBalancesRequest address. */
                    public address: Uint8Array;

                    /**
                     * Creates a new QueryAllBalancesRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns QueryAllBalancesRequest instance
                     */
                    public static create(properties?: cosmos_sdk.x.bank.v1.IQueryAllBalancesRequest): cosmos_sdk.x.bank.v1.QueryAllBalancesRequest;

                    /**
                     * Encodes the specified QueryAllBalancesRequest message. Does not implicitly {@link cosmos_sdk.x.bank.v1.QueryAllBalancesRequest.verify|verify} messages.
                     * @param m QueryAllBalancesRequest message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.bank.v1.IQueryAllBalancesRequest, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a QueryAllBalancesRequest message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns QueryAllBalancesRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.bank.v1.QueryAllBalancesRequest;
                }

                /** Properties of a QueryAllBalancesResponse. */
                interface IQueryAllBalancesResponse {

                    /** QueryAllBalancesResponse balances */
                    balances?: (cosmos_sdk.v1.ICoin[]|null);
                }

                /** Represents a QueryAllBalancesResponse. */
                class QueryAllBalancesResponse implements IQueryAllBalancesResponse {

                    /**
                     * Constructs a new QueryAllBalancesResponse.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.bank.v1.IQueryAllBalancesResponse);

                    /** QueryAllBalancesResponse balances. */
                    public balances: cosmos_sdk.v1.ICoin[];

                    /**
                     * Creates a new QueryAllBalancesResponse instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns QueryAllBalancesResponse instance
                     */
                    public static create(properties?: cosmos_sdk.x.bank.v1.IQueryAllBalancesResponse): cosmos_sdk.x.bank.v1.QueryAllBalancesResponse;

                    /**
                     * Encodes the specified QueryAllBalancesResponse message. Does not implicitly {@link cosmos_sdk.x.bank.v1.QueryAllBalancesResponse.verify|verify} messages.
                     * @param m QueryAllBalancesResponse message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.bank.v1.IQueryAllBalancesResponse, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a QueryAllBalancesResponse message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns QueryAllBalancesResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.bank.v1.QueryAllBalancesResponse;
                }

                /** Properties of a QueryTotalSupplyRequest. */
                interface IQueryTotalSupplyRequest {
                }

                /** Represents a QueryTotalSupplyRequest. */
                class QueryTotalSupplyRequest implements IQueryTotalSupplyRequest {

                    /**
                     * Constructs a new QueryTotalSupplyRequest.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.bank.v1.IQueryTotalSupplyRequest);

                    /**
                     * Creates a new QueryTotalSupplyRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns QueryTotalSupplyRequest instance
                     */
                    public static create(properties?: cosmos_sdk.x.bank.v1.IQueryTotalSupplyRequest): cosmos_sdk.x.bank.v1.QueryTotalSupplyRequest;

                    /**
                     * Encodes the specified QueryTotalSupplyRequest message. Does not implicitly {@link cosmos_sdk.x.bank.v1.QueryTotalSupplyRequest.verify|verify} messages.
                     * @param m QueryTotalSupplyRequest message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.bank.v1.IQueryTotalSupplyRequest, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a QueryTotalSupplyRequest message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns QueryTotalSupplyRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.bank.v1.QueryTotalSupplyRequest;
                }

                /** Properties of a QueryTotalSupplyResponse. */
                interface IQueryTotalSupplyResponse {

                    /** QueryTotalSupplyResponse supply */
                    supply?: (cosmos_sdk.v1.ICoin[]|null);
                }

                /** Represents a QueryTotalSupplyResponse. */
                class QueryTotalSupplyResponse implements IQueryTotalSupplyResponse {

                    /**
                     * Constructs a new QueryTotalSupplyResponse.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.bank.v1.IQueryTotalSupplyResponse);

                    /** QueryTotalSupplyResponse supply. */
                    public supply: cosmos_sdk.v1.ICoin[];

                    /**
                     * Creates a new QueryTotalSupplyResponse instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns QueryTotalSupplyResponse instance
                     */
                    public static create(properties?: cosmos_sdk.x.bank.v1.IQueryTotalSupplyResponse): cosmos_sdk.x.bank.v1.QueryTotalSupplyResponse;

                    /**
                     * Encodes the specified QueryTotalSupplyResponse message. Does not implicitly {@link cosmos_sdk.x.bank.v1.QueryTotalSupplyResponse.verify|verify} messages.
                     * @param m QueryTotalSupplyResponse message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.bank.v1.IQueryTotalSupplyResponse, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a QueryTotalSupplyResponse message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns QueryTotalSupplyResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.bank.v1.QueryTotalSupplyResponse;
                }

                /** Properties of a QuerySupplyOfRequest. */
                interface IQuerySupplyOfRequest {

                    /** QuerySupplyOfRequest denom */
                    denom?: (string|null);
                }

                /** Represents a QuerySupplyOfRequest. */
                class QuerySupplyOfRequest implements IQuerySupplyOfRequest {

                    /**
                     * Constructs a new QuerySupplyOfRequest.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.bank.v1.IQuerySupplyOfRequest);

                    /** QuerySupplyOfRequest denom. */
                    public denom: string;

                    /**
                     * Creates a new QuerySupplyOfRequest instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns QuerySupplyOfRequest instance
                     */
                    public static create(properties?: cosmos_sdk.x.bank.v1.IQuerySupplyOfRequest): cosmos_sdk.x.bank.v1.QuerySupplyOfRequest;

                    /**
                     * Encodes the specified QuerySupplyOfRequest message. Does not implicitly {@link cosmos_sdk.x.bank.v1.QuerySupplyOfRequest.verify|verify} messages.
                     * @param m QuerySupplyOfRequest message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.bank.v1.IQuerySupplyOfRequest, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a QuerySupplyOfRequest message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns QuerySupplyOfRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.bank.v1.QuerySupplyOfRequest;
                }

                /** Properties of a QuerySupplyOfResponse. */
                interface IQuerySupplyOfResponse {

                    /** QuerySupplyOfResponse amount */
                    amount?: (string|null);
                }

                /** Represents a QuerySupplyOfResponse. */
                class QuerySupplyOfResponse implements IQuerySupplyOfResponse {

                    /**
                     * Constructs a new QuerySupplyOfResponse.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.bank.v1.IQuerySupplyOfResponse);

                    /** QuerySupplyOfResponse amount. */
                    public amount: string;

                    /**
                     * Creates a new QuerySupplyOfResponse instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns QuerySupplyOfResponse instance
                     */
                    public static create(properties?: cosmos_sdk.x.bank.v1.IQuerySupplyOfResponse): cosmos_sdk.x.bank.v1.QuerySupplyOfResponse;

                    /**
                     * Encodes the specified QuerySupplyOfResponse message. Does not implicitly {@link cosmos_sdk.x.bank.v1.QuerySupplyOfResponse.verify|verify} messages.
                     * @param m QuerySupplyOfResponse message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.bank.v1.IQuerySupplyOfResponse, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a QuerySupplyOfResponse message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns QuerySupplyOfResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.bank.v1.QuerySupplyOfResponse;
                }

                /** Properties of a MsgSend. */
                interface IMsgSend {

                    /** MsgSend fromAddress */
                    fromAddress?: (Uint8Array|null);

                    /** MsgSend toAddress */
                    toAddress?: (Uint8Array|null);

                    /** MsgSend amount */
                    amount?: (cosmos_sdk.v1.ICoin[]|null);
                }

                /** Represents a MsgSend. */
                class MsgSend implements IMsgSend {

                    /**
                     * Constructs a new MsgSend.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.bank.v1.IMsgSend);

                    /** MsgSend fromAddress. */
                    public fromAddress: Uint8Array;

                    /** MsgSend toAddress. */
                    public toAddress: Uint8Array;

                    /** MsgSend amount. */
                    public amount: cosmos_sdk.v1.ICoin[];

                    /**
                     * Creates a new MsgSend instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns MsgSend instance
                     */
                    public static create(properties?: cosmos_sdk.x.bank.v1.IMsgSend): cosmos_sdk.x.bank.v1.MsgSend;

                    /**
                     * Encodes the specified MsgSend message. Does not implicitly {@link cosmos_sdk.x.bank.v1.MsgSend.verify|verify} messages.
                     * @param m MsgSend message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.bank.v1.IMsgSend, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a MsgSend message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns MsgSend
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.bank.v1.MsgSend;
                }

                /** Properties of an Input. */
                interface IInput {

                    /** Input address */
                    address?: (Uint8Array|null);

                    /** Input coins */
                    coins?: (cosmos_sdk.v1.ICoin[]|null);
                }

                /** Represents an Input. */
                class Input implements IInput {

                    /**
                     * Constructs a new Input.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.bank.v1.IInput);

                    /** Input address. */
                    public address: Uint8Array;

                    /** Input coins. */
                    public coins: cosmos_sdk.v1.ICoin[];

                    /**
                     * Creates a new Input instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Input instance
                     */
                    public static create(properties?: cosmos_sdk.x.bank.v1.IInput): cosmos_sdk.x.bank.v1.Input;

                    /**
                     * Encodes the specified Input message. Does not implicitly {@link cosmos_sdk.x.bank.v1.Input.verify|verify} messages.
                     * @param m Input message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.bank.v1.IInput, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an Input message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns Input
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.bank.v1.Input;
                }

                /** Properties of an Output. */
                interface IOutput {

                    /** Output address */
                    address?: (Uint8Array|null);

                    /** Output coins */
                    coins?: (cosmos_sdk.v1.ICoin[]|null);
                }

                /** Represents an Output. */
                class Output implements IOutput {

                    /**
                     * Constructs a new Output.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.bank.v1.IOutput);

                    /** Output address. */
                    public address: Uint8Array;

                    /** Output coins. */
                    public coins: cosmos_sdk.v1.ICoin[];

                    /**
                     * Creates a new Output instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Output instance
                     */
                    public static create(properties?: cosmos_sdk.x.bank.v1.IOutput): cosmos_sdk.x.bank.v1.Output;

                    /**
                     * Encodes the specified Output message. Does not implicitly {@link cosmos_sdk.x.bank.v1.Output.verify|verify} messages.
                     * @param m Output message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.bank.v1.IOutput, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an Output message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns Output
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.bank.v1.Output;
                }

                /** Properties of a MsgMultiSend. */
                interface IMsgMultiSend {

                    /** MsgMultiSend inputs */
                    inputs?: (cosmos_sdk.x.bank.v1.IInput[]|null);

                    /** MsgMultiSend outputs */
                    outputs?: (cosmos_sdk.x.bank.v1.IOutput[]|null);
                }

                /** Represents a MsgMultiSend. */
                class MsgMultiSend implements IMsgMultiSend {

                    /**
                     * Constructs a new MsgMultiSend.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.bank.v1.IMsgMultiSend);

                    /** MsgMultiSend inputs. */
                    public inputs: cosmos_sdk.x.bank.v1.IInput[];

                    /** MsgMultiSend outputs. */
                    public outputs: cosmos_sdk.x.bank.v1.IOutput[];

                    /**
                     * Creates a new MsgMultiSend instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns MsgMultiSend instance
                     */
                    public static create(properties?: cosmos_sdk.x.bank.v1.IMsgMultiSend): cosmos_sdk.x.bank.v1.MsgMultiSend;

                    /**
                     * Encodes the specified MsgMultiSend message. Does not implicitly {@link cosmos_sdk.x.bank.v1.MsgMultiSend.verify|verify} messages.
                     * @param m MsgMultiSend message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.bank.v1.IMsgMultiSend, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a MsgMultiSend message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns MsgMultiSend
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.bank.v1.MsgMultiSend;
                }

                /** Properties of a Supply. */
                interface ISupply {

                    /** Supply total */
                    total?: (cosmos_sdk.v1.ICoin[]|null);
                }

                /** Represents a Supply. */
                class Supply implements ISupply {

                    /**
                     * Constructs a new Supply.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.bank.v1.ISupply);

                    /** Supply total. */
                    public total: cosmos_sdk.v1.ICoin[];

                    /**
                     * Creates a new Supply instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Supply instance
                     */
                    public static create(properties?: cosmos_sdk.x.bank.v1.ISupply): cosmos_sdk.x.bank.v1.Supply;

                    /**
                     * Encodes the specified Supply message. Does not implicitly {@link cosmos_sdk.x.bank.v1.Supply.verify|verify} messages.
                     * @param m Supply message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.bank.v1.ISupply, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Supply message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns Supply
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.bank.v1.Supply;
                }
            }
        }

        /** Namespace capability. */
        namespace capability {

            /** Namespace v1. */
            namespace v1 {

                /** Properties of a Capability. */
                interface ICapability {

                    /** Capability index */
                    index?: (number|Long|null);
                }

                /** Represents a Capability. */
                class Capability implements ICapability {

                    /**
                     * Constructs a new Capability.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.capability.v1.ICapability);

                    /** Capability index. */
                    public index: (number|Long);

                    /**
                     * Creates a new Capability instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Capability instance
                     */
                    public static create(properties?: cosmos_sdk.x.capability.v1.ICapability): cosmos_sdk.x.capability.v1.Capability;

                    /**
                     * Encodes the specified Capability message. Does not implicitly {@link cosmos_sdk.x.capability.v1.Capability.verify|verify} messages.
                     * @param m Capability message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.capability.v1.ICapability, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Capability message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns Capability
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.capability.v1.Capability;
                }

                /** Properties of an Owner. */
                interface IOwner {

                    /** Owner module */
                    module?: (string|null);

                    /** Owner name */
                    name?: (string|null);
                }

                /** Represents an Owner. */
                class Owner implements IOwner {

                    /**
                     * Constructs a new Owner.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.capability.v1.IOwner);

                    /** Owner module. */
                    public module: string;

                    /** Owner name. */
                    public name: string;

                    /**
                     * Creates a new Owner instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Owner instance
                     */
                    public static create(properties?: cosmos_sdk.x.capability.v1.IOwner): cosmos_sdk.x.capability.v1.Owner;

                    /**
                     * Encodes the specified Owner message. Does not implicitly {@link cosmos_sdk.x.capability.v1.Owner.verify|verify} messages.
                     * @param m Owner message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.capability.v1.IOwner, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an Owner message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns Owner
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.capability.v1.Owner;
                }

                /** Properties of a CapabilityOwners. */
                interface ICapabilityOwners {

                    /** CapabilityOwners owners */
                    owners?: (cosmos_sdk.x.capability.v1.IOwner[]|null);
                }

                /** Represents a CapabilityOwners. */
                class CapabilityOwners implements ICapabilityOwners {

                    /**
                     * Constructs a new CapabilityOwners.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.capability.v1.ICapabilityOwners);

                    /** CapabilityOwners owners. */
                    public owners: cosmos_sdk.x.capability.v1.IOwner[];

                    /**
                     * Creates a new CapabilityOwners instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns CapabilityOwners instance
                     */
                    public static create(properties?: cosmos_sdk.x.capability.v1.ICapabilityOwners): cosmos_sdk.x.capability.v1.CapabilityOwners;

                    /**
                     * Encodes the specified CapabilityOwners message. Does not implicitly {@link cosmos_sdk.x.capability.v1.CapabilityOwners.verify|verify} messages.
                     * @param m CapabilityOwners message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.capability.v1.ICapabilityOwners, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a CapabilityOwners message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns CapabilityOwners
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.capability.v1.CapabilityOwners;
                }
            }
        }

        /** Namespace crisis. */
        namespace crisis {

            /** Namespace v1. */
            namespace v1 {

                /** Properties of a MsgVerifyInvariant. */
                interface IMsgVerifyInvariant {

                    /** MsgVerifyInvariant sender */
                    sender?: (Uint8Array|null);

                    /** MsgVerifyInvariant invariantModuleName */
                    invariantModuleName?: (string|null);

                    /** MsgVerifyInvariant invariantRoute */
                    invariantRoute?: (string|null);
                }

                /** Represents a MsgVerifyInvariant. */
                class MsgVerifyInvariant implements IMsgVerifyInvariant {

                    /**
                     * Constructs a new MsgVerifyInvariant.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.crisis.v1.IMsgVerifyInvariant);

                    /** MsgVerifyInvariant sender. */
                    public sender: Uint8Array;

                    /** MsgVerifyInvariant invariantModuleName. */
                    public invariantModuleName: string;

                    /** MsgVerifyInvariant invariantRoute. */
                    public invariantRoute: string;

                    /**
                     * Creates a new MsgVerifyInvariant instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns MsgVerifyInvariant instance
                     */
                    public static create(properties?: cosmos_sdk.x.crisis.v1.IMsgVerifyInvariant): cosmos_sdk.x.crisis.v1.MsgVerifyInvariant;

                    /**
                     * Encodes the specified MsgVerifyInvariant message. Does not implicitly {@link cosmos_sdk.x.crisis.v1.MsgVerifyInvariant.verify|verify} messages.
                     * @param m MsgVerifyInvariant message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.crisis.v1.IMsgVerifyInvariant, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a MsgVerifyInvariant message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns MsgVerifyInvariant
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.crisis.v1.MsgVerifyInvariant;
                }
            }
        }

        /** Namespace distribution. */
        namespace distribution {

            /** Namespace v1. */
            namespace v1 {

                /** Properties of a MsgSetWithdrawAddress. */
                interface IMsgSetWithdrawAddress {

                    /** MsgSetWithdrawAddress delegatorAddress */
                    delegatorAddress?: (Uint8Array|null);

                    /** MsgSetWithdrawAddress withdrawAddress */
                    withdrawAddress?: (Uint8Array|null);
                }

                /** Represents a MsgSetWithdrawAddress. */
                class MsgSetWithdrawAddress implements IMsgSetWithdrawAddress {

                    /**
                     * Constructs a new MsgSetWithdrawAddress.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.distribution.v1.IMsgSetWithdrawAddress);

                    /** MsgSetWithdrawAddress delegatorAddress. */
                    public delegatorAddress: Uint8Array;

                    /** MsgSetWithdrawAddress withdrawAddress. */
                    public withdrawAddress: Uint8Array;

                    /**
                     * Creates a new MsgSetWithdrawAddress instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns MsgSetWithdrawAddress instance
                     */
                    public static create(properties?: cosmos_sdk.x.distribution.v1.IMsgSetWithdrawAddress): cosmos_sdk.x.distribution.v1.MsgSetWithdrawAddress;

                    /**
                     * Encodes the specified MsgSetWithdrawAddress message. Does not implicitly {@link cosmos_sdk.x.distribution.v1.MsgSetWithdrawAddress.verify|verify} messages.
                     * @param m MsgSetWithdrawAddress message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.distribution.v1.IMsgSetWithdrawAddress, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a MsgSetWithdrawAddress message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns MsgSetWithdrawAddress
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.distribution.v1.MsgSetWithdrawAddress;
                }

                /** Properties of a MsgWithdrawDelegatorReward. */
                interface IMsgWithdrawDelegatorReward {

                    /** MsgWithdrawDelegatorReward delegatorAddress */
                    delegatorAddress?: (Uint8Array|null);

                    /** MsgWithdrawDelegatorReward validatorAddress */
                    validatorAddress?: (Uint8Array|null);
                }

                /** Represents a MsgWithdrawDelegatorReward. */
                class MsgWithdrawDelegatorReward implements IMsgWithdrawDelegatorReward {

                    /**
                     * Constructs a new MsgWithdrawDelegatorReward.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.distribution.v1.IMsgWithdrawDelegatorReward);

                    /** MsgWithdrawDelegatorReward delegatorAddress. */
                    public delegatorAddress: Uint8Array;

                    /** MsgWithdrawDelegatorReward validatorAddress. */
                    public validatorAddress: Uint8Array;

                    /**
                     * Creates a new MsgWithdrawDelegatorReward instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns MsgWithdrawDelegatorReward instance
                     */
                    public static create(properties?: cosmos_sdk.x.distribution.v1.IMsgWithdrawDelegatorReward): cosmos_sdk.x.distribution.v1.MsgWithdrawDelegatorReward;

                    /**
                     * Encodes the specified MsgWithdrawDelegatorReward message. Does not implicitly {@link cosmos_sdk.x.distribution.v1.MsgWithdrawDelegatorReward.verify|verify} messages.
                     * @param m MsgWithdrawDelegatorReward message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.distribution.v1.IMsgWithdrawDelegatorReward, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a MsgWithdrawDelegatorReward message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns MsgWithdrawDelegatorReward
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.distribution.v1.MsgWithdrawDelegatorReward;
                }

                /** Properties of a MsgWithdrawValidatorCommission. */
                interface IMsgWithdrawValidatorCommission {

                    /** MsgWithdrawValidatorCommission validatorAddress */
                    validatorAddress?: (Uint8Array|null);
                }

                /** Represents a MsgWithdrawValidatorCommission. */
                class MsgWithdrawValidatorCommission implements IMsgWithdrawValidatorCommission {

                    /**
                     * Constructs a new MsgWithdrawValidatorCommission.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.distribution.v1.IMsgWithdrawValidatorCommission);

                    /** MsgWithdrawValidatorCommission validatorAddress. */
                    public validatorAddress: Uint8Array;

                    /**
                     * Creates a new MsgWithdrawValidatorCommission instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns MsgWithdrawValidatorCommission instance
                     */
                    public static create(properties?: cosmos_sdk.x.distribution.v1.IMsgWithdrawValidatorCommission): cosmos_sdk.x.distribution.v1.MsgWithdrawValidatorCommission;

                    /**
                     * Encodes the specified MsgWithdrawValidatorCommission message. Does not implicitly {@link cosmos_sdk.x.distribution.v1.MsgWithdrawValidatorCommission.verify|verify} messages.
                     * @param m MsgWithdrawValidatorCommission message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.distribution.v1.IMsgWithdrawValidatorCommission, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a MsgWithdrawValidatorCommission message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns MsgWithdrawValidatorCommission
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.distribution.v1.MsgWithdrawValidatorCommission;
                }

                /** Properties of a MsgFundCommunityPool. */
                interface IMsgFundCommunityPool {

                    /** MsgFundCommunityPool amount */
                    amount?: (cosmos_sdk.v1.ICoin[]|null);

                    /** MsgFundCommunityPool depositor */
                    depositor?: (Uint8Array|null);
                }

                /** Represents a MsgFundCommunityPool. */
                class MsgFundCommunityPool implements IMsgFundCommunityPool {

                    /**
                     * Constructs a new MsgFundCommunityPool.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.distribution.v1.IMsgFundCommunityPool);

                    /** MsgFundCommunityPool amount. */
                    public amount: cosmos_sdk.v1.ICoin[];

                    /** MsgFundCommunityPool depositor. */
                    public depositor: Uint8Array;

                    /**
                     * Creates a new MsgFundCommunityPool instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns MsgFundCommunityPool instance
                     */
                    public static create(properties?: cosmos_sdk.x.distribution.v1.IMsgFundCommunityPool): cosmos_sdk.x.distribution.v1.MsgFundCommunityPool;

                    /**
                     * Encodes the specified MsgFundCommunityPool message. Does not implicitly {@link cosmos_sdk.x.distribution.v1.MsgFundCommunityPool.verify|verify} messages.
                     * @param m MsgFundCommunityPool message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.distribution.v1.IMsgFundCommunityPool, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a MsgFundCommunityPool message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns MsgFundCommunityPool
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.distribution.v1.MsgFundCommunityPool;
                }

                /** Properties of a Params. */
                interface IParams {

                    /** Params communityTax */
                    communityTax?: (string|null);

                    /** Params baseProposerReward */
                    baseProposerReward?: (string|null);

                    /** Params bonusProposerReward */
                    bonusProposerReward?: (string|null);

                    /** Params withdrawAddrEnabled */
                    withdrawAddrEnabled?: (boolean|null);
                }

                /** Represents a Params. */
                class Params implements IParams {

                    /**
                     * Constructs a new Params.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.distribution.v1.IParams);

                    /** Params communityTax. */
                    public communityTax: string;

                    /** Params baseProposerReward. */
                    public baseProposerReward: string;

                    /** Params bonusProposerReward. */
                    public bonusProposerReward: string;

                    /** Params withdrawAddrEnabled. */
                    public withdrawAddrEnabled: boolean;

                    /**
                     * Creates a new Params instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Params instance
                     */
                    public static create(properties?: cosmos_sdk.x.distribution.v1.IParams): cosmos_sdk.x.distribution.v1.Params;

                    /**
                     * Encodes the specified Params message. Does not implicitly {@link cosmos_sdk.x.distribution.v1.Params.verify|verify} messages.
                     * @param m Params message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.distribution.v1.IParams, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Params message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns Params
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.distribution.v1.Params;
                }

                /** Properties of a ValidatorHistoricalRewards. */
                interface IValidatorHistoricalRewards {

                    /** ValidatorHistoricalRewards cumulativeRewardRatio */
                    cumulativeRewardRatio?: (cosmos_sdk.v1.IDecCoin[]|null);

                    /** ValidatorHistoricalRewards referenceCount */
                    referenceCount?: (number|null);
                }

                /** Represents a ValidatorHistoricalRewards. */
                class ValidatorHistoricalRewards implements IValidatorHistoricalRewards {

                    /**
                     * Constructs a new ValidatorHistoricalRewards.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.distribution.v1.IValidatorHistoricalRewards);

                    /** ValidatorHistoricalRewards cumulativeRewardRatio. */
                    public cumulativeRewardRatio: cosmos_sdk.v1.IDecCoin[];

                    /** ValidatorHistoricalRewards referenceCount. */
                    public referenceCount: number;

                    /**
                     * Creates a new ValidatorHistoricalRewards instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ValidatorHistoricalRewards instance
                     */
                    public static create(properties?: cosmos_sdk.x.distribution.v1.IValidatorHistoricalRewards): cosmos_sdk.x.distribution.v1.ValidatorHistoricalRewards;

                    /**
                     * Encodes the specified ValidatorHistoricalRewards message. Does not implicitly {@link cosmos_sdk.x.distribution.v1.ValidatorHistoricalRewards.verify|verify} messages.
                     * @param m ValidatorHistoricalRewards message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.distribution.v1.IValidatorHistoricalRewards, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ValidatorHistoricalRewards message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns ValidatorHistoricalRewards
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.distribution.v1.ValidatorHistoricalRewards;
                }

                /** Properties of a ValidatorCurrentRewards. */
                interface IValidatorCurrentRewards {

                    /** ValidatorCurrentRewards rewards */
                    rewards?: (cosmos_sdk.v1.IDecCoin[]|null);

                    /** ValidatorCurrentRewards period */
                    period?: (number|Long|null);
                }

                /** Represents a ValidatorCurrentRewards. */
                class ValidatorCurrentRewards implements IValidatorCurrentRewards {

                    /**
                     * Constructs a new ValidatorCurrentRewards.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.distribution.v1.IValidatorCurrentRewards);

                    /** ValidatorCurrentRewards rewards. */
                    public rewards: cosmos_sdk.v1.IDecCoin[];

                    /** ValidatorCurrentRewards period. */
                    public period: (number|Long);

                    /**
                     * Creates a new ValidatorCurrentRewards instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ValidatorCurrentRewards instance
                     */
                    public static create(properties?: cosmos_sdk.x.distribution.v1.IValidatorCurrentRewards): cosmos_sdk.x.distribution.v1.ValidatorCurrentRewards;

                    /**
                     * Encodes the specified ValidatorCurrentRewards message. Does not implicitly {@link cosmos_sdk.x.distribution.v1.ValidatorCurrentRewards.verify|verify} messages.
                     * @param m ValidatorCurrentRewards message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.distribution.v1.IValidatorCurrentRewards, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ValidatorCurrentRewards message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns ValidatorCurrentRewards
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.distribution.v1.ValidatorCurrentRewards;
                }

                /** Properties of a ValidatorAccumulatedCommission. */
                interface IValidatorAccumulatedCommission {

                    /** ValidatorAccumulatedCommission commission */
                    commission?: (cosmos_sdk.v1.IDecCoin[]|null);
                }

                /** Represents a ValidatorAccumulatedCommission. */
                class ValidatorAccumulatedCommission implements IValidatorAccumulatedCommission {

                    /**
                     * Constructs a new ValidatorAccumulatedCommission.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.distribution.v1.IValidatorAccumulatedCommission);

                    /** ValidatorAccumulatedCommission commission. */
                    public commission: cosmos_sdk.v1.IDecCoin[];

                    /**
                     * Creates a new ValidatorAccumulatedCommission instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ValidatorAccumulatedCommission instance
                     */
                    public static create(properties?: cosmos_sdk.x.distribution.v1.IValidatorAccumulatedCommission): cosmos_sdk.x.distribution.v1.ValidatorAccumulatedCommission;

                    /**
                     * Encodes the specified ValidatorAccumulatedCommission message. Does not implicitly {@link cosmos_sdk.x.distribution.v1.ValidatorAccumulatedCommission.verify|verify} messages.
                     * @param m ValidatorAccumulatedCommission message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.distribution.v1.IValidatorAccumulatedCommission, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ValidatorAccumulatedCommission message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns ValidatorAccumulatedCommission
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.distribution.v1.ValidatorAccumulatedCommission;
                }

                /** Properties of a ValidatorOutstandingRewards. */
                interface IValidatorOutstandingRewards {

                    /** ValidatorOutstandingRewards rewards */
                    rewards?: (cosmos_sdk.v1.IDecCoin[]|null);
                }

                /** Represents a ValidatorOutstandingRewards. */
                class ValidatorOutstandingRewards implements IValidatorOutstandingRewards {

                    /**
                     * Constructs a new ValidatorOutstandingRewards.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.distribution.v1.IValidatorOutstandingRewards);

                    /** ValidatorOutstandingRewards rewards. */
                    public rewards: cosmos_sdk.v1.IDecCoin[];

                    /**
                     * Creates a new ValidatorOutstandingRewards instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ValidatorOutstandingRewards instance
                     */
                    public static create(properties?: cosmos_sdk.x.distribution.v1.IValidatorOutstandingRewards): cosmos_sdk.x.distribution.v1.ValidatorOutstandingRewards;

                    /**
                     * Encodes the specified ValidatorOutstandingRewards message. Does not implicitly {@link cosmos_sdk.x.distribution.v1.ValidatorOutstandingRewards.verify|verify} messages.
                     * @param m ValidatorOutstandingRewards message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.distribution.v1.IValidatorOutstandingRewards, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ValidatorOutstandingRewards message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns ValidatorOutstandingRewards
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.distribution.v1.ValidatorOutstandingRewards;
                }

                /** Properties of a ValidatorSlashEvent. */
                interface IValidatorSlashEvent {

                    /** ValidatorSlashEvent validatorPeriod */
                    validatorPeriod?: (number|Long|null);

                    /** ValidatorSlashEvent fraction */
                    fraction?: (string|null);
                }

                /** Represents a ValidatorSlashEvent. */
                class ValidatorSlashEvent implements IValidatorSlashEvent {

                    /**
                     * Constructs a new ValidatorSlashEvent.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.distribution.v1.IValidatorSlashEvent);

                    /** ValidatorSlashEvent validatorPeriod. */
                    public validatorPeriod: (number|Long);

                    /** ValidatorSlashEvent fraction. */
                    public fraction: string;

                    /**
                     * Creates a new ValidatorSlashEvent instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ValidatorSlashEvent instance
                     */
                    public static create(properties?: cosmos_sdk.x.distribution.v1.IValidatorSlashEvent): cosmos_sdk.x.distribution.v1.ValidatorSlashEvent;

                    /**
                     * Encodes the specified ValidatorSlashEvent message. Does not implicitly {@link cosmos_sdk.x.distribution.v1.ValidatorSlashEvent.verify|verify} messages.
                     * @param m ValidatorSlashEvent message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.distribution.v1.IValidatorSlashEvent, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ValidatorSlashEvent message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns ValidatorSlashEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.distribution.v1.ValidatorSlashEvent;
                }

                /** Properties of a ValidatorSlashEvents. */
                interface IValidatorSlashEvents {

                    /** ValidatorSlashEvents validatorSlashEvents */
                    validatorSlashEvents?: (cosmos_sdk.x.distribution.v1.IValidatorSlashEvent[]|null);
                }

                /** Represents a ValidatorSlashEvents. */
                class ValidatorSlashEvents implements IValidatorSlashEvents {

                    /**
                     * Constructs a new ValidatorSlashEvents.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.distribution.v1.IValidatorSlashEvents);

                    /** ValidatorSlashEvents validatorSlashEvents. */
                    public validatorSlashEvents: cosmos_sdk.x.distribution.v1.IValidatorSlashEvent[];

                    /**
                     * Creates a new ValidatorSlashEvents instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ValidatorSlashEvents instance
                     */
                    public static create(properties?: cosmos_sdk.x.distribution.v1.IValidatorSlashEvents): cosmos_sdk.x.distribution.v1.ValidatorSlashEvents;

                    /**
                     * Encodes the specified ValidatorSlashEvents message. Does not implicitly {@link cosmos_sdk.x.distribution.v1.ValidatorSlashEvents.verify|verify} messages.
                     * @param m ValidatorSlashEvents message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.distribution.v1.IValidatorSlashEvents, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ValidatorSlashEvents message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns ValidatorSlashEvents
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.distribution.v1.ValidatorSlashEvents;
                }

                /** Properties of a FeePool. */
                interface IFeePool {

                    /** FeePool communityPool */
                    communityPool?: (cosmos_sdk.v1.IDecCoin[]|null);
                }

                /** Represents a FeePool. */
                class FeePool implements IFeePool {

                    /**
                     * Constructs a new FeePool.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.distribution.v1.IFeePool);

                    /** FeePool communityPool. */
                    public communityPool: cosmos_sdk.v1.IDecCoin[];

                    /**
                     * Creates a new FeePool instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns FeePool instance
                     */
                    public static create(properties?: cosmos_sdk.x.distribution.v1.IFeePool): cosmos_sdk.x.distribution.v1.FeePool;

                    /**
                     * Encodes the specified FeePool message. Does not implicitly {@link cosmos_sdk.x.distribution.v1.FeePool.verify|verify} messages.
                     * @param m FeePool message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.distribution.v1.IFeePool, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a FeePool message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns FeePool
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.distribution.v1.FeePool;
                }

                /** Properties of a CommunityPoolSpendProposal. */
                interface ICommunityPoolSpendProposal {

                    /** CommunityPoolSpendProposal title */
                    title?: (string|null);

                    /** CommunityPoolSpendProposal description */
                    description?: (string|null);

                    /** CommunityPoolSpendProposal recipient */
                    recipient?: (Uint8Array|null);

                    /** CommunityPoolSpendProposal amount */
                    amount?: (cosmos_sdk.v1.ICoin[]|null);
                }

                /** Represents a CommunityPoolSpendProposal. */
                class CommunityPoolSpendProposal implements ICommunityPoolSpendProposal {

                    /**
                     * Constructs a new CommunityPoolSpendProposal.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.distribution.v1.ICommunityPoolSpendProposal);

                    /** CommunityPoolSpendProposal title. */
                    public title: string;

                    /** CommunityPoolSpendProposal description. */
                    public description: string;

                    /** CommunityPoolSpendProposal recipient. */
                    public recipient: Uint8Array;

                    /** CommunityPoolSpendProposal amount. */
                    public amount: cosmos_sdk.v1.ICoin[];

                    /**
                     * Creates a new CommunityPoolSpendProposal instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns CommunityPoolSpendProposal instance
                     */
                    public static create(properties?: cosmos_sdk.x.distribution.v1.ICommunityPoolSpendProposal): cosmos_sdk.x.distribution.v1.CommunityPoolSpendProposal;

                    /**
                     * Encodes the specified CommunityPoolSpendProposal message. Does not implicitly {@link cosmos_sdk.x.distribution.v1.CommunityPoolSpendProposal.verify|verify} messages.
                     * @param m CommunityPoolSpendProposal message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.distribution.v1.ICommunityPoolSpendProposal, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a CommunityPoolSpendProposal message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns CommunityPoolSpendProposal
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.distribution.v1.CommunityPoolSpendProposal;
                }

                /** Properties of a DelegatorStartingInfo. */
                interface IDelegatorStartingInfo {

                    /** DelegatorStartingInfo previousPeriod */
                    previousPeriod?: (number|Long|null);

                    /** DelegatorStartingInfo stake */
                    stake?: (string|null);

                    /** DelegatorStartingInfo height */
                    height?: (number|Long|null);
                }

                /** Represents a DelegatorStartingInfo. */
                class DelegatorStartingInfo implements IDelegatorStartingInfo {

                    /**
                     * Constructs a new DelegatorStartingInfo.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.distribution.v1.IDelegatorStartingInfo);

                    /** DelegatorStartingInfo previousPeriod. */
                    public previousPeriod: (number|Long);

                    /** DelegatorStartingInfo stake. */
                    public stake: string;

                    /** DelegatorStartingInfo height. */
                    public height: (number|Long);

                    /**
                     * Creates a new DelegatorStartingInfo instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns DelegatorStartingInfo instance
                     */
                    public static create(properties?: cosmos_sdk.x.distribution.v1.IDelegatorStartingInfo): cosmos_sdk.x.distribution.v1.DelegatorStartingInfo;

                    /**
                     * Encodes the specified DelegatorStartingInfo message. Does not implicitly {@link cosmos_sdk.x.distribution.v1.DelegatorStartingInfo.verify|verify} messages.
                     * @param m DelegatorStartingInfo message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.distribution.v1.IDelegatorStartingInfo, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a DelegatorStartingInfo message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns DelegatorStartingInfo
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.distribution.v1.DelegatorStartingInfo;
                }
            }
        }

        /** Namespace evidence. */
        namespace evidence {

            /** Namespace v1. */
            namespace v1 {

                /** Properties of a MsgSubmitEvidence. */
                interface IMsgSubmitEvidence {

                    /** MsgSubmitEvidence submitter */
                    submitter?: (Uint8Array|null);

                    /** MsgSubmitEvidence evidence */
                    evidence?: (google.protobuf.IAny|null);
                }

                /** Represents a MsgSubmitEvidence. */
                class MsgSubmitEvidence implements IMsgSubmitEvidence {

                    /**
                     * Constructs a new MsgSubmitEvidence.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.evidence.v1.IMsgSubmitEvidence);

                    /** MsgSubmitEvidence submitter. */
                    public submitter: Uint8Array;

                    /** MsgSubmitEvidence evidence. */
                    public evidence?: (google.protobuf.IAny|null);

                    /**
                     * Creates a new MsgSubmitEvidence instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns MsgSubmitEvidence instance
                     */
                    public static create(properties?: cosmos_sdk.x.evidence.v1.IMsgSubmitEvidence): cosmos_sdk.x.evidence.v1.MsgSubmitEvidence;

                    /**
                     * Encodes the specified MsgSubmitEvidence message. Does not implicitly {@link cosmos_sdk.x.evidence.v1.MsgSubmitEvidence.verify|verify} messages.
                     * @param m MsgSubmitEvidence message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.evidence.v1.IMsgSubmitEvidence, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a MsgSubmitEvidence message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns MsgSubmitEvidence
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.evidence.v1.MsgSubmitEvidence;
                }

                /** Properties of an Equivocation. */
                interface IEquivocation {

                    /** Equivocation height */
                    height?: (number|Long|null);

                    /** Equivocation time */
                    time?: (google.protobuf.ITimestamp|null);

                    /** Equivocation power */
                    power?: (number|Long|null);

                    /** Equivocation consensusAddress */
                    consensusAddress?: (Uint8Array|null);
                }

                /** Represents an Equivocation. */
                class Equivocation implements IEquivocation {

                    /**
                     * Constructs a new Equivocation.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.evidence.v1.IEquivocation);

                    /** Equivocation height. */
                    public height: (number|Long);

                    /** Equivocation time. */
                    public time?: (google.protobuf.ITimestamp|null);

                    /** Equivocation power. */
                    public power: (number|Long);

                    /** Equivocation consensusAddress. */
                    public consensusAddress: Uint8Array;

                    /**
                     * Creates a new Equivocation instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Equivocation instance
                     */
                    public static create(properties?: cosmos_sdk.x.evidence.v1.IEquivocation): cosmos_sdk.x.evidence.v1.Equivocation;

                    /**
                     * Encodes the specified Equivocation message. Does not implicitly {@link cosmos_sdk.x.evidence.v1.Equivocation.verify|verify} messages.
                     * @param m Equivocation message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.evidence.v1.IEquivocation, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an Equivocation message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns Equivocation
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.evidence.v1.Equivocation;
                }
            }
        }

        /** Namespace gov. */
        namespace gov {

            /** Namespace v1. */
            namespace v1 {

                /** Properties of a MsgSubmitProposal. */
                interface IMsgSubmitProposal {

                    /** MsgSubmitProposal content */
                    content?: (google.protobuf.IAny|null);

                    /** MsgSubmitProposal initialDeposit */
                    initialDeposit?: (cosmos_sdk.v1.ICoin[]|null);

                    /** MsgSubmitProposal proposer */
                    proposer?: (Uint8Array|null);
                }

                /** Represents a MsgSubmitProposal. */
                class MsgSubmitProposal implements IMsgSubmitProposal {

                    /**
                     * Constructs a new MsgSubmitProposal.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.gov.v1.IMsgSubmitProposal);

                    /** MsgSubmitProposal content. */
                    public content?: (google.protobuf.IAny|null);

                    /** MsgSubmitProposal initialDeposit. */
                    public initialDeposit: cosmos_sdk.v1.ICoin[];

                    /** MsgSubmitProposal proposer. */
                    public proposer: Uint8Array;

                    /**
                     * Creates a new MsgSubmitProposal instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns MsgSubmitProposal instance
                     */
                    public static create(properties?: cosmos_sdk.x.gov.v1.IMsgSubmitProposal): cosmos_sdk.x.gov.v1.MsgSubmitProposal;

                    /**
                     * Encodes the specified MsgSubmitProposal message. Does not implicitly {@link cosmos_sdk.x.gov.v1.MsgSubmitProposal.verify|verify} messages.
                     * @param m MsgSubmitProposal message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.gov.v1.IMsgSubmitProposal, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a MsgSubmitProposal message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns MsgSubmitProposal
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.gov.v1.MsgSubmitProposal;
                }

                /** Properties of a MsgVote. */
                interface IMsgVote {

                    /** MsgVote proposalId */
                    proposalId?: (number|Long|null);

                    /** MsgVote voter */
                    voter?: (Uint8Array|null);

                    /** MsgVote option */
                    option?: (cosmos_sdk.x.gov.v1.VoteOption|null);
                }

                /** Represents a MsgVote. */
                class MsgVote implements IMsgVote {

                    /**
                     * Constructs a new MsgVote.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.gov.v1.IMsgVote);

                    /** MsgVote proposalId. */
                    public proposalId: (number|Long);

                    /** MsgVote voter. */
                    public voter: Uint8Array;

                    /** MsgVote option. */
                    public option: cosmos_sdk.x.gov.v1.VoteOption;

                    /**
                     * Creates a new MsgVote instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns MsgVote instance
                     */
                    public static create(properties?: cosmos_sdk.x.gov.v1.IMsgVote): cosmos_sdk.x.gov.v1.MsgVote;

                    /**
                     * Encodes the specified MsgVote message. Does not implicitly {@link cosmos_sdk.x.gov.v1.MsgVote.verify|verify} messages.
                     * @param m MsgVote message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.gov.v1.IMsgVote, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a MsgVote message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns MsgVote
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.gov.v1.MsgVote;
                }

                /** Properties of a MsgDeposit. */
                interface IMsgDeposit {

                    /** MsgDeposit proposalId */
                    proposalId?: (number|Long|null);

                    /** MsgDeposit depositor */
                    depositor?: (Uint8Array|null);

                    /** MsgDeposit amount */
                    amount?: (cosmos_sdk.v1.ICoin[]|null);
                }

                /** Represents a MsgDeposit. */
                class MsgDeposit implements IMsgDeposit {

                    /**
                     * Constructs a new MsgDeposit.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.gov.v1.IMsgDeposit);

                    /** MsgDeposit proposalId. */
                    public proposalId: (number|Long);

                    /** MsgDeposit depositor. */
                    public depositor: Uint8Array;

                    /** MsgDeposit amount. */
                    public amount: cosmos_sdk.v1.ICoin[];

                    /**
                     * Creates a new MsgDeposit instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns MsgDeposit instance
                     */
                    public static create(properties?: cosmos_sdk.x.gov.v1.IMsgDeposit): cosmos_sdk.x.gov.v1.MsgDeposit;

                    /**
                     * Encodes the specified MsgDeposit message. Does not implicitly {@link cosmos_sdk.x.gov.v1.MsgDeposit.verify|verify} messages.
                     * @param m MsgDeposit message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.gov.v1.IMsgDeposit, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a MsgDeposit message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns MsgDeposit
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.gov.v1.MsgDeposit;
                }

                /** VoteOption enum. */
                enum VoteOption {
                    VOTE_OPTION_UNSPECIFIED = 0,
                    VOTE_OPTION_YES = 1,
                    VOTE_OPTION_ABSTAIN = 2,
                    VOTE_OPTION_NO = 3,
                    VOTE_OPTION_NO_WITH_VETO = 4
                }

                /** Properties of a TextProposal. */
                interface ITextProposal {

                    /** TextProposal title */
                    title?: (string|null);

                    /** TextProposal description */
                    description?: (string|null);
                }

                /** Represents a TextProposal. */
                class TextProposal implements ITextProposal {

                    /**
                     * Constructs a new TextProposal.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.gov.v1.ITextProposal);

                    /** TextProposal title. */
                    public title: string;

                    /** TextProposal description. */
                    public description: string;

                    /**
                     * Creates a new TextProposal instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns TextProposal instance
                     */
                    public static create(properties?: cosmos_sdk.x.gov.v1.ITextProposal): cosmos_sdk.x.gov.v1.TextProposal;

                    /**
                     * Encodes the specified TextProposal message. Does not implicitly {@link cosmos_sdk.x.gov.v1.TextProposal.verify|verify} messages.
                     * @param m TextProposal message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.gov.v1.ITextProposal, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a TextProposal message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns TextProposal
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.gov.v1.TextProposal;
                }

                /** Properties of a Deposit. */
                interface IDeposit {

                    /** Deposit proposalId */
                    proposalId?: (number|Long|null);

                    /** Deposit depositor */
                    depositor?: (Uint8Array|null);

                    /** Deposit amount */
                    amount?: (cosmos_sdk.v1.ICoin[]|null);
                }

                /** Represents a Deposit. */
                class Deposit implements IDeposit {

                    /**
                     * Constructs a new Deposit.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.gov.v1.IDeposit);

                    /** Deposit proposalId. */
                    public proposalId: (number|Long);

                    /** Deposit depositor. */
                    public depositor: Uint8Array;

                    /** Deposit amount. */
                    public amount: cosmos_sdk.v1.ICoin[];

                    /**
                     * Creates a new Deposit instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Deposit instance
                     */
                    public static create(properties?: cosmos_sdk.x.gov.v1.IDeposit): cosmos_sdk.x.gov.v1.Deposit;

                    /**
                     * Encodes the specified Deposit message. Does not implicitly {@link cosmos_sdk.x.gov.v1.Deposit.verify|verify} messages.
                     * @param m Deposit message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.gov.v1.IDeposit, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Deposit message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns Deposit
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.gov.v1.Deposit;
                }

                /** Properties of a Proposal. */
                interface IProposal {

                    /** Proposal proposalId */
                    proposalId?: (number|Long|null);

                    /** Proposal content */
                    content?: (google.protobuf.IAny|null);

                    /** Proposal status */
                    status?: (cosmos_sdk.x.gov.v1.ProposalStatus|null);

                    /** Proposal finalTallyResult */
                    finalTallyResult?: (cosmos_sdk.x.gov.v1.ITallyResult|null);

                    /** Proposal submitTime */
                    submitTime?: (google.protobuf.ITimestamp|null);

                    /** Proposal depositEndTime */
                    depositEndTime?: (google.protobuf.ITimestamp|null);

                    /** Proposal totalDeposit */
                    totalDeposit?: (cosmos_sdk.v1.ICoin[]|null);

                    /** Proposal votingStartTime */
                    votingStartTime?: (google.protobuf.ITimestamp|null);

                    /** Proposal votingEndTime */
                    votingEndTime?: (google.protobuf.ITimestamp|null);
                }

                /** Represents a Proposal. */
                class Proposal implements IProposal {

                    /**
                     * Constructs a new Proposal.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.gov.v1.IProposal);

                    /** Proposal proposalId. */
                    public proposalId: (number|Long);

                    /** Proposal content. */
                    public content?: (google.protobuf.IAny|null);

                    /** Proposal status. */
                    public status: cosmos_sdk.x.gov.v1.ProposalStatus;

                    /** Proposal finalTallyResult. */
                    public finalTallyResult?: (cosmos_sdk.x.gov.v1.ITallyResult|null);

                    /** Proposal submitTime. */
                    public submitTime?: (google.protobuf.ITimestamp|null);

                    /** Proposal depositEndTime. */
                    public depositEndTime?: (google.protobuf.ITimestamp|null);

                    /** Proposal totalDeposit. */
                    public totalDeposit: cosmos_sdk.v1.ICoin[];

                    /** Proposal votingStartTime. */
                    public votingStartTime?: (google.protobuf.ITimestamp|null);

                    /** Proposal votingEndTime. */
                    public votingEndTime?: (google.protobuf.ITimestamp|null);

                    /**
                     * Creates a new Proposal instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Proposal instance
                     */
                    public static create(properties?: cosmos_sdk.x.gov.v1.IProposal): cosmos_sdk.x.gov.v1.Proposal;

                    /**
                     * Encodes the specified Proposal message. Does not implicitly {@link cosmos_sdk.x.gov.v1.Proposal.verify|verify} messages.
                     * @param m Proposal message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.gov.v1.IProposal, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Proposal message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns Proposal
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.gov.v1.Proposal;
                }

                /** ProposalStatus enum. */
                enum ProposalStatus {
                    PROPOSAL_STATUS_UNSPECIFIED = 0,
                    PROPOSAL_STATUS_DEPOSIT_PERIOD = 1,
                    PROPOSAL_STATUS_VOTING_PERIOD = 2,
                    PROPOSAL_STATUS_PASSED = 3,
                    PROPOSAL_STATUS_REJECTED = 4,
                    PROPOSAL_STATUS_FAILED = 5
                }

                /** Properties of a TallyResult. */
                interface ITallyResult {

                    /** TallyResult yes */
                    yes?: (string|null);

                    /** TallyResult abstain */
                    abstain?: (string|null);

                    /** TallyResult no */
                    no?: (string|null);

                    /** TallyResult noWithVeto */
                    noWithVeto?: (string|null);
                }

                /** Represents a TallyResult. */
                class TallyResult implements ITallyResult {

                    /**
                     * Constructs a new TallyResult.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.gov.v1.ITallyResult);

                    /** TallyResult yes. */
                    public yes: string;

                    /** TallyResult abstain. */
                    public abstain: string;

                    /** TallyResult no. */
                    public no: string;

                    /** TallyResult noWithVeto. */
                    public noWithVeto: string;

                    /**
                     * Creates a new TallyResult instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns TallyResult instance
                     */
                    public static create(properties?: cosmos_sdk.x.gov.v1.ITallyResult): cosmos_sdk.x.gov.v1.TallyResult;

                    /**
                     * Encodes the specified TallyResult message. Does not implicitly {@link cosmos_sdk.x.gov.v1.TallyResult.verify|verify} messages.
                     * @param m TallyResult message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.gov.v1.ITallyResult, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a TallyResult message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns TallyResult
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.gov.v1.TallyResult;
                }

                /** Properties of a Vote. */
                interface IVote {

                    /** Vote proposalId */
                    proposalId?: (number|Long|null);

                    /** Vote voter */
                    voter?: (Uint8Array|null);

                    /** Vote option */
                    option?: (cosmos_sdk.x.gov.v1.VoteOption|null);
                }

                /** Represents a Vote. */
                class Vote implements IVote {

                    /**
                     * Constructs a new Vote.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.gov.v1.IVote);

                    /** Vote proposalId. */
                    public proposalId: (number|Long);

                    /** Vote voter. */
                    public voter: Uint8Array;

                    /** Vote option. */
                    public option: cosmos_sdk.x.gov.v1.VoteOption;

                    /**
                     * Creates a new Vote instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Vote instance
                     */
                    public static create(properties?: cosmos_sdk.x.gov.v1.IVote): cosmos_sdk.x.gov.v1.Vote;

                    /**
                     * Encodes the specified Vote message. Does not implicitly {@link cosmos_sdk.x.gov.v1.Vote.verify|verify} messages.
                     * @param m Vote message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.gov.v1.IVote, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Vote message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns Vote
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.gov.v1.Vote;
                }
            }
        }

        /** Namespace transfer. */
        namespace transfer {

            /** Namespace v1. */
            namespace v1 {

                /** Properties of a MsgTransfer. */
                interface IMsgTransfer {

                    /** MsgTransfer sourcePort */
                    sourcePort?: (string|null);

                    /** MsgTransfer sourceChannel */
                    sourceChannel?: (string|null);

                    /** MsgTransfer amount */
                    amount?: (cosmos_sdk.v1.ICoin[]|null);

                    /** MsgTransfer sender */
                    sender?: (Uint8Array|null);

                    /** MsgTransfer receiver */
                    receiver?: (string|null);

                    /** MsgTransfer timeoutHeight */
                    timeoutHeight?: (number|Long|null);

                    /** MsgTransfer timeoutTimestamp */
                    timeoutTimestamp?: (number|Long|null);
                }

                /** Represents a MsgTransfer. */
                class MsgTransfer implements IMsgTransfer {

                    /**
                     * Constructs a new MsgTransfer.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.transfer.v1.IMsgTransfer);

                    /** MsgTransfer sourcePort. */
                    public sourcePort: string;

                    /** MsgTransfer sourceChannel. */
                    public sourceChannel: string;

                    /** MsgTransfer amount. */
                    public amount: cosmos_sdk.v1.ICoin[];

                    /** MsgTransfer sender. */
                    public sender: Uint8Array;

                    /** MsgTransfer receiver. */
                    public receiver: string;

                    /** MsgTransfer timeoutHeight. */
                    public timeoutHeight: (number|Long);

                    /** MsgTransfer timeoutTimestamp. */
                    public timeoutTimestamp: (number|Long);

                    /**
                     * Creates a new MsgTransfer instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns MsgTransfer instance
                     */
                    public static create(properties?: cosmos_sdk.x.transfer.v1.IMsgTransfer): cosmos_sdk.x.transfer.v1.MsgTransfer;

                    /**
                     * Encodes the specified MsgTransfer message. Does not implicitly {@link cosmos_sdk.x.transfer.v1.MsgTransfer.verify|verify} messages.
                     * @param m MsgTransfer message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.transfer.v1.IMsgTransfer, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a MsgTransfer message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns MsgTransfer
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.transfer.v1.MsgTransfer;
                }

                /** Properties of a FungibleTokenPacketData. */
                interface IFungibleTokenPacketData {

                    /** FungibleTokenPacketData amount */
                    amount?: (cosmos_sdk.v1.ICoin[]|null);

                    /** FungibleTokenPacketData sender */
                    sender?: (string|null);

                    /** FungibleTokenPacketData receiver */
                    receiver?: (string|null);
                }

                /** Represents a FungibleTokenPacketData. */
                class FungibleTokenPacketData implements IFungibleTokenPacketData {

                    /**
                     * Constructs a new FungibleTokenPacketData.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.transfer.v1.IFungibleTokenPacketData);

                    /** FungibleTokenPacketData amount. */
                    public amount: cosmos_sdk.v1.ICoin[];

                    /** FungibleTokenPacketData sender. */
                    public sender: string;

                    /** FungibleTokenPacketData receiver. */
                    public receiver: string;

                    /**
                     * Creates a new FungibleTokenPacketData instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns FungibleTokenPacketData instance
                     */
                    public static create(properties?: cosmos_sdk.x.transfer.v1.IFungibleTokenPacketData): cosmos_sdk.x.transfer.v1.FungibleTokenPacketData;

                    /**
                     * Encodes the specified FungibleTokenPacketData message. Does not implicitly {@link cosmos_sdk.x.transfer.v1.FungibleTokenPacketData.verify|verify} messages.
                     * @param m FungibleTokenPacketData message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.transfer.v1.IFungibleTokenPacketData, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a FungibleTokenPacketData message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns FungibleTokenPacketData
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.transfer.v1.FungibleTokenPacketData;
                }

                /** Properties of a FungibleTokenPacketAcknowledgement. */
                interface IFungibleTokenPacketAcknowledgement {

                    /** FungibleTokenPacketAcknowledgement success */
                    success?: (boolean|null);

                    /** FungibleTokenPacketAcknowledgement error */
                    error?: (string|null);
                }

                /** Represents a FungibleTokenPacketAcknowledgement. */
                class FungibleTokenPacketAcknowledgement implements IFungibleTokenPacketAcknowledgement {

                    /**
                     * Constructs a new FungibleTokenPacketAcknowledgement.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.transfer.v1.IFungibleTokenPacketAcknowledgement);

                    /** FungibleTokenPacketAcknowledgement success. */
                    public success: boolean;

                    /** FungibleTokenPacketAcknowledgement error. */
                    public error: string;

                    /**
                     * Creates a new FungibleTokenPacketAcknowledgement instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns FungibleTokenPacketAcknowledgement instance
                     */
                    public static create(properties?: cosmos_sdk.x.transfer.v1.IFungibleTokenPacketAcknowledgement): cosmos_sdk.x.transfer.v1.FungibleTokenPacketAcknowledgement;

                    /**
                     * Encodes the specified FungibleTokenPacketAcknowledgement message. Does not implicitly {@link cosmos_sdk.x.transfer.v1.FungibleTokenPacketAcknowledgement.verify|verify} messages.
                     * @param m FungibleTokenPacketAcknowledgement message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.transfer.v1.IFungibleTokenPacketAcknowledgement, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a FungibleTokenPacketAcknowledgement message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns FungibleTokenPacketAcknowledgement
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.transfer.v1.FungibleTokenPacketAcknowledgement;
                }
            }
        }

        /** Namespace ibc. */
        namespace ibc {

            /** Namespace connection. */
            namespace connection {

                /** Namespace v1. */
                namespace v1 {

                    /** Properties of a MsgConnectionOpenInit. */
                    interface IMsgConnectionOpenInit {

                        /** MsgConnectionOpenInit clientId */
                        clientId?: (string|null);

                        /** MsgConnectionOpenInit connectionId */
                        connectionId?: (string|null);

                        /** MsgConnectionOpenInit counterparty */
                        counterparty?: (cosmos_sdk.x.ibc.connection.v1.ICounterparty|null);

                        /** MsgConnectionOpenInit signer */
                        signer?: (Uint8Array|null);
                    }

                    /** Represents a MsgConnectionOpenInit. */
                    class MsgConnectionOpenInit implements IMsgConnectionOpenInit {

                        /**
                         * Constructs a new MsgConnectionOpenInit.
                         * @param [p] Properties to set
                         */
                        constructor(p?: cosmos_sdk.x.ibc.connection.v1.IMsgConnectionOpenInit);

                        /** MsgConnectionOpenInit clientId. */
                        public clientId: string;

                        /** MsgConnectionOpenInit connectionId. */
                        public connectionId: string;

                        /** MsgConnectionOpenInit counterparty. */
                        public counterparty?: (cosmos_sdk.x.ibc.connection.v1.ICounterparty|null);

                        /** MsgConnectionOpenInit signer. */
                        public signer: Uint8Array;

                        /**
                         * Creates a new MsgConnectionOpenInit instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns MsgConnectionOpenInit instance
                         */
                        public static create(properties?: cosmos_sdk.x.ibc.connection.v1.IMsgConnectionOpenInit): cosmos_sdk.x.ibc.connection.v1.MsgConnectionOpenInit;

                        /**
                         * Encodes the specified MsgConnectionOpenInit message. Does not implicitly {@link cosmos_sdk.x.ibc.connection.v1.MsgConnectionOpenInit.verify|verify} messages.
                         * @param m MsgConnectionOpenInit message or plain object to encode
                         * @param [w] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(m: cosmos_sdk.x.ibc.connection.v1.IMsgConnectionOpenInit, w?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a MsgConnectionOpenInit message from the specified reader or buffer.
                         * @param r Reader or buffer to decode from
                         * @param [l] Message length if known beforehand
                         * @returns MsgConnectionOpenInit
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.ibc.connection.v1.MsgConnectionOpenInit;
                    }

                    /** Properties of a MsgConnectionOpenTry. */
                    interface IMsgConnectionOpenTry {

                        /** MsgConnectionOpenTry clientId */
                        clientId?: (string|null);

                        /** MsgConnectionOpenTry connectionId */
                        connectionId?: (string|null);

                        /** MsgConnectionOpenTry counterparty */
                        counterparty?: (cosmos_sdk.x.ibc.connection.v1.ICounterparty|null);

                        /** MsgConnectionOpenTry counterpartyVersions */
                        counterpartyVersions?: (string[]|null);

                        /** MsgConnectionOpenTry proofInit */
                        proofInit?: (Uint8Array|null);

                        /** MsgConnectionOpenTry proofHeight */
                        proofHeight?: (number|Long|null);

                        /** MsgConnectionOpenTry proofConsensus */
                        proofConsensus?: (Uint8Array|null);

                        /** MsgConnectionOpenTry consensusHeight */
                        consensusHeight?: (number|Long|null);

                        /** MsgConnectionOpenTry signer */
                        signer?: (Uint8Array|null);
                    }

                    /** Represents a MsgConnectionOpenTry. */
                    class MsgConnectionOpenTry implements IMsgConnectionOpenTry {

                        /**
                         * Constructs a new MsgConnectionOpenTry.
                         * @param [p] Properties to set
                         */
                        constructor(p?: cosmos_sdk.x.ibc.connection.v1.IMsgConnectionOpenTry);

                        /** MsgConnectionOpenTry clientId. */
                        public clientId: string;

                        /** MsgConnectionOpenTry connectionId. */
                        public connectionId: string;

                        /** MsgConnectionOpenTry counterparty. */
                        public counterparty?: (cosmos_sdk.x.ibc.connection.v1.ICounterparty|null);

                        /** MsgConnectionOpenTry counterpartyVersions. */
                        public counterpartyVersions: string[];

                        /** MsgConnectionOpenTry proofInit. */
                        public proofInit: Uint8Array;

                        /** MsgConnectionOpenTry proofHeight. */
                        public proofHeight: (number|Long);

                        /** MsgConnectionOpenTry proofConsensus. */
                        public proofConsensus: Uint8Array;

                        /** MsgConnectionOpenTry consensusHeight. */
                        public consensusHeight: (number|Long);

                        /** MsgConnectionOpenTry signer. */
                        public signer: Uint8Array;

                        /**
                         * Creates a new MsgConnectionOpenTry instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns MsgConnectionOpenTry instance
                         */
                        public static create(properties?: cosmos_sdk.x.ibc.connection.v1.IMsgConnectionOpenTry): cosmos_sdk.x.ibc.connection.v1.MsgConnectionOpenTry;

                        /**
                         * Encodes the specified MsgConnectionOpenTry message. Does not implicitly {@link cosmos_sdk.x.ibc.connection.v1.MsgConnectionOpenTry.verify|verify} messages.
                         * @param m MsgConnectionOpenTry message or plain object to encode
                         * @param [w] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(m: cosmos_sdk.x.ibc.connection.v1.IMsgConnectionOpenTry, w?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a MsgConnectionOpenTry message from the specified reader or buffer.
                         * @param r Reader or buffer to decode from
                         * @param [l] Message length if known beforehand
                         * @returns MsgConnectionOpenTry
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.ibc.connection.v1.MsgConnectionOpenTry;
                    }

                    /** Properties of a MsgConnectionOpenAck. */
                    interface IMsgConnectionOpenAck {

                        /** MsgConnectionOpenAck connectionId */
                        connectionId?: (string|null);

                        /** MsgConnectionOpenAck version */
                        version?: (string|null);

                        /** MsgConnectionOpenAck proofTry */
                        proofTry?: (Uint8Array|null);

                        /** MsgConnectionOpenAck proofHeight */
                        proofHeight?: (number|Long|null);

                        /** MsgConnectionOpenAck proofConsensus */
                        proofConsensus?: (Uint8Array|null);

                        /** MsgConnectionOpenAck consensusHeight */
                        consensusHeight?: (number|Long|null);

                        /** MsgConnectionOpenAck signer */
                        signer?: (Uint8Array|null);
                    }

                    /** Represents a MsgConnectionOpenAck. */
                    class MsgConnectionOpenAck implements IMsgConnectionOpenAck {

                        /**
                         * Constructs a new MsgConnectionOpenAck.
                         * @param [p] Properties to set
                         */
                        constructor(p?: cosmos_sdk.x.ibc.connection.v1.IMsgConnectionOpenAck);

                        /** MsgConnectionOpenAck connectionId. */
                        public connectionId: string;

                        /** MsgConnectionOpenAck version. */
                        public version: string;

                        /** MsgConnectionOpenAck proofTry. */
                        public proofTry: Uint8Array;

                        /** MsgConnectionOpenAck proofHeight. */
                        public proofHeight: (number|Long);

                        /** MsgConnectionOpenAck proofConsensus. */
                        public proofConsensus: Uint8Array;

                        /** MsgConnectionOpenAck consensusHeight. */
                        public consensusHeight: (number|Long);

                        /** MsgConnectionOpenAck signer. */
                        public signer: Uint8Array;

                        /**
                         * Creates a new MsgConnectionOpenAck instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns MsgConnectionOpenAck instance
                         */
                        public static create(properties?: cosmos_sdk.x.ibc.connection.v1.IMsgConnectionOpenAck): cosmos_sdk.x.ibc.connection.v1.MsgConnectionOpenAck;

                        /**
                         * Encodes the specified MsgConnectionOpenAck message. Does not implicitly {@link cosmos_sdk.x.ibc.connection.v1.MsgConnectionOpenAck.verify|verify} messages.
                         * @param m MsgConnectionOpenAck message or plain object to encode
                         * @param [w] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(m: cosmos_sdk.x.ibc.connection.v1.IMsgConnectionOpenAck, w?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a MsgConnectionOpenAck message from the specified reader or buffer.
                         * @param r Reader or buffer to decode from
                         * @param [l] Message length if known beforehand
                         * @returns MsgConnectionOpenAck
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.ibc.connection.v1.MsgConnectionOpenAck;
                    }

                    /** Properties of a MsgConnectionOpenConfirm. */
                    interface IMsgConnectionOpenConfirm {

                        /** MsgConnectionOpenConfirm connectionId */
                        connectionId?: (string|null);

                        /** MsgConnectionOpenConfirm proofAck */
                        proofAck?: (Uint8Array|null);

                        /** MsgConnectionOpenConfirm proofHeight */
                        proofHeight?: (number|Long|null);

                        /** MsgConnectionOpenConfirm signer */
                        signer?: (Uint8Array|null);
                    }

                    /** Represents a MsgConnectionOpenConfirm. */
                    class MsgConnectionOpenConfirm implements IMsgConnectionOpenConfirm {

                        /**
                         * Constructs a new MsgConnectionOpenConfirm.
                         * @param [p] Properties to set
                         */
                        constructor(p?: cosmos_sdk.x.ibc.connection.v1.IMsgConnectionOpenConfirm);

                        /** MsgConnectionOpenConfirm connectionId. */
                        public connectionId: string;

                        /** MsgConnectionOpenConfirm proofAck. */
                        public proofAck: Uint8Array;

                        /** MsgConnectionOpenConfirm proofHeight. */
                        public proofHeight: (number|Long);

                        /** MsgConnectionOpenConfirm signer. */
                        public signer: Uint8Array;

                        /**
                         * Creates a new MsgConnectionOpenConfirm instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns MsgConnectionOpenConfirm instance
                         */
                        public static create(properties?: cosmos_sdk.x.ibc.connection.v1.IMsgConnectionOpenConfirm): cosmos_sdk.x.ibc.connection.v1.MsgConnectionOpenConfirm;

                        /**
                         * Encodes the specified MsgConnectionOpenConfirm message. Does not implicitly {@link cosmos_sdk.x.ibc.connection.v1.MsgConnectionOpenConfirm.verify|verify} messages.
                         * @param m MsgConnectionOpenConfirm message or plain object to encode
                         * @param [w] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(m: cosmos_sdk.x.ibc.connection.v1.IMsgConnectionOpenConfirm, w?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a MsgConnectionOpenConfirm message from the specified reader or buffer.
                         * @param r Reader or buffer to decode from
                         * @param [l] Message length if known beforehand
                         * @returns MsgConnectionOpenConfirm
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.ibc.connection.v1.MsgConnectionOpenConfirm;
                    }

                    /** Properties of a ConnectionEnd. */
                    interface IConnectionEnd {

                        /** ConnectionEnd id */
                        id?: (string|null);

                        /** ConnectionEnd clientId */
                        clientId?: (string|null);

                        /** ConnectionEnd versions */
                        versions?: (string[]|null);

                        /** ConnectionEnd state */
                        state?: (cosmos_sdk.x.ibc.connection.v1.State|null);

                        /** ConnectionEnd counterparty */
                        counterparty?: (cosmos_sdk.x.ibc.connection.v1.ICounterparty|null);
                    }

                    /** Represents a ConnectionEnd. */
                    class ConnectionEnd implements IConnectionEnd {

                        /**
                         * Constructs a new ConnectionEnd.
                         * @param [p] Properties to set
                         */
                        constructor(p?: cosmos_sdk.x.ibc.connection.v1.IConnectionEnd);

                        /** ConnectionEnd id. */
                        public id: string;

                        /** ConnectionEnd clientId. */
                        public clientId: string;

                        /** ConnectionEnd versions. */
                        public versions: string[];

                        /** ConnectionEnd state. */
                        public state: cosmos_sdk.x.ibc.connection.v1.State;

                        /** ConnectionEnd counterparty. */
                        public counterparty?: (cosmos_sdk.x.ibc.connection.v1.ICounterparty|null);

                        /**
                         * Creates a new ConnectionEnd instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns ConnectionEnd instance
                         */
                        public static create(properties?: cosmos_sdk.x.ibc.connection.v1.IConnectionEnd): cosmos_sdk.x.ibc.connection.v1.ConnectionEnd;

                        /**
                         * Encodes the specified ConnectionEnd message. Does not implicitly {@link cosmos_sdk.x.ibc.connection.v1.ConnectionEnd.verify|verify} messages.
                         * @param m ConnectionEnd message or plain object to encode
                         * @param [w] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(m: cosmos_sdk.x.ibc.connection.v1.IConnectionEnd, w?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a ConnectionEnd message from the specified reader or buffer.
                         * @param r Reader or buffer to decode from
                         * @param [l] Message length if known beforehand
                         * @returns ConnectionEnd
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.ibc.connection.v1.ConnectionEnd;
                    }

                    /** State enum. */
                    enum State {
                        STATE_UNINITIALIZED_UNSPECIFIED = 0,
                        STATE_INIT = 1,
                        STATE_TRYOPEN = 2,
                        STATE_OPEN = 3
                    }

                    /** Properties of a Counterparty. */
                    interface ICounterparty {

                        /** Counterparty clientId */
                        clientId?: (string|null);

                        /** Counterparty connectionId */
                        connectionId?: (string|null);

                        /** Counterparty prefix */
                        prefix?: (cosmos_sdk.x.ibc.commitment.v1.IMerklePrefix|null);
                    }

                    /** Represents a Counterparty. */
                    class Counterparty implements ICounterparty {

                        /**
                         * Constructs a new Counterparty.
                         * @param [p] Properties to set
                         */
                        constructor(p?: cosmos_sdk.x.ibc.connection.v1.ICounterparty);

                        /** Counterparty clientId. */
                        public clientId: string;

                        /** Counterparty connectionId. */
                        public connectionId: string;

                        /** Counterparty prefix. */
                        public prefix?: (cosmos_sdk.x.ibc.commitment.v1.IMerklePrefix|null);

                        /**
                         * Creates a new Counterparty instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns Counterparty instance
                         */
                        public static create(properties?: cosmos_sdk.x.ibc.connection.v1.ICounterparty): cosmos_sdk.x.ibc.connection.v1.Counterparty;

                        /**
                         * Encodes the specified Counterparty message. Does not implicitly {@link cosmos_sdk.x.ibc.connection.v1.Counterparty.verify|verify} messages.
                         * @param m Counterparty message or plain object to encode
                         * @param [w] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(m: cosmos_sdk.x.ibc.connection.v1.ICounterparty, w?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a Counterparty message from the specified reader or buffer.
                         * @param r Reader or buffer to decode from
                         * @param [l] Message length if known beforehand
                         * @returns Counterparty
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.ibc.connection.v1.Counterparty;
                    }

                    /** Properties of a ClientPaths. */
                    interface IClientPaths {

                        /** ClientPaths paths */
                        paths?: (string[]|null);
                    }

                    /** Represents a ClientPaths. */
                    class ClientPaths implements IClientPaths {

                        /**
                         * Constructs a new ClientPaths.
                         * @param [p] Properties to set
                         */
                        constructor(p?: cosmos_sdk.x.ibc.connection.v1.IClientPaths);

                        /** ClientPaths paths. */
                        public paths: string[];

                        /**
                         * Creates a new ClientPaths instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns ClientPaths instance
                         */
                        public static create(properties?: cosmos_sdk.x.ibc.connection.v1.IClientPaths): cosmos_sdk.x.ibc.connection.v1.ClientPaths;

                        /**
                         * Encodes the specified ClientPaths message. Does not implicitly {@link cosmos_sdk.x.ibc.connection.v1.ClientPaths.verify|verify} messages.
                         * @param m ClientPaths message or plain object to encode
                         * @param [w] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(m: cosmos_sdk.x.ibc.connection.v1.IClientPaths, w?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a ClientPaths message from the specified reader or buffer.
                         * @param r Reader or buffer to decode from
                         * @param [l] Message length if known beforehand
                         * @returns ClientPaths
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.ibc.connection.v1.ClientPaths;
                    }
                }
            }

            /** Namespace channel. */
            namespace channel {

                /** Namespace v1. */
                namespace v1 {

                    /** Properties of a MsgChannelOpenInit. */
                    interface IMsgChannelOpenInit {

                        /** MsgChannelOpenInit portId */
                        portId?: (string|null);

                        /** MsgChannelOpenInit channelId */
                        channelId?: (string|null);

                        /** MsgChannelOpenInit channel */
                        channel?: (cosmos_sdk.x.ibc.channel.v1.IChannel|null);

                        /** MsgChannelOpenInit signer */
                        signer?: (Uint8Array|null);
                    }

                    /** Represents a MsgChannelOpenInit. */
                    class MsgChannelOpenInit implements IMsgChannelOpenInit {

                        /**
                         * Constructs a new MsgChannelOpenInit.
                         * @param [p] Properties to set
                         */
                        constructor(p?: cosmos_sdk.x.ibc.channel.v1.IMsgChannelOpenInit);

                        /** MsgChannelOpenInit portId. */
                        public portId: string;

                        /** MsgChannelOpenInit channelId. */
                        public channelId: string;

                        /** MsgChannelOpenInit channel. */
                        public channel?: (cosmos_sdk.x.ibc.channel.v1.IChannel|null);

                        /** MsgChannelOpenInit signer. */
                        public signer: Uint8Array;

                        /**
                         * Creates a new MsgChannelOpenInit instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns MsgChannelOpenInit instance
                         */
                        public static create(properties?: cosmos_sdk.x.ibc.channel.v1.IMsgChannelOpenInit): cosmos_sdk.x.ibc.channel.v1.MsgChannelOpenInit;

                        /**
                         * Encodes the specified MsgChannelOpenInit message. Does not implicitly {@link cosmos_sdk.x.ibc.channel.v1.MsgChannelOpenInit.verify|verify} messages.
                         * @param m MsgChannelOpenInit message or plain object to encode
                         * @param [w] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(m: cosmos_sdk.x.ibc.channel.v1.IMsgChannelOpenInit, w?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a MsgChannelOpenInit message from the specified reader or buffer.
                         * @param r Reader or buffer to decode from
                         * @param [l] Message length if known beforehand
                         * @returns MsgChannelOpenInit
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.ibc.channel.v1.MsgChannelOpenInit;
                    }

                    /** Properties of a MsgChannelOpenTry. */
                    interface IMsgChannelOpenTry {

                        /** MsgChannelOpenTry portId */
                        portId?: (string|null);

                        /** MsgChannelOpenTry channelId */
                        channelId?: (string|null);

                        /** MsgChannelOpenTry channel */
                        channel?: (cosmos_sdk.x.ibc.channel.v1.IChannel|null);

                        /** MsgChannelOpenTry counterpartyVersion */
                        counterpartyVersion?: (string|null);

                        /** MsgChannelOpenTry proofInit */
                        proofInit?: (Uint8Array|null);

                        /** MsgChannelOpenTry proofHeight */
                        proofHeight?: (number|Long|null);

                        /** MsgChannelOpenTry signer */
                        signer?: (Uint8Array|null);
                    }

                    /** Represents a MsgChannelOpenTry. */
                    class MsgChannelOpenTry implements IMsgChannelOpenTry {

                        /**
                         * Constructs a new MsgChannelOpenTry.
                         * @param [p] Properties to set
                         */
                        constructor(p?: cosmos_sdk.x.ibc.channel.v1.IMsgChannelOpenTry);

                        /** MsgChannelOpenTry portId. */
                        public portId: string;

                        /** MsgChannelOpenTry channelId. */
                        public channelId: string;

                        /** MsgChannelOpenTry channel. */
                        public channel?: (cosmos_sdk.x.ibc.channel.v1.IChannel|null);

                        /** MsgChannelOpenTry counterpartyVersion. */
                        public counterpartyVersion: string;

                        /** MsgChannelOpenTry proofInit. */
                        public proofInit: Uint8Array;

                        /** MsgChannelOpenTry proofHeight. */
                        public proofHeight: (number|Long);

                        /** MsgChannelOpenTry signer. */
                        public signer: Uint8Array;

                        /**
                         * Creates a new MsgChannelOpenTry instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns MsgChannelOpenTry instance
                         */
                        public static create(properties?: cosmos_sdk.x.ibc.channel.v1.IMsgChannelOpenTry): cosmos_sdk.x.ibc.channel.v1.MsgChannelOpenTry;

                        /**
                         * Encodes the specified MsgChannelOpenTry message. Does not implicitly {@link cosmos_sdk.x.ibc.channel.v1.MsgChannelOpenTry.verify|verify} messages.
                         * @param m MsgChannelOpenTry message or plain object to encode
                         * @param [w] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(m: cosmos_sdk.x.ibc.channel.v1.IMsgChannelOpenTry, w?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a MsgChannelOpenTry message from the specified reader or buffer.
                         * @param r Reader or buffer to decode from
                         * @param [l] Message length if known beforehand
                         * @returns MsgChannelOpenTry
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.ibc.channel.v1.MsgChannelOpenTry;
                    }

                    /** Properties of a MsgChannelOpenAck. */
                    interface IMsgChannelOpenAck {

                        /** MsgChannelOpenAck portId */
                        portId?: (string|null);

                        /** MsgChannelOpenAck channelId */
                        channelId?: (string|null);

                        /** MsgChannelOpenAck counterpartyVersion */
                        counterpartyVersion?: (string|null);

                        /** MsgChannelOpenAck proofTry */
                        proofTry?: (Uint8Array|null);

                        /** MsgChannelOpenAck proofHeight */
                        proofHeight?: (number|Long|null);

                        /** MsgChannelOpenAck signer */
                        signer?: (Uint8Array|null);
                    }

                    /** Represents a MsgChannelOpenAck. */
                    class MsgChannelOpenAck implements IMsgChannelOpenAck {

                        /**
                         * Constructs a new MsgChannelOpenAck.
                         * @param [p] Properties to set
                         */
                        constructor(p?: cosmos_sdk.x.ibc.channel.v1.IMsgChannelOpenAck);

                        /** MsgChannelOpenAck portId. */
                        public portId: string;

                        /** MsgChannelOpenAck channelId. */
                        public channelId: string;

                        /** MsgChannelOpenAck counterpartyVersion. */
                        public counterpartyVersion: string;

                        /** MsgChannelOpenAck proofTry. */
                        public proofTry: Uint8Array;

                        /** MsgChannelOpenAck proofHeight. */
                        public proofHeight: (number|Long);

                        /** MsgChannelOpenAck signer. */
                        public signer: Uint8Array;

                        /**
                         * Creates a new MsgChannelOpenAck instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns MsgChannelOpenAck instance
                         */
                        public static create(properties?: cosmos_sdk.x.ibc.channel.v1.IMsgChannelOpenAck): cosmos_sdk.x.ibc.channel.v1.MsgChannelOpenAck;

                        /**
                         * Encodes the specified MsgChannelOpenAck message. Does not implicitly {@link cosmos_sdk.x.ibc.channel.v1.MsgChannelOpenAck.verify|verify} messages.
                         * @param m MsgChannelOpenAck message or plain object to encode
                         * @param [w] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(m: cosmos_sdk.x.ibc.channel.v1.IMsgChannelOpenAck, w?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a MsgChannelOpenAck message from the specified reader or buffer.
                         * @param r Reader or buffer to decode from
                         * @param [l] Message length if known beforehand
                         * @returns MsgChannelOpenAck
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.ibc.channel.v1.MsgChannelOpenAck;
                    }

                    /** Properties of a MsgChannelOpenConfirm. */
                    interface IMsgChannelOpenConfirm {

                        /** MsgChannelOpenConfirm portId */
                        portId?: (string|null);

                        /** MsgChannelOpenConfirm channelId */
                        channelId?: (string|null);

                        /** MsgChannelOpenConfirm proofAck */
                        proofAck?: (Uint8Array|null);

                        /** MsgChannelOpenConfirm proofHeight */
                        proofHeight?: (number|Long|null);

                        /** MsgChannelOpenConfirm signer */
                        signer?: (Uint8Array|null);
                    }

                    /** Represents a MsgChannelOpenConfirm. */
                    class MsgChannelOpenConfirm implements IMsgChannelOpenConfirm {

                        /**
                         * Constructs a new MsgChannelOpenConfirm.
                         * @param [p] Properties to set
                         */
                        constructor(p?: cosmos_sdk.x.ibc.channel.v1.IMsgChannelOpenConfirm);

                        /** MsgChannelOpenConfirm portId. */
                        public portId: string;

                        /** MsgChannelOpenConfirm channelId. */
                        public channelId: string;

                        /** MsgChannelOpenConfirm proofAck. */
                        public proofAck: Uint8Array;

                        /** MsgChannelOpenConfirm proofHeight. */
                        public proofHeight: (number|Long);

                        /** MsgChannelOpenConfirm signer. */
                        public signer: Uint8Array;

                        /**
                         * Creates a new MsgChannelOpenConfirm instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns MsgChannelOpenConfirm instance
                         */
                        public static create(properties?: cosmos_sdk.x.ibc.channel.v1.IMsgChannelOpenConfirm): cosmos_sdk.x.ibc.channel.v1.MsgChannelOpenConfirm;

                        /**
                         * Encodes the specified MsgChannelOpenConfirm message. Does not implicitly {@link cosmos_sdk.x.ibc.channel.v1.MsgChannelOpenConfirm.verify|verify} messages.
                         * @param m MsgChannelOpenConfirm message or plain object to encode
                         * @param [w] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(m: cosmos_sdk.x.ibc.channel.v1.IMsgChannelOpenConfirm, w?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a MsgChannelOpenConfirm message from the specified reader or buffer.
                         * @param r Reader or buffer to decode from
                         * @param [l] Message length if known beforehand
                         * @returns MsgChannelOpenConfirm
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.ibc.channel.v1.MsgChannelOpenConfirm;
                    }

                    /** Properties of a MsgChannelCloseInit. */
                    interface IMsgChannelCloseInit {

                        /** MsgChannelCloseInit portId */
                        portId?: (string|null);

                        /** MsgChannelCloseInit channelId */
                        channelId?: (string|null);

                        /** MsgChannelCloseInit signer */
                        signer?: (Uint8Array|null);
                    }

                    /** Represents a MsgChannelCloseInit. */
                    class MsgChannelCloseInit implements IMsgChannelCloseInit {

                        /**
                         * Constructs a new MsgChannelCloseInit.
                         * @param [p] Properties to set
                         */
                        constructor(p?: cosmos_sdk.x.ibc.channel.v1.IMsgChannelCloseInit);

                        /** MsgChannelCloseInit portId. */
                        public portId: string;

                        /** MsgChannelCloseInit channelId. */
                        public channelId: string;

                        /** MsgChannelCloseInit signer. */
                        public signer: Uint8Array;

                        /**
                         * Creates a new MsgChannelCloseInit instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns MsgChannelCloseInit instance
                         */
                        public static create(properties?: cosmos_sdk.x.ibc.channel.v1.IMsgChannelCloseInit): cosmos_sdk.x.ibc.channel.v1.MsgChannelCloseInit;

                        /**
                         * Encodes the specified MsgChannelCloseInit message. Does not implicitly {@link cosmos_sdk.x.ibc.channel.v1.MsgChannelCloseInit.verify|verify} messages.
                         * @param m MsgChannelCloseInit message or plain object to encode
                         * @param [w] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(m: cosmos_sdk.x.ibc.channel.v1.IMsgChannelCloseInit, w?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a MsgChannelCloseInit message from the specified reader or buffer.
                         * @param r Reader or buffer to decode from
                         * @param [l] Message length if known beforehand
                         * @returns MsgChannelCloseInit
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.ibc.channel.v1.MsgChannelCloseInit;
                    }

                    /** Properties of a MsgChannelCloseConfirm. */
                    interface IMsgChannelCloseConfirm {

                        /** MsgChannelCloseConfirm portId */
                        portId?: (string|null);

                        /** MsgChannelCloseConfirm channelId */
                        channelId?: (string|null);

                        /** MsgChannelCloseConfirm proofInit */
                        proofInit?: (Uint8Array|null);

                        /** MsgChannelCloseConfirm proofHeight */
                        proofHeight?: (number|Long|null);

                        /** MsgChannelCloseConfirm signer */
                        signer?: (Uint8Array|null);
                    }

                    /** Represents a MsgChannelCloseConfirm. */
                    class MsgChannelCloseConfirm implements IMsgChannelCloseConfirm {

                        /**
                         * Constructs a new MsgChannelCloseConfirm.
                         * @param [p] Properties to set
                         */
                        constructor(p?: cosmos_sdk.x.ibc.channel.v1.IMsgChannelCloseConfirm);

                        /** MsgChannelCloseConfirm portId. */
                        public portId: string;

                        /** MsgChannelCloseConfirm channelId. */
                        public channelId: string;

                        /** MsgChannelCloseConfirm proofInit. */
                        public proofInit: Uint8Array;

                        /** MsgChannelCloseConfirm proofHeight. */
                        public proofHeight: (number|Long);

                        /** MsgChannelCloseConfirm signer. */
                        public signer: Uint8Array;

                        /**
                         * Creates a new MsgChannelCloseConfirm instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns MsgChannelCloseConfirm instance
                         */
                        public static create(properties?: cosmos_sdk.x.ibc.channel.v1.IMsgChannelCloseConfirm): cosmos_sdk.x.ibc.channel.v1.MsgChannelCloseConfirm;

                        /**
                         * Encodes the specified MsgChannelCloseConfirm message. Does not implicitly {@link cosmos_sdk.x.ibc.channel.v1.MsgChannelCloseConfirm.verify|verify} messages.
                         * @param m MsgChannelCloseConfirm message or plain object to encode
                         * @param [w] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(m: cosmos_sdk.x.ibc.channel.v1.IMsgChannelCloseConfirm, w?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a MsgChannelCloseConfirm message from the specified reader or buffer.
                         * @param r Reader or buffer to decode from
                         * @param [l] Message length if known beforehand
                         * @returns MsgChannelCloseConfirm
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.ibc.channel.v1.MsgChannelCloseConfirm;
                    }

                    /** Properties of a MsgPacket. */
                    interface IMsgPacket {

                        /** MsgPacket packet */
                        packet?: (cosmos_sdk.x.ibc.channel.v1.IPacket|null);

                        /** MsgPacket proof */
                        proof?: (Uint8Array|null);

                        /** MsgPacket proofHeight */
                        proofHeight?: (number|Long|null);

                        /** MsgPacket signer */
                        signer?: (Uint8Array|null);
                    }

                    /** Represents a MsgPacket. */
                    class MsgPacket implements IMsgPacket {

                        /**
                         * Constructs a new MsgPacket.
                         * @param [p] Properties to set
                         */
                        constructor(p?: cosmos_sdk.x.ibc.channel.v1.IMsgPacket);

                        /** MsgPacket packet. */
                        public packet?: (cosmos_sdk.x.ibc.channel.v1.IPacket|null);

                        /** MsgPacket proof. */
                        public proof: Uint8Array;

                        /** MsgPacket proofHeight. */
                        public proofHeight: (number|Long);

                        /** MsgPacket signer. */
                        public signer: Uint8Array;

                        /**
                         * Creates a new MsgPacket instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns MsgPacket instance
                         */
                        public static create(properties?: cosmos_sdk.x.ibc.channel.v1.IMsgPacket): cosmos_sdk.x.ibc.channel.v1.MsgPacket;

                        /**
                         * Encodes the specified MsgPacket message. Does not implicitly {@link cosmos_sdk.x.ibc.channel.v1.MsgPacket.verify|verify} messages.
                         * @param m MsgPacket message or plain object to encode
                         * @param [w] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(m: cosmos_sdk.x.ibc.channel.v1.IMsgPacket, w?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a MsgPacket message from the specified reader or buffer.
                         * @param r Reader or buffer to decode from
                         * @param [l] Message length if known beforehand
                         * @returns MsgPacket
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.ibc.channel.v1.MsgPacket;
                    }

                    /** Properties of a MsgTimeout. */
                    interface IMsgTimeout {

                        /** MsgTimeout packet */
                        packet?: (cosmos_sdk.x.ibc.channel.v1.IPacket|null);

                        /** MsgTimeout proof */
                        proof?: (Uint8Array|null);

                        /** MsgTimeout proofHeight */
                        proofHeight?: (number|Long|null);

                        /** MsgTimeout nextSequenceRecv */
                        nextSequenceRecv?: (number|Long|null);

                        /** MsgTimeout signer */
                        signer?: (Uint8Array|null);
                    }

                    /** Represents a MsgTimeout. */
                    class MsgTimeout implements IMsgTimeout {

                        /**
                         * Constructs a new MsgTimeout.
                         * @param [p] Properties to set
                         */
                        constructor(p?: cosmos_sdk.x.ibc.channel.v1.IMsgTimeout);

                        /** MsgTimeout packet. */
                        public packet?: (cosmos_sdk.x.ibc.channel.v1.IPacket|null);

                        /** MsgTimeout proof. */
                        public proof: Uint8Array;

                        /** MsgTimeout proofHeight. */
                        public proofHeight: (number|Long);

                        /** MsgTimeout nextSequenceRecv. */
                        public nextSequenceRecv: (number|Long);

                        /** MsgTimeout signer. */
                        public signer: Uint8Array;

                        /**
                         * Creates a new MsgTimeout instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns MsgTimeout instance
                         */
                        public static create(properties?: cosmos_sdk.x.ibc.channel.v1.IMsgTimeout): cosmos_sdk.x.ibc.channel.v1.MsgTimeout;

                        /**
                         * Encodes the specified MsgTimeout message. Does not implicitly {@link cosmos_sdk.x.ibc.channel.v1.MsgTimeout.verify|verify} messages.
                         * @param m MsgTimeout message or plain object to encode
                         * @param [w] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(m: cosmos_sdk.x.ibc.channel.v1.IMsgTimeout, w?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a MsgTimeout message from the specified reader or buffer.
                         * @param r Reader or buffer to decode from
                         * @param [l] Message length if known beforehand
                         * @returns MsgTimeout
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.ibc.channel.v1.MsgTimeout;
                    }

                    /** Properties of a MsgAcknowledgement. */
                    interface IMsgAcknowledgement {

                        /** MsgAcknowledgement packet */
                        packet?: (cosmos_sdk.x.ibc.channel.v1.IPacket|null);

                        /** MsgAcknowledgement acknowledgement */
                        acknowledgement?: (Uint8Array|null);

                        /** MsgAcknowledgement proof */
                        proof?: (Uint8Array|null);

                        /** MsgAcknowledgement proofHeight */
                        proofHeight?: (number|Long|null);

                        /** MsgAcknowledgement signer */
                        signer?: (Uint8Array|null);
                    }

                    /** Represents a MsgAcknowledgement. */
                    class MsgAcknowledgement implements IMsgAcknowledgement {

                        /**
                         * Constructs a new MsgAcknowledgement.
                         * @param [p] Properties to set
                         */
                        constructor(p?: cosmos_sdk.x.ibc.channel.v1.IMsgAcknowledgement);

                        /** MsgAcknowledgement packet. */
                        public packet?: (cosmos_sdk.x.ibc.channel.v1.IPacket|null);

                        /** MsgAcknowledgement acknowledgement. */
                        public acknowledgement: Uint8Array;

                        /** MsgAcknowledgement proof. */
                        public proof: Uint8Array;

                        /** MsgAcknowledgement proofHeight. */
                        public proofHeight: (number|Long);

                        /** MsgAcknowledgement signer. */
                        public signer: Uint8Array;

                        /**
                         * Creates a new MsgAcknowledgement instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns MsgAcknowledgement instance
                         */
                        public static create(properties?: cosmos_sdk.x.ibc.channel.v1.IMsgAcknowledgement): cosmos_sdk.x.ibc.channel.v1.MsgAcknowledgement;

                        /**
                         * Encodes the specified MsgAcknowledgement message. Does not implicitly {@link cosmos_sdk.x.ibc.channel.v1.MsgAcknowledgement.verify|verify} messages.
                         * @param m MsgAcknowledgement message or plain object to encode
                         * @param [w] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(m: cosmos_sdk.x.ibc.channel.v1.IMsgAcknowledgement, w?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a MsgAcknowledgement message from the specified reader or buffer.
                         * @param r Reader or buffer to decode from
                         * @param [l] Message length if known beforehand
                         * @returns MsgAcknowledgement
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.ibc.channel.v1.MsgAcknowledgement;
                    }

                    /** Properties of a Channel. */
                    interface IChannel {

                        /** Channel state */
                        state?: (cosmos_sdk.x.ibc.channel.v1.State|null);

                        /** Channel ordering */
                        ordering?: (cosmos_sdk.x.ibc.channel.v1.Order|null);

                        /** Channel counterparty */
                        counterparty?: (cosmos_sdk.x.ibc.channel.v1.ICounterparty|null);

                        /** Channel connectionHops */
                        connectionHops?: (string[]|null);

                        /** Channel version */
                        version?: (string|null);
                    }

                    /** Represents a Channel. */
                    class Channel implements IChannel {

                        /**
                         * Constructs a new Channel.
                         * @param [p] Properties to set
                         */
                        constructor(p?: cosmos_sdk.x.ibc.channel.v1.IChannel);

                        /** Channel state. */
                        public state: cosmos_sdk.x.ibc.channel.v1.State;

                        /** Channel ordering. */
                        public ordering: cosmos_sdk.x.ibc.channel.v1.Order;

                        /** Channel counterparty. */
                        public counterparty?: (cosmos_sdk.x.ibc.channel.v1.ICounterparty|null);

                        /** Channel connectionHops. */
                        public connectionHops: string[];

                        /** Channel version. */
                        public version: string;

                        /**
                         * Creates a new Channel instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns Channel instance
                         */
                        public static create(properties?: cosmos_sdk.x.ibc.channel.v1.IChannel): cosmos_sdk.x.ibc.channel.v1.Channel;

                        /**
                         * Encodes the specified Channel message. Does not implicitly {@link cosmos_sdk.x.ibc.channel.v1.Channel.verify|verify} messages.
                         * @param m Channel message or plain object to encode
                         * @param [w] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(m: cosmos_sdk.x.ibc.channel.v1.IChannel, w?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a Channel message from the specified reader or buffer.
                         * @param r Reader or buffer to decode from
                         * @param [l] Message length if known beforehand
                         * @returns Channel
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.ibc.channel.v1.Channel;
                    }

                    /** State enum. */
                    enum State {
                        STATE_UNINITIALIZED_UNSPECIFIED = 0,
                        STATE_INIT = 1,
                        STATE_TRYOPEN = 2,
                        STATE_OPEN = 3,
                        STATE_CLOSED = 4
                    }

                    /** Order enum. */
                    enum Order {
                        ORDER_NONE_UNSPECIFIED = 0,
                        ORDER_UNORDERED = 1,
                        ORDER_ORDERED = 2
                    }

                    /** Properties of a Counterparty. */
                    interface ICounterparty {

                        /** Counterparty portId */
                        portId?: (string|null);

                        /** Counterparty channelId */
                        channelId?: (string|null);
                    }

                    /** Represents a Counterparty. */
                    class Counterparty implements ICounterparty {

                        /**
                         * Constructs a new Counterparty.
                         * @param [p] Properties to set
                         */
                        constructor(p?: cosmos_sdk.x.ibc.channel.v1.ICounterparty);

                        /** Counterparty portId. */
                        public portId: string;

                        /** Counterparty channelId. */
                        public channelId: string;

                        /**
                         * Creates a new Counterparty instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns Counterparty instance
                         */
                        public static create(properties?: cosmos_sdk.x.ibc.channel.v1.ICounterparty): cosmos_sdk.x.ibc.channel.v1.Counterparty;

                        /**
                         * Encodes the specified Counterparty message. Does not implicitly {@link cosmos_sdk.x.ibc.channel.v1.Counterparty.verify|verify} messages.
                         * @param m Counterparty message or plain object to encode
                         * @param [w] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(m: cosmos_sdk.x.ibc.channel.v1.ICounterparty, w?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a Counterparty message from the specified reader or buffer.
                         * @param r Reader or buffer to decode from
                         * @param [l] Message length if known beforehand
                         * @returns Counterparty
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.ibc.channel.v1.Counterparty;
                    }

                    /** Properties of a Packet. */
                    interface IPacket {

                        /** Packet sequence */
                        sequence?: (number|Long|null);

                        /** Packet sourcePort */
                        sourcePort?: (string|null);

                        /** Packet sourceChannel */
                        sourceChannel?: (string|null);

                        /** Packet destinationPort */
                        destinationPort?: (string|null);

                        /** Packet destinationChannel */
                        destinationChannel?: (string|null);

                        /** Packet data */
                        data?: (Uint8Array|null);

                        /** Packet timeoutHeight */
                        timeoutHeight?: (number|Long|null);

                        /** Packet timeoutTimestamp */
                        timeoutTimestamp?: (number|Long|null);
                    }

                    /** Represents a Packet. */
                    class Packet implements IPacket {

                        /**
                         * Constructs a new Packet.
                         * @param [p] Properties to set
                         */
                        constructor(p?: cosmos_sdk.x.ibc.channel.v1.IPacket);

                        /** Packet sequence. */
                        public sequence: (number|Long);

                        /** Packet sourcePort. */
                        public sourcePort: string;

                        /** Packet sourceChannel. */
                        public sourceChannel: string;

                        /** Packet destinationPort. */
                        public destinationPort: string;

                        /** Packet destinationChannel. */
                        public destinationChannel: string;

                        /** Packet data. */
                        public data: Uint8Array;

                        /** Packet timeoutHeight. */
                        public timeoutHeight: (number|Long);

                        /** Packet timeoutTimestamp. */
                        public timeoutTimestamp: (number|Long);

                        /**
                         * Creates a new Packet instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns Packet instance
                         */
                        public static create(properties?: cosmos_sdk.x.ibc.channel.v1.IPacket): cosmos_sdk.x.ibc.channel.v1.Packet;

                        /**
                         * Encodes the specified Packet message. Does not implicitly {@link cosmos_sdk.x.ibc.channel.v1.Packet.verify|verify} messages.
                         * @param m Packet message or plain object to encode
                         * @param [w] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(m: cosmos_sdk.x.ibc.channel.v1.IPacket, w?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a Packet message from the specified reader or buffer.
                         * @param r Reader or buffer to decode from
                         * @param [l] Message length if known beforehand
                         * @returns Packet
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.ibc.channel.v1.Packet;
                    }
                }
            }

            /** Namespace commitment. */
            namespace commitment {

                /** Namespace v1. */
                namespace v1 {

                    /** Properties of a MerkleRoot. */
                    interface IMerkleRoot {

                        /** MerkleRoot hash */
                        hash?: (Uint8Array|null);
                    }

                    /** Represents a MerkleRoot. */
                    class MerkleRoot implements IMerkleRoot {

                        /**
                         * Constructs a new MerkleRoot.
                         * @param [p] Properties to set
                         */
                        constructor(p?: cosmos_sdk.x.ibc.commitment.v1.IMerkleRoot);

                        /** MerkleRoot hash. */
                        public hash: Uint8Array;

                        /**
                         * Creates a new MerkleRoot instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns MerkleRoot instance
                         */
                        public static create(properties?: cosmos_sdk.x.ibc.commitment.v1.IMerkleRoot): cosmos_sdk.x.ibc.commitment.v1.MerkleRoot;

                        /**
                         * Encodes the specified MerkleRoot message. Does not implicitly {@link cosmos_sdk.x.ibc.commitment.v1.MerkleRoot.verify|verify} messages.
                         * @param m MerkleRoot message or plain object to encode
                         * @param [w] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(m: cosmos_sdk.x.ibc.commitment.v1.IMerkleRoot, w?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a MerkleRoot message from the specified reader or buffer.
                         * @param r Reader or buffer to decode from
                         * @param [l] Message length if known beforehand
                         * @returns MerkleRoot
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.ibc.commitment.v1.MerkleRoot;
                    }

                    /** Properties of a MerklePrefix. */
                    interface IMerklePrefix {

                        /** MerklePrefix keyPrefix */
                        keyPrefix?: (Uint8Array|null);
                    }

                    /** Represents a MerklePrefix. */
                    class MerklePrefix implements IMerklePrefix {

                        /**
                         * Constructs a new MerklePrefix.
                         * @param [p] Properties to set
                         */
                        constructor(p?: cosmos_sdk.x.ibc.commitment.v1.IMerklePrefix);

                        /** MerklePrefix keyPrefix. */
                        public keyPrefix: Uint8Array;

                        /**
                         * Creates a new MerklePrefix instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns MerklePrefix instance
                         */
                        public static create(properties?: cosmos_sdk.x.ibc.commitment.v1.IMerklePrefix): cosmos_sdk.x.ibc.commitment.v1.MerklePrefix;

                        /**
                         * Encodes the specified MerklePrefix message. Does not implicitly {@link cosmos_sdk.x.ibc.commitment.v1.MerklePrefix.verify|verify} messages.
                         * @param m MerklePrefix message or plain object to encode
                         * @param [w] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(m: cosmos_sdk.x.ibc.commitment.v1.IMerklePrefix, w?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a MerklePrefix message from the specified reader or buffer.
                         * @param r Reader or buffer to decode from
                         * @param [l] Message length if known beforehand
                         * @returns MerklePrefix
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.ibc.commitment.v1.MerklePrefix;
                    }

                    /** Properties of a MerklePath. */
                    interface IMerklePath {

                        /** MerklePath keyPath */
                        keyPath?: (cosmos_sdk.x.ibc.commitment.v1.IKeyPath|null);
                    }

                    /** Represents a MerklePath. */
                    class MerklePath implements IMerklePath {

                        /**
                         * Constructs a new MerklePath.
                         * @param [p] Properties to set
                         */
                        constructor(p?: cosmos_sdk.x.ibc.commitment.v1.IMerklePath);

                        /** MerklePath keyPath. */
                        public keyPath?: (cosmos_sdk.x.ibc.commitment.v1.IKeyPath|null);

                        /**
                         * Creates a new MerklePath instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns MerklePath instance
                         */
                        public static create(properties?: cosmos_sdk.x.ibc.commitment.v1.IMerklePath): cosmos_sdk.x.ibc.commitment.v1.MerklePath;

                        /**
                         * Encodes the specified MerklePath message. Does not implicitly {@link cosmos_sdk.x.ibc.commitment.v1.MerklePath.verify|verify} messages.
                         * @param m MerklePath message or plain object to encode
                         * @param [w] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(m: cosmos_sdk.x.ibc.commitment.v1.IMerklePath, w?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a MerklePath message from the specified reader or buffer.
                         * @param r Reader or buffer to decode from
                         * @param [l] Message length if known beforehand
                         * @returns MerklePath
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.ibc.commitment.v1.MerklePath;
                    }

                    /** Properties of a MerkleProof. */
                    interface IMerkleProof {

                        /** MerkleProof proof */
                        proof?: (tendermint.crypto.merkle.IProof|null);
                    }

                    /** Represents a MerkleProof. */
                    class MerkleProof implements IMerkleProof {

                        /**
                         * Constructs a new MerkleProof.
                         * @param [p] Properties to set
                         */
                        constructor(p?: cosmos_sdk.x.ibc.commitment.v1.IMerkleProof);

                        /** MerkleProof proof. */
                        public proof?: (tendermint.crypto.merkle.IProof|null);

                        /**
                         * Creates a new MerkleProof instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns MerkleProof instance
                         */
                        public static create(properties?: cosmos_sdk.x.ibc.commitment.v1.IMerkleProof): cosmos_sdk.x.ibc.commitment.v1.MerkleProof;

                        /**
                         * Encodes the specified MerkleProof message. Does not implicitly {@link cosmos_sdk.x.ibc.commitment.v1.MerkleProof.verify|verify} messages.
                         * @param m MerkleProof message or plain object to encode
                         * @param [w] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(m: cosmos_sdk.x.ibc.commitment.v1.IMerkleProof, w?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a MerkleProof message from the specified reader or buffer.
                         * @param r Reader or buffer to decode from
                         * @param [l] Message length if known beforehand
                         * @returns MerkleProof
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.ibc.commitment.v1.MerkleProof;
                    }

                    /** Properties of a KeyPath. */
                    interface IKeyPath {

                        /** KeyPath keys */
                        keys?: (cosmos_sdk.x.ibc.commitment.v1.IKey[]|null);
                    }

                    /** Represents a KeyPath. */
                    class KeyPath implements IKeyPath {

                        /**
                         * Constructs a new KeyPath.
                         * @param [p] Properties to set
                         */
                        constructor(p?: cosmos_sdk.x.ibc.commitment.v1.IKeyPath);

                        /** KeyPath keys. */
                        public keys: cosmos_sdk.x.ibc.commitment.v1.IKey[];

                        /**
                         * Creates a new KeyPath instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns KeyPath instance
                         */
                        public static create(properties?: cosmos_sdk.x.ibc.commitment.v1.IKeyPath): cosmos_sdk.x.ibc.commitment.v1.KeyPath;

                        /**
                         * Encodes the specified KeyPath message. Does not implicitly {@link cosmos_sdk.x.ibc.commitment.v1.KeyPath.verify|verify} messages.
                         * @param m KeyPath message or plain object to encode
                         * @param [w] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(m: cosmos_sdk.x.ibc.commitment.v1.IKeyPath, w?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a KeyPath message from the specified reader or buffer.
                         * @param r Reader or buffer to decode from
                         * @param [l] Message length if known beforehand
                         * @returns KeyPath
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.ibc.commitment.v1.KeyPath;
                    }

                    /** Properties of a Key. */
                    interface IKey {

                        /** Key name */
                        name?: (Uint8Array|null);

                        /** Key enc */
                        enc?: (cosmos_sdk.x.ibc.commitment.v1.KeyEncoding|null);
                    }

                    /** Represents a Key. */
                    class Key implements IKey {

                        /**
                         * Constructs a new Key.
                         * @param [p] Properties to set
                         */
                        constructor(p?: cosmos_sdk.x.ibc.commitment.v1.IKey);

                        /** Key name. */
                        public name: Uint8Array;

                        /** Key enc. */
                        public enc: cosmos_sdk.x.ibc.commitment.v1.KeyEncoding;

                        /**
                         * Creates a new Key instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns Key instance
                         */
                        public static create(properties?: cosmos_sdk.x.ibc.commitment.v1.IKey): cosmos_sdk.x.ibc.commitment.v1.Key;

                        /**
                         * Encodes the specified Key message. Does not implicitly {@link cosmos_sdk.x.ibc.commitment.v1.Key.verify|verify} messages.
                         * @param m Key message or plain object to encode
                         * @param [w] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(m: cosmos_sdk.x.ibc.commitment.v1.IKey, w?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a Key message from the specified reader or buffer.
                         * @param r Reader or buffer to decode from
                         * @param [l] Message length if known beforehand
                         * @returns Key
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.ibc.commitment.v1.Key;
                    }

                    /** KeyEncoding enum. */
                    enum KeyEncoding {
                        KEY_ENCODING_URL_UNSPECIFIED = 0,
                        KEY_ENCODING_HEX = 1
                    }
                }
            }
        }

        /** Namespace mint. */
        namespace mint {

            /** Namespace v1. */
            namespace v1 {

                /** Properties of a Minter. */
                interface IMinter {

                    /** Minter inflation */
                    inflation?: (string|null);

                    /** Minter annualProvisions */
                    annualProvisions?: (string|null);
                }

                /** Represents a Minter. */
                class Minter implements IMinter {

                    /**
                     * Constructs a new Minter.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.mint.v1.IMinter);

                    /** Minter inflation. */
                    public inflation: string;

                    /** Minter annualProvisions. */
                    public annualProvisions: string;

                    /**
                     * Creates a new Minter instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Minter instance
                     */
                    public static create(properties?: cosmos_sdk.x.mint.v1.IMinter): cosmos_sdk.x.mint.v1.Minter;

                    /**
                     * Encodes the specified Minter message. Does not implicitly {@link cosmos_sdk.x.mint.v1.Minter.verify|verify} messages.
                     * @param m Minter message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.mint.v1.IMinter, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Minter message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns Minter
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.mint.v1.Minter;
                }

                /** Properties of a Params. */
                interface IParams {

                    /** Params mintDenom */
                    mintDenom?: (string|null);

                    /** Params inflationRateChange */
                    inflationRateChange?: (string|null);

                    /** Params inflationMax */
                    inflationMax?: (string|null);

                    /** Params inflationMin */
                    inflationMin?: (string|null);

                    /** Params goalBonded */
                    goalBonded?: (string|null);

                    /** Params blocksPerYear */
                    blocksPerYear?: (number|Long|null);
                }

                /** Represents a Params. */
                class Params implements IParams {

                    /**
                     * Constructs a new Params.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.mint.v1.IParams);

                    /** Params mintDenom. */
                    public mintDenom: string;

                    /** Params inflationRateChange. */
                    public inflationRateChange: string;

                    /** Params inflationMax. */
                    public inflationMax: string;

                    /** Params inflationMin. */
                    public inflationMin: string;

                    /** Params goalBonded. */
                    public goalBonded: string;

                    /** Params blocksPerYear. */
                    public blocksPerYear: (number|Long);

                    /**
                     * Creates a new Params instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Params instance
                     */
                    public static create(properties?: cosmos_sdk.x.mint.v1.IParams): cosmos_sdk.x.mint.v1.Params;

                    /**
                     * Encodes the specified Params message. Does not implicitly {@link cosmos_sdk.x.mint.v1.Params.verify|verify} messages.
                     * @param m Params message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.mint.v1.IParams, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Params message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns Params
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.mint.v1.Params;
                }
            }
        }

        /** Namespace params. */
        namespace params {

            /** Namespace v1. */
            namespace v1 {

                /** Properties of a ParameterChangeProposal. */
                interface IParameterChangeProposal {

                    /** ParameterChangeProposal title */
                    title?: (string|null);

                    /** ParameterChangeProposal description */
                    description?: (string|null);

                    /** ParameterChangeProposal changes */
                    changes?: (cosmos_sdk.x.params.v1.IParamChange[]|null);
                }

                /** Represents a ParameterChangeProposal. */
                class ParameterChangeProposal implements IParameterChangeProposal {

                    /**
                     * Constructs a new ParameterChangeProposal.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.params.v1.IParameterChangeProposal);

                    /** ParameterChangeProposal title. */
                    public title: string;

                    /** ParameterChangeProposal description. */
                    public description: string;

                    /** ParameterChangeProposal changes. */
                    public changes: cosmos_sdk.x.params.v1.IParamChange[];

                    /**
                     * Creates a new ParameterChangeProposal instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ParameterChangeProposal instance
                     */
                    public static create(properties?: cosmos_sdk.x.params.v1.IParameterChangeProposal): cosmos_sdk.x.params.v1.ParameterChangeProposal;

                    /**
                     * Encodes the specified ParameterChangeProposal message. Does not implicitly {@link cosmos_sdk.x.params.v1.ParameterChangeProposal.verify|verify} messages.
                     * @param m ParameterChangeProposal message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.params.v1.IParameterChangeProposal, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ParameterChangeProposal message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns ParameterChangeProposal
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.params.v1.ParameterChangeProposal;
                }

                /** Properties of a ParamChange. */
                interface IParamChange {

                    /** ParamChange subspace */
                    subspace?: (string|null);

                    /** ParamChange key */
                    key?: (string|null);

                    /** ParamChange value */
                    value?: (string|null);
                }

                /** Represents a ParamChange. */
                class ParamChange implements IParamChange {

                    /**
                     * Constructs a new ParamChange.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.params.v1.IParamChange);

                    /** ParamChange subspace. */
                    public subspace: string;

                    /** ParamChange key. */
                    public key: string;

                    /** ParamChange value. */
                    public value: string;

                    /**
                     * Creates a new ParamChange instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ParamChange instance
                     */
                    public static create(properties?: cosmos_sdk.x.params.v1.IParamChange): cosmos_sdk.x.params.v1.ParamChange;

                    /**
                     * Encodes the specified ParamChange message. Does not implicitly {@link cosmos_sdk.x.params.v1.ParamChange.verify|verify} messages.
                     * @param m ParamChange message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.params.v1.IParamChange, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ParamChange message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns ParamChange
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.params.v1.ParamChange;
                }
            }
        }

        /** Namespace slashing. */
        namespace slashing {

            /** Namespace v1. */
            namespace v1 {

                /** Properties of a MsgUnjail. */
                interface IMsgUnjail {

                    /** MsgUnjail validatorAddr */
                    validatorAddr?: (Uint8Array|null);
                }

                /** Represents a MsgUnjail. */
                class MsgUnjail implements IMsgUnjail {

                    /**
                     * Constructs a new MsgUnjail.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.slashing.v1.IMsgUnjail);

                    /** MsgUnjail validatorAddr. */
                    public validatorAddr: Uint8Array;

                    /**
                     * Creates a new MsgUnjail instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns MsgUnjail instance
                     */
                    public static create(properties?: cosmos_sdk.x.slashing.v1.IMsgUnjail): cosmos_sdk.x.slashing.v1.MsgUnjail;

                    /**
                     * Encodes the specified MsgUnjail message. Does not implicitly {@link cosmos_sdk.x.slashing.v1.MsgUnjail.verify|verify} messages.
                     * @param m MsgUnjail message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.slashing.v1.IMsgUnjail, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a MsgUnjail message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns MsgUnjail
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.slashing.v1.MsgUnjail;
                }

                /** Properties of a ValidatorSigningInfo. */
                interface IValidatorSigningInfo {

                    /** ValidatorSigningInfo address */
                    address?: (Uint8Array|null);

                    /** ValidatorSigningInfo startHeight */
                    startHeight?: (number|Long|null);

                    /** ValidatorSigningInfo indexOffset */
                    indexOffset?: (number|Long|null);

                    /** ValidatorSigningInfo jailedUntil */
                    jailedUntil?: (google.protobuf.ITimestamp|null);

                    /** ValidatorSigningInfo tombstoned */
                    tombstoned?: (boolean|null);

                    /** ValidatorSigningInfo missedBlocksCounter */
                    missedBlocksCounter?: (number|Long|null);
                }

                /** Represents a ValidatorSigningInfo. */
                class ValidatorSigningInfo implements IValidatorSigningInfo {

                    /**
                     * Constructs a new ValidatorSigningInfo.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.slashing.v1.IValidatorSigningInfo);

                    /** ValidatorSigningInfo address. */
                    public address: Uint8Array;

                    /** ValidatorSigningInfo startHeight. */
                    public startHeight: (number|Long);

                    /** ValidatorSigningInfo indexOffset. */
                    public indexOffset: (number|Long);

                    /** ValidatorSigningInfo jailedUntil. */
                    public jailedUntil?: (google.protobuf.ITimestamp|null);

                    /** ValidatorSigningInfo tombstoned. */
                    public tombstoned: boolean;

                    /** ValidatorSigningInfo missedBlocksCounter. */
                    public missedBlocksCounter: (number|Long);

                    /**
                     * Creates a new ValidatorSigningInfo instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns ValidatorSigningInfo instance
                     */
                    public static create(properties?: cosmos_sdk.x.slashing.v1.IValidatorSigningInfo): cosmos_sdk.x.slashing.v1.ValidatorSigningInfo;

                    /**
                     * Encodes the specified ValidatorSigningInfo message. Does not implicitly {@link cosmos_sdk.x.slashing.v1.ValidatorSigningInfo.verify|verify} messages.
                     * @param m ValidatorSigningInfo message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.slashing.v1.IValidatorSigningInfo, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a ValidatorSigningInfo message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns ValidatorSigningInfo
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.slashing.v1.ValidatorSigningInfo;
                }
            }
        }

        /** Namespace staking. */
        namespace staking {

            /** Namespace v1. */
            namespace v1 {

                /** Properties of a MsgCreateValidator. */
                interface IMsgCreateValidator {

                    /** MsgCreateValidator description */
                    description?: (cosmos_sdk.x.staking.v1.IDescription|null);

                    /** MsgCreateValidator commission */
                    commission?: (cosmos_sdk.x.staking.v1.ICommissionRates|null);

                    /** MsgCreateValidator minSelfDelegation */
                    minSelfDelegation?: (string|null);

                    /** MsgCreateValidator delegatorAddress */
                    delegatorAddress?: (Uint8Array|null);

                    /** MsgCreateValidator validatorAddress */
                    validatorAddress?: (Uint8Array|null);

                    /** MsgCreateValidator pubkey */
                    pubkey?: (string|null);

                    /** MsgCreateValidator value */
                    value?: (cosmos_sdk.v1.ICoin|null);
                }

                /** Represents a MsgCreateValidator. */
                class MsgCreateValidator implements IMsgCreateValidator {

                    /**
                     * Constructs a new MsgCreateValidator.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.staking.v1.IMsgCreateValidator);

                    /** MsgCreateValidator description. */
                    public description?: (cosmos_sdk.x.staking.v1.IDescription|null);

                    /** MsgCreateValidator commission. */
                    public commission?: (cosmos_sdk.x.staking.v1.ICommissionRates|null);

                    /** MsgCreateValidator minSelfDelegation. */
                    public minSelfDelegation: string;

                    /** MsgCreateValidator delegatorAddress. */
                    public delegatorAddress: Uint8Array;

                    /** MsgCreateValidator validatorAddress. */
                    public validatorAddress: Uint8Array;

                    /** MsgCreateValidator pubkey. */
                    public pubkey: string;

                    /** MsgCreateValidator value. */
                    public value?: (cosmos_sdk.v1.ICoin|null);

                    /**
                     * Creates a new MsgCreateValidator instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns MsgCreateValidator instance
                     */
                    public static create(properties?: cosmos_sdk.x.staking.v1.IMsgCreateValidator): cosmos_sdk.x.staking.v1.MsgCreateValidator;

                    /**
                     * Encodes the specified MsgCreateValidator message. Does not implicitly {@link cosmos_sdk.x.staking.v1.MsgCreateValidator.verify|verify} messages.
                     * @param m MsgCreateValidator message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.staking.v1.IMsgCreateValidator, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a MsgCreateValidator message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns MsgCreateValidator
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.staking.v1.MsgCreateValidator;
                }

                /** Properties of a MsgEditValidator. */
                interface IMsgEditValidator {

                    /** MsgEditValidator description */
                    description?: (cosmos_sdk.x.staking.v1.IDescription|null);

                    /** MsgEditValidator validatorAddress */
                    validatorAddress?: (Uint8Array|null);

                    /** MsgEditValidator commissionRate */
                    commissionRate?: (string|null);

                    /** MsgEditValidator minSelfDelegation */
                    minSelfDelegation?: (string|null);
                }

                /** Represents a MsgEditValidator. */
                class MsgEditValidator implements IMsgEditValidator {

                    /**
                     * Constructs a new MsgEditValidator.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.staking.v1.IMsgEditValidator);

                    /** MsgEditValidator description. */
                    public description?: (cosmos_sdk.x.staking.v1.IDescription|null);

                    /** MsgEditValidator validatorAddress. */
                    public validatorAddress: Uint8Array;

                    /** MsgEditValidator commissionRate. */
                    public commissionRate: string;

                    /** MsgEditValidator minSelfDelegation. */
                    public minSelfDelegation: string;

                    /**
                     * Creates a new MsgEditValidator instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns MsgEditValidator instance
                     */
                    public static create(properties?: cosmos_sdk.x.staking.v1.IMsgEditValidator): cosmos_sdk.x.staking.v1.MsgEditValidator;

                    /**
                     * Encodes the specified MsgEditValidator message. Does not implicitly {@link cosmos_sdk.x.staking.v1.MsgEditValidator.verify|verify} messages.
                     * @param m MsgEditValidator message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.staking.v1.IMsgEditValidator, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a MsgEditValidator message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns MsgEditValidator
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.staking.v1.MsgEditValidator;
                }

                /** Properties of a MsgDelegate. */
                interface IMsgDelegate {

                    /** MsgDelegate delegatorAddress */
                    delegatorAddress?: (Uint8Array|null);

                    /** MsgDelegate validatorAddress */
                    validatorAddress?: (Uint8Array|null);

                    /** MsgDelegate amount */
                    amount?: (cosmos_sdk.v1.ICoin|null);
                }

                /** Represents a MsgDelegate. */
                class MsgDelegate implements IMsgDelegate {

                    /**
                     * Constructs a new MsgDelegate.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.staking.v1.IMsgDelegate);

                    /** MsgDelegate delegatorAddress. */
                    public delegatorAddress: Uint8Array;

                    /** MsgDelegate validatorAddress. */
                    public validatorAddress: Uint8Array;

                    /** MsgDelegate amount. */
                    public amount?: (cosmos_sdk.v1.ICoin|null);

                    /**
                     * Creates a new MsgDelegate instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns MsgDelegate instance
                     */
                    public static create(properties?: cosmos_sdk.x.staking.v1.IMsgDelegate): cosmos_sdk.x.staking.v1.MsgDelegate;

                    /**
                     * Encodes the specified MsgDelegate message. Does not implicitly {@link cosmos_sdk.x.staking.v1.MsgDelegate.verify|verify} messages.
                     * @param m MsgDelegate message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.staking.v1.IMsgDelegate, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a MsgDelegate message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns MsgDelegate
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.staking.v1.MsgDelegate;
                }

                /** Properties of a MsgBeginRedelegate. */
                interface IMsgBeginRedelegate {

                    /** MsgBeginRedelegate delegatorAddress */
                    delegatorAddress?: (Uint8Array|null);

                    /** MsgBeginRedelegate validatorSrcAddress */
                    validatorSrcAddress?: (Uint8Array|null);

                    /** MsgBeginRedelegate validatorDstAddress */
                    validatorDstAddress?: (Uint8Array|null);

                    /** MsgBeginRedelegate amount */
                    amount?: (cosmos_sdk.v1.ICoin|null);
                }

                /** Represents a MsgBeginRedelegate. */
                class MsgBeginRedelegate implements IMsgBeginRedelegate {

                    /**
                     * Constructs a new MsgBeginRedelegate.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.staking.v1.IMsgBeginRedelegate);

                    /** MsgBeginRedelegate delegatorAddress. */
                    public delegatorAddress: Uint8Array;

                    /** MsgBeginRedelegate validatorSrcAddress. */
                    public validatorSrcAddress: Uint8Array;

                    /** MsgBeginRedelegate validatorDstAddress. */
                    public validatorDstAddress: Uint8Array;

                    /** MsgBeginRedelegate amount. */
                    public amount?: (cosmos_sdk.v1.ICoin|null);

                    /**
                     * Creates a new MsgBeginRedelegate instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns MsgBeginRedelegate instance
                     */
                    public static create(properties?: cosmos_sdk.x.staking.v1.IMsgBeginRedelegate): cosmos_sdk.x.staking.v1.MsgBeginRedelegate;

                    /**
                     * Encodes the specified MsgBeginRedelegate message. Does not implicitly {@link cosmos_sdk.x.staking.v1.MsgBeginRedelegate.verify|verify} messages.
                     * @param m MsgBeginRedelegate message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.staking.v1.IMsgBeginRedelegate, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a MsgBeginRedelegate message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns MsgBeginRedelegate
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.staking.v1.MsgBeginRedelegate;
                }

                /** Properties of a MsgUndelegate. */
                interface IMsgUndelegate {

                    /** MsgUndelegate delegatorAddress */
                    delegatorAddress?: (Uint8Array|null);

                    /** MsgUndelegate validatorAddress */
                    validatorAddress?: (Uint8Array|null);

                    /** MsgUndelegate amount */
                    amount?: (cosmos_sdk.v1.ICoin|null);
                }

                /** Represents a MsgUndelegate. */
                class MsgUndelegate implements IMsgUndelegate {

                    /**
                     * Constructs a new MsgUndelegate.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.staking.v1.IMsgUndelegate);

                    /** MsgUndelegate delegatorAddress. */
                    public delegatorAddress: Uint8Array;

                    /** MsgUndelegate validatorAddress. */
                    public validatorAddress: Uint8Array;

                    /** MsgUndelegate amount. */
                    public amount?: (cosmos_sdk.v1.ICoin|null);

                    /**
                     * Creates a new MsgUndelegate instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns MsgUndelegate instance
                     */
                    public static create(properties?: cosmos_sdk.x.staking.v1.IMsgUndelegate): cosmos_sdk.x.staking.v1.MsgUndelegate;

                    /**
                     * Encodes the specified MsgUndelegate message. Does not implicitly {@link cosmos_sdk.x.staking.v1.MsgUndelegate.verify|verify} messages.
                     * @param m MsgUndelegate message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.staking.v1.IMsgUndelegate, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a MsgUndelegate message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns MsgUndelegate
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.staking.v1.MsgUndelegate;
                }

                /** Properties of a HistoricalInfo. */
                interface IHistoricalInfo {

                    /** HistoricalInfo header */
                    header?: (tendermint.abci.types.IHeader|null);

                    /** HistoricalInfo valset */
                    valset?: (cosmos_sdk.x.staking.v1.IValidator[]|null);
                }

                /** Represents a HistoricalInfo. */
                class HistoricalInfo implements IHistoricalInfo {

                    /**
                     * Constructs a new HistoricalInfo.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.staking.v1.IHistoricalInfo);

                    /** HistoricalInfo header. */
                    public header?: (tendermint.abci.types.IHeader|null);

                    /** HistoricalInfo valset. */
                    public valset: cosmos_sdk.x.staking.v1.IValidator[];

                    /**
                     * Creates a new HistoricalInfo instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns HistoricalInfo instance
                     */
                    public static create(properties?: cosmos_sdk.x.staking.v1.IHistoricalInfo): cosmos_sdk.x.staking.v1.HistoricalInfo;

                    /**
                     * Encodes the specified HistoricalInfo message. Does not implicitly {@link cosmos_sdk.x.staking.v1.HistoricalInfo.verify|verify} messages.
                     * @param m HistoricalInfo message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.staking.v1.IHistoricalInfo, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a HistoricalInfo message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns HistoricalInfo
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.staking.v1.HistoricalInfo;
                }

                /** Properties of a CommissionRates. */
                interface ICommissionRates {

                    /** CommissionRates rate */
                    rate?: (string|null);

                    /** CommissionRates maxRate */
                    maxRate?: (string|null);

                    /** CommissionRates maxChangeRate */
                    maxChangeRate?: (string|null);
                }

                /** Represents a CommissionRates. */
                class CommissionRates implements ICommissionRates {

                    /**
                     * Constructs a new CommissionRates.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.staking.v1.ICommissionRates);

                    /** CommissionRates rate. */
                    public rate: string;

                    /** CommissionRates maxRate. */
                    public maxRate: string;

                    /** CommissionRates maxChangeRate. */
                    public maxChangeRate: string;

                    /**
                     * Creates a new CommissionRates instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns CommissionRates instance
                     */
                    public static create(properties?: cosmos_sdk.x.staking.v1.ICommissionRates): cosmos_sdk.x.staking.v1.CommissionRates;

                    /**
                     * Encodes the specified CommissionRates message. Does not implicitly {@link cosmos_sdk.x.staking.v1.CommissionRates.verify|verify} messages.
                     * @param m CommissionRates message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.staking.v1.ICommissionRates, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a CommissionRates message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns CommissionRates
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.staking.v1.CommissionRates;
                }

                /** Properties of a Commission. */
                interface ICommission {

                    /** Commission commissionRates */
                    commissionRates?: (cosmos_sdk.x.staking.v1.ICommissionRates|null);

                    /** Commission updateTime */
                    updateTime?: (google.protobuf.ITimestamp|null);
                }

                /** Represents a Commission. */
                class Commission implements ICommission {

                    /**
                     * Constructs a new Commission.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.staking.v1.ICommission);

                    /** Commission commissionRates. */
                    public commissionRates?: (cosmos_sdk.x.staking.v1.ICommissionRates|null);

                    /** Commission updateTime. */
                    public updateTime?: (google.protobuf.ITimestamp|null);

                    /**
                     * Creates a new Commission instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Commission instance
                     */
                    public static create(properties?: cosmos_sdk.x.staking.v1.ICommission): cosmos_sdk.x.staking.v1.Commission;

                    /**
                     * Encodes the specified Commission message. Does not implicitly {@link cosmos_sdk.x.staking.v1.Commission.verify|verify} messages.
                     * @param m Commission message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.staking.v1.ICommission, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Commission message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns Commission
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.staking.v1.Commission;
                }

                /** Properties of a Description. */
                interface IDescription {

                    /** Description moniker */
                    moniker?: (string|null);

                    /** Description identity */
                    identity?: (string|null);

                    /** Description website */
                    website?: (string|null);

                    /** Description securityContact */
                    securityContact?: (string|null);

                    /** Description details */
                    details?: (string|null);
                }

                /** Represents a Description. */
                class Description implements IDescription {

                    /**
                     * Constructs a new Description.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.staking.v1.IDescription);

                    /** Description moniker. */
                    public moniker: string;

                    /** Description identity. */
                    public identity: string;

                    /** Description website. */
                    public website: string;

                    /** Description securityContact. */
                    public securityContact: string;

                    /** Description details. */
                    public details: string;

                    /**
                     * Creates a new Description instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Description instance
                     */
                    public static create(properties?: cosmos_sdk.x.staking.v1.IDescription): cosmos_sdk.x.staking.v1.Description;

                    /**
                     * Encodes the specified Description message. Does not implicitly {@link cosmos_sdk.x.staking.v1.Description.verify|verify} messages.
                     * @param m Description message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.staking.v1.IDescription, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Description message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns Description
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.staking.v1.Description;
                }

                /** Properties of a Validator. */
                interface IValidator {

                    /** Validator operatorAddress */
                    operatorAddress?: (Uint8Array|null);

                    /** Validator consensusPubkey */
                    consensusPubkey?: (string|null);

                    /** Validator jailed */
                    jailed?: (boolean|null);

                    /** Validator status */
                    status?: (number|null);

                    /** Validator tokens */
                    tokens?: (string|null);

                    /** Validator delegatorShares */
                    delegatorShares?: (string|null);

                    /** Validator description */
                    description?: (cosmos_sdk.x.staking.v1.IDescription|null);

                    /** Validator unbondingHeight */
                    unbondingHeight?: (number|Long|null);

                    /** Validator unbondingTime */
                    unbondingTime?: (google.protobuf.ITimestamp|null);

                    /** Validator commission */
                    commission?: (cosmos_sdk.x.staking.v1.ICommission|null);

                    /** Validator minSelfDelegation */
                    minSelfDelegation?: (string|null);
                }

                /** Represents a Validator. */
                class Validator implements IValidator {

                    /**
                     * Constructs a new Validator.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.staking.v1.IValidator);

                    /** Validator operatorAddress. */
                    public operatorAddress: Uint8Array;

                    /** Validator consensusPubkey. */
                    public consensusPubkey: string;

                    /** Validator jailed. */
                    public jailed: boolean;

                    /** Validator status. */
                    public status: number;

                    /** Validator tokens. */
                    public tokens: string;

                    /** Validator delegatorShares. */
                    public delegatorShares: string;

                    /** Validator description. */
                    public description?: (cosmos_sdk.x.staking.v1.IDescription|null);

                    /** Validator unbondingHeight. */
                    public unbondingHeight: (number|Long);

                    /** Validator unbondingTime. */
                    public unbondingTime?: (google.protobuf.ITimestamp|null);

                    /** Validator commission. */
                    public commission?: (cosmos_sdk.x.staking.v1.ICommission|null);

                    /** Validator minSelfDelegation. */
                    public minSelfDelegation: string;

                    /**
                     * Creates a new Validator instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Validator instance
                     */
                    public static create(properties?: cosmos_sdk.x.staking.v1.IValidator): cosmos_sdk.x.staking.v1.Validator;

                    /**
                     * Encodes the specified Validator message. Does not implicitly {@link cosmos_sdk.x.staking.v1.Validator.verify|verify} messages.
                     * @param m Validator message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.staking.v1.IValidator, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Validator message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns Validator
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.staking.v1.Validator;
                }

                /** Properties of a DVPair. */
                interface IDVPair {

                    /** DVPair delegatorAddress */
                    delegatorAddress?: (Uint8Array|null);

                    /** DVPair validatorAddress */
                    validatorAddress?: (Uint8Array|null);
                }

                /** Represents a DVPair. */
                class DVPair implements IDVPair {

                    /**
                     * Constructs a new DVPair.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.staking.v1.IDVPair);

                    /** DVPair delegatorAddress. */
                    public delegatorAddress: Uint8Array;

                    /** DVPair validatorAddress. */
                    public validatorAddress: Uint8Array;

                    /**
                     * Creates a new DVPair instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns DVPair instance
                     */
                    public static create(properties?: cosmos_sdk.x.staking.v1.IDVPair): cosmos_sdk.x.staking.v1.DVPair;

                    /**
                     * Encodes the specified DVPair message. Does not implicitly {@link cosmos_sdk.x.staking.v1.DVPair.verify|verify} messages.
                     * @param m DVPair message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.staking.v1.IDVPair, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a DVPair message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns DVPair
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.staking.v1.DVPair;
                }

                /** Properties of a DVPairs. */
                interface IDVPairs {

                    /** DVPairs pairs */
                    pairs?: (cosmos_sdk.x.staking.v1.IDVPair[]|null);
                }

                /** Represents a DVPairs. */
                class DVPairs implements IDVPairs {

                    /**
                     * Constructs a new DVPairs.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.staking.v1.IDVPairs);

                    /** DVPairs pairs. */
                    public pairs: cosmos_sdk.x.staking.v1.IDVPair[];

                    /**
                     * Creates a new DVPairs instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns DVPairs instance
                     */
                    public static create(properties?: cosmos_sdk.x.staking.v1.IDVPairs): cosmos_sdk.x.staking.v1.DVPairs;

                    /**
                     * Encodes the specified DVPairs message. Does not implicitly {@link cosmos_sdk.x.staking.v1.DVPairs.verify|verify} messages.
                     * @param m DVPairs message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.staking.v1.IDVPairs, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a DVPairs message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns DVPairs
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.staking.v1.DVPairs;
                }

                /** Properties of a DVVTriplet. */
                interface IDVVTriplet {

                    /** DVVTriplet delegatorAddress */
                    delegatorAddress?: (Uint8Array|null);

                    /** DVVTriplet validatorSrcAddress */
                    validatorSrcAddress?: (Uint8Array|null);

                    /** DVVTriplet validatorDstAddress */
                    validatorDstAddress?: (Uint8Array|null);
                }

                /** Represents a DVVTriplet. */
                class DVVTriplet implements IDVVTriplet {

                    /**
                     * Constructs a new DVVTriplet.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.staking.v1.IDVVTriplet);

                    /** DVVTriplet delegatorAddress. */
                    public delegatorAddress: Uint8Array;

                    /** DVVTriplet validatorSrcAddress. */
                    public validatorSrcAddress: Uint8Array;

                    /** DVVTriplet validatorDstAddress. */
                    public validatorDstAddress: Uint8Array;

                    /**
                     * Creates a new DVVTriplet instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns DVVTriplet instance
                     */
                    public static create(properties?: cosmos_sdk.x.staking.v1.IDVVTriplet): cosmos_sdk.x.staking.v1.DVVTriplet;

                    /**
                     * Encodes the specified DVVTriplet message. Does not implicitly {@link cosmos_sdk.x.staking.v1.DVVTriplet.verify|verify} messages.
                     * @param m DVVTriplet message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.staking.v1.IDVVTriplet, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a DVVTriplet message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns DVVTriplet
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.staking.v1.DVVTriplet;
                }

                /** Properties of a DVVTriplets. */
                interface IDVVTriplets {

                    /** DVVTriplets triplets */
                    triplets?: (cosmos_sdk.x.staking.v1.IDVVTriplet[]|null);
                }

                /** Represents a DVVTriplets. */
                class DVVTriplets implements IDVVTriplets {

                    /**
                     * Constructs a new DVVTriplets.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.staking.v1.IDVVTriplets);

                    /** DVVTriplets triplets. */
                    public triplets: cosmos_sdk.x.staking.v1.IDVVTriplet[];

                    /**
                     * Creates a new DVVTriplets instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns DVVTriplets instance
                     */
                    public static create(properties?: cosmos_sdk.x.staking.v1.IDVVTriplets): cosmos_sdk.x.staking.v1.DVVTriplets;

                    /**
                     * Encodes the specified DVVTriplets message. Does not implicitly {@link cosmos_sdk.x.staking.v1.DVVTriplets.verify|verify} messages.
                     * @param m DVVTriplets message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.staking.v1.IDVVTriplets, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a DVVTriplets message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns DVVTriplets
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.staking.v1.DVVTriplets;
                }

                /** Properties of a Delegation. */
                interface IDelegation {

                    /** Delegation delegatorAddress */
                    delegatorAddress?: (Uint8Array|null);

                    /** Delegation validatorAddress */
                    validatorAddress?: (Uint8Array|null);

                    /** Delegation shares */
                    shares?: (string|null);
                }

                /** Represents a Delegation. */
                class Delegation implements IDelegation {

                    /**
                     * Constructs a new Delegation.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.staking.v1.IDelegation);

                    /** Delegation delegatorAddress. */
                    public delegatorAddress: Uint8Array;

                    /** Delegation validatorAddress. */
                    public validatorAddress: Uint8Array;

                    /** Delegation shares. */
                    public shares: string;

                    /**
                     * Creates a new Delegation instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Delegation instance
                     */
                    public static create(properties?: cosmos_sdk.x.staking.v1.IDelegation): cosmos_sdk.x.staking.v1.Delegation;

                    /**
                     * Encodes the specified Delegation message. Does not implicitly {@link cosmos_sdk.x.staking.v1.Delegation.verify|verify} messages.
                     * @param m Delegation message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.staking.v1.IDelegation, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Delegation message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns Delegation
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.staking.v1.Delegation;
                }

                /** Properties of an UnbondingDelegation. */
                interface IUnbondingDelegation {

                    /** UnbondingDelegation delegatorAddress */
                    delegatorAddress?: (Uint8Array|null);

                    /** UnbondingDelegation validatorAddress */
                    validatorAddress?: (Uint8Array|null);

                    /** UnbondingDelegation entries */
                    entries?: (cosmos_sdk.x.staking.v1.IUnbondingDelegationEntry[]|null);
                }

                /** Represents an UnbondingDelegation. */
                class UnbondingDelegation implements IUnbondingDelegation {

                    /**
                     * Constructs a new UnbondingDelegation.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.staking.v1.IUnbondingDelegation);

                    /** UnbondingDelegation delegatorAddress. */
                    public delegatorAddress: Uint8Array;

                    /** UnbondingDelegation validatorAddress. */
                    public validatorAddress: Uint8Array;

                    /** UnbondingDelegation entries. */
                    public entries: cosmos_sdk.x.staking.v1.IUnbondingDelegationEntry[];

                    /**
                     * Creates a new UnbondingDelegation instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns UnbondingDelegation instance
                     */
                    public static create(properties?: cosmos_sdk.x.staking.v1.IUnbondingDelegation): cosmos_sdk.x.staking.v1.UnbondingDelegation;

                    /**
                     * Encodes the specified UnbondingDelegation message. Does not implicitly {@link cosmos_sdk.x.staking.v1.UnbondingDelegation.verify|verify} messages.
                     * @param m UnbondingDelegation message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.staking.v1.IUnbondingDelegation, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an UnbondingDelegation message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns UnbondingDelegation
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.staking.v1.UnbondingDelegation;
                }

                /** Properties of an UnbondingDelegationEntry. */
                interface IUnbondingDelegationEntry {

                    /** UnbondingDelegationEntry creationHeight */
                    creationHeight?: (number|Long|null);

                    /** UnbondingDelegationEntry completionTime */
                    completionTime?: (google.protobuf.ITimestamp|null);

                    /** UnbondingDelegationEntry initialBalance */
                    initialBalance?: (string|null);

                    /** UnbondingDelegationEntry balance */
                    balance?: (string|null);
                }

                /** Represents an UnbondingDelegationEntry. */
                class UnbondingDelegationEntry implements IUnbondingDelegationEntry {

                    /**
                     * Constructs a new UnbondingDelegationEntry.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.staking.v1.IUnbondingDelegationEntry);

                    /** UnbondingDelegationEntry creationHeight. */
                    public creationHeight: (number|Long);

                    /** UnbondingDelegationEntry completionTime. */
                    public completionTime?: (google.protobuf.ITimestamp|null);

                    /** UnbondingDelegationEntry initialBalance. */
                    public initialBalance: string;

                    /** UnbondingDelegationEntry balance. */
                    public balance: string;

                    /**
                     * Creates a new UnbondingDelegationEntry instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns UnbondingDelegationEntry instance
                     */
                    public static create(properties?: cosmos_sdk.x.staking.v1.IUnbondingDelegationEntry): cosmos_sdk.x.staking.v1.UnbondingDelegationEntry;

                    /**
                     * Encodes the specified UnbondingDelegationEntry message. Does not implicitly {@link cosmos_sdk.x.staking.v1.UnbondingDelegationEntry.verify|verify} messages.
                     * @param m UnbondingDelegationEntry message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.staking.v1.IUnbondingDelegationEntry, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes an UnbondingDelegationEntry message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns UnbondingDelegationEntry
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.staking.v1.UnbondingDelegationEntry;
                }

                /** Properties of a RedelegationEntry. */
                interface IRedelegationEntry {

                    /** RedelegationEntry creationHeight */
                    creationHeight?: (number|Long|null);

                    /** RedelegationEntry completionTime */
                    completionTime?: (google.protobuf.ITimestamp|null);

                    /** RedelegationEntry initialBalance */
                    initialBalance?: (string|null);

                    /** RedelegationEntry sharesDst */
                    sharesDst?: (string|null);
                }

                /** Represents a RedelegationEntry. */
                class RedelegationEntry implements IRedelegationEntry {

                    /**
                     * Constructs a new RedelegationEntry.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.staking.v1.IRedelegationEntry);

                    /** RedelegationEntry creationHeight. */
                    public creationHeight: (number|Long);

                    /** RedelegationEntry completionTime. */
                    public completionTime?: (google.protobuf.ITimestamp|null);

                    /** RedelegationEntry initialBalance. */
                    public initialBalance: string;

                    /** RedelegationEntry sharesDst. */
                    public sharesDst: string;

                    /**
                     * Creates a new RedelegationEntry instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns RedelegationEntry instance
                     */
                    public static create(properties?: cosmos_sdk.x.staking.v1.IRedelegationEntry): cosmos_sdk.x.staking.v1.RedelegationEntry;

                    /**
                     * Encodes the specified RedelegationEntry message. Does not implicitly {@link cosmos_sdk.x.staking.v1.RedelegationEntry.verify|verify} messages.
                     * @param m RedelegationEntry message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.staking.v1.IRedelegationEntry, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a RedelegationEntry message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns RedelegationEntry
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.staking.v1.RedelegationEntry;
                }

                /** Properties of a Redelegation. */
                interface IRedelegation {

                    /** Redelegation delegatorAddress */
                    delegatorAddress?: (Uint8Array|null);

                    /** Redelegation validatorSrcAddress */
                    validatorSrcAddress?: (Uint8Array|null);

                    /** Redelegation validatorDstAddress */
                    validatorDstAddress?: (Uint8Array|null);

                    /** Redelegation entries */
                    entries?: (cosmos_sdk.x.staking.v1.IRedelegationEntry[]|null);
                }

                /** Represents a Redelegation. */
                class Redelegation implements IRedelegation {

                    /**
                     * Constructs a new Redelegation.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.staking.v1.IRedelegation);

                    /** Redelegation delegatorAddress. */
                    public delegatorAddress: Uint8Array;

                    /** Redelegation validatorSrcAddress. */
                    public validatorSrcAddress: Uint8Array;

                    /** Redelegation validatorDstAddress. */
                    public validatorDstAddress: Uint8Array;

                    /** Redelegation entries. */
                    public entries: cosmos_sdk.x.staking.v1.IRedelegationEntry[];

                    /**
                     * Creates a new Redelegation instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Redelegation instance
                     */
                    public static create(properties?: cosmos_sdk.x.staking.v1.IRedelegation): cosmos_sdk.x.staking.v1.Redelegation;

                    /**
                     * Encodes the specified Redelegation message. Does not implicitly {@link cosmos_sdk.x.staking.v1.Redelegation.verify|verify} messages.
                     * @param m Redelegation message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.staking.v1.IRedelegation, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Redelegation message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns Redelegation
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.staking.v1.Redelegation;
                }

                /** Properties of a Params. */
                interface IParams {

                    /** Params unbondingTime */
                    unbondingTime?: (google.protobuf.IDuration|null);

                    /** Params maxValidators */
                    maxValidators?: (number|null);

                    /** Params maxEntries */
                    maxEntries?: (number|null);

                    /** Params historicalEntries */
                    historicalEntries?: (number|null);

                    /** Params bondDenom */
                    bondDenom?: (string|null);
                }

                /** Represents a Params. */
                class Params implements IParams {

                    /**
                     * Constructs a new Params.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.staking.v1.IParams);

                    /** Params unbondingTime. */
                    public unbondingTime?: (google.protobuf.IDuration|null);

                    /** Params maxValidators. */
                    public maxValidators: number;

                    /** Params maxEntries. */
                    public maxEntries: number;

                    /** Params historicalEntries. */
                    public historicalEntries: number;

                    /** Params bondDenom. */
                    public bondDenom: string;

                    /**
                     * Creates a new Params instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Params instance
                     */
                    public static create(properties?: cosmos_sdk.x.staking.v1.IParams): cosmos_sdk.x.staking.v1.Params;

                    /**
                     * Encodes the specified Params message. Does not implicitly {@link cosmos_sdk.x.staking.v1.Params.verify|verify} messages.
                     * @param m Params message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.staking.v1.IParams, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Params message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns Params
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.staking.v1.Params;
                }
            }
        }

        /** Namespace upgrade. */
        namespace upgrade {

            /** Namespace v1. */
            namespace v1 {

                /** Properties of a Plan. */
                interface IPlan {

                    /** Plan name */
                    name?: (string|null);

                    /** Plan time */
                    time?: (google.protobuf.ITimestamp|null);

                    /** Plan height */
                    height?: (number|Long|null);

                    /** Plan info */
                    info?: (string|null);
                }

                /** Represents a Plan. */
                class Plan implements IPlan {

                    /**
                     * Constructs a new Plan.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.upgrade.v1.IPlan);

                    /** Plan name. */
                    public name: string;

                    /** Plan time. */
                    public time?: (google.protobuf.ITimestamp|null);

                    /** Plan height. */
                    public height: (number|Long);

                    /** Plan info. */
                    public info: string;

                    /**
                     * Creates a new Plan instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns Plan instance
                     */
                    public static create(properties?: cosmos_sdk.x.upgrade.v1.IPlan): cosmos_sdk.x.upgrade.v1.Plan;

                    /**
                     * Encodes the specified Plan message. Does not implicitly {@link cosmos_sdk.x.upgrade.v1.Plan.verify|verify} messages.
                     * @param m Plan message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.upgrade.v1.IPlan, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a Plan message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns Plan
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.upgrade.v1.Plan;
                }

                /** Properties of a SoftwareUpgradeProposal. */
                interface ISoftwareUpgradeProposal {

                    /** SoftwareUpgradeProposal title */
                    title?: (string|null);

                    /** SoftwareUpgradeProposal description */
                    description?: (string|null);

                    /** SoftwareUpgradeProposal plan */
                    plan?: (cosmos_sdk.x.upgrade.v1.IPlan|null);
                }

                /** Represents a SoftwareUpgradeProposal. */
                class SoftwareUpgradeProposal implements ISoftwareUpgradeProposal {

                    /**
                     * Constructs a new SoftwareUpgradeProposal.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.upgrade.v1.ISoftwareUpgradeProposal);

                    /** SoftwareUpgradeProposal title. */
                    public title: string;

                    /** SoftwareUpgradeProposal description. */
                    public description: string;

                    /** SoftwareUpgradeProposal plan. */
                    public plan?: (cosmos_sdk.x.upgrade.v1.IPlan|null);

                    /**
                     * Creates a new SoftwareUpgradeProposal instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns SoftwareUpgradeProposal instance
                     */
                    public static create(properties?: cosmos_sdk.x.upgrade.v1.ISoftwareUpgradeProposal): cosmos_sdk.x.upgrade.v1.SoftwareUpgradeProposal;

                    /**
                     * Encodes the specified SoftwareUpgradeProposal message. Does not implicitly {@link cosmos_sdk.x.upgrade.v1.SoftwareUpgradeProposal.verify|verify} messages.
                     * @param m SoftwareUpgradeProposal message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.upgrade.v1.ISoftwareUpgradeProposal, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a SoftwareUpgradeProposal message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns SoftwareUpgradeProposal
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.upgrade.v1.SoftwareUpgradeProposal;
                }

                /** Properties of a CancelSoftwareUpgradeProposal. */
                interface ICancelSoftwareUpgradeProposal {

                    /** CancelSoftwareUpgradeProposal title */
                    title?: (string|null);

                    /** CancelSoftwareUpgradeProposal description */
                    description?: (string|null);
                }

                /** Represents a CancelSoftwareUpgradeProposal. */
                class CancelSoftwareUpgradeProposal implements ICancelSoftwareUpgradeProposal {

                    /**
                     * Constructs a new CancelSoftwareUpgradeProposal.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.x.upgrade.v1.ICancelSoftwareUpgradeProposal);

                    /** CancelSoftwareUpgradeProposal title. */
                    public title: string;

                    /** CancelSoftwareUpgradeProposal description. */
                    public description: string;

                    /**
                     * Creates a new CancelSoftwareUpgradeProposal instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns CancelSoftwareUpgradeProposal instance
                     */
                    public static create(properties?: cosmos_sdk.x.upgrade.v1.ICancelSoftwareUpgradeProposal): cosmos_sdk.x.upgrade.v1.CancelSoftwareUpgradeProposal;

                    /**
                     * Encodes the specified CancelSoftwareUpgradeProposal message. Does not implicitly {@link cosmos_sdk.x.upgrade.v1.CancelSoftwareUpgradeProposal.verify|verify} messages.
                     * @param m CancelSoftwareUpgradeProposal message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.x.upgrade.v1.ICancelSoftwareUpgradeProposal, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a CancelSoftwareUpgradeProposal message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns CancelSoftwareUpgradeProposal
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.x.upgrade.v1.CancelSoftwareUpgradeProposal;
                }
            }
        }
    }

    /** Namespace ibc. */
    namespace ibc {

        /** Namespace localhost. */
        namespace localhost {

            /** Namespace v1. */
            namespace v1 {

                /** Properties of a MsgCreateClient. */
                interface IMsgCreateClient {

                    /** MsgCreateClient signer */
                    signer?: (Uint8Array|null);
                }

                /** Represents a MsgCreateClient. */
                class MsgCreateClient implements IMsgCreateClient {

                    /**
                     * Constructs a new MsgCreateClient.
                     * @param [p] Properties to set
                     */
                    constructor(p?: cosmos_sdk.ibc.localhost.v1.IMsgCreateClient);

                    /** MsgCreateClient signer. */
                    public signer: Uint8Array;

                    /**
                     * Creates a new MsgCreateClient instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns MsgCreateClient instance
                     */
                    public static create(properties?: cosmos_sdk.ibc.localhost.v1.IMsgCreateClient): cosmos_sdk.ibc.localhost.v1.MsgCreateClient;

                    /**
                     * Encodes the specified MsgCreateClient message. Does not implicitly {@link cosmos_sdk.ibc.localhost.v1.MsgCreateClient.verify|verify} messages.
                     * @param m MsgCreateClient message or plain object to encode
                     * @param [w] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(m: cosmos_sdk.ibc.localhost.v1.IMsgCreateClient, w?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a MsgCreateClient message from the specified reader or buffer.
                     * @param r Reader or buffer to decode from
                     * @param [l] Message length if known beforehand
                     * @returns MsgCreateClient
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): cosmos_sdk.ibc.localhost.v1.MsgCreateClient;
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
                echo?: (tendermint.abci.types.IRequestEcho|null);

                /** Request flush */
                flush?: (tendermint.abci.types.IRequestFlush|null);

                /** Request info */
                info?: (tendermint.abci.types.IRequestInfo|null);

                /** Request setOption */
                setOption?: (tendermint.abci.types.IRequestSetOption|null);

                /** Request initChain */
                initChain?: (tendermint.abci.types.IRequestInitChain|null);

                /** Request query */
                query?: (tendermint.abci.types.IRequestQuery|null);

                /** Request beginBlock */
                beginBlock?: (tendermint.abci.types.IRequestBeginBlock|null);

                /** Request checkTx */
                checkTx?: (tendermint.abci.types.IRequestCheckTx|null);

                /** Request deliverTx */
                deliverTx?: (tendermint.abci.types.IRequestDeliverTx|null);

                /** Request endBlock */
                endBlock?: (tendermint.abci.types.IRequestEndBlock|null);

                /** Request commit */
                commit?: (tendermint.abci.types.IRequestCommit|null);
            }

            /** Represents a Request. */
            class Request implements IRequest {

                /**
                 * Constructs a new Request.
                 * @param [p] Properties to set
                 */
                constructor(p?: tendermint.abci.types.IRequest);

                /** Request echo. */
                public echo?: (tendermint.abci.types.IRequestEcho|null);

                /** Request flush. */
                public flush?: (tendermint.abci.types.IRequestFlush|null);

                /** Request info. */
                public info?: (tendermint.abci.types.IRequestInfo|null);

                /** Request setOption. */
                public setOption?: (tendermint.abci.types.IRequestSetOption|null);

                /** Request initChain. */
                public initChain?: (tendermint.abci.types.IRequestInitChain|null);

                /** Request query. */
                public query?: (tendermint.abci.types.IRequestQuery|null);

                /** Request beginBlock. */
                public beginBlock?: (tendermint.abci.types.IRequestBeginBlock|null);

                /** Request checkTx. */
                public checkTx?: (tendermint.abci.types.IRequestCheckTx|null);

                /** Request deliverTx. */
                public deliverTx?: (tendermint.abci.types.IRequestDeliverTx|null);

                /** Request endBlock. */
                public endBlock?: (tendermint.abci.types.IRequestEndBlock|null);

                /** Request commit. */
                public commit?: (tendermint.abci.types.IRequestCommit|null);

                /** Request value. */
                public value?: ("echo"|"flush"|"info"|"setOption"|"initChain"|"query"|"beginBlock"|"checkTx"|"deliverTx"|"endBlock"|"commit");

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
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.Request;
            }

            /** Properties of a RequestEcho. */
            interface IRequestEcho {

                /** RequestEcho message */
                message?: (string|null);
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
                public static create(properties?: tendermint.abci.types.IRequestEcho): tendermint.abci.types.RequestEcho;

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
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.RequestEcho;
            }

            /** Properties of a RequestFlush. */
            interface IRequestFlush {
            }

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
                public static create(properties?: tendermint.abci.types.IRequestFlush): tendermint.abci.types.RequestFlush;

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
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.RequestFlush;
            }

            /** Properties of a RequestInfo. */
            interface IRequestInfo {

                /** RequestInfo version */
                version?: (string|null);

                /** RequestInfo blockVersion */
                blockVersion?: (number|Long|null);

                /** RequestInfo p2pVersion */
                p2pVersion?: (number|Long|null);
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
                public blockVersion: (number|Long);

                /** RequestInfo p2pVersion. */
                public p2pVersion: (number|Long);

                /**
                 * Creates a new RequestInfo instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RequestInfo instance
                 */
                public static create(properties?: tendermint.abci.types.IRequestInfo): tendermint.abci.types.RequestInfo;

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
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.RequestInfo;
            }

            /** Properties of a RequestSetOption. */
            interface IRequestSetOption {

                /** RequestSetOption key */
                key?: (string|null);

                /** RequestSetOption value */
                value?: (string|null);
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
                public static create(properties?: tendermint.abci.types.IRequestSetOption): tendermint.abci.types.RequestSetOption;

                /**
                 * Encodes the specified RequestSetOption message. Does not implicitly {@link tendermint.abci.types.RequestSetOption.verify|verify} messages.
                 * @param m RequestSetOption message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: tendermint.abci.types.IRequestSetOption, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RequestSetOption message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns RequestSetOption
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.RequestSetOption;
            }

            /** Properties of a RequestInitChain. */
            interface IRequestInitChain {

                /** RequestInitChain time */
                time?: (google.protobuf.ITimestamp|null);

                /** RequestInitChain chainId */
                chainId?: (string|null);

                /** RequestInitChain consensusParams */
                consensusParams?: (tendermint.abci.types.IConsensusParams|null);

                /** RequestInitChain validators */
                validators?: (tendermint.abci.types.IValidatorUpdate[]|null);

                /** RequestInitChain appStateBytes */
                appStateBytes?: (Uint8Array|null);
            }

            /** Represents a RequestInitChain. */
            class RequestInitChain implements IRequestInitChain {

                /**
                 * Constructs a new RequestInitChain.
                 * @param [p] Properties to set
                 */
                constructor(p?: tendermint.abci.types.IRequestInitChain);

                /** RequestInitChain time. */
                public time?: (google.protobuf.ITimestamp|null);

                /** RequestInitChain chainId. */
                public chainId: string;

                /** RequestInitChain consensusParams. */
                public consensusParams?: (tendermint.abci.types.IConsensusParams|null);

                /** RequestInitChain validators. */
                public validators: tendermint.abci.types.IValidatorUpdate[];

                /** RequestInitChain appStateBytes. */
                public appStateBytes: Uint8Array;

                /**
                 * Creates a new RequestInitChain instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RequestInitChain instance
                 */
                public static create(properties?: tendermint.abci.types.IRequestInitChain): tendermint.abci.types.RequestInitChain;

                /**
                 * Encodes the specified RequestInitChain message. Does not implicitly {@link tendermint.abci.types.RequestInitChain.verify|verify} messages.
                 * @param m RequestInitChain message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: tendermint.abci.types.IRequestInitChain, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RequestInitChain message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns RequestInitChain
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.RequestInitChain;
            }

            /** Properties of a RequestQuery. */
            interface IRequestQuery {

                /** RequestQuery data */
                data?: (Uint8Array|null);

                /** RequestQuery path */
                path?: (string|null);

                /** RequestQuery height */
                height?: (number|Long|null);

                /** RequestQuery prove */
                prove?: (boolean|null);
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
                public height: (number|Long);

                /** RequestQuery prove. */
                public prove: boolean;

                /**
                 * Creates a new RequestQuery instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RequestQuery instance
                 */
                public static create(properties?: tendermint.abci.types.IRequestQuery): tendermint.abci.types.RequestQuery;

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
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.RequestQuery;
            }

            /** Properties of a RequestBeginBlock. */
            interface IRequestBeginBlock {

                /** RequestBeginBlock hash */
                hash?: (Uint8Array|null);

                /** RequestBeginBlock header */
                header?: (tendermint.abci.types.IHeader|null);

                /** RequestBeginBlock lastCommitInfo */
                lastCommitInfo?: (tendermint.abci.types.ILastCommitInfo|null);

                /** RequestBeginBlock byzantineValidators */
                byzantineValidators?: (tendermint.abci.types.IEvidence[]|null);
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
                public header?: (tendermint.abci.types.IHeader|null);

                /** RequestBeginBlock lastCommitInfo. */
                public lastCommitInfo?: (tendermint.abci.types.ILastCommitInfo|null);

                /** RequestBeginBlock byzantineValidators. */
                public byzantineValidators: tendermint.abci.types.IEvidence[];

                /**
                 * Creates a new RequestBeginBlock instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RequestBeginBlock instance
                 */
                public static create(properties?: tendermint.abci.types.IRequestBeginBlock): tendermint.abci.types.RequestBeginBlock;

                /**
                 * Encodes the specified RequestBeginBlock message. Does not implicitly {@link tendermint.abci.types.RequestBeginBlock.verify|verify} messages.
                 * @param m RequestBeginBlock message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: tendermint.abci.types.IRequestBeginBlock, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RequestBeginBlock message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns RequestBeginBlock
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.RequestBeginBlock;
            }

            /** CheckTxType enum. */
            enum CheckTxType {
                New = 0,
                Recheck = 1
            }

            /** Properties of a RequestCheckTx. */
            interface IRequestCheckTx {

                /** RequestCheckTx tx */
                tx?: (Uint8Array|null);

                /** RequestCheckTx type */
                type?: (tendermint.abci.types.CheckTxType|null);
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
                public static create(properties?: tendermint.abci.types.IRequestCheckTx): tendermint.abci.types.RequestCheckTx;

                /**
                 * Encodes the specified RequestCheckTx message. Does not implicitly {@link tendermint.abci.types.RequestCheckTx.verify|verify} messages.
                 * @param m RequestCheckTx message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: tendermint.abci.types.IRequestCheckTx, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RequestCheckTx message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns RequestCheckTx
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.RequestCheckTx;
            }

            /** Properties of a RequestDeliverTx. */
            interface IRequestDeliverTx {

                /** RequestDeliverTx tx */
                tx?: (Uint8Array|null);
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
                public static create(properties?: tendermint.abci.types.IRequestDeliverTx): tendermint.abci.types.RequestDeliverTx;

                /**
                 * Encodes the specified RequestDeliverTx message. Does not implicitly {@link tendermint.abci.types.RequestDeliverTx.verify|verify} messages.
                 * @param m RequestDeliverTx message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: tendermint.abci.types.IRequestDeliverTx, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RequestDeliverTx message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns RequestDeliverTx
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.RequestDeliverTx;
            }

            /** Properties of a RequestEndBlock. */
            interface IRequestEndBlock {

                /** RequestEndBlock height */
                height?: (number|Long|null);
            }

            /** Represents a RequestEndBlock. */
            class RequestEndBlock implements IRequestEndBlock {

                /**
                 * Constructs a new RequestEndBlock.
                 * @param [p] Properties to set
                 */
                constructor(p?: tendermint.abci.types.IRequestEndBlock);

                /** RequestEndBlock height. */
                public height: (number|Long);

                /**
                 * Creates a new RequestEndBlock instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RequestEndBlock instance
                 */
                public static create(properties?: tendermint.abci.types.IRequestEndBlock): tendermint.abci.types.RequestEndBlock;

                /**
                 * Encodes the specified RequestEndBlock message. Does not implicitly {@link tendermint.abci.types.RequestEndBlock.verify|verify} messages.
                 * @param m RequestEndBlock message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: tendermint.abci.types.IRequestEndBlock, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RequestEndBlock message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns RequestEndBlock
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.RequestEndBlock;
            }

            /** Properties of a RequestCommit. */
            interface IRequestCommit {
            }

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
                public static create(properties?: tendermint.abci.types.IRequestCommit): tendermint.abci.types.RequestCommit;

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
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.RequestCommit;
            }

            /** Properties of a Response. */
            interface IResponse {

                /** Response exception */
                exception?: (tendermint.abci.types.IResponseException|null);

                /** Response echo */
                echo?: (tendermint.abci.types.IResponseEcho|null);

                /** Response flush */
                flush?: (tendermint.abci.types.IResponseFlush|null);

                /** Response info */
                info?: (tendermint.abci.types.IResponseInfo|null);

                /** Response setOption */
                setOption?: (tendermint.abci.types.IResponseSetOption|null);

                /** Response initChain */
                initChain?: (tendermint.abci.types.IResponseInitChain|null);

                /** Response query */
                query?: (tendermint.abci.types.IResponseQuery|null);

                /** Response beginBlock */
                beginBlock?: (tendermint.abci.types.IResponseBeginBlock|null);

                /** Response checkTx */
                checkTx?: (tendermint.abci.types.IResponseCheckTx|null);

                /** Response deliverTx */
                deliverTx?: (tendermint.abci.types.IResponseDeliverTx|null);

                /** Response endBlock */
                endBlock?: (tendermint.abci.types.IResponseEndBlock|null);

                /** Response commit */
                commit?: (tendermint.abci.types.IResponseCommit|null);
            }

            /** Represents a Response. */
            class Response implements IResponse {

                /**
                 * Constructs a new Response.
                 * @param [p] Properties to set
                 */
                constructor(p?: tendermint.abci.types.IResponse);

                /** Response exception. */
                public exception?: (tendermint.abci.types.IResponseException|null);

                /** Response echo. */
                public echo?: (tendermint.abci.types.IResponseEcho|null);

                /** Response flush. */
                public flush?: (tendermint.abci.types.IResponseFlush|null);

                /** Response info. */
                public info?: (tendermint.abci.types.IResponseInfo|null);

                /** Response setOption. */
                public setOption?: (tendermint.abci.types.IResponseSetOption|null);

                /** Response initChain. */
                public initChain?: (tendermint.abci.types.IResponseInitChain|null);

                /** Response query. */
                public query?: (tendermint.abci.types.IResponseQuery|null);

                /** Response beginBlock. */
                public beginBlock?: (tendermint.abci.types.IResponseBeginBlock|null);

                /** Response checkTx. */
                public checkTx?: (tendermint.abci.types.IResponseCheckTx|null);

                /** Response deliverTx. */
                public deliverTx?: (tendermint.abci.types.IResponseDeliverTx|null);

                /** Response endBlock. */
                public endBlock?: (tendermint.abci.types.IResponseEndBlock|null);

                /** Response commit. */
                public commit?: (tendermint.abci.types.IResponseCommit|null);

                /** Response value. */
                public value?: ("exception"|"echo"|"flush"|"info"|"setOption"|"initChain"|"query"|"beginBlock"|"checkTx"|"deliverTx"|"endBlock"|"commit");

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
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.Response;
            }

            /** Properties of a ResponseException. */
            interface IResponseException {

                /** ResponseException error */
                error?: (string|null);
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
                public static create(properties?: tendermint.abci.types.IResponseException): tendermint.abci.types.ResponseException;

                /**
                 * Encodes the specified ResponseException message. Does not implicitly {@link tendermint.abci.types.ResponseException.verify|verify} messages.
                 * @param m ResponseException message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: tendermint.abci.types.IResponseException, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ResponseException message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns ResponseException
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.ResponseException;
            }

            /** Properties of a ResponseEcho. */
            interface IResponseEcho {

                /** ResponseEcho message */
                message?: (string|null);
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
                public static create(properties?: tendermint.abci.types.IResponseEcho): tendermint.abci.types.ResponseEcho;

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
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.ResponseEcho;
            }

            /** Properties of a ResponseFlush. */
            interface IResponseFlush {
            }

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
                public static create(properties?: tendermint.abci.types.IResponseFlush): tendermint.abci.types.ResponseFlush;

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
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.ResponseFlush;
            }

            /** Properties of a ResponseInfo. */
            interface IResponseInfo {

                /** ResponseInfo data */
                data?: (string|null);

                /** ResponseInfo version */
                version?: (string|null);

                /** ResponseInfo appVersion */
                appVersion?: (number|Long|null);

                /** ResponseInfo lastBlockHeight */
                lastBlockHeight?: (number|Long|null);

                /** ResponseInfo lastBlockAppHash */
                lastBlockAppHash?: (Uint8Array|null);
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
                public appVersion: (number|Long);

                /** ResponseInfo lastBlockHeight. */
                public lastBlockHeight: (number|Long);

                /** ResponseInfo lastBlockAppHash. */
                public lastBlockAppHash: Uint8Array;

                /**
                 * Creates a new ResponseInfo instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ResponseInfo instance
                 */
                public static create(properties?: tendermint.abci.types.IResponseInfo): tendermint.abci.types.ResponseInfo;

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
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.ResponseInfo;
            }

            /** Properties of a ResponseSetOption. */
            interface IResponseSetOption {

                /** ResponseSetOption code */
                code?: (number|null);

                /** ResponseSetOption log */
                log?: (string|null);

                /** ResponseSetOption info */
                info?: (string|null);
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
                public static create(properties?: tendermint.abci.types.IResponseSetOption): tendermint.abci.types.ResponseSetOption;

                /**
                 * Encodes the specified ResponseSetOption message. Does not implicitly {@link tendermint.abci.types.ResponseSetOption.verify|verify} messages.
                 * @param m ResponseSetOption message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: tendermint.abci.types.IResponseSetOption, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ResponseSetOption message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns ResponseSetOption
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.ResponseSetOption;
            }

            /** Properties of a ResponseInitChain. */
            interface IResponseInitChain {

                /** ResponseInitChain consensusParams */
                consensusParams?: (tendermint.abci.types.IConsensusParams|null);

                /** ResponseInitChain validators */
                validators?: (tendermint.abci.types.IValidatorUpdate[]|null);
            }

            /** Represents a ResponseInitChain. */
            class ResponseInitChain implements IResponseInitChain {

                /**
                 * Constructs a new ResponseInitChain.
                 * @param [p] Properties to set
                 */
                constructor(p?: tendermint.abci.types.IResponseInitChain);

                /** ResponseInitChain consensusParams. */
                public consensusParams?: (tendermint.abci.types.IConsensusParams|null);

                /** ResponseInitChain validators. */
                public validators: tendermint.abci.types.IValidatorUpdate[];

                /**
                 * Creates a new ResponseInitChain instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ResponseInitChain instance
                 */
                public static create(properties?: tendermint.abci.types.IResponseInitChain): tendermint.abci.types.ResponseInitChain;

                /**
                 * Encodes the specified ResponseInitChain message. Does not implicitly {@link tendermint.abci.types.ResponseInitChain.verify|verify} messages.
                 * @param m ResponseInitChain message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: tendermint.abci.types.IResponseInitChain, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ResponseInitChain message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns ResponseInitChain
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.ResponseInitChain;
            }

            /** Properties of a ResponseQuery. */
            interface IResponseQuery {

                /** ResponseQuery code */
                code?: (number|null);

                /** ResponseQuery log */
                log?: (string|null);

                /** ResponseQuery info */
                info?: (string|null);

                /** ResponseQuery index */
                index?: (number|Long|null);

                /** ResponseQuery key */
                key?: (Uint8Array|null);

                /** ResponseQuery value */
                value?: (Uint8Array|null);

                /** ResponseQuery proof */
                proof?: (tendermint.crypto.merkle.IProof|null);

                /** ResponseQuery height */
                height?: (number|Long|null);

                /** ResponseQuery codespace */
                codespace?: (string|null);
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
                public index: (number|Long);

                /** ResponseQuery key. */
                public key: Uint8Array;

                /** ResponseQuery value. */
                public value: Uint8Array;

                /** ResponseQuery proof. */
                public proof?: (tendermint.crypto.merkle.IProof|null);

                /** ResponseQuery height. */
                public height: (number|Long);

                /** ResponseQuery codespace. */
                public codespace: string;

                /**
                 * Creates a new ResponseQuery instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ResponseQuery instance
                 */
                public static create(properties?: tendermint.abci.types.IResponseQuery): tendermint.abci.types.ResponseQuery;

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
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.ResponseQuery;
            }

            /** Properties of a ResponseBeginBlock. */
            interface IResponseBeginBlock {

                /** ResponseBeginBlock events */
                events?: (tendermint.abci.types.IEvent[]|null);
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
                public static create(properties?: tendermint.abci.types.IResponseBeginBlock): tendermint.abci.types.ResponseBeginBlock;

                /**
                 * Encodes the specified ResponseBeginBlock message. Does not implicitly {@link tendermint.abci.types.ResponseBeginBlock.verify|verify} messages.
                 * @param m ResponseBeginBlock message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: tendermint.abci.types.IResponseBeginBlock, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ResponseBeginBlock message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns ResponseBeginBlock
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.ResponseBeginBlock;
            }

            /** Properties of a ResponseCheckTx. */
            interface IResponseCheckTx {

                /** ResponseCheckTx code */
                code?: (number|null);

                /** ResponseCheckTx data */
                data?: (Uint8Array|null);

                /** ResponseCheckTx log */
                log?: (string|null);

                /** ResponseCheckTx info */
                info?: (string|null);

                /** ResponseCheckTx gasWanted */
                gasWanted?: (number|Long|null);

                /** ResponseCheckTx gasUsed */
                gasUsed?: (number|Long|null);

                /** ResponseCheckTx events */
                events?: (tendermint.abci.types.IEvent[]|null);

                /** ResponseCheckTx codespace */
                codespace?: (string|null);
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
                public gasWanted: (number|Long);

                /** ResponseCheckTx gasUsed. */
                public gasUsed: (number|Long);

                /** ResponseCheckTx events. */
                public events: tendermint.abci.types.IEvent[];

                /** ResponseCheckTx codespace. */
                public codespace: string;

                /**
                 * Creates a new ResponseCheckTx instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ResponseCheckTx instance
                 */
                public static create(properties?: tendermint.abci.types.IResponseCheckTx): tendermint.abci.types.ResponseCheckTx;

                /**
                 * Encodes the specified ResponseCheckTx message. Does not implicitly {@link tendermint.abci.types.ResponseCheckTx.verify|verify} messages.
                 * @param m ResponseCheckTx message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: tendermint.abci.types.IResponseCheckTx, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ResponseCheckTx message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns ResponseCheckTx
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.ResponseCheckTx;
            }

            /** Properties of a ResponseDeliverTx. */
            interface IResponseDeliverTx {

                /** ResponseDeliverTx code */
                code?: (number|null);

                /** ResponseDeliverTx data */
                data?: (Uint8Array|null);

                /** ResponseDeliverTx log */
                log?: (string|null);

                /** ResponseDeliverTx info */
                info?: (string|null);

                /** ResponseDeliverTx gasWanted */
                gasWanted?: (number|Long|null);

                /** ResponseDeliverTx gasUsed */
                gasUsed?: (number|Long|null);

                /** ResponseDeliverTx events */
                events?: (tendermint.abci.types.IEvent[]|null);

                /** ResponseDeliverTx codespace */
                codespace?: (string|null);
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
                public gasWanted: (number|Long);

                /** ResponseDeliverTx gasUsed. */
                public gasUsed: (number|Long);

                /** ResponseDeliverTx events. */
                public events: tendermint.abci.types.IEvent[];

                /** ResponseDeliverTx codespace. */
                public codespace: string;

                /**
                 * Creates a new ResponseDeliverTx instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ResponseDeliverTx instance
                 */
                public static create(properties?: tendermint.abci.types.IResponseDeliverTx): tendermint.abci.types.ResponseDeliverTx;

                /**
                 * Encodes the specified ResponseDeliverTx message. Does not implicitly {@link tendermint.abci.types.ResponseDeliverTx.verify|verify} messages.
                 * @param m ResponseDeliverTx message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: tendermint.abci.types.IResponseDeliverTx, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ResponseDeliverTx message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns ResponseDeliverTx
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.ResponseDeliverTx;
            }

            /** Properties of a ResponseEndBlock. */
            interface IResponseEndBlock {

                /** ResponseEndBlock validatorUpdates */
                validatorUpdates?: (tendermint.abci.types.IValidatorUpdate[]|null);

                /** ResponseEndBlock consensusParamUpdates */
                consensusParamUpdates?: (tendermint.abci.types.IConsensusParams|null);

                /** ResponseEndBlock events */
                events?: (tendermint.abci.types.IEvent[]|null);
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
                public consensusParamUpdates?: (tendermint.abci.types.IConsensusParams|null);

                /** ResponseEndBlock events. */
                public events: tendermint.abci.types.IEvent[];

                /**
                 * Creates a new ResponseEndBlock instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ResponseEndBlock instance
                 */
                public static create(properties?: tendermint.abci.types.IResponseEndBlock): tendermint.abci.types.ResponseEndBlock;

                /**
                 * Encodes the specified ResponseEndBlock message. Does not implicitly {@link tendermint.abci.types.ResponseEndBlock.verify|verify} messages.
                 * @param m ResponseEndBlock message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: tendermint.abci.types.IResponseEndBlock, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ResponseEndBlock message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns ResponseEndBlock
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.ResponseEndBlock;
            }

            /** Properties of a ResponseCommit. */
            interface IResponseCommit {

                /** ResponseCommit data */
                data?: (Uint8Array|null);
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
                public static create(properties?: tendermint.abci.types.IResponseCommit): tendermint.abci.types.ResponseCommit;

                /**
                 * Encodes the specified ResponseCommit message. Does not implicitly {@link tendermint.abci.types.ResponseCommit.verify|verify} messages.
                 * @param m ResponseCommit message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: tendermint.abci.types.IResponseCommit, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ResponseCommit message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns ResponseCommit
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.ResponseCommit;
            }

            /** Properties of a ConsensusParams. */
            interface IConsensusParams {

                /** ConsensusParams block */
                block?: (tendermint.abci.types.IBlockParams|null);

                /** ConsensusParams evidence */
                evidence?: (tendermint.abci.types.IEvidenceParams|null);

                /** ConsensusParams validator */
                validator?: (tendermint.abci.types.IValidatorParams|null);
            }

            /** Represents a ConsensusParams. */
            class ConsensusParams implements IConsensusParams {

                /**
                 * Constructs a new ConsensusParams.
                 * @param [p] Properties to set
                 */
                constructor(p?: tendermint.abci.types.IConsensusParams);

                /** ConsensusParams block. */
                public block?: (tendermint.abci.types.IBlockParams|null);

                /** ConsensusParams evidence. */
                public evidence?: (tendermint.abci.types.IEvidenceParams|null);

                /** ConsensusParams validator. */
                public validator?: (tendermint.abci.types.IValidatorParams|null);

                /**
                 * Creates a new ConsensusParams instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ConsensusParams instance
                 */
                public static create(properties?: tendermint.abci.types.IConsensusParams): tendermint.abci.types.ConsensusParams;

                /**
                 * Encodes the specified ConsensusParams message. Does not implicitly {@link tendermint.abci.types.ConsensusParams.verify|verify} messages.
                 * @param m ConsensusParams message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: tendermint.abci.types.IConsensusParams, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ConsensusParams message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns ConsensusParams
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.ConsensusParams;
            }

            /** Properties of a BlockParams. */
            interface IBlockParams {

                /** BlockParams maxBytes */
                maxBytes?: (number|Long|null);

                /** BlockParams maxGas */
                maxGas?: (number|Long|null);
            }

            /** Represents a BlockParams. */
            class BlockParams implements IBlockParams {

                /**
                 * Constructs a new BlockParams.
                 * @param [p] Properties to set
                 */
                constructor(p?: tendermint.abci.types.IBlockParams);

                /** BlockParams maxBytes. */
                public maxBytes: (number|Long);

                /** BlockParams maxGas. */
                public maxGas: (number|Long);

                /**
                 * Creates a new BlockParams instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns BlockParams instance
                 */
                public static create(properties?: tendermint.abci.types.IBlockParams): tendermint.abci.types.BlockParams;

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
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.BlockParams;
            }

            /** Properties of an EvidenceParams. */
            interface IEvidenceParams {

                /** EvidenceParams maxAgeNumBlocks */
                maxAgeNumBlocks?: (number|Long|null);

                /** EvidenceParams maxAgeDuration */
                maxAgeDuration?: (google.protobuf.IDuration|null);
            }

            /** Represents an EvidenceParams. */
            class EvidenceParams implements IEvidenceParams {

                /**
                 * Constructs a new EvidenceParams.
                 * @param [p] Properties to set
                 */
                constructor(p?: tendermint.abci.types.IEvidenceParams);

                /** EvidenceParams maxAgeNumBlocks. */
                public maxAgeNumBlocks: (number|Long);

                /** EvidenceParams maxAgeDuration. */
                public maxAgeDuration?: (google.protobuf.IDuration|null);

                /**
                 * Creates a new EvidenceParams instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns EvidenceParams instance
                 */
                public static create(properties?: tendermint.abci.types.IEvidenceParams): tendermint.abci.types.EvidenceParams;

                /**
                 * Encodes the specified EvidenceParams message. Does not implicitly {@link tendermint.abci.types.EvidenceParams.verify|verify} messages.
                 * @param m EvidenceParams message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: tendermint.abci.types.IEvidenceParams, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an EvidenceParams message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns EvidenceParams
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.EvidenceParams;
            }

            /** Properties of a ValidatorParams. */
            interface IValidatorParams {

                /** ValidatorParams pubKeyTypes */
                pubKeyTypes?: (string[]|null);
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
                public static create(properties?: tendermint.abci.types.IValidatorParams): tendermint.abci.types.ValidatorParams;

                /**
                 * Encodes the specified ValidatorParams message. Does not implicitly {@link tendermint.abci.types.ValidatorParams.verify|verify} messages.
                 * @param m ValidatorParams message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: tendermint.abci.types.IValidatorParams, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ValidatorParams message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns ValidatorParams
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.ValidatorParams;
            }

            /** Properties of a LastCommitInfo. */
            interface ILastCommitInfo {

                /** LastCommitInfo round */
                round?: (number|null);

                /** LastCommitInfo votes */
                votes?: (tendermint.abci.types.IVoteInfo[]|null);
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
                public static create(properties?: tendermint.abci.types.ILastCommitInfo): tendermint.abci.types.LastCommitInfo;

                /**
                 * Encodes the specified LastCommitInfo message. Does not implicitly {@link tendermint.abci.types.LastCommitInfo.verify|verify} messages.
                 * @param m LastCommitInfo message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: tendermint.abci.types.ILastCommitInfo, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a LastCommitInfo message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns LastCommitInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.LastCommitInfo;
            }

            /** Properties of an Event. */
            interface IEvent {

                /** Event type */
                type?: (string|null);

                /** Event attributes */
                attributes?: (tendermint.libs.kv.IPair[]|null);
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
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.Event;
            }

            /** Properties of a Header. */
            interface IHeader {

                /** Header version */
                version?: (tendermint.abci.types.IVersion|null);

                /** Header chainId */
                chainId?: (string|null);

                /** Header height */
                height?: (number|Long|null);

                /** Header time */
                time?: (google.protobuf.ITimestamp|null);

                /** Header lastBlockId */
                lastBlockId?: (tendermint.abci.types.IBlockID|null);

                /** Header lastCommitHash */
                lastCommitHash?: (Uint8Array|null);

                /** Header dataHash */
                dataHash?: (Uint8Array|null);

                /** Header validatorsHash */
                validatorsHash?: (Uint8Array|null);

                /** Header nextValidatorsHash */
                nextValidatorsHash?: (Uint8Array|null);

                /** Header consensusHash */
                consensusHash?: (Uint8Array|null);

                /** Header appHash */
                appHash?: (Uint8Array|null);

                /** Header lastResultsHash */
                lastResultsHash?: (Uint8Array|null);

                /** Header evidenceHash */
                evidenceHash?: (Uint8Array|null);

                /** Header proposerAddress */
                proposerAddress?: (Uint8Array|null);
            }

            /** Represents a Header. */
            class Header implements IHeader {

                /**
                 * Constructs a new Header.
                 * @param [p] Properties to set
                 */
                constructor(p?: tendermint.abci.types.IHeader);

                /** Header version. */
                public version?: (tendermint.abci.types.IVersion|null);

                /** Header chainId. */
                public chainId: string;

                /** Header height. */
                public height: (number|Long);

                /** Header time. */
                public time?: (google.protobuf.ITimestamp|null);

                /** Header lastBlockId. */
                public lastBlockId?: (tendermint.abci.types.IBlockID|null);

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
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.Header;
            }

            /** Properties of a Version. */
            interface IVersion {

                /** Version Block */
                Block?: (number|Long|null);

                /** Version App */
                App?: (number|Long|null);
            }

            /** Represents a Version. */
            class Version implements IVersion {

                /**
                 * Constructs a new Version.
                 * @param [p] Properties to set
                 */
                constructor(p?: tendermint.abci.types.IVersion);

                /** Version Block. */
                public Block: (number|Long);

                /** Version App. */
                public App: (number|Long);

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
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.Version;
            }

            /** Properties of a BlockID. */
            interface IBlockID {

                /** BlockID hash */
                hash?: (Uint8Array|null);

                /** BlockID partsHeader */
                partsHeader?: (tendermint.abci.types.IPartSetHeader|null);
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
                public partsHeader?: (tendermint.abci.types.IPartSetHeader|null);

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
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.BlockID;
            }

            /** Properties of a PartSetHeader. */
            interface IPartSetHeader {

                /** PartSetHeader total */
                total?: (number|null);

                /** PartSetHeader hash */
                hash?: (Uint8Array|null);
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
                public static create(properties?: tendermint.abci.types.IPartSetHeader): tendermint.abci.types.PartSetHeader;

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
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.PartSetHeader;
            }

            /** Properties of a Validator. */
            interface IValidator {

                /** Validator address */
                address?: (Uint8Array|null);

                /** Validator power */
                power?: (number|Long|null);
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
                public power: (number|Long);

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
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.Validator;
            }

            /** Properties of a ValidatorUpdate. */
            interface IValidatorUpdate {

                /** ValidatorUpdate pubKey */
                pubKey?: (tendermint.abci.types.IPubKey|null);

                /** ValidatorUpdate power */
                power?: (number|Long|null);
            }

            /** Represents a ValidatorUpdate. */
            class ValidatorUpdate implements IValidatorUpdate {

                /**
                 * Constructs a new ValidatorUpdate.
                 * @param [p] Properties to set
                 */
                constructor(p?: tendermint.abci.types.IValidatorUpdate);

                /** ValidatorUpdate pubKey. */
                public pubKey?: (tendermint.abci.types.IPubKey|null);

                /** ValidatorUpdate power. */
                public power: (number|Long);

                /**
                 * Creates a new ValidatorUpdate instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ValidatorUpdate instance
                 */
                public static create(properties?: tendermint.abci.types.IValidatorUpdate): tendermint.abci.types.ValidatorUpdate;

                /**
                 * Encodes the specified ValidatorUpdate message. Does not implicitly {@link tendermint.abci.types.ValidatorUpdate.verify|verify} messages.
                 * @param m ValidatorUpdate message or plain object to encode
                 * @param [w] Writer to encode to
                 * @returns Writer
                 */
                public static encode(m: tendermint.abci.types.IValidatorUpdate, w?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ValidatorUpdate message from the specified reader or buffer.
                 * @param r Reader or buffer to decode from
                 * @param [l] Message length if known beforehand
                 * @returns ValidatorUpdate
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.ValidatorUpdate;
            }

            /** Properties of a VoteInfo. */
            interface IVoteInfo {

                /** VoteInfo validator */
                validator?: (tendermint.abci.types.IValidator|null);

                /** VoteInfo signedLastBlock */
                signedLastBlock?: (boolean|null);
            }

            /** Represents a VoteInfo. */
            class VoteInfo implements IVoteInfo {

                /**
                 * Constructs a new VoteInfo.
                 * @param [p] Properties to set
                 */
                constructor(p?: tendermint.abci.types.IVoteInfo);

                /** VoteInfo validator. */
                public validator?: (tendermint.abci.types.IValidator|null);

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
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.VoteInfo;
            }

            /** Properties of a PubKey. */
            interface IPubKey {

                /** PubKey type */
                type?: (string|null);

                /** PubKey data */
                data?: (Uint8Array|null);
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
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.PubKey;
            }

            /** Properties of an Evidence. */
            interface IEvidence {

                /** Evidence type */
                type?: (string|null);

                /** Evidence validator */
                validator?: (tendermint.abci.types.IValidator|null);

                /** Evidence height */
                height?: (number|Long|null);

                /** Evidence time */
                time?: (google.protobuf.ITimestamp|null);

                /** Evidence totalVotingPower */
                totalVotingPower?: (number|Long|null);
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
                public validator?: (tendermint.abci.types.IValidator|null);

                /** Evidence height. */
                public height: (number|Long);

                /** Evidence time. */
                public time?: (google.protobuf.ITimestamp|null);

                /** Evidence totalVotingPower. */
                public totalVotingPower: (number|Long);

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
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.abci.types.Evidence;
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
                public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): ABCIApplication;

                /**
                 * Calls Echo.
                 * @param request RequestEcho message or plain object
                 * @param callback Node-style callback called with the error, if any, and ResponseEcho
                 */
                public echo(request: tendermint.abci.types.IRequestEcho, callback: tendermint.abci.types.ABCIApplication.EchoCallback): void;

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
                public flush(request: tendermint.abci.types.IRequestFlush, callback: tendermint.abci.types.ABCIApplication.FlushCallback): void;

                /**
                 * Calls Flush.
                 * @param request RequestFlush message or plain object
                 * @returns Promise
                 */
                public flush(request: tendermint.abci.types.IRequestFlush): Promise<tendermint.abci.types.ResponseFlush>;

                /**
                 * Calls Info.
                 * @param request RequestInfo message or plain object
                 * @param callback Node-style callback called with the error, if any, and ResponseInfo
                 */
                public info(request: tendermint.abci.types.IRequestInfo, callback: tendermint.abci.types.ABCIApplication.InfoCallback): void;

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
                public setOption(request: tendermint.abci.types.IRequestSetOption, callback: tendermint.abci.types.ABCIApplication.SetOptionCallback): void;

                /**
                 * Calls SetOption.
                 * @param request RequestSetOption message or plain object
                 * @returns Promise
                 */
                public setOption(request: tendermint.abci.types.IRequestSetOption): Promise<tendermint.abci.types.ResponseSetOption>;

                /**
                 * Calls DeliverTx.
                 * @param request RequestDeliverTx message or plain object
                 * @param callback Node-style callback called with the error, if any, and ResponseDeliverTx
                 */
                public deliverTx(request: tendermint.abci.types.IRequestDeliverTx, callback: tendermint.abci.types.ABCIApplication.DeliverTxCallback): void;

                /**
                 * Calls DeliverTx.
                 * @param request RequestDeliverTx message or plain object
                 * @returns Promise
                 */
                public deliverTx(request: tendermint.abci.types.IRequestDeliverTx): Promise<tendermint.abci.types.ResponseDeliverTx>;

                /**
                 * Calls CheckTx.
                 * @param request RequestCheckTx message or plain object
                 * @param callback Node-style callback called with the error, if any, and ResponseCheckTx
                 */
                public checkTx(request: tendermint.abci.types.IRequestCheckTx, callback: tendermint.abci.types.ABCIApplication.CheckTxCallback): void;

                /**
                 * Calls CheckTx.
                 * @param request RequestCheckTx message or plain object
                 * @returns Promise
                 */
                public checkTx(request: tendermint.abci.types.IRequestCheckTx): Promise<tendermint.abci.types.ResponseCheckTx>;

                /**
                 * Calls Query.
                 * @param request RequestQuery message or plain object
                 * @param callback Node-style callback called with the error, if any, and ResponseQuery
                 */
                public query(request: tendermint.abci.types.IRequestQuery, callback: tendermint.abci.types.ABCIApplication.QueryCallback): void;

                /**
                 * Calls Query.
                 * @param request RequestQuery message or plain object
                 * @returns Promise
                 */
                public query(request: tendermint.abci.types.IRequestQuery): Promise<tendermint.abci.types.ResponseQuery>;

                /**
                 * Calls Commit.
                 * @param request RequestCommit message or plain object
                 * @param callback Node-style callback called with the error, if any, and ResponseCommit
                 */
                public commit(request: tendermint.abci.types.IRequestCommit, callback: tendermint.abci.types.ABCIApplication.CommitCallback): void;

                /**
                 * Calls Commit.
                 * @param request RequestCommit message or plain object
                 * @returns Promise
                 */
                public commit(request: tendermint.abci.types.IRequestCommit): Promise<tendermint.abci.types.ResponseCommit>;

                /**
                 * Calls InitChain.
                 * @param request RequestInitChain message or plain object
                 * @param callback Node-style callback called with the error, if any, and ResponseInitChain
                 */
                public initChain(request: tendermint.abci.types.IRequestInitChain, callback: tendermint.abci.types.ABCIApplication.InitChainCallback): void;

                /**
                 * Calls InitChain.
                 * @param request RequestInitChain message or plain object
                 * @returns Promise
                 */
                public initChain(request: tendermint.abci.types.IRequestInitChain): Promise<tendermint.abci.types.ResponseInitChain>;

                /**
                 * Calls BeginBlock.
                 * @param request RequestBeginBlock message or plain object
                 * @param callback Node-style callback called with the error, if any, and ResponseBeginBlock
                 */
                public beginBlock(request: tendermint.abci.types.IRequestBeginBlock, callback: tendermint.abci.types.ABCIApplication.BeginBlockCallback): void;

                /**
                 * Calls BeginBlock.
                 * @param request RequestBeginBlock message or plain object
                 * @returns Promise
                 */
                public beginBlock(request: tendermint.abci.types.IRequestBeginBlock): Promise<tendermint.abci.types.ResponseBeginBlock>;

                /**
                 * Calls EndBlock.
                 * @param request RequestEndBlock message or plain object
                 * @param callback Node-style callback called with the error, if any, and ResponseEndBlock
                 */
                public endBlock(request: tendermint.abci.types.IRequestEndBlock, callback: tendermint.abci.types.ABCIApplication.EndBlockCallback): void;

                /**
                 * Calls EndBlock.
                 * @param request RequestEndBlock message or plain object
                 * @returns Promise
                 */
                public endBlock(request: tendermint.abci.types.IRequestEndBlock): Promise<tendermint.abci.types.ResponseEndBlock>;
            }

            namespace ABCIApplication {

                /**
                 * Callback as used by {@link tendermint.abci.types.ABCIApplication#echo}.
                 * @param error Error, if any
                 * @param [response] ResponseEcho
                 */
                type EchoCallback = (error: (Error|null), response?: tendermint.abci.types.ResponseEcho) => void;

                /**
                 * Callback as used by {@link tendermint.abci.types.ABCIApplication#flush}.
                 * @param error Error, if any
                 * @param [response] ResponseFlush
                 */
                type FlushCallback = (error: (Error|null), response?: tendermint.abci.types.ResponseFlush) => void;

                /**
                 * Callback as used by {@link tendermint.abci.types.ABCIApplication#info}.
                 * @param error Error, if any
                 * @param [response] ResponseInfo
                 */
                type InfoCallback = (error: (Error|null), response?: tendermint.abci.types.ResponseInfo) => void;

                /**
                 * Callback as used by {@link tendermint.abci.types.ABCIApplication#setOption}.
                 * @param error Error, if any
                 * @param [response] ResponseSetOption
                 */
                type SetOptionCallback = (error: (Error|null), response?: tendermint.abci.types.ResponseSetOption) => void;

                /**
                 * Callback as used by {@link tendermint.abci.types.ABCIApplication#deliverTx}.
                 * @param error Error, if any
                 * @param [response] ResponseDeliverTx
                 */
                type DeliverTxCallback = (error: (Error|null), response?: tendermint.abci.types.ResponseDeliverTx) => void;

                /**
                 * Callback as used by {@link tendermint.abci.types.ABCIApplication#checkTx}.
                 * @param error Error, if any
                 * @param [response] ResponseCheckTx
                 */
                type CheckTxCallback = (error: (Error|null), response?: tendermint.abci.types.ResponseCheckTx) => void;

                /**
                 * Callback as used by {@link tendermint.abci.types.ABCIApplication#query}.
                 * @param error Error, if any
                 * @param [response] ResponseQuery
                 */
                type QueryCallback = (error: (Error|null), response?: tendermint.abci.types.ResponseQuery) => void;

                /**
                 * Callback as used by {@link tendermint.abci.types.ABCIApplication#commit}.
                 * @param error Error, if any
                 * @param [response] ResponseCommit
                 */
                type CommitCallback = (error: (Error|null), response?: tendermint.abci.types.ResponseCommit) => void;

                /**
                 * Callback as used by {@link tendermint.abci.types.ABCIApplication#initChain}.
                 * @param error Error, if any
                 * @param [response] ResponseInitChain
                 */
                type InitChainCallback = (error: (Error|null), response?: tendermint.abci.types.ResponseInitChain) => void;

                /**
                 * Callback as used by {@link tendermint.abci.types.ABCIApplication#beginBlock}.
                 * @param error Error, if any
                 * @param [response] ResponseBeginBlock
                 */
                type BeginBlockCallback = (error: (Error|null), response?: tendermint.abci.types.ResponseBeginBlock) => void;

                /**
                 * Callback as used by {@link tendermint.abci.types.ABCIApplication#endBlock}.
                 * @param error Error, if any
                 * @param [response] ResponseEndBlock
                 */
                type EndBlockCallback = (error: (Error|null), response?: tendermint.abci.types.ResponseEndBlock) => void;
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
                type?: (string|null);

                /** ProofOp key */
                key?: (Uint8Array|null);

                /** ProofOp data */
                data?: (Uint8Array|null);
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
                public static create(properties?: tendermint.crypto.merkle.IProofOp): tendermint.crypto.merkle.ProofOp;

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
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.crypto.merkle.ProofOp;
            }

            /** Properties of a Proof. */
            interface IProof {

                /** Proof ops */
                ops?: (tendermint.crypto.merkle.IProofOp[]|null);
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
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.crypto.merkle.Proof;
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
                key?: (Uint8Array|null);

                /** Pair value */
                value?: (Uint8Array|null);
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
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.libs.kv.Pair;
            }

            /** Properties of a KI64Pair. */
            interface IKI64Pair {

                /** KI64Pair key */
                key?: (Uint8Array|null);

                /** KI64Pair value */
                value?: (number|Long|null);
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
                public value: (number|Long);

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
                public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): tendermint.libs.kv.KI64Pair;
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
            type_url?: (string|null);

            /** Any value */
            value?: (Uint8Array|null);
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
            public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): google.protobuf.Any;
        }

        /** Properties of a FileOptions. */
        interface IFileOptions {
        }

        /** Represents a FileOptions. */
        class FileOptions implements IFileOptions {

            /**
             * Constructs a new FileOptions.
             * @param [p] Properties to set
             */
            constructor(p?: google.protobuf.IFileOptions);

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
            public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): google.protobuf.FileOptions;
        }

        /** Properties of a MessageOptions. */
        interface IMessageOptions {
        }

        /** Represents a MessageOptions. */
        class MessageOptions implements IMessageOptions {

            /**
             * Constructs a new MessageOptions.
             * @param [p] Properties to set
             */
            constructor(p?: google.protobuf.IMessageOptions);

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
            public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): google.protobuf.MessageOptions;
        }

        /** Properties of a FieldOptions. */
        interface IFieldOptions {
        }

        /** Represents a FieldOptions. */
        class FieldOptions implements IFieldOptions {

            /**
             * Constructs a new FieldOptions.
             * @param [p] Properties to set
             */
            constructor(p?: google.protobuf.IFieldOptions);

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
            public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): google.protobuf.FieldOptions;
        }

        /** Properties of an EnumOptions. */
        interface IEnumOptions {
        }

        /** Represents an EnumOptions. */
        class EnumOptions implements IEnumOptions {

            /**
             * Constructs a new EnumOptions.
             * @param [p] Properties to set
             */
            constructor(p?: google.protobuf.IEnumOptions);

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
            public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): google.protobuf.EnumOptions;
        }

        /** Properties of an EnumValueOptions. */
        interface IEnumValueOptions {
        }

        /** Represents an EnumValueOptions. */
        class EnumValueOptions implements IEnumValueOptions {

            /**
             * Constructs a new EnumValueOptions.
             * @param [p] Properties to set
             */
            constructor(p?: google.protobuf.IEnumValueOptions);

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
            public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): google.protobuf.EnumValueOptions;
        }

        /** Properties of a Timestamp. */
        interface ITimestamp {

            /** Timestamp seconds */
            seconds?: (number|Long|null);

            /** Timestamp nanos */
            nanos?: (number|null);
        }

        /** Represents a Timestamp. */
        class Timestamp implements ITimestamp {

            /**
             * Constructs a new Timestamp.
             * @param [p] Properties to set
             */
            constructor(p?: google.protobuf.ITimestamp);

            /** Timestamp seconds. */
            public seconds: (number|Long);

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
            public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): google.protobuf.Timestamp;
        }

        /** Properties of a Duration. */
        interface IDuration {

            /** Duration seconds */
            seconds?: (number|Long|null);

            /** Duration nanos */
            nanos?: (number|null);
        }

        /** Represents a Duration. */
        class Duration implements IDuration {

            /**
             * Constructs a new Duration.
             * @param [p] Properties to set
             */
            constructor(p?: google.protobuf.IDuration);

            /** Duration seconds. */
            public seconds: (number|Long);

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
            public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): google.protobuf.Duration;
        }
    }
}
