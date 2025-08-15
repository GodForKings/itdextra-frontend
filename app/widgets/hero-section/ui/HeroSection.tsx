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
		titleRef: useRef<HTMLHeadingElement>(null),
		subtitleRef: useRef<HTMLParagraphElement>(null),
		ctaRef: useRef<HTMLDivElement>(null),
		trustRef: useRef<HTMLDivElement>(null),
	}

	const handleCTAClick = useCTAModal()

	const navigate = useNavigate()

	useEffect(() => {
		/* Для работы только на клиенте */
		if (typeof window === 'undefined') return

		animateHero(animateRefs).catch(console.error)
	}, [])

	return (
		<section
			role='banner'
			aria-labelledby='main-hero-heading'
			ref={animateRefs.heroRef}
			className={cn(
				'relative min-h-[80dvh] m-5 p-4 md:p-8 overflow-hidden rounded-lg bg-gray-950/[2.5%] after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:inset-ring after:inset-ring-gray-950/5 dark:after:inset-ring-white/10 bg-[image:radial-gradient(var(--pattern-fg)_1px,_transparent_0)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-white)]/10'
			)}
		>
			<div className='container mx-auto px-4 py-20 md:py-28 max-w-4xl text-center flex flex-col justify-center items-center gap-6 lg:gap-12'>
				{/* Заголовок */}
				<article className='relative flex flex-col items-center justify-center gap-2 will-change-transform'>
					<h1 className='flex text-6xl md:text-8xl gap-0.25'>
						{hero.name.map((letter, index) => (
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
						ref={animateRefs.titleRef}
						className={cn(
							'text-4xl md:text-6xl',
							'text-transparent bg-clip-text bg-gradient-to-l from-sky-500 to-neutral-950 dark:from-sky-500 dark:to-sky-50'
						)}
					>
						{hero.slogan}
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
					<Button square={false} onClick={handleCTAClick}>
						Обсудить проект
					</Button>

					<Button
						square={true}
						onClick={() => navigate('/cases')}
						styles='gap-2'
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
