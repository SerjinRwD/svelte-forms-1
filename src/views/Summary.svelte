<script>
  import Wrapper from "../components/Wrapper.svelte";
  import { createEventDispatcher, onDestroy } from "svelte";
  import { character, navigation } from "../stores.js";
  import { propsMapping } from "../vocabularies";

  let summary = [];

  const dispatch = createEventDispatcher();
  const unsubscribe = character.subscribe(x => {
    let result = [];

    for (const p in x) {
      result.push({ key: p, value: x[p] });
    }

    summary = result;
  });

  function handleClick(viewName) {
    $navigation.isForward = false;
    dispatch("navigate", {
      view: viewName
    });
  }

  onDestroy(unsubscribe);
</script>

<Wrapper>
  {#each summary as { key, value }}
    <div class="columns">
      <div class="column is-one-quarter has-text-right has-text-weight-bold">
        {propsMapping[key]}
      </div>
      <div class="column">{value}</div>
    </div>
  {/each}
  <button
    type="button"
    class="button is-primary is-light"
    on:click={() => handleClick('View3')}>
    Назад
  </button>
</Wrapper>
