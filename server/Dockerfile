FROM node:12.14.0

COPY . /app

ENV NODE_ENV development

WORKDIR /app

RUN yarn

EXPOSE 8069

CMD ["yarn", "start"]