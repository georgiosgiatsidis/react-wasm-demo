export async function loadWasmModule() {
  const Module = await import('@/wasm/image_filter.js');
  const wasmModule = await Module.default();

  const filters = {
    grayscale: wasmModule.cwrap<void, number[]>('grayscale', null, [
      'number',
      'number',
      'number',
    ]),
    sepia: wasmModule.cwrap<void, number[]>('sepia', null, [
      'number',
      'number',
      'number',
    ]),
    invert: wasmModule.cwrap<void, number[]>('invert', null, [
      'number',
      'number',
      'number',
    ]),
    blur: wasmModule.cwrap<void, number[]>('blur', null, [
      'number',
      'number',
      'number',
    ]),
  };

  return {
    filters,
    wasmModule,
  };
}
