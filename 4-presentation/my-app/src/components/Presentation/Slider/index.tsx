import { useState } from 'react';
import styled from 'styled-components';
import {
  INIT,
  SIZE,
  SLIDE_NEXT,
  SLIDE_PREV,
  PREV_BTN,
  NEXT_BTN,
} from '../../../constants';
import Image from './Image';

interface SliderProps {
  files: FileList;
  passNum?: number;
  $showNum?: number;
  $gap?: number;
}

type SlideImage = typeof SLIDE_PREV | typeof SLIDE_NEXT;

type TImageList = Pick<SliderProps, '$gap'> & { $position: number };

type TStyledSlider = Pick<SliderProps, '$showNum' | '$gap'> & {
  $itemWidth: number;
};

const StyledSlider = styled.div<TStyledSlider>`
  display: grid;
  gap: ${({ $gap }) => $gap}px;
  width: ${({ $showNum, $gap, $itemWidth }) => {
    const itemsWidth = $itemWidth * ($showNum || 0);
    const gapsWidth = ($gap || 0) * (($showNum || 0) - 1);
    return itemsWidth + gapsWidth;
  }}px;
  overflow: hidden;
`;

const ImageList = styled.div<TImageList>`
  display: flex;
  gap: ${({ $gap }) => $gap}px;
  transition: all 0.3s ease-out;
  transform: translateX(${({ $position }) => $position}px);

  span {
    display: block;
  }
`;

const ImageContainer = styled.div`
  display: grid;
  place-items: center;
  gap: 10px;
`;

const Controller = styled.div`
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

const Slider = ({
  files,
  $showNum = 3,
  passNum = 1,
  $gap = 20,
}: SliderProps) => {
  const [idx, setIdx] = useState<number>(INIT.INDEX);
  const [position, setPosition] = useState<number>(INIT.POSITION);

  const idxToOrder = (index: number) => index + 1;

  const slideImage = (type: SlideImage) => {
    setIdx((prevIdx) => prevIdx + (type === SLIDE_PREV ? -passNum : +passNum));
    if (
      (type === SLIDE_PREV && idx >= $showNum) ||
      (type === SLIDE_NEXT && idx < files.length - $showNum)
    ) {
      setPosition((prevPosition) => {
        const movingPosition = (SIZE.ITEM_IMAGE.WIDTH + $gap) * passNum;
        return (
          prevPosition +
          (type === SLIDE_PREV ? +movingPosition : -movingPosition)
        );
      });
    }
  };

  return (
    <StyledSlider
      $showNum={$showNum}
      $gap={$gap}
      $itemWidth={SIZE.ITEM_IMAGE.WIDTH}
    >
      <Image
        type="ROOT"
        file={files[idx]}
        width={SIZE.ROOT_IMAGE.WIDTH}
        height={`${SIZE.ROOT_IMAGE.HEIGHT}px`}
      />
      <ImageList $position={position} $gap={$gap}>
        {Object.values(files).map((file, fileIdx) => (
          <ImageContainer key={file.name}>
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
        <button
          type="button"
          onClick={() => slideImage('prev')}
          disabled={idx === INIT.INDEX}
        >
          {PREV_BTN}
        </button>
        <span id="page-number">{`${idxToOrder(idx)} / ${files.length}`}</span>
        <button
          type="button"
          onClick={() => slideImage(SLIDE_NEXT)}
          disabled={idx === files.length - 1}
        >
          {NEXT_BTN}
        </button>
      </Controller>
    </StyledSlider>
  );
};

export default Slider;
