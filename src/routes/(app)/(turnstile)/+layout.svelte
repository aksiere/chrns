<script>
    import Loader from '$lib/components/Loader.svelte'
	import { onMount } from 'svelte'

	let { children } = $props()
	let verified = $state(false)

	onMount(() => {
		window.onloadTurnstileCallback = function () {
			turnstile.render('#test', {
				sitekey: '0x4AAAAAABl2IowFuPC8EUEy',
				callback: function (token) {
					// console.log(`Challenge Success ${token}`)
					verified = true
				},
			})
		}
	})
</script>

<svelte:head>
	<script src='https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback' async defer></script>
</svelte:head>

{#if verified}
	{@render children?.()}
{:else}
	<div id='test'></div>
	<Loader />
{/if}
