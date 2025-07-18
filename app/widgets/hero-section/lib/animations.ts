import type { animateHeroRefs } from './types'

/**
 * Анимация первой секции на главной странице
 * @param refs Принимает объект содержащий элементы для анимаций
 * @returns Promise пустой
 */
export const animateHero = async (
	refs: animateHeroRefs
): Promise<() => void> => {
	const { heroRef, titleRef, subtitleRef, ctaRef, trustRef } = refs

	const { gsap } = await import('gsap')

	const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } })

	// Фоновая сетка
	heroRef.current &&
		heroTl.fromTo(heroRef.current, { opacity: 0 }, { opacity: 1, duration: 1 })

	// Заголовок
	titleRef.current &&
		heroTl.fromTo(
			titleRef.current,
			{ y: -100, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.8 },
			'-=0.5'
		)

	// Подзаголовок
	subtitleRef.current &&
		heroTl.fromTo(
			subtitleRef.current,
			{ x: 100, opacity: 0 },
			{ x: 0, opacity: 1, duration: 0.8 },
			'-=0.3'
		)

	// Кнопки
	ctaRef.current &&
		heroTl.fromTo(
			ctaRef.current,
			{ scale: 0.9, opacity: 0, x: -100, filter: 'blur(1px)' },
			{ scale: 1, opacity: 1, x: 0, filter: 'blur(0)', duration: 0.6 },
			'-=0.2'
		)

	// Нижние индикаторы
	trustRef.current &&
		heroTl.fromTo(
			trustRef.current,
			{ opacity: 0 },
			{ opacity: 1, duration: 1 },
			'-=0.4'
		)

	return () => {
		heroTl.kill()
	}
}
