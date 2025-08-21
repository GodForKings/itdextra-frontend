import type { FC } from 'react'
import type { LucideIcon } from 'lucide-react'
import type { Service } from '../model/types'

import { useEffect, useRef } from 'react'

import { DescBlock, cn } from '~/shared'
import { ContactForm } from '~/widgets'
import { animateServiceModalContent } from '../lib/animations'

interface ServiceModalContentProps {
	service: Service<LucideIcon>
}

export const ServiceModalContent: FC<ServiceModalContentProps> = props => {
	const {
		title,
		fullDescription,
		category,
		priceRange,
		deliveryTime,
		tags,
		caseStudies,
		icon: Icon,
	} = props.service

	const animateRefs = {
		modal: useRef<HTMLDivElement | null>(null),
		title: useRef<HTMLHeadingElement | null>(null),
		icon: useRef<SVGSVGElement | null>(null),
		description: useRef<HTMLParagraphElement | null>(null),
		category: useRef<HTMLParagraphElement | null>(null),
		priceRange: useRef<HTMLParagraphElement | null>(null),
		deliveryTime: useRef<HTMLParagraphElement | null>(null),
		tags: useRef<(HTMLSpanElement | null)[]>([]),
		caseStudies: useRef<(HTMLLIElement | null)[]>([]),
		form: useRef<HTMLFormElement | null>(null),
	}

	useEffect(() => {
		/* SSR dodge */
		if (typeof window === 'undefined') return

		let cleanup: (() => void) | undefined

		animateServiceModalContent(animateRefs)
			.then(cleanupFn => {
				cleanup = cleanupFn
			})
			.catch(console.error)
		/* Очистка */
		return () => {
			cleanup?.()
		}
	}, [])

	return (
		<div
			ref={animateRefs.modal}
			className={cn(
				'flex flex-col gap-8 w-full p-4 lg:p-8 rounded-lg',
				'border border-sky-400/10 shadow-2xl shadow-sky-400/10'
			)}
		>
			{/* Верхняя часть иконка + заголовок */}
			<div className='flex items-center gap-2 lg:gap-4'>
				<Icon
					ref={animateRefs.icon}
					className='rounded-lg h-18 lg:h-24 w-18 lg:w-24 grow-0 border border-sky-400/10 p-2 shadow-2xl shadow-sky-400/10 text-sky-400'
					strokeWidth={1.4}
				/>

				<h3
					ref={animateRefs.title}
					className='text-2xl lg:text-4xl text-sky-400 tracking-wider flex-1 text-center'
				>
					{title}
				</h3>
			</div>
			{/* Описание услуги */}
			<p
				ref={animateRefs.description}
				className={cn(
					'lg:text-xl font-thin text-white p-4',
					'shadow-2xl shadow-gray-50/10 transition-all duration-200',
					'rounded-lg border border-sky-400/10',
					'hover:shadow-blue-500/40 active:shadow-blue-500/40'
				)}
			>
				{fullDescription}
			</p>

			<div className='flex flex-col gap-4'>
				<DescBlock title={`Категория:`}>
					<p ref={animateRefs.category} className='text-lg text-sky-400'>
						{category}
					</p>
				</DescBlock>

				<DescBlock title={`Стоимость:`}>
					<p ref={animateRefs.priceRange} className='text-lg text-sky-400'>
						{priceRange}
					</p>
				</DescBlock>

				<DescBlock title={`Срок выполнения:`}>
					<p ref={animateRefs.deliveryTime} className='text-lg text-sky-400'>
						{deliveryTime}
					</p>
				</DescBlock>

				<DescBlock
					title={`Теги:`}
					styleBlock='flex-col justify-center items-start gap-2'
				>
					<div className='flex flex-wrap gap-2 lg:gap-4'>
						{tags?.map((tag, index) => (
							<span
								key={tag}
								ref={(el: HTMLSpanElement | null) => {
									if (el) animateRefs.tags.current[index] = el
								}}
								className={cn(
									'text-sm shadow-xl shadow-sky-400/30 text-sky-400 bg-gray-950 px-3 py-1 rounded-full border border-sky-400/20',
									'flex items-center justify-center'
								)}
							>
								{tag}
							</span>
						))}
					</div>
				</DescBlock>
				{/* Кейсы */}
				{caseStudies.length > 0 && (
					<DescBlock
						title={`Кейсы:`}
						styleBlock='flex flex-col justify-center items-start gap-2'
					>
						<ul className='space-y-2'>
							{caseStudies?.map((caseStudy, index) => (
								<li
									key={caseStudy.title}
									ref={el => {
										animateRefs.caseStudies.current[index] = el
									}}
									className='flex items-center gap-3 text-sky-400'
								>
									<div className='w-3 h-3 bg-sky-500/60 rounded-full' />

									<div className='flex flex-wrap gap-2 lg:gap-4'>
										<strong className='text-gray-200'>
											{caseStudy.title}:
										</strong>
										{caseStudy.result}
									</div>
								</li>
							))}
						</ul>
					</DescBlock>
				)}
			</div>
			{/* Обратка форма */}
			<ContactForm formRef={animateRefs.form} subjectOfRequest={title} />
		</div>
	)
}
