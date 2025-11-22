FROM node:22-alpine as build

WORKDIR /app

COPY package*.json /app/

RUN npm ci

COPY . /app/

CMD npm start
