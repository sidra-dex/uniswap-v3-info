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


FROM nginx:alpine

COPY --from=builder /app/build /var/www/html

# Copy the default nginx.conf
COPY --from=builder /app/nginx.conf /etc/nginx.conf



