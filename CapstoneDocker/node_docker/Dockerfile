FROM node:latest
RUN mkdir /website 
WORKDIR /website 
COPY . /website
RUN npm install
RUN npm install websocket
RUN npm install fs
CMD ["node","server.js"]
EXPOSE 3000