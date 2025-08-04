import type { FC } from 'react'

import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { gsap } from 'gsap'
import { X } from 'lucide-react'

import { cn } from '~/shared'

export const CTA: FC = () => {
	const navigate = useNavigate()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const ctaRef = useRef<HTMLElement | null>(null)
	const titleRef = useRef<HTMLHeadingElement | null>(null)
	const textRef = useRef<HTMLElement | null>(null)
	const buttonRef = useRef<HTMLButtonElement | null>(null)
	const modalRef = useRef<HTMLDivElement | null>(null)
	const modalContentRef = useRef<HTMLDivElement | null>(null)
	const firstFocusableRef = useRef<HTMLInputElement | null>(null)

	// GSAP-анимации для CTA
	useEffect(() => {
		const ctx = gsap.context(() => {
			// Анимация заголовка с неоновым glow-эффектом
			if (titleRef.current) {
				gsap.fromTo(
					titleRef.current,
					{ opacity: 0, y: 50, textShadow: '0 0 0px rgba(45, 212, 191, 0)' },
					{
						opacity: 1,
						y: 0,
						textShadow: '0 0 20px rgba(45, 212, 191, 0.7)',
						duration: 1,
						ease: 'power3.out',
					}
				)
			}

			// Анимация текста
			if (textRef.current) {
				gsap.fromTo(
					textRef.current,
					{ opacity: 0, x: -50 },
					{
						opacity: 1,
						x: 0,
						duration: 1,
						delay: 0.2,
						ease: 'power3.out',
					}
				)
			}

			// Анимация кнопки с неоновым pulse-эффектом
			if (buttonRef.current) {
				gsap.fromTo(
					buttonRef.current,
					{
						opacity: 0,
						scale: 0.8,
						boxShadow: '0 0 0px rgba(45, 212, 191, 0)',
					},
					{
						opacity: 1,
						scale: 1,
						boxShadow: '0 0 20px rgba(45, 212, 191, 0.5)',
						duration: 0.8,
						delay: 0.4,
						ease: 'back.out(1.7)',
					}
				)
			}
		})

		return () => ctx.revert() // Очистка анимаций
	}, [])

	// Анимации для модального окна
	useEffect(() => {
		if (!isModalOpen || !modalRef.current || !modalContentRef.current) return

		const ctx = gsap.context(() => {
			// Анимация фона
			gsap.fromTo(
				modalRef.current,
				{ opacity: 0 },
				{ opacity: 1, duration: 0.3, ease: 'power2.out' }
			)

			gsap.fromTo(
				modalContentRef.current,
				{ opacity: 0, scale: 0.95, boxShadow: '0 0 0px rgba(45, 212, 191, 0)' },
				{
					opacity: 1,
					scale: 1,
					boxShadow: '0 0 20px rgba(45, 212, 191, 0.5)',
					duration: 0.4,
					ease: 'power3.out',
					delay: 0.1,
				}
			)
		})

		// Фокус на первом элементе
		firstFocusableRef.current?.focus()

		return () => ctx.revert()
	}, [isModalOpen])

	const handleCTAClick = () => {
		setIsModalOpen(true)
	}

	const handleModalClose = () => {
		setIsModalOpen(false)
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsModalOpen(false)
		navigate('/')
	}

	return (
		<>
			<section
				ref={ctaRef}
				className='relative container py-12 px-10 flex items-center justify-start min-h-[60dvh] w-full bg-gray-950/60 backdrop-blur-lg rounded-lg overflow-hidden'
				aria-labelledby='cta-heading'
			>
				{/* Контент */}
				<div className='max-w-lg dark:bg-gray-950/90 backdrop-blur-xl p-10 rounded-lg shadow-2xl shadow-teal-400/30 border border-blue-400/90'>
					<h2
						ref={titleRef}
						id='cta-heading'
						className='text-4xl sm:text-6xl font-thin text-blue-400 mb-6 tracking-tight'
					>
						<span className='text-white flex'>root@itdextra:~#</span>./У Вас
						кейс?
					</h2>

					<p
						ref={el => {
							if (el) textRef
						}}
						className='text-lg font-sans text-gray-200 mb-8 leading-relaxed'
					>
						Не нашли подходящее решение? Мы создадим кастомный продукт, который
						выведет ваш бренд в лидеры цифровой эры. Наши решения увеличивают
						ROI до 30% и созданы для лидеров fintech, ритейла и стартапов.
						Забронируйте консультацию — слоты ограничены!
					</p>

					<button
						ref={buttonRef}
						onClick={handleCTAClick}
						className='w-full py-4 px-8 bg-blue-400 text-gray-950 rounded-full transition-all duration-300'
						aria-label='Получить индивидуальную консультацию'
						tabIndex={0}
						onKeyDown={e => e.key === 'Enter' && handleCTAClick()}
					>
						Запустить проект
					</button>
				</div>
			</section>

			{/* Кастомное модальное окно */}
			{isModalOpen && (
				<div
					ref={modalRef}
					className='fixed inset-0 bg-gray-950/80 backdrop-blur-3xl z-50 flex items-center justify-center p-4'
					aria-modal='true'
					role='dialog'
					aria-labelledby='modal-title'
				>
					<div
						ref={modalContentRef}
						className='w-full max-w-md bg-gray-950/90 backdrop-blur-xl p-8 rounded-xl shadow-2xl shadow-teal-400/30 border border-teal-400/50'
					>
						<h3
							id='modal-title'
							className='text-2xl font-sans text-teal-300 mb-6'
						>
							Ваш проект — наша страсть
						</h3>
						<button
							onClick={handleModalClose}
							className='absolute top-4 right-4 text-teal-400 hover:text-teal-300'
							aria-label='Закрыть модальное окно'
							tabIndex={0}
						>
							<X size={24} />
						</button>
						<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
							<div>
								<label
									htmlFor='name'
									className='text-sm font-sans text-gray-200'
								>
									Имя
								</label>
								<input
									ref={firstFocusableRef}
									id='name'
									type='text'
									required
									className='w-full mt-1 p-3 bg-gray-900 text-gray-200 rounded-lg border border-teal-400/50 focus:outline-none focus:ring-2 focus:ring-teal-400'
									placeholder='Ваше имя'
								/>
							</div>
							<div>
								<label
									htmlFor='email'
									className='text-sm font-sans text-gray-200'
								>
									Email
								</label>
								<input
									id='email'
									type='email'
									required
									className='w-full mt-1 p-3 bg-gray-900 text-gray-200 rounded-lg border border-teal-400/50 focus:outline-none focus:ring-2 focus:ring-teal-400'
									placeholder='Ваш email'
								/>
							</div>
							<div>
								<label
									htmlFor='message'
									className='text-sm font-sans text-gray-200'
								>
									О вашем проекте
								</label>
								<textarea
									id='message'
									required
									className='w-full mt-1 p-3 bg-gray-900 text-gray-200 rounded-lg border border-teal-400/50 focus:outline-none focus:ring-2 focus:ring-teal-400'
									placeholder='Расскажите, что вы хотите создать'
									rows={4}
								/>
							</div>

							<button
								type='submit'
								className='w-full py-3 px-6 bg-teal-500 text-gray-950 rounded-full hover:bg-teal-400 transition-all duration-300 shadow-lg hover:shadow-teal-400/50'
								aria-label='Отправить заявку'
								tabIndex={0}
							>
								Отправить
							</button>
						</form>
					</div>
				</div>
			)}
		</>
	)
}
