import { useState } from 'react';
import styled from 'styled-components';
import PostItMaker from './PostItMaker';
import PostIt, { PostItProps } from './PostIt';
import useDragAndDrop from './hooks/useDragAndDrop';

const LayOut = styled.div`
  * {
    box-sizing: border-box;
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

  const { dragStart, drag, dragOver, drop } = useDragAndDrop(changeZIndex);

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
        >
          {postIts.map(({ index, color, $position, createdAt }) => (
            <PostIt
              key={createdAt}
              index={index}
              color={color}
              $position={$position}
              createdAt={createdAt}
            />
          ))}
        </MemoBoard>
      </div>
    </LayOut>
  );
};

export default App;
