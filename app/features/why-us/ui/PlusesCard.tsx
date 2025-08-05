import type { FC } from 'react'

import type { Pluses } from '../model/types'

import { DASHED_BACKGROUND, cn } from '~/shared'

interface PlusesCardProps {
	card: Pluses
	index: number
	plusesRef: React.RefObject<(HTMLButtonElement | null)[]>
	handleAboutClick: () => void
}

export const PlusesCard: FC<PlusesCardProps> = props => {
	const { card, index, plusesRef, handleAboutClick } = props
	const { title, description, tech } = card

	return (
		<button
			ref={(el: HTMLButtonElement | null) => {
				if (el) plusesRef.current[index] = el
			}}
			className={cn(
				'font-mono backdrop-blur-sm border border-neutral-950/90 dark:border-sky-600/90 rounded-lg p-6 transition-all duration-200 group flex flex-col items-start justify-center gap-3',
				'hover:border-sky-500/60 dark:hover:border-slate-100 active:border-sky-500/60 dark:active:border-slate-100'
			)}
			onClick={handleAboutClick}
		>
			<h3 className='text-xl text-sky-500'>{title}</h3>

			<p className='text-neutral-950 dark:text-neutral-50 text-left font-normal text-base'>
				{description}
			</p>

			{/* Теги */}
			<div className='flex flex-wrap gap-4'>
				{tech.map((tech: string) => (
					<span
						key={tech}
						className={cn(
							DASHED_BACKGROUND,
							'border px-3 py-1 rounded-full font-semibold text-sm text-sky-500 border-neutral-950/60 dark:border-sky-400'
						)}
					>
						{tech}
					</span>
				))}
			</div>
		</button>
	)
}
