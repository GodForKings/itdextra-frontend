import type { FC } from 'react'

import type { Pluses } from '../model/types'
import type { SectionAnimationRefs } from '../lib/types'

import { useRef, useEffect } from 'react'
import { useUnit } from 'effector-react'
import { useNavigate } from 'react-router'

import { ROUTES_DATA, cn } from '~/shared'
import { whyUsList } from '../model/whyUsList'
import { animateSection } from '../lib/animations'
import { PlusesCard } from './PlusesCard'

export const WhyUsSection: FC = () => {
	const whyList = useUnit(whyUsList.stores.$WhyUS)

	const navigate = useNavigate()

	const handleAboutClick = () => {
		navigate(ROUTES_DATA.about.path)
	}

	const animateRefs: SectionAnimationRefs = {
		sectionRef: useRef<HTMLDivElement>(null),
		sloganRef: useRef<HTMLSpanElement>(null),
		thesisRef: useRef<HTMLHeadingElement | null>(null),
		plusesRef: useRef<(HTMLButtonElement | null)[]>([]),
	}

	useEffect(() => {
		/* SSR dodge */
		if (typeof window === 'undefined') return

		let cleanup: (() => void) | undefined

		animateSection(animateRefs)
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
		<section
			aria-labelledby='section-main-whyUs'
			ref={animateRefs.sectionRef}
			className='relative rounded-lg m-5 py-10 px-4 sm:px-8 bg-gray-950/[2.5%] after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:inset-ring after:inset-ring-gray-950/5 dark:after:inset-ring-white/10 bg-[image:radial-gradient(var(--pattern-fg)_1px,_transparent_0)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/10 dark:[--pattern-fg:var(--color-white)]/10 select-none overflow-hidden'
		>
			{/* Декоративные элементы */}
			<div className='absolute inset-0 w-full h-1 bg-gradient-to-r from-transparent via-neutral-950 dark:via-sky-600 to-transparent animate-pulse'></div>

			<div className='absolute bottom-0 right-0 h-full w-1 bg-gradient-to-t from-transparent via-neutral-950 dark:via-sky-600 to-transparent animate-pulse'></div>

			<div className='absolute top-1/10 left-1/10 w-48 h-48 rounded-full bg-sky-600/90 blur-3xl animate-pulse'></div>

			{/* Контент секции */}
			<div className='container relative z-10 flex flex-col items-center justify-center lg:flex-row gap-5 min-h-[70dvh]'>
				{/* Текстовки */}
				<div className='text-center flex flex-col items-center justify-center gap-2 lg:gap-10'>
					<span
						ref={animateRefs.sloganRef}
						className='relative text-xl tracking-widest font-mono text-neutral-950 dark:text-sky-400'
					>
						{whyList.slogan}
					</span>

					<h2
						ref={animateRefs.thesisRef}
						className='relative text-4xl lg:text-6xl'
					>
						{whyList.thesis.map((item: string) => (
							<span
								key={item}
								className={cn(
									'text-transparent bg-clip-text bg-gradient-to-r from-neutral-950 to-sky-600 dark:from-slate-200 dark:to-sky-500',
									'last:animate-pulse last:to-black dark:last:to-slate-50'
								)}
							>
								{item}
							</span>
						))}
					</h2>
				</div>

				{/* Карточки */}
				<div className='flex flex-col items-center justify-center gap-6 min-w-[40%]'>
					{whyList.pluses.map((item: Pluses, index: number) => (
						<PlusesCard
							key={item.title}
							card={item}
							index={index}
							plusesRef={animateRefs.plusesRef}
							handleAboutClick={handleAboutClick}
						/>
					))}
				</div>
			</div>
		</section>
	)
}
