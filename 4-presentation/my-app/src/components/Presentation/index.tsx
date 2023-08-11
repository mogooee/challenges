import styled from 'styled-components';
import { TITLE } from '../../constants/index';
import FileAdder from './Slider/Contorller/FileAdder';
import Slider from './Slider';
import useFile from '../../hooks/useFile';

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

const Presentation = () => {
  const { files, addFile, removeFile } = useFile();
  const showNum = 5;

  return (
    <StyledPresentation>
      {files?.length ? (
        <Slider
          files={files}
          addFile={addFile}
          removeFile={removeFile}
          showNum={showNum}
        />
      ) : (
        <>
          <h1>{TITLE.PRESENTIATION}</h1>
          <FileAdder addFile={addFile} />
        </>
      )}
    </StyledPresentation>
  );
};

export default Presentation;
