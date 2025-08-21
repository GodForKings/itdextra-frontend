import type { FC } from 'react'

import { useRef, useEffect } from 'react'
import { useUnit } from 'effector-react'
import { CircleArrowOutUpRight } from 'lucide-react'

import { animateSection } from '../lib/animations'
import { casesList } from '../model/caseList'
import { Button, cn, useCTAModal } from '~/shared'
import { CaseCard } from './CaseCard'

export const CaseSection: FC = () => {
	const cases = useUnit(casesList.stores.$cases)

	const handleCTAClick = useCTAModal()

	const animateRefs = {
		sectionRef: useRef<HTMLDivElement>(null),
		titleRef: useRef<HTMLHeadingElement>(null),
		subtitleRef: useRef<HTMLParagraphElement>(null),
		casesRef: useRef<(HTMLDivElement | null)[]>([]),
		buttonRef: useRef<HTMLDivElement>(null),
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
			ref={animateRefs.sectionRef}
			aria-labelledby='cases-section'
			className={cn(
				'relative m-5 py-18 px-4 md:px-8 overflow-hidden select-none',
				'bg-gradient-to-r from-white to-slate-100 dark:from-gray-950/[7.5%] dark:to-gray-700/10',
				'flex flex-col items-center justify-center gap-10',
				'rounded-lg border border-(--pattern-fg)'
			)}
		>
			{/* Декоративный элемент */}
			<div className='absolute top-10 left-10 w-[80%] h-[80%] pointer-events-none rounded-full bg-sky-500/20 dark:bg-blue-400/20 blur-3xl' />

			{/* Заголовок секции */}
			<div className='container max-w-6xl flex flex-col items-center justify-center gap-5'>
				<h2
					ref={animateRefs.titleRef}
					className={cn(
						'text-4xl md:text-6xl text-transparent opacity-0',
						'bg-clip-text bg-gradient-to-br from-neutral-950 to-sky-700 dark:from-sky-500 dark:to-white'
					)}
				>
					{cases.title}
				</h2>

				{/* Подзаголовок */}
				<p
					ref={animateRefs.subtitleRef}
					className={cn(
						'px-4 py-2 rounded-lg max-w-2xl opacity-0',
						'text-xl text-center text-black dark:text-white',
						'bg-white/80 dark:bg-black/20',
						'border border-dotted border-neutral-700'
					)}
				>
					{cases.subtitle}
				</p>
			</div>

			{/* Список кейсов */}
			<div className='container max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10'>
				{cases.items.map((caseItem, index: number) => (
					<CaseCard
						key={caseItem.id}
						caseCard={caseItem}
						index={index}
						casesRef={animateRefs.casesRef}
					/>
				))}
			</div>

			{/* Призыв к действию */}
			<div ref={animateRefs.buttonRef} className='relative opacity-0'>
				<Button
					square={true}
					onClick={handleCTAClick}
					styles='gap-2'
					ariaLabelDesc='Перейти к осуждению своего кейса'
				>
					Обсудить проект
					<CircleArrowOutUpRight size={22} strokeWidth={2} />
				</Button>
			</div>
		</section>
	)
}
