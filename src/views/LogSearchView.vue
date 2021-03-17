<template>
  <section class="LogSearchView">
    <Notification type="info">Todos los horarios son mostrados en horario del wiki (UTC).</Notification>
    <hr>
    <form>
      <div class="field">
        <template v-if="uiState.searchIsRegex">
          <label class="label" for="regex">Expresión regular:</label>
          <div class="field has-addons">
            <p class="control is-expanded">
              <input class="input" type="text" id="regex" v-model="uiState.textSearchField" placeholder="Pattern RegEx">
            </p>
            <p class="control">
              <input class="input" type="text" v-model="uiState.searchRegexOptions" placeholder="Opciones RegEx">
            </p>
          </div>
        </template>
        <template v-else>
          <label class="label" for="search">Texto a buscar:</label>
          <div class="control">
            <input class="input" id="search" type="text" name="search" v-model="uiState.textSearchField">
          </div>
        </template>         
      </div>
      <div class="field">
        <template v-if="!uiState.searchIsRegex">
          <p class="control">
            <label class="label" for="case_sensitive">
              <input class="checkbox" id="case_sensitive" type="checkbox" name="case_sensitive" v-model="uiState.searchIsCaseSensitive">
              Distinguir entre mayúsculas y minúsculas
            </label>
          </p>
        </template>
        <p class="control">
          <label class="label" for="isregex">
            <input class="checkbox" id="isregex" type="checkbox" name="isregex" v-model="uiState.searchIsRegex">
            Expresión regular
          </label>
        </p>
      </div>
      <hr>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label" for="startdate">Fecha y hora inicial:</label>
        </div>
        <div class="field-body">
          <div class="field is-narrow">
            <div class="control">
              <input class="input" id="startdate" type="datetime-local" name="startdate" v-model="uiState.startTimestampField">
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label" for="enddate">Fecha y hora final:</label>
        </div>
        <div class="field-body">
          <div class="field is-narrow">
            <div class="control">
              <input class="input" id="enddate" type="datetime-local" name="enddate" v-model="uiState.endTimestampField">
            </div>
          </div>
        </div>
      </div>
      <hr>
      <strong>Búsqueda por usuarios</strong>: No utilizar guiones bajos en los nombres. Para buscar varios usuarios, separar los nombres con una pleca/barra vertical (<code>|</code>).
      <br />
      <strong>Usuario(s) objetivo</strong>: Aplicable para expulsiones/bans/desbaneos.
      <br /><br />
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label" for="users">Usuario(s):</label>
        </div>
        <div class="field-body">
          <div class="field is-narrow">
            <div class="control has-icons-left">
              <input class="input" id="users" type="text" name="users" v-model="uiState.usernameField">
              <span class="icon is-small is-left">
                <i-ion:person />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label" for="targets">Usuario(s) objetivo:</label>
        </div>
        <div class="field-body">
          <div class="field is-narrow">
            <div class="control has-icons-left">
              <input class="input" id="targets" type="text" name="targets" v-model="uiState.targetUserField">
              <span class="icon is-small is-left">
                <i-ion:person />
              </span>                             
            </div>
          </div>
        </div>
      </div>
      <hr>
      <strong>Eventos</strong> (no marcar ninguno para buscar todos):<br />
      <div class="field">
        <p class="control">
          <label class="label">
            <input class="checkbox" type="checkbox" value="MESSAGE" v-model="uiState.events.message">
            Mensaje
          </label>
        </p>
        <p class="control">
          <label class="label">
            <input class="checkbox" type="checkbox" value="ME" v-model="uiState.events.me">
            Mensaje /me
          </label>
        </p>
        <p class="control">
          <label class="label">
            <input class="checkbox" type="checkbox" value="JOIN" v-model="uiState.events.join">
            Entrada
          </label>
        </p>
        <p class="control">
          <label class="label">
            <input class="checkbox" type="checkbox" value="PART" v-model="uiState.events.part">
            Salida
          </label>
        </p>
        <p class="control">
          <label class="label">
            <input class="checkbox" type="checkbox" value="KICK" v-model="uiState.events.kick">
            Expulsión
          </label>
        </p>
        <p class="control">
          <label class="label">
            <input class="checkbox" type="checkbox" value="BAN" v-model="uiState.events.ban">
            Ban
          </label>
        </p>
        <p class="control">
          <label class="label">
            <input class="checkbox" type="checkbox" value="UNBAN" v-model="uiState.events.unban">
            Ban revocado
          </label>
        </p>
      </div>
      <hr>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label" for="limit">Límite:</label>
        </div>
        <div class="field-body">
          <div class="field is-narrow">
            <div class="control">
              <input class="input" type="number" name="limit" id="limit" v-model="uiState.limitField">
            </div>
          </div>
        </div>
      </div>
      <button type="button" class="button is-info" :class="{'is-loading': uiState.loading}" id="query" @click="onSubmit">Buscar</button>

      <button type="button" class="button" @click="toggleQueryModal">Mostrar consulta</button>
      <br />
    </form>
    <hr>
    <div class="modal" :class="{'is-active': uiState.queryModalActive}">
      <div class="modal-background" @click="toggleQueryModal"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Consulta</p>
          <button type="button" class="delete" aria-label="close" @click="toggleQueryModal"></button>
        </header>
        <section class="modal-card-body">
          Este es el <em>objeto query</em> para la consulta construida con el formulario:
          <br /><br />
          <pre>{{JSON.stringify(searchQuery, null, 3)}}</pre>
        </section>
      </div>
    </div>
    <Notification v-if="uiState.error" type="danger" dismissible @dismiss="uiState.error = false">Ocurrió un error: {{uiState.errorMessage}}</Notification>
    <Notification v-if="uiState.noResults" type="info">La consulta no devolvió resultados.</Notification>
    <Notification v-if="entries.length" type="success">La consulta devolvió {{resultCount}} resultados.</Notification>
    <div class="resultsView" v-if="entries.length">
      <div class="interface-options">
        <label class="label">
        <input class="checkbox" type="checkbox" v-model="uiState.compactMode">
        Modo compacto (útil al copiar varios mensajes)
        </label>
        <nav class="pagination is-centered" role="navigation" aria-label="pagination" ref="searchTop">
          <button class="button pagination-previous" :class="{'is-loading': uiState.prevLoading}" @click="paginationPrev" :disabled="uiState.prevDisabled">Anterior</button>
          <button class="button pagination-next" :class="{'is-loading': uiState.nextLoading}" @click="paginationNext" :disabled="uiState.nextDisabled">Siguiente</button>
        </nav>
      </div>
      <hr>
      <ul class="entries">
        <li v-for="entry in entries" :key="entry._id">
          <CompactMessage v-if="uiState.compactMode" v-bind="entry" />
          <template v-else>
            <ChatMessage
              v-if="entry.event === 'MESSAGE' || entry.event === 'ME'"
              :username="entry.user"
              :timestamp="entry.timestamp"
              :message="entry.text"
              :isRoleplay="entry.event === 'ME'"
              :deleted="entry.deleted"
              :deletionReason="entry.deletionReason"
            />
            <SystemMessage v-else v-bind="entry" />
          </template>
        </li>
      </ul>
    <hr>
    <nav class="pagination is-centered" role="navigation" aria-label="pagination">
      <button class="button pagination-previous" :class="{'is-loading': uiState.prevLoading}" @click="paginationPrev" :disabled="uiState.prevDisabled">Anterior</button>
      <button class="button pagination-next" :class="{'is-loading': uiState.nextLoading}" @click="paginationNext" :disabled="uiState.nextDisabled">Siguiente</button>
    </nav>
    </div>
    <br />
  </section>
