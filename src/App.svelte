<script>
  // components
  import Navbar from './components/Navbar.svelte';
  import Footer from './components/Footer.svelte';

  // children views
  import LogSearchView from './views/LogSearchView.svelte';
  import LiveChatView from './views/LiveChatView.svelte';
  import EventStatsView from './views/EventStatsView.svelte';
  import AnalyticsView from './views/AnalyticsView.svelte';

  import Fa from 'svelte-fa'
  import { faFileAlt, faCommentDots, faStar, faChartBar } from '@fortawesome/free-regular-svg-icons';

  import io from 'socket.io-client';
  import feathers from '@feathersjs/feathers';
  import socketio from '@feathersjs/socketio-client';

  const socket = io(import.meta.env.DEV ? 'http://localhost:3030': import.meta.env.VITE_YVES_API);
  const client = feathers();
  client.configure(socketio(socket));

  let currentTab = 'logs';
  let analyticsTabLoaded = false;
</script>

<main>
  <Navbar title="Registros de chat"/>
  <section class="section">
  <div class="container">
  <div class="tabs is-fullwidth">
    <ul>
      <li class:is-active="{currentTab === 'logs'}" on:click="{() => currentTab = 'logs' }">
        <a>
          <span class="icon is-small"><Fa icon={faFileAlt} /></span>
          <span>Buscar mensajes</span>
        </a>
      </li>
      <li class:is-active="{currentTab === 'live-chat'}" on:click="{() => currentTab = 'live-chat' }">
        <a>
          <span class="icon is-small"><Fa icon={faCommentDots} /></span>
          <span>Chat en directo</span>
        </a>
      </li>
      <li class:is-active="{currentTab === 'event-stats'}" on:click="{() => currentTab = 'event-stats' }">
        <a>
          <span class="icon is-small"><Fa icon={faStar} /></span>
          <span>Evento</span>
        </a>
      </li>
      <li class:is-active="{currentTab === 'analytics'}" on:click="{() => { currentTab = 'analytics'; analyticsTabLoaded = true }}">
        <a>
          <span class="icon is-small"><Fa icon={faChartBar} /></span>
          <span>Estadísticas</span>
        </a>
      </li>
    </ul>
  </div>
  <LogSearchView client={client} active={currentTab === 'logs'} />
  <LiveChatView client={client} active={currentTab === 'live-chat'} />
  <EventStatsView client={client} active={currentTab === 'event-stats'} />
  {#if analyticsTabLoaded}
    <AnalyticsView active={currentTab === 'analytics'} />
  {/if}
</div>
</section>
<Footer/>
</main>