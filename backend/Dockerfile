# Use official Node.js image from the Docker Hub
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the backend port (make sure it matches the port the backend uses)
EXPOSE 5000

# Start the backend server
CMD ["npm", "run", "start"]
