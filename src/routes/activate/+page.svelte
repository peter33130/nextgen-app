<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let success = $page.data.success;
	const noToken = $page.data.noToken;

	setTimeout(() => {
		if (success && browser) goto('/dashboard');
	}, 5000);
</script>

<div class="container">
	{#if success}
		<h1 class="title">✅ Activated</h1>
		<p>Account is verified. Please wait a moment...</p>
	{:else if noToken}
		<h1 class="title">⌛ Check your inbox</h1>
		<p>Check your inbox for an activation mail. Didn't receive an email? Check your spam.</p>
	{:else}
		<h1 class="title">❌ Failed</h1>
		<p>{$page.data.message}</p>
	{/if}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		text-align: center;
		height: 100vh;
		justify-content: center;
		align-items: center;
	}

	.title {
		font-size: 40epx;
	}
</style>
