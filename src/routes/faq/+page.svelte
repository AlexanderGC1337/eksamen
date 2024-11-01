<script lang="ts">
  import { onMount } from "svelte";

  import Accordion from "$lib/components/Accordion.svelte";
  import Loader from "$lib/components/Loader.svelte";

  interface DataItem {
    question: string;
    answer: string;
  }

  let data: DataItem[] = [];

  let selectedAccordion: string | null = null;

  function handleSelect(event: CustomEvent) {
    // Hvis samme accordion klikkes, luk den
    if (selectedAccordion === event.detail.title) {
      selectedAccordion = null;
    } else {
      selectedAccordion = event.detail.title;
    }
  }

  onMount(async () => {
    try {
      const response = await fetch("http://127.0.0.1:5333/faq");
      if (!response.ok) {
        throw new Error("Kunne ikke hente data");
      }
      data = await response.json();
    } catch (error) {
      console.error("Fejl ved hentning af data:", error);
    }
  });
</script>

<section>
  <div
    class="pt-12 md:pt-16 lg:pt-20 pb-6 md:pb-8 lg:pb-10 bg-seasalt px-4 md:px-6 lg:px-8"
  >
    <div
      class="max-w-screen-lg mx-auto flex flex-col sm:flex-row gap-4 sm:items-end sm:justify-between"
    >
      <h2 class="text-2xl md:text-3xl font-medium">
        FAQ - ofte stillede spørgsmål
      </h2>
      <div class="flex gap-1 text-sm text-dimGray items-center">
        <a href="/" class="hover:text-pumpkin transition-colors duration-300">
          Forside
        </a>
        <span>&gt;</span>
        <a href="/faq" class="text-pumpkin"> FAQ </a>
      </div>
    </div>
  </div>

  <div
    class="max-w-screen-lg mx-auto px-4 md:px-6 lg:px-0 py-12 md:py-16 lg:py-20"
  >
    <div class="w-full mx-auto space-y-4 md:space-y-6">
      {#each data as faq}
        <Accordion
          title={faq.question}
          isSelected={selectedAccordion === faq.question}
          on:select={handleSelect}
        >
          <p class="text-sm md:text-base text-dimGray leading-relaxed">
            {faq.answer}
          </p>
        </Accordion>
      {:else}
        <div class="flex justify-center items-center min-h-[200px]">
          <Loader />
        </div>
      {/each}
    </div>
  </div>
</section>
