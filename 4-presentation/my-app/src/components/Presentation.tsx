import styled from 'styled-components';
const StyledPresentation = styled.div`
  width: 50%;
  aspect-ratio: 16/10;
  border: 10px solid black;
  border-radius: 10px;
  display: grid;
  place-items: center;
  align-content: space-evenly;
  gap: 30px;
  padding: 30px;

  button {
    border: 1px solid black;
    border-radius: 10px;
    padding: 20px;
    cursor: pointer;
    background-color: black;
    color: white;
    &:hover {
      background-color: white;
      color: black;
    }
  }
`;


const Presentation = () => {
  return (
    <StyledPresentation>
      <h1>4th challenge - Presentation</h1>
      <button type="button">사진 추가</button>
    </StyledPresentation>
  );

export default Presentation;
