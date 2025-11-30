FROM node:22.17.1

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --prod

COPY . .

COPY README.md ./README.md

EXPOSE 8080

CMD ["node", "src/app.js"]