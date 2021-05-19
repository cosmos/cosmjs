import { decodeBech32Pubkey } from "./encoding";
import { MultisigThresholdPubkey } from "./pubkeys";

export const base64Matcher =
  /^(?:[a-zA-Z0-9+/]{4})*(?:|(?:[a-zA-Z0-9+/]{3}=)|(?:[a-zA-Z0-9+/]{2}==)|(?:[a-zA-Z0-9+/]{1}===))$/;

// ./build/wasmd keys add test1
// ./build/wasmd keys add test2
// ./build/wasmd keys add test3
// ./build/wasmd keys add testgroup1 --multisig=test1,test2,test3 --multisig-threshold 2
// ./build/wasmd keys add testgroup2 --multisig=test1,test2,test3 --multisig-threshold 1
// # By default pubkeys are sorted by its address data (https://github.com/cosmos/cosmos-sdk/blob/v0.42.2/client/keys/add.go#L172-L174)
// ./build/wasmd keys add testgroup3 --multisig=test3,test1 --multisig-threshold 2
// ./build/wasmd keys add testgroup4 --multisig=test3,test1 --nosort --multisig-threshold 2

export const test1 = decodeBech32Pubkey(
  "wasmpub1addwnpepqwxttx8w2sfs6d8cuzqcuau84grp8xsw95qzdjkmvc44tnckskdxw3zw2km",
  // pubkey data: eb5ae98721038cb598ee54130d34f8e0818e7787aa06139a0e2d0026cadb662b55cf16859a67
  // address: wasm1jq59w7y34msq69g4w3zvq6d5h3stcajd8g62xm
  // address data: 9028577891aee00d15157444c069b4bc60bc764d
);
export const test2 = decodeBech32Pubkey(
  "wasmpub1addwnpepq2gx7x7e29kge5a4ycunytyqr0u8ynql5h583s8r9wdads9m3v8ks6y0nhc",
  // pubkey data: eb5ae9872102906f1bd9516c8cd3b52639322c801bf8724c1fa5e878c0e32b9bd6c0bb8b0f68
  // address: wasm146e52j6zphxw8m67cz8860ad5uju892cqmawsg
  // address data: aeb3454b420dcce3ef5ec08e7d3fada725c39558
);
export const test3 = decodeBech32Pubkey(
  "wasmpub1addwnpepq0xfx5vavxmgdkn0p6x0l9p3udttghu3qcldd7ql08wa3xy93qq0xuzvtxc",
  // pubkey data: eb5ae9872103cc93519d61b686da6f0e8cff9431e356b45f91063ed6f81f79ddd898858800f3
  // address: wasm1a6uxr25mw8qg8zz3l2avsdjsveh4yg9sw7h5np
  // address data: eeb861aa9b71c0838851fabac83650666f5220b0
);

// 2/3 multisig
export const testgroup1: MultisigThresholdPubkey = {
  type: "tendermint/PubKeyMultisigThreshold",
  value: {
    threshold: "2",
    pubkeys: [test1, test2, test3],
  },
};
export const testgroup1Address =
  "wasmpub1ytql0csgqgfzd666axrjzquvkkvwu4qnp5603cyp3emc02sxzwdqutgqym9dke3t2h83dpv6vufzd666axrjzq5sdudaj5tv3nfm2f3exgkgqxlcwfxplf0g0rqwx2um6mqthzc0dqfzd666axrjzq7vjdge6cdksmdx7r5vl72rrc6kk30ezp376mup77wamzvgtzqq7v7aysdd";

export const testgroup2: MultisigThresholdPubkey = {
  type: "tendermint/PubKeyMultisigThreshold",
  value: {
    threshold: "1",
    pubkeys: [test1, test2, test3],
  },
};
export const testgroup2Address =
  "wasmpub1ytql0csgqyfzd666axrjzquvkkvwu4qnp5603cyp3emc02sxzwdqutgqym9dke3t2h83dpv6vufzd666axrjzq5sdudaj5tv3nfm2f3exgkgqxlcwfxplf0g0rqwx2um6mqthzc0dqfzd666axrjzq7vjdge6cdksmdx7r5vl72rrc6kk30ezp376mup77wamzvgtzqq7vc4ejke";

// 2/2 multisig
export const testgroup3: MultisigThresholdPubkey = {
  type: "tendermint/PubKeyMultisigThreshold",
  value: {
    threshold: "2",
    pubkeys: [test1, test3],
  },
};
export const testgroup3Address =
  "wasmpub1ytql0csgqgfzd666axrjzquvkkvwu4qnp5603cyp3emc02sxzwdqutgqym9dke3t2h83dpv6vufzd666axrjzq7vjdge6cdksmdx7r5vl72rrc6kk30ezp376mup77wamzvgtzqq7vzjhugu";

// 2/2 multisig with custom sorting
export const testgroup4: MultisigThresholdPubkey = {
  type: "tendermint/PubKeyMultisigThreshold",
  value: {
    threshold: "2",
    pubkeys: [test3, test1],
  },
};
export const testgroup4Address =
  "wasmpub1ytql0csgqgfzd666axrjzq7vjdge6cdksmdx7r5vl72rrc6kk30ezp376mup77wamzvgtzqq7vfzd666axrjzquvkkvwu4qnp5603cyp3emc02sxzwdqutgqym9dke3t2h83dpv6vujvg56k";
