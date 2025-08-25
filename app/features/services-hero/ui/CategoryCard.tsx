import type { FC } from 'react'

import type { Category } from '../model/types'
import type { LucideIcon } from 'lucide-react'

import { cn } from '~/shared'

interface CategoryCardProps {
	cardRef: React.RefObject<(HTMLButtonElement | null)[]>
	paragraphsRef: React.RefObject<(HTMLParagraphElement | null)[]>
	category: Category<LucideIcon>
	index: number
	lastIndex: number
	clickFn: (category: Category<LucideIcon>) => void
}

export const CategoryCard: FC<CategoryCardProps> = props => {
	const { cardRef, paragraphsRef, category, index, lastIndex, clickFn } = props

	const { title, description } = category

	return (
		<button
			ref={(el: HTMLButtonElement | null) => {
				if (el) cardRef.current[index] = el
			}}
			key={title}
			aria-label={`Подробнее о ${title}`}
			onClick={() => clickFn(category)}
			className={cn(
				'group relative p-6 md:p-8 rounded-lg transition-all opacity-0',
				'border border-transparent',
				'bg-gradient-to-r from-gray-900/50 to-gray-800/60 backdrop-blur-xl',
				'hover:backdrop-blur-md hover:border-teal-400/60',
				'active:backdrop-blur-md active:border-teal-400/60',
				index === 0 || index === lastIndex ? 'lg:col-span-7' : 'lg:col-span-5',
				'flex flex-col items-end gap-4',
				'min-h-[200px] md:min-h-[290px]'
			)}
		>
			<div className='flex items-start gap-6 h-full min-h-fit'>
				<div className='relative'>
					<category.icon
						strokeWidth={1}
						size={65}
						className={cn(
							'text-sky-500 transition-colors duration-200 p-2',
							'group-hover:text-teal-400'
						)}
					/>

					<div
						className={cn(
							'absolute inset-0 rounded-lg bg-sky-400/5 transition-all -z-10',
							'group-hover:bg-sky-400/10 group-active:bg-sky-400/10'
						)}
					></div>
				</div>

				<div className='flex-1 text-left flex flex-col gap-3'>
					<h3
						className={cn(
							'text-2xl md:text-4xl font-thin',
							'text-transparent bg-clip-text bg-gradient-to-tr from-white to-teal-400'
						)}
					>
						{title}
					</h3>

					<p
						ref={(el: HTMLParagraphElement | null) => {
							if (el) paragraphsRef.current[index] = el
						}}
						className='text-white/90 text-sm md:text-lg leading-relaxed tracking-wider'
					>
						{description}
					</p>
				</div>
			</div>
		</button>
	)
}
