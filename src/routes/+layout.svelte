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
  let widgetId

  // Replace with your actual site key
  const siteKey = 'your-site-key'

  onMount(() => {
    const interval = setInterval(() => {
      if (window.turnstile) {
        clearInterval(interval)
        widgetId = window.turnstile.render('#turnstile-container', {
          sitekey: siteKey,
          callback: (t) => token = t,
          'expired-callback': () => token = ''
        })
      }
    }, 100)
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!token) {
      alert('Please complete the Turnstile check.')
      return
    }

    const res = await fetch('/api/verify-turnstile', {
      method: 'POST',
      body: JSON.stringify({ token }),
      headers: { 'Content-Type': 'application/json' }
    })

    const data = await res.json()
    if (data.success) {
      // Proceed with your protected action
      alert('Turnstile passed ✅')
    } else {
      alert('Turnstile failed ❌')
    }
  }
</script>

<svelte:head>
  <script src='https://challenges.cloudflare.com/turnstile/v0/api.js' async defer></script>
</svelte:head>

<form on:submit={handleSubmit}>
  <!-- Your form inputs here -->

  <div id='turnstile-container' class='my-turnstile'></div>
  <button type='submit'>Submit</button>
</form>

