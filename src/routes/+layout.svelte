<!-- <script>
	import '../app.css'
	
	let { children } = $props()

	function getTest() {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve('Test completed')
			}, 1000)
		})
	}
</script>

<svelte:boundary>
	{#snippet pending()}
		<p>pending</p>
	{/snippet}

	{#snippet failed()}
		<p>failed</p>
	{/snippet}

	{await getTest()}
	{@render children?.()}
</svelte:boundary> -->

<script>
	import { onMount } from 'svelte'
	let token = ''
	const siteKey = '0x4AAAAAABl2IowFuPC8EUEy'

	onMount(() => {
		const check = () => {
			if (window.turnstile) {
				window.turnstile.render('#turnstile-container', {
					sitekey: siteKey,
					callback: (t) => (token = t),
					'expired-callback': () => (token = ''),
				})
			} else {
				setTimeout(check, 100) // wait until turnstile is loaded
			}
		}
		check()
	})

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!token) {
			alert('Complete Turnstile first.')
			return
		}
		// Submit logic here
	}
</script>

<svelte:head>
	<script src='https://challenges.cloudflare.com/turnstile/v0/api.js' async defer></script>
</svelte:head>

<form on:submit={handleSubmit}>
	<div id='turnstile-container'></div>
	<button type='submit'>Submit</button>
</form>
