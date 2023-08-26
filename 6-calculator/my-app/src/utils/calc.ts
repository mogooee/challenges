import { INIT_VALUE, KEY, OPERATOR_PRIORITY } from '@/constants';

export const isNumber = (value: string | number): boolean =>
  !Number.isNaN(Number(value));

export const isOperator = (value: string | number): boolean => {
  const keys = Object.values(KEY);
  for (let i = 0; i < keys.length; i += 1) {
    if (value === keys[i] && value !== KEY.POINT && value !== KEY.CLEAR) {
      return true;
    }
  }
  return false;
};

export const getPointer = (value: string | number) => {
  if (!value) {
    return `${INIT_VALUE}${KEY.POINT}`;
  }
  if (!Number.isInteger(value) || String(value).at(-1) === KEY.POINT) {
    return value;
  }
  return `${value}${KEY.POINT}`;
};

const fixPoint = (value: number): number => {
  const FIXED_NUM = 2;
  return Number.isInteger(value) ? value : Number(value.toFixed(FIXED_NUM));
};

export const calc = (value: string): number => {
  const [n1, sign, n2] = value.split(' ');
  const num1 = Number(n1);
  const num2 = Number(n2);
  let answer = 0;

  if (sign === KEY.PLUS) {
    answer = num1 + num2;
  }
  if (sign === KEY.MINUS) {
    answer = num1 - num2;
  }
  if (sign === KEY.MULTIPLE) {
    answer = num1 * num2;
  }
  if (sign === KEY.DIVIDE) {
    answer = num1 / num2;
  }
  if (sign === KEY.MOD) {
    answer = num1 % num2;
  }

  return fixPoint(answer);
};

export const convertInfixToPostfix = (infix: (number | string)[]) => {
  const postFix = [];
  const stack = [];

  const isTopHighest = (top: string, cur: string): boolean => {
    return OPERATOR_PRIORITY[top] <= OPERATOR_PRIORITY[cur];
  };

  for (let i = 0; i < infix.length; i += 1) {
    const express = infix[i];
    if (express === KEY.OPEN_BRACKET) {
      stack.push(express);
    } else if (express === KEY.CLOSE_BRACKET) {
      while (stack.at(-1) !== KEY.OPEN_BRACKET) {
        postFix.push(stack.pop());
      }
      stack.pop();
    } else if (
      express === KEY.MULTIPLE ||
      express === KEY.DIVIDE ||
      express === KEY.PLUS ||
      express === KEY.MINUS
    ) {
      while (stack.length && isTopHighest(stack.at(-1)!, express)) {
        postFix.push(stack.pop());
      }
      stack.push(express);
    } else {
      postFix.push(express);
    }
  }

  while (stack.length) {
    postFix.push(stack.pop());
  }

  return postFix;
};

export const calcPostFix = (postFix: (string | number)[]): number => {
  const stack = [];

  for (let i = 0; i < postFix.length; i += 1) {
    if (isNumber(postFix[i])) {
      stack.push(postFix[i]);
    } else {
      const num2 = stack.pop();
      const num1 = stack.pop();
      const result = calc(`${num1} ${postFix[i]} ${num2}`);
      stack.push(result);
    }
  }

  return stack[0] as number;
};
