# Use same Node.js version as local machine
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source code
COPY . .

# Expose the port your app listens on
EXPOSE 8080

# Start the app
CMD ["node", "app.js"]
