/**
 * A map from Stargate message types as used in the messages's `Any` type
 * to Amino types.
 */
export declare class AminoTypes {
  private readonly register;
  constructor(additions?: Record<string, string>);
  toAmino(typeUrl: string): string;
  fromAmino(type: string): string;
}
