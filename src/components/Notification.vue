<template>
  <div :class="notificationClasses">
    <button v-if="dismissible" class="delete" @click="$emit('dismiss')"></button>
    <span class="icon is-medium">
      <i-ion:checkmark-circle v-if="type === 'success'" />
      <i-ion:alert-circle v-else-if="type === 'warn'" />
      <i-ion:bug v-else-if="type === 'danger'" />
      <i-ion:information-circle v-else />
    </span>
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
    font-size: 1.4em;
  }
</style>