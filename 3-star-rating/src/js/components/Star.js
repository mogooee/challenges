import { $, $$ } from '../utils/index.js';

export class Star {
  constructor(value) {
    this.value = value;
    this.init();
  }

  init = () => {
    this.render();
  };

  render = () => {
    const rating = $('.star');
    rating?.insertAdjacentHTML('beforeend', this.createHTML());
  };

  createHTML = () => {
    return `<button class='star'></button>`;
  };

export default Star;
