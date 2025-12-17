<script lang="ts">
	import HandIcon from '@lucide/svelte/icons/hand';
	import WandIcon from '@lucide/svelte/icons/wand-sparkles';
	import { onMount } from 'svelte';

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

<section
	class="group fixed top-1/2 left-1/2 -translate-1/2 w-95 h-120 border border-black perspective-distant z-20"
>
	<div
		class="relative w-full h-full transition duration-500 transform-3d group-hover:rotate-y-180"
		bind:this={card}
	>
		<div class="absolute w-full h-full border border-black/20 bg-neutral-100 rounded-xl shadow-md backface-hidden">
			<h1
				class="inline-block w-full h-16 text-6xl text-center text-transparent bg-linear-to-bl from-[#fcff9e] to-[#c67700] bg-clip-text"
			>
				{display_participant || 'Cyclone'}
			</h1>

			<h2 class="mt-10 mb-3 flex gap-x-4 justify-start items-center text-5xl">
				Magic<span><WandIcon size={30} color="#c67700" /></span>
			</h2>
			<p>{display_power || 'spinning...'}</p>

			<h2 class="mt-10 mb-3 flex gap-x-4 justify-start items-center text-5xl">
				Task<span><HandIcon size={30} color="#c67700" /></span>
			</h2>
			<p>Choose one of the following</p>
			<ul class="pl-3">
				<li>Swap current present with someone elses</li>
				<li>Open current present</li>
			</ul>
		</div>

		<div class="absolute w-full h-full flex justify-center items-center backface-hidden rotate-y-180 bg-white">
			<h1
				class="inline-block w-full h-16 text-6xl text-center text-transparent bg-linear-to-bl from-[#fcff9e] to-[#c67700] bg-clip-text"
			>
			    Cyclone
			</h1>
		</div>
	</div>
</section>

<!-- <section class="fixed top-1/2 left-1/2 w-1/2 h-auto -translate-1/2 z-20 pointer-events-none">
	<div class="perspective-distant">
		<div class="mx-auto relative w-95 h-120 transform-3d transition duration-500" bind:this={card}>
			<div class="absolute p-4 w-full h-full border border-black/20 bg-white rounded-xl shadow-xl">
				<h1
					class="inline-block w-full h-16 text-6xl text-center text-transparent bg-linear-to-bl from-[#fcff9e] to-[#c67700] bg-clip-text"
				>
					{display_participant || 'Cyclone'}
				</h1>

				<h2 class="mt-10 mb-3 flex gap-x-4 justify-start items-center text-5xl">
					Magic<span><WandIcon size={30} color="#c67700" /></span>
				</h2>
				<p>{display_power || 'spinning...'}</p>

				<h2 class="mt-10 mb-3 flex gap-x-4 justify-start items-center text-5xl">
					Task<span><HandIcon size={30} color="#c67700" /></span>
				</h2>
				<p>Choose one of the following</p>
				<ul class="pl-3">
					<li>Swap current present with someone elses</li>
					<li>Open current present</li>
				</ul>
			</div>

			<div class="absolute p-4 w-full h-full rounded-xl shadow-xl rotate-y-180">
			</div>
		</div>
	</div>
</section> -->
