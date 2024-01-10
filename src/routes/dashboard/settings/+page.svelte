<script lang="ts">
	import { browser } from '$app/environment';
	import NavBar from '$lib/components/nav-bar.svelte';
	import TopTitle from '$lib/components/top-title.svelte';
	import type { PageData } from './$types';

	export async function logout() {
		if (browser) await fetch('/api/auth/logout', { method: 'post' });
	}

	export let data: PageData;
</script>

<body>
	<TopTitle title="Settings" back={false} url="" />

	<div class="container">
		<div class="options">
			<p class="title">Account</p>

			<!-- Name -->
			<div class="option">
				<p class="key">Name</p>
				<p class="value">{data.name}</p>
				<i class="fa-solid fa-angle-right" style="color: #7c7c7c;"></i>
			</div>

			<!-- Email -->
			<div class="option">
				<p class="key">Email</p>
				<p class="value">{data.email}</p>
				<i class="fa-solid fa-angle-right" style="color: #7c7c7c;"></i>
			</div>

			<!-- Password -->
			<div class="option">
				<p class="key">Password</p>
				<p class="value">●●●●●●●●●●●●</p>
				<i class="fa-solid fa-angle-right" style="color: #7c7c7c;"></i>
			</div>
		</div>

		<div class="options">
			<p class="title">More Information</p>

			<!-- Contact us -->
			<a href="mailto:nextgen@example.com">
				<div class="option">
					<p class="key">Contact us</p>
					<p class="value"></p>
					<i class="fa-solid fa-angle-right"></i>
				</div></a
			>
		</div>

		<div class="options">
			<button class="logout" on:click={logout}>Logout</button>
		</div>
	</div>

	<NavBar />
</body>

<style>
	.logout {
		display: inline-block;
		padding: 10px 30px;
		background-color: var(--red);
		color: white;
		text-decoration: none;
		border: none;
		font-size: 16px;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	body {
		background-color: #f1f1f1;
	}

	p {
		margin: 0;
		padding: 0;
	}

	.container i {
		font-size: 22px;
		color: #7c7c7c;
		margin-right: 5px;
	}

	.container a {
		text-decoration: none;
		color: #000;
	}

	.options {
		margin: 20px;
	}

	.title {
		text-transform: uppercase;
		margin-bottom: 3px;
	}

	.option {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
		height: 36px;
		margin-bottom: 4px;
	}

	.key {
		margin-left: 8px;
	}

	.value {
		margin-left: auto;
		padding-right: 6px;
	}
</style>
