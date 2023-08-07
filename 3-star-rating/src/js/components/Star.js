import { RATING } from '../constants/index.js';
import { $, $$ } from '../utils/index.js';

export class Star {
  constructor(index, value, setValue) {
    this.index = index;
    this.value = value;
    this.setValue = setValue;
  }

  init = () => {
    this.render();
    this.setEvents();
  };

  render = () => {
    const rating = $('.stars');
    rating?.insertAdjacentHTML('beforeend', this.createHTML());
  };

  createHTML = () => {
    const state =
      this.value === RATING.INIT.value ? RATING.INIT.class : RATING.HALF.value ? RATING.HALF.class : RATING.ON.class;
    return `<button id='star-${this.index}' class='star ${state}'></button>`;
  };

  setEvents = () => {
    this.setTarget();
    this.target?.addEventListener('mousemove', this.colorStar);
    this.target?.addEventListener('click', this.setRating);
  };

  setTarget = () => {
    const star = $(`#star-${this.index}`);
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

  colorStar = (event) => {
    const stars = $$('.star');
    for (let i = 0; i < stars.length; i += 1) {
      if (i <= this.index) {
        if (i === this.index && event.offsetX < event.currentTarget.offsetWidth / 2) {
          this.highlightHalfStar(stars[i]);
          continue;
        }
        this.highlightStar(stars[i]);
      } else {
        this.noHighlightStar(stars[i]);
      }
    }
  };

  setRating = () => {
    if (this.target?.classList.contains(RATING.HALF.class)) {
      this.setValue(this.index + RATING.HALF.value);
      return;
    }

    if (this.target?.classList.contains(RATING.ON.class)) {
      this.setValue(this.index + RATING.ON.value);
    }
  };

  updateState = (value) => {
    if (value === RATING.ON.value) {
      this.highlightStar(this.target);
      return;
    }
    if (value === RATING.HALF.value) {
      this.highlightHalfStar(this.target);
      return;
    }

    this.noHighlightStar(this.target);
  };
}

export default Star;
