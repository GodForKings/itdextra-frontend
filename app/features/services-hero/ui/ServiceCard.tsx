import type { FC } from 'react'

import { type LucideIcon, Expand } from 'lucide-react'

import type { Service } from '../model/types'

import { memo } from 'react'
import { Button, cn } from '~/shared'

interface ServiceCardProps {
	service: Service<LucideIcon>
	index: number
	cardRefs: React.RefObject<(HTMLElement | null)[]>
	handleCTAClick: (service: Service<LucideIcon>) => void
}

export const ServiceCard: FC<ServiceCardProps> = memo(props => {
	const { service, index, cardRefs, handleCTAClick } = props

	const { title, shortDescription, category, tags, icon: Icon } = service

	return (
		<article
			ref={(el: HTMLElement | null) => {
				if (el) cardRefs.current[index] = el
			}}
			className={cn(
				'p-8 rounded-lg max-h-fit',
				'backdrop-blur-3xl bg-neutral-950/50',
				'active:border-sky-500 hover:border-sky-500',
				'flex flex-col justify-between items-start gap-5'
			)}
			role='region'
			aria-label={`Услуга: ${title}`}
		>
			<div className='flex items-center justify-between text-sky-400/90 w-full'>
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

			{/* CTA-кнопка */}
			<Button
				ariaLabelDesc={`Открыть услугу ${title}`}
				square={false}
				onClick={() => handleCTAClick(service)}
				styles='font-inherit gap-3'
			>
				Ознакомиться
				<Expand size={20} strokeWidth={1.5} />
			</Button>
		</article>
	)
})
