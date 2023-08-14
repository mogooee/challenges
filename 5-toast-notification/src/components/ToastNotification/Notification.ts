import { $ } from '@/utils';
import * as icon from '@/assets/icons';
import { ANIMATION_DELAY, NotificationType } from '@/constants';

class Notification {
  type: NotificationType;

  message: string;

  autoTimer: number;

  target: Element | null;

  constructor(type: NotificationType, message: string, autoTimer: number) {
    this.type = type;
    this.message = message;
    this.autoTimer = autoTimer;
    this.target = null;
  }

  init = () => {
    this.render();
    this.setEvents();
  };

  render = () => {
    $('.stack')?.insertAdjacentHTML('afterbegin', this.template());
    setTimeout(() => {
      this.target?.classList.add('on');
    });
  };

  template = () => {
    return `<div class='notification ${this.type}'>
              ${icon[this.type]}
              <span>${this.message}</span>
              <button class='cancel-btn'>${icon.cancel}</button>
           </div>`;
  };

  setEvents = () => {
    this.setTarget();
    this.setAutoTimer();
  };

  setTarget = () => {
    const target = $('.notification');
    if (!target) return;
    this.target = target;
  };

  setAutoTimer = () => {
    setTimeout(() => {
      this.target?.classList.toggle('on');
    }, this.autoTimer);
    setTimeout(() => {
      this.target?.remove();
    }, this.autoTimer + ANIMATION_DELAY);
  };
}

export default Notification;
