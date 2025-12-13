<script lang="ts">
    import Cyclone from '$lib/components/Cyclone.svelte';
    import Settings from '@lucide/svelte/icons/settings-2';

    let spin = $state(false);

    const draw_name = () => spin=true;
    const close = () => spin=false;
</script>

{#if spin}
    <Cyclone name="Adam" {close} />
{/if}

<section class="mx-auto h-full min-h-[66vh] flex flex-col items-center justify-center gap-y-20 z-10">
    <header class="flex gap-4 flex-col justify-center items-center text-white">
        <h1 class="text-8xl text-shadow-[2px_2px_3px_#000]">Gift Cyclone</h1>
        <p class="text-2xl text-shadow-[2px_2px_3px_#000]">Spin the cyclone if you dare!</p>
    </header>

    <div class="flex gap-8 justify-center items-center">
        <button onclick={draw_name} class="px-4 py-2 flex justify-center items-center gap-2 border border-black/20 bg-white rounded-md shadow-lg">
            <kbd class="border border-gray-300 rounded-md bg-neutral-100">Space</kbd>
            <span>Spin the cyclone</span>
        </button>
       	<button class="px-4 py-2 flex justify-center items-center gap-2 border border-black/20 bg-white rounded-md shadow-lg">
       		<Settings />
       		Settings
       	</button>
    </div>
</section>
