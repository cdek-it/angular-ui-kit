# Stage 1: Build the Angular app
FROM docker-private.cdek.ru/node:18.20-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
COPY .npmrc ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the Angular app with Nginx
FROM docker-private.cdek.ru/nginx-1.21:alpine
COPY --from=builder /usr/src/app/dist/primeng/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
