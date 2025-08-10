import type { FC } from 'react'

import { useEffect, useRef, useState, useMemo } from 'react'
import { useUnit } from 'effector-react'

import { CaseStudyCard } from './CaseStudyCard'
import { animateCaseStudies } from '../lib/animations'
import { defaultCases, cn } from '~/shared'

export const CaseStudies: FC = () => {
	const caseStudiesData = defaultCases

	const [selectedTag, setSelectedTag] = useState<string | null>(null)

	const filteredCaseStudies = useMemo(
		() =>
			selectedTag
				? caseStudiesData.filter(caseStudy =>
						caseStudy.tags.includes(selectedTag)
				  )
				: caseStudiesData,
		[caseStudiesData, selectedTag]
	)

	const animateRefs = {
		section: useRef<HTMLElement | null>(null),
		title: useRef<HTMLHeadingElement | null>(null),
		tagBlock: useRef<HTMLDivElement | null>(null),
		tags: useRef<(HTMLButtonElement | null)[]>([]),
		cards: useRef<(HTMLDivElement | null)[]>([]),
	}

	useEffect(() => {
		if (typeof window === 'undefined') return

		animateCaseStudies(animateRefs).catch(console.error)
	}, [filteredCaseStudies])

	// Уникальные теги для фильтров
	const allTags = Array.from(
		new Set(caseStudiesData.flatMap(caseStudy => caseStudy.tags))
	)

	return (
		<section
			ref={animateRefs.section}
			className='relative py-20 px-4 lg:px-8 flex flex-col gap-12 items-center min-h-0 h-auto'
			aria-labelledby='case-studies-heading'
		>
			<h2
				ref={animateRefs.title}
				id='case-studies-heading'
				className={cn(
					'relative z-10 text-4xl md:text-6xl text-center font-sans font-light text-white',
					'bg-gray-900/50 backdrop-blur-xl rounded-xl shadow-2xl shadow-gray-50/10',
					'border border-gray-200/20 w-full max-w-4xl p-8 tracking-wider'
				)}
			>
				Наши кейсы
			</h2>

			<div
				ref={animateRefs.tagBlock}
				className={cn(
					'relative z-10 flex justify-center items-center flex-wrap gap-3 p-6 w-full max-w-4xl',
					'bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-200/20'
				)}
			>
				<button
					className={cn(
						'text-sm font-sans font-medium text-gray-200 bg-gray-900/40 px-4 py-2 rounded-full',
						!selectedTag && 'bg-gray-50 text-black shadow-gray-50/20',
						'hover:bg-gray-50 hover:text-black transition-all duration-300 ease-out'
					)}
					onClick={() => setSelectedTag(null)}
				>
					Все
				</button>

				{allTags.map((tag, index) => (
					<button
						ref={el => {
							animateRefs.tags.current[index] = el
						}}
						key={tag}
						className={cn(
							'text-sm font-sans font-medium text-gray-200 bg-gray-900/40 px-4 py-2 rounded-full',
							selectedTag === tag && 'bg-gray-50 text-black shadow-gray-50/20',
							'hover:bg-gray-50 hover:text-black transition-all duration-300 ease-out'
						)}
						onClick={() => setSelectedTag(tag)}
					>
						{tag}
					</button>
				))}
			</div>

			{filteredCaseStudies.length ? (
				<div className='relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start min-h-0 w-full max-w-7xl'>
					{filteredCaseStudies.map((caseStudy, index) => (
						<CaseStudyCard
							key={caseStudy.id}
							caseStudy={caseStudy}
							index={index}
							cardRef={animateRefs.cards}
						/>
					))}
				</div>
			) : (
				<p className='relative z-10 text-center text-gray-200 bg-gray-900/50 backdrop-blur-xl p-10 font-sans text-xl rounded-xl'>
					Кейсы временно недоступны
				</p>
			)}
		</section>
	)
}
