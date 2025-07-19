<!-- src/routes/+page.svelte -->
<script>
    import { browser } from '$app/environment'

	let messages = []

	if (browser) {
		const source = new EventSource('/events')

		source.onmessage = (event) => {
			messages = [...messages, event.data]
		}

		source.onerror = (error) => {
			console.error('SSE Error:', error)
		}
	}
</script>

<h2>Messages from Server:</h2>
<ul>
	{#each messages as msg, i (i)}
		<li>{msg}</li>
	{/each}
</ul>
