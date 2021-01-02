FROM node:10.12-alpine
LABEL maintainer="Dat"
ARG JFROG_USERNAME
ARG JFROG_PASSWORD
ENV JFROG_USERNAME=${JFROG_USERNAME}
ENV JFROG_PASSWORD=${JFROG_PASSWORD}
WORKDIR /var/source

COPY --chown=node:node . ./
RUN apk add curl
RUN echo "@airasia:registry=https://airasia.jfrog.io/artifactory/api/npm/cosmos-npm/" > .npmrc
RUN curl -u"$JFROG_USERNAME:$JFROG_PASSWORD" https://airasia.jfrog.io/artifactory/api/npm/auth >> .npmrc

RUN npm install && npm run build

USER node

ENTRYPOINT ["npm", "run", "start"]
