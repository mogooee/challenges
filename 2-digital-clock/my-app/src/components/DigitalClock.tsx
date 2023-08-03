import { useState, useEffect } from 'react';
import styled from 'styled-components';
import RadioButton, { RadioData } from './RadioButton';
import SevenSegment from './SevenSegment';
import ToggleBtn from './ToggleButton';
import useClock from '../hooks/useClock';

const StyledDigitalClock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 400px;
  height: 300px;
  border: 2px solid black;
  border-radius: 25px;
  margin: 0 auto;
  padding: 20px;
`;

const Monitor = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 0.3fr 1fr 1fr;
  justify-content: space-between;
  align-items: center;
  justify-items: center;
  height: 125px;
  border: 2px solid black;
  border-radius: 25px;
  padding: 40px 30px;
  position: relative;
`;

const ControlBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Flicker = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: inherit;
`;

const Dot = styled.div<{ $sec: number }>`
  width: 10px;
  height: 10px;
  border: 1px solid lightgray;
  background-color: ${({ $sec }) => ($sec ? 'white' : 'mediumseagreen')};
`;


const DigitalClock = () => {
  const [mode, setMode] = useState<'CLOCK' | 'TIMER'>('CLOCK');

  const {
    time: clockTime,
    flicker: clockFlicker,
    clockRadio,
    startClock,
  } = useClock();

  const toggleMode = () => {
    setMode((prev) => (prev === 'CLOCK' ? 'TIMER' : 'CLOCK'));
  };

  useEffect(() => {
    const clockId = setInterval(startClock, 1000);
    return () => clearInterval(clockId);
  }, [startClock]);

  const timerRadio: RadioData[] = [
    { title: 'start', checked: false, onClick: () => {} },
    { title: 'paused', checked: true, onClick: () => {} },
    { title: 'reset', checked: false, onClick: () => {} },
  ];

  const clockRadio: RadioData[] = [
    { title: '12', checked: false, onClick: () => {} },
    { title: '24', checked: true, onClick: () => {} },
  ];


  const hour1 = clockTime.hour1;
  const hour2 = clockTime.hour2;
  const minute1 = clockTime.minute1;
  const minute2 = clockTime.minute2;
  const flicker = clockFlicker;

  return (
    <StyledDigitalClock>
      <Monitor>
        <SevenSegment $number={hour1}></SevenSegment>
        <SevenSegment $number={hour2}></SevenSegment>
        <Flicker>
          <Dot $sec={flicker}></Dot>
          <Dot $sec={flicker}></Dot>
        </Flicker>
        <SevenSegment $number={minute1}></SevenSegment>
        <SevenSegment $number={minute2}></SevenSegment>
      </Monitor>
      <ControlBox>
        <ToggleBtn onMode="Clock" offMode="Timer" onClick={toggleMode} />
        <RadioButton radioData={mode === 'CLOCK' ? clockRadio : timerRadio} />
      </ControlBox>
    </StyledDigitalClock>
  );
};

export default DigitalClock;
