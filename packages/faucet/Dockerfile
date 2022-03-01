FROM node:14-alpine

ADD . /app
WORKDIR /app

RUN apk add --update --no-cache alpine-sdk linux-headers build-base gcc libusb-dev python3 eudev-dev && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

RUN yarn install && yarn run build

EXPOSE 8000
ENTRYPOINT ["/app/packages/faucet/bin/cosmos-faucet"]
CMD ["node", "/app/packages/faucet/bin/cosmos-faucet"]