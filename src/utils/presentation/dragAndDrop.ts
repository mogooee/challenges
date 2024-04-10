import { DragEvent } from 'react';

type DragStartImage = Pick<DragEvent, 'dataTransfer' | 'currentTarget' | 'target'>;
type DragOverImage = Pick<DragEvent, 'currentTarget' | 'clientX' | 'preventDefault'>;
type DropImageProps = Omit<DragStartImage, 'currentTarget'>;
type DropImage = (props: DropImageProps) => {
  dragIdx: number;
  dropIdx: number;
};

export const dragStartImage = ({ target, currentTarget, dataTransfer }: DragStartImage) => {
  (target as HTMLDivElement).classList.add('dragging');
  // eslint-disable-next-line no-param-reassign
  dataTransfer.effectAllowed = 'move';
  dataTransfer.clearData();
  let dragIndex;
  for (let i = 0; i < currentTarget.children.length; i += 1) {
    if (currentTarget.children[i] === target) {
      dragIndex = i;
      break;
    }
  }
  dataTransfer.setData('text/plain', `${dragIndex}`);
};

export const dragEndImage = () => {
  document.querySelector('.dragging')?.classList.remove('dragging');
};

const getDragAfterElement = (container: { children: HTMLCollection }, x: number) => {
  const draggableElements = [].slice.call(container.children);

  return draggableElements.reduce(
    (closest: { offset: number; element: HTMLElement | null }, child: HTMLElement) => {
      const box = child.getBoundingClientRect();
      const offset = x - box.left - box.width / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      }
      return closest;
    },
    { offset: Number.NEGATIVE_INFINITY, element: null },
  ).element;
};

export const dragOverImage = ({ currentTarget: container, clientX, preventDefault }: DragOverImage) => {
  const afterElement = getDragAfterElement(container, clientX);
  const draggable = document.querySelector('.dragging')!;

  container.insertBefore(draggable, afterElement);
  preventDefault();
};

// export const dropImage: DropImage = ({ target, dataTransfer }) => {
//   const dragIdx = Number(dataTransfer.getData('text/plain'));
//   const dropIdx = Math.floor(((target as HTMLDivElement).offsetLeft / sliderWidth) * showNum);
//   return { dragIdx, dropIdx };
// };
