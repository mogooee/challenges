import { useState } from 'react';
import { INIT, SIZE } from '../constants';

type SlideImageProps = 'PREV' | 'NEXT';
export type SlideImage = (type: SlideImageProps) => void;
interface UseSlider {
  passNum: number;
  showNum: number;
  $gap: number;
  $highlight: number;
}

const useSlider = ({ passNum, showNum, $gap, $highlight }: UseSlider) => {
  const [rootIdx, setRootIdx] = useState<number>(INIT.INDEX);
  const [highlightIdx, setHighlightIdx] = useState<number>(INIT.INDEX);
  const [position, setPosition] = useState<number>(INIT.POSITION);

  const lastHightlightIdx = showNum - 1;
  const movingPosition =
    (SIZE.ITEM_IMAGE.WIDTH + $gap + $highlight * 2) * passNum;

  const slideImage: SlideImage = (type) => {
    setRootIdx((prevIdx) => prevIdx + (type === 'PREV' ? -passNum : +passNum));
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

  const slideRemoveImage = () => {
    setRootIdx((prevIdx) => {
      if (prevIdx === INIT.INDEX) return INIT.INDEX;
      return prevIdx - 1;
    });
    setHighlightIdx((prevIdx) => {
      if (prevIdx === INIT.INDEX) {
        return prevIdx;
      }
      if (prevIdx === lastHightlightIdx && rootIdx !== lastHightlightIdx) {
        return prevIdx;
      }
      return prevIdx - 1;
    });
    setPosition((prevPosition) => {
      if (highlightIdx === INIT.INDEX && rootIdx !== INIT.INDEX) {
        return prevPosition + movingPosition;
      }
      if (highlightIdx === lastHightlightIdx && rootIdx !== lastHightlightIdx) {
        return prevPosition + movingPosition;
      }
      return prevPosition;
    });
  };

  const getSliderWidth = () => {
    const itemsWidth = SIZE.ITEM_IMAGE.WIDTH * showNum;
    const gapsWidth = $gap * lastHightlightIdx;
    const borderWidth = $highlight * 2 * showNum;
    return itemsWidth + gapsWidth + borderWidth;
  };
  const sliderWidth = getSliderWidth();

  const updateClickedHighlightIdx = (xCoordinate: number) => {
    const clickedIdx = Math.floor((xCoordinate / sliderWidth) * showNum);
    setHighlightIdx(clickedIdx);
  };

  return {
    rootIdx,
    setRootIdx,
    highlightIdx,
    position,
    sliderWidth,
    slideImage,
    slideRemoveImage,
    updateClickedHighlightIdx,
  };
};

export default useSlider;
