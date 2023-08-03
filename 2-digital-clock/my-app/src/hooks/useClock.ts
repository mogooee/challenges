import { useState } from 'react';
import { RadioData } from 'components/RadioButton';
import { getTens, getUnits } from '../utils/calcUnit';

interface Clock {
  hour: number;
  minute: number;
  sec: number;
}

const useClock = () => {
  const [clock, setClock] = useState<Clock>({
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
    sec: new Date().getSeconds(),
  });

  const clockRadio: RadioData[] = [
    {
      title: '12',
      checked: true,
      onClick: () => {},
    },
    {
      title: '24',
      checked: false,
      onClick: () => {},
    },
  ];

  const startClock = () => {
    const date = new Date();
    setClock({ hour: date.getHours(), minute: date.getMinutes(), sec: date.getSeconds() });
  };

  const hour1 = getTens(clock.hour);
  const hour2 = getUnits(clock.hour);
  const minute1 = getTens(clock.minute);
  const minute2 = getUnits(clock.minute);

  return { time: { hour1, hour2, minute1, minute2 }, clockRadio, startClock };
};

export default useClock;
