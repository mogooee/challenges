import { MSG, RATING } from '../constants/index.js';
import { $ } from '../utils/index.js';
import Star from './Star.js';

class Rating {
  constructor(number) {
    this.number = number;
    this.rating = RATING.INIT.value;
    this.stars = [];
  }

  init = () => {
    this.render();
    this.createStar(this.number);
  };

  render = () => {
    const rating = $('.rating');
    rating?.insertAdjacentHTML('beforeend', this.createHTML());
  };

  createHTML = () => {
    return `<h1>${MSG.GUIDANCE}</h1>
      <div class='stars'></div>
      <span class='rating-msg'></span>
      `;
  };

  createStar = (number) => {
    for (let index = 0; index < number; index += 1) {
      this.stars.push(new Star(index, RATING.INIT.value));
    }
  };

export default Rating;
