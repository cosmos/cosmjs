import { Listener } from "xstream";

import { DefaultValueProducer } from "./defaultvalueproducer";
import { ValueAndUpdates } from "./valueandupdates";

describe("ValueAndUpdates", () => {
  it("can be constructed", () => {
    {
      const vau = new ValueAndUpdates(new DefaultValueProducer("a"));
      expect(vau).toBeTruthy();
    }
    {
      const vau = new ValueAndUpdates(new DefaultValueProducer(123));
      expect(vau).toBeTruthy();
    }
    {
      const vau = new ValueAndUpdates(new DefaultValueProducer(true));
      expect(vau).toBeTruthy();
    }
    {
      const vau = new ValueAndUpdates(new DefaultValueProducer(null));
      expect(vau).toBeTruthy();
    }
  });

  it("contains initial value", () => {
    {
      const vau = new ValueAndUpdates(new DefaultValueProducer("a"));
      expect(vau.value).toEqual("a");
    }
    {
      const vau = new ValueAndUpdates(new DefaultValueProducer(123));
      expect(vau.value).toEqual(123);
    }
    {
      const vau = new ValueAndUpdates(new DefaultValueProducer(true));
      expect(vau.value).toEqual(true);
    }
    {
      const vau = new ValueAndUpdates(new DefaultValueProducer(null));
      expect(vau.value).toEqual(null);
    }
  });

  it("can be updated", () => {
    {
      const producer = new DefaultValueProducer("a");
      const vau = new ValueAndUpdates(producer);
      expect(vau.value).toEqual("a");
      producer.update("b");
      expect(vau.value).toEqual("b");
    }
    {
      const producer = new DefaultValueProducer(123);
      const vau = new ValueAndUpdates(producer);
      expect(vau.value).toEqual(123);
      producer.update(44);
      expect(vau.value).toEqual(44);
    }
    {
      const producer = new DefaultValueProducer(true);
      const vau = new ValueAndUpdates(producer);
      expect(vau.value).toEqual(true);
      producer.update(false);
      expect(vau.value).toEqual(false);
    }
    {
      const producer = new DefaultValueProducer(null);
      const vau = new ValueAndUpdates(producer);
      expect(vau.value).toEqual(null);
      producer.update(null);
      expect(vau.value).toEqual(null);
    }
  });

  it("emits initial value to new listeners", (done) => {
    const vau = new ValueAndUpdates(new DefaultValueProducer(123));

    const listener2: Listener<number> = {
      next: (value) => {
        expect(value).toEqual(123);
        done();
      },
      complete: () => done.fail(".updates stream must not complete"),
      error: (e) => done.fail(e),
    };

    const listener1: Listener<number> = {
      next: (value) => {
        expect(value).toEqual(123);
        vau.updates.addListener(listener2);
      },
      complete: () => done.fail(".updates stream must not complete"),
      error: (e) => done.fail(e),
    };

    vau.updates.addListener(listener1);
  });

  it("emits current value to new listeners", (done) => {
    const producer = new DefaultValueProducer(123);
    const vau = new ValueAndUpdates(producer);
    producer.update(99);

    const listener2: Listener<number> = {
      next: (value) => {
        expect(value).toEqual(99);
        done();
      },
      complete: () => done.fail(".updates stream must not complete"),
      error: (e) => done.fail(e),
    };

    const listener1: Listener<number> = {
      next: (value) => {
        expect(value).toEqual(99);
        vau.updates.addListener(listener2);
      },
      complete: () => done.fail(".updates stream must not complete"),
      error: (e) => done.fail(e),
    };

    vau.updates.addListener(listener1);
  });

  it("emits updates to listener", (done) => {
    const producer = new DefaultValueProducer(11);
    const vau = new ValueAndUpdates(producer);

    let eventsCount = 0;
    const emittedValues = new Array<number>();

    vau.updates.addListener({
      next: (value) => {
        eventsCount++;
        emittedValues.push(value);

        if (eventsCount === 4) {
          expect(emittedValues).toEqual([11, 22, 33, 44]);
          done();
        }
      },
      complete: () => done.fail(".updates stream must not complete"),
      error: (e) => done.fail(e),
    });

    setTimeout(() => producer.update(22), 10);
    setTimeout(() => producer.update(33), 20);
    setTimeout(() => producer.update(44), 30);
  });

  it("can wait for value", async () => {
    const producer = new DefaultValueProducer(11);
    const vau = new ValueAndUpdates(producer);

    setTimeout(() => producer.update(22), 10);
    setTimeout(() => producer.update(33), 20);
    setTimeout(() => producer.update(44), 30);

    await vau.waitFor(33);
    expect(vau.value).toEqual(33);

    await vau.waitFor(44);
    expect(vau.value).toEqual(44);
  });

  it("can wait for search function to return true", async () => {
    const producer = new DefaultValueProducer(11);
    const vau = new ValueAndUpdates(producer);

    setTimeout(() => producer.update(22), 10);
    setTimeout(() => producer.update(33), 20);
    setTimeout(() => producer.update(44), 30);

    await vau.waitFor((v) => v > 30);
    expect(vau.value).toEqual(33);

    await vau.waitFor((v) => v > 40);
    expect(vau.value).toEqual(44);
  });

  it("gets the correct return value in waitFor", async () => {
    const producer = new DefaultValueProducer(11);
    const vau = new ValueAndUpdates(producer);

    setTimeout(() => producer.update(22), 10);
    setTimeout(() => producer.update(33), 20);

    {
      const result = await vau.waitFor(22);
      expect(result).toEqual(22);
    }

    {
      const result = await vau.waitFor((v) => v > 30);
      expect(result).toEqual(33);
    }
  });

  describe("waitFor", () => {
    it("propagates error from stream", async () => {
      const producer = new DefaultValueProducer(1);
      const vau = new ValueAndUpdates(producer);
      setTimeout(() => producer.error(new Error("something went wrong")), 10);
      await vau.waitFor(3).then(
        () => fail("must not resolve"),
        (error) => expect(error).toMatch(/something went wrong/),
      );
    });
  });
});
