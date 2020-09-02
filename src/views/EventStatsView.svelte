<script>
    export let client, active;

    import Notification from '../components/Notification.svelte';
</script>

<main hidden={!active}>
    <section class="event-stats">
        <Notification type="info">Soon™</Notification>
    </section>
</main>