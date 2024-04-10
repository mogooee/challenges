export const $ = (selector: string) => document.querySelector(selector);
export const $$ = (selector: string) => document.querySelectorAll(selector);

export const toPascalCase = (string: string) => {
  return string.split('').reduce((acc, cur, i) => {
    if (i === 0) return cur.toUpperCase();
    return acc + cur;
  }, '');
};
