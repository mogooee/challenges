import { useState, useRef } from 'react';
import styled from 'styled-components';
import { TITLE } from '../../constants/index';
import FileAdder, { FileAdderBtn } from '../FileAdder';
import Slider from './Slider';

const StyledPresentation = styled.div`
  width: 50%;
  min-width: fit-content;
  aspect-ratio: 1/1;
  border: 10px solid black;
  border-radius: 10px;
  display: grid;
  place-items: center;
  align-content: space-evenly;
  gap: 20px;
  padding: 30px;
`;

const StyledSlider = styled.div`
  position: relative;

  ${FileAdderBtn} {
    position: absolute;
    bottom: 0;
    right: 30px;
  }
`;

const Presentation = () => {
  const [files, setFiles] = useState<FileList>();
  const storeFiles = useRef(new DataTransfer());

  return (
    <StyledPresentation>
      {files ? (
        <StyledSlider>
          <Slider files={files} $showNum={5} />
          <FileAdder storeFiles={storeFiles} setFiles={setFiles} />
        </StyledSlider>
      ) : (
        <>
          <h1>{TITLE.PRESENTIATION}</h1>
          <FileAdder storeFiles={storeFiles} setFiles={setFiles} />
        </>
      )}
    </StyledPresentation>
  );
};

export default Presentation;
