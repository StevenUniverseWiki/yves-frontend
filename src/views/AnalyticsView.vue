<template>
  <section class="AnalyticsView">
    <Notification type="info">Esta sección provee información sobre métricas de uso del chat, representadas como gráficos.</Notification>
    <Chart name="messages-last-30-days" chartId="98de19e7-41b0-4c03-b0d5-a8544e23563d" />
  </section>
</template>

<script>
  import Notification from '../components/Notification.vue';
  import Chart from '../components/Chart.vue';

  export default {
    name: 'AnalyticsView',
    components: {
      Chart,
      Notification
    },
    data() {
      return {
      }
    }
  }
</script>