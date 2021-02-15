FROM node:12-alpine

RUN npm i -g lerna && mkdir -p /app

COPY . /app
WORKDIR /app

RUN yarn install --frozen-lockfile --silent

EXPOSE 5005

CMD yarn start

