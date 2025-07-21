import { PUBLIC_X_DAY } from '$env/static/public'
import { redirect } from '@sveltejs/kit'

/** @type {import('./$types').PageLoad} */
export async function load() {
	if (new Date().getDay() !== Number(PUBLIC_X_DAY)) {
		redirect(303, '/')
	}
}
