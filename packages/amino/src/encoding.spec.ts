import { Bech32, fromBase64, fromHex, toBase64 } from "@cosmjs/encoding";

import {
  decodeAminoPubkey,
  decodeBech32Pubkey,
  encodeAminoPubkey,
  encodeBech32Pubkey,
  encodeSecp256k1Pubkey,
  pubkeyToAddress,
  pubkeyToRawAddress,
} from "./encoding";
import { MultisigThresholdPubkey, Pubkey } from "./pubkeys";

describe("encoding", () => {
  describe("encodeSecp256k1Pubkey", () => {
    it("encodes a compresed pubkey", () => {
      const pubkey = fromBase64("AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP");
      expect(encodeSecp256k1Pubkey(pubkey)).toEqual({
        type: "tendermint/PubKeySecp256k1",
        value: "AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP",
      });
    });

    it("throws for uncompressed public keys", () => {
      const pubkey = fromBase64(
        "BE8EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQE7WHpoHoNswYeoFkuYpYSKK4mzFzMV/dB0DVAy4lnNU=",
      );
      expect(() => encodeSecp256k1Pubkey(pubkey)).toThrowError(/public key must be compressed secp256k1/i);
    });
  });

  describe("decodeAminoPubkey", () => {
    it("works for secp256k1", () => {
      const amino = Bech32.decode(
        "cosmospub1addwnpepqd8sgxq7aw348ydctp3n5ajufgxp395hksxjzc6565yfp56scupfqhlgyg5",
      ).data;
      expect(decodeAminoPubkey(amino)).toEqual({
        type: "tendermint/PubKeySecp256k1",
        value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ",
      });
    });

    it("works for ed25519", () => {
      // Encoded from `corald tendermint show-validator`
      // Decoded from http://localhost:26657/validators
      const amino = Bech32.decode(
        "coralvalconspub1zcjduepqvxg72ccnl9r65fv0wn3amlk4sfzqfe2k36l073kjx2qyaf6sk23qw7j8wq",
      ).data;
      expect(decodeAminoPubkey(amino)).toEqual({
        type: "tendermint/PubKeyEd25519",
        value: "YZHlYxP5R6olj3Tj3f7VgkQE5VaOvv9G0jKATqdQsqI=",
      });
    });

    it("works for sr25519", () => {
      pending("No test data available");
    });
  });

  describe("decodeBech32Pubkey", () => {
    it("works", () => {
      expect(
        decodeBech32Pubkey("cosmospub1addwnpepqd8sgxq7aw348ydctp3n5ajufgxp395hksxjzc6565yfp56scupfqhlgyg5"),
      ).toEqual({
        type: "tendermint/PubKeySecp256k1",
        value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ",
      });
    });

    it("works for enigma pubkey", () => {
      expect(
        decodeBech32Pubkey("enigmapub1addwnpepqw5k9p439nw0zpg2aundx4umwx4nw233z5prpjqjv5anl5grmnchzp2xwvv"),
      ).toEqual({
        type: "tendermint/PubKeySecp256k1",
        value: "A6lihrEs3PEFCu8m01ebcas3KjEVAjDIEmU7P9ED3PFx",
      });
    });

    it("works for ed25519", () => {
      // Encoded from `corald tendermint show-validator`
      // Decoded from http://localhost:26657/validators
      const decoded = decodeBech32Pubkey(
        "coralvalconspub1zcjduepqvxg72ccnl9r65fv0wn3amlk4sfzqfe2k36l073kjx2qyaf6sk23qw7j8wq",
      );
      expect(decoded).toEqual({
        type: "tendermint/PubKeyEd25519",
        value: "YZHlYxP5R6olj3Tj3f7VgkQE5VaOvv9G0jKATqdQsqI=",
      });
    });
  });

  describe("encodeAminoPubkey", () => {
    it("works for secp256k1", () => {
      const pubkey: Pubkey = {
        type: "tendermint/PubKeySecp256k1",
        value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ",
      };
      const expected = Bech32.decode(
        "cosmospub1addwnpepqd8sgxq7aw348ydctp3n5ajufgxp395hksxjzc6565yfp56scupfqhlgyg5",
      ).data;
      expect(encodeAminoPubkey(pubkey)).toEqual(expected);
    });

    it("works for ed25519", () => {
      // Decoded from http://localhost:26657/validators
      // Encoded from `corald tendermint show-validator`
      const pubkey: Pubkey = {
        type: "tendermint/PubKeyEd25519",
        value: "YZHlYxP5R6olj3Tj3f7VgkQE5VaOvv9G0jKATqdQsqI=",
      };
      const expected = Bech32.decode(
        "coralvalconspub1zcjduepqvxg72ccnl9r65fv0wn3amlk4sfzqfe2k36l073kjx2qyaf6sk23qw7j8wq",
      ).data;
      expect(encodeAminoPubkey(pubkey)).toEqual(expected);
    });
  });

  describe("encodeBech32Pubkey", () => {
    it("works for secp256k1", () => {
      const pubkey: Pubkey = {
        type: "tendermint/PubKeySecp256k1",
        value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ",
      };
      expect(encodeBech32Pubkey(pubkey, "cosmospub")).toEqual(
        "cosmospub1addwnpepqd8sgxq7aw348ydctp3n5ajufgxp395hksxjzc6565yfp56scupfqhlgyg5",
      );
    });

    it("works for ed25519", () => {
      // Decoded from http://localhost:26657/validators
      // Encoded from `corald tendermint show-validator`
      const pubkey: Pubkey = {
        type: "tendermint/PubKeyEd25519",
        value: "YZHlYxP5R6olj3Tj3f7VgkQE5VaOvv9G0jKATqdQsqI=",
      };
      expect(encodeBech32Pubkey(pubkey, "coralvalconspub")).toEqual(
        "coralvalconspub1zcjduepqvxg72ccnl9r65fv0wn3amlk4sfzqfe2k36l073kjx2qyaf6sk23qw7j8wq",
      );
    });

    it("works for multisig", () => {
      // ./build/wasmd keys add test1
      // ./build/wasmd keys add test2
      // ./build/wasmd keys add test3
      // ./build/wasmd keys add testgroup1 --multisig=test1,test2,test3 --multisig-threshold 2
      // ./build/wasmd keys add testgroup2 --multisig=test1,test2,test3 --multisig-threshold 1
      // # By default pubkeys are sorted by its address data (https://github.com/cosmos/cosmos-sdk/blob/v0.42.2/client/keys/add.go#L172-L174)
      // ./build/wasmd keys add testgroup3 --multisig=test3,test1 --multisig-threshold 2
      // ./build/wasmd keys add testgroup4 --multisig=test3,test1 --nosort --multisig-threshold 2

      const test1 = decodeBech32Pubkey(
        "wasmpub1addwnpepqwxttx8w2sfs6d8cuzqcuau84grp8xsw95qzdjkmvc44tnckskdxw3zw2km",
        // pubkey data: eb5ae98721038cb598ee54130d34f8e0818e7787aa06139a0e2d0026cadb662b55cf16859a67
        // address: wasm1jq59w7y34msq69g4w3zvq6d5h3stcajd8g62xm
        // address data: 9028577891aee00d15157444c069b4bc60bc764d
      );
      const test2 = decodeBech32Pubkey(
        "wasmpub1addwnpepq2gx7x7e29kge5a4ycunytyqr0u8ynql5h583s8r9wdads9m3v8ks6y0nhc",
        // pubkey data: eb5ae9872102906f1bd9516c8cd3b52639322c801bf8724c1fa5e878c0e32b9bd6c0bb8b0f68
        // address: wasm146e52j6zphxw8m67cz8860ad5uju892cqmawsg
        // address data: aeb3454b420dcce3ef5ec08e7d3fada725c39558
      );
      const test3 = decodeBech32Pubkey(
        "wasmpub1addwnpepq0xfx5vavxmgdkn0p6x0l9p3udttghu3qcldd7ql08wa3xy93qq0xuzvtxc",
        // pubkey data: eb5ae9872103cc93519d61b686da6f0e8cff9431e356b45f91063ed6f81f79ddd898858800f3
        // address: wasm1a6uxr25mw8qg8zz3l2avsdjsveh4yg9sw7h5np
        // address data: eeb861aa9b71c0838851fabac83650666f5220b0
      );

      // 2/3 multisig
      const testgroup1: MultisigThresholdPubkey = {
        type: "tendermint/PubKeyMultisigThreshold",
        value: {
          threshold: "2",
          pubkeys: [test1, test2, test3],
        },
      };
      const expected1 = Bech32.decode(
        "wasmpub1ytql0csgqgfzd666axrjzquvkkvwu4qnp5603cyp3emc02sxzwdqutgqym9dke3t2h83dpv6vufzd666axrjzq5sdudaj5tv3nfm2f3exgkgqxlcwfxplf0g0rqwx2um6mqthzc0dqfzd666axrjzq7vjdge6cdksmdx7r5vl72rrc6kk30ezp376mup77wamzvgtzqq7v7aysdd",
      ).data;
      expect(encodeAminoPubkey(testgroup1)).toEqual(expected1);

      // 1/3 multisig
      const testgroup2: MultisigThresholdPubkey = {
        type: "tendermint/PubKeyMultisigThreshold",
        value: {
          threshold: "1",
          pubkeys: [test1, test2, test3],
        },
      };
      const expected2 = Bech32.decode(
        "wasmpub1ytql0csgqyfzd666axrjzquvkkvwu4qnp5603cyp3emc02sxzwdqutgqym9dke3t2h83dpv6vufzd666axrjzq5sdudaj5tv3nfm2f3exgkgqxlcwfxplf0g0rqwx2um6mqthzc0dqfzd666axrjzq7vjdge6cdksmdx7r5vl72rrc6kk30ezp376mup77wamzvgtzqq7vc4ejke",
      ).data;
      expect(encodeAminoPubkey(testgroup2)).toEqual(expected2);

      // 2/2 multisig
      const testgroup3: MultisigThresholdPubkey = {
        type: "tendermint/PubKeyMultisigThreshold",
        value: {
          threshold: "2",
          pubkeys: [test1, test3],
        },
      };
      const expected3 = Bech32.decode(
        "wasmpub1ytql0csgqgfzd666axrjzquvkkvwu4qnp5603cyp3emc02sxzwdqutgqym9dke3t2h83dpv6vufzd666axrjzq7vjdge6cdksmdx7r5vl72rrc6kk30ezp376mup77wamzvgtzqq7vzjhugu",
      ).data;
      expect(encodeAminoPubkey(testgroup3)).toEqual(expected3);

      // 2/2 multisig with custom sorting
      const testgroup4: MultisigThresholdPubkey = {
        type: "tendermint/PubKeyMultisigThreshold",
        value: {
          threshold: "2",
          pubkeys: [test3, test1],
        },
      };
      const expected4 = Bech32.decode(
        "wasmpub1ytql0csgqgfzd666axrjzq7vjdge6cdksmdx7r5vl72rrc6kk30ezp376mup77wamzvgtzqq7vfzd666axrjzquvkkvwu4qnp5603cyp3emc02sxzwdqutgqym9dke3t2h83dpv6vujvg56k",
      ).data;
      expect(encodeAminoPubkey(testgroup4)).toEqual(expected4);
    });
  });

  describe("pubkeyToRawAddress", () => {
    it("works for Secp256k1", () => {
      const pubkey = {
        type: "tendermint/PubKeySecp256k1",
        value: "AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP",
      };
      expect(pubkeyToRawAddress(pubkey)).toEqual(
        Bech32.decode("cosmos1h806c7khnvmjlywdrkdgk2vrayy2mmvf9rxk2r").data,
      );
    });

    it("works for Ed25519", () => {
      const pubkey = {
        type: "tendermint/PubKeyEd25519",
        value: toBase64(fromHex("12ee6f581fe55673a1e9e1382a0829e32075a0aa4763c968bc526e1852e78c95")),
      };
      expect(pubkeyToRawAddress(pubkey)).toEqual(
        Bech32.decode("cosmos1pfq05em6sfkls66ut4m2257p7qwlk448h8mysz").data,
      );
    });

    it("works for multisig", () => {
      const test1 = decodeBech32Pubkey(
        "wasmpub1addwnpepqwxttx8w2sfs6d8cuzqcuau84grp8xsw95qzdjkmvc44tnckskdxw3zw2km",
      );
      const test2 = decodeBech32Pubkey(
        "wasmpub1addwnpepq2gx7x7e29kge5a4ycunytyqr0u8ynql5h583s8r9wdads9m3v8ks6y0nhc",
      );
      const test3 = decodeBech32Pubkey(
        "wasmpub1addwnpepq0xfx5vavxmgdkn0p6x0l9p3udttghu3qcldd7ql08wa3xy93qq0xuzvtxc",
      );

      const testgroup1: MultisigThresholdPubkey = {
        type: "tendermint/PubKeyMultisigThreshold",
        value: {
          threshold: "2",
          pubkeys: [test1, test2, test3],
        },
      };
      expect(pubkeyToRawAddress(testgroup1)).toEqual(fromHex("0892a77fab2fa7e192c3b7b2741e6682f3abb72f"));
    });
  });

  describe("pubkeyToAddress", () => {
    it("works for Secp256k1", () => {
      const prefix = "cosmos";
      const pubkey = {
        type: "tendermint/PubKeySecp256k1",
        value: "AtQaCqFnshaZQp6rIkvAPyzThvCvXSDO+9AzbxVErqJP",
      };
      expect(pubkeyToAddress(pubkey, prefix)).toEqual("cosmos1h806c7khnvmjlywdrkdgk2vrayy2mmvf9rxk2r");
    });

    it("works for Ed25519", () => {
      const prefix = "cosmos";
      const pubkey = {
        type: "tendermint/PubKeyEd25519",
        value: toBase64(fromHex("12ee6f581fe55673a1e9e1382a0829e32075a0aa4763c968bc526e1852e78c95")),
      };
      expect(pubkeyToAddress(pubkey, prefix)).toEqual("cosmos1pfq05em6sfkls66ut4m2257p7qwlk448h8mysz");
    });

    it("works for multisig", () => {
      const test1 = decodeBech32Pubkey(
        "wasmpub1addwnpepqwxttx8w2sfs6d8cuzqcuau84grp8xsw95qzdjkmvc44tnckskdxw3zw2km",
      );
      const test2 = decodeBech32Pubkey(
        "wasmpub1addwnpepq2gx7x7e29kge5a4ycunytyqr0u8ynql5h583s8r9wdads9m3v8ks6y0nhc",
      );
      const test3 = decodeBech32Pubkey(
        "wasmpub1addwnpepq0xfx5vavxmgdkn0p6x0l9p3udttghu3qcldd7ql08wa3xy93qq0xuzvtxc",
      );

      const testgroup1: MultisigThresholdPubkey = {
        type: "tendermint/PubKeyMultisigThreshold",
        value: {
          threshold: "2",
          pubkeys: [test1, test2, test3],
        },
      };
      expect(pubkeyToAddress(testgroup1, "wasm")).toEqual("wasm1pzf2wlat97n7rykrk7e8g8nxste6hde0r8jqsy");
    });
  });
});
