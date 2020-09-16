<template>
  <article class="system-message media message is-half">
    <div class="media-content message-text">
      <small> [{{formattedTimestamp}}] </small>
      <template v-if="deleted">
        <ion-icon name="trash" /> <i>[Este elemento ha sido eliminado. Razón: {{deletionReason}}]</i>
      </template>
      <template v-else>
        <template v-if="event === 'JOIN'">
          ~ {{user}} ha entrado al chat. ~
        </template>
        <template v-else-if="event === 'PART'">
          ~ {{user}} ha salido del chat. ~
        </template>
        <template v-else-if="event === 'KICK'">
          ~ {{targetUser}} fue expulsado por {{user}}. ~
        </template>
        <template v-else-if="event === 'BAN'">
          ~ {{targetUser}} fue baneado por {{user}} durante {{formattedBanLength}} (razón: {{banReason || 'no especificada'}}). ~
        </template>
        <template v-else-if="event === 'UNBAN'">
          ~ {{user}} revocó el ban de {{targetUser}} (razón: {{banReason || 'no especificada'}}). ~
        </template>
      </template>
    </div>
  </article>
</template>

<script>
  import { addMinutes, addSeconds, lightFormat, formatDistance } from 'date-fns';
  import { es } from 'date-fns/locale';

  export default {
    name: 'SystemMessage',
    props: {
      event: String,
      user: String,
      timestamp: String,
      targetUser: String,
      banLength: Number,
      banReason: String,
      deleted: Boolean,
      deletionReason: String
    },
    data() {
      return {
        banExpiry: null
      }
    },
    beforeUpdate() {
      if (this.event === 'BAN')
        this.banExpiry = addSeconds(new Date(this.timestamp), this.banLength);
    },
    computed: {
      formattedTimestamp() {
        return lightFormat(addMinutes(new Date(this.timestamp), new Date(this.timestamp).getTimezoneOffset()), "dd/MM/yyyy, h:mm:ss aa", {
          locale: es
        });
      },
      formattedBanLength() {
        if (!this.banLength) return 0;
        return formatDistance(new Date(this.banExpiry), new Date(this.timestamp), {
          locale: es
        });
      }
    }
  }
</script>

<style scoped>
  .system-message {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .system-message .message-text {
    text-align: center;
    padding: 6px;
    border-radius: 6px;
  }
</style>