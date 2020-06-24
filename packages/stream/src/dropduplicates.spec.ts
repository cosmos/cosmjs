import { Stream } from "xstream";

import { dropDuplicates } from "./dropduplicates";

describe("dropDuplicates", () => {
  it("can be created", () => {
    const operand = dropDuplicates<number>((value) => `${value}`);
    expect(operand).toBeTruthy();
  });

  it("passes unique values", (done) => {
    const instream = Stream.fromArray([0, 1, 2, 3]);
    const operand = dropDuplicates<number>((value) => `${value}`);

    const events = new Array<number>();
    instream.compose(operand).subscribe({
      next: (value) => events.push(value),
      complete: () => {
        expect(events).toEqual([0, 1, 2, 3]);
        done();
      },
    });
  });

  it("drops consecutive duplicates", (done) => {
    const instream = Stream.fromArray([1, 2, 2, 3, 3, 3, 4, 4, 4, 4]);
    const operand = dropDuplicates<number>((value) => `${value}`);

    const events = new Array<number>();
    instream.compose(operand).subscribe({
      next: (value) => events.push(value),
      complete: () => {
        expect(events).toEqual([1, 2, 3, 4]);
        done();
      },
    });
  });

  it("drops non-consecutive duplicates", (done) => {
    const instream = Stream.fromArray([1, 2, 3, 4, 3, 2, 1]);
    const operand = dropDuplicates<number>((value) => `${value}`);

    const events = new Array<number>();
    instream.compose(operand).subscribe({
      next: (value) => events.push(value),
      complete: () => {
        expect(events).toEqual([1, 2, 3, 4]);
        done();
      },
    });
  });

  it("uses value to key method for duplicate checks", (done) => {
    const instream = Stream.fromArray([1, 10, 100, 2000, 2, 27, 1337, 3.14, 33]);
    // use first character of native string representation
    const valueToKey = (value: number): string => `${value}`.charAt(0);
    const operand = dropDuplicates(valueToKey);

    const events = new Array<number>();
    instream.compose(operand).subscribe({
      next: (value) => events.push(value),
      complete: () => {
        expect(events).toEqual([1, 2000, 3.14]);
        done();
      },
    });
  });

  it("works for empty string keys", (done) => {
    interface Name {
      readonly first: string;
      readonly last: string;
    }

    const instream = Stream.fromArray<Name>([
      { first: "Daria", last: "" },
      { first: "Sam", last: "" },
      { first: "Regina", last: "Mustermann" },
      { first: "Max", last: "Mustermann" },
    ]);
    const operand = dropDuplicates((value: Name) => value.last);

    const events = new Array<Name>();
    instream.compose(operand).subscribe({
      next: (value) => events.push(value),
      complete: () => {
        expect(events).toEqual([
          { first: "Daria", last: "" },
          { first: "Regina", last: "Mustermann" },
        ]);
        done();
      },
    });
  });
});
