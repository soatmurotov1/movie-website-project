FROM node:20-alpine

WORKDIR /movie_website_project

COPY package*.json ./
COPY prisma ./prisma 

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]
