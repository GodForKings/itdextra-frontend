import type { AnimateFAQBlockRefs, AnimateFAQSectionRefs } from './types'

/**
 * Анимация FAQ секции
 * @param refs объект рефов
 * @returns очистку
 */
export const animateFAQSection = async (refs: AnimateFAQSectionRefs) => {
	try {
		const [section, title, cardsAnswer] = [
			refs.section?.current,
			refs.title?.current,
			refs.cardsAnswerRefs?.current,
		]

		if (!section || !title || !cardsAnswer.length) return

		const { gsap } = await import('gsap')
		const { ScrollTrigger } = await import('gsap/ScrollTrigger')
		const { SplitText } = await import('gsap/SplitText')
		gsap.registerPlugin(SplitText, ScrollTrigger)

		let titleSplit = new SplitText(title, { type: 'chars,words' })

		const FAQTl = gsap
			.timeline({
				scrollTrigger: {
					trigger: section,
					start: 'top center',
					toggleActions: 'play none none none',
				},
				defaults: { ease: 'power4.inOut', duration: 1 },
			})
			.fromTo(
				titleSplit.chars,
				{ y: -20, opacity: 0, rotationY: 90 },
				{
					y: 0,
					opacity: 1,
					rotationY: 0,
					stagger: { from: 'end', each: 0.04 },
				},
				0
			)
			.fromTo(
				cardsAnswer,
				{ x: -50, opacity: 0 },
				{ x: 0, opacity: 1, stagger: 0.1, duration: 0.8 },
				0.5
			)

		return () => {
			FAQTl.kill()
			titleSplit && titleSplit.revert()
		}
	} catch (error: unknown) {
		console.log(`animate error: ${error}`)
	}
}

export const animateFAQBlock = async (
	refs: AnimateFAQBlockRefs,
	isOpen: boolean
) => {
	try {
		const [content, icon] = [refs.contentRef?.current, refs.iconRef?.current]

		if (!content || !icon) return

		const { gsap } = await import('gsap')

		const blockTl = gsap.timeline({
			defaults: { duration: 0.6, ease: 'power4.inOut' },
		})

		if (isOpen) {
			blockTl
				.fromTo(
					content,
					{ height: 0, opacity: 0 },
					{ height: 'auto', opacity: 1 }
				)
				.to(icon, { rotation: 180, scale: 1.1 }, 0)
		} else {
			blockTl
				.to(content, { height: 0, opacity: 0 })
				.to(icon, { rotation: 180, scale: 1 }, 0)
		}

		return () => {
			blockTl.kill()
		}
	} catch (error: unknown) {
		console.log(`animate error: ${error}`)
	}
}
