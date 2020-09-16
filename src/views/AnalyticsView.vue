<template>
  <section class="AnalyticsView">
    <Chart name="messages-last-30-days" chartId="98de19e7-41b0-4c03-b0d5-a8544e23563d" />
  </section>
</template>

<script>
import Chart from '../components/Chart.vue';

export default {
  name: 'AnalyticsView',
  components: {
    Chart,
  },
  data() {
    return {
    }
  }
}
</script>