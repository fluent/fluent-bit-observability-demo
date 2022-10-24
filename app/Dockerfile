FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["/bin/bash", "-c", "node tracing.js; node metrics.js"]
