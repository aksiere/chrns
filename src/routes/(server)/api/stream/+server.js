import { produce } from 'sveltekit-sse'

const clients = new Set()

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

async function broadcast(message) {
	for (const emit of [...clients]) {
		const { error } = emit('message', message)
		if (error) {
			clients.delete(emit)
		}
	}
}

let broadcasting = false

async function startBroadcasting() {
	if (broadcasting) return
	broadcasting = true
	while (true) {
		if (clients.size === 0) {
			// Подождём немного и проверим снова, прежде чем останавливать цикл
			await sleep(500)
			if (clients.size === 0) {
				broadcasting = false
				break
			}
		}

		const xDay = 6
		const yDay = 0

		const now = new Date()
		const dayOfWeek = now.getDay()
		const targetDay = dayOfWeek === xDay ? yDay : xDay
		const daysUntilTarget = (targetDay - dayOfWeek + 7) % 7 || 7
		const nextTarget = new Date(now)
		nextTarget.setDate(now.getDate() + daysUntilTarget)
		nextTarget.setHours(0, 0, 0, 0)
		const secondsUntilSaturday = Math.floor((nextTarget - now) / 1000)
		await broadcast(`${secondsUntilSaturday}`)
		await sleep(1000)
	}
}

export function POST() {
	return produce(({ emit }) => {
		// console.log('Connection opened')
		clients.add(emit)
		startBroadcasting()

		return () => {
			clients.delete(emit)
			// console.log('Connection closed')
		}
	})
}
