import { useState } from 'react';
import styled, { css } from 'styled-components';
import { INIT, SIZE, PREV_BTN, NEXT_BTN } from '../../../constants';
import Image from './Image';

interface SliderProps {
  files: FileList;
  passNum?: number;
  $showNum?: number;
  $gap?: number;
}

type SlideImage = 'PREV' | 'NEXT';

type TImageList = Pick<SliderProps, '$gap'> & { $position: number };

type TStyledSlider = Pick<SliderProps, '$showNum' | '$gap'> & {
  $itemWidth: number;
};

type TImageContainer = { $isHighlight: boolean };

const StyledSlider = styled.div<TStyledSlider>`
  display: grid;
  gap: ${({ $gap }) => $gap}px;
  width: ${({ $showNum, $gap, $itemWidth }) => {
    const itemsWidth = $itemWidth * ($showNum || 0);
    const gapsWidth = ($gap || 0) * (($showNum || 0) - 1);
    return itemsWidth + gapsWidth + 10;
  }}px;
  overflow: hidden;
`;

const ImageList = styled.div<TImageList>`
  display: flex;
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

  img {
    ${({ $isHighlight }) => {
      if ($isHighlight)
        return css`
          border: 5px solid cornflowerblue;
        `;
    }}
  }
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
  passNum = 1,
  $showNum = 3,
  $gap = 20,
}: SliderProps) => {
  const [idx, setIdx] = useState<number>(INIT.INDEX);
  const [slideIdx, setSlideIdx] = useState<number>(INIT.INDEX);
  const [position, setPosition] = useState<number>(INIT.POSITION);

  const idxToOrder = (index: number) => index + 1;

  const slideImage = (type: SlideImage) => {
    setIdx((prevIdx) => prevIdx + (type === 'PREV' ? -passNum : +passNum));
    setSlideIdx((prevIdx) => {
      if (type === 'NEXT' && prevIdx === $showNum - 1) {
        return prevIdx;
      }
      if (type === 'PREV' && prevIdx === INIT.INDEX) {
        return prevIdx;
      }
      return prevIdx + (type === 'PREV' ? -passNum : +passNum);
    });

    setPosition((prevPosition) => {
      const movingPosition = (SIZE.ITEM_IMAGE.WIDTH + $gap) * passNum;

      if (type === 'PREV' && slideIdx === INIT.INDEX) {
        return prevPosition + movingPosition;
      }
      if (type === 'NEXT' && slideIdx === $showNum - 1) {
        return prevPosition - movingPosition;
      }
      return prevPosition;
    });
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
        height={`${SIZE.ROOT_IMAGE.HEIGHT}px`}
      />
      <ImageList $position={position} $gap={$gap}>
        {Object.values(files).map((file, fileIdx) => (
          <ImageContainer key={file.name} $isHighlight={idx === fileIdx}>
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
          onClick={() => slideImage('PREV')}
          disabled={idx === INIT.INDEX}
        >
          {PREV_BTN}
        </button>
        <span id="page-number">{`${idxToOrder(idx)} / ${files.length}`}</span>
        <button
          type="button"
          onClick={() => slideImage('NEXT')}
          disabled={idx === files.length - 1}
        >
          {NEXT_BTN}
        </button>
      </Controller>
    </StyledSlider>
  );
};

export default Slider;
