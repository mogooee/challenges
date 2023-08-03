import styled, { css } from 'styled-components';

const StyledColSeg = styled.div`
  position: absolute;
  display: flex;
`;

const ColSeg = styled.div`
  width: 0px;
  height: 40px;
  border-top: 2.5px solid transparent;
  border-bottom: 2.5px solid transparent;
`;

const ColSegLeft = styled(ColSeg)`
  border-right: 5px solid lightgray;
`;

const ColSegRight = styled(ColSeg)`
  border-left: 5px solid lightgray;
`;

export const onColSeg = css`
  div {
    border-left-color: mediumseagreen;
    border-right-color: mediumseagreen;
  }
`;

const ColumnSegment = ({ index }: { index: number }) => {
  return (
    <StyledColSeg className={`segment-${index}`}>
      <ColSegLeft />
      <ColSegRight />
    </StyledColSeg>
  );
};

export default ColumnSegment;
