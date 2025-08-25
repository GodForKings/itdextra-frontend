import type { AnimateModalRefs, SectionAnimationRefs } from './types'

/**
 * Функция анимации секции
 * @param refs Объект с рефами элементов
 * @returns Функция для очистки анимации
 */
export const animateSection = async (
	refs: SectionAnimationRefs
): Promise<(() => void) | undefined> => {
	try {
		const [sectionRef, titleRef, cardsRef] = [
			refs.sectionRef?.current,
			refs.titleRef?.current,
			refs.cardsRef?.current,
		]

		if (!sectionRef || !titleRef || cardsRef.length === 0) return

		const { gsap } = await import('gsap')
		const { ScrollTrigger } = await import('gsap/ScrollTrigger')
		gsap.registerPlugin(ScrollTrigger)

		const serviceTl = gsap
			.timeline({
				scrollTrigger: {
					trigger: sectionRef,
					start: 'top center',
					end: 'center center',
					toggleActions: 'play none reverse none',
					scrub: true,
				},
				defaults: { ease: 'sine.out', duration: 0.8 },
			})
			.fromTo(
				titleRef,
				{
					opacity: 0,
					y: -100,
					scale: 0.9,
					filter: 'blur(10px)',
				},
				{
					opacity: 1,
					y: 0,
					scale: 1,
					filter: 'blur(0px)',
				}
			)
			// Карточек
			.fromTo(
				cardsRef,
				{ opacity: 0, x: -100, scale: 0.9, filter: 'blur(4px)' },
				{
					opacity: 1,
					x: 0,
					scale: 1,
					stagger: 0.5,
					filter: 'blur(0px)',
				},
				'-=0.5'
			)

		return () => {
			serviceTl.kill()
			serviceTl.scrollTrigger?.kill()
		}
	} catch (error: unknown) {
		console.log(`animate error ${error}`)
		return
	}
}

/**
 * Функция анимации модального окна
 * @param refs объект с рефами элементов
 * @returns
 */
export const animateModalForService = async (refs: AnimateModalRefs) => {
	try {
		const [
			modal,
			title,
			description,
			category,
			priceRange,
			deliveryTime,
			tags,
			caseStudies,
		] = [
			refs.modal?.current,
			refs.title?.current,
			refs.description?.current,
			refs.category?.current,
			refs.priceRange?.current,
			refs.deliveryTime?.current,
			refs.tags?.current,
			refs.caseStudies?.current,
		]
		if (
			!modal ||
			!title ||
			!description ||
			!category ||
			!priceRange ||
			!deliveryTime ||
			tags.length === 0 ||
			caseStudies.length === 0
		)
			return

		const { gsap } = await import('gsap')
		const { SplitText } = await import('gsap/SplitText')
		gsap.registerPlugin(SplitText)

		let descSplit = new SplitText(description, { type: 'words' })

		const modalTl = gsap
			.timeline({ defaults: { ease: 'expo.in', duration: 0.5 } })

			.fromTo(modal, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1 })
			.fromTo(
				title,
				{ opacity: 0, y: 30 },
				{ opacity: 1, y: 0, textShadow: '0 0 15px rgba(125, 211, 252, 0.8)' }
			)
			.fromTo(
				descSplit.words,
				{
					scale: 'random(0, 0.4)',
					y: 'random(-40, 20)',
				},
				{
					y: 0,
					scale: 1,
					stagger: {
						from: 'random',
						amount: 1,
					},
					duration: 0.8,
				},
				0
			)
			.fromTo(category, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, '-=0.5')
			.fromTo(priceRange, { opacity: 0, y: 20 }, { opacity: 1, y: 0 })
			.fromTo(deliveryTime, { opacity: 0, y: 20 }, { opacity: 1, y: 0 })
			.fromTo(
				tags.filter(el => !!el),
				{ opacity: 0, y: -40 },
				{ opacity: 1, y: 0, stagger: 0.1 },
				'-=0.5'
			)
			.fromTo(
				caseStudies.filter(el => !!el),
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, stagger: 0.15 },
				'-=0.5'
			)
		/* Чистим на выходе */
		return () => {
			modalTl.kill()
		}
	} catch (error: unknown) {
		console.log(`animate error ${error}`)
		return
	}
}
