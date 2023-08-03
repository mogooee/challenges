import { useState, useEffect } from 'react';
import styled from 'styled-components';
import RadioButton from './RadioButton';
import SevenSegment from './SevenSegment';
import ToggleBtn from './ToggleButton';
import useTimer from '../hooks/useTimer';
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

const Meridiem = styled.div`
  position: absolute;
  right: 16px;
  bottom: 0;
  font-size: 1.5em;
`;

const DigitalClock = () => {
  const [mode, setMode] = useState<'CLOCK' | 'TIMER'>('CLOCK');
  const { mode: clockMode, time: clockTime, flicker: clockFlicker, clockRadio, startClock } = useClock();
  const { time: timerTime, flicker: timerFlicker, timerRadio, resetTimer } = useTimer();

  const toggleMode = () => {
    if (mode === 'TIMER') resetTimer();
    setMode((prev) => (prev === 'CLOCK' ? 'TIMER' : 'CLOCK'));
  };

  useEffect(() => {
    const clockId = setInterval(startClock, 1000);
    return () => clearInterval(clockId);
  }, [startClock]);

  const hour1 = mode === 'CLOCK' ? clockTime.hour1 : timerTime.minute1;
  const hour2 = mode === 'CLOCK' ? clockTime.hour2 : timerTime.minute2;
  const minute1 = mode === 'CLOCK' ? clockTime.minute1 : timerTime.sec1;
  const minute2 = mode === 'CLOCK' ? clockTime.minute2 : timerTime.sec2;
  const flicker = mode === 'CLOCK' ? clockFlicker : timerFlicker;

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
        {mode === 'CLOCK' && clockMode === '12-HOUR' && <Meridiem className="meridiem">{clockTime.meridiem}</Meridiem>}
      </Monitor>
      <ControlBox>
        <ToggleBtn onMode="Clock" offMode="Timer" onClick={toggleMode} />
        <RadioButton radioData={mode === 'CLOCK' ? clockRadio : timerRadio} />
      </ControlBox>
    </StyledDigitalClock>
  );
};

export default DigitalClock;
