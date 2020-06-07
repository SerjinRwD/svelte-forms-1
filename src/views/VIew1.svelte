<script>
  /* Здесь я пробую использовать скушненький, но справляющийся со своей задачей валидатор @yaireo/validator */
  import Wrapper from "../components/Wrapper.svelte";
  import { races } from "../vocabularies.js";
  import { createEventDispatcher, onMount } from "svelte";
  import { character, navigation } from "../stores.js";
  import FormValidator from "@yaireo/validator";
  import { validatorSettings } from "../settings.js";

  const dispatch = createEventDispatcher();

  let validator;
  let form;

  function handleSubmit(viewName) {
    const validatorResult = validator.checkAll(form);

    if (!validatorResult.valid) {
      return false;
    }

    $navigation.isForward = true;

    dispatch("navigate", {
      view: viewName
    });
  }

  function handleChange(event) {
    validator.checkField(event.target);
  }

  onMount(() => {
    validator = new FormValidator(validatorSettings);
  });
</script>

<Wrapper>
  <form
    bind:this={form}
    on:submit|preventDefault={() => handleSubmit('View2')}
    on:change={handleChange}
    novalidate>
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Имя</label>
          <div class="control">
            <input
              class="input"
              type="text"
              bind:value={$character.name}
              required />
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Титул</label>
          <div class="control">
            <input
              class="input"
              type="text"
              bind:value={$character.title}
              required />
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Раса</label>
          <div class="control">
            {#each races as race}
              <label class="radio">
                <input type="radio" bind:group={$character.race} value={race} />
                {race}
              </label>
            {/each}
          </div>
          <!-- нужно только для валидации ввода -- @yaireo/validator не реагирует на radio -->
          <input type="hidden" bind:value={$character.race} required />
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Возраст</label>
          <div class="control">
            <input
              class="input"
              type="number"
              data-validate-minmax="16,90"
              required
              bind:value={$character.age} />
          </div>
        </div>
      </div>
    </div>
    <div class="level">
      <div class="level-left" />
      <div class="level-right">
        <button type="submit" class="button is-primary">Далее</button>
      </div>
    </div>
  </form>
</Wrapper>
