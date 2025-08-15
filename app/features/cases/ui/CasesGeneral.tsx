import type { FC } from 'react'

import { useEffect, useRef, useState, useMemo } from 'react'
import { useUnit } from 'effector-react'

import { CaseStudyCard } from './CaseStudyCard'
import { animateCaseStudies } from '../lib/animations'
import { casesList } from '../model/caseList'
import { cn } from '~/shared'
import { TagBlock } from './TagBlock'

export const CaseStudies: FC = () => {
	const caseStudiesData = useUnit(casesList.stores.$cases).items

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

	/* Уникальные теги для фильтрации */
	const allTags = Array.from(
		new Set(caseStudiesData.flatMap(caseStudy => caseStudy.tags))
	)

	return (
		<section
			ref={animateRefs.section}
			className='relative container flex flex-col gap-12 items-center justify-center min-h-[90dvh] py-5'
			aria-labelledby='case-studies-heading'
		>
			<h2
				ref={animateRefs.title}
				id='case-studies-heading'
				className={cn(
					'relative z-10 text-4xl md:text-6xl text-center font-light text-white',
					'bg-gray-900/50 backdrop-blur-xl rounded-xl shadow-2xl shadow-gray-50/10',
					'border border-gray-200/20 w-full max-w-4xl p-8 tracking-wider'
				)}
			>
				Наши кейсы
			</h2>

			<TagBlock
				tagBlockRef={animateRefs.tagBlock}
				tagsRef={animateRefs.tags}
				selectedTag={selectedTag}
				setSelectedTag={setSelectedTag}
				allTags={allTags}
			/>

			{filteredCaseStudies.length ? (
				<div className='relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start min-h-0 w-full'>
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
				<p className='text-center text-gray-200 bg-gray-900/50 backdrop-blur-xl p-10 text-2xl rounded-lg'>
					Кейсы временно недоступны. Просим подождать.
				</p>
			)}
		</section>
	)
}
