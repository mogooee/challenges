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

  const pauseTimer = () => {
    if (!timerId.current) return;
    clearInterval(timerId.current);
    timerId.current = null;
  };

  const resetTimer = () => {
    if (timerId.current) {
      clearInterval(timerId.current);
    }
    setTimer(TIMER.INIT);
    timerId.current = null;
  };

  const timerRadio: RadioData[] = [
    { title: 'start', checked: false, onClick: startTimer },
    { title: 'paused', checked: true, onClick: pauseTimer },
    { title: 'reset', checked: false, onClick: resetTimer },
  ];

  const minute1 = getTens(timer / TIMER.PER_MINUTE_SEC);
  const minute2 = getUnits(timer / TIMER.PER_MINUTE_SEC);
  const sec1 = getTens(timer % TIMER.PER_MINUTE_SEC);
  const sec2 = getUnits(timer % TIMER.PER_MINUTE_SEC);
  const flicker = sec2 % 2;

  return { time: { minute1, minute2, sec1, sec2 }, flicker, timerRadio, resetTimer };
};

export default useTimer;
