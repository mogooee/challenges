import { $, toPascalCase } from '@/utils';
import { AUTO_TIMER, Notifications, NotificationType } from '@/constants';
import Notification from '@/components/ToastNotification/Notification';

class Setter {
  target: Element | null;

  notifications: Notifications[];

  autoTimer: number;

  constructor(notificationTypes: Notifications[]) {
    this.notifications = notificationTypes;
    this.autoTimer = AUTO_TIMER;
    this.target = null;
  }

  init = () => {
    this.render();
    this.setEvents();
  };

  render = () => {
    $('main')?.insertAdjacentHTML('beforeend', this.template());
  };

  template = () => {
    return `<div class='setter'>
    ${this.notifications
      .map(({ type }) => `<button class=${type}>${toPascalCase(type)}</button>`)
      .join('')}
    </div>`;
  };

  setEvents = () => {
    this.setTarget();
    this.target?.addEventListener('click', this.setNotification);
  };

  setTarget = () => {
    this.target = $('.setter');
  };

  setNotification = ({ target }: Event) => {
    if (!(target instanceof HTMLElement) || target.tagName !== 'BUTTON') return;
    const type = target.className as NotificationType;
    const message = this.notifications.find((e) => e.type === type)?.message;
    if (!message) return;
    const notification = new Notification(type, message, this.autoTimer);
    notification.init();
  };
}

export default Setter;
