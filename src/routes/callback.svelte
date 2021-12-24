<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { modal } from './helpers/modal.js';
	import { postLogin } from '../api/login';

	onMount(async () => {
		//read code
		const code = $page.query.get('code');
		console.log('code', code);

		//getting token
		const result = await postLogin(code);

		console.log('auth result', result);

		if (result && result.error) {
			modal('error', 'error', result.error);
			goto('/login');
			return;
		}

		goto('/member/dashboard');
	});
</script>
