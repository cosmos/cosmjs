import { fromHex } from "@cosmjs/encoding";

import { Bip39 } from "./bip39";
import { EnglishMnemonic } from "./englishmnemonic";
import bip39Vectors from "./testdata/bip39.json";

describe("Bip39", () => {
  describe("encode", () => {
    it("can encode to mnemonic", () => {
      // Test vectors from https://github.com/trezor/python-mnemonic/blob/b502451a33a440783926e04428115e0bed87d01f/vectors.json
      // plus similar vectors generated for the missing lengths 15 and 21 words
      const { "12": vec12, "15": vec15, "18": vec18, "21": vec21, "24": vec24 } = bip39Vectors.encoding;
      for (const vectors of [vec12, vec15, vec18, vec21, vec24]) {
        for (const { entropy, mnemonic } of vectors) {
          expect(Bip39.encode(fromHex(entropy)).toString()).toEqual(mnemonic);
        }
      }
    });

    it("throws for invalid input", () => {
      // invalid input length
      expect(() => Bip39.encode(fromHex(""))).toThrowError(/invalid input length/);
      expect(() => Bip39.encode(fromHex("00"))).toThrowError(/invalid input length/);
      expect(() => Bip39.encode(fromHex("000000000000000000000000000000"))).toThrowError(
        /invalid input length/,
      );
      expect(() => Bip39.encode(fromHex("0000000000000000000000000000000000"))).toThrowError(
        /invalid input length/,
      );
      expect(() => Bip39.encode(fromHex("0000000000000000000000000000000000000000000000"))).toThrowError(
        /invalid input length/,
      );
      expect(() => Bip39.encode(fromHex("00000000000000000000000000000000000000000000000000"))).toThrowError(
        /invalid input length/,
      );
      expect(() =>
        Bip39.encode(fromHex("00000000000000000000000000000000000000000000000000000000000000")),
      ).toThrowError(/invalid input length/);
      expect(() =>
        Bip39.encode(fromHex("000000000000000000000000000000000000000000000000000000000000000000")),
      ).toThrowError(/invalid input length/);
    });
  });

  describe("decode", () => {
    it("can decode from mnemonic", () => {
      const { "12": vec12, "15": vec15, "18": vec18, "21": vec21, "24": vec24 } = bip39Vectors.encoding;
      for (const vectors of [vec12, vec15, vec18, vec21, vec24]) {
        for (const { entropy, mnemonic } of vectors) {
          expect(Bip39.decode(new EnglishMnemonic(mnemonic))).toEqual(fromHex(entropy));
        }
      }
    });
  });

  describe("mnemonicToSeed", () => {
    it("can calculate seed from mnemonic (trezor test vectors)", async () => {
      expect(
        await Bip39.mnemonicToSeed(
          new EnglishMnemonic(
            "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about",
          ),
          "TREZOR",
        ),
      ).toEqual(
        fromHex(
          "c55257c360c07c72029aebc1b53c05ed0362ada38ead3e3e9efa3708e53495531f09a6987599d18264c1e1c92f2cf141630c7a3c4ab7c81b2f001698e7463b04",
        ),
      );
      expect(
        await Bip39.mnemonicToSeed(
          new EnglishMnemonic("legal winner thank year wave sausage worth useful legal winner thank yellow"),
          "TREZOR",
        ),
      ).toEqual(
        fromHex(
          "2e8905819b8723fe2c1d161860e5ee1830318dbf49a83bd451cfb8440c28bd6fa457fe1296106559a3c80937a1c1069be3a3a5bd381ee6260e8d9739fce1f607",
        ),
      );
      expect(
        await Bip39.mnemonicToSeed(
          new EnglishMnemonic(
            "letter advice cage absurd amount doctor acoustic avoid letter advice cage above",
          ),
          "TREZOR",
        ),
      ).toEqual(
        fromHex(
          "d71de856f81a8acc65e6fc851a38d4d7ec216fd0796d0a6827a3ad6ed5511a30fa280f12eb2e47ed2ac03b5c462a0358d18d69fe4f985ec81778c1b370b652a8",
        ),
      );
      expect(
        await Bip39.mnemonicToSeed(
          new EnglishMnemonic("zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong"),
          "TREZOR",
        ),
      ).toEqual(
        fromHex(
          "ac27495480225222079d7be181583751e86f571027b0497b5b5d11218e0a8a13332572917f0f8e5a589620c6f15b11c61dee327651a14c34e18231052e48c069",
        ),
      );
      expect(
        await Bip39.mnemonicToSeed(
          new EnglishMnemonic(
            "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon agent",
          ),
          "TREZOR",
        ),
      ).toEqual(
        fromHex(
          "035895f2f481b1b0f01fcf8c289c794660b289981a78f8106447707fdd9666ca06da5a9a565181599b79f53b844d8a71dd9f439c52a3d7b3e8a79c906ac845fa",
        ),
      );
      expect(
        await Bip39.mnemonicToSeed(
          new EnglishMnemonic(
            "legal winner thank year wave sausage worth useful legal winner thank year wave sausage worth useful legal will",
          ),
          "TREZOR",
        ),
      ).toEqual(
        fromHex(
          "f2b94508732bcbacbcc020faefecfc89feafa6649a5491b8c952cede496c214a0c7b3c392d168748f2d4a612bada0753b52a1c7ac53c1e93abd5c6320b9e95dd",
        ),
      );
      expect(
        await Bip39.mnemonicToSeed(
          new EnglishMnemonic(
            "letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic avoid letter always",
          ),
          "TREZOR",
        ),
      ).toEqual(
        fromHex(
          "107d7c02a5aa6f38c58083ff74f04c607c2d2c0ecc55501dadd72d025b751bc27fe913ffb796f841c49b1d33b610cf0e91d3aa239027f5e99fe4ce9e5088cd65",
        ),
      );
      expect(
        await Bip39.mnemonicToSeed(
          new EnglishMnemonic("zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo when"),
          "TREZOR",
        ),
      ).toEqual(
        fromHex(
          "0cd6e5d827bb62eb8fc1e262254223817fd068a74b5b449cc2f667c3f1f985a76379b43348d952e2265b4cd129090758b3e3c2c49103b5051aac2eaeb890a528",
        ),
      );
      expect(
        await Bip39.mnemonicToSeed(
          new EnglishMnemonic(
            "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon art",
          ),
          "TREZOR",
        ),
      ).toEqual(
        fromHex(
          "bda85446c68413707090a52022edd26a1c9462295029f2e60cd7c4f2bbd3097170af7a4d73245cafa9c3cca8d561a7c3de6f5d4a10be8ed2a5e608d68f92fcc8",
        ),
      );
      expect(
        await Bip39.mnemonicToSeed(
          new EnglishMnemonic(
            "legal winner thank year wave sausage worth useful legal winner thank year wave sausage worth useful legal winner thank year wave sausage worth title",
          ),
          "TREZOR",
        ),
      ).toEqual(
        fromHex(
          "bc09fca1804f7e69da93c2f2028eb238c227f2e9dda30cd63699232578480a4021b146ad717fbb7e451ce9eb835f43620bf5c514db0f8add49f5d121449d3e87",
        ),
      );
      expect(
        await Bip39.mnemonicToSeed(
          new EnglishMnemonic(
            "letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic bless",
          ),
          "TREZOR",
        ),
      ).toEqual(
        fromHex(
          "c0c519bd0e91a2ed54357d9d1ebef6f5af218a153624cf4f2da911a0ed8f7a09e2ef61af0aca007096df430022f7a2b6fb91661a9589097069720d015e4e982f",
        ),
      );
      expect(
        await Bip39.mnemonicToSeed(
          new EnglishMnemonic(
            "zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo vote",
          ),
          "TREZOR",
        ),
      ).toEqual(
        fromHex(
          "dd48c104698c30cfe2b6142103248622fb7bb0ff692eebb00089b32d22484e1613912f0a5b694407be899ffd31ed3992c456cdf60f5d4564b8ba3f05a69890ad",
        ),
      );
      expect(
        await Bip39.mnemonicToSeed(
          new EnglishMnemonic("ozone drill grab fiber curtain grace pudding thank cruise elder eight picnic"),
          "TREZOR",
        ),
      ).toEqual(
        fromHex(
          "274ddc525802f7c828d8ef7ddbcdc5304e87ac3535913611fbbfa986d0c9e5476c91689f9c8a54fd55bd38606aa6a8595ad213d4c9c9f9aca3fb217069a41028",
        ),
      );
      expect(
        await Bip39.mnemonicToSeed(
          new EnglishMnemonic(
            "gravity machine north sort system female filter attitude volume fold club stay feature office ecology stable narrow fog",
          ),
          "TREZOR",
        ),
      ).toEqual(
        fromHex(
          "628c3827a8823298ee685db84f55caa34b5cc195a778e52d45f59bcf75aba68e4d7590e101dc414bc1bbd5737666fbbef35d1f1903953b66624f910feef245ac",
        ),
      );
      expect(
        await Bip39.mnemonicToSeed(
          new EnglishMnemonic(
            "hamster diagram private dutch cause delay private meat slide toddler razor book happy fancy gospel tennis maple dilemma loan word shrug inflict delay length",
          ),
          "TREZOR",
        ),
      ).toEqual(
        fromHex(
          "64c87cde7e12ecf6704ab95bb1408bef047c22db4cc7491c4271d170a1b213d20b385bc1588d9c7b38f1b39d415665b8a9030c9ec653d75e65f847d8fc1fc440",
        ),
      );
      expect(
        await Bip39.mnemonicToSeed(
          new EnglishMnemonic("scheme spot photo card baby mountain device kick cradle pact join borrow"),
          "TREZOR",
        ),
      ).toEqual(
        fromHex(
          "ea725895aaae8d4c1cf682c1bfd2d358d52ed9f0f0591131b559e2724bb234fca05aa9c02c57407e04ee9dc3b454aa63fbff483a8b11de949624b9f1831a9612",
        ),
      );
      expect(
        await Bip39.mnemonicToSeed(
          new EnglishMnemonic(
            "horn tenant knee talent sponsor spell gate clip pulse soap slush warm silver nephew swap uncle crack brave",
          ),
          "TREZOR",
        ),
      ).toEqual(
        fromHex(
          "fd579828af3da1d32544ce4db5c73d53fc8acc4ddb1e3b251a31179cdb71e853c56d2fcb11aed39898ce6c34b10b5382772db8796e52837b54468aeb312cfc3d",
        ),
      );
      expect(
        await Bip39.mnemonicToSeed(
          new EnglishMnemonic(
            "panda eyebrow bullet gorilla call smoke muffin taste mesh discover soft ostrich alcohol speed nation flash devote level hobby quick inner drive ghost inside",
          ),
          "TREZOR",
        ),
      ).toEqual(
        fromHex(
          "72be8e052fc4919d2adf28d5306b5474b0069df35b02303de8c1729c9538dbb6fc2d731d5f832193cd9fb6aeecbc469594a70e3dd50811b5067f3b88b28c3e8d",
        ),
      );
      expect(
        await Bip39.mnemonicToSeed(
          new EnglishMnemonic("cat swing flag economy stadium alone churn speed unique patch report train"),
          "TREZOR",
        ),
      ).toEqual(
        fromHex(
          "deb5f45449e615feff5640f2e49f933ff51895de3b4381832b3139941c57b59205a42480c52175b6efcffaa58a2503887c1e8b363a707256bdd2b587b46541f5",
        ),
      );
      expect(
        await Bip39.mnemonicToSeed(
          new EnglishMnemonic(
            "light rule cinnamon wrap drastic word pride squirrel upgrade then income fatal apart sustain crack supply proud access",
          ),
          "TREZOR",
        ),
      ).toEqual(
        fromHex(
          "4cbdff1ca2db800fd61cae72a57475fdc6bab03e441fd63f96dabd1f183ef5b782925f00105f318309a7e9c3ea6967c7801e46c8a58082674c860a37b93eda02",
        ),
      );
      expect(
        await Bip39.mnemonicToSeed(
          new EnglishMnemonic(
            "all hour make first leader extend hole alien behind guard gospel lava path output census museum junior mass reopen famous sing advance salt reform",
          ),
          "TREZOR",
        ),
      ).toEqual(
        fromHex(
          "26e975ec644423f4a4c4f4215ef09b4bd7ef924e85d1d17c4cf3f136c2863cf6df0a475045652c57eb5fb41513ca2a2d67722b77e954b4b3fc11f7590449191d",
        ),
      );
      expect(
        await Bip39.mnemonicToSeed(
          new EnglishMnemonic(
            "vessel ladder alter error federal sibling chat ability sun glass valve picture",
          ),
          "TREZOR",
        ),
      ).toEqual(
        fromHex(
          "2aaa9242daafcee6aa9d7269f17d4efe271e1b9a529178d7dc139cd18747090bf9d60295d0ce74309a78852a9caadf0af48aae1c6253839624076224374bc63f",
        ),
      );
      expect(
        await Bip39.mnemonicToSeed(
          new EnglishMnemonic(
            "scissors invite lock maple supreme raw rapid void congress muscle digital elegant little brisk hair mango congress clump",
          ),
          "TREZOR",
        ),
      ).toEqual(
        fromHex(
          "7b4a10be9d98e6cba265566db7f136718e1398c71cb581e1b2f464cac1ceedf4f3e274dc270003c670ad8d02c4558b2f8e39edea2775c9e232c7cb798b069e88",
        ),
      );
      expect(
        await Bip39.mnemonicToSeed(
          new EnglishMnemonic(
            "void come effort suffer camp survey warrior heavy shoot primary clutch crush open amazing screen patrol group space point ten exist slush involve unfold",
          ),
          "TREZOR",
        ),
      ).toEqual(
        fromHex(
          "01f5bced59dec48e362f2c45b5de68b9fd6c92c6634f44d6d40aab69056506f0e35524a518034ddc1192e1dacd32c1ed3eaa3c3b131c88ed8e7e54c49a5d0998",
        ),
      );
    });

    it("can calculate seed from mnemonic (no password)", async () => {
      // custom test vectors using
      // $ git clone https://github.com/trezor/python-mnemonic.git && cd python-mnemonic
      // $ python3 -m venv venv
      // $ source venv/bin/activate
      // $ pip install wheel bip32utils
      // $ pip install -r requirements.txt
      // patch generate_vectors.py to your needs
      // $ python generate_vectors.py

      // empty password
      expect(
        await Bip39.mnemonicToSeed(
          new EnglishMnemonic("robust pipe raise illness symptom crowd trip will slow assault recipe oven"),
          "",
        ),
      ).toEqual(
        fromHex(
          "5539eed11e1096e9d52f69f15ad3d7c6547a40a3865b9517dbcbb03c31f231900622f58616d64d2d1cc0440f31d67fb0b2699a5fc885f796c746e0f844477093",
        ),
      );
      expect(
        await Bip39.mnemonicToSeed(
          new EnglishMnemonic(
            "pair ethics august street tornado spare present under capital raise cross current main craft stone clutch tray all",
          ),
          "",
        ),
      ).toEqual(
        fromHex(
          "1272467e954cec4e0ad720002d037a3aaf795a57ffbeea6aaa0c242d410eb52050292447aa2c68470a07ecc80171edfa9e027793265047be3128d94e867a4f99",
        ),
      );
      expect(
        await Bip39.mnemonicToSeed(
          new EnglishMnemonic(
            "allow finger front connect strategy purchase journey distance trouble guitar honey alpha giraffe canal junk vintage chronic blade gate custom soap flip first mix",
          ),
          "",
        ),
      ).toEqual(
        fromHex(
          "476a41ac016b5bdf9f114456929975a036ae326e2efdca441ac5a0949ef89ab9246dc9e49a5d2d64d1926eb9dbe17576cb010471c2a821b216202acdf3d7a27b",
        ),
      );

      // no password
      expect(
        await Bip39.mnemonicToSeed(
          new EnglishMnemonic("robust pipe raise illness symptom crowd trip will slow assault recipe oven"),
        ),
      ).toEqual(
        fromHex(
          "5539eed11e1096e9d52f69f15ad3d7c6547a40a3865b9517dbcbb03c31f231900622f58616d64d2d1cc0440f31d67fb0b2699a5fc885f796c746e0f844477093",
        ),
      );
      expect(
        await Bip39.mnemonicToSeed(
          new EnglishMnemonic(
            "pair ethics august street tornado spare present under capital raise cross current main craft stone clutch tray all",
          ),
        ),
      ).toEqual(
        fromHex(
          "1272467e954cec4e0ad720002d037a3aaf795a57ffbeea6aaa0c242d410eb52050292447aa2c68470a07ecc80171edfa9e027793265047be3128d94e867a4f99",
        ),
      );
      expect(
        await Bip39.mnemonicToSeed(
          new EnglishMnemonic(
            "allow finger front connect strategy purchase journey distance trouble guitar honey alpha giraffe canal junk vintage chronic blade gate custom soap flip first mix",
          ),
        ),
      ).toEqual(
        fromHex(
          "476a41ac016b5bdf9f114456929975a036ae326e2efdca441ac5a0949ef89ab9246dc9e49a5d2d64d1926eb9dbe17576cb010471c2a821b216202acdf3d7a27b",
        ),
      );
    });
  });
});
