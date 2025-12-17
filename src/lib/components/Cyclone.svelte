<script lang="ts">
	import HandIcon from '@lucide/svelte/icons/hand';
	import WandIcon from '@lucide/svelte/icons/wand-sparkles';
	import { onMount } from 'svelte';
	import { blur } from 'svelte/transition';

	let {
		name,
		power,
		close = $bindable()
	}: {
		name: string;
		power: string;
		close: VoidFunction;
	} = $props();

	let card = $state<HTMLDivElement | null>(null);
	let display_participant = $state('Spinning...');
	let display_power = $state('');

	onMount(() => {
		card!.classList.add('animate-cyclone');
		setTimeout(() => {
			display_participant = name;
			display_power = power;
			card!.classList.remove('animate-cyclone');
		}, 1600);
	});

	function onKeyDown(e: KeyboardEvent) {
		if (e.code === 'Escape') {
			e.preventDefault();
			close();
		}
	}
</script>

<svelte:window onkeydown={onKeyDown} />

<button
	onclick={close}
	aria-label="close cyclone"
	class="fixed top-0 left-0 w-full h-full bg-black/20 backdrop-blur-md z-20"
></button>

<section class="fixed top-1/2 left-1/2 -translate-1/2 w-95 h-120 perspective-distant z-20">
	<div class="relative w-full h-full transition duration-500 transform-3d" bind:this={card}>
		<div
			class="absolute p-4 w-full h-full flex flex-col gap-8 border border-black/20 bg-neutral-100 rounded-xl shadow-xl backface-hidden"
		>
			<h1
				class="relative w-auto h-16 flex items-center justify-center text-6xl"
			>
				{#key display_participant}
					<span transition:blur class="absolute w-full h-full text-center text-transparent bg-linear-to-bl from-[#fcff9e] to-[#c67700] bg-clip-text">
						{display_participant || 'Gift Cyclone'}
					</span>
				{/key}
			</h1>

			<div class="flex flex-col gap-y-2">
				<h2 class="flex gap-x-4 justify-start items-center text-5xl">
					Magic<span><WandIcon size={30} color="#c67700" /></span>
				</h2>
				<p>{display_power || 'spinning...'}</p>
			</div>

			<div>
				<h2 class="flex gap-x-4 justify-start items-center text-5xl">
					Task<span><HandIcon size={30} color="#c67700" /></span>
				</h2>
				<p>Choose one of the following</p>
				<ul class="pl-8 list-decimal">
					<li>Swap current present with someone elses</li>
					<li>Open current present</li>
				</ul>
			</div>
		</div>

		<div
			class="absolute w-full h-full flex justify-center items-center bg-white rounded-xl shadow-xl rotate-y-180 backface-hidden"
		>
			<h1
				class="inline-block w-full h-16 text-6xl text-center text-transparent bg-linear-to-bl from-[#fcff9e] to-[#c67700] bg-clip-text"
			>
				Gift Cyclone
			</h1>
		</div>
	</div>
</section>
