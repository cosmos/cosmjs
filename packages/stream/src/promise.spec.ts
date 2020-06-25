import { Producer, Stream } from "xstream";

import { firstEvent, fromListPromise, toListPromise } from "./promise";
import { asArray, countStream } from "./reducer";

async function oneTickLater(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

describe("promise", () => {
  describe("fromListPromise", () => {
    it("sends many values on a stream", async () => {
      // create a promise that will resolve to an array of strings
      const input = ["a", "fd", "fvss", "gs"];
      const prom = Promise.resolve(input);
      const stream = fromListPromise(prom);

      // materialize stream into a counter, and wait for stream to complete
      const counter = countStream(stream);
      await counter.finished();
      expect(counter.value()).toEqual(input.length);
    });

    it("works for iterables like Uint8Array", async () => {
      const inputPromise = Promise.resolve(new Uint8Array([0x00, 0x11, 0x22]));
      const stream = fromListPromise(inputPromise);

      const reader = asArray<number>(stream);
      await reader.finished();
      expect(reader.value()).toEqual([0x00, 0x11, 0x22]);
    });

    it("works for delayed resolution", async () => {
      const inputPromise = new Promise<number[]>((resolve) => {
        // resolve after 50 ms
        setTimeout(() => resolve([1, 2, 3]), 50);
      });
      const stream = fromListPromise(inputPromise);

      const reader = asArray<number>(stream);
      await reader.finished();
      expect(reader.value()).toEqual([1, 2, 3]);
    });

    it("sends proper values", async () => {
      const input = ["let", "us", "say", "something"];
      const prom = Promise.resolve(input);
      const stream = fromListPromise(prom);

      // materialize stream into an array, and wait for stream to complete
      const read = asArray<string>(stream);
      await read.finished();
      expect(read.value()).toEqual(input);
    });
  });

  describe("toListPromise", () => {
    it("works for simple stream with more events than count", async () => {
      const events = await toListPromise(Stream.fromArray([1, 6, 92, 2, 9]), 3);
      expect(events).toEqual([1, 6, 92]);
    });

    it("works for simple stream with equal events and count", async () => {
      const events = await toListPromise(Stream.fromArray([1, 6, 92, 2, 9]), 5);
      expect(events).toEqual([1, 6, 92, 2, 9]);
    });

    it("works for simple stream with zero count", async () => {
      const events = await toListPromise(Stream.fromArray([1, 6, 92, 2, 9]), 0);
      expect(events).toEqual([]);
    });

    it("works for empty stream with zero count", async () => {
      const events = await toListPromise(Stream.fromArray([]), 0);
      expect(events).toEqual([]);
    });

    it("rejects for simple stream with less events than count", async () => {
      await toListPromise(Stream.fromArray([1, 6, 92]), 5)
        .then(() => fail("must not resolve"))
        .catch((error) => expect(error).toMatch(/stream completed before all events could be collected/i));
    });

    it("works for async stream", async () => {
      let interval: NodeJS.Timeout;
      let producerRunning = false;
      const producer: Producer<number> = {
        start: (listener) => {
          producerRunning = true;
          let nextElement = 0;
          interval = setInterval(() => {
            listener.next(nextElement++);
          }, 20);
        },
        stop: () => {
          clearInterval(interval);
          producerRunning = false;
        },
      };

      const events = await toListPromise(Stream.create(producer), 3);
      expect(events).toEqual([0, 1, 2]);
      await oneTickLater();
      expect(producerRunning).toEqual(false);
    });
  });

  describe("firstEvent", () => {
    it("works for simple stream with more events than count", async () => {
      const event = await firstEvent(Stream.fromArray([1, 6, 92, 2, 9]));
      expect(event).toEqual(1);
    });

    it("rejects for stream with no events", async () => {
      await firstEvent(Stream.fromArray([]))
        .then(() => fail("must not resolve"))
        .catch((error) => expect(error).toMatch(/stream completed before all events could be collected/i));
    });

    it("works for async stream", async () => {
      let interval: NodeJS.Timeout;
      let producerRunning = false;
      const producer: Producer<number> = {
        start: (listener) => {
          producerRunning = true;
          let nextElement = 0;
          interval = setInterval(() => {
            listener.next(nextElement++);
          }, 20);
        },
        stop: () => {
          clearInterval(interval);
          producerRunning = false;
        },
      };

      const event = await firstEvent(Stream.create(producer));
      expect(event).toEqual(0);
      await oneTickLater();
      expect(producerRunning).toEqual(false);
    });
  });
});