</template>

<script>
  import ChatMessage from '../components/ChatMessage.vue';
  import SystemMessage from '../components/SystemMessage.vue';
  import CompactMessage from '../components/CompactMessage.vue';
  export default {
    name: 'LogSearchView',
    props: {
      //query: String,
    },
    components: {
      ChatMessage,
      SystemMessage,
      CompactMessage
    },
    methods: {
      onSubmit() {
        if (this.uiState.initial) this.uiState.initial = false;
        this.searchQuery = this.buildQuery();
        this.uiState.loading = true;
        this.sendQuery().then(() => {
          this.uiState.loading = false;
        });
      },
      buildQuery() {
        let searchQuery = {};
        if (this.uiState.textSearchField) {
          if (this.uiState.searchIsRegex) {
            searchQuery.text = {
              $regex: this.uiState.textSearchField.trim()
            }
            if (this.uiState.searchRegexOptions.trim()) searchQuery.text.$options = this.uiState.searchRegexOptions.trim();
          } else {
            searchQuery.text = {
              $search: this.uiState.textSearchField.trim()
            }
            if (this.uiState.searchIsCaseSensitive) searchQuery.text.$searchCaseSensitive = true;
          }
        }
        if (this.uiState.startTimestampField || this.uiState.endTimestampField) {
          searchQuery.timestamp = {};
          if (this.uiState.startTimestampField) searchQuery.timestamp.$gt = this.uiState.startTimestampField;
          if (this.uiState.endTimestampField) searchQuery.timestamp.$lt = this.uiState.endTimestampField;
        }
        if (this.uiState.usernameField) {
          let users = this.uiState.usernameField.split('|');
          searchQuery.user = users.length > 1 ? users : this.uiState.usernameField.trim();
        }
        if (this.uiState.targetUserField) {
          let users = this.uiState.targetUserField.split('|');
          searchQuery.targetUser = users.length > 1 ? users : this.uiState.targetUserField.trim();     
        }
        searchQuery.event = [];
        Object.entries(this.uiState.events).forEach((event) => {
          if (event[1]) searchQuery.event.push(event[0].toUpperCase());
        });
        if (this.uiState.limitField > 0) searchQuery.$limit = parseInt(this.uiState.limitField);
        if (!searchQuery.event.length) delete searchQuery.event;
        searchQuery.$sort = {
          timestamp: 1
        }
        return searchQuery;
      },
      sendQuery() {
        if (import.meta.env.DEV) console.log('Query:', this.searchQuery);
        return new Promise((resolve, reject) => {
          this.$feathers.service('entries').find({
            query: this.searchQuery
          }).then((results) => {
            if (import.meta.env.DEV) console.log('Results:', results);
            this.uiState.noResults = (results.total === 0) ? true : false;
            this.entries = results.data;
            this.uiState.prevDisabled = results.skip === 0 ? true : false;
            this.uiState.nextDisabled = ((results.skip + (this.searchQuery.$limit || 100)) > results.total) ? true : false;
            this.resultCount = results.total;
            resolve();
          }).catch((err) => {
            console.error(err);
            this.uiState.errorMessage = err.message;
            this.uiState.error = true;
            this.uiState.loading = false;
          });
        });
      },
      paginationPrev() {
        this.searchQuery.$skip = this.searchQuery.$skip ? this.searchQuery.$skip - (this.searchQuery.$limit || 100) : 0;
        this.uiState.prevLoading = true;
        this.sendQuery().then(() => {
          this.uiState.prevLoading = false;
          this.$refs.searchTop.scrollIntoView();
        });
      },
      paginationNext() {
        this.searchQuery.$skip = this.searchQuery.$skip ? this.searchQuery.$skip + (this.searchQuery.$limit || 100) : this.searchQuery.$limit || 100;
        this.uiState.nextLoading = true;
        this.sendQuery().then(() => {
          this.uiState.nextLoading = false;
          this.$refs.searchTop.scrollIntoView();
        });
      },
      toggleQueryModal() {
        this.uiState.queryModalActive = !this.uiState.queryModalActive;
        if (this.uiState.queryModalActive) {
          this.searchQuery = this.buildQuery();
        }
      }
    },
    data() {
      return {
        searchQuery: {},
        entries: [],
        //messageService: this.client.service('entries'),
        resultCount: 0,
        uiState: {
          initial: true,
          loading: false,
          error: false,
          errorMessage: '',
          noResults: false,
          queryModalActive: false,
          // pagination
          prevDisabled: true,
          nextDisabled: false,
          prevLoading: false,
          nextLoading: false,
          // search fields
          textSearchField: '',
          searchIsCaseSensitive: false,
          searchIsRegex: false,
          searchRegexOptions: '',
          startTimestampField: '',
          endTimestampField: '',
          usernameField: '',
          targetUserField: '',
          events: {
            message: false,
            me: false,
            join: false,
            part: false,
            kick: false,
            ban: false,
            unban: false
          },
          limitField: 0,
          // pagination

          // display options
          compactMode: false
        }
      }
    }
  }
</script>

<style scoped>
  .button {
    margin-right: 0.5em;
  }
</style>