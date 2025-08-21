import type { FC } from 'react'

import type { SectionAnimationRefs } from '../lib/types'

import { useRef, useEffect } from 'react'
import { useUnit } from 'effector-react'

import { DASHED_BACKGROUND, cn } from '~/shared'
import { servicesList } from '../model/servicesList'
import { animateSection } from '../lib/animations'
import { ServiceCard } from './ServiceCard'

export const ServicesSection: FC = () => {
	const service = useUnit(servicesList.stores.$services)

	const animateRefs: SectionAnimationRefs = {
		sectionRef: useRef<HTMLDivElement>(null),
		titleRef: useRef<HTMLHeadingElement>(null),
		cardsRef: useRef<(HTMLDivElement | null)[]>([]),
	}

	useEffect(() => {
		/* SSR dodge */
		if (typeof window === 'undefined') return

		let cleanup: (() => void) | undefined

		animateSection(animateRefs)
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
			aria-labelledby='section-main-services'
			ref={animateRefs.sectionRef}
			className={cn(
				'relative m-5 py-18 px-4 sm:px-8 overflow-hidden rounded-lg min-h-[80dvh] flex flex-col justify-evenly items-center gap-12 border',
				DASHED_BACKGROUND
			)}
		>
			{/* Блики */}
			{[...Array(4)].map((_, index: number) => (
				<div
					key={index}
					className={cn(
						'absolute rounded-full opacity-80 pointer-events-none blur-lg animate-pulse',
						index % 2 === 0
							? 'bg-gradient-to-br from-blue-600 dark:from-purple-950 to-transparent w-100 h-100'
							: 'bg-gradient-to-l from-blue-700 dark:from-indigo-950 to-transparent w-80 h-80',
						index === 0 && 'top-1/4 left-10',
						index === 1 && 'bottom-1/4 right-20',
						index === 2 && 'top-1/3 right-1/4',
						index === 3 && 'bottom-1/3 left-1/4'
					)}
				/>
			))}

			{/* Заголовок */}
			<h2
				ref={animateRefs.titleRef}
				className={cn(
					'text-4xl max-w-6xl md:text-7xl text-center text-transparent',
					'bg-clip-text bg-gradient-to-bl from-neutral-950 to-sky-600 dark:from-sky-500 dark:to-slate-200'
				)}
			>
				{service.title}
			</h2>

			{/* Карточки */}
			<div className='container max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-12'>
				{service.services.map((service, index: number) => (
					<ServiceCard
						key={service.id}
						service={service}
						index={index}
						cardsRef={animateRefs.cardsRef}
					/>
				))}
			</div>
		</section>
	)
}
