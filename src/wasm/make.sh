emcc image_filter.c -o image_filter.js -sEXPORTED_FUNCTIONS=_grayscale,_sepia,_invert,_blur,_malloc,_free -sEXPORTED_RUNTIME_METHODS=ccall,cwrap -sMODULARIZE=1 -sEXPORT_ES6=1
