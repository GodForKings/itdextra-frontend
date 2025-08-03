import { useRef, type FC, useEffect } from 'react'

import { useUnit } from 'effector-react'
import { useNavigate } from 'react-router'

import type { AnimateCategoryRefs } from '../lib/types'

import { ServicesListModel } from '../model/index'
import { ROUTES_DATA, cn } from '~/shared'
import { animateCategory } from '../lib/animations'

export const Categories: FC = () => {
	const categories = useUnit(ServicesListModel.stores.$categories)
	const navigate = useNavigate()

	const handleCTAClick = () => {
		navigate(ROUTES_DATA.contacts.path)
	}

	const animateRefs: AnimateCategoryRefs = {
		section: useRef<HTMLDivElement | null>(null),
		title: useRef<HTMLHeadingElement | null>(null),
		card: useRef<(HTMLButtonElement | null)[]>([]),
		paragraphs: useRef<(HTMLParagraphElement | null)[]>([]),
	}

	useEffect(() => {
		if (typeof window === 'undefined') return

		animateCategory(animateRefs).catch(console.error)
	}, [])

	return (
		<section
			ref={animateRefs.section}
			className='relative py-18 container overflow-hidden'
			aria-labelledby='section-categories-services'
		>
			<div className='flex flex-col items-end justify-center gap-10'>
				{/* Заголовок */}
				<h2
					ref={animateRefs.title}
					className={cn(
						'text-4xl md:text-6xl font-thin',
						'text-transparent bg-clip-text bg-gradient-to-l from-sky-600 to-teal-500',
						'backdrop-blur-xl p-5 rounded-lg'
					)}
				>
					Ключевые направления
				</h2>

				{/* Сетка категорий */}
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-4 w-full'>
					{categories?.map((category, index: number) => (
						<button
							ref={(el: HTMLButtonElement | null) => {
								if (el) animateRefs.card.current[index] = el
							}}
							key={category.title}
							onClick={handleCTAClick}
							className={cn(
								'group relative p-6 md:p-8 rounded-lg transition-all',
								'border border-transparent',
								'bg-gradient-to-br from-neutral-950/70 to-neutral-950/30 backdrop-blur-md',
								'hover:backdrop-blur-md hover:border-teal-500/40',
								'active:backdrop-blur-md active:border-teal-500/40',
								index === 0 ? 'md:col-span-7' : 'md:col-span-5',
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
											'text-sky-600 transition-colors duration-200 p-2',
											'group-hover:text-teal-600'
										)}
									/>

									<div
										className={cn(
											'absolute inset-0 rounded-lg bg-sky-400/10 transition-all -z-10',
											'group-hover:bg-sky-400/20 group-active:bg-sky-400/20'
										)}
									></div>
								</div>

								<div className='flex-1 text-left flex flex-col gap-3'>
									<h3
										className={cn(
											'text-xl md:text-4xl font-thin',
											'text-transparent bg-clip-text bg-gradient-to-l from-sky-600 to-teal-500'
										)}
									>
										{category.title}
									</h3>

									<p
										ref={(el: HTMLParagraphElement | null) => {
											if (el) animateRefs.paragraphs.current[index] = el
										}}
										className='text-gray-300/70 text-sm md:text-lg leading-relaxed'
									>
										{category.description}
									</p>
								</div>
							</div>
						</button>
					))}
				</div>
			</div>
		</section>
	)
}
