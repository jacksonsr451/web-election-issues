FROM node:22

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

COPY --from=build-stage /app/dist /app/dist
COPY --from=build-stage /app/node_modules /app/node_modules

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]