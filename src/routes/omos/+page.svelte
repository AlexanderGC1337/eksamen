<script lang="ts">
  import { onMount } from "svelte";
  import VoresKunderSiger from "$lib/components/VoresKunderSiger.svelte";
  import VoresTeam from "$lib/components/VoresTeam.svelte";

  import Loader from "$lib/components/Loader.svelte";

  interface DataItem {
    title: string;
    teaser: string;
    content: string;
    image: string;
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

<section>
  <div
    class="pt-12 md:pt-16 lg:pt-20 pb-6 md:pb-8 lg:pb-10 bg-seasalt px-4 md:px-6 lg:px-8"
  >
    <div
      class="max-w-screen-lg mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
    >
      <h2 class="text-2xl md:text-3xl font-medium">Om os</h2>
      <div class="flex gap-1 text-sm items-center">
        <a href="/" class="hover:text-pumpkin transition-colors duration-300"
          >Forside</a
        >
        <span class="text-dimGray">&gt;</span>
        <a href="/omos" class="text-pumpkin">Om os</a>
      </div>
    </div>
  </div>

  <div
    class="py-12 md:py-16 lg:py-20 max-w-screen-lg mx-auto text-center px-4 md:px-6 lg:px-8"
  >
    {#if data}
      <p class="text-3xl md:text-4xl font-medium">
        {data.title.slice(0, 7)}
        <span class="text-pumpkin">{data.title.slice(7)}</span>
      </p>
      <p
        class="text-dimGray mt-1 md:mt-2 text-sm md:text-base max-w-2xl mx-auto"
      >
        {@html data.teaser}
      </p>
      <div class="flex items-center justify-center mt-3 md:mt-4 gap-2">
        <div class="h-px w-6 md:w-8 bg-platinum"></div>
        <div
          class="w-2 md:w-3 h-2 md:h-3 rounded-full border-2 border-pumpkin"
        ></div>
        <div class="h-px w-6 md:w-8 bg-platinum"></div>
      </div>
    {:else}
      <div class="flex justify-center items-center min-h-[200px]">
        <Loader />
      </div>
    {/if}
  </div>

  <div class="max-w-screen-lg mx-auto px-4 md:px-6 lg:px-8">
    <div
      class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16 lg:mb-20"
    >
      {#if data}
        <div class="flex flex-col gap-5 md:gap-7">
          <div class="space-y-4 md:space-y-6">
            <div>
              {@html data.content.slice(0, 45)}
            </div>

            <div class="flex items-center gap-2 my-4">
              <div class="h-px w-8 md:w-12 bg-platinum"></div>
              <div
                class="w-2 md:w-3 h-2 md:h-3 rounded-full border-2 border-pumpkin"
              ></div>
              <div class="h-px w-8 md:w-12 bg-platinum"></div>
            </div>

            <div class="mb-4 md:mb-5 text-sm md:text-base text-dimGray">
              {@html data.content.slice(45, 274)}
            </div>

            <div class="text-sm md:text-base text-dimGray">
              {@html data.content.slice(274)}
            </div>
          </div>

          <a
            href="/kontakt"
            class="py-2 md:py-3 px-6 md:px-8 bg-pumpkin rounded-md uppercase text-white text-sm md:text-base font-normal
          hover:bg-transparent hover:border hover:border-pumpkin hover:text-pumpkin transition-all duration-300
          focus:ring-2 focus:ring-pumpkin focus:ring-offset-2 focus:outline-none w-fit"
          >
            Kontakt os
          </a>
        </div>

        <div class="order-first lg:order-last">
          <img
            src={"http://localhost:5333/images/about/" + data.image}
            alt=""
            class="w-full aspect-[4/3] object-cover rounded-md shadow-md"
          />
        </div>
      {:else}
        <div class="flex justify-center items-center min-h-[300px]">
          <Loader />
        </div>
      {/if}
    </div>
  </div>
  <VoresKunderSiger />
  <VoresTeam />
</section>
