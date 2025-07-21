<script>
	import '../app.css'
	import { source } from 'sveltekit-sse'
    import { goto } from '$app/navigation'
	import { secondsToDDHHMMSS } from '$lib'
	
	let { children } = $props()
	const value = source('/api/stream').select('message')

	let items = $derived([
		{ href: '/pckm', title: 'pick\'em' },
		{ href: '/vt', title: `${secondsToDDHHMMSS(JSON.parse($value || '{}')?.secondsUntil || 0)}`, disabled: !JSON.parse($value || '{}')?.isActive, active: JSON.parse($value || '{}')?.isActive },
		{ href: '/2xdlbb', title: '2xdolbaeb' },
	])
</script>

<div class='p-[1rem] md:p-[5rem] flex flex-col gap-[1rem] md:gap-[10rem]'>
	<div class='grid grid-cols-1 md:grid-cols-2 gap-[1rem]'>
		<div onclick={() => goto('/')} class='px-[.75rem] py-[.25rem] bg-1 hover:bg-2 rounded-full transition-all cursor-pointer'>
			<span>Chronos Project</span>
		</div>

		<div class='flex justify-between gap-[1rem]'>
			{#each items as item (item.href)}
				<div onclick={() => goto(item.href)} class='relative flex-1 px-[.75rem] py-[.25rem] bg-1 hover:bg-2 rounded-full transition-all cursor-pointer' class:pointer-events-none={item.disabled} class:opacity-50={item.disabled}>
					<span>{item.title}</span>

					{#if item.active}
						<span class='absolute right-[.75rem] top-[50%] translate-y-[-50%] flex size-3'>
							<span class='absolute inline-flex h-full w-full animate-ping rounded-full bg-black/50'></span>
							<span class='relative inline-flex size-3 rounded-full bg-black/80'></span>
						</span>
					{/if}
				</div>
			{/each}

			<div onclick={() => goto('/sttngs')} class='group flex items-center px-[.75rem] py-[.25rem] bg-1 hover:bg-2 rounded-full transition-all cursor-pointer'>
				<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='group-hover:animate-spin temporary-spin lucide lucide-bolt-icon lucide-bolt'><path d='M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z'/><circle cx='12' cy='12' r='4'/></svg>
			</div>
		</div>
	</div>

	<div>
		{@render children?.()}
	</div>
</div>
