import { redirect } from '@sveltejs/kit'

export const actions = {
	oauth: async ({ request, locals: { supabase } }) => {
		const { provider, next } = Object.fromEntries(await request.formData())
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo: `${request.headers.get('origin')}/auth/confirm?next=${next}`,
			},
		})

		if (error) {
			console.error(error)
			redirect(303, '/auth/error')
		} else {
			redirect(303, data.url)
		}
	}
}
