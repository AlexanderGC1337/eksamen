<script lang="ts">
  import { onMount } from "svelte";
  import Loader from "./Loader.svelte";
  import fbIcon from "$lib/images/icons/facebook-icon.png";
  import xIcon from "$lib/images/icons/twitter.png";
  import linkedinIcon from "$lib/images/icons/linkedin.png";
  import pinterestIcon from "$lib/images/icons/pinterest.png";

  interface DataItem {
    title: string;
    name: string;
    image: string;
  }

  let data: DataItem[] = [];

  onMount(async () => {
    try {
      const response = await fetch("http://127.0.0.1:5333/team");
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
        Vores <span class="text-pumpkin">team</span>
      </p>
      <p class="text-dimGray my-3 max-w-2xl mx-auto text-sm md:text-base">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis repellat
        culpa dicta!
      </p>
      <div class="flex items-center justify-center">
        <div class="h-px w-6 md:w-8 bg-dimGray"></div>
        <div
          class="w-2 md:w-3 h-2 md:h-3 rounded-full border-2 border-pumpkin"
        ></div>
        <div class="h-px w-6 md:w-8 bg-dimGray"></div>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {#each data as team}
        <div class="relative group mb-20">
          <div class="w-full overflow-hidden rounded-md">
            <img
              src={"http://localhost:5333/images/team/" + team.image}
              alt={team.name}
              class="w-full h-full object-cover"
            />
          </div>

          <div
            class="absolute bottom-0 left-0 right-0 bg-pumpkin text-center text-white py-4 md:py-6 lg:py-8
            opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out rounded-b-md
            transform translate-y-2 group-hover:translate-y-0"
          >
            <p class="font-semibold text-base md:text-lg mb-1">{team.name}</p>
            <p class="text-sm md:text-base mb-3">{team.title}</p>

            <div class="flex justify-center items-center gap-4 md:gap-5 invert">
              <a
                href="#"
                class="transition-transform hover:scale-110 focus:scale-110"
                aria-label="Facebook"
              >
                <img src={fbIcon} alt="" class="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a
                href="#"
                class="transition-transform hover:scale-110 focus:scale-110"
                aria-label="X (formerly Twitter)"
              >
                <img src={xIcon} alt="" class="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a
                href="#"
                class="transition-transform hover:scale-110 focus:scale-110"
                aria-label="LinkedIn"
              >
                <img src={linkedinIcon} alt="" class="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a
                href="#"
                class="transition-transform hover:scale-110 focus:scale-110"
                aria-label="Pinterest"
              >
                <img src={pinterestIcon} alt="" class="w-5 h-5 md:w-6 md:h-6" />
              </a>
            </div>
          </div>
        </div>
      {:else}
        <div class="flex justify-center items-center min-h-[300px]">
          <Loader />
        </div>
      {/each}
    </div>
  </div>
</section>
