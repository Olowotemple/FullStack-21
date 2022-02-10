FROM node@sha256:b2da3316acdc2bec442190a1fe10dc094e7ba4121d029cb32075ff59bb27390a

RUN apk add dumb-init

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY --chown=node:node . /usr/src/app

RUN npm ci --only=production

USER node

CMD ["dumb-init", "npm", "start"]
