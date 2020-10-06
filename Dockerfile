#  Dockerfile for Node Express Backend api (development)

FROM node 

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./

RUN npm install

# Copy app source code
COPY . .
RUN cd client && yarn install 
RUN cd client && npm run build

ENV NODE_ENV=production

CMD ["npm","start"]