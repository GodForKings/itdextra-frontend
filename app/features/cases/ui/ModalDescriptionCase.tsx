import type { FC } from 'react'

import type { CaseItem } from '~/shared'
import type { ModalDescCaseRefs } from '../lib/types'

import { CheckCheck } from 'lucide-react'
import { useEffect, useRef } from 'react'

import { DescBlock, cn } from '~/shared'
import { ContactForm } from '~/widgets'
import { animateModalForSoloCase } from '../lib/animations'

interface ModalDescriptionCaseProps {
	currentCase: CaseItem
}

export const ModalDescriptionCase: FC<ModalDescriptionCaseProps> = props => {
	const { title, image, client, problem, solution, result, metrics } =
		props.currentCase

	const animateRefs: ModalDescCaseRefs = {
		modal: useRef<HTMLDivElement | null>(null),
		title: useRef<HTMLHeadingElement | null>(null),
		image: useRef<HTMLImageElement | null>(null),
		client: useRef<HTMLParagraphElement | null>(null),
		problem: useRef<HTMLParagraphElement | null>(null),
		solution: useRef<HTMLParagraphElement | null>(null),
		result: useRef<HTMLParagraphElement | null>(null),
		metrics: useRef<(HTMLLIElement | null)[]>([]),
		form: useRef<HTMLFormElement | null>(null),
	}

	useEffect(() => {
		/* Выход на сервере */
		if (typeof window === 'undefined') return
		animateModalForSoloCase(animateRefs).catch(console.error)
	}, [])

	return (
		<div ref={animateRefs.modal} className='relative flex flex-col gap-6'>
			<h3
				ref={animateRefs.title}
				className={cn(
					'relative p-4 flex items-center justify-center',
					'text-2xl lg:text-4xl text-sky-500 text-center tracking-wide'
				)}
			>
				{title}
			</h3>

			<div
				className={cn(
					'flex justify-start gap-5 max-lg:flex-col overflow-hidden',
					'rounded-lg tracking-wider',
					'bg-gradient-to-l from-gray-950/90 to-gray-800/25',
					'[transform-style:preserve-3d] [perspective:600px] will-change-transform'
				)}
			>
				<img
					ref={animateRefs.image}
					src={image}
					alt={title}
					className={cn('h-128 object-cover object-center rounded-lg')}
				/>

				<div className='flex flex-col gap-4 lg:gap-10 p-4 lg:p-6'>
					<DescBlock title={`Клиент:`} styleBlock='items-start flex-wrap'>
						<p ref={animateRefs.client} className='italic text-sky-500'>
							{client}
						</p>
					</DescBlock>

					<DescBlock title={`Проблема:`} styleBlock='items-start flex-wrap'>
						<p ref={animateRefs.problem} className='text-sky-500'>
							{problem}
						</p>
					</DescBlock>

					<DescBlock title={`Решение:`} styleBlock='items-start flex-wrap'>
						<p ref={animateRefs.solution} className='text-sky-500'>
							{solution}
						</p>
					</DescBlock>

					<DescBlock title={`Результат:`} styleBlock='items-start flex-wrap'>
						<p ref={animateRefs.result} className='text-sky-500'>
							{result}
						</p>
					</DescBlock>

					<DescBlock
						title={`Метрики успеха:`}
						styleBlock='items-start flex-col'
					>
						<ul className='flex flex-wrap gap-4 items-center'>
							{metrics.map((metric: string, index: number) => (
								<li
									ref={(el: HTMLLIElement | null) => {
										if (el) animateRefs.metrics.current[index] = el
									}}
									key={metric}
									className={cn(
										'flex items-center justify-center gap-2',
										'px-4 py-2 rounded-full',
										'shadow-lg shadow-sky-500',
										'text-sm text-black bg-sky-500'
									)}
								>
									<CheckCheck
										className='text-white'
										size={20}
										strokeWidth={1.4}
									/>
									{metric}
								</li>
							))}
						</ul>
					</DescBlock>
				</div>
			</div>

			<ContactForm
				formRef={animateRefs.form}
				subjectOfRequest={`проект похожий на "${title}"`}
			/>
		</div>
	)
}
