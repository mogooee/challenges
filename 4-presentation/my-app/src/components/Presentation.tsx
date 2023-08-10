import styled from 'styled-components';
import FileAdder from './FileAdder';
import { TITLE } from '../constants/index';

const StyledPresentation = styled.div`
  width: 50%;
  aspect-ratio: 16/10;
  border: 10px solid black;
  border-radius: 10px;
  display: grid;
  place-items: center;
  align-content: space-evenly;
  gap: 30px;
  padding: 30px;
`;

const Presentation = () => {
  const [files, setFiles] = useState<FileList>();

  const addFile = ({ target }: { target: HTMLInputElement }) => {
    if (!target.files) return;
    setFiles(target.files);
  };

  return (
    <StyledPresentation>
      <h1>{TITLE.PRESENTIATION}</h1>
      <FileAdder addFile={addFile} />
    </StyledPresentation>
  );
};

export default Presentation;
