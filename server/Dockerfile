FROM node:lts-slim 
WORKDIR /usr/app
COPY ../package.json .
RUN "npm install"
COPY ../ .
CMD ["node", "server/index.js]