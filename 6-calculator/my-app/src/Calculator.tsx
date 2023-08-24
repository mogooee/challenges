import styled from 'styled-components';
import { keys } from '../constants/index';

const StyledCalculator = styled.div`
  display: grid;
  grid-template-rows: 0.3fr;
  width: 300px;
  height: 500px;
  border: 1px solid black;
  border-radius: 8px;
  font-family: fantasy;
  font-size: larger;
`;

const Monitor = styled.div`
  border-bottom: 1px solid black;
  padding: 0 14px;

  .history {
    color: gray;
  }
`;

const Keyboard = styled.div`
  display: grid;
  grid-gap: 1px;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: repeat(4, 1fr);
  overflow: hidden;

  button {
    border: none;
    outline: 1px solid black;
    background-color: transparent;
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;

    &:active {
      background-color: lightgray;
    }
  }

  button:nth-child(17) {
    grid-column: span 2;
  }
`;

const Calculator = () => {
  return (
    <StyledCalculator>
      <Monitor>
        <p className="history">4 + 10 = 14</p>
        <p className="input">14</p>
      </Monitor>
      <Keyboard>
        {keys.map((row) => row.map((e) => <button key={e}>{e}</button>))}
      </Keyboard>
    </StyledCalculator>
  );
};

export default Calculator;
