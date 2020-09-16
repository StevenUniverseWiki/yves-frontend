<template>
  <section class="LiveChatView">
    <Notification type="info">Los nuevos mensajes aparecerán en tiempo real en esta página.</Notification>
    <hr>
    <div class="interface-options">
      <label class="label">
      <input class="checkbox" type="checkbox" v-model="uiState.compactMode">
      Modo compacto (útil al copiar varios mensajes)
      </label>
    </div>
    <hr>
    <ul class="entries">
      <li v-for="entry in liveMessages">
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
  </section>
</template>

<script>
  import ChatMessage from '../components/ChatMessage.vue';
  import SystemMessage from '../components/SystemMessage.vue';
  import CompactMessage from '../components/CompactMessage.vue';

  export default {
    name: 'LiveChatView',
    components: {
      ChatMessage,
      SystemMessage,
      CompactMessage
    },
    mounted() {
      const messageService = this.$feathers.service('entries');
      messageService.on('created', (message) => {
        if (import.meta.env.DEV) console.log('Message created: ', message);
        this.liveMessages.push(message);
      });
    },
    data() {
      return {
        liveMessages: [],
        uiState: {
          compactMode: false
        }
      }
    }
  }
</script>