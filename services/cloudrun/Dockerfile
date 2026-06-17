# Build stage: install production dependencies on a full Node.js 22 image.
# This stage is discarded — nothing from it (npm, apt, perl, shell) ships to
# the final image.
FROM node:22-slim AS builder

WORKDIR /usr/src/app

# Copy dependency manifests first so the npm install layer is cached across
# code-only changes.
COPY package*.json ./

# Install non-dev dependencies.
RUN npm install --omit=dev

# Copy local code.
COPY . ./

# Runtime stage: Google distroless Node.js 22. Contains only the node runtime
# and glibc/openssl/ca-certificates essentials — NO perl-base, NO apt, NO npm,
# NO shell.
FROM gcr.io/distroless/nodejs22-debian12

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app ./

# The distroless nodejs image's entrypoint is `node`; CMD supplies the script
# (equivalent to the previous `node index.js`).
CMD ["index.js"]
