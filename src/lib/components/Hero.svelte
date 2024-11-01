<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import Loader from "./Loader.svelte";
  import NavIcon from "../images/icons/play-icon.png";

  interface DataItem {
    caption: string;
    image: string;
  }

  let data: DataItem[] = [];

  let currentIndex = 0;
  let autoPlayInterval: ReturnType<typeof setInterval>;

  function startAutoplay() {
    autoPlayInterval = setInterval(() => {
      next();
    }, 5000);
  }

  function stopAutoplay() {
    clearInterval(autoPlayInterval);
  }

  function next() {
    currentIndex = (currentIndex + 1) % data.length;
  }

  function prev() {
    currentIndex = (currentIndex - 1 + data.length) % data.length;
  }

  onMount(async () => {
    try {
      const response = await fetch("http://127.0.0.1:5333/slider");
      if (!response.ok) {
        throw new Error("Kunne ikke hente data");
      }
      data = await response.json();
    } catch (error) {
      console.error("Fejl ved hentning af data:", error);
    }
    startAutoplay();
  });

  onDestroy(() => {
    stopAutoplay();
  });
</script>

<section
  aria-roledescription="carousel"
  aria-label="Hero billeder"
  class="relative overflow-hidden md:[&>button]:hover:block"
  on:mouseenter={stopAutoplay}
  on:mouseleave={startAutoplay}
>
  <div
    class="flex transition-transform duration-500 ease-in-out h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[calc(100vh-136px)]"
    style="transform: translateX(-{currentIndex * 100}%)"
    role="presentation"
  >
    {#each data as hero, i}
      <div
        class="relative w-full flex-shrink-0 h-full"
        role="group"
        aria-roledescription="slide"
        aria-label="Slide {i + 1} af {data.length}"
        aria-hidden={i !== currentIndex}
      >
        <img
          src={"http://localhost:5333/images/slider/" + hero.image}
          alt=""
          class="w-full h-full object-cover brightness-50 contrast-75"
        />

        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-4 sm:px-6 md:px-8"
        >
          <div
            class="mb-6 sm:mb-8 md:mb-10 text-white max-w-4xl mx-auto
            [&>p]:flex [&>p]:items-center [&>p]:flex-col
            [&>p>span]:text-3xl sm:[&>p>span]:text-5xl md:[&>p>span]:text-6xl lg:[&>p>span]:text-7xl
            [&>p>span]:font-semibold
            [&>p]:text-base sm:[&>p]:text-lg md:[&>p]:text-xl"
          >
            {@html hero.caption}
          </div>

          <a
            href="/kontakt"
            class="inline-flex py-2 sm:py-3 px-6 sm:px-8 bg-pumpkin rounded-md uppercase
            text-white font-normal text-sm sm:text-base
            hover:bg-transparent hover:border hover:border-pumpkin hover:text-pumpkin
            transition-all duration-300 focus:ring-2 focus:ring-pumpkin focus:ring-offset-2
            focus:outline-none"
          >
            Kontakt os
          </a>
        </div>
      </div>
    {:else}
      <div class="flex justify-center items-center min-h-[300px] w-full">
        <Loader />
      </div>
    {/each}
  </div>

  <button
    class="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 md:hidden"
    on:click={prev}
    aria-label="Forrige slide"
  >
    <img
      src={NavIcon}
      alt=""
      class="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 rotate-180"
    />
  </button>

  <button
    class="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 md:hidden"
    on:click={next}
    aria-label="Næste slide"
  >
    <img src={NavIcon} alt="" class="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12" />
  </button>
</section>
