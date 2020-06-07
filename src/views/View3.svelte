<script>
  /* И здесь я тоже пробую библиотечку валидации validate.js,
   * но оборачиваю ошибки в компоненты. Также валидирую поля
   * по мере ввода.
   * */
  import Wrapper from "../components/Wrapper.svelte";
  import ValidationError from "../components/ValidationError.svelte";
  import { createEventDispatcher } from "svelte";
  import { character, navigation } from "../stores.js";
  import { klasses, skills } from "../vocabularies.js";
  import validate from "validate.js";

  const dispatch = createEventDispatcher();
  let errors = null;

  $: totalPoints =
    10 - ($character.strength + $character.agility + $character.intelligence);

  const constraints = {
    klass: {
      presence: { allowEmpty: false }
    },
    skills: {
      presence: { allowEmpty: false },
      length: {
        minimum: 1,
        maximum: 3
      }
    },
    points: {
      numericality: {
        equalTo: 0
      }
    },
    strength: {
      presence: { allowEmpty: false },
      numericality: {
        onlyInteger: true,
        greaterThan: 0,
        lessThanOrEqualTo: 10
      }
    },
    agility: {
      presence: { allowEmpty: false },
      numericality: {
        onlyInteger: true,
        greaterThan: 0,
        lessThanOrEqualTo: 10
      }
    },
    intelligence: {
      presence: { allowEmpty: false },
      numericality: {
        onlyInteger: true,
        greaterThan: 0,
        lessThanOrEqualTo: 10
      }
    }
  };

  function getAttributes() {
    return {
      klass: $character.klass,
      skills: $character.skills,
      points: totalPoints,
      strength: $character.strength,
      agility: $character.agility,
      intelligence: $character.intelligence
    };
  }

  function handleClick(viewName, forward) {
    $navigation.isForward = forward;

    dispatch("navigate", {
      view: viewName
    });
  }

  function handleSubmit(viewName, forward) {
    errors = validate(getAttributes(), constraints);

    if (errors) {
      return false;
    }

    $navigation.isForward = forward;

    dispatch("navigate", {
      view: viewName
    });
  }

  function validateSingle(name) {
    const result = validate.single(getAttributes()[name], constraints[name]);

    // Если валидатор выявил ошибку ввода, то фиксируем её в словаре errors
    if (result) {
      errors = errors || {};
      errors[name] = result;
      errors = errors;
      // Если валидатор выявил, что ввод корректный, то удаляем старое состояние ошибки, если она была
    } else if (errors && errors[name]) {
      errors = Object.fromEntries(
        Object.entries(errors).filter(e => e[0] !== name)
      );
    }
  }

  function handleInput(event) {
    validateSingle(event.target.name);
  }
</script>

<Wrapper>
  <form
    on:submit|preventDefault={() => handleSubmit('Summary', true)}
    on:change={handleInput}
    novalidate>
    <div class="field">
      <label class="label">Класс</label>
      <div class="control">
        {#each klasses as klass}
          <label
            class="radio"
            class:has-text-danger={errors && errors['klass']}>
            <input
              name="klass"
              type="radio"
              bind:group={$character.klass}
              value={klass} />
            {klass}
          </label>
        {/each}
      </div>
      <ValidationError {errors} field="klass" />
    </div>
    <div class="field">
      <label class="label">Навыки</label>
      <div class="control">
        {#each skills as skill}
          <label
            class="checkbox"
            class:has-text-danger={errors && errors['skills']}>
            <input
              name="skills"
              type="checkbox"
              bind:group={$character.skills}
              value={skill} />
            {skill}
          </label>
        {/each}
      </div>
      <ValidationError {errors} field="skills" />
    </div>
    <div class="is-size-5 has-text-weight-bold">Характеристики</div>
    <div>Доступно очков: {totalPoints}</div>
    <ValidationError {errors} field="points" />
    <div class="field">
      <label class="label">Сила</label>
      <div class="control">
        <input
          name="strength"
          class="input"
          type="number"
          on:change={() => validateSingle('points')}
          bind:value={$character.strength}
          class:is-danger={errors && errors['strength']} />
      </div>
      <ValidationError {errors} field="strength" />
    </div>
    <div class="field">
      <label class="label">Ловкость</label>
      <div class="control">
        <input
          name="agility"
          class="input"
          type="number"
          on:change={() => validateSingle('points')}
          bind:value={$character.agility}
          class:is-danger={errors && errors['agility']} />
      </div>
      <ValidationError {errors} field="agility" />
    </div>
    <div class="field">
      <label class="label">Интеллект</label>
      <div class="control">
        <input
          name="intelligence"
          class="input"
          type="number"
          on:change={() => validateSingle('points')}
          bind:value={$character.intelligence}
          class:is-danger={errors && errors['intelligence']} />
      </div>
      <ValidationError {errors} field="intelligence" />
    </div>
    <div class="level">
      <div class="level-left">
        <button
          type="button"
          class="button is-primary is-light"
          on:click={() => handleClick('View2', false)}>
          Назад
        </button>
      </div>
      <div class="level-right">
        <button type="submit" class="button is-primary">Далее</button>
      </div>
    </div>
  </form>
</Wrapper>
