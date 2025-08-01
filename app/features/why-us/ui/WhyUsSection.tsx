import type { FC } from 'react'

import { useRef, useEffect } from 'react'
import { useUnit } from 'effector-react'
import { useNavigate } from 'react-router'

import type { Pluses } from '../model/types'
import { DASHED_BACKGROUND, ROUTES_DATA, cn } from '~/shared'
import { whyUsList } from '../model/whyUsList'
import { animateSection } from '../lib/animations'

export const WhyUsSection: FC = () => {
	const whyList = useUnit(whyUsList.stores.$WhyUS)

	const navigate = useNavigate()

	const sectionRef = useRef<HTMLDivElement>(null)
	const sloganRef = useRef<HTMLSpanElement>(null)
	const thesisRef = useRef<HTMLHeadingElement | null>(null)
	const plusesRef = useRef<(HTMLButtonElement | null)[]>([])

	useEffect(() => {
		if (typeof window === 'undefined') return

		animateSection({
			sectionRef,
			sloganRef,
			thesisRef,
			plusesRef,
		}).catch(console.error)
	}, [])

	return (
		<section
			aria-labelledby='section-main-whyUs'
			ref={sectionRef}
			className='relative rounded-lg m-5 py-10 px-4 sm:px-8 bg-gray-950/[2.5%] after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:inset-ring after:inset-ring-gray-950/5 dark:after:inset-ring-white/10 bg-[image:radial-gradient(var(--pattern-fg)_1px,_transparent_0)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/10 dark:[--pattern-fg:var(--color-white)]/15 from-neutral-950 to-neutral-950 overflow-hidden'
		>
			{/* Декоративные элементы */}
			<div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neutral-950 dark:via-sky-600 to-transparent animate-pulse'></div>

			<div className='absolute bottom-0 right-0 h-full w-1 bg-gradient-to-t from-transparent via-neutral-950 dark:via-sky-600 to-transparent animate-pulse'></div>

			<div className='absolute top-1/5 left-40 w-48 h-48 rounded-full bg-sky-600/90 blur-3xl animate-pulse'></div>

			{/* Контент секции */}
			<div className='container relative z-10 flex flex-col items-center justify-center lg:flex-row gap-5 min-h-[70dvh]'>
				{/* Текстовки */}
				<div className='text-center flex flex-col items-center justify-center font-mono gap-2 lg:gap-10'>
					<span
						ref={sloganRef}
						className='relative text-neutral-950 dark:text-sky-400 text-lg tracking-widest'
					>
						{whyList.slogan}
					</span>

					<h2 ref={thesisRef} className='text-4xl lg:text-6xl relative'>
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
						<button
							key={item.title}
							ref={(el: HTMLButtonElement | null) => {
								if (el) plusesRef.current[index] = el
							}}
							className={cn(
								'font-mono backdrop-blur-sm border border-neutral-950/90 dark:border-sky-600/90 rounded-lg p-6 transition-all duration-200 group flex flex-col items-start justify-center gap-3',
								'hover:border-sky-500/60 dark:hover:border-slate-100 active:border-sky-500/60 dark:active:border-slate-100'
							)}
							onClick={() => navigate(ROUTES_DATA.about.path)}
						>
							<h3 className='text-xl text-sky-500'>{item.title}</h3>

							<p className='text-neutral-950 dark:text-neutral-50 text-left font-normal text-base'>
								{item.description}
							</p>
							{/* Теги */}
							<div className='flex flex-wrap gap-4'>
								{item.tech.map((tech: string) => (
									<span
										key={tech}
										className={cn(
											DASHED_BACKGROUND,
											'border px-3 py-1 rounded-full font-semibold text-sm text-sky-500 border-neutral-950/60 dark:border-sky-400'
										)}
									>
										{tech}
									</span>
								))}
							</div>
						</button>
					))}
				</div>
			</div>
		</section>
	)
}
