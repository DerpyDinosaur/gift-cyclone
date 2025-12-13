<script lang="ts">
	import { onMount } from 'svelte';

	let {
		name,
		close = $bindable()
	}: {
		name: string;
		close: VoidFunction;
	} = $props();

	let card = $state<HTMLDivElement | null>(null);
	let participant = $state();

	onMount(() => {
		card!.classList.add('animate-cyclone');
		setTimeout(() => {
			// const names = ['adam', 'meow', 'moose', 'barry', 'john'];
			// const randomName = names[Math.floor(Math.random() * names.length)];
			participant = name;
			card!.classList.remove('animate-cyclone');
			// spinBtn.disabled = false;
		}, 1600);
	});
</script>

<button
	onclick={close}
	aria-label="close cyclone"
	class="fixed top-0 left-0 w-full h-full bg-black/20 backdrop-blur-md z-20"
></button>

<section class="fixed top-1/2 left-1/2 w-1/2 h-auto -translate-1/2 z-20 pointer-events-none">
	<div class="perspective-distant">
		<div class="mx-auto relative w-95 h-120 transform-3d transition duration-500" bind:this={card}>
			<div class="absolute p-4 w-full h-full bg-white rounded-xl shadow-xl">
				<h1 class="w-full text-6xl text-center">{participant}</h1>
			</div>
		</div>
	</div>
</section>
