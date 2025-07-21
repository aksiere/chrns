export async function POST({ request }) {
	const { token } = await request.json()
	const secret = '0x4AAAAAABl2Ijc0-vPANjtFaVDV_0oggsM'

	const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
		method: 'POST',
		body: new URLSearchParams({
			secret,
			response: token
		})
	})

	const data = await res.json()

	if (data.success) {
		return new Response(null, { status: 200 })
	} else {
		return new Response(null, { status: 403 })
	}
}
