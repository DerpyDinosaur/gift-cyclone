<script lang="ts">
	import { onMount } from 'svelte';
	import { settings } from '../../routes/state.svelte';
	let { close = $bindable() } = $props();

	let participants_string = $state('');
	let powers_string = $state('');

	const split_newline = (raw: string) =>
		raw !== '' ? raw.split(/\r?\n/g).filter((line: string) => line.trim() !== '') : [];
	let participants = $derived(split_newline(participants_string));
	let powers = $derived(split_newline(powers_string));

	function handle_keyboard(e: KeyboardEvent) {
		if (e.code === 'Escape') {
			e.preventDefault();
			close();
		}
	}

	function handle_submit() {
		settings.participants = participants;
		settings.powers = powers;
		close();
	}

	onMount(() => {
		participants_string = settings.participants.join('\n');
		powers_string = settings.powers.join('\n');
	});
</script>

<svelte:window onkeydown={handle_keyboard} />

<button
	onclick={close}
	aria-label="close settings"
	class="fixed top-0 left-0 w-full h-full bg-black/20 backdrop-blur-md z-20"
></button>

<section class="p-4 fixed top-1/2 left-1/2 -translate-1/2 w-1/2 flex flex-col justify-center items-center gap-4 border border-black/20 rounded-xl shadow-xl bg-white z-20">
    <header>
        <h1 class="text-5xl">Settings</h1>
    </header>

    <div class="w-full grid grid-cols-2 grid-rows-[auto_1fr] gap-x-6">
        <h2 class="mb-4 text-4xl col-span-2">Participants</h2>

        <textarea
			bind:value={participants_string}
			class="p-4 w-full max-h-60 border border-black/10 rounded-md shadow-md focus:outline-1 focus:outline-amber-400"
		></textarea>

        <div
			class="mr-2 p-2 w-full max-h-50 overflow-y-scroll flex gap-4 justify-start items-start flex-wrap border border-black/10 rounded-md"
		>
			{#each participants as participant (participant)}
				<div class="px-2 py-1 rounded-md bg-neutral-100 border border-black/10 shadow-md">
					{participant}
				</div>
			{/each}
		</div>
    </div>

    <div class="w-full grid grid-cols-2 grid-rows-[auto_1fr] gap-x-6">
        <h2 class="text-4xl col-span-2">Powers</h2>

        <textarea
			bind:value={powers_string}
			class="w-full max-h-60 border border-black/10 rounded-md shadow-md focus:outline-1 focus:outline-amber-400"
		></textarea>

        <div
			class="mr-2 p-2 w-full max-h-60 overflow-y-scroll flex gap-4 justify-start items-start flex-wrap border border-black/10 rounded-md"
		>
		    {#each powers as power (power)}
				<div class="px-2 py-1 rounded-md bg-neutral-100 border border-black/10 shadow-md">
					{power}
				</div>
			{/each}
		</div>
    </div>

    <div>
		<button onclick={handle_submit} class="px-4 py-2 border border-black/10 rounded-md shadow-md"
			>Submit</button
		>
	</div>
</section>
