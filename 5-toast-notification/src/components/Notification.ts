import * as icon from '@/assets/icons';
import { $ } from '@/utils';

export type NotificationType = 'success' | 'info' | 'warning' | 'error';

class Notification {
  type: NotificationType;

  message: string;

  parent: Element | null;

  target: Element | null;

  constructor(type: NotificationType, message: string) {
    this.type = type;
    this.message = message;
    this.parent = null;
    this.target = null;
  }

  init = () => {
    this.render();
    this.setEvents();
  };

  render = () => {
    this.parent = $('.notification-stack');
    this.parent?.insertAdjacentHTML('afterbegin', this.template());
  };

  template = () => {
    return `<div class='toast-notification notify-${this.type}'>
          ${icon[this.type]}<span>${this.message}</span>
       <button class='notification-cancel'>${icon.cancel}</button>
    </div>`;
  };

  setEvents = () => {
    this.setTarget();
    this.target?.addEventListener('click', Notification.removeNotification);
  };

  setTarget = () => {
    const target = $('.toast-notification');
    if (!target) return;
    this.target = target;
  };

  static removeNotification = ({ target }: Event) => {
    if (!(target instanceof HTMLElement)) return;
    if (target.tagName !== 'BUTTON') return;
    const notification = target.closest('.toast-notification');
    notification?.remove();
  };
}

export default Notification;
