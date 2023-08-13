import * as icon from '@/assets/icons';
import { $ } from '@/utils';

export type NotificationType = 'success' | 'info' | 'warning' | 'error';

class Notification {
  type: NotificationType;

  message: string;

  parent: Element | null;

  target: Element | null;

  autoTimer: number;

  animationDelay: number;

  constructor(type: NotificationType, message: string) {
    this.type = type;
    this.message = message;
    this.parent = null;
    this.target = null;
    this.autoTimer = 4000;
    this.animationDelay = 550;
  }

  init = () => {
    this.render();
    this.setEvents();
  };

  render = () => {
    this.parent = $('.notification-stack');
    this.parent?.insertAdjacentHTML('afterbegin', this.template());
    setTimeout(() => {
      this.target?.classList.add('on');
    });
  };

  template = () => {
    return `<div class='toast-notification notify-${this.type}'>
          ${icon[this.type]}<span>${this.message}</span>
       <button class='notification-cancel'>${icon.cancel}</button>
    </div>`;
  };

  setEvents = () => {
    this.setTarget();
    this.setAutoTimer();
    this.target?.addEventListener('click', this.removeNotification);
  };

  setTarget = () => {
    const target = $('.toast-notification');
    if (!target) return;
    this.target = target;
  };

  setAutoTimer = () => {
    setTimeout(() => {
      this.target?.classList.toggle('on');
    }, this.autoTimer);
    setTimeout(() => {
      this.target?.remove();
    }, this.autoTimer + this.animationDelay);
  };

  removeNotification = ({ target }: Event) => {
    if (!(target instanceof HTMLElement)) return;
    if (target.tagName !== 'BUTTON') return;
    const notification = target.closest('.toast-notification');
    notification?.classList.toggle('on');
    setTimeout(() => {
      notification?.remove();
    }, this.animationDelay);
  };
}

export default Notification;
