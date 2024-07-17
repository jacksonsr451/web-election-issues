FROM node:22 as build-stage

WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:22 AS production-stage

WORKDIR /app

COPY --from=build-stage /app/dist /app/dist
COPY --from=build-stage /app/node_modules /app/node_modules

RUN yarn add -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]