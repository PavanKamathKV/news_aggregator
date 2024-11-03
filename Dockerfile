FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build"]