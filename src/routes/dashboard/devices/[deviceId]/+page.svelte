<script lang="ts">
	import TopTitle from '$lib/components/top-title.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<body>
	<TopTitle title={data.title} back={true} url="/dashboard/devices" />
	<div class="container">
		<!-- Advice -->
		<div class="advice">
			<div class="advice-data">
				<p class="advice-title" style="color: {data.advice.color}">Advice</p>
				<!-- prettier-ignore -->
				<p class="advice-description">
					{data.advice.description} If you want more information about how we measure our data, you can find more information <a href="/how-we-measure">here</a>.
				</p>
			</div>
		</div>

		<!-- Meaurements -->
		<div class="measurements">
			<div>
				<strong>Temperature</strong>
				<p>{(data.measurements.waterTemperature || '-') + ' °C'}</p>
			</div>
			<div>
				<strong>Ph-value</strong>
				<p>{(data.measurements.ph || '-') + ' pH'}</p>
			</div>
		</div>
		<div class="measurements">
			<div>
				<strong>TDS</strong>
				<p>{(data.measurements.tds || '-') + ' PPM'}</p>
			</div>
			<div>
				<strong>Turbidity</strong>
				<p>{(data.measurements.turbidity || '-') + ' NTU'}</p>
			</div>
		</div>

		<!-- Battery -->
		<div class="battery">
			<strong><p>Battery percentage</p></strong>
			<p>{data.battery || '-'} %</p>
		</div>

		<!-- Google Maps -->
		<div class="google-maps">
			<a href={data.gps} target="_blank">Click here to reveal the location</a>
		</div>
	</div>
</body>

<style>
	body {
		background-color: #f1f1f1;
	}

	.container {
		padding: 0;
		margin: 20px;
	}

	.advice {
		white-space: pre-line;
		background-color: #fff;
		border-radius: 15px;
		display: flex;
	}

	.advice-description {
		width: calc(100vw - 80px);
		word-wrap: break-word;
	}

	.advice-data {
		padding-top: 10px;
		padding-left: 10px;
	}

	.advice-title {
		font-size: 18px;
		font-weight: bold;
		margin: 0;
		padding: 0;
	}

	.advice-description {
		margin-top: 10px;
	}

	.measurements {
		display: flex;
		justify-content: space-between;
		margin-top: 20px;
	}

	.measurements div {
		width: calc(50% - 10px);
		height: 80px;
		margin: 0;
		padding: 10px;
		background-color: #fff;
		border-radius: 12px;
		box-sizing: border-box;
	}

	.measurements div p {
		line-height: 30px;
		font-size: 18px;
		text-align: center;
	}

	.battery {
		margin-top: 20px;
		background-color: #fff;
		border-radius: 12px;
		height: 140px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.battery p {
		font-size: 16px;
		text-align: center;
		margin: 5px;
		padding: 0;
	}

	.google-maps {
		margin-top: 20px;
		background-color: #fff;
		border-radius: 12px;
		height: 140px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.google-maps a {
		text-align: center;
	}
</style>
