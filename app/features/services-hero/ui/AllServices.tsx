import type { FC } from 'react'
import type { LucideIcon } from 'lucide-react'

import type { Service } from '../model/types'
import type { AnimateCardRefs, AnimateServicesRefs } from '../lib/types'

import { useEffect, useRef, useState } from 'react'
import { useUnit } from 'effector-react'

import { cn, MAIN_TAGS } from '~/shared'
import { ServicesListModel } from '../model/index'

import { ServiceCard } from './ServiceCard'
import { ServiceModalContent } from './ServiceModalContent'
import { animateCardsForServices, animateServices } from '../lib/animations'
import { openModal } from '~/widgets'

export const AllServices: FC = () => {
	const services = useUnit(ServicesListModel.stores.$services)

	const [selectedTag, setSelectedTag] = useState<string | null>(null)

	/* Фильтрованные услуги */
	const filteredServices = selectedTag
		? services?.filter(service => service.tags.includes(selectedTag))
		: services

	/**
	 * Вызов модального окна для отдельной услуги
	 * @param service передаем сервис
	 */
	const handleCTAClick = (service: Service<LucideIcon>): void => {
		openModal({ content: <ServiceModalContent service={service} /> })
	}

	const animateRefs: AnimateServicesRefs = {
		section: useRef<HTMLDivElement | null>(null),
		title: useRef<HTMLHeadingElement | null>(null),
		tagBlock: useRef<HTMLDivElement | null>(null),
		tags: useRef<(HTMLButtonElement | null)[]>([]),
		serviceWell: useRef<HTMLDivElement | null>(null),
	}

	const cardsRefs: AnimateCardRefs = {
		cards: useRef<(HTMLElement | null)[]>([]),
	}
	// Для верхнего UI
	useEffect(() => {
		/* SSR dodge */
		if (typeof window === 'undefined') return

		let cleanup: (() => void) | undefined

		animateServices(animateRefs)
			.then(cleanupFn => {
				cleanup = cleanupFn
			})
			.catch(console.error)
		/* Очистка */
		return () => {
			cleanup?.()
		}
	}, [])

	// Для карточек
	useEffect(() => {
		/* SSR dodge */
		if (typeof window === 'undefined') return

		let cleanup: (() => void) | undefined

		animateCardsForServices(cardsRefs)
			.then(cleanupFn => {
				cleanup = cleanupFn
			})
			.catch(console.error)
		/* Очистка */
		return () => {
			cleanup?.()
		}
	}, [selectedTag, filteredServices?.length])

	return (
		<section
			ref={animateRefs.section}
			className={cn(
				'relative py-14 container overflow-hidden min-h-[100dvh]',
				'flex flex-col gap-10'
			)}
			aria-labelledby='services-heading'
		>
			{/* Заголовок */}
			<h2
				ref={animateRefs.title}
				id='services-heading'
				className={cn(
					'text-5xl md:text-7xl text-center font-light text-teal-300',
					'bg-gradient-to-r from-gray-900/40 to-gray-800/50 backdrop-blur-xl',
					'rounded-lg border-y-2 border-teal-400',
					'w-full p-6 opacity-0'
				)}
			>
				Наши услуги
			</h2>

			{/* Фильтры по тегам */}
			<div
				ref={animateRefs.tagBlock}
				className={cn(
					'flex justify-evenly items-center flex-wrap gap-4 p-5 w-full opacity-0',
					'border-2 border-teal-400 rounded-lg',
					'bg-gradient-to-r from-gray-900/50 to-gray-800/60 backdrop-blur-xl'
				)}
			>
				<button
					className={cn(
						'text-sm text-teal-300 bg-teal-900/30 px-4 py-2 rounded-full',
						!selectedTag && 'bg-teal-500 text-gray-900'
					)}
					onClick={() => setSelectedTag(null)}
					aria-label='показать все услуги'
				>
					Все
				</button>

				{MAIN_TAGS.map((tag: string, index: number) => (
					<button
						ref={(el: HTMLButtonElement | null) => {
							if (el) animateRefs.tags.current[index] = el
						}}
						key={tag}
						className={cn(
							'text-sm text-teal-300 bg-teal-900/25 px-4 py-2 rounded-full',
							selectedTag === tag && 'bg-teal-500 text-gray-900',
							'transition-all duration-300 ease-in-out',
							'hover:bg-teal-500 hover:text-gray-900',
							'active:bg-teal-500 active:text-gray-900'
						)}
						onClick={() => setSelectedTag(tag)}
						aria-label={`Показать услуги типа ${tag} подробнее`}
					>
						{tag}
					</button>
				))}
			</div>

			{/* Список услуг */}
			{filteredServices?.length ? (
				<div
					className={cn(
						'relative h-[80dvh] p-5 rounded-lg overflow-x-hidden overflow-y-auto',
						'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
						'[transform-style:preserve-3d] [perspective:500px] will-change-transform'
					)}
				>
					{filteredServices.map((service, index: number) => (
						<ServiceCard
							cardRefs={cardsRefs.cards}
							key={service.id}
							service={service}
							index={index}
							handleCTAClick={handleCTAClick}
						/>
					))}

					<div
						ref={animateRefs.serviceWell}
						className={cn(
							'absolute inset-0 z-5 w-full h-[150dvh]',
							'bg-black blur-lg'
						)}
					></div>
				</div>
			) : (
				<p className='rounded-lg text-center text-teal-300 backdrop-blur-3xl p-10 font-mono text-2xl'>
					Услуги временно недоступны
				</p>
			)}
		</section>
	)
}
