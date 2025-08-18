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

	const sectionRef = useRef<HTMLDivElement>(null)
	const titleRef = useRef<HTMLHeadingElement>(null)
	const subtitleRef = useRef<HTMLParagraphElement>(null)
	const casesRef = useRef<(HTMLDivElement | null)[]>([])
	const buttonRef = useRef<HTMLDivElement>(null)

	const handleCTAClick = useCTAModal()

	useEffect(() => {
		if (typeof window === 'undefined') return

		animateSection({
			sectionRef,
			titleRef,
			subtitleRef,
			casesRef,
			buttonRef,
		}).catch(console.error)
	}, [])

	return (
		<section
			ref={sectionRef}
			aria-labelledby='cases-section'
			className='relative m-5 rounded-lg border border-(--pattern-fg) py-18 px-4 sm:px-8 overflow-hidden bg-gradient-to-r from-white to-slate-100 dark:from-gray-950/[7.5%] dark:to-gray-700/10 flex flex-col items-center justify-center gap-10 select-none'
		>
			{/* Декоративный элемент */}
			<div className='absolute top-10 left-10 w-[80%] h-[80%] pointer-events-none rounded-full bg-sky-500/20 dark:bg-blue-400/20 blur-3xl' />

			{/* Заголовок секции */}
			<div className='container max-w-6xl flex flex-col items-center justify-center gap-5'>
				<h2
					ref={titleRef}
					className='text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-neutral-950 to-sky-700 dark:from-sky-500 dark:to-white'
				>
					{cases.title}
				</h2>

				<p
					ref={subtitleRef}
					className={cn(
						'text-xl text-sky-400 p-3 rounded-lg max-w-2xl',
						'bg-gradient-to-br from-gray-800/80 to-neutral-950/80 backdrop-blur-3xl'
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
						casesRef={casesRef}
					/>
				))}
			</div>

			{/* Призыв к действию */}
			<div ref={buttonRef} className='relative'>
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
