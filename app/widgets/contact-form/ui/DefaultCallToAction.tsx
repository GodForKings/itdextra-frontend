import type { FC } from 'react'

import { useRef, useEffect } from 'react'

import { cn } from '~/shared'
import { ContactForm } from './ContactForm'
import { BotMessageSquare } from 'lucide-react'
import { animateModal } from '../lib/animation'

export const DefaultCallToAction: FC = () => {
	const animateRefs = {
		sectionRef: useRef<HTMLDivElement | null>(null),
		titleRef: useRef<HTMLHeadingElement | null>(null),
		descriptionRef: useRef<HTMLParagraphElement | null>(null),
		formRef: useRef<HTMLFormElement | null>(null),
		iconRef: useRef<SVGSVGElement | null>(null),
	}

	useEffect(() => {
		/* SSR dodge */
		if (typeof window === 'undefined') return

		let cleanup: (() => void) | undefined

		animateModal(animateRefs)
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
		<div
			ref={animateRefs.sectionRef}
			className={cn(
				'flex flex-col gap-8 w-full p-4 lg:p-8 backdrop-blur-2xl rounded-lg',
				'border border-gray-100/10 shadow-2xl shadow-gray-50/10'
			)}
		>
			<div className='flex items-center gap-2 lg:gap-4'>
				<BotMessageSquare
					ref={animateRefs.iconRef}
					className='rounded-lg h-18 lg:h-24 w-18 lg:w-24 grow-0 border border-gray-100/10 p-2 shadow-2xl shadow-gray-50/10 text-white'
					strokeWidth={1.4}
				/>

				<h3
					ref={animateRefs.titleRef}
					className='text-2xl lg:text-4xl font-thin text-white tracking-wider flex-1 text-center'
				>
					Обсудим проект под ваши задачи?
				</h3>
			</div>

			<p
				ref={animateRefs.descriptionRef}
				className={cn(
					'text-xl text-sky-400 p-4',
					'shadow-2xl shadow-blue-500/15',
					'rounded-lg border border-gray-100/10',
					'hover:shadow-blue-500/30 active:shadow-blue-500/30'
				)}
			>
				Расскажите нам о вашем видении, и мы создадим уникальное решение,
				которое выведет ваш бизнес в лидеры цифровой эры.
			</p>

			<ContactForm formRef={animateRefs.formRef} subjectOfRequest='' />
		</div>
	)
}
