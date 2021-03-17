<template>
  <article class="media message is-half">
    <div class="media-content">
      <small> [{{formattedTimestamp}}] </small>
      <template v-if="deleted">
        <strong>&lt;{{user}}&gt;</strong>: <i-ion:trash /> <em>[Este elemento ha sido eliminado. Razón: {{deletionReason}}]</em>
      </template>
      <template v-else>
        <template v-if="event === 'MESSAGE'">
          <strong>&lt;{{user}}&gt;</strong>: <span v-html="parsedMessage" />
        </template>
        <template v-else-if="event === 'ME'">
          <strong>&lt;{{user}}&gt;</strong>: <em>* {{user}} <span v-html="parsedMessage" /></em>
        </template>
        <template v-else-if="event === 'JOIN'">
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
  import TagParser from '../plugins/TagParser';

  export default {
    name: 'CompactMessage',
    props: {
      event: String,
      user: String,
      timestamp: String,
      text: String,
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
  .message {
    margin-top: 6px;
    margin-bottom: 6px;
    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 6px;
  }
</style>
