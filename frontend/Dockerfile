FROM node

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

RUN npm i -g serve

EXPOSE 4000

CMD [ "serve", "-s", "dist", "-l", "4000" ]