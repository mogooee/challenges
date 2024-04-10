import { useEffect } from 'react';
import Rating from '../components/star-rating/Rating';
import { TOTAL_RATING_NUM } from '../constants/star-rating';
import { $ } from '../utils/star-rating';
import '../styles/star-rating/style.css';

const createRating = () => {
  const rating = new Rating(TOTAL_RATING_NUM);
  rating.init();
};

const createRatingHTML = () => '<div class="rating"></div>';

const render = (parent: HTMLDivElement) => {
  const main = parent;
  main.innerHTML = createRatingHTML();
};

const mainInit = (parent: HTMLDivElement) => {
  render(parent);
  createRating();
};

const StarRating = () => {
  useEffect(() => {
    const main = $('#main');
    mainInit(main);
  }, []);

  return <div id="main"></div>;
};

export default StarRating;
