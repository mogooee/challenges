import * as icon from '@/assets/icons';

export type NotificationType = 'success' | 'info' | 'warning' | 'error';

class Notification {
  target: Element;

  type: NotificationType;

  message: string;

  constructor(target: Element, type: NotificationType, message: string) {
    this.target = target;
    this.type = type;
    this.message = message;
  }

  render = () => {
    this.target.insertAdjacentHTML('beforeend', this.template());
  };

  template = () => {
    return `<div class='toast-notification notify-${this.type}'>
          ${icon[this.type]}<span>${this.message}</span>
       <button class='notification-cancel'>${icon.cancel}</button>
    </div>`;
  };
}

export default Notification;
