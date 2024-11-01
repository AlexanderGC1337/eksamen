<script lang="ts">
  import { formatDate } from "$lib/utils/date";
  import Loader from "$lib/components/Loader.svelte";

  interface commentItem {
    name: string;
    comment: string;
    received: string;
  }

  interface Article {
    title: string;
    content: string;
    image: string;
    received: string;
    comments: commentItem[];
    _id: string;
  }

  export let data: {
    article: Article;
    allNews: Article[];
  };

  let commentData = [];

  let name = "";
  let comment = "";
  let email = "";

  async function handleComment() {
    try {
      const response = await fetch(
        `http://127.0.0.1:5333/news/comment/${data.article._id}`,
        {
          method: "POST",
          body: JSON.stringify({
            name: name,
            comment: comment,
            email: email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      window.location.reload();
      if (!response.ok) {
        throw new Error("Kunne ikke oprette kommentar");
      }
      commentData = await response.json();
      name = "";
      comment = "";
      email = "";
    } catch (error) {
      console.error("Fejl ved indsendelse af kommentar", error);
      alert("Fejl ved indsendelse af kommentar" + error);
    }
  }
</script>

<section>
  <div
    class="pt-12 md:pt-16 lg:pt-20 pb-6 md:pb-8 lg:pb-10 bg-seasalt px-4 md:px-6 lg:px-8"
  >
    <div
      class="max-w-screen-lg mx-auto flex flex-col sm:flex-row gap-4 sm:items-end sm:justify-between"
    >
      <h2 class="text-2xl md:text-3xl font-medium">{data.article.title}</h2>
      <div class="flex gap-1 text-sm text-dimGray items-center">
        <a href="/" class="hover:text-pumpkin transition-colors duration-300"
          >Forside</a
        >
        <span>&gt;</span>
        <span class="text-pumpkin">{data.article.title}</span>
      </div>
    </div>
  </div>

  <div class="max-w-screen-lg mx-auto px-4 md:px-6 lg:px-0 py-8 md:py-10">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
      <div class="lg:col-span-2">
        <article class="bg-white rounded-lg shadow-md relative">
          <div class="relative">
            <img
              src={"http://localhost:5333/images/news/" + data.article.image}
              alt=""
              class="w-full rounded-t-lg aspect-[16/9] object-cover"
            />
            <div
              class="px-3 py-2 absolute top-3 left-3 bg-pumpkin text-white rounded-t-md flex items-center flex-col shadow-md"
            >
              <span class="text-lg font-medium leading-none"
                >{formatDate(data.article.received).day}</span
              >
              <span class="leading-none"
                >{formatDate(data.article.received).month}</span
              >
            </div>
          </div>

          <div class="p-4 md:p-6 lg:p-8">
            <div
              class="text-dimGray mb-2 flex items-center gap-2 text-sm md:text-base"
            >
              <i class="fa-solid fa-comments"></i>
              <span>({data.article.comments.length}) Kommentarer</span>
            </div>

            <h1
              class="text-2xl md:text-3xl font-medium mb-4 border-b border-platinum pb-4"
            >
              {data.article.title}
            </h1>

            <div class="prose max-w-none prose-sm md:prose-base">
              {@html data.article.content}
            </div>
          </div>
        </article>

        <section>
          {#if data.article && data.article.comments}
            <div
              class="mt-12 md:mt-16 lg:mt-20 mb-8 md:mb-10 pb-8 md:pb-10 border-b border-platinum"
            >
              <h2 class="text-xl md:text-2xl mb-6">
                Kommentarer ({data.article.comments.length})
              </h2>

              {#each data.article.comments as comment}
                <div class="mt-5 ps-6 md:ps-10 pe-3 md:pe-5">
                  <p class="font-medium">{comment.name}</p>
                  <div
                    class="text-dimGray mt-2 mb-3 flex items-center gap-1 text-sm"
                  >
                    <i class="fa-regular fa-calendar-days"></i>
                    <span>{formatDate(comment.received).day}</span>
                    <span>{formatDate(comment.received).month}</span>
                    <span>{formatDate(comment.received).year}</span>
                  </div>
                  <p class="text-dimGray text-sm md:text-base">
                    {comment.comment}
                  </p>
                </div>
              {/each}
            </div>
          {/if}
        </section>

        <section class="mb-8 md:mb-0">
          <form on:submit|preventDefault={handleComment} class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                name="name"
                bind:value={name}
                required
                type="text"
                placeholder="Navn"
                class="rounded-md w-full border-platinum p-3 focus:ring-2 focus:ring-pumpkin focus:border-transparent"
              />

              <input
                name="email"
                bind:value={email}
                required
                type="email"
                placeholder="Email"
                class="rounded-md w-full border-platinum p-3 focus:ring-2 focus:ring-pumpkin focus:border-transparent"
              />
            </div>

            <textarea
              name="comment"
              bind:value={comment}
              rows="5"
              required
              placeholder="Kommentar"
              class="rounded-md border-platinum w-full p-3 focus:ring-2 focus:ring-pumpkin focus:border-transparent"
            ></textarea>

            <button
              class="py-2 md:py-3 px-6 md:px-8 bg-pumpkin rounded-md uppercase text-white text-sm md:text-base
              hover:bg-transparent hover:border hover:border-pumpkin hover:text-pumpkin
              transition-all duration-300 focus:ring-2 focus:ring-pumpkin focus:ring-offset-2"
            >
              Send besked
            </button>
          </form>
        </section>
      </div>

      <div class="mt-8 lg:mt-0">
        <h3 class="text-lg md:text-xl font-semibold mb-4 md:mb-6">Arkiv</h3>
        <div class="space-y-4">
          {#each data.allNews
            .sort((a, b) => new Date(b.received).getTime() - new Date(a.received).getTime())
            .slice(0, 4) as article}
            <a
              href="/nyheder/{article.title.toLowerCase().replace(/\s+/g, '-')}"
              class="flex gap-3 md:gap-4 p-3 border-b last:border-b-0 border-platinum
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
