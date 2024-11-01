<script lang="ts">
  import { onMount } from "svelte";
  import Loader from "$lib/components/Loader.svelte";
  import Editor from "@tinymce/tinymce-svelte";

  let conf = {
    height: 500,
    menubar: false,
    plugins: [
      "advlist",
      "autolink",
      "lists",
      "link",
      "image",
      "charmap",
      "anchor",
      "searchreplace",
      "visualblocks",
      "code",
      "fullscreen",
      "insertdatetime",
      "media",
      "table",
      "preview",
      "help",
      "wordcount",
    ],
    toolbar:
      "undo redo | blocks | " +
      "bold italic forecolor | alignleft aligncenter " +
      "alignright alignjustify | bullist numlist outdent indent | " +
      "removeformat | help",
  };

  interface DataItem {
    title: string;
    content: string;
    image: string;
    teaser: string;
    _id: string;
  }

  let data: DataItem;
  let error: string | null = null;

  let editAboutTeaser = "";
  let editAboutTitle: string;
  let editAboutContent = "";
  let editAboutImage: string;

  let showEditModal: boolean = false;

  function toggleEditModal() {
    showEditModal = !showEditModal;
  }

  function handleClickOutside(event: any) {
    if (event.target.classList.contains("modal-overlay")) {
      showEditModal = false;
    }
  }

  async function handleEdit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const title = formData.get("title") as string;
    const teaser = formData.get("teaser") as string;
    const content = formData.get("content") as string;
    const imageFile = formData.get("image") as File;

    const submitData = new FormData();
    submitData.append("title", title);
    submitData.append("teaser", editAboutTeaser);
    submitData.append("content", editAboutContent);
    submitData.append("image", imageFile);

    try {
      const response = await fetch(`http://127.0.0.1:5333/about/admin/`, {
        method: "PUT",
        body: submitData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const result = await response.json();
      console.log("Om os rettet:", result);

      form.reset();

      window.location.reload();
    } catch (err) {
      console.error("Fejl ved rettelse af om os:", err);
      error = err instanceof Error ? err.message : "Der skete en ukendt fejl";
    }
  }

  onMount(async () => {
    try {
      const response = await fetch("http://127.0.0.1:5333/about");
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
  {#if data}
    <div
      class="flex flex-col gap-6 md:gap-8 border border-platinum rounded-md p-4 md:p-6"
    >
      <h3
        class="uppercase font-semibold text-xl md:text-2xl text-center md:text-left"
      >
        Om os
      </h3>

      <div class="hidden md:grid grid-cols-3 justify-between font-semibold">
        <p>Titel</p>
        <p class="text-center">Billede</p>
        <p class="text-center">Ret</p>
      </div>

      {#if data}
        <div
          class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 place-items-center"
        >
          <p class="md:col-span-1">{data.title}</p>

          <div class="flex justify-center">
            <img
              src={"http://localhost:5333/images/about/" + data.image}
              alt=""
              class="w-32 md:w-1/2 h-auto rounded-md"
            />
          </div>

          <div class="flex justify-center">
            <button
              on:click={() => {
                toggleEditModal();
                editAboutTeaser = data.teaser;
                editAboutTitle = data.title;
                editAboutContent = data.content;
                editAboutImage = data.image;
              }}
              aria-label="Ret om os"
              class="p-2 hover:bg-gray-100 rounded-full text-green-700 transition-colors"
            >
              <i class="fa-solid fa-pen-to-square text-lg md:text-xl"></i>
            </button>
          </div>
        </div>
      {/if}
    </div>

    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    {#if showEditModal}
      <div
        class="modal-overlay fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-default"
        on:click={handleClickOutside}
      >
        <div
          class="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        >
          <form on:submit={handleEdit} class="flex flex-col gap-6 p-4 md:p-6">
            <h2 class="text-xl md:text-2xl text-center font-semibold uppercase">
              Ret om os
            </h2>

            <label class="flex flex-col gap-1">
              <span class="font-medium">Om os titel:</span>
              <input
                type="text"
                id="title"
                name="title"
                bind:value={editAboutTitle}
                required
                class="border border-gray-200 rounded-md p-2 focus:ring-2 focus:ring-pumpkin focus:border-transparent"
              />
            </label>

            <!-- Editors Container -->
            <div class="flex flex-col lg:flex-row gap-4 md:gap-6">
              <!-- Teaser Editor -->
              <div class="flex-1">
                <label class="flex flex-col gap-1 w-full">
                  <span class="font-medium">Om os teaser:</span>
                  <div class="min-h-[300px]">
                    <Editor
                      bind:value={editAboutTeaser}
                      scriptSrc="tinymce/tinymce.min.js"
                      {conf}
                    />
                  </div>
                </label>
              </div>

              <!-- Content Editor -->
              <div class="flex-1">
                <label class="flex flex-col gap-1 w-full">
                  <span class="font-medium">Om os indhold:</span>
                  <div class="min-h-[300px]">
                    <Editor
                      bind:value={editAboutContent}
                      scriptSrc="tinymce/tinymce.min.js"
                      {conf}
                    />
                  </div>
                </label>
              </div>
            </div>

            <!-- Image Input -->
            <label class="flex flex-col gap-1">
              <span class="font-medium">Billede:</span>
              <input
                type="file"
                id="image"
                name="image"
                accept=".jpg, .jpeg, .png"
                class="border border-gray-200 rounded-md p-2 file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0 file:text-sm file:font-semibold
                file:bg-pumpkin file:text-white hover:file:bg-pumpkin/90"
              />
            </label>

            <!-- Submit Button -->
            <button
              type="submit"
              class="py-2 md:py-3 px-6 md:px-8 bg-pumpkin rounded-md uppercase text-white text-sm md:text-base
              hover:bg-transparent hover:border hover:border-pumpkin hover:text-pumpkin
              transition-all duration-300 w-fit mx-auto"
            >
              Ret om os
            </button>
          </form>
        </div>
      </div>
    {/if}
  {:else}
    <div class="flex justify-center items-center min-h-[200px]">
      <Loader />
    </div>
  {/if}
</div>
