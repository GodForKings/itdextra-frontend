import type { FC } from 'react'
import { DASHED_BACKGROUND, cn } from '~/shared'

interface MainLayoutProps {
	children: React.ReactNode
}

export const MainLayout: FC<MainLayoutProps> = props => {
	const { children } = props

	return (
		<div className='relative grid min-h-[100dvh] grid-cols-[4vw_auto_4vw] grid-rows-[1fr_auto_1fr] bg-white [--pattern-fg:var(--color-gray-950)]/5 dark:bg-gray-950 dark:[--pattern-fg:var(--color-white)]/10'>
			<div
				className={cn(DASHED_BACKGROUND, '-right-px [transform:scaleX(-1)]')}
			></div>

			<div className='col-start-2 row-start-2 flex flex-col min-w-full bg-gray-100 dark:bg-white/10 pt-10 md:pt-12'>
				{children}
			</div>

			<div className={cn(DASHED_BACKGROUND, '-left-px')}></div>
		</div>
	)
}
