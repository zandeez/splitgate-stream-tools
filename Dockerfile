FROM node:latest as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:latest
WORKDIR /app
COPY --from=build /app/build /app
COPY package.json /app
EXPOSE 3000
CMD [ "node", "." ]
