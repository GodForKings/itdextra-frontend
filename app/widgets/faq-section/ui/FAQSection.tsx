import type { FC } from 'react'

import type { FAQItem } from '../model/types'
import type { AnimateFAQSectionRefs } from '../lib/types'

import { useEffect, useRef, useState } from 'react'

import { cn } from '~/shared'
import { FAQBlock } from './FAQBlock'
import { animateFAQSection } from '../lib/animations'

interface FAQSectionProps {
	faqItems: FAQItem[]
	styleForSection?: string // для кастомизации секции
}

export const FAQSection: FC<FAQSectionProps> = props => {
	const { faqItems, styleForSection } = props

	const [openIndex, setOpenIndex] = useState<number | null>(null)

	const toggleItem = (index: number): void => {
		setOpenIndex(openIndex === index ? null : index)
	}

	const animateRefs: AnimateFAQSectionRefs = {
		section: useRef<HTMLDivElement>(null),
		title: useRef<HTMLSpanElement>(null),
		cardsAnswerRefs: useRef<(HTMLElement | null)[]>([]),
	}

	useEffect(() => {
		/* SSR dodge */
		if (typeof window === 'undefined') return
		let cleanup: (() => void) | undefined

		animateFAQSection(animateRefs)
			.then(clear => {
				cleanup = clear
			})
			.catch(console.error)
		return () => {
			cleanup?.()
		}
	}, [])

	return (
		<section
			className={cn(
				'w-full min-h-fit rounded-lg p-4 lg:p-8',
				'flex flex-col items-center justify-evenly gap-10',
				'relative backdrop-blur-lg',
				styleForSection
			)}
			ref={animateRefs.section}
		>
			<h2
				className={cn(
					'font-thin text-4xl lg:text-8xl tracking-tight w-full',
					'flex items-center',
					'[perspective:600px] [perspective-origin:50%_50%] [transform-style:preserve-3d]'
				)}
			>
				<span
					className='text-black dark:text-white text-right w-full'
					ref={animateRefs.title}
				>
					Ответы на частые вопросы
				</span>
			</h2>

			<div className='flex flex-col gap-4 lg:gap-8 w-full'>
				{faqItems.map((item: FAQItem, index: number) => (
					<FAQBlock
						key={item.question}
						index={index}
						openIndex={openIndex}
						item={item}
						toggleFn={toggleItem}
						refs={animateRefs.cardsAnswerRefs}
					/>
				))}
			</div>
		</section>
	)
}
