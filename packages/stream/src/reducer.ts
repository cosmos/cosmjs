import { Stream } from "xstream";

export type ReducerFunc<T, U> = (acc: U, evt: T) => U;

// Reducer takes a stream of events T and a ReducerFunc, that
// materializes a state of type U.
export class Reducer<T, U> {
  private readonly stream: Stream<T>;
  private readonly reducer: ReducerFunc<T, U>;
  private state: U;
  // completed maintains state of stream, resolves/rejects
  // on complete or error
  private readonly completed: Promise<void>;

  public constructor(stream: Stream<T>, reducer: ReducerFunc<T, U>, initState: U) {
    this.stream = stream;
    this.reducer = reducer;
    this.state = initState;
    this.completed = new Promise<void>((resolve, reject) => {
      const subscription = this.stream.subscribe({
        next: (evt: T) => {
          this.state = this.reducer(this.state, evt);
        },
        complete: () => {
          resolve();
          // this must happen after resolve, to ensure stream.subscribe() has finished
          subscription.unsubscribe();
        },
        error: (err: any) => {
          reject(err);
          // the stream already closed on error, but unsubscribe to be safe
          subscription.unsubscribe();
        },
      });
    });
  }

  // value returns current materialized state
  public value(): U {
    return this.state;
  }

  // finished resolves on completed stream, rejects on stream error
  public async finished(): Promise<void> {
    return this.completed;
  }
}

function increment<T>(sum: number, _: T): number {
  return sum + 1;
}

// countStream returns a reducer that contains current count
// of events on the stream
export function countStream<T>(stream: Stream<T>): Reducer<T, number> {
  return new Reducer(stream, increment, 0);
}

function append<T>(list: readonly T[], evt: T): readonly T[] {
  return [...list, evt];
}

// asArray maintains an array containing all events that have
// occurred on the stream
export function asArray<T>(stream: Stream<T>): Reducer<T, readonly T[]> {
  return new Reducer<T, readonly T[]>(stream, append, []);
}

function last<T>(_: any, event: T): T {
  return event;
}

// lastValue returns the last value read from the stream, or undefined if no values sent
export function lastValue<T>(stream: Stream<T>): Reducer<T, T | undefined> {
  return new Reducer<T, T | undefined>(stream, last, undefined);
}
