<template>
  <article class="media message is-half">
    <figure class="media-left image is-64x64">
      <img class="user-avatar" :src="userAvatar" :alt="`Avatar de ${this.username}`">
    </figure>
    <div class="media-content">
      <strong>{{username}}</strong>
      <small>{{formattedTimestamp}}</small>
      <br />
      <div class="msg-content">
        <template v-if="deleted">
          <ion-icon name="trash" /> <i>Este elemento ha sido eliminado. Razón: {deletionReason}</i>
        </template>
        <template v-else>
          <template v-if="isRoleplay">
            <i>* {{username}} <span v-html="this.parseTags(this.message)" /></i>
          </template>
          <span v-else v-html="this.parseTags(this.message)" />
        </template>
      </div>
    </div>
  </article>
</template>

<script>
  import { addMinutes, format } from 'date-fns';
  import { es } from 'date-fns/locale';
  import axios from 'axios';
  import TagParser from '../plugins/TagParser';

  export default {
    name: 'ChatMessage',
    props: {
      username: String,
      timestamp: String,
      message: String,
      isRoleplay: Boolean,
      deleted: Boolean,
      deletionReason: String
    },
    data() {
      return {
        userAvatar: 'https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/100'
      }
    },
    mounted() {
      this.fetchAvatar();
    },
    updated () {
      this.fetchAvatar();
    },
    computed: {
      formattedTimestamp() {
        return format(addMinutes(new Date(this.timestamp), new Date(this.timestamp).getTimezoneOffset()), "d 'de' MMMM 'de' yyyy, h:mm:ss aa", {
          locale: es
        });
      }
    },
    methods: {
      fetchAvatar() {
        axios.get(`https://cors-anywhere.herokuapp.com/https://community.fandom.com/api/v1/User/Details?ids=${this.username}`).then((response) => {
          const body = response.data;
          if (body.items && body.items[0] && body.items[0].avatar) {
            this.userAvatar = body.items[0].avatar;
          }
        }).catch((err) => {
          console.error(`Error loading ${this.username}'s avatar: ${err}`);
        });
      },
      parseTags(string) {
        const parsed = TagParser(string);
        return parsed;
      }
    }
  }
</script>

<style scoped>
  .message {
    margin-top: 10px;
    margin-bottom: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
  }

  .user-avatar {
    border-radius: 6px;
  }

  .media-content > strong {
    margin-right: 5px;
  }
</style>