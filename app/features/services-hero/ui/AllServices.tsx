import type { FC } from 'react'

import { useEffect, useRef, useState } from 'react'
import { useUnit } from 'effector-react'
import { useNavigate } from 'react-router'

import { cn, MAIN_TAGS } from '~/shared'
import { ServicesListModel } from '../model/index'

import { ServiceCard } from './ServiceCard'
import { ServiceModalContent } from './ServiceModalContent'
import { animateServices } from '../lib/animations'
import { openModal } from '~/widgets'
import type { Service } from '../model/types'
import type { LucideIcon } from 'lucide-react'

export const AllServices: FC = () => {
	const services = useUnit(ServicesListModel.stores.$services)
	const navigate = useNavigate()

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

	const animateRefs = {
		section: useRef<HTMLDivElement | null>(null),
		title: useRef<HTMLHeadingElement | null>(null),
		tagBlock: useRef<HTMLDivElement | null>(null),
		tags: useRef<(HTMLButtonElement | null)[]>([]),
		cards: useRef<(HTMLElement | null)[]>([]),
	}

	useEffect(() => {
		/* Для работы только на клиенте */
		if (typeof window === 'undefined') return

		animateServices(animateRefs).catch(console.error)
	}, [])

	return (
		<section
			ref={animateRefs.section}
			className={cn(
				'relative py-14 container overflow-hidden flex flex-col gap-10 items-center justify-center'
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
					'w-full p-6'
				)}
			>
				Наши услуги
			</h2>

			{/* Фильтры по тегам */}
			<div
				ref={animateRefs.tagBlock}
				className={cn(
					'flex justify-evenly items-center flex-wrap gap-4 p-5 w-full',
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
						'relative max-h-[100dvh] py-10 pr-5 rounded-lg overflow-y-auto',
						'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center modal-scrollbar'
					)}
				>
					{filteredServices.map((service, index) => (
						<ServiceCard
							cardRefs={animateRefs.cards}
							key={service.id}
							service={service}
							index={index}
							handleCTAClick={handleCTAClick}
						/>
					))}
				</div>
			) : (
				<p className='text-center text-teal-300 backdrop-blur-2xl p-10 font-mono text-2xl'>
					Услуги временно недоступны
				</p>
			)}
		</section>
	)
}
