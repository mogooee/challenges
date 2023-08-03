import styled from 'styled-components';
import ColumnSegment, { onColSeg, offColSeg } from './ColSegment';
import RowSegment, { onRowSeg, offRowSeg } from './RowSegment';

const StyledSevenSegment = styled.div<SevenSegmentProps>`
  width: 55px;
  height: 100px;
  position: relative;

  /* 높이 */
  .segment-1 {
    top: -10px;
  }

  .segment-2,
  .segment-3 {
    top: 0;
  }

  .segment-4 {
    top: calc(50% - 5px);
  }

  .segment-5,
  .segment-6 {
    bottom: 0px;
  }

  .segment-7 {
    bottom: -10px;
  }

  /* 넓이 */
  .segment-2,
  .segment-5 {
    left: -5px;
  }

  .segment-3,
  .segment-6 {
    right: -5px;
  }

  .segment-1 {
    ${({ $number }) => {
      if ($number !== 1 && $number !== 4) return onRowSeg;
      return offRowSeg;
    }}
  }

  .segment-2 {
    ${({ $number }) => {
      if ($number !== 1 && $number !== 2 && $number !== 3 && $number !== 7) return onColSeg;
      return offColSeg;
    }}
  }

  .segment-3 {
    ${({ $number }) => {
      if ($number !== 5 && $number !== 6) return onColSeg;
      return offColSeg;
    }}
  }

  .segment-4 {
    ${({ $number }) => {
      if ($number !== 0 && $number !== 1 && $number !== 7) return onRowSeg;
      return offRowSeg;
    }}
  }

  .segment-5 {
    ${({ $number }) => {
      if ($number === 0 || $number === 2 || $number === 6 || $number === 8) return onColSeg;
      return offColSeg;
    }}
  }

  .segment-6 {
    ${({ $number }) => {
      if ($number !== 2) return onColSeg;
      return offColSeg;
    }}
  }

  .segment-7 {
    ${({ $number }) => {
      if ($number !== 1 && $number !== 4 && $number !== 7 && $number !== 9) return onRowSeg;
      return offRowSeg;
    }}
  }
`;

type SevenSegmentProps = { $number: number };

const SevenSegment = ({ $number }: SevenSegmentProps) => {
  return (
    <StyledSevenSegment $number={$number}>
      <RowSegment index={1} />
      <ColumnSegment index={2} />
      <ColumnSegment index={3} />
      <RowSegment index={4} />
      <ColumnSegment index={5} />
      <ColumnSegment index={6} />
      <RowSegment index={7} />
    </StyledSevenSegment>
  );
};

export default SevenSegment;
