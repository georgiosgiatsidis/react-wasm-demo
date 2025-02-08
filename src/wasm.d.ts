declare module '@/wasm/image_filter.js' {
  interface Module {
    _grayscale: (ptr: number, width: number, height: number) => void;
    _sepia: (ptr: number, width: number, height: number) => void;
    _invert: (ptr: number, width: number, height: number) => void;
    _blur: (ptr: number, width: number, height: number) => void;
    _malloc: (size: number) => number;
    _free: (ptr: number) => void;
    HEAPU8: Uint8Array;
    cwrap: (
      ident: string,
      returnType: string | null,
      argTypes: string[]
    ) => (...args: any[]) => any;
  }

  const moduleFactory: (moduleArg?: any) => Promise<Module>;
  export default moduleFactory;
}
