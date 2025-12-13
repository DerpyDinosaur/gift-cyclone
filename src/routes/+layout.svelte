<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	import { onMount, tick } from 'svelte';
	import FluidBackground from '$lib/components/FluidBackground.svelte';

	let { children } = $props();
	let isReady = $state(false);

	onMount(async () => {
		await tick();
		for (let i = 0; i < 20; i++) {
			const snowflake = document.createElement('div');
			snowflake.className = 'snowflake';
			snowflake.textContent = '❄';
			snowflake.style.left = Math.random() * 100 + '%';
			snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
			snowflake.style.animationDelay = Math.random() * 5 + 's';
			document.body.appendChild(snowflake);
		}
		isReady = true;
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<FluidBackground {isReady}/>

{#if isReady}
    <main class="grid-row-flow grid w-screen gap-4 p-8 z-10">
    	{@render children()}
    </main>
{/if}
