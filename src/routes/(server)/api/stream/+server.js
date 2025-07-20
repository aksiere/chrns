export const GET = async ({ setHeaders }) => {
	setHeaders({
		'Content-Type': 'text/plain; charset=utf-8',
		'Transfer-Encoding': 'chunked',
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive'
	})

	let interval

	const stream = new ReadableStream({
		start(controller) {
			console.log('Stream started')

			interval = setInterval(() => {
				try {
					const msg = Date.now().toString()
					console.log('Sending message:', msg)
					controller.enqueue(new TextEncoder().encode(msg))
				} catch (err) {
					clearInterval(interval)
				}
			}, 1000)

			setTimeout(() => {
				clearInterval(interval)
				if (controller.readable) {
					try {
						controller.close()
					} catch {
						// Already closed — silently ignore
					}
				}
			}, 60_000)
		},

		cancel() {
			clearInterval(interval)
			console.log('Stream cancelled by client')
		}
	})

	return new Response(stream)
}
