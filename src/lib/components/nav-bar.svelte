<script lang="ts">
	import { page } from '$app/stores';
	const url = $page.url.pathname;
</script>

<nav>
	<ul>
		<li>
			{#if url.endsWith('/devices')}
				<i class="fa-solid fa-laptop" id="selected-item"></i>
				<a href="/dashboard/devices" id="selected-item">My Devices</a>
			{:else}
				<i class="fa-solid fa-laptop" id="unselected-item"></i>
				<a href="/dashboard/devices" id="unselected-item">My Devices</a>
			{/if}
		</li>

		<li>
			{#if url.endsWith('/settings')}
				<i class="fa-solid fa-gear" id="selected-item"></i>
				<a href="/dashboard/settings" id="selected-item">Settings</a>
			{:else}
				<i class="fa-solid fa-gear" id="unselected-item"></i>
				<a href="/dashboard/settings" id="unselected-item">Settings</a>
			{/if}
		</li>
	</ul>
</nav>
<slot />

<style>
	#selected-item {
		color: var(--blue);
		text-decoration: none;
	}

	#unselected-item {
		text-decoration: none;
		color: #7c7c7c;
	}

	nav {
		padding: 0;
		margin: 0;
		width: 100%;
		height: 80px;
		background-color: #f1f1f1;
		border-color: #d3d3d3;
		border: 1px;
		position: fixed;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	nav ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	ul li {
		padding: 0 16px 0 16px;
		display: inline-block;
		color: white;
		text-align: center;
	}

	li i {
		color: #7c7c7c;
		display: block;
	}
</style>
