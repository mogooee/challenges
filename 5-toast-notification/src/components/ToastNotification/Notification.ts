import { $ } from '@/utils';
import * as icon from '@/assets/icons';
import {
  ANIMATION_DELAY,
  NotificationType,
  PROGRESS,
  Timer,
  TimerMode,
} from '@/constants';

class Notification {
  type: NotificationType;

  message: string;

  autoTimer: number;

  progressValue: number = PROGRESS.INIT_VALUE;

  target: HTMLDivElement | null = null;

  progressDOM: HTMLProgressElement | null = null;

  timer: Timer = { progressBar: null, animation: null, remover: null };

  constructor(type: NotificationType, message: string, autoTimer: number) {
    this.type = type;
    this.message = message;
    this.autoTimer = autoTimer;
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
    return `<div class='notification' data-type=${this.type}>
              ${icon[this.type]}
              <span>${this.message}</span>
              <button class='cancel-btn'>${icon.cancel}</button>
              <progress value="${PROGRESS.MAX_VALUE}"
               max="${PROGRESS.MAX_VALUE}"></progress>
           </div>`;
  };

  setEvents = () => {
    this.setTarget();
    this.setAutoTimer('PLAY');
    this.target?.addEventListener('mouseenter', () => {
      this.setAutoTimer('STOP');
    });
    this.target?.addEventListener('mouseleave', () => {
      this.setAutoTimer('PLAY');
    });
  };

  setTarget = () => {
    this.target = $('.notification') as HTMLDivElement;
  };

  setAutoTimer = (mode: TimerMode) => {
    if (mode === 'PLAY') {
      const autoTime = this.autoTimer - this.progressValue * PROGRESS.TIMER;
      this.setProgressBar();
      this.timer.animation = setTimeout(() => {
        this.progressDOM!.value = PROGRESS.INIT_VALUE;
        clearInterval(this.timer.progressBar!);
        this.target?.classList.remove('on');
      }, autoTime);
      this.timer.remover = setTimeout(() => {
        this.target?.remove();
      }, autoTime + ANIMATION_DELAY);
      return;
    }
    clearInterval(this.timer.progressBar!);
    clearTimeout(this.timer.animation!);
    clearTimeout(this.timer.remover!);
  };

  setProgressBar = () => {
    this.progressDOM = this.target?.querySelector(
      'progress',
    ) as HTMLProgressElement;
    this.timer.progressBar = setInterval(() => {
      const rate = this.progressValue / (this.autoTimer / PROGRESS.TIMER);
      this.progressDOM!.value = PROGRESS.MAX_VALUE - rate;
      this.progressValue += 1;
    }, PROGRESS.TIMER);
  };
}

export default Notification;
