<script lang="ts">
  import NyhederAdmin from "$lib/components/NyhederAdmin.svelte";
  import AboutAdmin from "$lib/components/AboutAdmin.svelte";
  import BookingAdmin from "$lib/components/BookingAdmin.svelte";

  type ActiveComponent = "nyheder" | "about" | "booking";

  let activeComponent: ActiveComponent = "nyheder";
</script>

<section>
  <div
    class="pt-12 md:pt-16 lg:pt-20 pb-6 md:pb-8 lg:pb-10 bg-seasalt px-4 md:px-6 lg:px-8"
  >
    <div
      class="max-w-screen-lg mx-auto flex flex-col sm:flex-row gap-4 sm:items-end sm:justify-between"
    >
      <h2 class="text-2xl md:text-3xl font-medium">Admin dashboard</h2>
      <div class="flex gap-1 text-sm text-dimGray items-center">
        <a href="/" class="hover:text-pumpkin transition-colors duration-300"
          >Forside</a
        >
        <span>&gt;</span>
        <a href="/admin" class="text-pumpkin">Admin</a>
      </div>
    </div>
  </div>

  <div
    class="max-w-screen-lg mx-auto my-8 md:my-12 lg:my-20 px-4 md:px-6 lg:px-0"
  >
    <div class="grid grid-cols-3 gap-5">
      <button
        on:click={() => (activeComponent = "nyheder")}
        class={`px-4 py-2 rounded-md transition-colors uppercase ${
          activeComponent === "nyheder"
            ? " bg-transparent border text-pumpkin"
            : "text-white bg-pumpkin hover:text-pumpkin hover:border hover:bg-transparent"
        }`}
      >
        Nyheder
      </button>
      <button
        on:click={() => (activeComponent = "about")}
        class={`px-4 py-2 rounded-md transition-colors uppercase ${
          activeComponent === "about"
            ? " bg-transparent border text-pumpkin"
            : "text-white bg-pumpkin hover:text-pumpkin hover:border hover:bg-transparent"
        }`}
      >
        Om os
      </button>
      <button
        on:click={() => (activeComponent = "booking")}
        class={`px-4 py-2 rounded-md transition-colors uppercase ${
          activeComponent === "booking"
            ? " bg-transparent border text-pumpkin"
            : "text-white bg-pumpkin hover:text-pumpkin hover:border hover:bg-transparent"
        }`}
      >
        Bookinger
      </button>
    </div>
  </div>

  {#if activeComponent === "nyheder"}
    <NyhederAdmin />
  {:else if activeComponent === "about"}
    <AboutAdmin />
  {:else if activeComponent === "booking"}
    <BookingAdmin />
  {/if}
</section>
