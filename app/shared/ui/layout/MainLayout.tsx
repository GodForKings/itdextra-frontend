import type { FC } from 'react'
import { cn } from '~/shared'

interface MainLayoutProps {
	children: React.ReactNode
	className?: string
}

export const MainLayout: FC<MainLayoutProps> = props => {
	const { children, className } = props

	return (
		<div className='relative grid min-h-[100dvh] grid-cols-[5vw_auto_5vw] grid-rows-[1fr_1px_auto_1px_1fr] bg-white [--pattern-fg:var(--color-gray-950)]/5 dark:bg-gray-950 dark:[--pattern-fg:var(--color-white)]/10'>
			<div className='relative -right-px col-start-1 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed'></div>

			<div className='col-start-2 row-start-3 flex min-w-full flex-col bg-gray-100 px-[2vw] py-[2vh] dark:bg-white/10'>
				{children}
			</div>

			<div className='relative -left-px col-start-3 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed'></div>

			{/* <div className='relative -bottom-px col-span-full col-start-1 row-start-2 h-px bg-(--pattern-fg)'></div>
			<div className='relative -top-px col-span-full col-start-1 row-start-4 h-px bg-(--pattern-fg)'></div> */}
		</div>
	)
}
