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
    received: string;
    _id: string;
  }

  let data: DataItem[] = [];
  let error: string | null = null;

  let newsContent = "";

  let editNewsId: string;
  let editNewsTitle: string;
  let editNewsImage: string;

  let showCreateModal: boolean = false;
  let showEditModal: boolean = false;

  function toggleCreateModal() {
    showCreateModal = !showCreateModal;
  }

  function toggleEditModal() {
    showEditModal = !showEditModal;
  }

  function handleClickOutside(event: any) {
    if (event.target.classList.contains("modal-overlay")) {
      showCreateModal = false;
      showEditModal = false;
    }
  }

  async function handleDelete(_id: string) {
    if (window.confirm("Er du sikker på at du vil slette denne nyhed?"))
      try {
        fetch(`http://127.0.0.1:5333/news/admin/${_id}`, {
          method: "DELETE",
        });
        window.location.reload();
      } catch (err) {}
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const imageFile = formData.get("image") as File;

    const submitData = new FormData();
    submitData.append("title", title);
    submitData.append("content", newsContent);
    submitData.append("image", imageFile);

    try {
      const response = await fetch("http://127.0.0.1:5333/news/admin", {
        method: "POST",
        body: submitData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const result = await response.json();
      console.log("Nyhed oprettet:", result);

      data = [...data, result];

      form.reset();

      window.location.reload();
    } catch (err) {
      console.error("Fejl ved oprettelse af nyhed:", err);
      error = err instanceof Error ? err.message : "Der skete en ukendt fejl";
    }
  }

  async function handleEdit(event: Event) {
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const imageFile = formData.get("image") as File;

    const submitData = new FormData();
    submitData.append("title", title);
    submitData.append("content", newsContent);
    submitData.append("image", imageFile);

    try {
      const response = await fetch(
        `http://127.0.0.1:5333/news/admin/${editNewsId}`,
        {
          method: "PUT",
          body: submitData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const result = await response.json();
      console.log("Nyhed rettet:", result);

      window.location.reload();
    } catch (err) {
      console.error("Fejl ved rettelse af nyhed:", err);
      error = err instanceof Error ? err.message : "Der skete en ukendt fejl";
    }
  }

  onMount(async () => {
    try {
      const response = await fetch("http://127.0.0.1:5333/news");
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
    {#if showCreateModal}
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div
        class="modal-overlay fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-default"
        on:click={handleClickOutside}
      >
        <div
          class="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          <form
            on:submit={handleSubmit}
            method="post"
            class="flex flex-col gap-6 p-4 md:p-6"
          >
            <h2 class="text-xl md:text-2xl text-center font-semibold uppercase">
              Ny nyhed
            </h2>

            <label class="flex flex-col gap-1">
              <span class="font-medium">Nyhedstitel:</span>
              <input
                type="text"
                id="title"
                name="title"
                required
                class="border border-gray-200 rounded-md p-2 focus:ring-2 focus:ring-pumpkin focus:border-transparent"
              />
            </label>

            <div class="w-full">
              <Editor
                licenseKey="your-license-key"
                scriptSrc="tinymce/tinymce.min.js"
                bind:value={newsContent}
                {conf}
              />
            </div>

            <label class="flex flex-col gap-1">
              <span class="font-medium">Billede:</span>
              <input
                type="file"
                id="image"
                name="image"
                accept=".jpg, .jpeg, .png"
                required
                class="border border-gray-200 rounded-md p-2 file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0 file:text-sm file:font-semibold
                file:bg-pumpkin file:text-white hover:file:bg-pumpkin/90"
              />
            </label>

            <button
              type="submit"
              class="py-2 md:py-3 px-6 md:px-8 bg-pumpkin rounded-md uppercase text-white text-sm md:text-base
              hover:bg-transparent hover:border hover:border-pumpkin hover:text-pumpkin
              transition-all duration-300 w-fit mx-auto"
            >
              Udgiv nyhed
            </button>
          </form>
        </div>
      </div>
    {/if}

    <div
      class="flex flex-col gap-6 md:gap-8 border border-platinum rounded-md p-4 md:p-6"
    >
      <div
        class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <h3
          class="uppercase font-semibold text-xl md:text-2xl text-center md:text-left"
        >
          Alle nyheder
        </h3>
        <button
          on:click={toggleCreateModal}
          class="py-2 md:py-3 px-6 md:px-8 bg-pumpkin rounded-md uppercase text-white text-sm md:text-base
          hover:bg-transparent hover:border hover:border-pumpkin hover:text-pumpkin transition-all duration-300"
        >
          Ny nyhed
        </button>
      </div>

      <div class="hidden md:grid grid-cols-4 justify-between font-semibold">
        <p>Titel</p>
        <p class="text-center">Billede</p>
        <p class="text-center">Ret</p>
        <p class="text-center">Slet</p>
      </div>

      {#each data as n}
        <div
          class="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 justify-between
          border-b border-platinum last:border-b-0 pb-4 place-items-center"
        >
          <p class="font-medium md:font-normal">{n.title}</p>

          <div class="flex justify-center">
            <img
              src={"http://localhost:5333/images/news/" + n.image}
              alt=""
              class="w-32 md:w-1/2 h-auto rounded-md"
            />
          </div>

          <div class="flex justify-center">
            <button
              on:click={() => {
                toggleEditModal();
                editNewsId = n._id;
                editNewsTitle = n.title;
                newsContent = n.content;
                editNewsImage = n.image;
              }}
              aria-label="Ret nyhed"
              class="p-2 hover:bg-gray-100 rounded-full text-green-700 transition-colors"
            >
              <i class="fa-solid fa-pen-to-square text-lg md:text-xl"></i>
            </button>
          </div>

          <div class="flex justify-center">
            <button
              on:click={() => handleDelete(n._id)}
              class="p-2 hover:bg-gray-100 rounded-full text-red-700 transition-colors"
              aria-label="Slet nyhed"
            >
              <i class="fa-solid fa-trash-can text-lg md:text-xl"></i>
            </button>
          </div>
        </div>
      {/each}
    </div>

    {#if showEditModal}
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div
        class="modal-overlay fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-default"
        on:click={handleClickOutside}
      >
        <div
          class="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          <form on:submit={handleEdit} class="flex flex-col gap-6 p-4 md:p-6">
            <h2 class="text-xl md:text-2xl text-center font-semibold uppercase">
              Ret nyhed
            </h2>

            <label class="flex flex-col gap-1">
              <span class="font-medium">Nyhedstitel:</span>
              <input
                type="text"
                id="title"
                name="title"
                bind:value={editNewsTitle}
                required
                class="border border-gray-200 rounded-md p-2 focus:ring-2 focus:ring-pumpkin focus:border-transparent"
              />
            </label>

            <div class="w-full">
              <Editor
                licenseKey="your-license-key"
                scriptSrc="tinymce/tinymce.min.js"
                bind:value={newsContent}
                {conf}
              />
            </div>

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

            <button
              type="submit"
              class="py-2 md:py-3 px-6 md:px-8 bg-pumpkin rounded-md uppercase text-white text-sm md:text-base
              hover:bg-transparent hover:border hover:border-pumpkin hover:text-pumpkin
              transition-all duration-300 w-fit mx-auto"
            >
              Ret nyhed
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
