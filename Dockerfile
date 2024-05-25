# Use an official Node.js
FROM node:18-alpine as builder

# Install git
RUN apk add --no-cache git

# Set the working directory to /app
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN yarn build


FROM node:alpine

WORKDIR /app

COPY --from=builder /app/build /app

# Install serve
RUN yarn global add serve

# Expose the port the app runs on
EXPOSE 3000

# Serve the app
CMD ["serve", "-s", "/app", "-l", "3000"]



