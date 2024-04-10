import { useState } from 'react';
import { SIZE } from '../constants';

export interface Position {
  x: number;
  y: number;
}
interface Range {
  min: number;
  max: number;
}
interface RangePosition {
  x: Range;
  y: Range;
}
type DragStart = Pick<
  React.DragEvent<HTMLElement>,
  'target' | 'currentTarget' | 'dataTransfer' | 'screenX' | 'screenY'
>;
type Drag = Pick<DragStart, 'screenX' | 'screenY'>;

const inRange = (pos: number, min: number, max: number): number => {
  if (pos < min) return min;
  if (pos > max) return max;
  return pos;
};

const getBaordRange = (boardElement: HTMLElement): RangePosition => {
  const { top, left, right, bottom } = boardElement.getBoundingClientRect();
  const x = {
    min: left + SIZE.MEMOBOARD.PADDING,
    max: right - SIZE.MEMOBOARD.PADDING,
  };
  const y = { min: top + SIZE.MEMOBOARD.PADDING, max: bottom - 10 };
  return { x, y };
};

const getTargetRange = (
  targetElement: HTMLElement,
  boardRange: RangePosition,
) => {
  const { top, left } = targetElement.getBoundingClientRect();
  const x = {
    min: boardRange.x.min - left,
    max: boardRange.x.max - left - SIZE.POSTIT.WIDTH,
  };
  const y = {
    min: boardRange.y.min - top,
    max: boardRange.y.max - top - SIZE.POSTIT.HEIGHT,
  };
  return { x, y };
};

const INIT_POS = { x: 0, y: 0 };
const INIT_RANGE = {
  x: { min: 0, max: 0 },
  y: { min: 0, max: 0 },
};

const useDragAndDrop = (
  setNewPos: (target: HTMLElement, deltaPos: Position) => void,
) => {
  const [targetElement, setTargetElement] = useState<HTMLElement>();
  const [originPos, setOriginPos] = useState<Position>(INIT_POS);
  const [moveRange, setMoveRange] = useState<RangePosition>(INIT_RANGE);
  const [deltaPos, setDeltaPos] = useState<Position>(INIT_POS);

  const dragStart = ({
    target,
    currentTarget,
    dataTransfer,
    screenX,
    screenY,
  }: DragStart) => {
    dataTransfer.effectAllowed = 'move';
    const img = new Image();
    dataTransfer.setDragImage(img, 0, 0);
    setOriginPos({ x: screenX, y: screenY });
    const boardRange = getBaordRange(currentTarget);
    const { x, y } = getTargetRange(target as HTMLElement, boardRange);
    setMoveRange({ x, y });
    setTargetElement(target as HTMLElement);
  };

  const drag = ({ screenX, screenY }: Drag) => {
    if (!screenX && !screenY) return;
    const [dx, dy] = [screenX - originPos.x, screenY - originPos.y];
    const movingX = inRange(dx, moveRange.x.min, moveRange.x.max);
    const movingY = inRange(dy, moveRange.y.min, moveRange.y.max);
    targetElement!.style.transform = `translateX(${movingX}px) translateY(${movingY}px)`;
    targetElement!.style.cursor = 'grabbing';
  };

  const dragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const dragLeave = () => {
    setDeltaPos(INIT_POS);
  };

  const drop = () => {
    const numRegex = /[^-?0-9]/g;
    const transform = targetElement?.style.transform;
    if (!transform) return;
    const [translateX, translateY] = transform.split(' ');
    const deltaPos = {
      x: Number(translateX.replace(numRegex, '')),
      y: Number(translateY.replace(numRegex, '')),
    };
    setDeltaPos(deltaPos);
  };

  const dragEnd = () => {
    setNewPos(targetElement!, deltaPos);
    targetElement!.style.cursor = 'grab';
    targetElement!.style.transform = '';
  };

  return { dragStart, drag, dragOver, dragLeave, drop, dragEnd };
};

export default useDragAndDrop;
