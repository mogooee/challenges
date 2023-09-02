import React, { useState } from 'react';
import styled from 'styled-components';
import ColorPicker from './ColorPicker';
import { DEFAULT_COLOR, MESSAGE, SIZE } from '../constants';
import { PostItProps } from './PostIt';
import { random } from '../utils';
import { getHighestIndex } from '../App';

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
    }
  }
`;

interface PostItMakerProps {
  setPostIts: React.Dispatch<React.SetStateAction<PostItProps[]>>;
}

const PostItMaker = ({ setPostIts }: PostItMakerProps) => {
  const [color, setColor] = useState<string>(DEFAULT_COLOR);

  const getPostItPosition = () => {
    const memoBoard = document.querySelector('.memo-board') as Element;
    const x = random(
      SIZE.MEMOBOARD.PADDING,
      memoBoard?.clientWidth - SIZE.POSTIT.WIDTH - SIZE.MEMOBOARD.PADDING,
    );
    const y = random(
      SIZE.MEMOBOARD.PADDING,
      memoBoard?.clientHeight - SIZE.POSTIT.HEIGHT - SIZE.MEMOBOARD.PADDING,
    );
    return { x, y };
  };

  const handleCreateButtonClick = () => {
    const createdAt = Date.now();
    const $position = getPostItPosition();
    const newPost = { color, createdAt, $position, content: '' };
    setPostIts((prev) => {
      const index = prev.length ? getHighestIndex(prev) : 0;
      return [...prev, { ...newPost, index }];
    });
  };

  return (
    <StyledPostItMaker>
      <p>{MESSAGE.POSTIT_MAKER.TITLE}</p>
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
