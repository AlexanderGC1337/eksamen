<script lang="ts">
  import { onMount } from "svelte";

  import Loader from "$lib/components/Loader.svelte";

  interface DataItem {
    address: string;
    company: string;
    email: string;
    phone: string;
  }

  let data: DataItem;

  let bookingData = [];

  let name = "";
  let email = "";
  let phone = "";
  let message = "";

  async function handleContact() {
    try {
      const response = await fetch("http://127.0.0.1:5333/contact", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          message: message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Kunne ikke sende besked");
      }
      bookingData = await response.json();
      alert("Besked sendt.");
      name = "";
      email = "";
      phone = "";
      message = "";
    } catch (error) {
      console.error("Fejl ved indsendelse af besked", error);
      alert("Fejl ved indsendelse af besked" + error);
    }
  }

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

<section>
  <div
    class="pt-12 md:pt-16 lg:pt-20 pb-6 md:pb-8 lg:pb-10 bg-seasalt px-4 md:px-6 lg:px-8"
  >
    <div
      class="max-w-screen-lg mx-auto flex flex-col sm:flex-row gap-4 sm:items-end sm:justify-between"
    >
      <h2 class="text-2xl md:text-3xl font-medium">Kontakt os</h2>
      <div class="flex gap-1 text-sm text-dimGray items-center">
        <a href="/" class="hover:text-pumpkin transition-colors duration-300"
          >Forside</a
        >
        <span>&gt;</span>
        <a href="/kontakt" class="text-pumpkin">Kontakt os</a>
      </div>
    </div>
  </div>

  <div
    class="max-w-screen-lg mx-auto px-4 md:px-6 lg:px-0 my-8 md:my-12 lg:my-20"
  >
    <div
      class="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6
    border border-platinum rounded-lg overflow-hidden"
    >
      {#if data}
        <div
          class="flex items-center gap-4 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-platinum"
        >
          <i class="fa-solid fa-location-dot fa-lg text-pumpkin flex-shrink-0"
          ></i>
          <div>
            <p class="text-base md:text-lg font-medium mb-1">Adresse</p>
            <p class="text-dimGray text-sm md:text-base">{data.address}</p>
          </div>
        </div>

        <div
          class="flex items-center gap-4 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-platinum"
        >
          <i class="fa-solid fa-phone fa-lg text-pumpkin flex-shrink-0"></i>
          <div>
            <p class="text-base md:text-lg font-medium mb-1">Telefon</p>
            <p class="text-dimGray text-sm md:text-base">{data.phone}</p>
          </div>
        </div>

        <div class="flex items-center gap-4 p-6 md:p-8">
          <i class="fa-solid fa-envelope fa-lg text-pumpkin flex-shrink-0"></i>
          <div>
            <p class="text-base md:text-lg font-medium mb-1">Email</p>
            <p class="text-dimGray text-sm md:text-base">{data.email}</p>
          </div>
        </div>
      {:else}
        <div class="col-span-full flex justify-center items-center py-10">
          <Loader />
        </div>
      {/if}
    </div>
  </div>

  <div
    class="max-w-screen-lg mx-auto px-4 md:px-6 lg:px-0 my-12 md:my-16 lg:my-28"
  >
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
      <div class="lg:col-span-2">
        <h3 class="text-2xl md:text-3xl font-medium mb-2">Kontakt os</h3>
        <p class="text-dimGray mb-6 text-sm md:text-base">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio
          cupiditate, molestias porro esse dicta in dolorum ratione laudantium
          illum! Error.
        </p>

        <form
          on:submit|preventDefault={handleContact}
          class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
        >
          <div class="flex flex-col gap-4">
            <input
              name="name"
              bind:value={name}
              required
              type="text"
              placeholder="Dit navn"
              class="rounded-md w-full border-platinum p-3 focus:ring-2 focus:ring-pumpkin focus:border-transparent"
            />

            <input
              name="email"
              bind:value={email}
              required
              type="email"
              placeholder="Din Email"
              class="rounded-md w-full border-platinum p-3 focus:ring-2 focus:ring-pumpkin focus:border-transparent"
            />

            <input
              name="number"
              bind:value={phone}
              required
              type="tel"
              placeholder="Telefon nr."
              class="rounded-md w-full border-platinum p-3 focus:ring-2 focus:ring-pumpkin focus:border-transparent"
            />
          </div>

          <textarea
            name="message"
            bind:value={message}
            required
            placeholder="Din besked..."
            rows="5"
            class="rounded-md border-platinum p-3 focus:ring-2 focus:ring-pumpkin focus:border-transparent"
          ></textarea>

          <button
            class="py-2 md:py-3 px-6 md:px-8 bg-pumpkin rounded-md uppercase text-white text-sm md:text-base
            hover:bg-transparent hover:border hover:border-pumpkin hover:text-pumpkin
            transition-all duration-300 focus:ring-2 focus:ring-pumpkin focus:ring-offset-2
            w-full md:w-1/2 text-nowrap"
          >
            Send besked
          </button>
        </form>
      </div>

      <div class="w-full h-[300px] lg:h-auto">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4414.842665289808!2d10.884063877912341!3d56.408799573334164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464dd5b08f8febab%3A0x5e41ffbc35f1087e!2sN%20P%20Josiassens%20Vej%2044e%2C%208500%20Grenaa!5e0!3m2!1sen!2sdk!4v1730387410815!5m2!1sen!2sdk"
          style="border:0;"
          title="Adresse på Strøm"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          class="w-full h-full rounded-lg"
        ></iframe>
      </div>
    </div>
  </div>
</section>
