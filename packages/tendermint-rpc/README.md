# @iov/tendermint-rpc

[![npm version](https://img.shields.io/npm/v/@iov/tendermint-rpc.svg)](https://www.npmjs.com/package/@iov/tendermint-rpc)

This package provides a type-safe wrapper around
[Tendermint RPC](https://docs.tendermint.com/master/rpc/). Notably, all binary
data is passed in and out as Uint8Array, and this module is reponsible for the
hex/base64 encoding/decoding depending on the field and version of Tendermint.
Also handles converting numbers to and from strings.

## Getting started

The simplest possible use of the module is to assume it does everything
automatically, and call:

```ts
import { Client } from "@iov/tendermint-rpc";

const client = await Client.connect("ws://rpc-private-a-x-exchangenet.iov.one:16657");

const genesis = await client.genesis();
const status = await client.status();
```

A query to the ABCI application looks like this:

```ts
const results = await client.abciQuery({
  path: "/tokens?prefix",
  data: new Uint8Array([]),
});
```

## Supported Tendermint versions

| IOV-Core version | Supported Tendermint versions |
| ---------------- | ----------------------------- |
| 1.1              | 0.31.x – 0.32.x               |
| 1.0              | 0.31.x                        |
| 0.15 – 0.17      | 0.29.x – 0.31.x               |
| 0.12 – 0.14      | 0.25.x, 0.27.x – 0.29.x       |
| 0.11             | 0.25.x, 0.27.x                |
| 0.9 – 0.10       | 0.20.x, 0.21.x, 0.25.x        |
| 0.1 – 0.8        | 0.20.x, 0.21.x                |

Support for Tendermint versions is determined by demand for IOV's own products.
Please let us know if you need support for other versions of Tendermint or need
long term support for one specific Tendermint version.

## Code Overview

The main entry point is the
[Client](https://iov-one.github.io/iov-core-docs/latest/iov-tendermint-rpc/classes/client.html).

The connection to the blockchain is defined by a flexible
[RpcClient](https://iov-one.github.io/iov-core-docs/latest/iov-tendermint-rpc/interfaces/rpcclient.html)
interface, with implementations for HTTP (POST) and WebSockets. You can add your
own connection type or just wrap one with custom retry rules, error handling,
etc. The RPC client is just responsible for sending JSON-RPC requests and
returning the responses.

The actual domain knowledge is embedded in the
[Adaptor](https://iov-one.github.io/iov-core-docs/latest/iov-tendermint-rpc/interfaces/adaptor.html),
which defines a class for encoding
[Params](https://iov-one.github.io/iov-core-docs/latest/iov-tendermint-rpc/classes/params.html)
and another for decoding
[Responses](https://iov-one.github.io/iov-core-docs/latest/iov-tendermint-rpc/classes/responses.html).
The Tendermint version-specific functionality is implemented in global objects
(like e.g.
[v0_32](https://iov-one.github.io/iov-core-docs/latest/iov-tendermint-rpc/globals.html#v0_32)).
This knowledge is mainly for those who want to add support for new versions,
which should be added to the
[auto-detect method](https://iov-one.github.io/iov-core-docs/latest/iov-tendermint-rpc/classes/client.html#detectversion).

## API Documentation

[https://iov-one.github.io/iov-core-docs/latest/iov-tendermint-rpc/](https://iov-one.github.io/iov-core-docs/latest/iov-tendermint-rpc/)

## License

This package is part of the IOV-Core repository, licensed under the Apache
License 2.0 (see
[NOTICE](https://github.com/iov-one/iov-core/blob/master/NOTICE) and
[LICENSE](https://github.com/iov-one/iov-core/blob/master/LICENSE)).
