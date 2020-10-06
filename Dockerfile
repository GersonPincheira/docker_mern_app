#  Dockerfile for Node Express Backend api (development)

FROM node:current-alpine

ARG PORT

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./

RUN npm ci

# Copy app source code
COPY . .
RUN cd client && yarn install 
RUN cd client && npm run build
# Exports
EXPOSE $PORT

CMD ["npm","start"]