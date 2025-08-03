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
	} = service

	return (
		<article
			ref={(el: HTMLElement | null) => {
				if (el) cardRefs.current[index] = el
			}}
			className={cn(
				'p-8 bg-gradient-to-br from-gray-900 to-gray-800 backdrop-blur-2xl rounded-lg border-x-4 border-teal-400',
				'shadow-xl shadow-teal-400/20 transition-all duration-300',
				'hover:-translate-y-3 hover:shadow-teal-400/40 active:-translate-x-3',
				'flex flex-col justify-between gap-3',
				(index === 0 || index === 3 || index === 7) && 'lg:col-span-2'
			)}
			role='region'
			aria-label={`Услуга: ${title}`}
		>
			<div className='flex items-center justify-between text-sky-400/90'>
				{/* Категория */}
				<span className='text-sm font-mono uppercase tracking-widest bg-neutral-950/60 p-3 rounded-lg'>
					{category}
				</span>

				{/* Иконка */}
				<service.icon
					strokeWidth={1}
					size={60}
					className={cn('bg-neutral-950/60 p-1.5 rounded-xl')}
				/>
			</div>

			{/* Заголовок */}
			<h3 className='text-2xl font-mono font-bold text-teal-300 tracking-tight'>
				{title}
			</h3>

			{/* Краткое описание */}
			<p className='text-lg/normal font-mono text-sky-500'>
				{shortDescription}
			</p>

			{/* Полное описание */}
			<p className='text-base/snug font-mono text-teal-300'>
				{fullDescription}
			</p>

			{/* Цена и сроки */}
			<div className='text-base font-mono text-sky-500'>
				<p>
					<span className='font-bold'>Цена:</span> {priceRange}
				</p>

				<p>
					<span className='font-bold'>Сроки:</span> {deliveryTime}
				</p>
			</div>

			{/* Теги */}
			<div className='flex flex-wrap gap-2'>
				{tags.map((tag: string) => (
					<span
						key={tag}
						className='text-xs font-mono text-teal-400 bg-teal-900/20 px-3 py-1 rounded-full hover:bg-teal-900/50 transition-colors duration-200'
					>
						{tag}
					</span>
				))}
			</div>

			{/* Кейсы */}
			{caseStudies.length > 0 && (
				<div className='flex flex-col gap-1'>
					<h4 className='text-sm font-bold text-sky-500'>Кейсы:</h4>

					<ul className='text-sm text-teal-400/80'>
						{caseStudies.map(caseStudy => (
							<li key={caseStudy.title}>
								<span className='font-bold'>{caseStudy.title}:</span>{' '}
								{caseStudy.result}
							</li>
						))}
					</ul>
				</div>
			)}

			{/* CTA-кнопка */}
			<button
				className='w-full py-3 px-6 bg-teal-500 text-gray-900 font-mono font-bold rounded-lg hover:bg-teal-400 transition-colors duration-200'
				aria-label={`Заказать услугу ${title}`}
				onClick={handleCTAClick}
			>
				Выбрать
			</button>
		</article>
	)
})
