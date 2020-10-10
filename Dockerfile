FROM node:14.5.0-alpine3.11
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 3000
CMD node src/index.js