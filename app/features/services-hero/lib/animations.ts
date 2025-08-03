import type { AnimateHeroRefs, AnimateCategoryRefs } from './types'

/**
 * Анимация первой секции на странице услуг
 * @param refs объект с рефами элементов
 */
export const animateHeroServices = async (
	refs: AnimateHeroRefs
): Promise<(() => void) | undefined> => {
	const { gsap } = await import('gsap')

	const [section, name, slogan, tech] = [
		refs?.sectionRef?.current,
		refs?.nameBlock?.current,
		refs?.sloganBlock?.current,
		refs?.techBlock?.current,
	]

	if (section && name && slogan && tech) {
		const heroTl = gsap.timeline({ defaults: { ease: 'back.inOut' } })

		heroTl
			.fromTo(section, { opacity: 0 }, { opacity: 1, duration: 1, delay: 1 })
			.fromTo(
				name,
				{ opacity: 0, scale: 0.9, y: '-20' },
				{ opacity: 1, scale: 1, y: 0, duration: 0.5 },
				'-=0.5'
			)
			.fromTo(
				slogan,
				{ opacity: 0, y: '30' },
				{ opacity: 1, y: 0, duration: 1 }
			)
			.fromTo(tech, { opacity: 0 }, { opacity: 1, duration: 1 }, '-=0.8')

		return () => {
			heroTl.kill()
		}
	} else return
}

/**
 * Анимация секции категорий на странице услуг
 * @param refs объект с рефами элементов
 */
export const animateCategory = async (
	refs: AnimateCategoryRefs
): Promise<(() => void) | undefined> => {
	const { gsap } = await import('gsap')
	const { ScrollTrigger } = await import('gsap/ScrollTrigger')
	gsap.registerPlugin(ScrollTrigger)

	const [section, title, cards, paragraphs] = [
		refs?.section?.current,
		refs?.title?.current,
		refs?.card?.current,
		refs?.paragraphs?.current,
	]

	if (title && cards.length && paragraphs.length) {
		const categoryTl = gsap
			.timeline({
				defaults: { ease: 'power3.out' },
				scrollTrigger: {
					trigger: section,
					start: 'top 50%',
					toggleActions: 'play none none none',
				},
			})
			.fromTo(
				title,
				{ opacity: 0, x: '-30' },
				{ opacity: 1, x: 0, duration: 0.6 }
			)

		cards.forEach((card, index: number) => {
			card &&
				categoryTl.fromTo(
					card,
					{
						x: index % 2 ? '-70' : '70',
						y: index % 2 ? '-50' : '50',
						opacity: 0,
					},
					{ x: 0, y: 0, opacity: 1, duration: 0.4, stagger: 0.15 }
				)
		}, '-=0.6')

		paragraphs.forEach(paragraph => {
			paragraph &&
				categoryTl.fromTo(
					paragraph,
					{ opacity: 0, y: -20 },
					{ opacity: 1, y: 0, duration: 0.5 }
				)
		})
		return () => {
			categoryTl.kill()
			ScrollTrigger.getAll().forEach(el => el.kill())
		}
	}
}
