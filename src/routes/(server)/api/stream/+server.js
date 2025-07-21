import { produce } from 'sveltekit-sse'

function delay(milliseconds) {
	return new Promise(function run(resolve) {
		setTimeout(resolve, milliseconds)
	})
}

const emitters = new Set()

export function POST() {
	return produce(async function start({ emit }) {
		emitters.add(emit)

		try {
			while (true) {
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

				for (const clientEmit of emitters) {
					const { error } = clientEmit('message', secondsUntilSaturday.toString())
					if (error) {
						emitters.delete(clientEmit)
					}
				}
				await delay(1000)
			}
		} finally {
			emitters.delete(emit)
		}
	})
}
