import type { FC } from 'react'

import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { Terminal } from 'lucide-react'

import { Button, cn } from '~/shared'
import { openModal, closeModal } from '~/widgets/modal'
import { animateCTA } from '../lib/animations'

export const CTA: FC = () => {
	const navigate = useNavigate()

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
			content: (
				<div className='flex flex-col gap-6'>
					<h3 className='text-3xl text- text-sky-400'>
						Обсудим проект под ваши задачи
					</h3>

					<p className='text-base text-gray-200'>
						Расскажите нам о вашем видении, и мы создадим кастомное решение,
						которое выведет ваш бизнес в лидеры цифровой эры.
					</p>

					<form
						onSubmit={e => {
							e.preventDefault()
							closeModal()
							navigate('/')
						}}
						className='flex flex-col gap-4'
					>
						<div>
							<label
								htmlFor='name'
								className='text-sm font-sans text-gray-200/60 '
							>
								Пожалуйста, представьтесь
							</label>

							<input
								id='name'
								type='text'
								required
								className='w-full mt-1 p-3 bg-gray-900 text-gray-200 rounded-lg border border-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-400'
								placeholder='Как к вам можно обращаться?'
							/>
						</div>

						<div>
							<label
								htmlFor='email'
								className='text-sm font-sans text-gray-200/60'
							>
								Email
							</label>

							<input
								id='email'
								type='email'
								required
								className='w-full mt-1 p-3 bg-gray-900 text-gray-200 rounded-lg border border-sky-400/50 focus:outline-none focus:ring-2 focus:ring-sky-400'
								placeholder='Электронная почта'
							/>
						</div>

						<div>
							<label
								htmlFor='message'
								className='text-sm font-sans text-gray-200/60'
							>
								О вашем проекте
							</label>

							<textarea
								id='message'
								required
								className='w-full mt-1 p-3 bg-gray-900 text-gray-200 rounded-lg border border-sky-400/50 focus:outline-none focus:ring-2 focus:ring-sky-400'
								placeholder='Расскажите, что вы хотите создать'
								rows={4}
							/>
						</div>

						<button
							type='submit'
							className='w-full py-3 px-6 bg-sky-400 text-gray-950 font-sans font-bold rounded-lg hover:bg-sky-400 transition-all duration-300 shadow-lg hover:shadow-sky-400/50'
							aria-label='Отправить заявку'
						>
							Отправить
						</button>
					</form>
				</div>
			),
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
				>
					<Terminal strokeWidth={1.5} size={20} className='text-sky-400' />
					/Забронировать
				</Button>
			</div>
		</section>
	)
}
