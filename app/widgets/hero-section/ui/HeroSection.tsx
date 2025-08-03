import type { FC } from 'react'

import { useEffect, useRef } from 'react'
import { useUnit } from 'effector-react'
import { useNavigate } from 'react-router'

import { cn, Button } from '~/shared'
import { heroSectionModel } from '../model/heroSection'
import { animateHero } from '../lib/animations'

export const HeroSection: FC = () => {
	const hero = useUnit(heroSectionModel.stores.$heroSection)

	/* Рефы для анимаций */
	const heroRef = useRef<HTMLDivElement>(null)
	const nameRef = useRef<(HTMLSpanElement | null)[]>([])
	const titleRef = useRef<HTMLHeadingElement>(null)
	const subtitleRef = useRef<HTMLParagraphElement>(null)
	const ctaRef = useRef<HTMLDivElement>(null)
	const trustRef = useRef<HTMLDivElement>(null)

	const navigate = useNavigate()

	useEffect(() => {
		/* Для работы только на клиенте */
		if (typeof window === 'undefined') return

		animateHero({
			heroRef,
			nameRef,
			titleRef,
			subtitleRef,
			ctaRef,
			trustRef,
		})
	}, [])

	return (
		<section
			role='banner'
			aria-labelledby='main-hero-heading'
			ref={heroRef}
			className={cn(
				'relative min-h-[80dvh] m-5 p-4 sm:p-8 overflow-hidden rounded-lg bg-gray-950/[2.5%] after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:inset-ring after:inset-ring-gray-950/5 dark:after:inset-ring-white/10 bg-[image:radial-gradient(var(--pattern-fg)_1px,_transparent_0)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-white)]/10'
			)}
		>
			<div className='container mx-auto px-4 py-20 md:py-28 max-w-4xl text-center flex flex-col justify-center items-center gap-6 lg:gap-12'>
				{/* Заголовок */}
				<article className='relative flex flex-col items-center justify-center gap-2 will-change-transform'>
					<h1 className='flex text-6xl md:text-8xl gap-0.25'>
						{hero.name.map((letter, index) => (
							<span
								ref={(element: HTMLSpanElement | null) => {
									if (element) nameRef.current[index] = element
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

					<h2 ref={titleRef} className='text-4xl md:text-6xl'>
						<span className='text-transparent bg-clip-text bg-gradient-to-l from-sky-500 to-neutral-950 dark:from-sky-500 dark:to-sky-50'>
							{hero.slogan}
						</span>
					</h2>
				</article>

				{/* Подзаголовок */}
				<p
					ref={subtitleRef}
					className='text-xl md:text-2xl text-neutral-950 dark:text-slate-50 max-w-3xl'
				>
					{hero.thesis}
				</p>

				<div ref={ctaRef} className='flex justify-center gap-4 max-md:flex-col'>
					<Button square={false} onClick={() => navigate('/contacts')}>
						Обсудить проект
					</Button>

					<Button square={true} onClick={() => navigate('/cases')}>
						Посмотреть кейсы
					</Button>
				</div>

				{/* Факты */}
				<div
					ref={trustRef}
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
