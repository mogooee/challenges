import { useState } from 'react';

const getDragAfterElement = (container: EventTarget, x: number) => {
  const draggableElements = [...(container as HTMLElement).children];

  return draggableElements.reduce(
    (closest, child, index) => {
      const box = child.getBoundingClientRect();
      const offset = x - box.left - box.width / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child, index };
      }
      return closest;
    },
    { offset: Number.NEGATIVE_INFINITY },
  );
};

const useDragAndDrop = () => {
  const [dropIdx, setDropIdx] = useState<number>(0);

  const dragStartImage = ({
    target,
    currentTarget,
    dataTransfer,
  }: {
    target: HTMLDivElement;
    currentTarget: HTMLDivElement;
    dataTransfer: DataTransfer;
  }) => {
    target.classList.add('dragging');
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

  const dragEndImage = () => {
    document.querySelector('.dragging')?.classList.remove('dragging');
  };

  const dragOverImage = (event: DragEvent) => {
    const { clientX, currentTarget: container } = event;
    if (!container) return;

    const dragAfterElement = getDragAfterElement(container, clientX);

    // if (!dragAfterElement?.element || !dragAfterElement?.index) return;

    // const { element: afterElement, index: dropIdx } = dragAfterElement;

    // setDropIdx(dropIdx);
    // const draggable = document.querySelector('.dragging');

    // if (draggable) {
    //   (container as HTMLElement).insertBefore(draggable, afterElement);
    //   event.preventDefault();
    // }
  };

  const dropImage = ({ dataTransfer }: { dataTransfer: DataTransfer }) => {
    const dragIdx = Number(dataTransfer.getData('text/plain'));
    // setRootIdx(dragIdx);
    // switchFile(dragIdx, dropIdx);
  };

  return { dragStartImage, dragEndImage, dragOverImage, dropImage };
};

export default useDragAndDrop;
