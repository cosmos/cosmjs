import { Stream } from "xstream";

import { DefaultValueProducer } from "./defaultvalueproducer";

async function oneTickLater(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

describe("DefaultValueProducer", () => {
  it("can be constructed", () => {
    const producer = new DefaultValueProducer(1);
    expect(producer.value).toEqual(1);
  });

  it("can be used as a stream backend", (done) => {
    const producer = new DefaultValueProducer(42);
    const stream = Stream.createWithMemory(producer);
    stream.addListener({
      next: (value) => {
        expect(value).toEqual(42);
        done();
      },
      error: done.fail,
      complete: done.fail,
    });
  });

  it("can send updates", (done) => {
    const producer = new DefaultValueProducer(42);
    const stream = Stream.createWithMemory(producer);

    const events: number[] = [];
    stream.addListener({
      next: (value) => {
        events.push(value);

        if (events.length === 4) {
          expect(events).toEqual([42, 43, 44, 45]);
          done();
        }
      },
      error: done.fail,
      complete: done.fail,
    });

    producer.update(43);
    producer.update(44);
    producer.update(45);
  });

  it("can send errors", (done) => {
    const producer = new DefaultValueProducer(42);
    const stream = Stream.createWithMemory(producer);

    stream.addListener({
      error: (error) => {
        expect(error).toEqual("oh no :(");
        done();
      },
      complete: () => done.fail("Stream must not complete successfully"),
    });

    producer.update(1);
    producer.update(2);
    producer.update(3);
    producer.error("oh no :(");
  });

  it("calls callbacks", async () => {
    const producerActive: boolean[] = [];

    const producer = new DefaultValueProducer(42, {
      onStarted: () => producerActive.push(true),
      onStop: () => producerActive.push(false),
    });
    const stream = Stream.createWithMemory(producer);

    expect(producerActive).toEqual([]);

    const subscription1 = stream.subscribe({});
    expect(producerActive).toEqual([true]);

    const subscription2 = stream.subscribe({});
    expect(producerActive).toEqual([true]);

    subscription2.unsubscribe();
    expect(producerActive).toEqual([true]);

    subscription1.unsubscribe();
    await oneTickLater();
    expect(producerActive).toEqual([true, false]);

    const subscription3 = stream.subscribe({});
    expect(producerActive).toEqual([true, false, true]);

    subscription3.unsubscribe();
    await oneTickLater();
    expect(producerActive).toEqual([true, false, true, false]);

    const subscriptionA = stream.subscribe({});
    expect(producerActive).toEqual([true, false, true, false, true]);

    // unsubscribe and re-subscribe does not deactivate the producer (which is a xstream feature)
    subscriptionA.unsubscribe();
    const subscriptionB = stream.subscribe({});
    expect(producerActive).toEqual([true, false, true, false, true]);

    // cleanup
    subscriptionB.unsubscribe();
  });
});
