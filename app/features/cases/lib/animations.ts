import type { CasesAnimationRefs, SectionAnimationRefs } from './types'

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

	const [section, title, subtitle, cases, button] = [
		refs.sectionRef?.current,
		refs.titleRef?.current,
		refs.subtitleRef?.current,
		refs.casesRef?.current,
		refs.buttonRef?.current,
	]

	if (section && title && subtitle && cases.length && button) {
		const masterTL = gsap
			.timeline({
				scrollTrigger: {
					trigger: section,
					start: 'top 60%',
					toggleActions: 'play none none none',
				},
				defaults: { ease: 'power4.out' },
			})
			// Анимация заголовка
			.fromTo(
				title,
				{ opacity: 0, y: -150 },
				{ opacity: 1, y: 0, duration: 0.8 }
			)
			// Подзаголовок
			.fromTo(
				subtitle,
				{ opacity: 0, y: 30 },
				{ opacity: 1, y: 0, duration: 0.6 },
				'-=0.4'
			)
			// Кнопка(и)
			.fromTo(
				button,
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 0.6 },
				'+=1'
			)

		// Анимация кейсов
		cases.forEach((caseEl, index) => {
			if (!caseEl) return

			const caseTL = gsap
				.timeline({
					scrollTrigger: {
						trigger: caseEl,
						start: 'top 70%',
						toggleActions: 'play none none none',
					},
					defaults: { ease: 'back.out' },
				})

				.fromTo(
					caseEl,
					{ opacity: 0, x: index % 2 ? 50 : -50, filter: 'blur(5px)' },
					{ opacity: 1, x: 0, filter: 'blur(0)', duration: 0.5 }
				)

			return () => {
				caseTL.kill()
				ScrollTrigger.getAll().forEach(el => el.kill())
			}
		})

		// Очистка анимаций
		return () => {
			masterTL.kill()
			ScrollTrigger.getAll().forEach((trigger: ScrollTrigger) => trigger.kill())
		}
	} else return
}

/**
 * анимация секции кейсов на собственной странице
 * @param refs рефы для анимаций
 * @returns
 */
export const animateCaseStudies = async (refs: CasesAnimationRefs) => {
	const [section, title, tagBlock, tags, cards] = [
		refs.section?.current,
		refs.title?.current,
		refs.tagBlock?.current,
		refs.tags?.current,
		refs.cards?.current,
	]
	const { gsap } = await import('gsap')

	if (section && title && tagBlock && tags.length && cards.length) {
		const caseHelloTl = gsap
			.timeline({
				defaults: { ease: 'power4.inOut', duration: 0.8 },
			})
			.fromTo(
				title,
				{ opacity: 0, y: 40 },
				{ opacity: 1, y: 0, textShadow: '0 0 10px rgb(0,240,255)' }
			)
			.fromTo(tagBlock, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, '0')
			.fromTo(
				tags.filter(el => !!el),
				{ opacity: 0, scale: 0.85 },
				{ opacity: 1, scale: 1, stagger: 0.04 },
				'0'
			)
			.fromTo(
				cards.filter(el => !!el),
				{ opacity: 0, y: -60, scale: 0.9 },
				{ opacity: 1, y: 0, scale: 1, stagger: 0.2 },
				'-=1'
			)

		return () => {
			caseHelloTl.kill()
		}
	}
}
