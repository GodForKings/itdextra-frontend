import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { cn } from '~/shared'

export const LinearStyleHero = () => {
	const heroRef = useRef<HTMLDivElement>(null)
	const titleRef = useRef<HTMLHeadingElement>(null)
	const subtitleRef = useRef<HTMLParagraphElement>(null)
	const ctaRef = useRef<HTMLDivElement>(null)
	const blurLayerRef = useRef<HTMLDivElement>(null)

	// Анимации при загрузке
	useEffect(() => {
		const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

		// Фоновый блюр (параллакс-эффект)
		tl.fromTo(
			blurLayerRef.current,
			{ opacity: 0, filter: 'blur(0px)' },
			{ opacity: 1, filter: 'blur(12px)', duration: 1.5 }
		)

		// Заголовок
		tl.fromTo(
			titleRef.current,
			{ y: -30, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.8 },
			'-=0.5'
		)

		// Подзаголовок
		tl.fromTo(
			subtitleRef.current,
			{ y: 20, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.8 },
			'-=0.3'
		)

		// Кнопки
		tl.fromTo(
			ctaRef.current,
			{ scale: 0.95, opacity: 0 },
			{ scale: 1, opacity: 1, duration: 0.6 },
			'-=0.2'
		)

		// Параллакс при скролле
		if (blurLayerRef.current) {
			gsap.to(blurLayerRef.current, {
				opacity: 1,
				scrollTrigger: {
					trigger: heroRef.current,
					start: 'top bottom',
					end: 'bottom top',
					scrub: true,
				},
			})
		}
	}, [])

	return (
		<section
			ref={heroRef}
			className='relative bg-gray-950 text-white overflow-hidden'
		>
			{/* Фоновый слой с блюром */}
			<div
				ref={blurLayerRef}
				className={cn(
					'absolute inset-0 bg-cover opacity-80 bg-gradient-to-bl from-sky-800 to-neutral-950'
				)}
			/>

			{/* Основной контент */}
			<div className='container mx-auto px-4 py-32 lg:py-48 relative z-10'>
				<div className='max-w-3xl mx-auto text-center'>
					{/* Заголовок */}
					<h1 ref={titleRef} className='text-5xl md:text-7xl font-bold mb-6'>
						<span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500'>
							Решения для тех, кто хочет быть лидером
						</span>
					</h1>

					{/* Подзаголовок */}
					<p
						ref={subtitleRef}
						className='text-xl md:text-2xl text-gray-300 mb-10'
					>
						Простота и мощность — без компромиссов.
						<br />
						<span className='text-blue-300'>
							Начните работать быстрее уже сегодня.
						</span>
					</p>

					{/* CTA */}
					<div
						ref={ctaRef}
						className='flex flex-col sm:flex-row justify-center gap-4'
					>
						<button className='bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 py-3 rounded-none transition-all duration-300'>
							Старт →
						</button>

						<button className='bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-3 rounded-none transition-all duration-300'>
							Мы
						</button>
					</div>
				</div>
			</div>
		</section>
	)
}
