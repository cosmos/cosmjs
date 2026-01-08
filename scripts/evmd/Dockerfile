FROM golang:alpine AS builder

# Install dependencies
RUN apk add --no-cache git make gcc musl-dev linux-headers ca-certificates

# Set working directory
WORKDIR /build

# Clone the cosmos/evm repository
ARG EVMD_VERSION=v0.5.1
RUN git clone https://github.com/cosmos/evm.git && \
    cd evm && \
    git checkout ${EVMD_VERSION}

# Build evmd using make
WORKDIR /build/evm
# Allow Go to download and use the required toolchain version
RUN GOTOOLCHAIN=auto make build && \
    cp build/evmd /usr/local/bin/evmd

# Final stage
FROM alpine:latest

# Install runtime dependencies (including C libraries needed for CGO-enabled binary)
RUN apk add --no-cache bash curl jq libgcc libstdc++

# Copy evmd binary from builder
COPY --from=builder /usr/local/bin/evmd /usr/local/bin/evmd
RUN chmod +x /usr/local/bin/evmd

# Set working directory
WORKDIR /root

# Expose ports
EXPOSE 26656 26657 1317 9090

# Default command
CMD ["evmd"]
