/* eslint-disable @typescript-eslint/camelcase */
import { parseAttribute, parseEvent, parseLog, parseLogs } from "./logs";

describe("logs", () => {
  describe("parseAttribute", () => {
    it("works", () => {
      const attr = parseAttribute({ key: "a", value: "b" });
      expect(attr).toEqual({ key: "a", value: "b" });
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
