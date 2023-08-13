import Notification from '@/components/Notification';
import { $ } from '@/utils';

class App {
  target: Element;

  constructor(target: Element) {
    this.target = target;
  }

  render = () => {
    this.target.innerHTML = App.template();
  };

  static template = () => {
    return `<main></main>`;
  };

  mount = () => {
    this.render();
    const notication = new Notification(
      $('main')!,
      'info',
      'Info toast notification',
    );
    notication.render();
  };
}

export default App;
