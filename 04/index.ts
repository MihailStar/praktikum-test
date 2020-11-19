const $canvas = document.querySelector('#canvas') as HTMLCanvasElement;

if (!($canvas instanceof HTMLCanvasElement)) {
  throw new Error('Canvas not found');
}

const context = $canvas.getContext('2d') as CanvasRenderingContext2D;

if (!(context instanceof CanvasRenderingContext2D)) {
  throw new Error('Context not found');
}

const canvasSize = { width: 400, height: 400 };
const dpr = window.devicePixelRatio ?? 1;

$canvas.style.width = `${canvasSize.width}px`;
$canvas.style.height = `${canvasSize.height}px`;
$canvas.width = Math.floor(canvasSize.width * dpr);
$canvas.height = Math.floor(canvasSize.height * dpr);

context.scale(dpr, dpr);

function clear(): void {
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvasSize.width, canvasSize.height);
}

function renderRect(x: number, y: number, width: number, height: number): void {
  Array.apply(null, { length: height } as Array<undefined>).forEach(
    (_, yIndex) => {
      Array.apply(null, { length: width } as Array<undefined>).forEach(
        (_, xIndex) => {
          const nextX = (x + xIndex) % canvasSize.width;
          const nextY = (y + yIndex) % canvasSize.height;

          context.fillRect(
            nextX < 0 ? nextX + canvasSize.width : nextX,
            nextY < 0 ? nextY + canvasSize.height : nextY,
            1,
            1
          );
        }
      );
    }
  );
}

const verticalLine = { width: 16, height: 150 };
const horizontalLine = { width: 100, height: 16 };
const lineToLine = 22;

function render(offsetX = 0, offsetY = 0): void {
  context.fillStyle = 'white';
  renderRect(
    offsetX,
    offsetY + horizontalLine.height + lineToLine,
    verticalLine.width,
    verticalLine.height
  );
  renderRect(
    offsetX + verticalLine.width + lineToLine,
    offsetY,
    horizontalLine.width,
    horizontalLine.height
  );
  renderRect(
    offsetX +
      verticalLine.width +
      lineToLine +
      horizontalLine.width +
      lineToLine,
    offsetY + horizontalLine.height + lineToLine,
    verticalLine.width,
    verticalLine.height
  );
}

function keyInOffset(key: KeyTrigger): [number, number] {
  const [
    previousOffsetX,
    previousOffsetY,
  ] = (keyInOffset as KeyInOffsetWithPreviousOffset).previousOffset;
  const [defaultOffsetX, defaultOffsetY] = [25, 25];
  const map: {
    [key in KeyTrigger]: [number, number];
  } = Object.create(null);

  map.ArrowUp = [previousOffsetX + 0, previousOffsetY - defaultOffsetY];
  map.ArrowRight = [previousOffsetX + defaultOffsetX, previousOffsetY + 0];
  map.ArrowDown = [previousOffsetX + 0, previousOffsetY + defaultOffsetY];
  map.ArrowLeft = [previousOffsetX - defaultOffsetX, previousOffsetY + 0];

  (keyInOffset as KeyInOffsetWithPreviousOffset).previousOffset = map[key];

  return map[key] ?? [0, 0];
}

type KeyTrigger = 'ArrowUp' | 'ArrowRight' | 'ArrowDown' | 'ArrowLeft';

type KeyInOffsetWithPreviousOffset = typeof keyInOffset & {
  previousOffset: [number, number];
};

function onKeyDown(event: KeyboardEvent): void {
  const { key } = event;
  const keysTriggers: Array<KeyTrigger> = [
    'ArrowUp',
    'ArrowRight',
    'ArrowDown',
    'ArrowLeft',
  ];

  if (keysTriggers.some((keyTrigger) => keyTrigger === key)) {
    const [offsetX, offsetY] = keyInOffset(key as KeyTrigger);

    clear();
    render(offsetX, offsetY);
  }
}

const [initialOffsetX, initialOffsetY] = [
  (canvasSize.width -
    verticalLine.width -
    lineToLine -
    horizontalLine.width -
    lineToLine -
    verticalLine.width) /
    2,
  (canvasSize.height -
    horizontalLine.height -
    lineToLine -
    verticalLine.height) /
    2,
];

clear();
render(initialOffsetX, initialOffsetY);

(keyInOffset as KeyInOffsetWithPreviousOffset).previousOffset = [
  initialOffsetX,
  initialOffsetY,
];

document.addEventListener('keydown', onKeyDown);
