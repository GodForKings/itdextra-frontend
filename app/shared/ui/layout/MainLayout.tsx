import type { FC } from 'react'

import { DashedBackground } from '~/shared'

interface MainLayoutProps {
	children: React.ReactNode
}

export const MainLayout: FC<MainLayoutProps> = props => {
	const { children } = props

	return (
		<div className='relative grid min-h-[100dvh] grid-cols-[5vw_auto_5vw] grid-rows-[1fr_auto_1fr] bg-white [--pattern-fg:var(--color-gray-950)]/5 dark:bg-gray-950 dark:[--pattern-fg:var(--color-white)]/10'>
			<DashedBackground styles='z-3 bg-white dark:bg-gray-950' />

			<div className='col-start-2 row-start-2 flex flex-col min-w-full bg-gray-100 dark:bg-white/10'>
				{children}
			</div>

			<DashedBackground styles='z-3 bg-white dark:bg-gray-950' />
		</div>
	)
}
