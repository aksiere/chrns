<script>
    import { goto } from '$app/navigation'
	import '../app.css'
	
	let { children } = $props()

	let items = $derived([
		{ href: '/pckm', title: 'pick\'em' },
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
				<div onclick={() => goto(item.href)} class='flex-1 px-[.75rem] py-[.25rem] bg-1 hover:bg-2 rounded-full transition-all cursor-pointer'>
					{item.title}
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
