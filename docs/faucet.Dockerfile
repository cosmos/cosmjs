# The only officially supported distribution channel of the faucet binary is @cosmwasm/faucet on npmjs.com
# This is an example file of how to wrap the faucet in a docker container.
# This file will be outdated very soon, but should work as a template for your custom docker setup.

# Coose from https://hub.docker.com/_/node/
FROM node:12.14.1-alpine

RUN yarn global add @cosmwasm/faucet@0.0.8

# Check it exists
RUN /usr/local/bin/cosmwasm-faucet version

EXPOSE 8000
ENTRYPOINT ["/usr/local/bin/cosmwasm-faucet"]
CMD [""]
