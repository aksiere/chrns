import { json } from '@sveltejs/kit'

export async function POST({ request }) {
	const { token } = await request.json()

	const secretKey = '0x4AAAAAABl2Ijc0-vPANjtFaVDV_0oggsM'

	const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			secret: secretKey,
			response: token
		})
	})

	const data = await response.json()

	return json({ success: data.success })
}
