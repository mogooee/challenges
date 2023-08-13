import * as icon from '@/assets/icons';
import { $ } from '@/utils';

export type NotificationType = 'success' | 'info' | 'warning' | 'error';

class Notification {
  parent: Element;

  type: NotificationType;

  message: string;

  target: Element | null;

  constructor(parent: Element, type: NotificationType, message: string) {
    this.parent = parent;
    this.type = type;
    this.message = message;
    this.target = null;
  }

  init = () => {
    this.render();
    this.setEvents();
  };

  render = () => {
    this.parent.insertAdjacentHTML('beforeend', this.template());
  };

  template = () => {
    return `<div class='toast-notification notify-${this.type}'>
          ${icon[this.type]}<span>${this.message}</span>
       <button class='notification-cancel'>${icon.cancel}</button>
    </div>`;
  };

  setEvents = () => {
    this.setTarget();
    this.target?.addEventListener('click', this.removeNotification);
  };

  setTarget = () => {
    const target = $('.toast-notification');
    if (!target) return;
    this.target = target;
  };

  removeNotification = ({ target }: Event) => {
    if (!(target instanceof HTMLElement)) return;
    if (target.tagName !== 'BUTTON') return;
    this.target?.remove();
  };
}

export default Notification;
