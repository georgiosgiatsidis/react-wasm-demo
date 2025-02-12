import { Filter } from '@/types/Filter';
import { Module } from '@/wasm/image_filter.js';

let wasmModuleCache: Module;
let filtersCache: Record<Filter, (...args: number[]) => void>;

export async function getWasmModule() {
  if (!wasmModuleCache || !filtersCache) {
    const { wasmModule, filters } = await loadWasmModule();
    wasmModuleCache = wasmModule;
    filtersCache = filters;
  }
  return { wasmModule: wasmModuleCache, filters: filtersCache };
}

async function loadWasmModule() {
  const Module = await import('@/wasm/image_filter.js');

  const wasmModule = await Module.default({
    preRun: [() => console.log('🚀 WASM is about to start!')],
    onRuntimeInitialized: () => console.log('✅ WASM is ready!'),
    postRun: [() => console.log('🏁 WASM execution finished!')],
    onAbort: (err) => console.error('❌ WASM crashed:', err),
  });

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
