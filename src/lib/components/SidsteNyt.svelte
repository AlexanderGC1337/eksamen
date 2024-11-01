<script lang="ts">
  import { onMount } from "svelte";
  import Loader from "./Loader.svelte";
  import { formatDate } from "$lib/utils/date";

  interface DataItem {
    title: string;
    content: string;
    image: string;
    received: string;
  }

  let data: DataItem[] = [];

  onMount(async () => {
    try {
      const response = await fetch("http://127.0.0.1:5333/news");
      if (!response.ok) {
        throw new Error("Kunne ikke hente data");
      }
      data = await response.json();
    } catch (error) {
      console.error("Fejl ved hentning af data:", error);
    }
  });
</script>

<section class="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8">
  <div class="max-w-screen-lg mx-auto">
    <div class="text-center mb-12 md:mb-16 lg:mb-20">
      <p class="text-3xl md:text-4xl font-semibold">
        Sidste <span class="text-pumpkin">nyt</span>
      </p>
      <p class="text-dimGray my-3 max-w-2xl mx-auto text-sm md:text-base">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis repellat
        culpa dicta!
      </p>
      <div class="flex items-center justify-center gap-2">
        <div class="h-px w-6 md:w-8 bg-dimGray"></div>
        <div
          class="w-2 md:w-3 h-2 md:h-3 rounded-full border-2 border-pumpkin"
        ></div>
        <div class="h-px w-6 md:w-8 bg-dimGray"></div>
      </div>
    </div>

    <div
      class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 mb-8 md:mb-10"
    >
      {#each data
        .sort((a, b) => new Date(b.received).getTime() - new Date(a.received).getTime())
        .slice(0, 3) as article}
        <a
          href="/nyheder/{article.title.toLowerCase().replace(/\s+/g, '-')}"
          class="shadow-md hover:shadow-lg transition-shadow duration-300 relative bg-white rounded-md overflow-hidden group"
        >
          <div class="aspect-[16/9] relative overflow-hidden">
            <img
              src={"http://localhost:5333/images/news/" + article.image}
              alt=""
              class="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
            />
            <div
              class="px-3 py-2 absolute top-3 left-3 bg-pumpkin text-white rounded-t-md flex items-center flex-col shadow-md"
            >
              <span class="text-base md:text-lg font-medium leading-none">
                {formatDate(article.received).day}
              </span>
              <span class="text-sm md:text-base leading-none">
                {formatDate(article.received).month}
              </span>
            </div>
          </div>

          <div class="p-4 md:p-6">
            <h4
              class="text-base md:text-lg font-medium mb-3 group-hover:text-pumpkin transition-colors duration-300"
            >
              {article.title}
            </h4>
            <p class="text-sm md:text-base text-dimGray line-clamp-3">
              {@html article.content.slice(0, 100)}...
            </p>
          </div>
        </a>
      {:else}
        <div class="flex justify-center items-center min-h-[300px]">
          <Loader />
        </div>
      {/each}
    </div>

    <div class="flex justify-center">
      <a
        href="/nyheder"
        class="inline-flex py-2 md:py-3 px-6 md:px-8 bg-pumpkin rounded-md uppercase text-white text-sm md:text-base font-normal
        hover:bg-transparent hover:border hover:border-pumpkin hover:text-pumpkin transition-all duration-300
        focus:ring-2 focus:ring-pumpkin focus:ring-offset-2 focus:outline-none"
      >
        Flere nyheder ...
      </a>
    </div>
  </div>
</section>
