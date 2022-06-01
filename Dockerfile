FROM node:latest

WORKDIR /usr/app
COPY . /usr/app

RUN npm install yarn
RUN yarn install

CMD ["yarn", "start"]