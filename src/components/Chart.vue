<template>
  <div class="chart">
    <div v-if="chartOptions">
      <Highcharts :options="chartOptions" />
    </div>
    <Notification v-else-if="error" type="danger">Ocurrió un error: {{error}} ({{chartId}})</Notification>
    <div v-else>
      <!-- TODO: Loading spinner -->
      loading...
    </div>
  </div>
</template>

<script>
  import Highcharts from 'highcharts';
  import { createHighcharts } from 'vue-highcharts';
  import axios from 'axios';
  import { addDays, isSameDay } from 'date-fns';
  import Notification from './Notification.vue';

  export default {
    name: 'Chart',
    components: {
      Notification,
      Highcharts: createHighcharts('Highcharts', Highcharts)
    },
    props: {
      name: String,
      chartId: String
    },
    methods: {

    },
    async created() {
      const { data } = await axios.get(`https://webhooks.mongodb-realm.com/api/client/v2.0/app/charts-suwchatbot-dsvyf/service/http/incoming_webhook/embedding?tolerance=3600&id=${this.chartId}`).catch((err) => {
        // handle error
        console.error(err);
      });
      if (data.data.documents) {
        const dates = [];
        const documents = data.data.documents;
        documents.forEach((value) => {
          dates.push({
            date: new Date(Object.values(value.x.year)[0], Object.values(value.x.month)[0],Object.values(value.x.date)[0]),
            messageCount: parseInt(Object.values(value.y)[0])
          });
        });
        dates.sort((a, b) => a.date - b.date);
        const dataPoints = [];
        for (let i = 0; i <= 30; i++) {
          const day = addDays(dates[0].date, i);
          const index = dates.findIndex(date => isSameDay(date.date, day));
          if (index !== -1) {
            dataPoints.push(dates[index].messageCount);
          } else {
            dataPoints.push(0);
          }
        }

        this.chartOptions = {...this.defaultChartOptions, ...{
          title: {
            text: data.title
          },
          plotOptions: {
            series: {
              pointStart: + dates[0].date,
              pointIntervalUnit: 'day'
            }
          },
          series: [
            {
              name: 'Mensajes enviados',
              data: dataPoints
            }
          ]
        }}
      } else {
        // no data, handle error.
      }
    },
    data() {
      return {
        loading: true,
        error: null,
        chartOptions: null,
        defaultChartOptions: {
          chart: {

          },
          credits: {
            enabled: false
          },
          tooltip: {
            xDateFormat: '%b %e'

          },
          yAxis: {
            title: {
              text: 'Mensajes'
            }
          },
          xAxis: {
            type: 'datetime'
          },
        }
      }
    }
  }
</script>

<style scoped>
</style>