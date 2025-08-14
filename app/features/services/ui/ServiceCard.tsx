import type { FC } from 'react'

import type { Service } from '../model/types'

import { gsap } from 'gsap'
import { SquareArrowOutUpRight } from 'lucide-react'
import { Button, cn } from '~/shared'
import { openModal } from '~/widgets'
import { ServiceModal } from './ServiceModal'

interface ServiceCardProps {
	service: Service
	index: number
	cardsRef: React.RefObject<(HTMLDivElement | null)[]>
}

export const ServiceCard: FC<ServiceCardProps> = props => {
	const { service, index, cardsRef } = props
	const { id, title, shortDescription, icon: Icon } = service

	/**
	 * Обработчик интерактивных эффектов
	 * @param index индекс элемента
	 * @param isActive
	 * @returns
	 */
	const handleCardInteraction = (index: number, isActive: boolean): void => {
		const card = cardsRef.current[index]
		if (card) {
			gsap.to(card, {
				boxShadow: isActive ? '0 16px 44px #001eff' : 'none',
				duration: 0.25,
				scale: isActive ? 1.04 : 1,
				ease: 'power4.inOut',
			})
		}
	}

	const handleModalOpen = (): void => {
		openModal({ content: <ServiceModal service={service} /> })
	}

	return (
		<article
			aria-labelledby={`service-card ${title}`}
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
			{Icon}

			{/* Заголовок */}
			<h3 className='text-xl lg:text-2xl text-neutral-950/80 dark:text-sky-400'>
				{title}
			</h3>

			{/* Описание */}
			<p className='text-sm tracking-wider text-sky-600 dark:text-white'>
				{shortDescription}
			</p>

			<Button onClick={handleModalOpen} square={false} styles='mt-5 gap-2'>
				Подробнее
				<SquareArrowOutUpRight size={20} strokeWidth={1.5} />
			</Button>
		</article>
	)
}
