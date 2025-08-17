import type { FC } from 'react'

import { cn } from '~/shared'

interface ButtonProps {
	children: React.ReactNode
	onClick: () => void
	square: boolean /* форма кнопки квадрат? */
	styles?: string
	ariaLabelDesc?: string /* описание для скрин-ридеров */
}

export const Button: FC<ButtonProps> = props => {
	const { children, styles, onClick, square, ariaLabelDesc } = props

	return (
		<button
			aria-label={ariaLabelDesc}
			onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
				e.preventDefault()
				e.stopPropagation()
				onClick()
			}}
			className={cn(
				'font-mono transition-all duration-300 px-6 py-3 max-w-3xl flex items-center justify-center tracking-wider select-none',
				'active:translate-y-0.5 hover:translate-y-0.5',
				square
					? [
							'border border-neutral-950 rounded-lg bg-transparent text-neutral-950 dark:text-white dark:border-white',
							'hover:bg-neutral-950 hover:text-white dark:hover:bg-white dark:hover:text-neutral-950',
							'active:bg-neutral-950 active:text-white dark:active:bg-white dark:active:text-neutral-950',
					  ]
					: [
							'bg-sky-400 text-neutral-950 rounded-full',
							'hover:bg-sky-600 hover:opacity-95 active:bg-sky-700 active:opacity-95',
					  ],
				styles
			)}
		>
			{children}
		</button>
	)
}
