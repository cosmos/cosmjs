# Start the build environment
# https://hub.docker.com/_/node/
FROM node:12.14-alpine AS build-env

ADD package.json yarn.lock tsconfig.json lerna.json /build_repo_root/
ADD packages/bcp /build_repo_root/packages/bcp
ADD packages/faucet /build_repo_root/packages/faucet

WORKDIR /build_repo_root
RUN yarn install --frozen-lockfile
RUN yarn build

# Start the runtime environment
FROM node:12.14-alpine
COPY --from=build-env /build_repo_root/package.json /run_repo_root/
COPY --from=build-env /build_repo_root/yarn.lock /run_repo_root/
COPY --from=build-env /build_repo_root/packages /run_repo_root/packages
WORKDIR /run_repo_root
RUN yarn install --frozen-lockfile --production

EXPOSE 8000
ENTRYPOINT ["/run_repo_root/packages/faucet/bin/cosmwasm-faucet"]
CMD [""]
