# stage 1
FROM node:latest as node
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps --force
COPY . .
RUN npm run build

# stage 2
FROM nginx:latest
EXPOSE 4200
COPY --from=node /usr/src/app/dist/app-test /usr/share/nginx/html

