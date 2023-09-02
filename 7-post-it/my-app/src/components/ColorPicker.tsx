import React from 'react';
import { styled } from 'styled-components';
import { COLORS } from '../constants';

const StyledColorPicker = styled.details`
  position: relative;

  div,
  li {
    width: 14px;
    height: 14px;
    border: 1px solid black;
    border-radius: 3px;
    list-style: none;
    cursor: pointer;
  }

  &[open] > summary::before {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    display: block;
    cursor: default;
    content: ' ';
    background: transparent;
  }
`;

const PickedColor = styled.summary`
  display: block;
`;

const ColorList = styled.menu`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  width: fit-content;
  padding: 8px;
  margin: 10px 0;
  border: 1px solid black;
  border-radius: 4px;
  position: absolute;
  top: 10px;
  z-index: 101;
  background-color: white;
`;

interface ColorPickerProps {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

const ColorPicker = ({ color, setColor }: ColorPickerProps) => {
  const handleColorClick = ({ target }: { target: EventTarget }) => {
    const selectedColor = (target as HTMLLIElement).style.backgroundColor;
    setColor(selectedColor!);
  };

  return (
    <StyledColorPicker>
      <PickedColor>
        <div style={{ backgroundColor: color }}></div>
      </PickedColor>
      <ColorList>
        {COLORS.map((e) => (
          <li
            key={e}
            style={{ backgroundColor: e }}
            onClick={handleColorClick}
          ></li>
        ))}
      </ColorList>
    </StyledColorPicker>
  );
};

export default ColorPicker;
