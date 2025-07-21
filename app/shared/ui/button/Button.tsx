import type { FC } from 'react'

import { cn } from '~/shared'

interface ButtonProps {
	children: React.ReactNode
	onClick: () => void
	styles?: string
	square: boolean /* форма кнопки квадрат? */
}

export const Button: FC<ButtonProps> = props => {
	const { children, styles, onClick, square } = props

	return (
		<button
			onClick={onClick}
			className={cn(
				'transition-all font-mono duration-300 px-6 py-3 max-w-3xl flex items-center justify-center tracking-wider',
				square
					? 'border border-neutral-950 rounded-lg bg-transparent hover:bg-neutral-950 text-neutral-950 hover:text-white dark:text-slate-200 dark:border-white dark:hover:bg-white dark:hover:text-neutral-950'
					: 'bg-sky-500 hover:bg-sky-700 hover:opacity-80 text-neutral-950 dark:text-slate-200 rounded-4xl',
				styles
			)}
		>
			{children}
		</button>
	)
}
