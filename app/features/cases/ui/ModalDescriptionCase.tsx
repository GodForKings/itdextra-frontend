import type { FC } from 'react'

import type { CaseItem } from '~/shared'

import { CheckCheck } from 'lucide-react'
import { useRef } from 'react'

import { DescBlock, cn } from '~/shared'
import { ContactForm } from '~/widgets'

interface ModalDescriptionCaseProps {
	currentCase: CaseItem
}

export const ModalDescriptionCase: FC<ModalDescriptionCaseProps> = props => {
	const { title, image, client, problem, solution, result, metrics } =
		props.currentCase

	const animateRefs = {
		modal: useRef<HTMLDivElement | null>(null),
		title: useRef<HTMLHeadingElement | null>(null),
		icon: useRef<SVGSVGElement | null>(null),
		description: useRef<HTMLParagraphElement | null>(null),
		benefits: useRef<(HTMLLIElement | null)[]>([]),
		form: useRef<HTMLFormElement | null>(null),
	}

	return (
		<div className='relative flex flex-col gap-10 overflow-hidden'>
			<h3
				className={cn(
					'relative p-4 flex items-center justify-center',
					'text-xl lg:text-3xl text-sky-500 text-center tracking-wide'
				)}
			>
				{title}
			</h3>

			<div
				className={cn(
					'flex justify-start gap-5 max-lg:flex-col overflow-hidden',
					'rounded-lg tracking-wider',
					'bg-gradient-to-l from-gray-950/90 to-gray-800/25'
				)}
			>
				<img
					src={image}
					alt={title}
					className='h-128 object-cover object-center rounded-lg'
				/>

				<div className='flex flex-col gap-10 p-4 lg:p-6'>
					<DescBlock
						title={`Клиент:`}
						styleBlock='items-start flex-wrap'
						styleHeading=''
					>
						<p className='italic text-sky-400'>{client}</p>
					</DescBlock>

					<DescBlock title={`Проблема:`} styleBlock='items-start flex-wrap'>
						<p className='text-sky-400'>{problem}</p>
					</DescBlock>

					<DescBlock title={`Решение:`} styleBlock='items-start flex-wrap'>
						<p className='text-sky-400'>{solution}</p>
					</DescBlock>

					<DescBlock title={`Результат:`} styleBlock='items-start flex-wrap'>
						<p className='text-sky-400'>{result}</p>
					</DescBlock>

					<DescBlock
						title={`Метрики успеха:`}
						styleBlock='items-start flex-col'
					>
						<ul className='flex flex-wrap gap-4'>
							{metrics.map((metric: string) => (
								<li
									key={metric}
									className={cn(
										'flex gap-1 px-4 py-2 rounded-full',
										'shadow-md shadow-sky-500 text-black bg-sky-500'
									)}
								>
									<CheckCheck
										className='text-white'
										size={26}
										strokeWidth={1.6}
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
