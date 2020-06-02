/* eslint-disable @typescript-eslint/camelcase */
import { parseAttribute, parseEvent, parseLog, parseLogs } from "./logs";

describe("logs", () => {
  describe("parseAttribute", () => {
    it("works", () => {
      const attr = parseAttribute({ key: "a", value: "b" });
      expect(attr).toEqual({ key: "a", value: "b" });
    });

    it("works for empty value", () => {
      const attr = parseAttribute({ key: "foobar", value: "" });
      expect(attr).toEqual({ key: "foobar", value: "" });
    });

    it("normalized unset value to empty string", () => {
      const attr = parseAttribute({ key: "amount" });
      expect(attr).toEqual({ key: "amount", value: "" });
    });
  });

  describe("parseEvent", () => {
    it("works", () => {
      const original = {
        type: "message",
        attributes: [
          {
            key: "action",
            value: "store-code",
          },
          {
            key: "module",
            value: "wasm",
          },
          {
            key: "action",
            value: "store-code",
          },
          {
            key: "sender",
            value: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          },
          {
            key: "code_id",
            value: "1",
          },
        ],
      } as const;

      const event = parseEvent(original);
      expect(event).toEqual(original);
    });

    it("works for transfer event", () => {
      const original = {
        type: "transfer",
        attributes: [
          {
            key: "recipient",
            value: "cosmos18vd8fpwxzck93qlwghaj6arh4p7c5n89uzcee5",
          },
          {
            key: "amount",
          },
        ],
      } as const;
      const expected = {
        type: "transfer",
        attributes: [
          {
            key: "recipient",
            value: "cosmos18vd8fpwxzck93qlwghaj6arh4p7c5n89uzcee5",
          },
          {
            key: "amount",
            value: "",
          },
        ],
      } as const;

      const event = parseEvent(original);
      expect(event).toEqual(expected);
    });
  });

  describe("parseLog", () => {
    it("works", () => {
      const original = {
        msg_index: 0,
        log: "",
        events: [
          {
            type: "message",
            attributes: [
              {
                key: "action",
                value: "store-code",
              },
              {
                key: "module",
                value: "wasm",
              },
              {
                key: "action",
                value: "store-code",
              },
              {
                key: "sender",
                value: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
              },
              {
                key: "code_id",
                value: "1",
              },
            ],
          },
        ],
      } as const;

      const log = parseLog(original);
      expect(log).toEqual(original);
    });
  });

  describe("parseLogs", () => {
    it("works", () => {
      const original = [
        {
          msg_index: 0,
          log: "",
          events: [
            {
              type: "message",
              attributes: [
                {
                  key: "action",
                  value: "store-code",
                },
                {
                  key: "module",
                  value: "wasm",
                },
                {
                  key: "action",
                  value: "store-code",
                },
                {
                  key: "sender",
                  value: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
                },
                {
                  key: "code_id",
                  value: "1",
                },
              ],
            },
          ],
        },
      ] as const;

      const logs = parseLogs(original);
      expect(logs).toEqual(original);
    });
  });
});
