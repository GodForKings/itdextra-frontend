import type {
	AnimateHeroRefs,
	AnimateCategoryRefs,
	AnimateServicesRefs,
	AnimateCTARefs,
	AnimateModalRefs,
	AnimateServiceModalRef,
} from './types'

/**
 * Анимация Приветственной секции на странице услуг
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
 * Анимация секции Категорий на странице услуг
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

	if (section && title && cards.length && paragraphs.length) {
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
/**
 * Анимация секции Сервисов на странице услуг
 * @param refs объект с рефами элементов
 * @returns
 */
export const animateServices = async (
	refs: AnimateServicesRefs
): Promise<(() => void) | undefined> => {
	const { gsap } = await import('gsap')
	const { ScrollTrigger } = await import('gsap/ScrollTrigger')
	gsap.registerPlugin(ScrollTrigger)

	const [section, title, tagBlock, tags, cards] = [
		refs.section?.current,
		refs.title?.current,
		refs.tagBlock?.current,
		refs.tags?.current,
		refs.cards?.current,
	]

	if (section && title && tagBlock && tags.length && cards.length) {
		const servicesTl = gsap
			.timeline({
				defaults: { ease: 'back.in' },
				scrollTrigger: {
					trigger: section,
					start: 'top 50%',
					toggleActions: 'play none none none',
				},
			})
			.fromTo(title, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.8 })
			.fromTo(
				tagBlock,
				{ opacity: 0, y: -60 },
				{ opacity: 1, y: 1, duration: 0.4 }
			)
		tags.forEach(tag => {
			if (tag)
				servicesTl.fromTo(
					tag,
					{ opacity: 0 },
					{ opacity: 1, duration: 0.15, stagger: 0.1 }
				)
		})
		servicesTl.fromTo(
			cards,
			{
				scale: 0.95,
				y: 40,
				opacity: 0,
			},
			{ scale: 1, y: 0, opacity: 1, duration: 0.4, stagger: 0.25 }
		)

		return () => {
			servicesTl.kill()
			ScrollTrigger.getAll().forEach(el => el.kill())
		}
	}
}

/**
 * Анимация секции CTA на странице услуг
 * @param refs объект с рефами элементов
 * @returns
 */
export const animateCTA = async (
	refs: AnimateCTARefs
): Promise<(() => void) | undefined> => {
	const { gsap } = await import('gsap')
	const { ScrollTrigger } = await import('gsap/ScrollTrigger')
	gsap.registerPlugin(ScrollTrigger)

	const [section, content, title, text] = [
		refs.section?.current,
		refs.contentRef?.current,
		refs.titleRef?.current,
		refs.textRef?.current,
	]

	if (section && title && text) {
		const CTATl = gsap
			.timeline({
				defaults: { ease: 'back.in' },
				scrollTrigger: {
					trigger: section,
					start: 'top 70%',
					toggleActions: 'play none none none',
				},
			})
			.fromTo(content, { opacity: 0, y: 40 }, { opacity: 1, y: 0 })
			.fromTo(title, { opacity: 0, y: 40 }, { opacity: 1, y: 0 })
			.fromTo(text, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1 })

		return () => {
			CTATl.kill()
			ScrollTrigger.getAll().forEach(el => el.kill())
		}
	}
}

/**
 * Анимация модального окна на услугах
 * @param refs объект с рефами элементов
 * @returns
 */
export const animateModal = async (
	refs: AnimateModalRefs
): Promise<(() => void) | undefined> => {
	const { gsap } = await import('gsap')

	const [modal, title, icon, description, benefits, form] = [
		refs.modal?.current,
		refs.title?.current,
		refs.icon?.current,
		refs.description?.current,
		refs.benefits?.current,
		refs.form?.current,
	]

	if (modal && title && icon && description && benefits.length && form) {
		const modalTl = gsap
			.timeline({ defaults: { ease: 'back.inOut', duration: 0.6 } })
			.fromTo(
				modal,
				{ opacity: 0, scale: 0.95 },
				{
					opacity: 1,
					scale: 1,
				}
			)
			.fromTo(
				title,
				{ opacity: 0, y: 30 },
				{
					opacity: 1,
					y: 0,
				}
			)
			.fromTo(
				icon,
				{ opacity: 0, scale: 0.8 },
				{
					opacity: 1,
					scale: 1,
				}
			)
			.fromTo(
				description,
				{ opacity: 0, y: 20 },
				{
					opacity: 1,
					y: 0,
				}
			)
			.fromTo(
				benefits,
				{ opacity: 0, y: 20 },
				{
					opacity: 1,
					y: 0,
					stagger: 0.15,
				}
			)
			.fromTo(
				form,
				{ opacity: 0, y: 20 },
				{
					opacity: 1,
					y: 0,
					duration: 0.7,
				},
				'-=1'
			)

		return () => {
			modalTl.kill()
		}
	}
}

export const animateServiceModalContent = async (
	refs: AnimateServiceModalRef
) => {
	const { gsap } = await import('gsap')

	const [
		modal,
		title,
		icon,
		description,
		category,
		priceRange,
		deliveryTime,
		tags,
		caseStudies,
		form,
	] = [
		refs.modal?.current,
		refs.title?.current,
		refs.icon?.current,
		refs.description?.current,
		refs.category?.current,
		refs.priceRange?.current,
		refs.deliveryTime?.current,
		refs.tags?.current,
		refs.caseStudies?.current,
		refs.form?.current,
	]

	if (
		modal &&
		title &&
		icon &&
		description &&
		category &&
		priceRange &&
		deliveryTime &&
		tags.length &&
		caseStudies.length &&
		form
	) {
		const modalServiceTl = gsap
			.timeline({ defaults: { ease: 'back.in', duration: 0.6 } })
			.fromTo(modal, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1 })
			.fromTo(
				title,
				{ opacity: 0, y: 30 },
				{
					opacity: 1,
					y: 0,
				}
			)
			.fromTo(
				icon,
				{ opacity: 0, scale: 0.8 },
				{
					opacity: 1,
					scale: 1,
				}
			)
			.fromTo(description, { opacity: 0, y: 20 }, { opacity: 1, y: 0 })
			.fromTo(category, { opacity: 0, y: 20 }, { opacity: 1, y: 0 })
			.fromTo(priceRange, { opacity: 0, y: 20 }, { opacity: 1, y: 0 })
			.fromTo(
				deliveryTime,
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0 },
				'-=0.6'
			)
			.fromTo(
				tags.filter((el): el is HTMLSpanElement => el !== null),
				{ opacity: 0, y: 20 },
				{
					opacity: 1,
					y: 0,
					stagger: 0.1,
				},
				'-=1'
			)
			.fromTo(
				caseStudies.filter((el): el is HTMLLIElement => el !== null),
				{ opacity: 0, y: 20 },
				{
					opacity: 1,
					y: 0,
					stagger: 0.15,
				}
			)
			.fromTo(
				form,
				{ opacity: 0, y: 20 },
				{
					opacity: 1,
					y: 0,
				},
				'-=1'
			)

		return () => {
			modalServiceTl.kill()
		}
	}
}
