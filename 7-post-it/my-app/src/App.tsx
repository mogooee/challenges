import { useState } from 'react';
import styled from 'styled-components';
import PostItMaker from './PostItMaker';
import PostIt, { PostItProps } from './PostIt';

const LayOut = styled.div`
  height: 100vh;
  padding: 10px;
`;

const MemoBoard = styled.div`
  border: 1px solid black;
  height: calc(100vh - 100px);
  margin-top: 10px;
  position: relative;
`;

const App = () => {
  const [postIts, setPostIts] = useState<PostItProps[]>([]);

  return (
    <div className="App">
      <LayOut>
        <PostItMaker setPostIts={setPostIts} />
        <MemoBoard className="memo-board">
          {postIts.map(({ color, $position, createdAt }) => (
            <PostIt
              key={createdAt}
              color={color}
              $position={$position}
              createdAt={createdAt}
            />
          ))}
        </MemoBoard>
      </LayOut>
    </div>
  );
};

export default App;
