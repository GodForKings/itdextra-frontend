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
