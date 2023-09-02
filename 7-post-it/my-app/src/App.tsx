import { useState } from 'react';
import styled from 'styled-components';
import PostItMaker from './PostItMaker';
import PostIt, { PostItProps } from './PostIt';
import useDragAndDrop, { Position } from './hooks/useDragAndDrop';

const LayOut = styled.div`
  * {
    box-sizing: border-box;
  }

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  .App {
    display: flex;
    flex-direction: column;
    padding: 8px;
    height: calc(100vh - 16px);
  }
`;

const MemoBoard = styled.div`
  margin-top: 10px;
  border-radius: 16px;
  height: inherit;
  background-color: #eee;
  position: relative;
`;

export const getHighestIndex = (postIts: PostItProps[]): number => {
  const highestIndex = Math.max(...postIts.map((e) => e.index));
  return highestIndex + 1;
};

const App = () => {
  const [postIts, setPostIts] = useState<PostItProps[]>([]);

  const setZIndex = (index: number) => {
    setPostIts((prev) =>
      prev.map((e) => {
        if (e.index === index) {
          return { ...e, index: getHighestIndex(prev) };
        }
        return e;
      }),
    );
  };

  const handlePostItMouseDown = ({ target }: { target: EventTarget }) => {
    const element = target as HTMLElement;
    const postIt = element.closest('.post-it') as HTMLDivElement;
    if (!postIt) return;
    setZIndex(Number(postIt.dataset.index));
  };

  const setNewPos = (target: HTMLElement, deltaPos: Position) => {
    const index = Number(target.dataset.index);
    setPostIts((prev) => {
      return prev.map((e) => {
        if (e.index === index) {
          const x = e.$position.x + deltaPos.x;
          const y = e.$position.y + deltaPos.y;
          return { ...e, $position: { x, y } };
        }
        return e;
      });
    });
  };

  const { dragStart, drag, dragOver, dragLeave, drop, dragEnd } =
    useDragAndDrop(setNewPos);

  const deletePostIt = (index: number) => {
    setPostIts((prev) => prev.filter((e) => e.index !== index));
  };

  return (
    <LayOut>
      <div className="App">
        <PostItMaker setPostIts={setPostIts} />
        <MemoBoard
          className="memo-board"
          onMouseDown={handlePostItMouseDown}
          onDragStart={dragStart}
          onDrag={drag}
          onDragOver={dragOver}
          onDragLeave={dragLeave}
          onDrop={drop}
          onDragEnd={dragEnd}
        >
          {postIts.map(({ index, color, $position, createdAt }) => (
            <PostIt
              key={createdAt}
              index={index}
              color={color}
              $position={$position}
              createdAt={createdAt}
              deletePostIt={deletePostIt}
            />
          ))}
        </MemoBoard>
      </div>
    </LayOut>
  );
};

export default App;
