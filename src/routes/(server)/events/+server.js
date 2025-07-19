export const GET = async () => {
	const encoder = new TextEncoder()

	let controller
	let inactivityTimer
	let interval

	const resetInactivityTimer = () => {
		clearTimeout(inactivityTimer)
		inactivityTimer = setTimeout(() => {
			clearInterval(interval)
			controller.close()
		}, 30_000) // 30 секунд
	}

	const stream = new ReadableStream({
		start(ctrl) {
			controller = ctrl

			let count = 0

			const send = () => {
				const data = `data: ping ${count++}\n\n`
				controller.enqueue(encoder.encode(data))
				resetInactivityTimer()
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
