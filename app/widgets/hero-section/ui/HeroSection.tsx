import type { FC } from 'react'

import { useEffect, useRef } from 'react'
import { useUnit } from 'effector-react'
import { gsap } from 'gsap'
import { useNavigate } from 'react-router'

import { cn, Button } from '~/shared'
import { heroSectionModel } from '../model/heroSection'

export const HeroSection: FC = () => {
	const hero = useUnit(heroSectionModel.stores.$heroSection)

	// Рефы для анимаций
	const heroRef = useRef<HTMLDivElement>(null)
	const titleRef = useRef<HTMLHeadingElement>(null)
	const subtitleRef = useRef<HTMLParagraphElement>(null)
	const ctaRef = useRef<HTMLDivElement>(null)
	const trustRef = useRef<HTMLDivElement>(null)

	const navigate = useNavigate()

	// Анимации при загрузке
	useEffect(() => {
		const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

		// Фоновая сетка (опционально)
		heroRef.current &&
			tl.fromTo(heroRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 })

		// Заголовок
		titleRef.current &&
			tl.fromTo(
				titleRef.current,
				{ y: -100, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.8 },
				'-=0.5'
			)

		// Подзаголовок
		subtitleRef.current &&
			tl.fromTo(
				subtitleRef.current,
				{ x: 100, opacity: 0 },
				{ x: 0, opacity: 1, duration: 0.8 },
				'-=0.3'
			)

		// Кнопки
		ctaRef.current &&
			tl.fromTo(
				ctaRef.current,
				{ scale: 0.9, opacity: 0, filter: 'blur(1px)' },
				{ scale: 1, opacity: 1, filter: 'blur(0)', duration: 0.6 },
				'-=0.2'
			)

		// нижние индикаторы
		trustRef.current &&
			tl.fromTo(
				trustRef.current,
				{ opacity: 0 },
				{ opacity: 1, duration: 1 },
				'-=0.4'
			)

		return () => {
			if (tl) {
				tl.kill()
			}
		}
	}, [])

	return (
		<section
			ref={heroRef}
			className={cn(
				'min-h-[90dvh] m-5 p-4 sm:p-8 relative overflow-hidden rounded-lg bg-gray-950/[2.5%] after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:inset-ring after:inset-ring-gray-950/5 dark:after:inset-ring-white/10 bg-[image:radial-gradient(var(--pattern-fg)_1px,_transparent_0)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-white)]/10'
			)}
		>
			<div className='container mx-auto px-4 py-24 md:py-32 lg:py-40 max-w-4xl text-center flex flex-col justify-center items-center gap-12'>
				<h1 ref={titleRef} className='text-4xl md:text-6xl mb-6'>
					<span className='text-transparent bg-clip-text bg-gradient-to-r from-sky-800 to-neutral-950 dark:from-white dark:to-sky-700'>
						{hero.slogan}
					</span>
				</h1>

				<p
					ref={subtitleRef}
					className='text-xl md:text-2xl text-neutral-950 dark:text-slate-200 max-w-3xl mx-auto'
				>
					{hero.thesis}
				</p>

				<div
					ref={ctaRef}
					className='flex flex-col justify-center gap-4 sm:flex-row'
				>
					<Button square={false} onClick={() => navigate('/contacts')}>
						Обсудить проект
					</Button>

					<Button square={true} onClick={() => navigate('/cases')}>
						Посмотреть кейсы
					</Button>
				</div>

				<div
					ref={trustRef}
					className='flex flex-wrap justify-center items-center gap-6 text-gray-500'
				>
					<div>{hero.description[0]}</div>

					<div className='hidden sm:block'>•</div>

					<div>{hero.description[1]}</div>

					<div className='hidden sm:block'>•</div>

					<div>{hero.description[2]}</div>
				</div>
			</div>
		</section>
	)
}
