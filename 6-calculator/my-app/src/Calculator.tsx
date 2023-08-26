import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { KEYS, MIN_INPUT_LENGTH, INIT_VALUE, KEY } from '@/constants';
import Keyboard from '@/Keyboard';
import {
  calcPostFix,
  convertInfixToPostfix,
  getPointer,
  isNumber,
  isOperator,
} from '@/utils/calc';

const StyledCalculator = styled.div`
  display: grid;
  grid-template-rows: 0.4fr;
  width: 300px;
  height: 500px;
  border: 1px solid black;
  border-radius: 8px;
  font-family: fantasy;
  font-size: larger;
`;

const Monitor = styled.div`
  border-bottom: 1px solid black;
  padding: 0 14px;

  .history {
    color: gray;
  }
`;

type HandleKeyboardClick = Pick<MouseEvent, 'target'>;

const Calculator = () => {
  const [input, setInput] = useState<(number | string)[]>([]);
  const [result, setResult] = useState<number | string>();
  const [history, setHistory] = useState<string>('');
  const [openBracket, setOpenBracket] = useState<number>(INIT_VALUE);

  const isFirstInput = input.length === MIN_INPUT_LENGTH;
  const prevInput = input.at(-1)!;

  const initCalculator = () => {
    setInput([]);
    setResult(INIT_VALUE);
    setHistory('');
    setOpenBracket(INIT_VALUE);
  };

  const addInput = (newInput: number | string) => {
    setInput((prev) => [...prev, newInput]);
  };

  const replaceLastInput = (newInput: number | string) => {
    setInput((prev) => {
      return prev.map((e, i) => {
        if (i === prev.length - 1) {
          return newInput;
        }
        return e;
      });
    });
  };

  const calcExpression = (expression: (number | string)[]) => {
    const postFix = convertInfixToPostfix(expression);
    const calcResult = calcPostFix(postFix);

    setHistory(expression.join(' '));
    setResult(calcResult);
    setInput([]);
  };

  const clearResult = () => {
    if (result) {
      setResult(0);
    }
  };

  const handleKeyboardClick = ({ target }: HandleKeyboardClick) => {
    if (!(target instanceof HTMLButtonElement)) return;
    const { key } = target.dataset;
    if (!key) return;
    clearResult();

    if (key === KEY.CLEAR) {
      initCalculator();
      return;
    }

    if (key === KEY.EQUAL) {
      if (openBracket) {
        setResult('수식 오류');
        return;
      }
      calcExpression(input);
      return;
    }

    const validateFirstInput =
      isNumber(key) ||
      key === KEY.MINUS ||
      key === KEY.POINT ||
      key === KEY.OPEN_BRACKET ||
      key === KEY.CLOSE_BRACKET;

    if (isFirstInput && !validateFirstInput) {
      return;
    }

    if (key === KEY.POINT) {
      // 첫 입력값이거나 앞이 부호면 0. 추가
      if (isFirstInput || isOperator(prevInput)) {
        addInput(getPointer(''));
      } // 소수점은 앞이 숫자면 숫자의 맨 뒤에 소수점을 붙이거나 이미 소수점이 붙은 경우 생략한다.
      else if (isNumber(prevInput)) {
        replaceLastInput(getPointer(prevInput));
      }
      return;
    }

    if (key === KEY.OPEN_BRACKET) {
      addInput(key);
      setOpenBracket((prev) => prev + 1);
      return;
    }

    if (key === KEY.CLOSE_BRACKET && openBracket) {
      addInput(key);
      setOpenBracket((prev) => prev - 1);
      return;
    }

    if (isOperator(key)) {
      if (
        isNumber(prevInput) ||
        key === KEY.MINUS ||
        prevInput === KEY.CLOSE_BRACKET
      ) {
        addInput(key);
      }
      // 연산자 연속 중복 제거
      else if (isOperator(prevInput)) {
        replaceLastInput(key);
      } // 첫 입력값이 -이거나 닫힌 브라켓이거나 연산자 앞이 숫자면 추가

      return;
    }

    if (isNumber(key)) {
      // - 숫자로 치환
      if (prevInput === KEY.MINUS) {
        replaceLastInput(Number(`${KEY.MINUS}${key}`));
      } // 첫 입력값이거나 앞이 부호일 때 새로 추가
      else if (isFirstInput || isOperator(prevInput)) {
        addInput(Number(key));
      } // 앞이 숫자면 합친다.
      else if (isNumber(prevInput)) {
        replaceLastInput(Number(`${prevInput}${key}`));
      }
    }
  };

  return (
    <StyledCalculator>
      <Monitor>
        <p className="history">{history}</p>
        <p className="input">{result || input.join(' ') || INIT_VALUE}</p>
      </Monitor>
      <Keyboard keys={KEYS} handleKeyboardClick={handleKeyboardClick} />
    </StyledCalculator>
  );
};

export default Calculator;
