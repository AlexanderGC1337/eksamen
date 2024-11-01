<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="stylesheet" href="/fonts/flaticon.css">
</svelte:head>

<Header/>
{@render children()}
<Footer/>