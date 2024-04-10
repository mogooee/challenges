import styled from 'styled-components';

const Title = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledToggleBtn = styled.div`
  width: 100px;
  border: 1px solid black;
  border-radius: 6px;
  padding: 4px 3px;

  label {
    display: block;
    width: 40px;
    height: 25px;
    border: 1px solid black;
    border-radius: 6px;
    margin-left: 0;
    transition: all 0.3s ease-out;
    background-color: lightgray;
    cursor: pointer;
  }

  input {
    display: none;

    &:checked ~ label {
      /* labelWidth + paddingRight - borderRight */
      margin-left: calc(100% - 42px);
      transition: all 0.3s ease-out;
    }
  }
`;

interface ToggleBtnProps {
  onMode: string;
  offMode: string;
  onClick: (event: React.MouseEvent<HTMLLabelElement>) => void;
}

const ToggleBtn = ({ onMode, offMode, onClick }: ToggleBtnProps) => {
  return (
    <div>
      <Title>
        <span className="on-title">{onMode}</span>
        <span className="off-title">{offMode}</span>
      </Title>
      <StyledToggleBtn>
        <input id="toggle-btn" type="checkbox"></input>
        <label htmlFor="toggle-btn" onClick={onClick}></label>
      </StyledToggleBtn>
    </div>
  );
};

export default ToggleBtn;
