import { $ } from '@/utils';
import { ANIMATION_DELAY, Notifications } from '@/constants';

export type AddNotification = (
  { type, message }: Notifications,
  autoTimer: number,
) => void;

class Stack {
  target: Element | null;

  constructor() {
    this.target = null;
  }

  init = () => {
    Stack.render();
    this.setEvents();
  };

  static render = () => {
    $('main')?.insertAdjacentHTML('beforeend', Stack.template());
  };

  static template = () => {
    return `<div class='stack'></div>`;
  };

  setEvents = () => {
    this.setTarget();
    this.target?.addEventListener('click', Stack.removeNotification);
  };

  setTarget = () => {
    const target = $('.stack');
    if (!target) return;
    this.target = target;
  };

  static removeNotification = ({ target }: Event) => {
    if (!(target instanceof HTMLElement) || target.tagName !== 'BUTTON') return;
    const notification = target.closest('.notification');
    notification?.classList.toggle('on');
    setTimeout(() => {
      notification?.remove();
    }, ANIMATION_DELAY);
  };
}

export default Stack;
