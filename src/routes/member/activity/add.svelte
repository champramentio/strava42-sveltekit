<script>
	import { goto } from '$app/navigation';
	import { postActivities } from '../../../api/activity';
	import { modal, toast } from '../../helpers/modal';

	const pageName = 'Create Activity';

	let loading = false;

	let types = [
		'AlpineSki',
		'BackcountrySki',
		'Canoeing',
		'Crossfit',
		'EBikeRide',
		'Elliptical',
		'Golf',
		'Handcycle',
		'Hike',
		'IceSkate',
		'InlineSkate',
		'Kayaking',
		'Kitesurf',
		'NordicSki',
		'Ride',
		'RockClimbing',
		'RollerSki',
		'Rowing',
		'Run',
		'Sail',
		'Skateboard',
		'Snowboard',
		'Snowshoe',
		'Soccer',
		'StairStepper',
		'StandUpPaddling',
		'Surfing',
		'Swim',
		'Velomobile',
		'VirtualRide',
		'VirtualRun',
		'Walk',
		'WeightTraining',
		'Wheelchair',
		'Windsurf',
		'Workout',
		'Yoga'
	];

	let payload = {
		name: '',
		type: '',
		start_date_local: '',
		elapsed_time: 0,
		distance: '',
		description: '',
		trainer: 0,
		commute: 0,
		hide_from_home: false
	};

	const handleSubmit = async (e) => {
		loading = true;

		const result = await postActivities(payload);

		if (result.error) {
			modal('error', 'error', result.error);
		} else {
			toast('success', result.success);
			goto('/member/activity');
		}

		loading = false;
	};
</script>

<svelte:head>
	<title>{pageName}</title>
</svelte:head>

<h1>{pageName}</h1>

<div class="spacer">
	<form on:submit|preventDefault={handleSubmit}>
		<label for="">Name</label>
		<input type="text" bind:value={payload.name} />

		<label for="">Type</label>
		<select bind:value={payload.type}>
			{#each types as type}
				<option value={type}>
					{type}
				</option>
			{/each}
		</select>

		<label for="">Start Date</label>
		<input type="datetime-local" bind:value={payload.start_date_local} />

		<label for="">Elapsed Time (seconds)</label>
		<input type="number" bind:value={payload.elapsed_time} />

		<label for="">Description</label>
		<input type="text" bind:value={payload.description} />

		<div class="menu">
			<div>
				{#if loading}
					<button type="submit" class="is-primary" disabled>Submitting...</button>
				{:else}
					<button type="submit" class="is-primary">Submit</button>
				{/if}
			</div>
			<div><a href="/member/activity">Back</a></div>
		</div>
	</form>
</div>
