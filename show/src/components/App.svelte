<script lang="ts">
  import Footer from "./Footer.svelte";
  import { queue$ } from "../state/queue";

  queue$.subscribe(console.log);
</script>

<Footer />

<style>
  :global(body) {
    padding: 0;
    margin: 0;
    width: 100vw;
    height: 100vh;
  }
</style>
