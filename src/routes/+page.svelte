<script>
	import { source } from 'sveltekit-sse'

	const value = source('/api/stream', {
		close({ connect }) {
			console.log('reconnecting...')
			connect()
		},
	}).select('message')
</script>

{$value}
