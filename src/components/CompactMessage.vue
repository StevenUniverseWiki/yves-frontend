<template>
  <article class="media message is-half">
    <div class="media-content">
      <small> [{{formattedTimestamp}}] </small>
      <template v-if="deleted">
        <strong>&lt;{{user}}&gt;</strong>: <ion-icon name="trash" /> <em>[Este elemento ha sido eliminado. Razón: {{deletionReason}}]</em>
      </template>
      <template v-else>
        <template v-if="event === 'MESSAGE'">
          <strong>&lt;{{user}}&gt;</strong>: <span v-html="this.parseTags(this.text)" />
        </template>
        <template v-else-if="event === 'ME'">
          <strong>&lt;{{user}}&gt;</strong>: <em>* {{user}} <span v-html="this.parseTags(this.text)" /></em>
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
    },
    methods: {
      parseTags(string) {
        const parsed = TagParser(string);
        return parsed;
      }
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