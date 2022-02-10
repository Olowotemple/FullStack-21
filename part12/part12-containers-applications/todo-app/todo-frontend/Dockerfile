FROM node@sha256:b2da3316acdc2bec442190a1fe10dc094e7ba4121d029cb32075ff59bb27390a

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install

RUN chown node:node node_modules/

RUN CI=true npm test

USER node

CMD [ "npm", "start" ]