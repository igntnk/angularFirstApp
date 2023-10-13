# stage 1
FROM node:18-alpine as node
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps --force
COPY . .
RUN npm run build

# stage 2
FROM nginx:1.17.1-alpine
EXPOSE 80
COPY --from=node /usr/src/app/dist/app-test /usr/share/nginx/html

