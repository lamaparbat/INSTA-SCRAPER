# Stage 1: Build the application
FROM node:slim as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build

# Stage 2: Create production image
FROM node:slim

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Install necessary dependencies
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app
COPY package*.json ./
COPY .env ./

RUN npm install --omit=dev

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/assets ./assets
COPY --from=builder /usr/src/app/ ./node_modules

EXPOSE 8888

CMD ["npm", "start"]