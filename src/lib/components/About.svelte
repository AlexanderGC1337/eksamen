<script lang="ts">
  import { onMount } from "svelte";
  import Loader from "./Loader.svelte";

  interface DataItem {
    title: string;
    teaser: string;
  }

  let data: DataItem;

  onMount(async () => {
    try {
      const response = await fetch("http://127.0.0.1:5333/about");
      if (!response.ok) {
        throw new Error("Kunne ikke hente data");
      }
      data = await response.json();
    } catch (error) {
      console.error("Fejl ved hentning af data:", error);
    }
  });
</script>

<section class="container max-w-screen-lg mx-auto text-center py-20">
  {#if data}
    <h2 class="font-semibold text-3xl">
      {data.title.slice(0, 7)}
      <span class="text-pumpkin">{data.title.slice(7)}</span>
    </h2>
    <p class="mb-10">{@html data.teaser}</p>
    <a
      href="/omos"
      class="py-3 px-8 bg-pumpkin rounded-md uppercase text-white font-normal hover:bg-transparent hover:border hover:border-pumpkin hover:text-pumpkin"
      >Læs mere</a
    >
  {:else}
    <Loader />
  {/if}
</section>
