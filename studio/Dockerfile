FROM node:10.15.3-alpine

# set working directory
WORKDIR /app/frontend

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/frontend/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json ./
RUN npm install --silent
RUN npm install react-scripts@3.1.2 -g --silent

# add app
COPY ./ ./

EXPOSE 3000

# start app
CMD ["npm", "start"]
