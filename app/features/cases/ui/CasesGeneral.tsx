import type { FC } from 'react'

import type { CardCases3dRefs, CasesAnimationRefs } from '../lib/types'

import { useEffect, useRef, useState, useMemo } from 'react'
import { useUnit } from 'effector-react'

import { CaseStudyCard } from './CaseStudyCard'
import { animateCardCases3d, animateCaseStudies } from '../lib/animations'
import { casesList } from '../model/caseList'
import { cn } from '~/shared'
import { TagBlock } from './TagBlock'

export const CaseStudies: FC = () => {
	const caseStudiesData = useUnit(casesList.stores.$cases).items

	/* Уникальные теги для фильтрации */
	const allTags = Array.from(
		new Set(caseStudiesData.flatMap(caseStudy => caseStudy.tags))
	)

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

	const animateRefs: CasesAnimationRefs = {
		section: useRef<HTMLElement | null>(null),
		title: useRef<HTMLHeadingElement | null>(null),
		tagBlock: useRef<HTMLDivElement | null>(null),
		tags: useRef<(HTMLButtonElement | null)[]>([]),
	}

	const cardsRefs: CardCases3dRefs = {
		cards: useRef<(HTMLDivElement | null)[]>([]),
	}

	useEffect(() => {
		/* Проверка на клиент */
		if (typeof window === 'undefined') return

		animateCaseStudies(animateRefs).catch(console.error)
	}, [])

	useEffect(() => {
		/* Проверка на клиент */
		if (typeof window === 'undefined') return

		animateCardCases3d(cardsRefs).catch(console.error)
	}, [selectedTag])

	return (
		<section
			ref={animateRefs.section}
			className='relative container flex flex-col gap-12 items-center justify-center min-h-[90dvh] py-5 font-thin'
			aria-labelledby='case-studies-heading'
		>
			<h2
				ref={animateRefs.title}
				id='case-studies-heading'
				className={cn(
					'relative text-4xl md:text-6xl text-center text-white',
					'bg-gray-900/20 backdrop-blur-sm rounded-lg shadow-sm shadow-sky-500',
					'border border-sky-500 w-full p-8 tracking-wider'
				)}
			>
				Наше портфолио
			</h2>
			{/* Блок тегов */}
			<TagBlock
				tagBlockRef={animateRefs.tagBlock}
				tagsRef={animateRefs.tags}
				selectedTag={selectedTag}
				setSelectedTag={setSelectedTag}
				allTags={allTags}
			/>
			{/* Блок карточек */}
			{filteredCaseStudies.length ? (
				<div
					className={cn(
						'relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-0 w-full',
						'[transform-style:preserve-3d] [perspective:800px] will-change-transform overflow-hidden'
					)}
				>
					{filteredCaseStudies.map((caseStudy, index: number) => (
						<CaseStudyCard
							key={caseStudy.id}
							caseStudy={caseStudy}
							index={index}
							cardRef={cardsRefs.cards}
						/>
					))}
				</div>
			) : (
				<p className='text-center text-white bg-gray-900/50 backdrop-blur-xl p-10 text-2xl rounded-lg'>
					Кейсы временно недоступны. Просим подождать.
				</p>
			)}
		</section>
	)
}
