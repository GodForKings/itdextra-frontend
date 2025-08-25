import type { FC } from 'react'

import type { animateHeroRefs } from '../lib/types'

import { useEffect, useRef } from 'react'
import { useUnit } from 'effector-react'
import { useNavigate } from 'react-router'
import { ArrowRightToLine } from 'lucide-react'

import { cn, Button, useCTAModal } from '~/shared'
import { heroSectionModel } from '../model/heroSection'
import { animateHero } from '../lib/animations'

export const HeroSection: FC = () => {
	const hero = useUnit(heroSectionModel.stores.$heroSection)

	/* объект с рефами элементов */
	const animateRefs: animateHeroRefs = {
		heroRef: useRef<HTMLDivElement>(null),
		nameRef: useRef<(HTMLSpanElement | null)[]>([]),
		titleRef: useRef<HTMLSpanElement>(null),
		subtitleRef: useRef<HTMLParagraphElement>(null),
		ctaRef: useRef<HTMLDivElement>(null),
		trustRef: useRef<HTMLDivElement>(null),
	}

	const handleCTAClick = useCTAModal()

	const navigate = useNavigate()

	useEffect(() => {
		/* SSR dodge */
		if (typeof window === 'undefined') return
		let cleanup: (() => void) | undefined

		animateHero(animateRefs)
			.then(fn => {
				cleanup = fn
			})
			.catch(console.error)
		/* Очистка */
		return () => {
			cleanup?.()
		}
	}, [])

	return (
		<section
			role='banner'
			aria-labelledby='main-hero-heading'
			className={cn(
				'bg-gray-950/[2.5%] after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:inset-ring after:inset-ring-gray-950/5 dark:after:inset-ring-white/10 bg-[image:radial-gradient(var(--pattern-fg)_1px,_transparent_0)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-white)]/10',
				'flex justify-center items-center overflow-hidden',
				'relative min-h-[80dvh] m-5 p-4 lg:p-8 rounded-lg'
			)}
		>
			<div
				ref={animateRefs.heroRef}
				className='container p-4 lg:py-20 max-w-5xl text-center flex flex-col justify-center items-center gap-6 lg:gap-12 opacity-0'
			>
				{/* Заголовок */}
				<article className='relative flex flex-col items-center justify-center gap-2 will-change-transform'>
					<h1 className='flex text-6xl md:text-8xl gap-0.25'>
						{hero.name.map((letter: string, index) => (
							<span
								ref={(element: HTMLSpanElement | null) => {
									if (element) animateRefs.nameRef.current[index] = element
								}}
								key={letter + index}
								className={cn(
									index < 3
										? 'text-sky-500'
										: 'text-neutral-950 dark:text-slate-200 font-thin'
								)}
							>
								{letter}
							</span>
						))}
					</h1>

					<h2
						className={cn(
							'text-3xl lg:text-6xl',
							'flex justify-center items-center',
							'[perspective:500px] [perspective-origin:50%_50%] [transform-style:preserve-3d]'
						)}
					>
						<span className={cn('font-thin')} ref={animateRefs.titleRef}>
							{hero.slogan}
						</span>
					</h2>
				</article>

				{/* Подзаголовок */}
				<p
					ref={animateRefs.subtitleRef}
					className='text-xl md:text-2xl text-neutral-950 dark:text-white max-w-4xl font-thin'
				>
					{hero.thesis}
				</p>

				<div
					ref={animateRefs.ctaRef}
					className='flex justify-center gap-4 max-md:flex-col'
				>
					<Button
						square={false}
						onClick={handleCTAClick}
						ariaLabelDesc='Перейти к осуждению своего кейса'
					>
						Обсудить проект
					</Button>

					<Button
						square={true}
						onClick={() => navigate('/cases')}
						styles='gap-2'
						ariaLabelDesc='Кейсы ITDextra'
					>
						Посмотреть кейсы
						<ArrowRightToLine strokeWidth={1} size={20} />
					</Button>
				</div>

				{/* Факты */}
				<div
					ref={animateRefs.trustRef}
					className='flex flex-wrap justify-center items-center gap-6 md:gap-12 text-gray-400'
				>
					{hero.description.map((desc, index) => (
						<div
							key={desc}
							className={cn(
								'relative',
								index !== hero.description.length - 1 &&
									"after:hidden md:after:block after:absolute after:-right-6 after:top-1/2 after:-translate-y-1/2 after:content-['•']"
							)}
						>
							{desc}
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
