import styled, { css } from 'styled-components';

const StyledRowSeg = styled.div`
  position: absolute;
`;

const RowSeg = styled.div`
  width: 50px;
  height: 0px;
  border-left: 2.5px solid transparent;
  border-right: 2.5px solid transparent;
`;

const RowSegTop = styled(RowSeg)`
  border-bottom: 5px solid #eee;
`;

const RowSegBottom = styled(RowSeg)`
  border-top: 5px solid #eee;
`;

export const OnRowSeg = css`
  div {
    border-top-color: mediumseagreen;
    border-bottom-color: mediumseagreen;
  }
`;

const RowSegment = ({ index }: { index: number }) => {
  return (
    <StyledRowSeg className={`segment-${index}`}>
      <RowSegTop />
      <RowSegBottom />
    </StyledRowSeg>
  );
};

export default RowSegment;
