import Star from '../components/Star.js';

const createStar = () => {
  new Star();
};

const createStarHTML = () => '<div class="star"></div>';

const render = (parent) => {
  const main = parent;
  main.innerHTML = createStarHTML();
};

const mainInit = (parent) => {
  render(parent);
  createStar();
};

export default mainInit;
