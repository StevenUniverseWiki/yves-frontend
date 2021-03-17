<template>
  <article class="media message is-half">
    <figure class="media-left image is-64x64">
      <img class="user-avatar" :src="userAvatar" :alt="`Avatar de ${username}`">
    </figure>
    <div class="media-content">
      <strong>{{username}}</strong>
      <small>{{formattedTimestamp}}</small>
      <br />
      <div class="msg-content">
        <template v-if="deleted">
          <i-ion:trash /> <em>Este elemento ha sido eliminado. Razón: {deletionReason}</em>
        </template>
        <template v-else>
          <template v-if="isRoleplay">
            <em>* {{username}} <span v-html="parsedMessage" /></em>
          </template>
          <span v-else v-html="parsedMessage" />
        </template>
      </div>
    </div>
  </article>
</template>

<script>
  import { ref } from 'vue';
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
      deletionReason: Boolean
    },
    setup(props) {
      let userAvatar = ref('https://vignette.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/100');

      const fetchAvatar = async () => {
        try {
          const { data } = await axios.get(`${import.meta.env.VITE_YVES_API || 'http://localhost:3030'}/api-proxy/User/Details?ids=${props.username}`);
          if (data.items && data.items[0] && data.items[0].avatar) {
            userAvatar.value = data.items[0].avatar;
          }
        } catch (err) {
          console.error('Error fetching avatar: ', err);
        }
      }

      const formattedTimestamp = format(addMinutes(new Date(props.timestamp), new Date(props.timestamp).getTimezoneOffset()), "d 'de' MMMM 'de' yyyy, h:mm:ss aa", {
        locale: es
      });

      const parsedMessage = props.message ? TagParser(props.message) : props.message;

      return { userAvatar, fetchAvatar, formattedTimestamp, parsedMessage }
    },
    mounted() {
      this.fetchAvatar();
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
