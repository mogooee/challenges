import { useState } from 'react';
import styled, { css } from 'styled-components';
import { DEFAULT_COLOR, SIZE } from './constants';
import { Position } from './hooks/useDragAndDrop';

export interface PostItProps {
  color?: string;
  $position: Position;
  createdAt: number;
  index: number;
}

type TStyledPostIt = Pick<PostItProps, '$position'> & { $zIndex: number };

const StyledPostIt = styled.textarea<TStyledPostIt>`
  width: ${SIZE.POSTIT.WIDTH}px;
  height: ${SIZE.POSTIT.HEIGHT}px;
  padding: 8px;
  border: none;
  font-family: monospace;
  resize: none;
  position: absolute;
  cursor: grab;

  ${({ $position, $zIndex }) => css`
    left: ${$position.x}px;
    top: ${$position.y}px;
    z-index: ${$zIndex};
  `}

  &:focus {
    outline: none;
  }
`;

const PostIt = ({ index, color = DEFAULT_COLOR, $position }: PostItProps) => {
  const [content, setContent] = useState<string>('');
  const PLACE_HOLDER = '내용을 입력해주세요.';

  const handlePostItChange = ({ target }: { target: EventTarget }) => {
    setContent((target as HTMLTextAreaElement).value);
  };

  return (
    <StyledPostIt
      style={{ backgroundColor: color }}
      $position={$position}
      $zIndex={index}
      placeholder={PLACE_HOLDER}
      value={content}
      onChange={handlePostItChange}
      data-index={index}
      draggable
    ></StyledPostIt>
  );
};

export default PostIt;
