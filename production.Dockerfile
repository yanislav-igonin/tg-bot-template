FROM node:14-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm i --only=production

COPY ./dist ./dist

ARG CI_COMMIT_TAG
ENV CI_COMMIT_TAG=$CI_COMMIT_TAG

CMD ["npm", "start"]