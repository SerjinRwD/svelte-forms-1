<script>
  import View1 from "./views/View1.svelte";
  import View2 from "./views/View2.svelte";
  import View3 from "./views/View3.svelte";
  import Summary from "./views/Summary.svelte";

  export let initialView = "View1";

  let views = {
    View1: { view: View1, title: "Био" },
    View2: { view: View2, title: "Мировоззрение" },
    View3: { view: View3, title: "Класс" },
    Summary: { view: Summary, title: "Итог" }
  };

  let currentView = views[initialView];

  function handleNext(event) {
    currentView = views[event.detail.view];
  }
</script>

<main>
  <section class="section">
    <div class="columns is-centered">
      <div class="column is-half">
        <form class="card">
          <header class="card-header has-background-primary">
            <p class="card-header-title has-text-white">{currentView.title}</p>
          </header>
          <div class="card-content">
            <svelte:component
              this={currentView.view}
              on:navigate={handleNext} />
          </div>
        </form>
      </div>
    </div>
  </section>
</main>
