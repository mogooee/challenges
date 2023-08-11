import { useRef, ChangeEvent } from 'react';
import styled from 'styled-components';
import { AddFile } from '../../../../hooks/useFile';
import { TITLE } from '../../../../constants/index';

export const FileAdderBtn = styled.label`
  border: 1px solid black;
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
  background-color: black;
  color: white;

  &:hover {
    background-color: white;
    color: black;
  }

  input {
    display: none;
  }
`;

interface FileAdderProps {
  addFile: AddFile;
}

const FileAdder = ({ addFile }: FileAdderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const changeInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (!inputRef.current || !event.target.files) return;
    const newFiles = addFile(event);
    inputRef.current.files = newFiles;
  };

  return (
    <FileAdderBtn htmlFor="file-adder">
      <span>{TITLE.FILE_ADDER}</span>
      <input
        type="file"
        id="file-adder"
        onChange={changeInput}
        accept="image/png, image/jpeg"
        multiple
        ref={inputRef}
      />
    </FileAdderBtn>
  );
};

export default FileAdder;
