# Confio hosts a faucet build at https://hub.docker.com/r/confio/faucet
#
# Build:
#   docker build --pull -t confio/faucet:manual -f packages/faucet/Dockerfile .
# Run:
#   docker run --rm confio/faucet:manual version
#
# During the build step the working directory must be the repo root such that the
# app has access to all installed dependencies.

FROM node:14-alpine as build-env

ADD . /app
WORKDIR /app

RUN apk add --update --no-cache alpine-sdk linux-headers build-base gcc libusb-dev python3 py3-pip eudev-dev \
  && ln -sf python3 /usr/bin/python
# Do we really need to update those?
RUN pip3 install --no-cache --upgrade pip setuptools

RUN yarn install && yarn run build

FROM node:14-alpine
COPY --from=build-env /app /app
WORKDIR /app

EXPOSE 8000
ENTRYPOINT ["yarn", "node", "/app/packages/faucet/bin/cosmos-faucet"]
