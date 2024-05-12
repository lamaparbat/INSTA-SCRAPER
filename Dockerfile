FROM ghcr.io/puppeteer/puppeteer:22.8.0

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD [ "npm", "start" ]