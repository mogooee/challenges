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

const App = () => {
  const [postIts, setPostIts] = useState<PostItProps[]>([]);
  const { dragStart, drag, dragOver, drop } = useDragAndDrop();

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
          {postIts.map(({ color, $position, createdAt }) => (
            <PostIt
              key={createdAt}
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
