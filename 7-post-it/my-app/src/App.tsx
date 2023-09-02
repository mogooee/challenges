import { useState } from 'react';
import styled from 'styled-components';
import PostItMaker from './PostItMaker';
import PostIt, { PostItProps } from './PostIt';
import useDragAndDrop from './hooks/useDragAndDrop';

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
  const { dragStart, drag, dragOver, drop } = useDragAndDrop();

  const deletePostIt = (index: number) => {
    setPostIts((prev) => prev.filter((e) => e.index !== index));
  };

  const changeZIndex = (index: number) => {
    setPostIts((prev) => {
      return prev.map((e) => {
        if (e.index === index) {
          return { ...e, index: getHighestIndex(prev) };
        }
        return e;
      });
    });
  };

  const handlePostItMouseDown = ({ target }: { target: EventTarget }) => {
    const element = target as HTMLElement;
    const postIt = element.closest('.post-it') as HTMLDivElement;
    if (!postIt) return;
    changeZIndex(Number(postIt.dataset.index));
  };

  return (
    <LayOut>
      <div className="App">
        <PostItMaker setPostIts={setPostIts} />
        <MemoBoard
          className="memo-board"
          onDragStart={dragStart}
          onDrag={drag}
          onDragOver={dragOver}
          onDrop={drop}
          onMouseDown={handlePostItMouseDown}
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
