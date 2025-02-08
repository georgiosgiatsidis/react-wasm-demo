import { loadWasmModule } from '@/helpers/loadWasmModule';
import { Filter } from '@/types/Filter';

export async function processImage(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  filter: Filter
) {
  const { wasmModule, filters } = await loadWasmModule();

  // Allocate memory in WebAssembly
  const buffer = wasmModule._malloc(data.length);
  wasmModule.HEAPU8.set(data, buffer);

  // Apply selected filter
  filters[filter](buffer, width, height);

  // Get processed image data
  const output = new Uint8ClampedArray(
    wasmModule.HEAPU8.subarray(buffer, buffer + data.length)
  );
  wasmModule._free(buffer);

  return output;
}
