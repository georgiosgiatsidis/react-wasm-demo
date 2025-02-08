# Use Emscripten image for compiling WebAssembly
FROM emscripten/emsdk:latest AS builder

WORKDIR /app

# Copy source code
COPY src/wasm/image_filter.c .
COPY src/wasm/make.sh .

# Make the script executable
RUN chmod +x make.sh

# Compile to WebAssembly using the make script
RUN ./make.sh

# Use Node.js for Vite frontend
FROM node:20

WORKDIR /app

# Copy frontend code
COPY . .

# Copy the built WebAssembly files
COPY --from=builder /app/image_filter.js /app/src/wasm/image_filter.js
COPY --from=builder /app/image_filter.wasm /app/src/wasm/image_filter.wasm

# run ls and log the output
RUN ls -lh /app/src/wasm/

# Install dependencies and build the React app
RUN npm install && npm run build

# Expose port for Vite dev server
EXPOSE 5173

# Run Vite server
CMD ["npm", "run", "dev", "--", "--host"]