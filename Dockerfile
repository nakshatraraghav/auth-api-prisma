FROM node:20-alpine

COPY package.json /app/

COPY pnpm-lock.yaml /app/

COPY prisma /app/

COPY src /app

COPY .env /app/

COPY tsconfig.json /app/

WORKDIR /app

RUN npm install -g pnpm 

RUN pnpm install

CMD [ "pnpm", "serve:prod" ]