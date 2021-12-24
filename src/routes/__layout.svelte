<script context="module">
	export async function load({ page }) {
		return {
			props: {
				path: page.path
			}
		};
	}
</script>

<script>
	import { onMount } from 'svelte';
	import { postLogout } from '../api/logout';
	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';
	import { userState } from '../store/index';
	import { toast, modal } from './helpers/modal';
	import '../../node_modules/sweetalert2/dist/sweetalert2.min.css';

	export let path;

	let authed = false;
	$: authed;
	let rendered = false;
	const publicPages = ['/', '/login', '/register', '/callback'];

	onMount(async () => {
		try {
			const user = get(userState);
			console.log('getting user state', user);
			if (user && user.athlete && user.athlete.id) authed = true;
			console.log('auth condition', authed);
		} catch (error) {}

		//validate protected routes
		if (!authed && !publicPages.includes(path)) {
			goto('/login');
			location.reload();
			return;
		}

		rendered = true;
	});

	const handleLogout = async () => {
		const result = await postLogout();

		if (result && result.error) {
			modal('error', 'error', result.error);
			return;
		}

		toast('success', 'Logout successfully');
		authed = false;

		goto('/login');
		location.reload();
	};
</script>

<div class="container">
	{#if rendered}
		<nav>
			{#if authed}
				<a href="/member/dashboard">Dashboard</a>
				<a href="/member/activity">Activity</a>
				<a href="#!" on:click={handleLogout}>Logout</a>
			{:else}
				<a href="/">Home</a>
				<a href="/login">Login</a>
			{/if}
		</nav>

		<slot />
	{/if}
</div>

<style>
	nav {
		border-bottom: 1px solid #ccc;
	}
	nav a {
		color: #000;
		text-decoration: none;
		font-size: 1rem;
		padding: 1.2rem 1rem;
		display: inline-block;
	}
	nav a:hover {
		background-color: #ccc;
	}
</style>
