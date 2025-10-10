import { Producer, Stream } from "xstream";

import { concat } from "./concat";

async function producerIsStopped(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 50));
}

describe("concat", () => {
  it("can concat 0 streams", async () => {
    let done!: (() => void) & { fail: (e?: any) => void };
    const ret = new Promise<void>((resolve, reject) => {
      done = resolve as typeof done;
      done.fail = reject;
    });
    const concatenatedStream = concat();
    const expected: string[] = [];

    concatenatedStream.addListener({
      next: (value) => {
        expect(value).toEqual(expected.shift()!);
      },
      complete: () => {
        expect(expected.length).toEqual(0);
        done();
      },
      error: done.fail,
    });

    return ret;
  });

  it("can concat 1 streams", async () => {
    let done!: (() => void) & { fail: (e?: any) => void };
    const ret = new Promise<void>((resolve, reject) => {
      done = resolve as typeof done;
      done.fail = reject;
    });
    const stream1 = Stream.of("1", "2", "3");
    const concatenatedStream = concat(stream1);
    const expected = ["1", "2", "3"];

    concatenatedStream.addListener({
      next: (value) => {
        expect(value).toEqual(expected.shift()!);
      },
      complete: () => {
        expect(expected.length).toEqual(0);
        done();
      },
      error: done.fail,
    });

    return ret;
  });

  it("can concat 2 streams", async () => {
    let done!: (() => void) & { fail: (e?: any) => void };
    const ret = new Promise<void>((resolve, reject) => {
      done = resolve as typeof done;
      done.fail = reject;
    });
    const stream1 = Stream.of("1", "2", "3");
    const stream2 = Stream.of("a", "b", "c");
    const concatenatedStream = concat(stream1, stream2);
    const expected = ["1", "2", "3", "a", "b", "c"];

    concatenatedStream.addListener({
      next: (value) => {
        expect(value).toEqual(expected.shift()!);
      },
      complete: () => {
        expect(expected.length).toEqual(0);
        done();
      },
      error: done.fail,
    });

    return ret;
  });

  it("can concat 3 streams", async () => {
    let done!: (() => void) & { fail: (e?: any) => void };
    const ret = new Promise<void>((resolve, reject) => {
      done = resolve as typeof done;
      done.fail = reject;
    });
    const stream1 = Stream.of("1", "2", "3");
    const stream2 = Stream.of("a", "b", "c");
    const stream3 = Stream.of("X", "Y", "Z");
    const concatenatedStream = concat(stream1, stream2, stream3);
    const expected = ["1", "2", "3", "a", "b", "c", "X", "Y", "Z"];

    concatenatedStream.addListener({
      next: (value) => {
        expect(value).toEqual(expected.shift()!);
      },
      complete: () => {
        expect(expected.length).toEqual(0);
        done();
      },
      error: done.fail,
    });

    return ret;
  });

  it("changes output order when order of streams switch", async () => {
    let done!: (() => void) & { fail: (e?: any) => void };
    const ret = new Promise<void>((resolve, reject) => {
      done = resolve as typeof done;
      done.fail = reject;
    });
    const stream1 = Stream.of("1", "2", "3");
    const stream2 = Stream.of("a", "b", "c");
    const concatenatedStream = concat(stream2, stream1);
    const expected = ["a", "b", "c", "1", "2", "3"];

    concatenatedStream.addListener({
      next: (value) => {
        expect(value).toEqual(expected.shift()!);
      },
      complete: () => {
        expect(expected.length).toEqual(0);
        done();
      },
      error: done.fail,
    });

    return ret;
  });

  it("should concat two asynchronous short streams together", async () => {
    let done!: (() => void) & { fail: (e?: any) => void };
    const ret = new Promise<void>((resolve, reject) => {
      done = resolve as typeof done;
      done.fail = reject;
    });
    const stream1 = Stream.periodic(25).take(3);
    const stream2 = Stream.periodic(50).take(2);
    const concatenatedStream = concat(stream1, stream2);
    const expected = [0, 1, 2, 0, 1];

    concatenatedStream.addListener({
      next: (value) => {
        expect(value).toEqual(expected.shift()!);
      },
      complete: () => {
        expect(expected.length).toEqual(0);
        done();
      },
      error: done.fail,
    });

    return ret;
  });

  it("should append a synchronous stream after an asynchronous stream", async () => {
    let done!: (() => void) & { fail: (e?: any) => void };
    const ret = new Promise<void>((resolve, reject) => {
      done = resolve as typeof done;
      done.fail = reject;
    });
    const stream1 = Stream.periodic(25).take(3);
    const stream2 = Stream.of(30, 40, 50, 60);
    const concatenatedStream = concat(stream1, stream2);
    const expected = [0, 1, 2, 30, 40, 50, 60];

    concatenatedStream.addListener({
      next: (value) => {
        expect(value).toEqual(expected.shift()!);
      },
      complete: () => {
        expect(expected.length).toEqual(0);
        done();
      },
      error: done.fail,
    });

    return ret;
  });

  it("buffers asynchronous events of second stream until first stream completes", async () => {
    let done!: (() => void) & { fail: (e?: any) => void };
    const ret = new Promise<void>((resolve, reject) => {
      done = resolve as typeof done;
      done.fail = reject;
    });
    const sourceStream = Stream.periodic(25);
    const stream1 = sourceStream.take(3);
    const stream2 = sourceStream.take(3);
    const concatenatedStream = concat(stream1, stream2);
    const expected = [0, 1, 2, 0, 1, 2];

    concatenatedStream.addListener({
      next: (value) => {
        expect(value).toEqual(expected.shift()!);
      },
      complete: () => {
        expect(expected.length).toEqual(0);
        done();
      },
      error: done.fail,
    });

    return ret;
  });

  it("unsubscribes and re-subscribes from source streams", async () => {
    let done!: (() => void) & { fail: (e?: any) => void };
    const ret = new Promise<void>((resolve, reject) => {
      done = resolve as typeof done;
      done.fail = reject;
    });
    // For browsers and CI, clocks and runtimes are very unreliable.
    // Especially Mac+Firefox on Travis makes big trouble. Thus we need huge intervals.
    const intervalDuration = 500;
    const producerActiveLog = new Array<boolean>();

    let producerInterval: NodeJS.Timeout;
    let producerValue = 0;
    const loggingProducer: Producer<string> = {
      start: (listener) => {
        producerInterval = setInterval(() => {
          listener.next(`event${producerValue++}`);
        }, intervalDuration);
        producerActiveLog.push(true);
      },
      stop: () => {
        clearInterval(producerInterval);
        producerActiveLog.push(false);
      },
    };

    const stream1 = Stream.create(loggingProducer);
    const concatenatedStream = concat(stream1);
    const expected = ["event0", "event1", "event2", "event3", "event4", "event5"];

    expect(producerActiveLog).toEqual([]);

    const subscription = concatenatedStream.subscribe({
      next: (value) => {
        expect(value).toEqual(expected.shift()!);
      },
      complete: () => {
        done.fail();
      },
      error: done.fail,
    });

    expect(producerActiveLog).toEqual([true]);

    // unsubscribe
    setTimeout(async () => {
      expect(producerActiveLog).toEqual([true]);
      subscription.unsubscribe();
      await producerIsStopped();
      expect(producerActiveLog).toEqual([true, false]);
    }, 3.75 * intervalDuration);

    // re-subscribe
    setTimeout(() => {
      expect(producerActiveLog).toEqual([true, false]);

      const subscription2 = concatenatedStream.subscribe({
        next: (value) => {
          expect(value).toEqual(expected.shift()!);
        },
        complete: () => {
          done.fail();
        },
        error: done.fail,
      });

      expect(producerActiveLog).toEqual([true, false, true]);

      // unsubscribe again
      setTimeout(async () => {
        expect(producerActiveLog).toEqual([true, false, true]);
        subscription2.unsubscribe();
        await producerIsStopped();
        expect(producerActiveLog).toEqual([true, false, true, false]);

        expect(expected.length).toEqual(0);
        done();
      }, 3.75 * intervalDuration);
    }, 6 * intervalDuration);

    return ret;
  }, 10000);
});
