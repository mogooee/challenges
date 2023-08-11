import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { SIZE } from '../../../../constants';
import { SliderProps } from '..';
import Image from './Image';

type TImageList = Pick<SliderProps, '$gap'> & { $position: number };
type TImageContainer = Pick<SliderProps, '$highlight'> & {
  $isHighlight: boolean;
};

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

type ImageListSliderProps = Pick<
  SliderProps,
  '$gap' | '$highlight' | 'files'
> & {
  position: number;
  clickImageList: ({ clientX }: { clientX: number }) => void;
  rootIdx: number;
  setRootIdx: Dispatch<SetStateAction<number>>;
};

const ImageListSlider = ({
  files,
  rootIdx,
  setRootIdx,
  position,
  clickImageList,
  $gap,
  $highlight,
}: ImageListSliderProps) => (
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
        <span>{fileIdx + 1}</span>
      </ImageContainer>
    ))}
  </ImageList>
);

export default ImageListSlider;
