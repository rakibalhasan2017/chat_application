# Use Node.js version 20 as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend files into the container
COPY . .

# Expose port 5000 to make the backend accessible
EXPOSE 5000

# Start the backend server
CMD ["npm", "run", "dev"]
