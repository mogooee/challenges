import { useRef, ChangeEvent } from 'react';
import styled from 'styled-components';
import { INIT, SIZE } from '../../../constants';
import Image from './ImageListSlider/Image';
import useSlider from '../../../hooks/useSlider';
import Controller from './Contorller';
import ImagelistSlider from './ImageListSlider';

export interface SliderProps {
  files: FileList;
  addFile: (event: ChangeEvent<HTMLInputElement>) => FileList;
  removeFile: (index: number) => FileList;
  passNum?: number;
  showNum?: number;
  $gap?: number;
  $highlight?: number;
}
type TStyledSlider = {
  $width: number;
};

const StyledSlider = styled.div<TStyledSlider>`
  display: grid;
  gap: 35px;
  width: ${({ $width }) => $width}px;
  overflow: hidden;
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

  const lastFileIdx = files.length - 1;
  const [prevDisabled, nextDisabled] = [
    rootIdx === INIT.INDEX,
    rootIdx === lastFileIdx,
  ];

  const pageList = `${rootIdx + 1} / ${files.length}`;

  return (
    <StyledSlider $width={sliderWidth} ref={sliderRef}>
      <Image
        type="ROOT"
        file={files[rootIdx]}
        height={`${SIZE.ROOT_IMAGE.HEIGHT}px`}
      />
      <ImagelistSlider
        files={files}
        rootIdx={rootIdx}
        setRootIdx={setRootIdx}
        position={position}
        clickImageList={clickImageList}
        $gap={$gap}
        $highlight={$highlight}
      />
      <Controller
        pageList={pageList}
        rootIdx={rootIdx}
        prevDisabled={prevDisabled}
        nextDisabled={nextDisabled}
        addFile={addFile}
        removeFile={removeFile}
        slideImage={slideImage}
        slideRemoveImage={slideRemoveImage}
      />
    </StyledSlider>
  );
};

export default Slider;
