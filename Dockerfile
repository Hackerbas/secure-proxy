FROM node:22
WORKDIR /app

# Copy files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your code
COPY . .

# Set permissions (Security Best Practice)
RUN chown -R node:node /app
USER node

# Match Koyeb's default port
ENV PORT=8000
EXPOSE 8000

# Start the secure server
CMD ["node", "server.js"]
