FROM node:14.5.0-alpine3.11

ENV NODE_ENV production

# app location in docker container
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","start"]