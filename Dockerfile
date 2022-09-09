# pull official base image
FROM node:14-alpine as builder

# Run container as unprivileged user
USER node

RUN mkdir -p /home/node/app

# set working directory
WORKDIR /home/node/app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /home/node/app/node_modules/.bin:$PATH

# copy package json into project (and create a directory at root for node_modules)
COPY package.json *yarn* ./

COPY --chown=node:node . .
RUN chown -R node:node /home/node/app

# Installs all node packages
RUN yarn --silent
RUN yarn global add react-scripts@4.0.0 --silent
RUN yarn global add postcss-cli@7.1.1 --silent

ARG REACT_APP_ENVIRONMENT
ENV REACT_APP_ENVIRONMENT=${REACT_APP_ENVIRONMENT}

EXPOSE 3000

CMD ["yarn", "start"]
