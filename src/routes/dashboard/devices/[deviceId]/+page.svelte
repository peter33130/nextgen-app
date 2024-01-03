<script lang="ts">
	import TopTitle from '$lib/components/top-title.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const deviceTitle = data.data?.emoji + ' ' + data.data?.name;
</script>

<TopTitle title={deviceTitle} back={true} url="/dashboard/devices" />
<div class="container"></div>
