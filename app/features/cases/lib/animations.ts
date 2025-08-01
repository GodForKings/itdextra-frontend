import type { SectionAnimationRefs } from './types'

/**
 * Функция анимации секции
 * @param refs Объект с рефами элементов
 * @returns Функция для очистки анимации
 */
export const animateSection = async (
	refs: SectionAnimationRefs
): Promise<() => void> => {
	const { sectionRef, titleRef, subtitleRef, casesRef, buttonRef } = refs

	const { gsap } = await import('gsap')
	const { ScrollTrigger } = await import('gsap/ScrollTrigger')
	gsap.registerPlugin(ScrollTrigger)

	const masterTL = gsap.timeline({
		scrollTrigger: {
			trigger: sectionRef.current,
			start: 'top 60%',
			toggleActions: 'play none none none',
		},
		defaults: { ease: 'power4.out' },
	})

	// Анимация заголовка
	masterTL.fromTo(
		titleRef.current,
		{ opacity: 0, y: -150 },
		{ opacity: 1, y: 0, duration: 0.8 }
	)

	// Подзаголовок
	masterTL.fromTo(
		subtitleRef.current,
		{ opacity: 0, y: 30 },
		{ opacity: 1, y: 0, duration: 0.6 },
		'-=0.4'
	)

	// Кнопка(и)
	masterTL.fromTo(
		buttonRef.current,
		{ opacity: 0, y: 20 },
		{ opacity: 1, y: 0, duration: 0.6 },
		'+=1.5'
	)

	// Анимация кейсов
	casesRef.current?.forEach((caseEl, index) => {
		if (!caseEl) return

		const caseTL = gsap.timeline({
			scrollTrigger: {
				trigger: caseEl,
				start: 'top 70%',
				toggleActions: 'play none none none',
			},
			defaults: { ease: 'power1.out' },
		})

		caseTL.fromTo(
			caseEl,
			{ opacity: 0, x: index % 2 ? 50 : -50, filter: 'blur(5px)' },
			{ opacity: 1, x: 0, filter: 'blur(0)', duration: 0.5 }
		)
	})

	// Очистка анимаций
	return () => {
		masterTL.kill()
		ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) => trigger.kill())
	}
}
