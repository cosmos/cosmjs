# Confio hosted a faucet build at https://hub.docker.com/r/confio/faucet
# until 2025. However, this is not provided anymore. If you need a dockerized
# version of this app, you can build and publish it yourself from source using
# this Dockerfile. The dummyorg/faucet is an arbitrary image name you need to replace.
#
# Build:
#   docker build --pull -t dummyorg/faucet:manual -f packages/faucet/Dockerfile .
# Run:
#   docker run --rm dummyorg/faucet:manual version
#
# During the build step the working directory must be the repo root such that the
# app has access to all local @cosmjs/* dependencies.
#
# For releases the "manual" tag should be replaced with a specific version.

FROM node:22-alpine AS build-env

ADD . /app
WORKDIR /app

RUN apk add --update --no-cache alpine-sdk linux-headers build-base gcc libusb-dev python3 py3-pip eudev-dev
RUN ln -sf python3 /usr/bin/python

RUN yarn install && yarn run build
RUN (cd packages/faucet && SKIP_BUILD=1 yarn pack-node)

# Use Alpine and install Node.js which is 50% smaller than the -alpine version of the node
# image (53 MB including the faucet app).
FROM alpine:3.22
# Installs Node.js 22 (https://pkgs.alpinelinux.org/packages?name=nodejs&branch=v3.22)
RUN apk add --update nodejs

COPY --from=build-env /app/packages/faucet /app/packages/faucet
WORKDIR /app

EXPOSE 8000
ENTRYPOINT ["/app/packages/faucet/bin/cosmos-faucet-dist"]
