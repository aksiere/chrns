<script>
	import { source } from 'sveltekit-sse'
	const value = source('/api/stream').select('message')
</script>

<p class='text-sm'>{$value || 'Connecting...'}</p>
