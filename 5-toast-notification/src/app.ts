import { $ } from '@/utils';
import NotificationSetter from '@/components/NotificationSetter';

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
    const mainDOM = $('main');
    if (!mainDOM) return;
    const notificationSetter = new NotificationSetter(mainDOM);
    notificationSetter.init();
  };
}

export default App;
