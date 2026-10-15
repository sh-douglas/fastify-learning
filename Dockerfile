FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY src ./src
COPY tsconfig.json ./

RUN npm run build

CMD ["node", "dist/server.js"]
