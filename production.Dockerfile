FROM node:12-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm i --only=production

COPY ./build ./build

# Need github env vars
# ARG CI_COMMIT_TAG
# ENV CI_COMMIT_TAG=$CI_COMMIT_TAG

CMD ["npm", "start"]