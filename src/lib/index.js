// place files you want to import through the `$lib` alias in this folder.

export function secondsToDDHHMMSS(totalSeconds) {
	const days = String(Math.floor(totalSeconds / 86400)).padStart(2, '0')
	const hours = String(Math.floor((totalSeconds % 86400) / 3600)).padStart(2, '0')
	const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0')
	const seconds = String(totalSeconds % 60).padStart(2, '0')
	return `${days}:${hours}:${minutes}:${seconds}`
}
