import { useRef, useEffect } from 'react'
import { useUnit } from 'effector-react'

import type { FC } from 'react'
import type { AnimateCategoryRefs } from '../lib/types'
import type { Category } from '../model/types'
import type { LucideIcon } from 'lucide-react'

import { animateCategory } from '../lib/animations'
import { CategoryModalContent } from './CategoryModalContent'
import { CategoryCard } from './CategoryCard'
import { ServicesListModel } from '../model/index'
import { openModal } from '~/widgets/modal'
import { cn } from '~/shared'

export const Categories: FC = () => {
	const categories = useUnit(ServicesListModel.stores.$categories)

	const handleCTAClick = (category: Category<LucideIcon>) => {
		openModal({ content: <CategoryModalContent category={category} /> })
	}

	const animateRefs: AnimateCategoryRefs = {
		section: useRef<HTMLDivElement | null>(null),
		title: useRef<HTMLHeadingElement | null>(null),
		card: useRef<(HTMLButtonElement | null)[]>([]),
		paragraphs: useRef<(HTMLParagraphElement | null)[]>([]),
	}

	useEffect(() => {
		/* SSR dodge */
		if (typeof window === 'undefined') return

		let cleanup: (() => void) | undefined

		animateCategory(animateRefs)
			.then(cleanupFn => {
				cleanup = cleanupFn
			})
			.catch(console.error)
		/* Очистка */
		return () => {
			cleanup?.()
		}
	}, [])

	return (
		<section
			ref={animateRefs.section}
			className='relative py-10 lg:py-16 container overflow-hidden min-h-[100dvh]'
			aria-labelledby='section-categories-services'
		>
			<div className='flex flex-col items-end justify-center gap-10'>
				{/* Заголовок */}
				<h2
					ref={animateRefs.title}
					className={cn(
						'text-4xl md:text-6xl font-thin opacity-0',
						'text-transparent bg-clip-text bg-gradient-to-tr from-white to-teal-400',
						'backdrop-blur-xl py-6 px-16 rounded-lg'
					)}
				>
					Основные направления
				</h2>

				{/* Сетка категорий */}
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-4 w-full'>
					{categories?.map((category, index: number) => (
						<CategoryCard
							key={category.title}
							lastIndex={categories.length - 1}
							cardRef={animateRefs.card}
							paragraphsRef={animateRefs.paragraphs}
							index={index}
							category={category}
							clickFn={handleCTAClick}
						/>
					))}
				</div>
			</div>
		</section>
	)
}
