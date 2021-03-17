<template>
  <Navbar title="Registros de chat" />
  <section class="section">
    <div class="container">
      <div class="tabs is-fullwidth">
        <ul>
          <li :class="{'is-active': activeTab === 'logs'}">
            <a @click="switchTab('logs')">
              <span class="icon is-small"><i-ion:document-text-outline /></span>
              <span>Buscar mensajes</span>
            </a>
          </li>
          <li :class="{'is-active': activeTab === 'event-stats'}">
            <a @click="switchTab('event-stats')">
              <span class="icon is-small"><i-ion:star-outline /></span>
              <span>Evento</span>
            </a>
          </li>
        </ul>
      </div>
      <LogSearchView v-show="activeTab === 'logs'"/>
      <LiveChatView v-show="activeTab === 'live-chat'" />
      <EventStatsView v-show="activeTab === 'event-stats'" />
    </div>
  </section>
  <Footer />
</template>

<script>
  import LogSearchView from './views/LogSearchView.vue';
  import EventStatsView from './views/EventStatsView.vue';

  import Navbar from './components/Navbar.vue';
  import Footer from './components/Footer.vue';

  export default {
    name: 'App',
    components: {
      Navbar,
      Footer,
      LogSearchView,
      EventStatsView
    },
    data() {
      return {
        activeTab: 'logs',
        analyticsLoaded: false
      }
    },
    methods: {
      switchTab(tabName) {
        if (tabName === 'analytics' && !this.analyticsLoaded) {
          this.analyticsLoaded = true;
        }
        this.activeTab = tabName;
      }
    }
  }
</script>