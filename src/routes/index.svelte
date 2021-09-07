<script>
	import { onMount } from 'svelte';

	const dataKey = 'playerData';
	let data, timeout;

	async function loadData() {
		const result = await fetch('/tracker.json');
		let json = await result.json();
		let retry = 60000;
		if (json.data) {
			data = json.data;
			localStorage.setItem(dataKey, JSON.stringify(json.data));
			retry = new Date(data.expiryDate).getTime() - new Date().getTime();
		}
		timeout = setTimeout(loadData, retry);
	}

	onMount(() => {
		const tempData = localStorage.getItem(dataKey);
		if (tempData) {
			data = JSON.parse(tempData);
			timeout = setTimeout(loadData, new Date(tempData.expiryDate).getTime() - new Date().getTime());
		} else {
			loadData();
		}
		return () => clearTimeout(timeout);
	});


	$: overview = data ? data.segments.find((x) => x.type === 'overview') : null;
	$: ranked = data ? data.segments.filter((x) => x.attributes.key && x.attributes.key.startsWith('ranked')) : null;
</script>


{#if data}
	<div>
		<ul>
			<li>
				<span class='playlist'>{data.platformInfo.platformUserHandle}</span>
				<img class='avatar' src='{data.platformInfo.avatarUrl}' alt='{data.platformInfo.platformUserHandle}'>
				<span class='score'>{overview.stats.progressionLevel.displayValue} K/D {overview.stats.kd.displayValue}</span>
			</li>
			{#each ranked as rank}
				<li>
					<span class='playlist'>{rank.metadata.name.replace('Ranked ', '')}</span>
					<img src='{rank.stats.rankLevel.metadata.imageUrl}' alt='{rank.stats.rankLevel.metadata.rankName}'>
					<span class='score'>{rank.stats.rankLevel.displayValue}</span>
				</li>
			{/each}
		</ul>
	</div>
{/if}

<style>

    img {
        height: 96px;
        width: 96px;
    }

    .avatar {
        border-radius: 50%;
        box-sizing: border-box;
        padding: 10px;
    }

    ul {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }

    li {
        color: white;
        text-shadow: 0.1em 0.1em black;
        display: flex;
        flex-direction: column;
        padding-top: 1em;
        padding-bottom: 1em;
        font-family: 'Chakra Petch', sans-serif;
        font-weight: 700;
        list-style: none;
        font-size: 1em;
        width: 96px;
    }

    li span {
        width: 100%;
        text-align: center;
    }
</style>
