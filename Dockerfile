
# Use a Node 18 base image
FROM node:18-alpine

# Set the working directory to /app inside the container
WORKDIR /app

# Copy app files
COPY . .

# Install dependencies
RUN npm ci --force

# Set the env to 'Production'
ENV NODE_ENV Production

# Expose the port on which the app will be running
# 3000 is the default that 'npm start' uses
Expose 3000

# Start the app in production mode
CMD ["npm", "run", "start:prod"]