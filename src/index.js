import { createApp } from 'vue';
import App from './App.vue';
import 'bulma/css/bulma.css';
import './css/global.css';

// global components
import Notification from './components/Notification.vue';

const app = createApp(App);
app.component('Notification', Notification);

/*
import { createRouter, createWebHistory } from 'vue-router';
// views
import LogSearchView from './views/LogSearchView.vue';
import LiveChatView from './views/LiveChatView.vue';
import EventStatsView from './views/EventStatsView.vue';
import AnalyticsView from './views/AnalyticsView.vue';
*/

/*
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'logs',
      path: '/logs',
      alias: '/',
      component: LogSearchView,
      props: route => ({ query: route.query.q })
    },
    {
      name: 'live-chat',
      path: '/live-chat',
      component: LiveChatView
    },
    {
      name: 'event-stats',
      path: '/event-stats',
      component: EventStatsView
    },
    {
      name: 'analytics',
      path: '/analytics',
      component: AnalyticsView
    }
  ],
});

app.use(router);
*/

import io from 'socket.io-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import VueFeathers from './plugins/feathers.js';

const socket = io(import.meta.env.VITE_YVES_API);
const client = feathers();
client.configure(socketio(socket));
app.use(VueFeathers, {client: client});

app.mount('#app');