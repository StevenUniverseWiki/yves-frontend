<script>
  export let type = 'info';

  import Fa from 'svelte-fa';
  import { faCheckCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
  let icon;
  switch(type) {
    case 'success': {
      icon = faCheckCircle;
      break;
    }
    case 'info':
    default: {
      icon = faInfoCircle;
      break;
    }
  }
</script>

<main>
  <div class="notification" class:is-info="{type === 'info'}" class:is-success="{type === 'success'}">
    <span class="icon is-medium"><Fa size="lg" icon={icon} /></span>
    <span class="notif-message"><slot /></span>
  </div>
</main>

<style>
  .notification {
    margin-top: 1em;
    margin-bottom: 1em;
  }

  .notification > .icon {
    display: inline-table;
    margin-right: -6px;
  }
</style>