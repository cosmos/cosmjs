export interface AminoConverter {
  readonly aminoType: string;
  readonly toAmino: (value: any) => any;
  readonly fromAmino: (value: any) => any;
}

/** A map from protobuf type URL to the AminoConverter implementation if supported on chain */
export type AminoConverters = Record<string, AminoConverter | "not_supported_by_chain">;
