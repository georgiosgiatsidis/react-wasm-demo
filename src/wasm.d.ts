declare module '@/wasm/image_filter.js' {
  interface Module {
    _grayscale: (ptr: number, width: number, height: number) => void;
    _sepia: (ptr: number, width: number, height: number) => void;
    _invert: (ptr: number, width: number, height: number) => void;
    _blur: (ptr: number, width: number, height: number) => void;
    _malloc: (size: number) => number;
    _free: (ptr: number) => void;
    HEAPU8: Uint8Array;
    cwrap: <R, A extends unknown[]>(
      ident: string,
      returnType: string | null,
      argTypes: string[]
    ) => (...args: A) => R;
  }

  const moduleFactory: () => Promise<Module>;
  export default moduleFactory;
}
