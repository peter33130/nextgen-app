<script lang="ts">
	import { redirect } from '@sveltejs/kit';
	import type { ActionData } from './$types';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	export let errors = {
		name: {
			error: false,
			message: '',
		},
		email: {
			error: false,
			message: '',
		},
		password: {
			error: false,
			message: '',
		},
		confirmPassword: {
			error: false,
			message: '',
		},
	};

	export let form: ActionData;
	console.log(form); // remove later
	if (form && form.success && browser) goto('/activate');
</script>

<div class="container">
	<h1 class="title">Register</h1>

	<form method="post" id="register-form">
		<input name="name" type="text" placeholder="Name" />
		{#if errors.name.error}
			<span class="form-error-message">
				<i class="fa-solid fa-circle-exclamation"></i>
				<p>{errors.name.message}</p>
			</span>
		{/if}

		<input name="email" type="email" placeholder="Email" />
		{#if errors.email.error}
			<span class="form-error-message">
				<i class="fa-solid fa-circle-exclamation"></i>
				<p>{errors.email.message}</p>
			</span>
		{/if}

		<input name="password" type="password" placeholder="Password" />
		{#if errors.password.error}
			<span class="form-error-message">
				<i class="fa-solid fa-circle-exclamation"></i>
				<p>{errors.name.message}</p>
			</span>
		{/if}

		<input name="confirm-password" type="password" placeholder="Confirm Password" />
		{#if errors.confirmPassword.error}
			<span class="form-error-message">
				<i class="fa-solid fa-circle-exclamation"></i>
				<p>{errors.confirmPassword.message}</p>
			</span>
		{/if}
	</form>

	<p>Already have an account? <a class="login-here-text" href="/login">Login Here</a></p>

	<input class="submit-form-button" type="submit" form="register-form" value="Register" />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh; /* 100% of the viewport height */
		margin: 0;
	}

	.title {
		text-transform: uppercase;
		font-size: 26px;
	}

	form {
		display: flex;
		flex-direction: column;
		text-align: center;
	}

	.form-error-message {
		display: flex;
		margin: 3px 0 10px;
	}

	.form-error-message i {
		color: var(--red);
		margin-right: 5px;
		font-size: 15px;
	}

	.form-error-message p {
		margin: 0;
		font-size: 12px;
	}

	.login-here-text {
	}

	.submit-form-button {
	}
</style>
