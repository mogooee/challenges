import styled from 'styled-components';
import { MouseEventHandler } from 'react';

const StyledKeyboard = styled.div`
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
`;

interface KeyboardProps {
  keys: (string | number)[][];
  handleKeyboardClick: MouseEventHandler<HTMLButtonElement>;
}

const Keyboard = ({ keys, handleKeyboardClick }: KeyboardProps) => {
  return (
    <StyledKeyboard>
      {keys.map((row) =>
        row.map((e) => (
          <button key={e} data-key={e} onClick={handleKeyboardClick}>
            {e}
          </button>
        )),
      )}
    </StyledKeyboard>
  );
};

export default Keyboard;
