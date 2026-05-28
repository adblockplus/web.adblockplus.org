# Use the official lightweight Node.js 22 image.
# https://hub.docker.com/_/node
FROM node:22-slim

# Apply OS security updates. The upstream node:22-slim tag refreshes on a lag
# behind Debian point releases, so without this step a fresh build can still
# ship CVE-vulnerable apt packages (e.g. Wiz finding CVE-2026-3833 on
# libgnutls30 < 3.7.9-2+deb12u7).
RUN apt-get update \
    && apt-get -y upgrade \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install non-dev dependencies.
RUN npm install --omit=dev

# Copy local code to the container image.
COPY . ./

# Run the web service on container startup.
CMD [ "npm", "start" ]
