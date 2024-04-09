# Fetching the minified node image on apline linux
FROM node:slim

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /app

# Copying all the files in our project
COPY ./package.json ./package.json
COPY ./src ./src

# Installing dependencies
RUN npm install

# Starting our application
CMD [ "node", "src/index.js" ]

# Exposing server port
EXPOSE 3000