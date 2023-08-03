import styled, { css } from 'styled-components';

const RowSegment = styled.div`
  border: 1px solid lightgray;
  width: 40px;
  height: 10px;
  position: absolute;
  left: 10px;
`;

const ColumnSegment = styled.div`
  border: 1px solid lightgray;
  width: 10px;
  height: 45px;
  position: absolute;
`;

const StyledSegment = styled.div<SevenSegmentProps>`
  position: relative;
  width: 64px;
  height: 100px;

  .segment-1 {
    top: -10px;
  }

  .segment-2,
  .segment-3 {
    top: 0px;
  }

  .segment-4 {
    top: calc(50% - 5px);
  }

  .segment-5,
  .segment-6 {
    bottom: 0;
  }

  .segment-7 {
    bottom: -10px;
  }

  .segment-3,
  .segment-6 {
    right: 0;
  }

  .segment-1 {
    ${({ $number }) => {
      if ($number !== 1 && $number !== 4)
        return css`
          background-color: mediumseagreen;
        `;
    }}
  }

  .segment-2 {
    ${({ $number }) => {
      if ($number !== 1 && $number !== 2 && $number !== 3 && $number !== 7)
        return css`
          background-color: mediumseagreen;
        `;
    }}
  }

  .segment-3 {
    ${({ $number }) => {
      if ($number !== 5 && $number !== 6)
        return css`
          background-color: mediumseagreen;
        `;
    }}
  }

  .segment-4 {
    ${({ $number }) => {
      if ($number !== 0 && $number !== 1 && $number !== 7)
        return css`
          background-color: mediumseagreen;
        `;
    }}
  }

  .segment-5 {
    ${({ $number }) => {
      if ($number === 0 || $number === 2 || $number === 6 || $number === 8)
        return css`
          background-color: mediumseagreen;
        `;
    }}
  }

  .segment-6 {
    ${({ $number }) => {
      if ($number !== 2)
        return css`
          background-color: mediumseagreen;
        `;
    }}
  }

  .segment-7 {
    ${({ $number }) => {
      if ($number !== 1 && $number !== 4 && $number !== 7 && $number !== 9)
        return css`
          background-color: mediumseagreen;
        `;
    }}
  }
`;

type SevenSegmentProps = { $number: number };

const SevenSegment = ({ $number }: SevenSegmentProps) => {
  return (
    <StyledSegment $number={$number}>
      <RowSegment className="segment-1"></RowSegment>
      <ColumnSegment className="segment-2"></ColumnSegment>
      <ColumnSegment className="segment-3"></ColumnSegment>
      <RowSegment className="segment-4"></RowSegment>
      <ColumnSegment className="segment-5"></ColumnSegment>
      <ColumnSegment className="segment-6"></ColumnSegment>
      <RowSegment className="segment-7"></RowSegment>
    </StyledSegment>
  );
};

export default SevenSegment;
