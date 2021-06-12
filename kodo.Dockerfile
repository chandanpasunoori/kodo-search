FROM node
WORKDIR /app
COPY package* ./
RUN npm ci
COPY . .
RUN npm run build kodo-service
EXPOSE 3000
CMD [ "node", "/app/dist/apps/kodo-search/main.js" ]