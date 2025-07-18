import { useRef, useEffect } from 'react'
import { useUnit } from 'effector-react'
import { gsap } from 'gsap'
import { useNavigate } from 'react-router'

import { Button, DASHED_BACKGROUND, ROUTES_DATA, cn } from '~/shared'
import { servicesList } from '../model/servicesList'
import { animateSection } from '../lib/animations'

export const ServicesSection = () => {
	const service = useUnit(servicesList.stores.$services)

	const sectionRef = useRef<HTMLDivElement>(null)
	const titleRef = useRef<HTMLHeadingElement>(null)
	const cardsRef = useRef<(HTMLDivElement | null)[]>([])
	const glowsRef = useRef<(HTMLDivElement | null)[]>([])

	const navigate = useNavigate()

	useEffect(() => {
		if (typeof window === 'undefined') return

		animateSection({
			sectionRef,
			titleRef,
			cardsRef,
			glowsRef,
		}).catch(console.error)
	}, [])

	// Обработчик интерактивных эффектов
	const handleCardInteraction = (index: number, isActive: boolean) => {
		const card = cardsRef.current[index]
		if (!card) return

		gsap.to(card, {
			scale: isActive ? 1.05 : 1,
			boxShadow: isActive ? '0 20px 40px rgba(59, 130, 246, 0.2)' : 'none',
			duration: 0.25,
			ease: 'back.out',
		})
	}

	return (
		<section
			ref={sectionRef}
			className={cn(
				'relative m-5 py-18 px-4 sm:px-8 overflow-hidden rounded-lg min-h-[80dvh] flex flex-col justify-evenly items-center gap-12',
				DASHED_BACKGROUND
			)}
		>
			{/* Блики */}
			{[...Array(4)].map((_, i) => (
				<div
					key={i}
					ref={(el: HTMLDivElement | null) => {
						if (el) glowsRef.current[i] = el
					}}
					className={cn(
						'absolute rounded-full opacity-80 pointer-events-none blur-lg',
						i % 2 === 0
							? 'bg-gradient-to-br from-sky-600/30 to-transparent w-100 h-100'
							: 'bg-gradient-to-l from-sky-800/30 to-transparent w-80 h-80',
						i === 0 && 'top-1/4 left-10',
						i === 1 && 'bottom-1/4 right-20',
						i === 2 && 'top-1/3 right-1/4',
						i === 3 && 'bottom-1/3 left-1/4'
					)}
				/>
			))}

			{/* Заголовок */}
			<h2 ref={titleRef} className='text-5xl max-w-6xl md:text-7xl text-center'>
				<span className='text-transparent bg-clip-text bg-gradient-to-r from-neutral-950 to-sky-600 dark:from-sky-600 dark:to-slate-200'>
					{service.title}
				</span>
			</h2>

			{/* Карточки */}
			<div className='container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-12'>
				{service.services.map((service, index) => (
					<div
						key={service.id}
						ref={(el: HTMLDivElement | null) => {
							if (el) cardsRef.current[index] = el
						}}
						className={cn(
							'relative p-8 rounded-lg backdrop-blur-lg flex flex-col items-start justify-center gap-4 font-mono',
							'bg-white/5 border border-sky-400/80 dark:border-white/10',
							'transition-all duration-300 opacity-100',
							'hover:border-cyan-400/30 hover:bg-white/10',
							'focus:outline-none focus:ring-2 focus:ring-blue-600/50'
						)}
						onMouseEnter={() => handleCardInteraction(index, true)}
						onMouseLeave={() => handleCardInteraction(index, false)}
						onFocus={() => handleCardInteraction(index, true)}
						onBlur={() => handleCardInteraction(index, false)}
						tabIndex={0}
					>
						{/* Иконка */}
						<div className='text-6xl hover:animate-float'>{service.icon}</div>

						{/* Заголовок */}
						<h3 className='text-3xl text-neutral-950/80 dark:text-white/80'>
							{service.title}
						</h3>

						{/* Описание */}
						<p className='text-sm text-sky-500'>{service.description}</p>

						<Button
							onClick={() => {
								navigate(`${ROUTES_DATA.services.path}/${service.id}`)
							}}
							square={false}
							styles='mt-5'
						>
							Подробнее
						</Button>

						{/* Скрытый эффект */}
						<div className='absolute inset-0 -z-10 opacity-0 hover:opacity-100 transition-opacity'>
							<div className='absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0)_0%,_rgba(165,243,252,0.1)_100%)]' />
						</div>
					</div>
				))}
			</div>
		</section>
	)
}
