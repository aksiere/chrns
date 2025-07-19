export const GET = async () => {
	const encoder = new TextEncoder()

	let controller
	let inactivityTimer
	let interval
	let closed = false

	const closeStream = () => {
		if (closed) return
		closed = true

		clearInterval(interval)
		clearTimeout(inactivityTimer)

		try {
			controller.close()
		} catch (e) {
			console.warn('Stream already closed:', e)
		}
	}

	const resetInactivityTimer = () => {
		clearTimeout(inactivityTimer)
		inactivityTimer = setTimeout(() => {
			closeStream()
		}, 30_000) // 30 секунд
	}

	const stream = new ReadableStream({
		start(ctrl) {
			controller = ctrl
			let count = 0

			const send = () => {
				if (closed) return
				try {
					const data = `data: ping ${count++}\n\n`
					controller.enqueue(encoder.encode(data))
					resetInactivityTimer()
				} catch (e) {
					console.warn('Failed to enqueue:', e)
					closeStream()
				}
			}

			interval = setInterval(send, 5000)
			send() // первая отправка
		}
	})

	return new Response(stream, {
		headers: {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			'Connection': 'keep-alive',
			'Access-Control-Allow-Origin': '*'
		}
	})
}
