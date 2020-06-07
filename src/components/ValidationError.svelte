<script>
  import { fly } from "svelte/transition";
  export let errors = null;
  export let field = null;
</script>

<style>
  .is-bubble {
    margin-top: 0.25rem;
    position: absolute;
    z-index: 999;
    transition: opacity 200ms;
  }
  .is-bubble:hover {
    opacity: 0.5;
  }
</style>

{#if errors && errors[field]}
  <div transition:fly={{ y: -10 }} class="tag is-danger is-bubble">
    {errors[field][0]}
  </div>
{/if}
