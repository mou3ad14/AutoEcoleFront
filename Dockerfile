# Use an official Node.js runtime as a parent image
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Angular app
RUN npm run build

# Use Nginx to serve the app
FROM nginx:alpine

# Copy the build files to Nginx
COPY --from=build /app/dist/auto-ecole-front /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
