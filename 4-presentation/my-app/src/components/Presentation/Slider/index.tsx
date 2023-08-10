import { useState } from 'react';
import styled from 'styled-components';
import Image from './Image';

const StyledSlider = styled.div<{
  $showNum: number;
  $gap: number;
  $itemWidth: number;
}>`
  display: grid;
  gap: ${({ $gap }) => $gap}px;
  width: ${({ $showNum, $gap, $itemWidth }) => {
    const itemsWidth = $itemWidth * $showNum;
    const gapsWidth = $gap * ($showNum - 1);
    return itemsWidth + gapsWidth;
  }}px;
  overflow: hidden;
`;

const ImageList = styled.div<{ $position: number; $gap: number }>`
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

const [PREV_BTN, NEXT_BTN] = ['<', '>'];

const INIT = {
  INDEX: 1,
  POSITION: 0,
  IMAGE: {
    WIDTH: 135,
    HEIGHT: 80,
  },
};

interface SliderProps {
  files: FileList;
  showNum?: number;
  passNum?: number;
  gap?: number;
}

type SlideImage = 'prev' | 'next';

const Slider = ({ files, showNum = 3, passNum = 1, gap = 20 }: SliderProps) => {
  const [idx, setIdx] = useState<number>(INIT.INDEX);
  const [position, setPosition] = useState<number>(INIT.POSITION);

  const slideImage = (type: SlideImage) => {
    setIdx((prevIdx) => prevIdx + (type === 'prev' ? -passNum : +passNum));
    setPosition((prevPosition) => {
      const movingPosition = (INIT.IMAGE.WIDTH + gap) * passNum;
      return (
        prevPosition + (type === 'prev' ? +movingPosition : -movingPosition)
      );
    });
  };

  return (
    <StyledSlider $showNum={showNum} $gap={gap} $itemWidth={INIT.IMAGE.WIDTH}>
      <ImageList $position={position} $gap={gap}>
        {Object.values(files).map((file, index) => (
          <ImageContainer key={file.name}>
            <Image
              file={file}
              width={`${INIT.IMAGE.WIDTH}px`}
              height={`${INIT.IMAGE.HEIGHT}px`}
            />
            <span>{index + 1}</span>
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
        <span id="page-number">{`${idx} / ${files.length}`}</span>
        <button
          type="button"
          onClick={() => slideImage('next')}
          disabled={idx + showNum > files.length}
        >
          {NEXT_BTN}
        </button>
      </Controller>
    </StyledSlider>
  );
};

export default Slider;
