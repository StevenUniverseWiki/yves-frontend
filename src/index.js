import { createApp } from 'vue';
import App from './App.vue';
import 'bulma/css/bulma.css';
import './css/global.css';

// global components
import Notification from './components/Notification.vue';

const app = createApp(App);
app.component('Notification', Notification);

import io from 'socket.io-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import VueFeathers from './plugins/feathers.js';

const socket = io(import.meta.env.VITE_YVES_API || 'http://localhost:3030');
const client = feathers();
client.configure(socketio(socket));
app.use(VueFeathers, {client: client});

app.mount('#app');