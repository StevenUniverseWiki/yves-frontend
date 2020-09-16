<template>
  <div :class="notificationClasses">
    <button v-if="dismissible" class="delete" @click="this.$emit('dismiss')"></button>
    <span class="icon is-medium"><ion-icon size="large" :name="iconName" /></span>
    <span class="notif-message"><slot /></span>
  </div>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    type: String,
    dismissible: Boolean
  },
  emits: ['dismiss'],
  computed: {
    notificationClasses() {
      return ['notification', 'is-light', `is-${this.type}`];
    },
    iconName() {
      switch (this.type) {
        case 'success': {
          return 'checkmark-circle';
        }
        case 'warn': {
          return 'alert-circle';
        }
        case 'danger': {
          return 'bug';
        }
        case 'info':
        default: {
          return 'information-circle';
        }
      }
    }
  }
}
</script>

<style scoped>
  .notification {
    margin-top: 1em;
    margin-bottom: 1em;
    display: flex;
    align-items: center;
  }
  .notification > .icon {
    margin-right: 0.4em;
  }
</style>