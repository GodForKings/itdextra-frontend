import type { SectionAnimationRefs } from './types'

/**
 * анимация секции почему мы?
 * @param refs Объект с рефами элементов
 * @returns Функция для очистки анимации
 */
export const animateSection = async (
	refs: SectionAnimationRefs
): Promise<(() => void) | undefined> => {
	try {
		const { sectionRef, sloganRef, thesisRef, plusesRef } = refs

		// все элементы присутствуют ?
		if (
			!sectionRef.current ||
			!sloganRef.current ||
			!thesisRef.current ||
			plusesRef.current.length === 0
		)
			return

		const { gsap } = await import('gsap')
		const { ScrollTrigger } = await import('gsap/ScrollTrigger')
		gsap.registerPlugin(ScrollTrigger)

		const triggers: ScrollTrigger[] = []

		// Главный timeline для секции и триггер
		const whyMainTl = gsap.timeline({
			scrollTrigger: {
				trigger: sectionRef.current,
				start: 'top 80%',
				toggleActions: 'play none none none',
			},
			defaults: { ease: 'back.out' },
		})

		// Сохраняем триггер главной анимации
		if (whyMainTl.scrollTrigger) {
			triggers.push(whyMainTl.scrollTrigger)
		}

		// Слоган
		whyMainTl.fromTo(
			sloganRef.current,
			{ opacity: 0, x: -70 },
			{ opacity: 1, x: 0, duration: 0.5 },
			'+=1'
		)

		// Анимация тезиса WhyUs
		whyMainTl.fromTo(
			thesisRef.current,
			{
				opacity: 0,
				x: -50,
			},
			{ opacity: 1, x: 0 },
			'+=0.4'
		)

		// Анимация Плюсов
		plusesRef.current.forEach(plus => {
			if (!plus) return

			whyMainTl.fromTo(
				plus,
				{
					x: 70,
					opacity: 0,
				},
				{ x: 0, opacity: 1, ease: 'power3.out' }
			)
		})

		return () => {
			whyMainTl.kill()
			triggers.forEach(trigger => trigger.kill())
		}
	} catch (error: unknown) {
		console.error(`Services animation error: ${error}`)
		return
	}
}
