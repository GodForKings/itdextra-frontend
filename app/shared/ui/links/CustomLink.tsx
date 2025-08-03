import type { FC } from 'react'

import { Link } from 'react-router'

import { cn } from '~/shared'

interface CustomLinkProps {
	children: React.ReactNode
	currentLink: string
	styles?: string
}

export const CustomLink: FC<CustomLinkProps> = props => {
	const { children, currentLink, styles } = props

	return (
		<a
			href={currentLink}
			className={cn(
				'group relative px-1.5 text-sm/6 text-sky-400 text-center',
				'hover:text-sky-500 flex justify-center items-center',
				styles
			)}
		>
			<span
				className={cn(
					'absolute inset-0 border border-dashed border-sky-300/60 bg-sky-500/20 dark:border-sky-300/30',
					'group-hover:bg-sky-400/10 group-active:bg-sky-400/10 transition-all duration-150'
				)}
			></span>

			{children}

			<svg
				width='5'
				height='5'
				viewBox='0 0 5 5'
				className='absolute top-[-2px] left-[-2px] fill-sky-600 dark:fill-teal-400'
			>
				<path d='M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z'></path>
			</svg>

			<svg
				width='5'
				height='5'
				viewBox='0 0 5 5'
				className='absolute top-[-2px] right-[-2px] fill-sky-600 dark:fill-teal-400'
			>
				<path d='M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z'></path>
			</svg>

			<svg
				width='5'
				height='5'
				viewBox='0 0 5 5'
				className='absolute bottom-[-2px] left-[-2px] fill-sky-600 dark:fill-teal-400'
			>
				<path d='M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z'></path>
			</svg>

			<svg
				width='5'
				height='5'
				viewBox='0 0 5 5'
				className='absolute right-[-2px] bottom-[-2px] fill-sky-600 dark:fill-teal-400'
			>
				<path d='M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z'></path>
			</svg>
		</a>
	)
}

export const InsideSideLink: FC<CustomLinkProps> = props => {
	const { children, currentLink, styles } = props

	return (
		<Link
			className={cn(
				'group relative px-1.5 text-sm/6 text-sky-400 text-center',
				'hover:text-neutral-900 dark:hover:text-blue-500 flex justify-center items-center',
				styles
			)}
			to={currentLink}
		>
			<span
				className={cn(
					'absolute inset-0 border border-dashed border-sky-300/60 bg-sky-500/15 dark:border-sky-300/30',
					'group-hover:bg-sky-400/10 group-active:bg-sky-400/10 transition-all duration-150'
				)}
			></span>

			{children}

			<svg
				width='5'
				height='5'
				viewBox='0 0 5 5'
				className='absolute top-[-2px] left-[-2px] fill-sky-600 dark:fill-teal-400'
			>
				<path d='M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z'></path>
			</svg>

			<svg
				width='5'
				height='5'
				viewBox='0 0 5 5'
				className='absolute top-[-2px] right-[-2px] fill-sky-600 dark:fill-teal-400'
			>
				<path d='M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z'></path>
			</svg>

			<svg
				width='5'
				height='5'
				viewBox='0 0 5 5'
				className='absolute bottom-[-2px] left-[-2px] fill-sky-600 dark:fill-teal-400'
			>
				<path d='M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z'></path>
			</svg>

			<svg
				width='5'
				height='5'
				viewBox='0 0 5 5'
				className='absolute right-[-2px] bottom-[-2px] fill-sky-600 dark:fill-teal-400'
			>
				<path d='M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z'></path>
			</svg>
		</Link>
	)
}
