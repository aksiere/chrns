import { PUBLIC_X_DAY, PUBLIC_Y_DAY } from '$env/static/public'
import { produce } from 'sveltekit-sse'

function delay(milliseconds) {
	return new Promise(function run(resolve) {
		setTimeout(resolve, milliseconds)
	})
}

export function POST() {
	return produce(async function start({ emit }) {
		while (true) {
			const now = new Date()
			const dayOfWeek = now.getDay()
			const targetDay = dayOfWeek === Number(PUBLIC_X_DAY) ? Number(PUBLIC_Y_DAY) : Number(PUBLIC_X_DAY)
			const daysUntilTarget = (targetDay - dayOfWeek + 7) % 7 || 7
			const nextTarget = new Date(now)
			nextTarget.setDate(now.getDate() + daysUntilTarget)
			nextTarget.setHours(0, 0, 0, 0)
			const secondsUntil = Math.floor((nextTarget - now) / 1000)

			const isActive = dayOfWeek === Number(PUBLIC_X_DAY)
			const { error } = emit('message', JSON.stringify({ isActive, secondsUntil }))

			if (error) {
				return
			}

			await delay(1000)
		}
	})
}
