import type {
	AnimateHeroRefs,
	AnimateCategoryRefs,
	AnimateServicesRefs,
	AnimateCTARefs,
	AnimateModalRefs,
	AnimateServiceModalRef,
	AnimateCardRefs,
} from './types'

/**
 * Анимация Приветственной секции на странице услуг
 * @param refs объект с рефами элементов
 */
export const animateHeroServices = async (
	refs: AnimateHeroRefs
): Promise<(() => void) | undefined> => {
	try {
		const { gsap } = await import('gsap')
		const { SplitText } = await import('gsap/SplitText')
		gsap.registerPlugin(SplitText)

		const [section, name, slogan, tech] = [
			refs.sectionRef?.current,
			refs.nameBlock?.current,
			refs.sloganBlock?.current,
			refs.techBlock?.current,
		]

		if (!section || !name || !slogan?.length || !tech) return

		const sloganSplit = new SplitText(slogan, {
			type: 'words,chars',
		})

		const heroTl = gsap.timeline({ defaults: { ease: 'back.out' } })

		heroTl
			.fromTo(section, { opacity: 0 }, { opacity: 1, duration: 1, delay: 1 })
			.fromTo(
				name,
				{ opacity: 0, scale: 0.9, y: '-20' },
				{ opacity: 1, scale: 1, y: 0, duration: 0.5 },
				'-=0.5'
			)
			.fromTo(
				sloganSplit.chars,
				{ y: -80, opacity: 0, rotation: 'random(-60, 60)' },
				{
					y: 0,
					opacity: 1,
					delay: 1.6,
					duration: 0.8,
					rotation: 0,
					stagger: { from: 'random', each: 0.02 },
				},
				0
			)
			.fromTo(tech, { opacity: 0 }, { opacity: 1, duration: 1 }, '-=0.8')

		return () => {
			sloganSplit.revert()
			heroTl.kill()
		}
	} catch (error) {
		console.error('Hero animation error:', error)
		return
	}
}

/**
 * Анимация секции Категорий на странице услуг
 * @param refs объект с рефами элементов
 */
