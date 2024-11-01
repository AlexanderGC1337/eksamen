<script lang="ts">
  import { onMount } from "svelte";
  import Loader from "$lib/components/Loader.svelte";
  import Accordion from "./Accordion.svelte";

  interface DataItem {
    name: string;
    email: string;
    phone: string;
    note: string;
    _id: string;
    accept: string;
    received: string;
  }

  let data: DataItem[] = [];
  let error: string | null = null;

  let selectedAccordion: string | null = null;

  function handleSelect(event: CustomEvent) {
    // Hvis samme accordion klikkes, luk den
    if (selectedAccordion === event.detail.title) {
      selectedAccordion = null;
    } else {
      selectedAccordion = event.detail.title;
    }
  }

  async function handleDelete(_id: string) {
    if (window.confirm("Er du sikker på at du vil slette denne booking?"))
      try {
        fetch(`http://127.0.0.1:5333/booking/admin/${_id}`, {
          method: "DELETE",
        });
        window.location.reload();
      } catch (err) {}
  }

  onMount(async () => {
    try {
      const response = await fetch("http://127.0.0.1:5333/booking/admin");
      if (!response.ok) throw new Error("Kunne ikke hente data");
      data = await response.json();
    } catch (err) {
      console.error("Fejl ved hentning af data:", err);
      error = err instanceof Error ? err.message : "Der skete en ukendt fejl";
    }
  });
</script>

<div
  class="max-w-screen-lg mx-auto my-8 md:my-12 lg:my-20 px-4 md:px-6 lg:px-0"
>
  <div class="flex flex-col gap-8 border border-platinum rounded-md p-6">
    <div class="flex items-center justify-between">
      <h3 class="uppercase font-semibold text-2xl">Bookinger</h3>
    </div>
    <div class="">
      {#each data as b}
        <div class="flex items-center justify-between">
          <div class="w-full">
            <Accordion
              title={b.name}
              isSelected={selectedAccordion === b.name}
              on:select={handleSelect}
            >
              <div class="flex justify-between items-center">
                <div>
                  <p>Email: {b.email}</p>
                  <p>Telefon nr: {b.phone}</p>
                  <p>Accepteret: {b.accept}</p>
                </div>
                <button
                  on:click={() =>
                    (b.accept = b.accept === "true" ? "false" : "true")}
                  class="py-3 px-8 bg-pumpkin rounded-md uppercase text-white font-normal hover:bg-transparent hover:border hover:border-pumpkin hover:text-pumpkin w-fit h-fit"
                >
                  Acceptér / Afvis
                </button>
              </div>
            </Accordion>
          </div>
          <button
            on:click={() => handleDelete(b._id)}
            class="p-2 hover:bg-gray-100 rounded-full text-red-700"
            aria-label="Slet booking"
          >
            <i class="fa-solid fa-trash-can fa-xl"></i>
          </button>
        </div>
      {:else}
        <Loader />
      {/each}
    </div>
  </div>
</div>
