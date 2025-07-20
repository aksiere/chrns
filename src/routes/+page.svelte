<script lang='ts'>
    import { browser } from '$app/environment'
	import { onMount } from 'svelte'

	let data = $state('Connecting...')

	if (browser) {
		fetch('/api/stream').then(res => {
			const decoder = new TextDecoder()

			if (!res.body) return

			const writable = new WritableStream({
				write(chunk) {
					data = JSON.parse(decoder.decode(chunk).trim())
				}
			})

			res.body.pipeTo(writable)
		})
	}
</script>

<p>{data}</p>
