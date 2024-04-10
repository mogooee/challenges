import styled from 'styled-components';
import { ChartModeType } from './Chart';

const StyledToggleBtn = styled.div<{ mode: ChartModeType }>`
  width: 100px;
  position: relative;

  label {
    width: 80px;
    position: absolute;
    top: -11px;
    right: -2px;
    border: 1px solid black;
    border-radius: 8px;
    padding: 20px;
    cursor: pointer;
  }

  input {
    cursor: pointer;
    position: relative;
    left: 0;
    appearance: none;
    transition: all 0.2s ease-out;
    transform: translateX(0px);

    &:checked {
      left: 22px;
    }
  }

  input::before {
    border: 1px solid lightgray;
    border-radius: 8px;
    padding: 10px;
    content: ${({ mode }) => `"${mode}"`};
  }
`;

interface ToggleBtnType {
  mode: ChartModeType;
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
}

const ToggleBtn = ({ mode, onClick }: ToggleBtnType) => {
  return (
    <StyledToggleBtn mode={mode}>
      <label htmlFor="toggle-btn"></label>
      <input id="toggle-btn" type="checkbox" onClick={onClick}></input>
    </StyledToggleBtn>
  );
};

export default ToggleBtn;
