import type { FC } from 'react'

import { useEffect, useRef } from 'react'
import { Terminal } from 'lucide-react'

import { Button, cn } from '~/shared'
import { openModal, DefaultCallToAction } from '~/widgets'
import { animateCTA } from '../lib/animations'

export const CTA: FC = () => {
	const animateRefs = {
		section: useRef<HTMLDivElement | null>(null),
		contentRef: useRef<HTMLDivElement | null>(null),
		titleRef: useRef<HTMLHeadingElement | null>(null),
		textRef: useRef<HTMLParagraphElement | null>(null),
	}

	useEffect(() => {
		/* Для работы только на клиенте */
		if (typeof window === 'undefined') return

		animateCTA(animateRefs).catch(console.error)
	}, [])

	const handleCTAClick = () => {
		openModal({
			content: <DefaultCallToAction />,
		})
	}

	return (
		<section
			ref={animateRefs.section}
			className={cn(
				'relative container py-8 lg:py-12 px-4 lg:px-8 min-h-[50dvh] bg-gray-950/60 backdrop-blur-md',
				'rounded-lg overflow-hidden font-thin'
			)}
			aria-labelledby='cta-heading'
			role='region'
		>
			<div
				ref={animateRefs.contentRef}
				className={cn(
					'bg-slate-50 dark:bg-gray-950/50 backdrop-blur-xl p-10 lg:w-3/4',
					'border border-transparent dark:border-sky-500/70 rounded-lg',
					'flex flex-col items-end gap-4 lg:gap-8'
				)}
			>
				<h2
					ref={animateRefs.titleRef}
					id='cta-heading'
					className={cn(
						'text-2xl md:text-4xl tracking-wide flex items-center justify-between w-full'
					)}
				>
					Превращаем цифровые амбиции в измеримый рост
				</h2>

				<p ref={animateRefs.textRef} className='text-lg'>
					<span className='text-sky-500 font-mono text-xl'>
						Ваш бизнес требует особого решения?{' '}
					</span>
					Мы не используем шаблоны. Заполните короткий бриф - и в течении суток
					получите персональную концепцию digital-продукта под ваши цели.
				</p>

				<Button
					onClick={handleCTAClick}
					square={true}
					styles='w-fit gap-2 text-sky-600 border-sky-600'
					ariaLabelDesc='Перейти к осуждению своего кейса'
				>
					<Terminal strokeWidth={1.5} size={20} className='text-sky-400' />
					/Забронировать
				</Button>
			</div>
		</section>
	)
}
