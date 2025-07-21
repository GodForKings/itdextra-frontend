import type { SectionAnimationRefs } from './types'

export const animateSection = async (
	refs: SectionAnimationRefs
): Promise<(() => void) | undefined> => {
	const { sectionRef, sloganRef, thesisRef, plusesRef } = refs

	const { gsap } = await import('gsap')
	const { ScrollTrigger } = await import('gsap/ScrollTrigger')
	gsap.registerPlugin(ScrollTrigger)

	// все элементы присутствуют ?
	if (
		!sectionRef.current ||
		!sloganRef.current ||
		!thesisRef.current ||
		plusesRef.current.length === 0
	)
		return

	// Главный timeline для секции и триггер
	const whyMainTl = gsap.timeline({
		scrollTrigger: {
			trigger: sectionRef.current,
			start: 'top 40%',
			toggleActions: 'play none none none',
		},
		defaults: { ease: 'back.out' },
	})

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
	plusesRef.current.forEach((plus, index) => {
		if (!plus) return
		whyMainTl.fromTo(
			plus,
			{
				x: 70,
				opacity: 0,
			},
			{ x: 0, opacity: 1, ease: 'sine.out' }
		)
	})

	return () => {
		/* Чистим на выходе */
		whyMainTl.kill()
		ScrollTrigger.getAll().forEach(el => el.kill())
	}
}