export const animateCategory = async (
	refs: AnimateCategoryRefs
): Promise<(() => void) | undefined> => {
	try {
		const { gsap } = await import('gsap')
		const { ScrollTrigger } = await import('gsap/ScrollTrigger')
		gsap.registerPlugin(ScrollTrigger)

		const [section, title, cards, paragraphs] = [
			refs?.section?.current,
			refs?.title?.current,
			refs?.card?.current,
			refs?.paragraphs?.current,
		]

		if (!section || !title || !cards?.length || !paragraphs?.length) return

		const categoryTl = gsap.timeline({
			defaults: { ease: 'power3.out' },
			scrollTrigger: {
				trigger: section,
				start: 'top 50%',
				toggleActions: 'play none none none',
			},
		})

		const triggers: ScrollTrigger[] = [categoryTl.scrollTrigger!]

		categoryTl.fromTo(
			title,
			{ opacity: 0, x: '-30' },
			{ opacity: 1, x: 0, duration: 0.6 }
		)

		cards.forEach((card, index: number) => {
			if (!card) return

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
			if (!paragraph) return

			categoryTl.fromTo(
				paragraph,
				{ opacity: 0, y: -20 },
				{ opacity: 1, y: 0, duration: 0.5 }
			)
		})

		return () => {
			categoryTl.kill()
			triggers.forEach(trigger => trigger.kill())
		}
	} catch (error) {
		console.error('Category animation error:', error)
		return
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
	try {
		const { gsap } = await import('gsap')
		const { ScrollTrigger } = await import('gsap/ScrollTrigger')
		gsap.registerPlugin(ScrollTrigger)

		const [section, title, tagBlock, tags, serviceWell] = [
			refs.section?.current,
			refs.title?.current,
			refs.tagBlock?.current,
			refs.tags?.current,
			refs.serviceWell?.current,
		]

		if (!section || !title || !tagBlock || !tags?.length || !serviceWell) return

		const servicesTl = gsap.timeline({
			defaults: { ease: 'power4.in', duration: 0.5 },
			scrollTrigger: {
				trigger: section,
				start: 'top center',
				toggleActions: 'play none none none',
			},
		})

		const triggers: ScrollTrigger[] = [servicesTl.scrollTrigger!]

		servicesTl
			.fromTo(title, { opacity: 0, x: 50 }, { opacity: 1, x: 0 })
			.fromTo(tagBlock, { opacity: 0, y: -40 }, { opacity: 1, y: 0 })
			.to(serviceWell, {
				scaleY: 0,
				display: 'none',
				duration: 2,
			})

		tags.forEach(tag => {
			if (!tag) return
			servicesTl.fromTo(
				tag,
				{ opacity: 0, y: 25, scale: 0.8 },
				{
					opacity: 1,
					y: 0,
					scale: 1,
					duration: 0.15,
				}
			)
		})

		return () => {
			servicesTl.kill()
			triggers.forEach(trigger => trigger.kill())
		}
	} catch (error) {
		console.error('Services animation error:', error)
		return
	}
}

/**
 * анимация карточек Услуг
 * @param refs рефы для анимаций
 * @returns
 */
export const animateCardsForServices = async (refs: AnimateCardRefs) => {
	try {
		const cards = refs.cards.current
		if (!cards?.length) {
			return
		}

		const { gsap } = await import('gsap')

		const allTimelines: gsap.core.Timeline[] = []

		const cardTl = gsap
			.timeline({
				defaults: { ease: 'circ.in', duration: 0.8 },
			})
			.fromTo(
				cards,
				{
					opacity: 0,
					scale: 0.9,
					z: -300,
				},
				{
					opacity: 1,
					scale: 1,
					z: 0,
					stagger: { from: 'random', each: 0.1 },
				}
			)

		allTimelines.push(cardTl)

		return () => {
			allTimelines.forEach(tl => tl.kill())
		}
	} catch (error: unknown) {
		console.error('Animation error:', error)
		return
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
	try {
		const { gsap } = await import('gsap')
		const { ScrollTrigger } = await import('gsap/ScrollTrigger')
		gsap.registerPlugin(ScrollTrigger)

		const [section, content, title, text] = [
			refs.section?.current,
			refs.contentRef?.current,
			refs.titleRef?.current,
			refs.textRef?.current,
		]

		if (!section || !content || !title || !text) return

		const CTATl = gsap.timeline({
			defaults: { ease: 'back.in' },
			scrollTrigger: {
				trigger: section,
				start: 'top 70%',
				toggleActions: 'play none none none',
			},
		})

		const triggers: ScrollTrigger[] = [CTATl.scrollTrigger!]

		CTATl.fromTo(content, { opacity: 0, y: 40 }, { opacity: 1, y: 0 })
			.fromTo(title, { opacity: 0, y: 40 }, { opacity: 1, y: 0 })
			.fromTo(text, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1 })

		return () => {
			CTATl.kill()
			triggers.forEach(trigger => trigger.kill())
		}
	} catch (error: unknown) {
		console.error('CTA animation error:', error)
		return
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
	try {
		const { gsap } = await import('gsap')

		const [modal, title, icon, description, benefits, form] = [
			refs.modal?.current,
			refs.title?.current,
			refs.icon?.current,
			refs.description?.current,
			refs.benefits?.current,
			refs.form?.current,
		]

		if (!modal || !title || !icon || !description || !benefits?.length || !form)
			return

		const modalTl = gsap
			.timeline({ defaults: { ease: 'back.inOut', duration: 0.6 } })
			.fromTo(modal, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1 })
			.fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0 })
			.fromTo(icon, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1 })
			.fromTo(description, { opacity: 0, y: 20 }, { opacity: 1, y: 0 })
			.fromTo(
				benefits.filter(benefit => benefit !== null),
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, stagger: 0.15 }
			)
			.fromTo(
				form,
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 0.7 },
				'-=1'
			)

		return () => {
			modalTl.kill()
		}
	} catch (error) {
		console.error('Modal animation error:', error)
		return
	}
}

/**
 * Анимация контента модального окна для соло услуги
 * @param refs объект с рефами элементов
 * @returns
 */
export const animateServiceModalContent = async (
	refs: AnimateServiceModalRef
): Promise<(() => void) | undefined> => {
	try {
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
			!modal ||
			!title ||
			!icon ||
			!description ||
			!category ||
			!priceRange ||
			!deliveryTime ||
			!tags?.length ||
			!caseStudies?.length ||
			!form
		)
			return

		const modalServiceTl = gsap
			.timeline({ defaults: { ease: 'back.in', duration: 0.6 } })
			.fromTo(modal, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1 })
			.fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0 })
			.fromTo(icon, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1 })
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
				tags.filter(el => el !== null),
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, stagger: 0.1 },
				'-=1'
			)
			.fromTo(
				caseStudies.filter(el => el !== null),
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, stagger: 0.15 }
			)
			.fromTo(form, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, '-=1')

		return () => {
			modalServiceTl.kill()
		}
	} catch (error) {
		console.error('Service modal animation error:', error)
		return
	}
}
