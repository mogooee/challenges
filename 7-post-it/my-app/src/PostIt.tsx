import styled from 'styled-components';
import { DEFAULT_COLOR } from './constants';
import { useState } from 'react';

interface PostItProps {
  color?: string;
}

const StyledPostIt = styled.textarea`
  width: 180px;
  height: 180px;
  padding: 8px;
  border: none;
  font-family: monospace;
  resize: none;

  &:focus {
    outline: none;
  }
`;

const PostIt = ({ color = DEFAULT_COLOR }: PostItProps) => {
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
    >
      {content}
    </StyledPostIt>
  );
};

export default PostIt;
