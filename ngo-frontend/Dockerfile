# Stage 1: Build React application
FROM node:22-alpine AS build

WORKDIR /app

# Copy dependency files first for Docker layer caching
COPY package*.json ./

# Install exact dependencies
RUN npm ci

# Copy frontend source code
COPY . .

# Build production files
RUN npm run build


# Stage 2: Serve application using Nginx
FROM nginx:alpine

# Upgrade Alpine packages to patched versions
RUN apk update && apk upgrade --no-cache

# Remove default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy production build
COPY --from=build /app/dist /usr/share/nginx/html

# Add custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]