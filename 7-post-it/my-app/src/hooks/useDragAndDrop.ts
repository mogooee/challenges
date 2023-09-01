import { useState } from 'react';
import { SIZE } from '../constants';

export interface Position {
  x: number;
  y: number;
}
interface MemoBoardSize {
  width: number;
  height: number;
}
interface RangePosition {
  rangeX: {
    min: number;
    max: number;
  };
  rangeY: {
    min: number;
    max: number;
  };
}
type DragStart = Pick<React.DragEvent<HTMLElement>, 'target' | 'dataTransfer'>;
type Drag = Pick<
  React.DragEvent<HTMLElement>,
  'target' | 'currentTarget' | 'pageX' | 'pageY'
>;
type ChangeZIndex = (index: number) => void;

const getRelativePosition = (
  parentElement: HTMLElement,
  childElement: HTMLElement,
  pageX: number,
  pageY: number,
) => {
  const { top, left } = parentElement.getBoundingClientRect();
  const x = pageX - left - childElement.clientWidth / 2;
  const y = pageY - top - childElement.clientHeight / 2;
  return { x, y };
};

const inRangePosition = (pos: number, min: number, max: number) => {
  if (pos < min) return min;
  if (pos > max) return max;
  return pos;
};

const getRangePosition = (memoBoardSize: MemoBoardSize): RangePosition => {
  const maxX = memoBoardSize.width - SIZE.POSTIT.WIDTH - SIZE.MEMOBOARD.PADDING;
  const maxY =
    memoBoardSize.height - SIZE.POSTIT.HEIGHT - SIZE.MEMOBOARD.PADDING;
  const rangeX = { min: SIZE.MEMOBOARD.PADDING, max: maxX };
  const rangeY = { min: SIZE.MEMOBOARD.PADDING, max: maxY };
  return { rangeX, rangeY };
};

const INIT_POS = { x: 0, y: 0 };

const useDragAndDrop = (changeZIndex: ChangeZIndex) => {
  const [originPos, setOriginPos] = useState<Position>(INIT_POS);

  const dragStart = ({ target, dataTransfer }: DragStart) => {
    dataTransfer.effectAllowed = 'move';
    const img = new Image();
    dataTransfer.setDragImage(img, 0, 0);

    const element = target as HTMLElement;
    setOriginPos({ x: element.offsetLeft, y: element.offsetTop });
    changeZIndex(Number(element.dataset.index));
  };

  const drag = ({ target, currentTarget, pageX, pageY }: Drag) => {
    if (!pageX && !pageY) return;
    const element = target as HTMLElement;
    element.style.cursor = 'grabbing';
    const position = getRelativePosition(currentTarget, element, pageX, pageY);
    const [dx, dy] = [position.x - originPos.x, position.y - originPos.y];
    const memoBoard = document.querySelector('.memo-board') as Element;
    const memoBoardSize = {
      width: memoBoard.clientWidth,
      height: memoBoard.clientHeight,
    };
    const { rangeX, rangeY } = getRangePosition(memoBoardSize);
    const movedX = inRangePosition(
      dx,
      rangeX.min - originPos.x,
      rangeX.max - originPos.x,
    );
    const movedY = inRangePosition(
      dy,
      rangeY.min - originPos.y,
      rangeY.max - originPos.y,
    );
    element.style.transform = `translateX(${movedX}px) translateY(${movedY}px)`;
  };

  const dragOver = (e: React.DragEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const drop = ({ target }: Drag) => {
    const element = target as HTMLElement;
    element.style.cursor = 'grab';
  };

  return { dragStart, drag, dragOver, drop };
};

export default useDragAndDrop;
