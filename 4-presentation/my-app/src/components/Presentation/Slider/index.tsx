import { useRef, useState, MouseEvent, ChangeEvent } from 'react';
import styled from 'styled-components';
import { INIT, SIZE, PREV_BTN, NEXT_BTN } from '../../../constants';
import FileAdder, { FileAdderBtn } from '../../FileAdder';
import FileRemover from '../../FileRemover';
import Image from './Image';

interface SliderProps {
  files: FileList;
  addFile: (event: ChangeEvent<HTMLInputElement>) => FileList;
  removeFile: (index: number) => FileList;
  passNum?: number;
  $showNum?: number;
  $gap?: number;
  $highlight?: number;
}
type SlideImage = 'PREV' | 'NEXT';
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
  $showNum = 3,
  $gap = 20,
  $highlight = 4,
}: SliderProps) => {
  const [idx, setIdx] = useState<number>(INIT.INDEX);
  const [highlightIdx, setHighlightIdx] = useState<number>(INIT.INDEX);
  const [position, setPosition] = useState<number>(INIT.POSITION);
  const sliderRef = useRef<HTMLDivElement>(null);

  const idxToOrder = (index: number) => index + 1;
  const lastHightlightIdx = $showNum - 1;
  const totalFilesNum = files.length;
  const lastFileIdx = totalFilesNum - 1;

  const movingPosition =
    (SIZE.ITEM_IMAGE.WIDTH + $gap + $highlight * 2) * passNum;

  const slideImage = (type: SlideImage) => {
    setIdx((prevIdx) => prevIdx + (type === 'PREV' ? -passNum : +passNum));
    setHighlightIdx((prevIdx) => {
      if (type === 'PREV' && prevIdx === INIT.INDEX) {
        return prevIdx;
      }
      if (type === 'NEXT' && prevIdx === lastHightlightIdx) {
        return prevIdx;
      }
      return prevIdx + (type === 'PREV' ? -passNum : +passNum);
    });
    setPosition((prevPosition) => {
      if (type === 'PREV' && highlightIdx === INIT.INDEX) {
        return prevPosition + movingPosition;
      }
      if (type === 'NEXT' && highlightIdx === lastHightlightIdx) {
        return prevPosition - movingPosition;
      }
      return prevPosition;
    });
  };

  const selectRootIdx = (index: number) => {
    setIdx(index);
  };

  const itemsWidth = SIZE.ITEM_IMAGE.WIDTH * $showNum;
  const gapsWidth = $gap * lastHightlightIdx;
  const borderWidth = $highlight * 2 * $showNum;
  const imgContainerWidth = itemsWidth + gapsWidth + borderWidth;

  const selectRootHighlightIdx = (e: MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    const xCoordinate =
      e.clientX - sliderRef.current.getBoundingClientRect().left;
    const xIdx = Math.floor((xCoordinate / imgContainerWidth) * $showNum);
    setHighlightIdx(xIdx);
  };

  const setFileRemoveState = () => {
    setIdx((prevIdx) => {
      if (prevIdx === INIT.INDEX) return INIT.INDEX;
      return prevIdx - 1;
    });
    setHighlightIdx((prevIdx) => {
      if (prevIdx === INIT.INDEX) {
        return prevIdx;
      }
      if (prevIdx === lastHightlightIdx && idx !== lastHightlightIdx) {
        return prevIdx;
      }
      return prevIdx - 1;
    });
    setPosition((prevPosition) => {
      if (highlightIdx === INIT.INDEX && idx !== INIT.INDEX) {
        return prevPosition + movingPosition;
      }
      if (highlightIdx === lastHightlightIdx && idx !== lastHightlightIdx) {
        return prevPosition + movingPosition;
      }
      return prevPosition;
    });
  };

  return (
    <StyledSlider $width={imgContainerWidth} ref={sliderRef}>
      <Image
        type="ROOT"
        file={files[idx]}
        height={`${SIZE.ROOT_IMAGE.HEIGHT}px`}
      />
      <ImageList
        $position={position}
        $gap={$gap}
        onClick={selectRootHighlightIdx}
      >
        {Object.values(files).map((file: File, fileIdx: number) => (
          <ImageContainer
            key={file.name}
            $isHighlight={idx === fileIdx}
            $highlight={$highlight}
            onClick={() => selectRootIdx(fileIdx)}
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
            disabled={idx === INIT.INDEX}
          >
            {PREV_BTN}
          </button>
          <span id="page-number">{`${idxToOrder(
            idx,
          )} / ${totalFilesNum}`}</span>
          <button
            type="button"
            onClick={() => slideImage('NEXT')}
            disabled={idx === lastFileIdx}
          >
            {NEXT_BTN}
          </button>
        </SliderController>
        <FileController>
          <FileAdder addFile={addFile} />
          <FileRemover
            index={idx}
            removeFile={removeFile}
            setSliderState={setFileRemoveState}
          />
        </FileController>
      </Controller>
    </StyledSlider>
  );
};

export default Slider;
