import type { FC } from 'react'
import type { FAQItem } from '../model/types'

import { useEffect, useRef } from 'react'
import { Minus, Plus } from 'lucide-react'

import { cn } from '~/shared'
import { animateFAQBlock } from '../lib/animations'

interface FAQBlockProps {
	index: number
	item: FAQItem
	openIndex: number | null
	toggleFn: (index: number) => void
	refs: React.RefObject<(HTMLElement | null)[]>
}

export const FAQBlock: FC<FAQBlockProps> = props => {
	const { index, item, openIndex, toggleFn, refs } = props

	const { question, answer } = item

	const animateRefs = {
		contentRef: useRef<HTMLDivElement>(null),
		iconRef: useRef<SVGSVGElement>(null),
	}
	const isOpen = openIndex === index

	useEffect(() => {
		/* SSR dodge */
		if (typeof window === 'undefined') return
		let cleanup: (() => void) | undefined

		animateFAQBlock(animateRefs, isOpen)
			.then(clear => {
				cleanup = clear
			})
			.catch(console.error)

		return () => {
			cleanup?.()
		}
	}, [isOpen])

	return (
		<article
			ref={(element: HTMLElement | null) => {
				if (element) refs.current[index] = element
			}}
			className={cn(
				'p-4 rounded-lg cursor-pointer transition-all duration-300',
				'bg-gradient-to-r from-gray-100/90 to-white/80',
				'dark:from-gray-900/80 dark:to-gray-800/80',
				'border border-black dark:border-sky-500/20'
			)}
			onClick={() => toggleFn(index)}
			aria-label={
				isOpen ? `Закрыть блок: ${question}` : `Посмотреть блок: ${question}`
			}
		>
			<div className='flex justify-between items-center py-1'>
				<h3
					className={cn(
						'text-lg lg:text-2xl font-thin',
						'text-sky-500 dark:text-white'
					)}
				>
					{question}
				</h3>

				{isOpen ? (
					<Minus ref={animateRefs.iconRef} className='w-5 h-5 text-sky-500' />
				) : (
					<Plus ref={animateRefs.iconRef} className='w-5 h-5 text-sky-500' />
				)}
			</div>

			<div
				ref={animateRefs.contentRef}
				className={cn(
					'overflow-hidden h-0',
					'text-black dark:text-sky-500',
					'text-sm lg:text-lg font-normal',
					'flex flex-col gap-1 justify-center',
					'border-t border-black dark:border-white/30'
				)}
			>
				{answer?.map(element => (
					<p key={element}>{element}</p>
				))}
			</div>
		</article>
	)
}
