<script lang="ts">
	import type { PageData } from './$types';
	import NavBar from '$lib/components/nav-bar.svelte';
	import TopTitle from '$lib/components/top-title.svelte';
	import moment from 'moment';

	export let data: PageData;
</script>

<TopTitle title={'Devices'} back={false} url={''} />
{#each data.devices as { id, emoji, name, updatedAt }}
	<a style="text-decoration: none;" href={`/dashboard/devices/${id}`}>
		<li>
			<p class="emoji">{emoji}</p>

			<div class="stats">
				<p class="name">{name}</p>
				<p class="updated-at">{updatedAt ? `Updated ${moment(updatedAt).fromNow()}` : 'Device not activated'}</p>
			</div>
		</li></a
	>
{/each}
<NavBar />

<style>
	li {
		color: #000;
		padding: 15px 15px 15px;
		border-top: 1px solid #afafaf;
		border-bottom: 1px solid #afafaf;
		list-style-type: none;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: -1px;
	}

	.emoji {
		margin: 0 15px 0 0px;
		padding: 0;
		font-size: 35px;
	}

	.name {
		font-size: 18px;
		font-weight: bold;
	}

	.updated-at {
		font-size: 15px;
	}

	.stats p {
		margin: 0;
		padding: 0;
	}
</style>
