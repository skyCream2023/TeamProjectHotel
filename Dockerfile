FROM node:20.11.0-alpine

WORKDIR /TeamProject/frontend

COPY package.json package-lock.json ./
RUN npm install
COPY . ./
EXPOSE 3000

CMD ["npm", "run", "start"]