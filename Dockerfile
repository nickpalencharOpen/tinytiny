FROM node:6.11.3

RUN mkdir /app

WORKDIR /app

COPY package.json /app

RUN npm install
RUN node -v

COPY . /app

EXPOSE 3000

CMD ["npm", "start"]
