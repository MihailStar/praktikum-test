declare const $canvas: HTMLCanvasElement;
declare const context: CanvasRenderingContext2D;
declare const canvasSize: {
  width: number;
  height: number;
};
declare const dpr: number;
declare function clear(): void;
declare function renderRect(
  x: number,
  y: number,
  width: number,
  height: number
): void;
declare const verticalLine: {
  width: number;
  height: number;
};
declare const horizontalLine: {
  width: number;
  height: number;
};
declare const lineToLine = 22;
declare function render(offsetX?: number, offsetY?: number): void;
declare function keyInOffset(key: KeyTrigger): [number, number];
declare type KeyTrigger = 'ArrowUp' | 'ArrowRight' | 'ArrowDown' | 'ArrowLeft';
declare type KeyInOffsetWithPreviousOffset = typeof keyInOffset & {
  previousOffset: [number, number];
};
declare function onKeyDown(event: KeyboardEvent): void;
declare const initialOffsetX: number, initialOffsetY: number;
