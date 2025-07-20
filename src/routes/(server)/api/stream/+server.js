import { produce } from 'sveltekit-sse'
import { subscribe, broadcast } from '$lib/broadcast'

function startTicker() {
	setInterval(() => {
		broadcast('message', `the time is ${Date.now()}`)
	}, 1000)
}

let started = false

export function POST() {
	if (!started) {
		startTicker()
		started = true
	}

	return produce(async function start({ emit }) {
		const unsubscribe = subscribe(({ event, data }) => {
			emit(event, data)
		})

		return () => {
			unsubscribe()
		}
	})
}
