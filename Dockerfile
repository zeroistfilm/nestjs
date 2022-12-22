FROM node:18.12.0

WORKDIR /dropbase
COPY . .
RUN yarn install
CMD ["yarn","start:prod"]