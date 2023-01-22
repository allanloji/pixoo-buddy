FROM node:18

WORKDIR /pixoo-partner

COPY package*.json ./

RUN npm install 

COPY . .

CMD ["npm", "run" ,"start:dev"]
