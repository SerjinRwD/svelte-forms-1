<script>
  /* А здесь я пробую библиотечку валидации validate.js */
  import Wrapper from "../components/Wrapper.svelte";
  import { createEventDispatcher } from "svelte";
  import { character, navigation } from "../stores.js";
  import { attitudes, religions } from "../vocabularies.js";
  import validate from "validate.js";

  const dispatch = createEventDispatcher();
  let errors = null;

  const constraints = {
    attitude: {
      presence: { allowEmpty: false }
    },
    religion: {
      presence: { allowEmpty: false }
    }
  };

  let isForward = true;

  function handleClick(viewName, forward) {
    $navigation.isForward = forward;

    dispatch("navigate", {
      view: viewName
    });
  }

  function handleSubmit(viewName, forward) {
    errors = validate(
      { attitude: $character.attitude, religion: $character.religion },
      constraints
    );

    if (errors) {
      return false;
    }

    $navigation.isForward = forward;

    dispatch("navigate", {
      view: viewName
    });
  }
</script>

<Wrapper>
  <form on:submit|preventDefault={() => handleSubmit('View3', true)} novalidate>
    <div class="field">
      <label class="label">Характер</label>
      <div class="control">
        {#each attitudes as attitude}
          <label class="radio">
            <input
              type="radio"
              bind:group={$character.attitude}
              value={attitude} />
            {attitude}
          </label>
        {/each}
      </div>
      {#if errors && errors['attitude']}
        <div class="has-text-danger help">{errors['attitude'][0]}</div>
      {/if}
    </div>
    <div class="field">
      <label class="label">Религия</label>
      <div class="control">
        {#each religions as religion}
          <label class="radio">
            <input
              type="radio"
              bind:group={$character.religion}
              value={religion} />
            {religion}
          </label>
        {/each}
      </div>
      {#if errors && errors['attitude']}
        <div class="has-text-danger help">{errors['religion'][0]}</div>
      {/if}
    </div>
    <div class="level">
      <div class="level-left">
        <button
          type="button"
          class="button is-primary is-light"
          on:click={() => handleClick('View1', false)}>
          Назад
        </button>
      </div>
      <div class="level-right">
        <button type="submit" class="button is-primary">Далее</button>
      </div>
    </div>
  </form>
</Wrapper>
