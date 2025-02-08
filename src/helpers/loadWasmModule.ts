export async function loadWasmModule() {
  const Module = await import('@/wasm/image_filter.js');
  const wasmModule = await Module.default();

  const filters = {
    grayscale: wasmModule.cwrap('grayscale', null, [
      'number',
      'number',
      'number',
    ]),
    sepia: wasmModule.cwrap('sepia', null, ['number', 'number', 'number']),
    invert: wasmModule.cwrap('invert', null, ['number', 'number', 'number']),
    blur: wasmModule.cwrap('blur', null, ['number', 'number', 'number']),
  };

  return {
    filters,
    wasmModule,
  };
}
