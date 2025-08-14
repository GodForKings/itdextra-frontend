import type { FC } from 'react'
import type { Service } from '../model/types'

import { useEffect, useRef } from 'react'
import { DescBlock, cn } from '~/shared'
import { animateModalForService } from '../lib/animations'

interface ServiceModalContentProps {
	service: Service
}

export const ServiceModal: FC<ServiceModalContentProps> = props => {
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
		description: useRef<HTMLParagraphElement | null>(null),
		category: useRef<HTMLParagraphElement | null>(null),
		priceRange: useRef<HTMLParagraphElement | null>(null),
		deliveryTime: useRef<HTMLParagraphElement | null>(null),
		tags: useRef<(HTMLSpanElement | null)[]>([]),
		caseStudies: useRef<(HTMLLIElement | null)[]>([]),
	}

	useEffect(() => {
		if (typeof window === 'undefined') return

		animateModalForService(animateRefs).catch(console.error)
	}, [])

	return (
		<div
			ref={animateRefs.modal}
			className={cn(
				'flex flex-col gap-8 w-full p-4 lg:p-8 backdrop-blur-2xl rounded-lg',
				'border border-neutral-950 dark:border-sky-500/20 shadow-2xl shadow-sky-400/10',
				'bg-white dark:bg-gray-900/90'
			)}
		>
			<div className='flex items-center gap-2 lg:gap-4'>
				{Icon}

				<h3
					ref={animateRefs.title}
					className={cn(
						'text-2xl lg:text-4xl font-light tracking-wider flex-1 text-center',
						'text-neutral-950 dark:text-white'
					)}
				>
					{title}
				</h3>
			</div>
			{/* Описание направления */}
			<p
				ref={animateRefs.description}
				className={cn(
					'bg-sky-400 text-black p-4 transition-all duration-200',
					'shadow-2xl shadow-sky-500/60',
					'rounded-lg border border-neutral-950 dark:border-sky-500/20',
					'hover:shadow-violet-700 active:shadow-violet-700'
				)}
			>
				{fullDescription}
			</p>

			<div className='flex flex-col gap-4'>
				<DescBlock
					title={`Категория:`}
					styleHeading='tracking-wider text-black dark:text-white font-thin'
				>
					<p ref={animateRefs.category} className='text-xl text-sky-500'>
						{category}
					</p>
				</DescBlock>

				<DescBlock
					title={`Стоимость:`}
					styleHeading='tracking-wider text-black dark:text-white font-thin'
				>
					<p ref={animateRefs.priceRange} className='text-xl text-sky-500'>
						{priceRange}
					</p>
				</DescBlock>

				<DescBlock
					title={`Срок выполнения:`}
					styleHeading='tracking-wider text-black dark:text-white font-thin'
				>
					<p ref={animateRefs.deliveryTime} className='text-xl text-sky-500'>
						{deliveryTime}
					</p>
				</DescBlock>

				<DescBlock
					title={`Теги:`}
					styleHeading='tracking-wider text-black dark:text-white font-thin'
					styleBlock='flex-col justify-center items-start gap-2'
				>
					<div className='flex flex-wrap gap-2 lg:gap-4'>
						{tags?.map((tag, index) => (
							<span
								key={tag}
								ref={el => {
									animateRefs.tags.current[index] = el
								}}
								className={cn(
									'text-sm px-3 py-1 rounded-full',
									'border border-neutral-950 dark:border-sky-500/40',
									'shadow-lg shadow-sky-500',
									'flex items-center justify-center',
									'bg-sky-400 text-black'
								)}
							>
								{tag}
							</span>
						))}
					</div>
				</DescBlock>

				{caseStudies?.length > 0 && (
					<DescBlock
						title={`Кейсы:`}
						styleBlock='flex flex-col justify-center items-start gap-2'
						styleHeading='tracking-wider text-black dark:text-white font-thin'
					>
						<ul className='space-y-2'>
							{caseStudies?.map((caseStudy, index) => (
								<li
									key={caseStudy.title}
									ref={el => {
										animateRefs.caseStudies.current[index] = el
									}}
									className='flex items-center gap-3 text-black dark:text-white'
								>
									<div className='w-2 h-2 bg-sky-500 rounded-full' />
									{caseStudy.title}:
									<p className='text-sky-500'>{caseStudy.result}</p>
								</li>
							))}
						</ul>
					</DescBlock>
				)}
			</div>
		</div>
	)
}
