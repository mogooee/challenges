import { useRef, ChangeEvent } from 'react';
import styled from 'styled-components';
import { INIT, SIZE, PREV_BTN, NEXT_BTN } from '../../../constants';
import FileAdder, { FileAdderBtn } from '../../FileAdder';
import FileRemover from '../../FileRemover';
import Image from './Image';
import useSlider from '../../../hooks/useSlider';

interface SliderProps {
  files: FileList;
  addFile: (event: ChangeEvent<HTMLInputElement>) => FileList;
  removeFile: (index: number) => FileList;
  passNum?: number;
  showNum?: number;
  $gap?: number;
  $highlight?: number;
}
type TImageList = Pick<SliderProps, '$gap'> & { $position: number };
type TStyledSlider = {
  $width: number;
};
type TImageContainer = Pick<SliderProps, '$highlight'> & {
  $isHighlight: boolean;
};

const StyledSlider = styled.div<TStyledSlider>`
  display: grid;
  gap: 35px;
  width: ${({ $width }) => $width}px;
  overflow: hidden;
`;

const ImageList = styled.div<TImageList>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ $gap }) => $gap}px;
  transition: all 0.3s ease-out;
  transform: translateX(${({ $position }) => $position}px);

  span {
    display: block;
  }
`;

const ImageContainer = styled.div<TImageContainer>`
  display: grid;
  place-items: center;
  gap: 10px;
  cursor: pointer;

  &:hover {
    img {
      opacity: 0.5;
    }
  }

  img {
    ${({ $isHighlight, $highlight }) =>
      `border: ${$highlight}px solid ${
        $isHighlight ? 'cornflowerblue' : 'lightgray'
      }`};
  }
`;

const Controller = styled.div`
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

const Slider = ({
  files,
  addFile,
  removeFile,
  passNum = 1,
  showNum = 3,
  $gap = 20,
  $highlight = 4,
}: SliderProps) => {
  const {
    rootIdx,
    setRootIdx,
    position,
    sliderWidth,
    slideImage,
    slideRemoveImage,
    updateClickedHighlightIdx,
  } = useSlider({
    passNum,
    showNum,
    $gap,
    $highlight,
  });
  const sliderRef = useRef<HTMLDivElement>(null);

  const filesNum = files.length;
  const lastFileIdx = filesNum - 1;

  const idxToOrder = (index: number) => index + 1;

  const clickImageList = ({ clientX }: { clientX: number }) => {
    if (!sliderRef.current) return;
    const xCoordinate =
      clientX - sliderRef!.current.getBoundingClientRect().left;
    updateClickedHighlightIdx(xCoordinate);
  };

  return (
    <StyledSlider $width={sliderWidth} ref={sliderRef}>
      <Image
        type="ROOT"
        file={files[rootIdx]}
        height={`${SIZE.ROOT_IMAGE.HEIGHT}px`}
      />
      <ImageList $position={position} $gap={$gap} onClick={clickImageList}>
        {Object.values(files).map((file: File, fileIdx: number) => (
          <ImageContainer
            key={file.name}
            $isHighlight={rootIdx === fileIdx}
            $highlight={$highlight}
            onClick={() => setRootIdx(fileIdx)}
          >
            <Image
              type="ITEM"
              file={file}
              width={`${SIZE.ITEM_IMAGE.WIDTH}px`}
              height={`${SIZE.ITEM_IMAGE.HEIGHT}px`}
            />
            <span>{idxToOrder(fileIdx)}</span>
          </ImageContainer>
        ))}
      </ImageList>
      <Controller>
        <SliderController>
          <button
            type="button"
            onClick={() => slideImage('PREV')}
            disabled={rootIdx === INIT.INDEX}
          >
            {PREV_BTN}
          </button>
          <span id="page-number">{`${idxToOrder(rootIdx)} / ${filesNum}`}</span>
          <button
            type="button"
            onClick={() => slideImage('NEXT')}
            disabled={rootIdx === lastFileIdx}
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
      </Controller>
    </StyledSlider>
  );
};

export default Slider;
