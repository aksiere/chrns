<script>
	let { children } = $props()

	let verified = $state(false)

	async function onVerify(token) {
		const res = await fetch('/api/verify-turnstile', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token })
		})

		if (res.ok) {
			verified = true
		}
	}

	function onLoad() {

	}
</script>

{#if verified}
	{@render children?.()}
{:else}
	<div>
		<div class='cf-turnstile' data-sitekey='0x4AAAAAABl2IowFuPC8EUEy' data-callback={onVerify} data-theme='light'></div>
	</div>
{/if}
