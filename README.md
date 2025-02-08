# WASM React Demo

This project is a simple React application that demonstrates how to integrate WebAssembly (WASM) with React. The WebAssembly module is written in C and compiled to WASM using Emscripten.

The C code exports several image processing functions, such as grayscale, invert, and blur, which can be called from JavaScript. This allows for efficient image processing directly in the browser.

## Running the app using Docker

Make sure you have Docker installed on your machine.

### Build the Docker container
```sh
docker build -t wasm-react-app .
```

### Run the Docker container
```sh
docker run -it -p 5173:5173 wasm-react-app
```