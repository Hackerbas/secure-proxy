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

# Hugging Face listens on port 7860
ENV PORT=7860
EXPOSE 7860

# Start the secure server
CMD ["node", "server.js"]
