import styled, { css } from 'styled-components';
import { DEFAULT_COLOR } from './constants';
import { useState } from 'react';

interface PostItPosition {
  x: number;
  y: number;
}
export interface PostItProps {
  color?: string;
  $position: PostItPosition;
  createdAt: number;
}

type TStyledPostIt = Pick<PostItProps, '$position'>;

const StyledPostIt = styled.textarea<TStyledPostIt>`
  width: 180px;
  height: 180px;
  padding: 8px;
  border: none;
  font-family: monospace;
  resize: none;
  position: absolute;

  ${({ $position }) => css`
    top: ${$position.y}px;
    left: ${$position.x}px;
  `}

  &:focus {
    outline: none;
  }
`;

const PostIt = ({
  color = DEFAULT_COLOR,
  $position,
  createdAt,
}: PostItProps) => {
  const [content, setContent] = useState<string>('');
  const PLACE_HOLDER = '내용을 입력해주세요.';

  const handleTextareaChange = ({ target }: { target: EventTarget }) => {
    setContent((target as HTMLTextAreaElement).value);
  };

  return (
    <StyledPostIt
      style={{ backgroundColor: color }}
      placeholder={PLACE_HOLDER}
      onChange={handleTextareaChange}
      $position={$position}
      value={content}
    ></StyledPostIt>
  );
};

export default PostIt;
