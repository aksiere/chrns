import { redirect } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, locals: { supabase } }) {
	const code = url.searchParams.get('code')
	const next = url.searchParams.get('next') || '/'
	
	await supabase.auth.exchangeCodeForSession(code)
	
	redirect(303, next)
}
