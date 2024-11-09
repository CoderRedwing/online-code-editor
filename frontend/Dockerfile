# Use official Node.js image from the Docker Hub
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the React app
RUN npm run build

# Install a lightweight HTTP server to serve the built app
RUN npm install -g serve

# Expose the port the frontend runs on
EXPOSE 4000

# Serve the app
CMD ["serve", "-s", "build"]
