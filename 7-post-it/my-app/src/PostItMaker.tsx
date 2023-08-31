import styled from 'styled-components';
import ColorPicker from './ColorPicker';

const StyledPostItMaker = styled.div`
  border: 1px solid black;
  padding: 8px;
  width: fit-content;
  height: fit-content;

  p {
    margin: 0;
    margin-bottom: 10px;
  }

  .control-box {
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      border: 1px solid black;
      background-color: white;
      cursor: pointer;
    }
  }
`;

const PostItMaker = () => {
  return (
    <StyledPostItMaker>
      <p>{`Let's Post it!`}</p>
      <div className="control-box">
        <ColorPicker />
        <button type="button">{'create'}</button>
      </div>
    </StyledPostItMaker>
  );
};

export default PostItMaker;
