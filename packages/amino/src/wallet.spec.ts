import { executeKdf, KdfConfiguration } from "./wallet"

describe("wallet", () => {
  describe("executeKdf", () => {
    describe("with supported algorithm", () => {
      it("can execute", async () => {
        const password = "123";
        const kdfConfiguration: KdfConfiguration = {
          algorithm: "argon2id",
          params: {
            outputLength: 32,
            opsLimit: 4,
            memLimitKib: 3 * 1024,
          },
        };
        await expectAsync(executeKdf(password, kdfConfiguration)).not.toBeRejected()
      })

      describe("with invalid params", () => {
        it("throws", async () => {
          const password = "123";
          const kdfConfiguration: KdfConfiguration = {
            algorithm: "argon2id",
            params: {
              outputLength: "invalid",
              opsLimit: "invalid",
              memLimitKib: "invalid",
            },
          };
          await expectAsync(executeKdf(password, kdfConfiguration)).toBeRejectedWith(new Error("Invalid format of argon2id params"))
        })
      })
    })

    describe("with unsupported algorithm", () => {
      it("throws", async () => {
        const password = "123";
        const kdfConfiguration: KdfConfiguration = {
          algorithm: "unsupported",
          params: {},
        };
        await expectAsync(executeKdf(password, kdfConfiguration)).toBeRejectedWith(new Error("Unsupported KDF algorithm"))
      })
    })
  })
})
