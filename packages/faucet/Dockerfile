# Build:
#   docker build -t confio/cosmos-faucet:manual -f packages/faucet/Dockerfile .
# Run:
#   docker run --rm confio/cosmos-faucet:manual version

FROM node:14-alpine as build-env

ADD . /app
WORKDIR /app

RUN apk add --update --no-cache alpine-sdk linux-headers build-base gcc libusb-dev python3 eudev-dev && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

RUN yarn install && yarn run build

FROM node:14-alpine
COPY --from=build-env /app /app
WORKDIR /app

EXPOSE 8000
ENTRYPOINT ["yarn", "node", "/app/packages/faucet/bin/cosmos-faucet"]
