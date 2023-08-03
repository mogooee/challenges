import { useState, useRef } from 'react';
import { TIMER } from 'constants/index';
import { RadioData } from 'components/RadioButton';
import { getTens, getUnits } from 'utils/calcUnit';

const useTimer = () => {
  const [timer, setTimer] = useState<number>(0);
  let timerId = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerId.current) return;
    timerId.current = setInterval(() => {
      if (timer > TIMER.MAX_MINUTE * TIMER.PER_MINUTE_SEC + TIMER.MAX_SEC) {
        setTimer(TIMER.INIT);
      } else {
        setTimer((prev) => (prev += TIMER.SEC));
      }
    }, 1000);
  };


  const timerRadio: RadioData[] = [
    { title: 'start', checked: false, onClick: startTimer },
    { title: 'paused', checked: true, onClick: () => {} },
    { title: 'reset', checked: false, onClick: () => {} },
  ];

  const minute1 = getTens(timer / TIMER.PER_MINUTE_SEC);
  const minute2 = getUnits(timer / TIMER.PER_MINUTE_SEC);
  const sec1 = getTens(timer % TIMER.PER_MINUTE_SEC);
  const sec2 = getUnits(timer % TIMER.PER_MINUTE_SEC);

  return { time: { minute1, minute2, sec1, sec2 }, timerRadio };
};

export default useTimer;
