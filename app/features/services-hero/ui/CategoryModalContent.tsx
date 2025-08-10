import type { FC } from 'react'
import type { LucideIcon } from 'lucide-react'
import type { Category } from '../model/types'

import { useEffect, useRef } from 'react'

import { cn } from '~/shared'
import { animateModal } from '../lib/animations'
import { ContactForm } from '~/widgets'

interface CategoryModalContentProps {
	category: Category<LucideIcon>
}

export const CategoryModalContent: FC<CategoryModalContentProps> = ({
	category,
}) => {
	const { title, description, icon: Icon, benefits } = category

	const animateRefs = {
		modal: useRef<HTMLDivElement | null>(null),
		title: useRef<HTMLHeadingElement | null>(null),
		icon: useRef<SVGSVGElement | null>(null),
		description: useRef<HTMLParagraphElement | null>(null),
		benefits: useRef<(HTMLLIElement | null)[]>([]),
		form: useRef<HTMLFormElement | null>(null),
	}

	useEffect(() => {
		if (typeof window === 'undefined') return

		animateModal(animateRefs).catch(console.error)
	}, [])

	return (
		<div
			ref={animateRefs.modal}
			className={cn(
				'flex flex-col gap-8 w-full p-4 lg:p-8 backdrop-blur-2xl rounded-lg',
				'border border-gray-100/10 shadow-2xl shadow-gray-50/10'
			)}
		>
			<div className='flex items-center gap-2 lg:gap-4'>
				<Icon
					ref={animateRefs.icon}
					className='rounded-lg h-18 lg:h-24 w-18 lg:w-24 grow-0 border border-gray-100/10 p-2 shadow-2xl shadow-gray-50/10 text-white'
					strokeWidth={1.4}
				/>

				<h3
					ref={animateRefs.title}
					className='text-2xl lg:text-4xl font-thin text-white tracking-wider flex-1 text-center'
				>
					{title}
				</h3>
			</div>

			<p
				ref={animateRefs.description}
				className={cn(
					'text-xl text-sky-400 p-4',
					'shadow-2xl shadow-blue-500/15',
					'rounded-lg border border-gray-100/10',
					'hover:shadow-blue-500/30 active:shadow-blue-500/30'
				)}
			>
				{description}
			</p>

			<div className='flex flex-col gap-2'>
				<h4 className='text-gray-200/80 font-thin tracking-wider'>
					Преимущества:
				</h4>

				<ul className={cn('flex justify-center max-lg:flex-col gap-3')}>
					{benefits.map((benefit: string, index: number) => (
						<li
							key={benefit}
							ref={el => {
								animateRefs.benefits.current[index] = el
							}}
							className={cn(
								'bg-gray-900/10 text-white text-center border border-gray-100/10 px-4 py-2 w-fit rounded-full',
								'shadow-2xl shadow-gray-50/30'
							)}
						>
							{benefit}
						</li>
					))}
				</ul>
			</div>

			<ContactForm formRef={animateRefs.form} subjectOfRequest={title} />
		</div>
	)
}
