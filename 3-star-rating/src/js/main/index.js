import Rating from '../components/Rating.js';
import { TOTAL_RATING_NUM } from '../constants/index.js';

const createRating = () => {
  const rating = new Rating(TOTAL_RATING_NUM);
  rating.init();
};

const createRatingHTML = () => '<div class="rating"></div>';

const render = (parent) => {
  const main = parent;
  main.innerHTML = createRatingHTML();
};

const mainInit = (parent) => {
  render(parent);
  createRating();
};

export default mainInit;
