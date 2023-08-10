import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useRef,
  MutableRefObject,
} from 'react';
import styled from 'styled-components';
import { TITLE } from '../constants/index';

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

const FileAdder = ({
  setFiles,
  storeFiles,
}: {
  setFiles: Dispatch<SetStateAction<FileList | undefined>>;
  storeFiles: MutableRefObject<DataTransfer>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const changeFileAdder = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !inputRef.current || !storeFiles.current) return;
    Array.from(event.target.files).forEach((file) => {
      storeFiles.current.items.add(file);
    });
    inputRef.current.files = storeFiles.current.files;
    setFiles(storeFiles.current.files);
  };

  return (
    <FileAdderBtn htmlFor="file-adder">
      <span>{TITLE.FILE_ADDER}</span>
      <input
        type="file"
        id="file-adder"
        onChange={changeFileAdder}
        accept="image/png, image/jpeg"
        multiple
        ref={inputRef}
      />
    </FileAdderBtn>
  );
};

export default FileAdder;
