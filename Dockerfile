### STAGE 1: Build ###
FROM node:14.20-alpine as build-step
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm i -g @angular/cli

# Install app dependencies:
RUN npm i

COPY . .
RUN ng build --c=production

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-step /usr/src/app/dist/* /usr/share/nginx/html
