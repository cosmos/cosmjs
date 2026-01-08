# Local EVM development network

## Building the Docker Image

Since evmd doesn't have a pre-built Docker container, you need to build it first:

```bash
cd scripts/evmd
./build.sh
```

This will:
- Clone the cosmos/evm repository (v0.5.1 stable release by default)
- Build the evmd binary
- Create a Docker image tagged as `cosmjs/evmd:v0.5.1`

**Note:** The build process requires Docker and may take 5-10 minutes on the first run.

### Building a Different Version

To build from a specific version:

```bash
EVMD_VERSION=v1.0.0-rc2 ./build.sh
```

The default version (v0.5.1) is set in the `Dockerfile` and is a stable, tested release.

## Script Structure

The evmd scripts follow the standard CosmJS pattern used by other test chains (simapp, wasmd):

- **Host scripts** (run on your machine):
  - `start.sh` - Starts the Docker container
  - `stop.sh` - Stops the Docker container
  - `init.sh` - Initializes the chain after startup
  - `cli.sh` - Provides CLI access using volume mounts
  - `build.sh` - Builds the Docker image from source
  - `generate_template.sh` - Regenerates the template directory
  - `env` - Configuration variables (image name, version, ports)

- **Container scripts** (run inside Docker):
  - `template/setup.sh` - Sets up genesis configuration
  - `template/run_evmd.sh` - Starts the evmd daemon

The template directory is generated once and reused. To regenerate it (e.g., after changing genesis configuration):

```bash
./generate_template.sh
```

## Starting the blockchain

After building the image, run the following:

```bash
cd scripts/evmd
./start.sh && ./init.sh
```

## CLI

Docker-friendly access to `evmd` is provided. Just use the `./cli.sh` script.
For example:

```
./cli.sh status
```

This should give you output similar to the following if your blockchain is
running:

```json
{
  "node_info": {
    "protocol_version": { "p2p": "8", "block": "11", "app": "0" },
    "id": "...",
    "listen_addr": "tcp://0.0.0.0:26656",
    "network": "evmd-testing",
    "version": "...",
    "channels": "...",
    "moniker": "evmd-moniker",
    "other": { "tx_index": "on", "rpc_address": "tcp://127.0.0.1:26657" }
  },
  "sync_info": {
    "latest_block_hash": "...",
    "latest_app_hash": "...",
    "latest_block_height": "...",
    "latest_block_time": "...",
    "catching_up": false
  },
  "validator_info": {
    "address": "...",
    "pub_key": {
      "type": "tendermint/PubKeyEd25519",
      "value": "..."
    },
    "voting_power": "3"
  }
}
```

## Adding the validator key to your keybase

The EVM test network is initialised with a validator. This validator has the following mnemonic:

```
gather series sample skin gate mask gossip between equip knife total stereo
```

To add the validator key to your local keybase run the following, choose an
encryption passphrase (e.g. `1234567890`) and enter the above mnemonic when
prompted:

```
./cli.sh keys add myvalidator --recover
```

## Preset accounts

The test network uses the same validator mnemonic as simapp for consistency:

**Validator**:
```
gather series sample skin gate mask gossip between equip knife total stereo
```

**Note:** The EVM chain uses 18-decimal tokens (`astake` and `aatom`) for EVM compatibility, unlike the standard 6-decimal Cosmos tokens.

## Integration with CosmJS

To enable evmd tests in your CosmJS test suite:

```bash
# Build evmd Docker image (first time only)
./scripts/evmd/build.sh

# Start evmd
./scripts/evmd/start.sh
./scripts/evmd/init.sh
export EVMD_ENABLED=1

# Optionally start slow evmd (for testing slow block times)
./scripts/evmd/slow_start.sh
export SLOW_EVMD_ENABLED=1

# Run tests
yarn test

# Stop evmd
unset SLOW_EVMD_ENABLED
unset EVMD_ENABLED
./scripts/evmd/slow_stop.sh  # if slow evmd was started
./scripts/evmd/stop.sh
```

## Slow EVM Test Network

A "slow" version of the EVM test network is available for testing scenarios that require slower block production:

```bash
# Generate the slow template (required once after any template changes)
./generate_template_slow.sh

# Start slow evmd
./slow_start.sh
```

The slow evmd:
- Runs on different ports (26662, 1322, 9092)
- Has slower block times (`timeout_commit = "10s"`)
- Runs independently alongside the regular evmd instance

## Ports

The evmd test chain uses the following ports:
- **26661**: Tendermint RPC (mapped from container port 26657)
- **1321**: REST API (mapped from container port 1317)
- **9091**: gRPC (mapped from container port 9090)

The slow evmd test chain uses different ports:
- **26662**: Tendermint RPC (mapped from container port 26657)
- **1322**: REST API (mapped from container port 1317)
- **9092**: gRPC (mapped from container port 9090)

These port assignments are documented in `HACKING.md`.
