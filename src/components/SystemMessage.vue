<template>
  <article class="system-message media message is-half">
    <div class="media-content message-text">
      <small> [{{formattedTimestamp}}] </small>
      <template v-if="deleted">
        <i-ion:trash /> <em>[Este elemento ha sido eliminado. Razón: {{deletionReason}}]</em>
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
    setup(props) {
      const formattedTimestamp = lightFormat(addMinutes(new Date(props.timestamp), new Date(props.timestamp).getTimezoneOffset()), "dd/MM/yyyy, h:mm:ss aa", {
        locale: es
      });

      let formattedBanLength = null;
      if (props.event === 'BAN') {
        const banExpiry = addSeconds(new Date(props.timestamp), props.banLength);
        formattedBanLength = formatDistance(new Date(banExpiry), new Date(props.timestamp), {
          locale: es
        });
      }

      const parsedMessage = props.text ? TagParser(props.text) : props.text;

      return { formattedBanLength, formattedTimestamp, parsedMessage }
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
