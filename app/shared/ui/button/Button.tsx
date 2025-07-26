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
				'font-mono transition-all duration-300 px-6 py-3 max-w-3xl flex items-center justify-center tracking-wider',
				square
					? [
							'border border-neutral-950 rounded-lg bg-transparent text-neutral-950 dark:text-slate-200 dark:border-white',
							'hover:bg-neutral-950 hover:text-white dark:hover:bg-white dark:hover:text-neutral-950',
							'active:bg-neutral-950 active:text-white dark:active:bg-white dark:active:text-neutral-950',
					  ]
					: [
							'bg-sky-500 text-neutral-950 rounded-4xl dark:text-slate-200',
							'hover:bg-sky-700 hover:opacity-95 active:bg-sky-700 active:opacity-95',
					  ],
				styles
			)}
		>
			{children}
		</button>
	)
}
