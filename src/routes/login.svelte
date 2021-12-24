<script>
	import { goto } from '$app/navigation';
	import { variables } from '../services/variables';

	let loading = false;

	const link = `https://strava.com/oauth/authorize?client_id=${variables.clientId}&redirect_uri=${variables.appPath}/callback&response_type=code&approval_prompt=auto&scope=read,read_all,activity:write,activity:read_all`;

	function connect() {
		loading = true;
		goto(link);
	}
</script>

<div>
	<h1>Login</h1>

	<div class="spacer">
		{#if loading}
			<button class="is-primary" disabled>Loading...</button>
		{:else}
			<button on:click={connect} class="is-primary">Connect to Strava</button>
		{/if}
	</div>
</div>
