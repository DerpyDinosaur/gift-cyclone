<script lang="ts">
  let {
    // participants = $bindable([]),
    close = $bindable()
  } = $props();

  let raw = $state("");
  let participants = $derived(
    raw !== "" ?
    raw.split(/\r?\n/g).filter(line => line.trim() !== '') :
    []
  );

  function onKeyDown(e: KeyboardEvent) {
		if (e.code === "Escape") {
		  e.preventDefault();
		  close();
		}
	}
</script>

<svelte:window onkeydown={onKeyDown} />

<button
	onclick={close}
	aria-label="close settings"
	class="fixed top-0 left-0 w-full h-full bg-black/20 backdrop-blur-md z-20"
></button>

<section
    class="p-4 fixed left-1/2 top-1/3 -translate-x-1/2 flex gap-4 flex-col justify-center items-center w-1/2 h-auto border border-white/20 rounded-xl shadow-xl bg-white z-20">
    <header>
        <h1 class="text-5xl">Settings</h1>
    </header>

    <div class="w-full grid gap-10 justify-around items-center grid-cols-2 grid-rows-1">
        <div class="w-full h-full flex justify-center items-center">
            <textarea
                bind:value={raw}
                class="w-full h-full border border-black/20 bg-gray-100 rounded-md shadow-md"
            ></textarea>
        </div>

        <div class="w-full h-full flex flex-col justify-start items-start">
            {#each participants as participant (participant)}
                <div class="bg-neutral-100">{participant}</div>
            {/each}
        </div>
    </div>

    <div>
        <button>Submit</button>
    </div>
</section>
