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
        } else {
          this.highlightStar(stars[i]);
        }
  };

export default Star;
