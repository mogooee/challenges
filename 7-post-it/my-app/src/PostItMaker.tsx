import React, { useState } from 'react';
import styled from 'styled-components';
import ColorPicker from './ColorPicker';
import { DEFAULT_COLOR } from './constants';
import { PostItProps } from './PostIt';

const StyledPostItMaker = styled.div`
  border: 1px solid black;
  padding: 8px;
  width: fit-content;
  height: fit-content;

  p {
    margin: 0;
    margin-bottom: 10px;
  }

  .control-box {
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      border: 1px solid black;
      background-color: white;
      cursor: pointer;
    }
  }
`;

interface PostItMakerProps {
  setPostIts: React.Dispatch<React.SetStateAction<PostItProps[]>>;
}

const PostItMaker = ({ setPostIts }: PostItMakerProps) => {
  const [color, setColor] = useState<string>(DEFAULT_COLOR);

  const handleCreateButtonClick = () => {
    const createdAt = new Date().getTime();
    const x = Math.floor(Math.random() * (window.innerWidth - 250 + 1));
    const y = Math.floor(Math.random() * (window.innerHeight - 300 + 1));
    const $position = { x, y };
    const newPost = { color, $position, createdAt };
    setPostIts((prev) => [...prev, newPost]);
  };

  return (
    <StyledPostItMaker>
      <p>{`Let's Post it!`}</p>
      <div className="control-box">
        <ColorPicker color={color} setColor={setColor} />
        <button type="button" onClick={handleCreateButtonClick}>
          {'create'}
        </button>
      </div>
    </StyledPostItMaker>
  );
};

export default PostItMaker;
