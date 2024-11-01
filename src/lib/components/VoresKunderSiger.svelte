<script lang="ts">
  import { onMount } from "svelte";
  import Loader from "./Loader.svelte";

  interface DataItem {
    title: string;
    name: string;
    review: string;
    image: string;
  }

  let data: DataItem[] = [];

  $: randomThree = data.sort(() => Math.random() - 0.5).slice(0, 3);

  onMount(async () => {
    try {
      const response = await fetch("http://127.0.0.1:5333/testimonial");
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
  <div class="relative pt-12 md:pt-16 lg:pt-20 pb-40 md:pb-48 lg:pb-60">
    <div
      class="absolute bg-cover bg-center inset-0 bg-[url('/images/backgroundimage.jpg')]"
    ></div>
    <div class="absolute inset-0 bg-charcoal/85"></div>

    <div
      class="max-w-screen-lg flex flex-col items-center mx-auto relative z-10 text-white gap-3 md:gap-4 px-4 md:px-6 lg:px-8"
    >
      <h3 class="text-3xl md:text-4xl lg:text-5xl text-center">
        Vores <span class="text-pumpkin">kunder siger</span>
      </h3>
      <p class="text-center max-w-2xl text-sm md:text-base lg:text-lg">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere
        corrupti architecto ab.
      </p>
      <div class="flex items-center">
        <div class="border w-6 md:w-8 border-white"></div>
        <div
          class="w-2 md:w-3 h-2 md:h-3 rounded-full border-2 border-pumpkin"
        ></div>
        <div class="border w-6 md:w-8 border-white"></div>
      </div>
    </div>
  </div>

  <div class="bg-seasalt">
    <div class="max-w-screen-lg mx-auto px-4 md:px-6 lg:px-8">
      <div
        class="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-6 -translate-y-20 md:-translate-y-24 lg:-translate-y-32"
      >
        {#each randomThree as t}
          <div
            class="rounded-lg flex flex-col items-center text-center bg-white p-4 md:p-5 relative pt-16 md:pt-20 shadow-md mb-8"
          >
            <div
              class="absolute -top-12 left-1/2 -translate-x-1/2 w-24 md:w-28 aspect-square"
            >
              <img
                src={"http://localhost:5333/images/testimonial/" + t.image}
                alt={t.name}
                class="rounded-full border-4 border-white w-full h-full object-cover shadow-lg"
              />
            </div>

            <p class="text-red-500 font-medium text-base md:text-lg mb-1">
              {t.name}
            </p>
            <p class="text-pumpkin text-sm md:text-base mb-3 md:mb-4">
              {t.title}
            </p>
            <p class="text-dimGray text-sm md:text-base">{t.review}</p>
          </div>
        {:else}
          <div class="flex justify-center items-center min-h-[200px]">
            <Loader />
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
