import type { FC } from 'react'

import type { Services } from '../model/types'

import { gsap } from 'gsap'
import { Button, cn } from '~/shared'

interface ServiceCardProps {
	service: Services
	index: number
	cardsRef: React.RefObject<(HTMLDivElement | null)[]>
	handleServiceClick: (id: string) => void
}

export const ServiceCard: FC<ServiceCardProps> = props => {
	const { service, index, cardsRef, handleServiceClick } = props
	const { id, title, description, icon: Icon } = service

	/**
	 * Обработчик интерактивных эффектов
	 * @param index
	 * @param isActive
	 * @returns
	 */
	const handleCardInteraction = (index: number, isActive: boolean) => {
		const card = cardsRef.current[index]
		if (card) {
			gsap.to(card, {
				boxShadow: isActive ? '0 20px 40px rgba(65, 130, 246, 0.2)' : 'none',
				duration: 0.25,
				scale: isActive ? 1.05 : 1,
				ease: 'power4.inOut',
			})
		}
	}

	return (
		<article
			aria-labelledby='service-card'
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
				{title}
			</h3>

			{/* Описание */}
			<p className='text-sm tracking-wider text-sky-600 dark:text-white'>
				{description}
			</p>

			<Button
				onClick={() => handleServiceClick(id)}
				square={false}
				styles='mt-5'
			>
				Подробнее
			</Button>
		</article>
	)
}
