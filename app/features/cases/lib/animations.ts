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

interface AnimateRefs {
	section: React.RefObject<HTMLElement | null>
	title: React.RefObject<HTMLHeadingElement | null>
	tagBlock: React.RefObject<HTMLDivElement | null>
	tags: React.RefObject<(HTMLButtonElement | null)[]>
	cards: React.RefObject<(HTMLDivElement | null)[]>
}
/**
 * анимация секции кейсов на собственной странице
 * @param param
 * @returns
 */
export const animateCaseStudies = async ({
	section,
	title,
	tagBlock,
	tags,
	cards,
}: AnimateRefs) => {
	if (!section.current) return

	const { gsap } = await import('gsap')
	const { ScrollTrigger } = await import('gsap/ScrollTrigger')
	gsap.registerPlugin(ScrollTrigger)

	const ctx = gsap.context(() => {
		// Анимация заголовка
		if (title.current) {
			gsap.fromTo(
				title.current,
				{ opacity: 0, y: 60, textShadow: '0 0 0px rgba(229, 231, 235, 0)' },
				{
					opacity: 1,
					y: 0,
					textShadow: '0 0 20px rgba(229, 231, 235, 0.5)',
					duration: 1.2,
					ease: 'power4.out',
					scrollTrigger: {
						trigger: section.current,
						start: 'top 85%',
					},
				}
			)
		}

		// Анимация блока фильтров
		if (tagBlock.current) {
			gsap.fromTo(
				tagBlock.current,
				{ opacity: 0, y: 40 },
				{
					opacity: 1,
					y: 0,
					duration: 1,
					ease: 'power4.out',
					delay: 0.3,
					scrollTrigger: {
						trigger: section.current,
						start: 'top 85%',
					},
				}
			)
		}

		// Анимация тегов
		if (tags.current.length) {
			gsap.fromTo(
				tags.current.filter((el): el is HTMLButtonElement => el !== null),
				{ opacity: 0, scale: 0.85 },
				{
					opacity: 1,
					scale: 1,
					duration: 0.8,
					stagger: 0.12,
					ease: 'back.out(1.4)',
					delay: 0.5,
					scrollTrigger: {
						trigger: section.current,
						start: 'top 85%',
					},
				}
			)
		}

		// Анимация карточек
		if (cards.current.length) {
			gsap.fromTo(
				cards.current.filter((el): el is HTMLDivElement => el !== null),
				{
					opacity: 0,
					y: 60,
					scale: 0.95,
					boxShadow: '0 0 0px rgba(229, 231, 235, 0)',
				},
				{
					opacity: 1,
					y: 0,
					scale: 1,
					boxShadow: '0 0 20px rgba(229, 231, 235, 0.3)',
					duration: 1,
					stagger: 0.2,
					ease: 'power4.out',
					delay: 0.7,
					scrollTrigger: {
						trigger: section.current,
						start: 'top 85%',
					},
				}
			)
		}
	})

	return () => ctx.revert()
}
