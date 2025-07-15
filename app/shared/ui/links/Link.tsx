import type { FC } from 'react'
import { cn } from '~/shared'

interface LinkProps {
	children: React.ReactNode
	currentLink: string
	styles?: string
}

export const Link: FC<LinkProps> = props => {
	const { children, currentLink, styles } = props

	return (
		<a
			href={currentLink}
			className={cn(
				'group relative px-1.5 text-sm/6 text-sky-800 dark:text-sky-300',
				styles
			)}
		>
			<span className='absolute inset-0 border border-dashed border-sky-300/60 bg-sky-400/10 group-hover:bg-sky-400/15 dark:border-sky-300/30'></span>

			{children}

			<svg
				width='5'
				height='5'
				viewBox='0 0 5 5'
				className='absolute top-[-2px] left-[-2px] fill-sky-300 dark:fill-sky-300/50'
			>
				<path d='M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z'></path>
			</svg>
			<svg
				width='5'
				height='5'
				viewBox='0 0 5 5'
				className='absolute top-[-2px] right-[-2px] fill-sky-300 dark:fill-sky-300/50'
			>
				<path d='M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z'></path>
			</svg>
			<svg
				width='5'
				height='5'
				viewBox='0 0 5 5'
				className='absolute bottom-[-2px] left-[-2px] fill-sky-300 dark:fill-sky-300/50'
			>
				<path d='M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z'></path>
			</svg>
			<svg
				width='5'
				height='5'
				viewBox='0 0 5 5'
				className='absolute right-[-2px] bottom-[-2px] fill-sky-300 dark:fill-sky-300/50'
			>
				<path d='M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z'></path>
			</svg>
		</a>
	)
}
