import '@/styles/style.css';
import { $ } from '@/utils';
import App from '@/app';

const app = new App($('#app') as Element);
app.mount();
