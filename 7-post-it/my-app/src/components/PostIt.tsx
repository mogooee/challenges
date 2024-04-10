import styled, { css } from 'styled-components';
import { DEFAULT_COLOR, MESSAGE, SIZE } from '../constants';
import { Position } from '../hooks/useDragAndDrop';

export interface PostItProps {
  index: number;
  content: string;
  createdAt: number;
  color?: string;
  $position: Position;
  deletePostIt?: (index: number) => void;
  setPostItContent?: (index: number, content: string) => void;
}
type TLayOut = Pick<PostItProps, '$position'> & { $zIndex: number };

const LayOut = styled.div<TLayOut>`
  display: flex;
  flex-direction: column;
  width: ${SIZE.POSTIT.WIDTH}px;
  height: ${SIZE.POSTIT.HEIGHT}px;
  position: absolute;
  cursor: grab;

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
  content,
  createdAt,
  deletePostIt,
  setPostItContent,
}: PostItProps) => {
  const PLACE_HOLDER = MESSAGE.POSTIT.PLACEHOLDER;

  const handleDeleteButtonClick = (index: number) => {
    const result = confirm(MESSAGE.POSTIT.DELETE);
    if (!result) return;
    deletePostIt?.(index);
  };

  const handlePostItChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    index: number,
  ) => {
    const newContent = (event.target as HTMLTextAreaElement).value;
    setPostItContent?.(index, newContent);
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
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          handlePostItChange(e, index)
        }
      />
    </LayOut>
  );
};

export default PostIt;
