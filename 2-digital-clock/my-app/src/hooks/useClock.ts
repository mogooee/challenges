import { useState } from 'react';
import { RadioData } from 'components/RadioButton';
import { getTens, getUnits } from '../utils/calcUnit';

interface Clock {
  hour: number;
  minute: number;
  sec: number;
}

type ClockMode = '12-HOUR' | '24-HOUR';

const useClock = () => {
  const [mode, setMode] = useState<ClockMode>('12-HOUR');
  const [clock, setClock] = useState<Clock>({
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
    sec: new Date().getSeconds(),
  });

  const switch12HourMode = () => {
    setMode('12-HOUR');
  };

  const switch24HourMode = () => {
    setMode('24-HOUR');
  };

  const clockRadio: RadioData[] = [
    {
      title: '12',
      checked: true,
      onClick: switch24HourMode,
    },
    {
      title: '24',
      checked: false,
      onClick: switch12HourMode,
    },
  ];

  const startClock = () => {
    const date = new Date();
    setClock({ hour: date.getHours(), minute: date.getMinutes(), sec: date.getSeconds() });
  };

  const meridiem = clock.hour < 12 ? 'AM' : 'PM';
  const hour1 = getTens(mode === '12-HOUR' && clock.hour > 12 ? clock.hour - 12 : clock.hour);
  const hour2 = getUnits(mode === '12-HOUR' && clock.hour > 12 ? clock.hour - 12 : clock.hour);
  const minute1 = getTens(clock.minute);
  const minute2 = getUnits(clock.minute);
  const flicker = clock.sec % 2;

  return { mode, time: { hour1, hour2, minute1, minute2, meridiem }, flicker, clockRadio, startClock };
};

export default useClock;
