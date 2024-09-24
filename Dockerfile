FROM node:20-alpine AS build 

WORKDIR /usr/src/app

COPY "package*.json" ./

RUN npm install

COPY . .
EXPOSE 5000

CMD npm run dev
