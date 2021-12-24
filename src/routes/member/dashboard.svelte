<script>
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { userState } from '../../store/index';

	let fullname = '';

	onMount(async () => {
		try {
			const user = await get(userState);
			fullname = user.athlete.firstname + ' ' + user.athlete.lastname;
		} catch (error) {}
	});
</script>

<div>
	<h1>Hello, {fullname}</h1>
</div>
