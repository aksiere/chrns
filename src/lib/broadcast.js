// src/lib/broadcast.js
let listeners = []

export function subscribe(listener) {
	listeners.push(listener)
	return () => {
		listeners = listeners.filter(l => l !== listener)
	}
}

export function broadcast(event, data) {
	for (const listener of listeners) {
		listener({ event, data })
	}
}
