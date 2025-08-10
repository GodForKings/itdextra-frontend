import type { FC } from 'react'
import type { LucideIcon } from 'lucide-react'

import type { Service } from '../model/types'

import { memo } from 'react'
import { cn } from '~/shared'

interface ServiceCardProps {
	service: Service<LucideIcon>
	index: number
	cardRefs: React.RefObject<(HTMLElement | null)[]>
	handleCTAClick: () => void
}

export const ServiceCard: FC<ServiceCardProps> = memo(props => {
	const { service, index, cardRefs, handleCTAClick } = props

	const {
		title,
		shortDescription,
		fullDescription,
		category,
		priceRange,
		deliveryTime,
		tags,
		caseStudies,
		icon: Icon,
	} = service

	return (
		<article
			ref={(el: HTMLElement | null) => {
				if (el) cardRefs.current[index] = el
			}}
			className={cn(
				'p-8 bg-gradient-to-b from-gray-900 to-gray-800 backdrop-blur-2xl rounded-lg',
				'border-x-2 border-teal-400',
				'active:border-sky-500 hover:border-sky-500',
				'transition-all duration-300',
				'flex flex-col justify-between gap-5',
				(index === 0 || index === 3 || index === 7) && 'lg:col-span-2'
			)}
			role='region'
			aria-label={`Услуга: ${title}`}
		>
			<div className='flex items-center justify-between text-sky-400/90'>
				{/* Категория */}
				<span className='text-sm lowercase tracking-widest bg-neutral-950/60 p-3 rounded-lg'>
					{category}
				</span>

				{/* Иконка */}
				<Icon
					strokeWidth={1}
					size={60}
					className={cn('bg-neutral-950/60 text-teal-400 p-1.5 rounded-xl')}
				/>
			</div>

			{/* Заголовок */}
			<h3 className='text-3xl text-teal-300 tracking-tight'>{title}</h3>

			{/* Краткое описание */}
			<p className='text-lg/normal text-sky-500'>{shortDescription}</p>

			{/* Полное описание */}
			<p className='text-base/snug bg-neutral-950/60 p-4 rounded-2xl text-teal-400'>
				{fullDescription}
			</p>

			{/* Цена и сроки */}
			<div className='text-base text-sky-500 flex justify-between items-center'>
				<p className='font-thin'>
					Цена:
					<span className='font-bold italic'> {priceRange}</span>
				</p>

				<p className='font-thin'>
					Сроки:
					<span className='font-bold italic'> {deliveryTime}</span>
				</p>
			</div>

			{/* Теги */}
			<div className='flex flex-wrap items-center gap-3'>
				{tags.map((tag: string) => (
					<span
						key={tag}
						className='text-xs tracking-wide text-teal-400 bg-teal-900/20 px-3 py-1 rounded-full transition-colors duration-200'
					>
						{tag}
					</span>
				))}
			</div>

			{/* Кейсы */}
			{caseStudies.length > 0 && (
				<div className='flex flex-col gap-1'>
					<h4 className='text-sm font-thin text-sky-500'>Кейсы:</h4>

					<ul className='text-sm text-teal-400/80'>
						{caseStudies.map(caseStudy => (
							<li key={caseStudy.title}>
								<span className='font-bold'>{caseStudy.title}: </span>
								{caseStudy.result}
							</li>
						))}
					</ul>
				</div>
			)}

			{/* CTA-кнопка */}
			<button
				className={cn(
					'w-full py-3 px-6 bg-sky-500 text-gray-900 font-mono font-bold rounded-lg',
					'transition-all duration-250 ease-in',
					'hover:bg-sky-500/40 hover:translate-y-1',
					'active:bg-sky-500/40 active:translate-y-1'
				)}
				aria-label={`Заказать услугу ${title}`}
				onClick={handleCTAClick}
			>
				Выбрать
			</button>
		</article>
	)
})
