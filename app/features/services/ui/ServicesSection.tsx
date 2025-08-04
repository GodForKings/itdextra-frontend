import type { FC } from 'react'

import { useRef, useEffect } from 'react'
import { useUnit } from 'effector-react'
import { gsap } from 'gsap'
import { useNavigate } from 'react-router'

import { Button, DASHED_BACKGROUND, ROUTES_DATA, cn } from '~/shared'
import { servicesList } from '../model/servicesList'
import { animateSection } from '../lib/animations'

export const ServicesSection: FC = () => {
	const service = useUnit(servicesList.stores.$services)

	const sectionRef = useRef<HTMLDivElement>(null)
	const titleRef = useRef<HTMLHeadingElement>(null)
	const cardsRef = useRef<(HTMLDivElement | null)[]>([])

	const navigate = useNavigate()

	useEffect(() => {
		if (typeof window === 'undefined') return

		animateSection({
			sectionRef,
			titleRef,
			cardsRef,
		}).catch(console.error)
	}, [])

	// Обработчик интерактивных эффектов
	const handleCardInteraction = (index: number, isActive: boolean) => {
		const card = cardsRef.current[index]
		if (!card) return

		gsap.to(card, {
			boxShadow: isActive ? '0 20px 40px rgba(65, 130, 246, 0.2)' : 'none',
			duration: 0.25,
			ease: 'back.out',
		})
	}

	return (
		<section
			aria-labelledby='section-main-services'
			ref={sectionRef}
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
			<h2 ref={titleRef} className='text-4xl max-w-6xl md:text-7xl text-center'>
				<span className='text-transparent bg-clip-text bg-gradient-to-r from-neutral-950 to-sky-600 dark:from-sky-600 dark:to-slate-200'>
					{service.title}
				</span>
			</h2>

			{/* Карточки */}
			<div className='container max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-12'>
				{service.services.map((service, index: number) => (
					<div
						key={service.id}
						ref={(el: HTMLDivElement | null) => {
							if (el) cardsRef.current[index] = el
						}}
						className={cn(
							'relative p-8 rounded-lg backdrop-blur-lg flex flex-col items-start justify-center gap-5 font-mono',
							'bg-slate-100/30 dark:bg-neutral-900/10 border border-dashed border-transparent transition-all duration-200',
							'active:bg-transparent hover:bg-transparent',
							'active:border-sky-500 hover:border-sky-500'
						)}
						onMouseEnter={() => handleCardInteraction(index, true)}
						onMouseLeave={() => handleCardInteraction(index, false)}
						onFocus={() => handleCardInteraction(index, true)}
						onBlur={() => handleCardInteraction(index, false)}
						tabIndex={0}
					>
						{/* Иконка */}
						{service.icon}

						{/* Заголовок */}
						<h3 className='text-3xl text-neutral-950/80 dark:text-sky-400'>
							{service.title}
						</h3>

						{/* Описание */}
						<p className='text-sm tracking-wider text-sky-600 dark:text-white'>
							{service.description}
						</p>

						<Button
							onClick={() => {
								navigate(`${ROUTES_DATA.services.path}/${service.id}`)
							}}
							square={false}
							styles='mt-5'
						>
							Подробнее
						</Button>
					</div>
				))}
			</div>
		</section>
	)
}
