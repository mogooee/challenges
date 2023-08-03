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
  border-right: 5px solid #eee;
`;

const ColSegRight = styled(ColSeg)`
  border-left: 5px solid #eee;
`;

export const onColSeg = css`
  div {
    border-left-color: mediumseagreen;
    border-right-color: mediumseagreen;
  }
`;

export const offColSeg = css`
  div {
    border-left-color: #eee;
    border-right-color: #eee;
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
