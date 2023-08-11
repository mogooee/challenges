import styled from 'styled-components';
import { SlideImage } from '../../../../hooks/useSlider';
import { AddFile, RemoveFile } from '../../../../hooks/useFile';
import { PREV_BTN, NEXT_BTN } from '../../../../constants';
import FileAdder, { FileAdderBtn } from './FileAdder';
import FileRemover from './FileRemover';

const StyledController = styled.div`
  display: flex;
  justify-content: space-around;
  width: inherit;
`;

const SliderController = styled.div`
  width: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  font-size: 1.3rem;

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 2rem;
  }
`;

const FileController = styled.div`
  display: flex;
  gap: 20px;

  ${FileAdderBtn}, button {
    width: max-content;
    padding: 10px;
    font-size: 1rem;
    cursor: pointer;
  }

  button {
    border: 1px solid red;
    border-radius: 10px;
    background-color: red;
    color: white;

    &:hover {
      background-color: white;
      color: red;
    }
  }
`;

interface ControllerProps {
  pageList: string;
  rootIdx: number;
  prevDisabled: boolean;
  nextDisabled: boolean;
  addFile: AddFile;
  removeFile: RemoveFile;
  slideImage: SlideImage;
  slideRemoveImage: () => void;
}

const Controller = ({
  pageList,
  rootIdx,
  prevDisabled,
  nextDisabled,
  addFile,
  removeFile,
  slideImage,
  slideRemoveImage,
}: ControllerProps) => (
  <StyledController>
    <SliderController>
      <button
        type="button"
        onClick={() => slideImage('PREV')}
        disabled={prevDisabled}
      >
        {PREV_BTN}
      </button>
      <span id="page-number">{pageList}</span>
      <button
        type="button"
        onClick={() => slideImage('NEXT')}
        disabled={nextDisabled}
      >
        {NEXT_BTN}
      </button>
    </SliderController>
    <FileController>
      <FileAdder addFile={addFile} />
      <FileRemover
        index={rootIdx}
        removeFile={removeFile}
        slideRemoveImage={slideRemoveImage}
      />
    </FileController>
  </StyledController>
);
export default Controller;
