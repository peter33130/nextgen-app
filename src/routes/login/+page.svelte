<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="container">
	<h1 class="title">LOGIN</h1>

	{#if form && !form.success}
		<div class="error">
			<p>{form?.message}</p>
		</div>
	{/if}

	<form class="login" method="post" action="?/login" use:enhance>
		<input name="email" type="text" placeholder="Email" />
		<input name="password" type="password" placeholder="Password" />
		<button class="login-button" type="submit">Login</button>
	</form>

	<p>Don't have an account? <a class="register-here" href="/register">Register Here</a></p>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;
		justify-content: center;
		align-items: center;
	}

	.title {
		font-size: 30px;
		margin-bottom: 10px;
	}

	.error {
		width: 250px;
		margin: 8px 0;
		border-width: 2px;
		border-color: var(--red); /* Red-500 in Tailwind CSS */
		padding: 0.75rem; /* Equivalent to p-3 in Tailwind CSS */
		background-color: #fde4e4; /* Red-100 in Tailwind CSS */
		border-radius: 2%;
	}

	.error p {
		text-align: center;
	}

	.login {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.login input {
		width: 250px;
		padding: 12px 20px;
		margin: 8px 0;
		display: inline-block;
		border: 1px solid #ccc;
		border-radius: 4px;
		box-sizing: border-box;
	}

	.login-button {
		margin: 16px 0 24px;
		background-color: var(--blue); /* Green */
		border: none;
		color: white;
		padding: 15px 32px;
		text-align: center;
		font-size: 16px;
	}

	.register-here {
		color: var(--blue);
	}
</style>
