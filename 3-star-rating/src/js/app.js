import { $ } from './utils/index.js';
import mainInit from './main/index.js';

class App {
  constructor(target) {
    this.target = target;
  }

  render = () => {
    this.target.innerHTML = this.template();
  };

  template = () => {
    return `<main></main>`;
  };

  mount = () => {
    const main = $('main');
    mainInit(main);
  };
}

const app = new App($('#app'));
app.render();
app.mount();
