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
    this.setEvents();
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
      const star = new Star(index, RATING.INIT.value, this.setRating);
      star.init();
      this.stars.push(star);
    }
  };

  setEvents = () => {
    this.setMouseLeaveEvent();
  };

  setMouseLeaveEvent = () => {
    const stars = $('.stars');
    stars?.addEventListener('mouseleave', () => this.updateStars(this.rating));
  };

  setRating = (newValue) => {
    this.rating = newValue;
    this.updateStars(newValue);
    this.renderRatingMsg(newValue);
  };

  renderRatingMsg = (rating) => {
    const ratingMsg = $('.rating-msg');
    if (!ratingMsg) return;
    ratingMsg.textContent = MSG.RATING[Math.ceil(rating)];
  };

  calcStarValue = (rating, index) => {
    const totalOnStarNum = Math.ceil(rating);
    if (index === totalOnStarNum && !Number.isInteger(rating)) {
      return RATING.HALF.value;
    }
    return index <= totalOnStarNum ? RATING.ON.value : RATING.INIT.value;
  };

  updateStars = (rating) => {
    for (let index = 0; index < this.number; index += 1) {
      const value = this.calcStarValue(rating, index + 1);
      this.stars[index].updateState(value);
    }
  };
}

export default Rating;
