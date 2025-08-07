import type { FC } from 'react'

import type { CaseItem } from '../model/types'

import { cn } from '~/shared'

interface CaseCardProps {
	caseCard: CaseItem
	index: number
	casesRef: React.RefObject<(HTMLDivElement | null)[]>
}

export const CaseCard: FC<CaseCardProps> = props => {
	const { caseCard, index, casesRef } = props
	const { id, title, description, tags, image, link } = caseCard

	return (
		<article
			aria-labelledby='card-cases'
			ref={(el: HTMLDivElement | null) => {
				if (el) casesRef.current[index] = el
			}}
			className={cn(
				'group relative rounded-lg overflow-hidden transition-all duration-200',
				'bg-white/50 dark:bg-neutral-800/60 backdrop-blur-2xl',
				'border border-neutral-700',
				'shadow-xl hover:shadow-2xl'
			)}
			onClick={() => {}}
		>
			{/* Изображение кейса */}
			<div className='relative h-70 overflow-hidden'>
				<img
					src={image}
					alt={title}
					className={cn(
						'w-full h-full object-cover object-center transition-transform duration-300',
						'group-hover:scale-115 group-active:scale-115'
					)}
				/>

				<div className='absolute inset-0 bg-gradient-to-t from-neutral-950/40 to-transparent' />
			</div>

			{/* Контент кейса */}
			<div className='p-6 flex flex-col items-start justify-center gap-4'>
				<h3 className='text-2xl text-neutral-950 dark:text-sky-600/90'>
					{title}
				</h3>

				<p className='text-neutral-800 dark:text-slate-200'>{description}</p>

				<div className='flex flex-wrap gap-3'>
					{tags.map((tag: string, index: number) => (
						<span
							key={tag}
							className={cn(
								'px-3 py-2 rounded-full text-xs font-mono text-neutral-950 dark:text-slate-200',
								index % 2
									? 'bg-sky-500 dark:bg-neutral-950/90'
									: 'bg-neutral-900/50 dark:bg-sky-600/80'
							)}
						>
							{tag}
						</span>
					))}
				</div>
			</div>

			{/* Эффект при наведении */}
			<div
				className={cn(
					'absolute inset-0 -z-10 opacity-0 transition-all duration-200',
					'group-hover:opacity-100 group-active:opacity-100'
				)}
			>
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,182,255,0.3)_0%,_transparent_70%)]' />
			</div>
		</article>
	)
}
