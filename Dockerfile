# First stage: builder
FROM node:slim AS builder

# We don't need the standalone Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Install necessary dependencies
RUN apt-get update && apt-get install -y wget gnupg

# Add Google Chrome repo
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list

# Install Google Chrome
RUN apt-get update && apt-get install -y google-chrome-stable

WORKDIR /app

COPY package.json ./

RUN npm install --omit=dev

COPY . .

RUN npm run build

# Second stage: final image
FROM node:slim

WORKDIR /app

COPY --from=builder /app/.env ./.env
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/assets ./assets
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /usr/bin/google-chrome /usr/bin/google-chrome

EXPOSE 8888

CMD ["npm", "start"]
