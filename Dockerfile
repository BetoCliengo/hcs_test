# Use official Node.js LTS image with the correct Node version
FROM node:18.17.1-alpine

# Create app directory inside container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json if present
COPY package*.json ./

# Install dependencies (with npm)
RUN npm install

# Copy the rest of the app source code
COPY . .

# Build the TypeScript files
RUN npm run build

# Expose port your app runs on
EXPOSE 3000

# Start the app from the compiled JS in dist/
CMD ["node", "dist/server.js"]
