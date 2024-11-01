<script lang="ts">
  import { onMount } from "svelte";

  import Loader from "$lib/components/Loader.svelte";

  interface DataItem {
    title: string;
    teaser: string;
    content: string;
    image: string;
    _id: number;
  }

  let data: DataItem[] = [];

  let selectedService: DataItem | null = null;

  $: if (data && data.length > 0 && !selectedService) {
    selectedService = data[0];
  }

  const handleServiceClick = (service: DataItem, event: MouseEvent): void => {
    event.preventDefault();
    selectedService = service;
  };

  onMount(async () => {
    try {
      const response = await fetch("http://127.0.0.1:5333/service");
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
      <h2 class="text-2xl md:text-3xl font-medium">Service</h2>
      <div class="flex gap-1 text-sm items-center">
        <a href="/" class="hover:text-pumpkin transition-colors duration-300">
          Forside
        </a>
        <span class="text-dimGray">&gt;</span>
        <a href="/service" class="text-pumpkin">Service</a>
      </div>
    </div>
  </div>

  <div
    class="max-w-screen-lg mx-auto px-4 md:px-6 lg:px-0 py-12 md:py-16 lg:py-20"
  >
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
      <div class="flex flex-col gap-2 order-last lg:order-first">
        <select
          bind:value={selectedService}
          class="w-full px-4 py-2 border border-platinum rounded-lg mb-4 lg:hidden"
        >
          {#each data as service}
            <option value={service}>
              {service.title}
            </option>
          {/each}
        </select>

        <div class="hidden lg:flex lg:flex-col gap-2">
          {#each data as service}
            <button
              on:click={(e) => handleServiceClick(service, e)}
              class="px-4 py-3 border border-platinum rounded-lg transition-all duration-200
                text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pumpkin
                {selectedService?._id === service._id
                ? 'bg-pumpkin text-white hover:bg-pumpkin/90'
                : ''}"
            >
              {service.title}
            </button>
          {:else}
            <div class="flex justify-center items-center min-h-[200px]">
              <Loader />
            </div>
          {/each}
        </div>
      </div>

      <div class="lg:col-span-2">
        {#if selectedService}
          <div class="space-y-4 md:space-y-6">
            <div class="aspect-[16/9] overflow-hidden rounded-lg shadow-md">
              <img
                src={"http://localhost:5333/images/service/" +
                  selectedService.image}
                alt=""
                class="w-full h-full object-cover"
              />
            </div>

            <h2 class="text-xl md:text-2xl font-bold">
              {selectedService.title}
            </h2>

            <div class="text-sm md:text-base text-dimGray">
              {@html selectedService.teaser}
            </div>

            <div
              class="text-sm md:text-base prose prose-sm md:prose-base max-w-none"
            >
              {@html selectedService.content}
            </div>
          </div>
        {:else}
          <div class="flex justify-center items-center min-h-[300px]">
            <Loader />
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>
