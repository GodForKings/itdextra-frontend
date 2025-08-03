import type { animateHeroRefs } from './types'

/**
 * Анимация первой секции на главной странице
 * @param refs Принимает объект содержащий элементы для анимаций
 * @returns Promise пустой
 */
export const animateHero = async (
	refs: animateHeroRefs
): Promise<(() => void) | undefined> => {
	const { heroRef, nameRef, titleRef, subtitleRef, ctaRef, trustRef } = refs

	if (
		!heroRef.current ||
		!nameRef.current ||
		!titleRef.current ||
		!subtitleRef.current ||
		!ctaRef.current ||
		!trustRef.current
	)
		return undefined

	const { gsap } = await import('gsap')

	const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

	// Фоновая сетка
	heroTl.fromTo(heroRef.current, { opacity: 0 }, { opacity: 1, duration: 0.7 })

	// Эффект цифрового появления
	nameRef.current.forEach((letter: HTMLSpanElement | null, index: number) => {
		heroTl.fromTo(
			letter,
			{
				filter: 'blur(8px)',
				scale: 0.7 / (index + 1),
				y: index % 2 ? index * 44 : -index * 14,
			},
			{
				duration: 0.3,
				filter: 'blur(0px)',
				scale: 1,
				y: 0,
				x: 0,
				delay: index * 0.03,
				onStart: () => {
					// Эффект при появлении
					gsap.to(letter, {
						duration: 0.1,
						x: '+=15',
						repeat: 3,
						yoyo: true,
						ease: 'sine.inOut',
					})
				},
			},
			'<0.2'
		)
	})

	// Заголовок
	heroTl
		.fromTo(
			titleRef.current,
			{ opacity: 0, scale: 0.7 },
			{ opacity: 1, scale: 1, duration: 0.7 },
			'-=0.5'
		)

		// Финальные эффекты для всего названия
		.to(nameRef.current, {
			duration: 1,
			scale: 0.5,
			yoyo: true,
			repeat: 1,
			ease: 'sine.inOut',
			stagger: 0.1,
		})

		// Подзаголовок
		.fromTo(
			subtitleRef.current,
			{ x: 30, opacity: 0 },
			{ x: 0, opacity: 1, duration: 0.8 },
			'-=2.5'
		)

		// Кнопки
		.fromTo(
			ctaRef.current,
			{ scale: 0.9, opacity: 0, x: -30 },
			{ scale: 1, opacity: 1, x: 0, duration: 1 },
			'-=1'
		)

		// Нижние индикаторы
		.fromTo(
			trustRef.current,
			{ opacity: 0 },
			{ opacity: 1, duration: 1 },
			'-=1.4'
		)

	return () => {
		heroTl.kill()
	}
}
