import { useEffect } from 'react';
import { NOTIFICATIONS } from '../constants/notification';
import Setter from '../components/notification/Setter';
import Stack from '../components/notification/Stack';
import '../styles/notification/style.css';

const Notification = () => {
  useEffect(() => {
    const stack = new Stack();
    const notificationSetter = new Setter(NOTIFICATIONS);
    stack.init();
    notificationSetter.init();
  }, []);

  return <main></main>;
};

export default Notification;
