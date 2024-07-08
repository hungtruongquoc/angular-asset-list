# Step 1: Build the Angular app
FROM node:18 as build

# Set the working directory
WORKDIR /app

# Add a build argument for the environment variable
ARG FONTAWESOME_PACKAGE_TOKEN
ARG USERNAME
ARG PASSWORD

# Export the environment variable
ENV FONTAWESOME_PACKAGE_TOKEN=$FONTAWESOME_PACKAGE_TOKEN
ENV USERNAME=$USERNAME
ENV PASSWORD=$PASSWORD

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
FROM node:18 as production

# Set the working directory
WORKDIR /app

# Add a build argument for the environment variable
ARG FONTAWESOME_PACKAGE_TOKEN
ARG USERNAME
ARG PASSWORD

# Export the environment variable
ENV FONTAWESOME_PACKAGE_TOKEN=$FONTAWESOME_PACKAGE_TOKEN
ENV USERNAME=$USERNAME
ENV PASSWORD=$PASSWORD

# Copy the built Angular app and server from the previous stage
COPY --from=build /app/dist/angular-asset-list/browser /app/dist/browser
COPY --from=build /app/dist/angular-asset-list/server /app/dist/server

# Install only the production dependencies
COPY package*.json ./
COPY .npmrc ./
RUN npm install --only=production

ENV PORT 8080

# Expose port 8080
EXPOSE 8080

# Start the Angular Universal server
CMD ["node", "dist/server/server.mjs"]
