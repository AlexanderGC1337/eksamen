<script lang="ts">
  import {
    SearchIcon,
    LocationAltIcon,
    TimeOclockIcon,
    PhoneCallIcon,
    MenuBurgerIcon,
    XIcon,
  } from "svelte-uicons/rounded/regular";
  import { page } from "$app/stores";

  let isMenuOpen = false;
  let isSearchOpen = false;

  function closeMenu() {
    isMenuOpen = false;
  }
</script>

<header class="relative">
  <section class="bg-onyx pt-5 pb-14">
    <div
      class="max-w-screen-lg flex flex-col lg:flex-row items-center mx-auto justify-between px-4"
    >
      <div class="container mx-auto mb-4 md:mb-0">
        <img src="/images/logo.png" alt="Logo" class="mx-auto lg:mx-0" />
      </div>
      <div
        class="flex flex-col lg:flex-row gap-4 lg:gap-10 w-full text-seasalt text-center lg:text-left whitespace-nowrap"
      >
        <span class="flex items-center justify-center lg:justify-start gap-2">
          <LocationAltIcon size="14" class="text-pumpkin" />
          Strømparken 1, 8500 Grenaa.
        </span>
        <span class="flex items-center justify-center lg:justify-start gap-2">
          <TimeOclockIcon size="14" class="text-pumpkin" />
          Man - Søn 9.00 - 18.00
        </span>
        <a
          href="tel:+4586454578"
          class="flex items-center justify-center lg:justify-start gap-2"
        >
          <PhoneCallIcon size="14" class="text-pumpkin" />
          [45] 86 45 45 78
        </a>
      </div>
    </div>
  </section>

  <div class="absolute top-full -translate-y-1/2 w-full z-10">
    <nav class="max-w-screen-lg mx-auto lg:p-5 bg-white lg:rounded-lg relative">
      <div
        class="flex flex-col lg:flex-row justify-between items-center md:px-4"
      >
        <div class="flex w-full lg:hidden justify-between items-center p-5">
          <button
            on:click={() => (isMenuOpen = !isMenuOpen)}
            class="text-eerieblack hover:text-pumpkin"
          >
            {#if isMenuOpen}
              <XIcon size="24" />
            {:else}
              <MenuBurgerIcon size="24" />
            {/if}
          </button>

          <button
            on:click={() => (isSearchOpen = !isSearchOpen)}
            class="lg:hidden text-eerieblack hover:text-pumpkin"
          >
            <SearchIcon size="24" />
          </button>
        </div>

        {#if isSearchOpen}
          <div class="w-full my-4 lg:hidden px-5">
            <div class="relative">
              <input
                type="search"
                name="Søg"
                placeholder="Søg"
                class="w-full rounded-md placeholder:text-eerieblack p-3 border-platinum"
              />
              <SearchIcon
                size="12"
                class="absolute right-3 top-1/2 -translate-y-1/2 stroke-1"
              />
            </div>
          </div>
        {/if}

        <div class="relative w-full">
          <menu
            class={`uppercase flex-col lg:flex-row flex gap-6 lg:gap-14 font-medium text-lg lg:w-auto absolute top-full bg-white w-full lg:relative
                          ${isMenuOpen ? "flex py-4" : "hidden lg:flex"}`}
          >
            <li class="text-center lg:text-left">
              <a
                on:click={closeMenu}
                class={$page.url.pathname === "/"
                  ? "text-pumpkin"
                  : "hover:text-pumpkin"}
                href="/">Forside</a
              >
            </li>
            <li class="text-center lg:text-left">
              <a
                on:click={closeMenu}
                class={$page.url.pathname === "/omos"
                  ? "text-pumpkin"
                  : "hover:text-pumpkin"}
                href="/omos">Om os</a
              >
            </li>
            <li class="text-center lg:text-left">
              <a
                on:click={closeMenu}
                class={$page.url.pathname === "/services"
                  ? "text-pumpkin"
                  : "hover:text-pumpkin"}
                href="/services">Service</a
              >
            </li>
            <li class="text-center lg:text-left">
              <a
                on:click={closeMenu}
                class={$page.url.pathname === "/faq"
                  ? "text-pumpkin"
                  : "hover:text-pumpkin"}
                href="/faq">Faq</a
              >
            </li>
            <li class="text-center lg:text-left">
              <a
                on:click={closeMenu}
                class={$page.url.pathname === "/nyheder"
                  ? "text-pumpkin"
                  : "hover:text-pumpkin"}
                href="/nyheder">Nyheder</a
              >
            </li>
            <li class="text-center lg:text-left">
              <a
                on:click={closeMenu}
                class={$page.url.pathname === "/kontakt"
                  ? "text-pumpkin"
                  : "hover:text-pumpkin"}
                href="/kontakt">Kontakt os</a
              >
            </li>
          </menu>
        </div>

        <div class="hidden lg:block relative">
          <input
            type="search"
            name="Søg"
            placeholder="Søg"
            class="rounded-md border-platinum py-2 md:py-3 px-4 w-full text-sm md:text-base focus:ring-2 focus:ring-pumpkin focus:outline-none focus:border-none"
          />
          <SearchIcon
            size="12"
            class="absolute right-3 top-1/2 -translate-y-1/2 stroke-1"
          />
        </div>
      </div>
    </nav>
  </div>
</header>
