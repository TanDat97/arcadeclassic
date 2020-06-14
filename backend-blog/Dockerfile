FROM node:10.15.3-alpine

RUN mkdir -p /app/backend/node_modules && chown -R node:node /app/backend

# set working directory
WORKDIR /app/backend

COPY package*.json ./
USER node
RUN npm install
COPY --chown=node:node . .

# add app
COPY ./ ./

EXPOSE 5000

CMD [ "npm", "start" ]
