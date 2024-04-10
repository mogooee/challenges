import { NOTIFICATIONS } from '@/constants';
import Setter from '@/components/ToastNotification/Setter';
import Stack from '@/components/ToastNotification/Stack';

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
    const stack = new Stack();
    const notificationSetter = new Setter(NOTIFICATIONS);
    stack.init();
    notificationSetter.init();
  };
}

export default App;
