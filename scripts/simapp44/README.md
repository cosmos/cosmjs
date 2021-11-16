# Local Simd development network

## Starting the blockchain

Run the following:

```
cd scripts/simapp44
./start.sh
```

## Preset accounts

1. **Faucet**<br>
   economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone<br>
   Address 0: cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6<br>
   Address 1: cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5<br>
   Address 2: cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k<br>
   Address 3: cosmos142u9fgcjdlycfcez3lw8x6x5h7rfjlnfhpw2lx<br>
   Address 4: cosmos1hsm76p4ahyhl5yh3ve9ur49r5kemhp2r0dcjvx<br>
   Pubkey 0: A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ<br>
   Pubkey 1: AiDosfIbBi54XJ1QjCeApumcy/FjdtF+YhywPf3DKTx7<br>
   Pubkey 2: AzQg33JZqH7vSsm09esZY5bZvmzYwE/SY78cA0iLxpD7<br>
   Pubkey 3: A3gOAlB6aiRTCPvWMQg2+ZbGYNsLd8qlvV28m8p2UhY2<br>
   Pubkey 4: Aum2063ub/ErUnIUB36sK55LktGUStgcbSiaAnL1wadu
2. **Alice**: Test account for the cosmwasm package that can run in parallel with faucet without sequence conflicts<br>
   enlist hip relief stomach skate base shallow young switch frequent cry park<br>
   Address 0: cosmos14qemq0vw6y3gc3u3e0aty2e764u4gs5le3hada<br>
   Address 1: cosmos1hhg2rlu9jscacku2wwckws7932qqqu8x3gfgw0<br>
   Address 2: cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5<br>
   Address 3: cosmos17yg9mssjenmc3jkqth6ulcwj9cxujrxxzezwta<br>
   Address 4: cosmos1f7j7ryulwjfe9ljplvhtcaxa6wqgula3etktce<br>
   Pubkey 0: A9cXhWb8ZpqCzkA8dQCPV29KdeRLV3rUYxrkHudLbQtS<br>
   Pubkey 1: A4XluzvcUx0ViLF0DjYW5/noArGwpltDstoUUZo+g1b0<br>
   Pubkey 2: A5TKr1NKc/MKRJ7+EHDD9PlzmGaPD/di/6hzZyBwxoy5<br>
   Pubkey 3: A/HSABDUqMB2qDy+PA7fiuuuA+hfrco2VwwiThMiTzUx<br>
   Pubkey 4: A7usTiqgqfxL/WKhoephDUSCHBQlLagtwI/qTmEteTRM
3. **Bob**: Test account (unused for now)<br>
   remain fragile remove stamp quiz bus country dress critic mammal office need<br>
   Address 0: cosmos1lvrwcvrqlc5ktzp2c4t22xgkx29q3y83lktgzl<br>
   Address 1: cosmos1vkv9sfwaak76weyamqx0flmng2vuquxqcuqukh<br>
   Address 2: cosmos106jwym4s9aujcmes26myzzwqsccw09sdm0v5au<br>
   Address 3: cosmos1c7wpeen2uv8thayf7g8q2rgpm29clj0dgrdtzw<br>
   Address 4: cosmos1mjxpv9ft30wer7ma7kwfxhm42l379xutplrdk6<br>
   Pubkey 0: A0d/GxY+UALE+miWJP0qyq4/EayG1G6tsg24v+cbD6By<br>
   Pubkey 1: Agqd6njsVEQD1CR+F2aqEb8hil5NXZ06mjKgetaNC12t<br>
   Pubkey 2: A6e9ElvKaM0DKWh1bIdK3bgB14dyEDgIXYMA0Lbs1GoQ<br>
   Pubkey 3: AkAK5PQaucieWMb0+tTRY01feYI+upRnoNK556eD0Ibb<br>
   Pubkey 4: A5HMVEAJsupdQWItbZv5Z1xZifDixQi6tjU/hJpZY1bF
4. **Unused**: for testing account state; this account never changes balances or sequences<br>
   oyster design unusual machine spread century engine gravity focus cave carry slot<br>
   ArkCaFUJ/IH+vKBmNRCdUVl3mCAhbopk9jjW4Ko4OfRQ<br>
   cosmos1cjsxept9rkggzxztslae9ndgpdyt2408lk850u
5. **Guest**: account for manual testing<br>
   degree tackle suggest window test behind mesh extra cover prepare oak script<br>
   Am/+YV0LaeqQPu7BDJuDHV7J8y68ptkGs10YS+9s71Nq<br>
   cosmos17d0jcz59jf68g52vq38tuuncmwwjk42u6mcxej

### Multisig accounts

1. 1/5 threshold multisig of the first 5 faucet accounts<br>
   cosmos1v75snhly7wfndk83ud4daygh397vcmkta8rlzq
2. 2/5 threshold multisig of the first 5 faucet accounts<br>
   cosmos1h90ml36rcu7yegwduzgzderj2jmq49hcpfclw9
3. 3/5 threshold multisig of the first 5 faucet accounts<br>
   cosmos1d2mg2euvus3tu2tprfwrfzeal4xu7kygugjxjc
