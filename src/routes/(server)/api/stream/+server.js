import { produce } from 'sveltekit-sse'
import { EventEmitter } from 'events'

const emitter = new EventEmitter()

setInterval(() => {
	emitter.emit('tick', Date.now().toString())
}, 1000)

export function POST() {
	return produce(async function start({ emit }) {
		const onTick = (message) => {
			const { error } = emit('message', message)
			if (error) {
				emitter.off('tick', onTick)
			}
		}

		emitter.on('tick', onTick)
	})
}
