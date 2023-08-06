import { $, $$ } from '../utils/index.js';

export class Star {
  constructor(value) {
    this.value = value;
    this.init();
    this.setEvents();
  }

  init = () => {
    this.render();
  };

  render = () => {
    const rating = $('.star');
    rating?.insertAdjacentHTML('beforeend', this.createHTML());
  };

  createHTML = () => {
    const state =
      this.value === RATING.INIT.value ? RATING.INIT.class : RATING.HALF.value ? RATING.HALF.class : RATING.ON.class;
    return `<button class='star ${state}'></button>`;
  };

  setEvents = () => {
    this.setTarget();
    this.target?.addEventListener('mousemove', this.mouseMoveStar);
    this.target?.addEventListener('click', this.setRating);
  };

  setTarget = () => {
    const star = $('.star');
    this.target = star;
  };

  noHighlightStar = (starElemnt) => {
    starElemnt.classList.remove('half', 'on');
  };

  highlightHalfStar = (starElement) => {
    starElement.classList.add('half');
    starElement.classList.remove('on');
  };

  highlightStar = (starElement) => {
    starElement.classList.add('on');
    starElement.classList.remove('half');
  };

  mouseMoveStar = (event) => {
    const star = $('.star');
        if (event.offsetX < event.currentTarget.offsetWidth / 2) {
          this.highlightHalfStar(stars[i]);
        }
        this.highlightStar(stars[i]);
  };

  setRating = () => {
    if (this.target?.classList.contains(RATING.HALF.class)) {
      this.value = RATING.HALF.value;
      this.highlightHalfStar(this.target);
      return;
    }

    if (this.target?.classList.contains(RATING.ON.class)) {
      this.value = RATING.ON.value;
      this.highlightStar(this.target);
    }
  };

export default Star;
