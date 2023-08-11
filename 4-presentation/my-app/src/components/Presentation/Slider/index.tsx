import { useRef, ChangeEvent } from 'react';
import styled from 'styled-components';
import { SIZE } from '../../../constants';
import Image from './Image';
import useSlider from '../../../hooks/useSlider';
import Controller from './Contorller';

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
            <span>{fileIdx + 1}</span>
          </ImageContainer>
        ))}
      </ImageList>
      <Controller
        filesNum={files.length}
        rootIdx={rootIdx}
        addFile={addFile}
        removeFile={removeFile}
        slideImage={slideImage}
        slideRemoveImage={slideRemoveImage}
      />
    </StyledSlider>
  );
};

export default Slider;
