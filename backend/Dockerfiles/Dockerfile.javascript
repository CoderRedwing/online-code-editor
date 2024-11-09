# Use a lightweight Node.js image
FROM node:16-alpine

# Set working directory
WORKDIR /usr/src/app

# Command to run JavaScript code
CMD ["node", "main.js"]
