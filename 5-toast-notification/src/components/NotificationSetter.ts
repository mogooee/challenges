import { $, toPascalCase } from '@/utils';
import Notification, { NotificationType } from '@/components/Notification';

interface NotificationTypes {
  type: NotificationType;
  message: string;
}
const notificationTypes: NotificationTypes[] = [
  { type: 'success', message: 'Success toast notification' },
  { type: 'info', message: 'Info toast notification' },
  { type: 'warning', message: 'Warning toast notification' },
  { type: 'error', message: 'Error toast notification' },
];
class NotificationSetter {
  parent: Element;

  target: Element | null;

  constructor(parent: Element) {
    this.parent = parent;
    this.target = null;
  }

  init = () => {
    this.render();
    this.setEvents();
  };

  render = () => {
    this.parent.insertAdjacentHTML('beforeend', NotificationSetter.template());
  };

  static template = () => {
    return `<div class='notification-setter'>
    ${notificationTypes
      .map(({ type }) => `<button class=${type}>${toPascalCase(type)}</button>`)
      .join('')}
    </div>
    <div class='notification-stack'></div>
    `;
  };

  setEvents = () => {
    this.setTarget();
    this.target?.addEventListener('click', NotificationSetter.setNotification);
  };

  setTarget = () => {
    this.target = $('.notification-setter');
  };

  static setNotification = ({ target }: Event) => {
    if (!(target instanceof HTMLElement)) return;
    if (target.tagName !== 'BUTTON') return;
    const type = target.className as NotificationType;
    const message = notificationTypes.find((e) => e.type === type)?.message;
    const notification = new Notification(type, message!);
    notification.init();
  };
}

export default NotificationSetter;
