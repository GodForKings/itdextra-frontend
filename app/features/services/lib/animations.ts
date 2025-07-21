import type { SectionAnimationRefs } from './types'

/**
 * Функция анимации секции
 * @param refs Объект с рефами элементов
 * @returns Функция для очистки анимации
 */
export const animateSection = async (
	refs: SectionAnimationRefs
): Promise<(() => void) | undefined> => {
	const { gsap } = await import('gsap')
	const { ScrollTrigger } = await import('gsap/ScrollTrigger')
	gsap.registerPlugin(ScrollTrigger)

	const { sectionRef, titleRef, cardsRef, glowsRef } = refs

	// Все элементы присутствуют ?
	if (!sectionRef.current || !titleRef.current || cardsRef.current.length === 0)
		return

	// Главный timeline для секции и триггер
	const serviceTl = gsap.timeline({
		scrollTrigger: {
			trigger: sectionRef.current,
			start: 'top 70%',
			toggleActions: 'play none none none',
		},
		defaults: { ease: 'power4.out' },
	})

	// Заголовка
	serviceTl.fromTo(
		titleRef.current,
		{ opacity: 0, x: -100, filter: 'blur(2px)' },
		{ opacity: 1, x: 0, filter: 'blur(0)', duration: 0.8 }
	)

	// Карточек
	serviceTl.fromTo(
		cardsRef.current,
		{ opacity: 0, y: 50 },
		{ opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
		'-=0.3'
	)

	// Фоновых бликов
	glowsRef.current.forEach((glow: HTMLDivElement | null) => {
		if (!glow) return

		gsap.to(glow, {
			x: gsap.utils.random(-100, 100),
			y: gsap.utils.random(-120, 120),
			duration: 8,
			repeat: -1,
			yoyo: true,
			ease: 'power1.out',
		})
	})

	return () => {
		/* Чистим на выходе */
		serviceTl.kill()
		ScrollTrigger.getAll().forEach(st => st.kill())
	}
}
