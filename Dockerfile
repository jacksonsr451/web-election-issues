FROM node:20.15.1 as build-stage

WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:20.15.1 AS production-stage

WORKDIR /app

COPY --from=build-stage /app/dist /app/dist
COPY --from=build-stage /app/node_modules /app/node_modules

RUN yarn add serve

EXPOSE 3000