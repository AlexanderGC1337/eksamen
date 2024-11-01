<script lang="ts">
  export let title: string;
  export const defaultOpen = false;
  export let isSelected = false;

  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  $: isOpen = isSelected;

  function toggle() {
    dispatch("select", { title });
  }
</script>

<div class="mb-2">
  <button
    on:click={toggle}
    class="w-full p-4 rounded-md flex justify-between items-center text-left hover:bg-gray-50 focus:outline-none border border-platinum {isOpen
      ? 'bg-pumpkin text-white'
      : 'bg-white'}"
  >
    <span class="font-medium">{title}</span>
    <svg
      class={`w-5 h-5 transition-transform duration-200 ${
        isOpen ? "rotate-180" : ""
      }`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clip-rule="evenodd"
      />
    </svg>
  </button>

  {#if isOpen}
    <div class="p-4 border border-t-0 border-platinum bg-white">
      <slot />
    </div>
  {/if}
</div>
