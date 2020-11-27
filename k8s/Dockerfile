FROM node:12

ENV HOST 0.0.0.0
ENV TZ=Asia/Bangkok
ENV CYPRESS_INSTALL_BINARY=0
ARG NPM_REGISTRY_URL=http://repo01.aspiron.co.th:8081/repository/npm-group/
ARG NPM_NODESASS_URL=http://repo01.aspiron.co.th:8081/repository/node-sass-proxy/

RUN npm config set registry ${NPM_REGISTRY_URL}
RUN npm config set sass-binary-site=${NPM_NODESASS_URL} --global
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN mkdir -p /app/kpiclaim
WORKDIR /app/kpiclaim

RUN npm config set registry ${NPM_REGISTRY_URL}
RUN npm config set sass-binary-site=${NPM_NODESASS_URL} --global
ADD package.json /app/kpiclaim/package.json
ADD package-lock.json /app/kpiclaim/package-lock.json
RUN npm ci
RUN rm -rf ~/.npm
ADD . /app/kpiclaim/

RUN rm -f yarn.lock
RUN npm run build:asp

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD ["npm", "run", "start:asp"]
