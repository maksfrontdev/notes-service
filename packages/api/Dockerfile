FROM node:16.17.0-alpine3.16 as build

ENV MONOREPO_WORKDIR=/project
ENV PROJECT_WORKDIR=/project/packages/api

RUN apk update && apk add --no-cache git=2.36.2-r0

RUN mkdir -p $MONOREPO_WORKDIR
WORKDIR $MONOREPO_WORKDIR/

COPY package.json yarn.lock tsconfig.json $MONOREPO_WORKDIR/
COPY typings $MONOREPO_WORKDIR/typings
COPY packages/api/package.json $MONOREPO_WORKDIR/packages/api/
RUN yarn --ignore-scripts

COPY packages/api $PROJECT_WORKDIR
WORKDIR $PROJECT_WORKDIR/
RUN yarn build

RUN yarn --production --ignore-scripts
ENV NODE_ENV production

HEALTHCHECK NONE
EXPOSE 4000

CMD ["node", "dist/index.js"]
