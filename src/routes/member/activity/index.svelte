<script>
	import { onMount } from 'svelte';
	import { getActivities } from '../../../api/activity';
	import { formatAmount, formatDatetime } from '../../helpers/utils';

	const pageName = 'Your Activities';
	let list = [];

	//get the data from the api, after the page is mounted.
	onMount(async () => {
		list = await getActivities();
	});
</script>

<svelte:head>
	<title>{pageName}</title>
</svelte:head>

<h1>{pageName}</h1>

<div class="spacer">
	<a href="/member/activity/add" class="button is-primary">Create New Activity</a>
</div>

{#if list && list.data}
	<table>
		<tr>
			<th>Activity Name</th>
			<th>Type</th>
			<th align="center">Start Date</th>
			<th align="right">Elapsed Time (seconds)</th>
		</tr>
		{#if list.data.length === 0}
			<tr>
				<td colspan="4">No data found</td>
			</tr>
		{:else}
			{#each list.data as item}
				<tr>
					<td>{item.name}</td>
					<td>{item.type}</td>
					<td align="center">{formatDatetime(item.start_date_local)}</td>
					<td align="right">{formatAmount(item.elapsed_time, false)}</td>
				</tr>
			{/each}
		{/if}
	</table>
{:else if list.error}
	{list.error}
{:else}
	loading...
{/if}
