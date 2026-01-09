# Use Node.js version 20 as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json first to leverage Docker's caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application for production
RUN npm run build

# Expose port 5173
EXPOSE 5173

# Start the Vite preview server
CMD ["npm", "run", "preview"]
