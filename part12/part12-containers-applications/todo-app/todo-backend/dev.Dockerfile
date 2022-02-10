FROM node@sha256:b2da3316acdc2bec442190a1fe10dc094e7ba4121d029cb32075ff59bb27390a

ENV NODE_ENV=development

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD [ "npm", "run", "dev" ]
