<script>
	import { page } from '$app/state'
</script>

<form method='POST' action='?/oauth'>
	<input type='hidden' name='next' value={page.url?.searchParams.get('next')}>
	<input type='hidden' name='provider' value='discord'>
	<button>discord</button>
</form>
