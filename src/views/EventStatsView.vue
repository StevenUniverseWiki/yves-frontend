<template>
  <section class="EventStatsView container">
    <h2 class="subtitle is-4">Tabla de clasificación</h2>
    <table class="table is-striped is-fullwidth is-hoverable">
      <thead>
        <tr>
          <th>#</th>
          <th>Usuario</th>
          <th>Puntos</th>
          <th>Vidas restantes</th>
          <th>Desafíos especiales</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, i) in eventStats">
          <td>{{i + 1}}</td>
          <td>{{user.username}}</td>
          <td>{{user.points}}</td>
          <td>{{user.lives}}</td>
          <td v-if="user.specialEvents">
            <span v-for="(evt, name) in user.specialEvents" class="tag is-success">{{name}} ({{evt.points}} puntos)</span>
          </td>
          <td v-else />
        </tr>
      </tbody>
    </table>
    <hr>
    <h2 class="subtitle is-4">Información y reglas</h2>
    <div class="container is-fluid">
      <ul>
        <li>Todos los usuarios que participen en el chat al momento de iniciado (y luego de iniciado) el evento, participarán automáticamente en él.</li>
        <li>Por cada mensaje enviado, el participante ganará una cantidad aleatoria de puntos entre 2 y 4 (inclusive), los cuales constituirán el puntaje básico. Para prevenir los mensajes spam con el solo objetivo de sumar puntos, después de haber ganado puntos, se establece un temporizador que durante los próximos 10 segundos le impide volver a ganar puntos.</li>
        <li>Todos los usuarios iniciarán con un balance de puntos <b>0</b> (cero) y <b>3</b> (tres) "vidas". En diferentes circunstancias (las cuales se explicarán a continuación), el usuario podrá perder vidas. Si llegase a 0 vidas, quedará descalificado del evento, es decir, si bien seguirá formando parte de la tabla de clasificación, no podrá ganar puntos de ningún modo.</li>

      </ul><br />
      <h2 class="subtitle is-5">Desafíos especiales</h2>
      <ul class="special-events-help">
        <li>En determinadas circunstancias, los anfitriones podrán iniciar "desafíos especiales", cuyas reglas y objetivos serán anunciados en el momento.</li>
        <li>El usuario que resulte ganador de un desafío, recibirá una determinada cantidad de puntos (mostrados en la interfaz como "desafíos especiales"), y la posibilidad de restarle una vida a otro usuario de su elección.</li>
      </ul>
    </div>
    <hr>
    <h2 class="subtitle is-4">Comandos</h2>
    <table class="table is-striped is-fullwidth is-hoverable">
      <thead>
        <tr>
          <th>Comando</th>
          <th>Descripción</th>
          <th>Ejemplo</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>!stats</td>
          <td>Obtener las estadísticas (puntos, vidas, y premios especiales) para el usuario actual o para otro usuario</td>
          <td>
            <ul>
              <li>!stats</li>
              <li>!stats Weats</li>
            </ul>
          </td>          
        </tr>
        <tr>
          <td>
            <ul>
              <li>!leaderboard</li>
              <li>!top</li>
            </ul>
          </td>
          <td>Tablas de clasificación, versión simplificada de lo que puede visualizarse más arriba.</td>
          <td></td>
        </tr>
        <tr>
          <td>!leave</td>
          <td>Permite salir voluntariamente del evento, dejando de recibir puntos por mensajes y de ser elegible para los desafíos especiales. <b>Este comando no solicita confirmación</b>, por lo cual se recomienda discreción si se desea usar.</td>
          <td></td>
        </tr>
      </tbody>
    </table>

  </section>
</template>

<script>
export default {
  name: 'EventStatsView',
  props: {
  },
  mounted() {
    this.statsService = this.$feathers.service('event-stats');
    this.fetch();
    // Don't do this irl
    this.statsService.on('created', this.fetch);
    this.statsService.on('updated', this.fetch);
    this.statsService.on('patched', this.fetch);
  },

  methods: {
    fetch() {
      this.statsService.find({
        query: {
          "$sort": {
            "points": -1
          }          
        }
      }).then((data) => {
        this.eventStats = data.data;
      }).catch(console.error);      
    },
  },
  data() {
    return {
      eventStats: {}
    }
  }
}
</script>

<style scoped>
  .tag {
    margin-right: 6px;
  }
  .subtitle {
    text-decoration: underline;
  }
  ul {
    list-style-type: disc;
  }
  td ul {
    margin-left: 15px;
  }
  .special-events-help {
    margin-left: 1rem;
  }
</style>