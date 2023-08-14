export type NotificationType = 'success' | 'info' | 'warning' | 'error';
export interface Notifications {
  type: NotificationType;
  message: string;
}

export const NOTIFICATIONS: Notifications[] = [
  { type: 'success', message: 'Success toast notification' },
  { type: 'info', message: 'Info toast notification' },
  { type: 'warning', message: 'Warning toast notification' },
  { type: 'error', message: 'Error toast notification' },
];

export interface Timer {
  [key: string]: NodeJS.Timer | null;
}
export type TimerMode = 'PLAY' | 'STOP';

export const AUTO_TIMER = 4000;
export const ANIMATION_DELAY = 550;
export const PROGRESS = {
  INIT_VALUE: 0,
  MAX_VALUE: 1,
  TIMER: 100,
};
