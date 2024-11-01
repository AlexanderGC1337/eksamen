<script lang="ts">
  import { formatDate } from "$lib/utils/date";

  import Loader from "$lib/components/Loader.svelte";

  interface DataItem {
    title: string;
    content: string;
    image: string;
    received: string;
    comments: string;
  }

  export let data: { news: DataItem[] };
</script>

<section>
  <div
    class="pt-12 md:pt-16 lg:pt-20 pb-6 md:pb-8 lg:pb-10 bg-seasalt px-4 md:px-6 lg:px-8"
  >
    <div
      class="max-w-screen-lg mx-auto flex flex-col sm:flex-row gap-4 sm:items-end sm:justify-between"
    >
      <h2 class="text-2xl md:text-3xl font-medium">Nyheder</h2>
      <div class="flex gap-1 text-sm text-dimGray items-center">
        <a href="/" class="hover:text-pumpkin transition-colors duration-300">
          Forside
        </a>
        <span>&gt;</span>
        <a href="/nyheder" class="text-pumpkin">Nyheder</a>
      </div>
    </div>
  </div>

  <div class="max-w-screen-lg mx-auto px-4 md:px-6 lg:px-0 py-8 md:py-10">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
      <div class="lg:col-span-2">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {#each data.news
            .sort((a, b) => new Date(b.received).getTime() - new Date(a.received).getTime())
            .slice(0, 4) as article}
            <a
              href="/nyheder/{article.title.toLowerCase().replace(/\s+/g, '-')}"
              class="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative group"
            >
              <div class="relative aspect-[16/9] overflow-hidden">
                <img
                  src={"http://localhost:5333/images/news/" + article.image}
                  alt=""
                  class="rounded-t-lg w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div
                  class="px-3 py-2 absolute top-3 left-3 bg-pumpkin text-white rounded-t-md flex items-center flex-col shadow-md"
                >
                  <span class="text-base md:text-lg font-medium leading-none">
                    {formatDate(article.received).day}
                  </span>
                  <span class="text-sm leading-none">
                    {formatDate(article.received).month}
                  </span>
                </div>
              </div>

              <div class="p-4 md:p-6 flex-grow">
                <h4
                  class="text-base md:text-lg font-medium mb-3 group-hover:text-pumpkin transition-colors duration-300"
                >
                  {article.title}
                </h4>
                <p
                  class="text-sm md:text-base text-dimGray pb-3 border-b border-platinum"
                >
                  {@html article.content.slice(0, 100)}...
                </p>
                <div
                  class="mt-4 md:mt-6 text-dimGray flex items-center gap-2 text-sm md:text-base"
                >
                  <i class="fa-solid fa-comments"></i>
                  <p>({article.comments.length}) Kommentarer</p>
                </div>
              </div>
            </a>
          {:else}
            <div class="flex justify-center items-center min-h-[200px]">
              <Loader />
            </div>
          {/each}
        </div>
      </div>

      <div class="mt-8 lg:mt-0">
        <h3 class="text-lg md:text-xl font-semibold mb-4 md:mb-6">Arkiv</h3>
        <div class="space-y-4">
          {#each data.news
            .sort((a, b) => new Date(b.received).getTime() - new Date(a.received).getTime())
            .slice(4, 8) as article}
            <a
              href="/nyheder/{article.title.toLowerCase().replace(/\s+/g, '-')}"
              class="flex gap-3 md:gap-4 p-3 border-b border-platinum last:border-b-0
              hover:bg-gray-50 transition-colors duration-300 rounded-lg"
            >
              <img
                src={"http://localhost:5333/images/news/" + article.image}
                alt=""
                class="rounded-md h-20 w-24 object-cover flex-shrink-0"
              />
              <div class="min-w-0">
                <h4 class="text-base md:text-lg font-medium mb-2 line-clamp-2">
                  {article.title}
                </h4>
                <div
                  class="text-dimGray text-sm flex items-center gap-1 flex-wrap"
                >
                  <i class="fa-regular fa-calendar-days"></i>
                  <span>{formatDate(article.received).day}</span>
                  <span>{formatDate(article.received).month}</span>
                  <span>{formatDate(article.received).year}</span>
                </div>
              </div>
            </a>
          {:else}
            <div class="flex justify-center items-center min-h-[200px]">
              <Loader />
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>
