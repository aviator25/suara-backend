FROM node:12
WORKDIR /usr/app
COPY ./package.json .  
RUN npm install
COPY . .
EXPOSE 8080
EXPOSE 3000
EXPOSE 4000
CMD ["npm", "run", "serve"] 
