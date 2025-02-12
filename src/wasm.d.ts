declare module '@/wasm/image_filter.js' {
  export interface Module {
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

  const moduleFactory: ({
    preRun,
    onRuntimeInitialized,
    postRun,
    onAbort,
  }?: Partial<{
    preRun: (() => void)[];
    onRuntimeInitialized: () => void;
    postRun: (() => void)[];
    onAbort: (err: unknown) => void;
  }>) => Promise<Module>;

  export default moduleFactory;
}
