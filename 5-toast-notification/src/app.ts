import { $ } from '@/utils';
import Notification from '@/components/Notification';
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
    const notification = new Notification(
      mainDOM,
      'info',
      'Info toast notification',
    );
    const notificationSetter = new NotificationSetter(mainDOM);
    notification.init();
    notificationSetter.render();
  };
}

export default App;
