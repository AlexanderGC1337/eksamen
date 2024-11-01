<script lang="ts">
  import { onMount } from "svelte";
  import Loader from "./Loader.svelte";

  let signupData = [];

  let email = "";

  async function handleSignup() {
    try {
      const response = await fetch("http://127.0.0.1:5333/newssubscription", {
        method: "POST",
        body: JSON.stringify({
          email: email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Kunne ikke oprette booking");
      }
      signupData = await response.json();
      alert("Du er nu tilmeldt vores nyhedsbrev.");
      email = "";
    } catch (error) {
      console.error("Fejl ved tilmelding af nyhedsbrev", error);
      alert("Fejl ved tilmelding af nyhedsbrev" + error);
    }
  }

  interface SomeItem {
    name: string;
    link: string;
    icon: string;
    _id: string;
  }

  interface DataItem {
    address: string;
    email: string;
    phone: string;
    some: SomeItem[];
  }

  let data: DataItem;

  onMount(async () => {
    try {
      const response = await fetch("http://127.0.0.1:5333/contactinformation");
      if (!response.ok) {
        throw new Error("Kunne ikke hente data");
      }
      data = await response.json();
    } catch (error) {
      console.error("Fejl ved hentning af data:", error);
    }
  });
</script>

<footer class="bg-onyx px-4 md:px-6 lg:px-8">
  <!-- Main Footer Content -->
  <div class="border-b border-dimGray py-16 md:py-24 lg:py-40">
    <div
      class="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-3"
    >
      <!-- Company Info -->
      <div class="flex flex-col gap-4">
        <img src="/images/logo.png" alt="Logo" class="max-w-[200px] w-full" />
        <p class="text-seasalt text-sm md:text-base">
          Som medlem af Elinstallatørernes Landsorganisation, ELFO, er vi
          tilsluttet et ankernævn og en garantiordning.
        </p>
      </div>

      <!-- Quick Links -->
      <div>
        <p class="text-lg md:text-xl font-medium mb-4 md:mb-5 text-white">
          Link
        </p>
        <nav class="flex flex-col gap-3 md:gap-5 text-seasalt">
          <a
            href="/faq"
            class="hover:text-pumpkin transition-colors duration-300 inline-flex items-center"
          >
            <span class="text-pumpkin mr-2">&gt;</span> FAQ
          </a>
          <a
            href="/omos"
            class="hover:text-pumpkin transition-colors duration-300 inline-flex items-center"
          >
            <span class="text-pumpkin mr-2">&gt;</span> Om os
          </a>
          <a
            href="/kontakt"
            class="hover:text-pumpkin transition-colors duration-300 inline-flex items-center"
          >
            <span class="text-pumpkin mr-2">&gt;</span> Kontakt os
          </a>
          <a
            href="/services"
            class="hover:text-pumpkin transition-colors duration-300 inline-flex items-center"
          >
            <span class="text-pumpkin mr-2">&gt;</span> Services
          </a>
        </nav>
      </div>

      <!-- Contact Info -->
      <div>
        {#if data}
          <p class="text-lg md:text-xl font-medium mb-4 md:mb-5 text-white">
            Kontakt os
          </p>
          <div
            class="flex flex-col gap-3 md:gap-5 text-seasalt text-sm md:text-base"
          >
            <p>
              <span class="font-medium">Adresse:</span>
              <br class="sm:hidden" />
              {data.address}
            </p>
            <a
              href="tel:+4586454578"
              class="hover:text-pumpkin transition-colors duration-300"
            >
              <span class="font-medium">Telefon:</span>
              <br class="sm:hidden" />
              {data.phone}
            </a>
            <a
              href="mailto:info@stroem.dk"
              class="hover:text-pumpkin transition-colors duration-300"
            >
              <span class="font-medium">Email:</span>
              <br class="sm:hidden" />
              {data.email}
            </a>
          </div>
        {:else}
          <div class="flex justify-center items-center min-h-[200px]">
            <Loader />
          </div>
        {/if}
      </div>

      <!-- Newsletter -->
      <div>
        <p class="text-lg md:text-xl font-medium mb-4 md:mb-5 text-white">
          Nyhedsbrev
        </p>
        <div class="flex flex-col gap-3 md:gap-5 text-seasalt">
          <p class="text-sm md:text-base">Tilmeld dig vores nyhedsbrev her</p>
          <form
            on:submit|preventDefault={handleSignup}
            class="flex flex-col gap-3"
          >
            <input
              name="email"
              bind:value={email}
              required
              type="email"
              placeholder="Din Email"
              class="rounded-md bg-charcoal border-none py-2 md:py-3 px-4 w-full text-sm md:text-base focus:ring-2 focus:ring-pumpkin focus:outline-none"
            />

            <button
              class="py-2 md:py-3 px-6 md:px-8 bg-pumpkin rounded-md uppercase text-white text-sm md:text-base font-normal
              hover:bg-transparent hover:border hover:border-pumpkin hover:text-pumpkin transition-all duration-300
              focus:ring-2 focus:ring-pumpkin focus:ring-offset-2 focus:outline-none w-full sm:w-1/2"
            >
              Tilmeld
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer Bottom -->
  <div
    class="max-w-screen-lg mx-auto py-4 md:py-5 flex justify-between items-center gap-4"
  >
    <p class="text-white text-sm md:text-base text-center sm:text-left">
      <span class="text-pumpkin">Strøm</span> &#169; 2017 All Right Reserved
    </p>
    <div class="invert flex gap-3 items-center">
      {#if data && data.some}
        {#each data.some as social}
          <a
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Find os på ${social.name}`}
            class="hover:opacity-80 transition-opacity duration-300"
          >
            <i class={`fab ${social.icon} text-lg md:text-xl`}></i>
          </a>
        {/each}
      {:else}
        <Loader />
      {/if}
    </div>
  </div>
</footer>
