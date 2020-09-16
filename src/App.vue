<template>
  <Navbar title="Registros de chat" />
  <section class="section">
    <div class="container">
      <div class="tabs is-fullwidth">
        <ul>
          <li :class="{'is-active': activeTab === 'logs'}">
            <a @click="switchTab('logs')">
              <span class="icon is-small"><ion-icon name="document-text-outline" /></span>
              <span>Buscar mensajes</span>
            </a>
          </li>
          <li :class="{'is-active': activeTab === 'live-chat'}">
            <a @click="switchTab('live-chat')">
              <span class="icon is-small"><ion-icon name="chatbubbles-outline" /></span>
              <span>Chat en directo</span>
            </a>
          </li>
          <li :class="{'is-active': activeTab === 'event-stats'}">
            <a @click="switchTab('event-stats')">
              <span class="icon is-small"><ion-icon name="star-outline" /></span>
              <span>Evento</span>
            </a>
          </li>
          <li :class="{'is-active': activeTab === 'analytics'}">
            <a @click="switchTab('analytics')">
              <span class="icon is-small"><ion-icon name="analytics-outline" /></span>
              <span>Estadísticas</span>
            </a>
          </li>
        </ul>
      </div>
      <LogSearchView v-show="activeTab === 'logs'"/>
      <LiveChatView v-show="activeTab === 'live-chat'" />
      <EventStatsView v-show="activeTab === 'event-stats'" />
      <AnalyticsView v-if="analyticsLoaded" v-show="activeTab === 'analytics'" />
      <!--
        <router-view v-slot="{Component}">
          <keep-alive>
             <component :is="Component" />
          </keep-alive>
        </router-view>
      -->
    </div>
  </section>
  <Footer />
</template>

<script>
  import LogSearchView from './views/LogSearchView.vue';
  import LiveChatView from './views/LiveChatView.vue';
  import EventStatsView from './views/EventStatsView.vue';
  import AnalyticsView from './views/AnalyticsView.vue';

  import Navbar from './components/Navbar.vue';
  import Footer from './components/Footer.vue';

  export default {
    name: 'App',
    components: {
      Navbar,
      Footer,
      LogSearchView,
      LiveChatView,
      EventStatsView,
      AnalyticsView
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