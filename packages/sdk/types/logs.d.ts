export interface Attribute {
  readonly key: string;
  readonly value: string;
}
export interface Event {
  readonly type: "message";
  readonly attributes: readonly Attribute[];
}
export interface Log {
  readonly msg_index: number;
  readonly log: string;
  readonly events: readonly Event[];
}
export declare function parseAttribute(input: unknown): Attribute;
export declare function parseEvent(input: unknown): Event;
export declare function parseLog(input: unknown): Log;
export declare function parseLogs(input: unknown): readonly Log[];
