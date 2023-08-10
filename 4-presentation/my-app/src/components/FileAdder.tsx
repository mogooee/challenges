import { ChangeEventHandler } from 'react';
import styled from 'styled-components';
import { TITLE } from '../constants/index';

const FileAdderBtn = styled.label`
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
  addFile,
}: {
  addFile: ChangeEventHandler<HTMLInputElement>;
}) => (
  <FileAdderBtn htmlFor="picture-adder">
    <span>{TITLE.FILE_ADDER}</span>
    <input
      type="file"
      id="picture-adder"
      onChange={addFile}
      accept="image/png, image/jpeg"
      multiple
    />
  </FileAdderBtn>
);

export default FileAdder;
