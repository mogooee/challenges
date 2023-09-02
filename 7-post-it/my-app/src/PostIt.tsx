import { useState } from 'react';
import styled, { css } from 'styled-components';
import { DEFAULT_COLOR, MESSAGE, SIZE } from './constants';
import { Position } from './hooks/useDragAndDrop';

export interface PostItProps {
  color?: string;
  index: number;
  $position: Position;
  createdAt: number;
  deletePostIt?: (index: number) => void;
}
type TLayOut = Pick<PostItProps, '$position'> & { $zIndex: number };

const LayOut = styled.div<TLayOut>`
  display: flex;
  flex-direction: column;
  width: ${SIZE.POSTIT.WIDTH}px;
  height: ${SIZE.POSTIT.HEIGHT}px;
  position: absolute;

  ${({ $position, $zIndex }) => css`
    left: ${$position.x}px;
    top: ${$position.y}px;
    z-index: ${$zIndex};
  `}
`;

const StyledPostIt = styled.textarea`
  width: inherit;
  height: 100%;
  padding: 8px;
  border: none;
  font-family: monospace;
  resize: none;
  cursor: grab;

  &:focus {
    outline: none;
  }
`;

const ControlBox = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  border-bottom: 1px dashed darkgrey;
  padding: 4px;

  button {
    color: mediumvioletred;
  }
`;

const PostIt = ({
  index,
  color = DEFAULT_COLOR,
  $position,
  createdAt,
  deletePostIt,
}: PostItProps) => {
  const [content, setContent] = useState<string>('');
  const PLACE_HOLDER = MESSAGE.POSTIT.PLACEHOLDER;

  const handleDeleteButtonClick = (index: number) => {
    const result = confirm(MESSAGE.POSTIT.DELETE);
    if (!result) return;
    deletePostIt?.(index);
  };

  const handlePostItChange = ({ target }: { target: EventTarget }) => {
    setContent((target as HTMLTextAreaElement).value);
  };

  return (
    <LayOut
      className="post-it"
      $position={$position}
      $zIndex={index}
      data-index={index}
      draggable
    >
      <ControlBox style={{ backgroundColor: color }}>
        <button onClick={() => handleDeleteButtonClick(index)}>{'X'}</button>
      </ControlBox>
      <StyledPostIt
        style={{ backgroundColor: color }}
        placeholder={PLACE_HOLDER}
        value={content}
        onChange={handlePostItChange}
      />
    </LayOut>
  );
};

export default PostIt;
