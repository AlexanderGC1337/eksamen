<script lang="ts">
  import { onMount } from "svelte";
  import Loader from "./Loader.svelte";

  interface DataItem {
    title: string;
    teaser: string;
    icon: string;
  }

  let data: DataItem[] = [];

  let bookingData = [];

  let name = "";
  let email = "";
  let phone = "";

  async function handleBooking() {
    try {
      const response = await fetch("http://127.0.0.1:5333/booking", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Kunne ikke oprette booking");
      }
      bookingData = await response.json();
      alert("Booking oprettet.");
      name = "";
      email = "";
      phone = "";
    } catch (error) {
      console.error("Fejl ved indsendelse af booking", error);
      alert("Fejl ved indsendelse af booking" + error);
    }
  }

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

<section class="px-4 md:px-6 lg:px-8 max-w-screen-lg mx-auto py-10 relative">
  <div
    class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-32 xl:gap-10 mb-10"
  >
    <div class="md:col-span-2">
      <h3 class="text-3xl md:text-4xl lg:text-5xl font-semibold">
        Vores <span class="text-pumpkin">services</span>
      </h3>
      <p class="my-3 md:my-4 text-sm text-dimGray">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur minima
        id beatae!
      </p>
      <div class="flex items-center gap-1 mb-6 md:mb-8">
        <div class="w-3 h-3 rounded-full border-2 border-pumpkin"></div>
        <div class="h-px w-16 bg-platinum2"></div>
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 lg:gap-20 mb-96 lg:mb-0"
      >
        {#each data as service}
          <div class="flex gap-4 md:gap-6">
            <i
              class={`${service.icon} text-pumpkin text-2xl md:text-3xl flex-shrink-0`}
              aria-hidden="true"
            ></i>
            <div>
              <p class="text-lg md:text-xl font-semibold mb-3 md:mb-5">
                {service.title}
              </p>
              <p class="text-sm text-dimGray">{service.teaser}</p>
            </div>
          </div>
        {:else}
          <Loader />
        {/each}
      </div>
    </div>

    <img
      src="/images/about/1.png"
      alt="Kvindelig elektriker"
      class=" xl:self-end absolute bottom-0 max-w-sm 2xl:max-w-lg right-1/2 lg:right-0 xl:right-20 2xl:left-full 2xl:-translate-x-1/2 translate-x-1/2 lg:translate-x-0 xl:translate-x-1/2"
    />
  </div>
</section>

<section class="w-full py-4 shadow-md rotate-180 px-4 md:px-6 lg:px-8">
  <div class="max-w-screen-lg mx-auto rotate-180">
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
    >
      <p class="text-xl font-bold whitespace-nowrap">
        <span class="text-pumpkin">Book</span><br /> service nu
      </p>

      <form
        on:submit|preventDefault={handleBooking}
        class="w-full flex flex-col md:flex-row gap-3"
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
          <input
            name="name"
            bind:value={name}
            required
            type="text"
            placeholder="Navn"
            class="rounded-md border-platinum py-2 md:py-3 px-4 w-full text-sm md:text-base focus:ring-2 focus:ring-pumpkin focus:outline-none focus:border-none"
          />

          <input
            name="email"
            bind:value={email}
            required
            type="email"
            placeholder="Email"
            class="rounded-md border-platinum py-2 md:py-3 px-4 w-full text-sm md:text-base focus:ring-2 focus:ring-pumpkin focus:outline-none focus:border-none"
          />

          <input
            name="number"
            bind:value={phone}
            required
            type="tel"
            placeholder="Telefon nr."
            class="rounded-md border-platinum py-2 md:py-3 px-4 w-full text-sm md:text-base focus:ring-2 focus:ring-pumpkin focus:outline-none focus:border-none"
          />
        </div>

        <button
          class="py-2 px-8 bg-pumpkin rounded-md uppercase text-white font-normal hover:bg-transparent hover:border hover:border-pumpkin hover:text-pumpkin transition-colors duration-300 whitespace-nowrap"
        >
          Send
        </button>
      </form>
    </div>
  </div>
</section>
