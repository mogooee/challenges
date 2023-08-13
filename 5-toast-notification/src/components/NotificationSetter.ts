import { toPascalCase } from '@/utils';
import { NotificationType } from '@/components/Notification';

class NotificationSetter {
  target: Element;

  static notificationTypes: NotificationType[] = [
    'success',
    'info',
    'warning',
    'error',
  ];

  constructor(target: Element) {
    this.target = target;
  }

  render = () => {
    this.target.insertAdjacentHTML('beforeend', NotificationSetter.template());
  };

  static template = () => {
    return `<div class='notification-setter'>
    ${NotificationSetter.notificationTypes
      .map((type) => `<button class=${type}>${toPascalCase(type)}</button>`)
      .join('')}
    </div>`;
  };
}

export default NotificationSetter;
