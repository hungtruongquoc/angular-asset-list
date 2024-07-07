# Step 1: Build the Angular app
FROM node:18 as build

# Set the working directory
WORKDIR /app

# Add a build argument for the environment variable
ARG FONTAWESOME_PACKAGE_TOKEN

# Export the environment variable
ENV FONTAWESOME_PACKAGE_TOKEN=$FONTAWESOME_PACKAGE_TOKEN

# Copy the package.json and package-lock.json files
COPY package*.json ./
COPY .npmrc ./.npmrc

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build --prod

# Step 2: Serve the Angular app with Nginx
FROM nginx:alpine

# Add a build argument for the environment variable
ARG FONTAWESOME_PACKAGE_TOKEN

# Export the environment variable
ENV FONTAWESOME_PACKAGE_TOKEN=$FONTAWESOME_PACKAGE_TOKEN

# Copy the built Angular app from the previous stage
COPY --from=build /app/dist/angular-asset-list/browser /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 8080
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
