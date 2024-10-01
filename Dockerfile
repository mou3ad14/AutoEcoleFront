# Build stage
FROM node:16 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy the build files to Nginx
COPY --from=build /app/dist/auto-ecole-front /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

# Use environment variable to specify the backend URL at runtime
ENV BACKEND_URL=http://81.0.247.161:8080

# Copy and set the entrypoint script
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
