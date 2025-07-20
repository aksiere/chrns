import { produce } from 'sveltekit-sse'

/** @type {Set<Function>} */
const emitters = new Set()

setInterval(() => {
	const message = `${Date.now()}`
	for (const emit of emitters) {
		const { error } = emit('message', message)
		if (error) {
			emitters.delete(emit)
		}
	}
}, 1000)

export function POST() {
	return produce(function start({ emit }) {
		console.log('Client connected.')
		emitters.add(emit)
	}, {
		ping: 4000,
		stop() {
			console.log('Client disconnected.')
		}
	},)
}
