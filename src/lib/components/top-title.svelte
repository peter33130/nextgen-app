<script lang="ts">
	export let title: string;
	export let back: boolean;
	export let url: string;
</script>

<div class="container">
	{#if back}
		<a href={url}><i class="fas fa-arrow-left"></i></a>
	{/if}
	<p>{title}</p>
</div>

<style>
	.container {
		width: 100%;
		height: 60px;
		background-color: #f1f1f1;
		display: flex;
		align-items: center;
		position: relative;
	}

	.container a {
		text-decoration: none;
		color: #000;
	}

	.container i {
		font-size: 22px;
		margin-right: 10px;
		position: absolute;
		left: 15px;
		top: 50%;
		transform: translateY(-50%);
	}

	.container p {
		font-size: 22px;
		font-weight: bold;
		text-align: center;
		flex: 1;
	}
</style>
