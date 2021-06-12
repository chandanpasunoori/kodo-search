FROM node
WORKDIR /app
COPY package* ./
RUN npm ci
COPY . .
RUN npm run build search-service
CMD [ "node", "/app/dist/apps/search-service/main.js" ]