FROM ghcr.io/puppeteer/puppeteer:22.8.0

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .
CMD [ "node", "./dist/server.js" ]