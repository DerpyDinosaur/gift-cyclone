<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
        for (let i = 0; i < 20; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.textContent = '❄';
            snowflake.style.left = Math.random() * 100 + '%';
            snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
            snowflake.style.animationDelay = Math.random() * 5 + 's';
            document.body.appendChild(snowflake);
        }
	})
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header class="px-4 flex justify-end items-center bg-red-500/20">
    <button class="">
        Settings
    </button>
</header>

<main class="w-full h-full flex justify-center items-center overflow-hidden">
    {@render children()}
</main>
