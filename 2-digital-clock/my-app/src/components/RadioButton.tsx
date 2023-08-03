import styled from 'styled-components';

const StyledRadioBtn = styled.div`
  display: flex;
  border: 1px solid black;
  border-radius: 6px;
  padding: 4px 3px;

  div + div {
    margin-left: 10px;
  }

  label {
    display: grid;
    place-items: center;
    width: 50px;
    height: 50px;
    border: 1px solid black;
    border-radius: 6px;
    background-color: white;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease-out;
  }

  input {
    display: none;

    &:checked + label {
      background-color: lightgray;
      transition: all 0.3s ease-out;
    }
  }
`;

export interface RadioData {
  title: string;
  checked?: boolean;
  onClick: (event: React.MouseEvent<HTMLLabelElement>) => void;
}

interface RadioButtonProps {
  radioData: RadioData[];
}

const RadioButton = ({ radioData }: RadioButtonProps) => {
  return (
    <StyledRadioBtn>
      {radioData.map(({ title, checked, onClick }) => {
        return (
          <div key={title}>
            <input type="radio" id={title} name="radio-btn" defaultChecked={checked}></input>
            <label htmlFor={title} onClick={onClick}>
              <span>{title}</span>
            </label>
          </div>
        );
      })}
    </StyledRadioBtn>
  );
};

export default RadioButton;
