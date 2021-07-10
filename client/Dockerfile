FROM node:latest

WORKDIR /frontend

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . . 

# added
# RUN npm run build
# cannot build from compose up, it breaks

# removed
# EXPOSE 3000
