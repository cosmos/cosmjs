import { Listener, Producer } from "xstream";

export interface DefaultValueProducerCallsbacks {
  readonly onStarted: () => void;
  readonly onStop: () => void;
}

// allows pre-producing values before anyone is listening
export class DefaultValueProducer<T> implements Producer<T> {
  public get value(): T {
    return this.internalValue;
  }

  private readonly callbacks: DefaultValueProducerCallsbacks | undefined;
  // tslint:disable-next-line:readonly-keyword
  private internalValue: T;
  // tslint:disable-next-line:readonly-keyword
  private listener: Listener<T> | undefined;

  public constructor(value: T, callbacks?: DefaultValueProducerCallsbacks) {
    this.callbacks = callbacks;
    this.internalValue = value;
  }

  /**
   * Update the current value.
   *
   * If producer is active (i.e. someone is listening), this emits an event.
   * If not, just the current value is updated.
   */
  public update(value: T): void {
    // tslint:disable-next-line:no-object-mutation
    this.internalValue = value;
    if (this.listener) {
      this.listener.next(value);
    }
  }

  /**
   * Produce an error
   */
  public error(error: any): void {
    if (this.listener) {
      this.listener.error(error);
    }
  }

  /**
   * Called by the stream. Do not call this directly.
   */
  public start(listener: Listener<T>): void {
    // tslint:disable-next-line:no-object-mutation
    this.listener = listener;
    listener.next(this.internalValue);

    if (this.callbacks) {
      this.callbacks.onStarted();
    }
  }

  /**
   * Called by the stream. Do not call this directly.
   */
  public stop(): void {
    if (this.callbacks) {
      this.callbacks.onStop();
    }

    // tslint:disable-next-line:no-object-mutation
    this.listener = undefined;
  }
}
