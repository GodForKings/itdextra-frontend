import type { FC } from 'react'

import { DashedBackground } from '~/shared'

interface MainLayoutProps {
	children: React.ReactNode
}

export const MainLayout: FC<MainLayoutProps> = props => {
	const { children } = props

	return (
		<div className='relative grid min-h-[100dvh] grid-cols-[5vw_auto_5vw] grid-rows-[1fr_auto_1fr] bg-white [--pattern-fg:var(--color-gray-950)]/5 dark:bg-gray-950 dark:[--pattern-fg:var(--color-white)]/10'>
			<DashedBackground styles='-right-px' />

			<div className='col-start-2 row-start-2 flex min-w-full flex-col bg-gray-100 px-[2vw] py-[2vh] dark:bg-white/10'>
				{children}
			</div>

			<DashedBackground styles='-left-px' />
		</div>
	)
}
