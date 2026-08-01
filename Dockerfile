# Stage 1: Build Next.js app (bookstore)
FROM node:20-alpine AS bookstore-builder
WORKDIR /app/bookstore
COPY bookstore/package*.json ./
RUN npm ci
COPY bookstore/ ./
# Enable static export for Next.js
RUN npx next build

# Stage 2: Build Vite app (theabbiestore)
FROM node:20-alpine AS abbie-builder
WORKDIR /app/theabbiestore
COPY theabbiestore/package*.json ./
RUN npm ci
COPY theabbiestore/ ./
# Build Vite project with base path /model-2/
RUN npx vite build --base=/model-2/

# Stage 3: Nginx Final Runner
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Clean default nginx directory
RUN rm -rf ./*

# Copy Root Landing Page
COPY index.html ./index.html

# Copy Model 1 (Next.js export)
COPY --from=bookstore-builder /app/bookstore/out ./model-1

# Copy Model 2 (Vite export)
COPY --from=abbie-builder /app/theabbiestore/dist ./model-2

# Copy Model 3 (Store HTML file)
COPY Store/code.html ./model-3/index.html
COPY Store/gold_heart_clips.png ./model-3/
COPY Store/screen.png ./model-3/

# Copy Custom Nginx Config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
