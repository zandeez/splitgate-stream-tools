const playerId = import.meta.env.VITE_TRACKER_PLAYER_ID;
const platform = import.meta.env.VITE_TRACKER_PLATFORM;
const apiKey = import.meta.env.VITE_TRACKER_API_KEY;

const url = `https://public-api.tracker.gg/v2/splitgate/standard/profile/${platform}/${playerId}`;

export async function get({ params }) {
	const result = await fetch(url, { headers: { 'TRN-Api-Key': apiKey } });
	return { body: await result.json() };
}
