<script>
  import { scale, fly } from "svelte/transition";
  import { navigation } from "../stores.js";

  let isAbsolute = false;
</script>

<style>
  div.wrapper {
    transition-property: max-height;
  }
  div.wrapper.is-absolute {
    position: absolute;
  }
</style>

<!-- transition:scale -->
<div
  in:fly={{ x: $navigation.isForward ? 40 : -40 }}
  out:fly={{ x: $navigation.isForward ? -40 : 40 }}
  on:outrostart={() => (isAbsolute = true)}
  class="wrapper is-marginless is-paddingless"
  class:is-absolute={isAbsolute}>
  <slot />
</div>
