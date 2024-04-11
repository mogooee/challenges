export const KEY = {
  PLUS: '+',
  MINUS: '-',
  MULTIPLE: '*',
  DIVIDE: '/',
  MOD: '%',
  CLEAR: 'C',
  EQUAL: '=',
  POINT: '.',
  OPEN_BRACKET: '(',
  CLOSE_BRACKET: ')',
};

export const SWITCH_SIGN = `${KEY.PLUS}/${KEY.MINUS}`;

export const KEYS = [
  [KEY.OPEN_BRACKET, KEY.CLOSE_BRACKET, KEY.MOD, KEY.CLEAR],
  [7, 8, 9, KEY.DIVIDE],
  [4, 5, 6, KEY.MULTIPLE],
  [1, 2, 3, KEY.MINUS],
  [0, KEY.POINT, KEY.EQUAL, KEY.PLUS],
];

interface Priority {
  [key: string]: number;
}

export const OPERATOR_PRIORITY: Priority = {
  '*': 1,
  '/': 1,
  '+': 2,
  '-': 2,
};

export const [MIN_INPUT_LENGTH, MAX_INPUT_LENGTH] = [0, 3];
export const INIT_VALUE = 0;
