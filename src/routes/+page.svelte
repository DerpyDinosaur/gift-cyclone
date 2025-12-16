<script lang="ts">
  import { settings as settings_state } from './state.svelte';
	import Cyclone from '$lib/components/Cyclone.svelte';
	import Settings from '$lib/components/Settings.svelte';
	import SettingsIcon from '@lucide/svelte/icons/settings-2';

	let spin = $state(false);
	let settings = $state(false);

	let chosen = $state("");

	const close_cyclone = () => spin = false;
	const close_settings = () => settings = false;

	function spin_cyclone() {
	  if (settings) return;
	  chosen = settings_state.participant;
		spin = true;
	}

	function onKeyDown(e: KeyboardEvent) {
		if (e.code === "Space") {
		  e.preventDefault();
			spin_cyclone();
		}
	}
</script>

<svelte:window on:keydown={onKeyDown} />

{#if spin}
	<Cyclone name={chosen} power="Everyone rotates present clockwise" close={close_cyclone} />
{/if}

{#if settings}
    <Settings close={close_settings} />
{/if}

<section
	class="mx-auto h-full min-h-[66vh] flex flex-col items-center justify-center gap-y-20 z-10"
>
	<header class="flex gap-4 flex-col justify-center items-center text-white">
		<h1 class="text-8xl text-shadow-[2px_2px_3px_#000]">Gift Cyclone</h1>
		<p class="text-2xl text-shadow-[2px_2px_3px_#000]">Spin the cyclone if you dare!</p>
	</header>

	<div class="flex gap-8 justify-center items-center">
		<button
			onclick={spin_cyclone}
			class="p-2 flex justify-center items-center gap-2 border border-black/20 bg-white rounded-md shadow-lg"
		>
			<kbd class="px-2 border border-gray-300 rounded-md bg-neutral-100">Space</kbd>
			<span>Spin the cyclone</span>
		</button>
		<button
		    onclick={() => settings=true}
			class="p-2 flex justify-center items-center gap-2 border border-black/20 bg-white rounded-md shadow-lg"
		>
			<SettingsIcon />
			Settings
		</button>
	</div>
</section>
