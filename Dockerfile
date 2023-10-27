# Node.js environment
FROM node:14 AS node_env

WORKDIR /app
COPY ./path_to_your_node_app/ ./
RUN npm install
RUN npm run build  # Only if you have a build step

# Python environment
FROM python:3.10

WORKDIR /app

# Install Node.js app from the previous stage
COPY --from=node_env /app /app/node_app

# Copy Flask app and install dependencies
COPY ./path_to_your_flask_app/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY ./path_to_your_flask_app/ ./

# Expose the ports your apps will run on
EXPOSE 5000 3000

# Use concurrently or another method to run both servers
CMD ["sh", "-c", "cd node_app && nodemon index.js & flask run --host=0.0.0.0 --port=5000"]
