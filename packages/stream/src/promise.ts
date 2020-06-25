import { Producer, Stream } from "xstream";

/**
 * Emits one event for each list element as soon as the promise resolves
 */
export function fromListPromise<T>(promise: Promise<Iterable<T>>): Stream<T> {
  const producer: Producer<T> = {
    start: (listener) => {
      // the code in `start` runs as soon as anyone listens to the stream
      promise
        .then((iterable) => {
          for (const element of iterable) {
            listener.next(element);
          }
          listener.complete();
        })
        .catch((error) => listener.error(error));
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    stop: () => {},
  };

  return Stream.create(producer);
}

/**
 * Listens to stream and collects events. When `count` events are collected,
 * the promise resolves with an array of events.
 *
 * Rejects if stream completes before `count` events are collected.
 */
export async function toListPromise<T>(stream: Stream<T>, count: number): Promise<readonly T[]> {
  return new Promise<readonly T[]>((resolve, reject) => {
    if (count === 0) {
      resolve([]);
      return;
    }

    const events = new Array<T>();
    // take() unsubscribes from source stream automatically
    stream.take(count).subscribe({
      next: (event) => {
        events.push(event);

        if (events.length === count) {
          resolve(events);
        }
      },
      complete: () => {
        reject(
          `Stream completed before all events could be collected. ` +
            `Collected ${events.length}, expected ${count}`,
        );
      },
      error: (error) => reject(error),
    });
  });
}

/**
 * Listens to stream, collects one event and revolves.
 *
 * Rejects if stream completes before one event was fired.
 */
export async function firstEvent<T>(stream: Stream<T>): Promise<T> {
  return (await toListPromise(stream, 1))[0];
}
