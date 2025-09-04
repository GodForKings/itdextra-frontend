import type {
	CardCases3dRefs,
	CasesAnimationRefs,
	ModalDescCaseRefs,
	SectionAnimationRefs,
} from './types'

/**
 * Функция анимации секции
 * @param refs Объект с рефами элементов
 * @returns Функция для очистки анимации
 */
export const animateSection = async (
	refs: SectionAnimationRefs
): Promise<(() => void) | undefined> => {
	try {
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

		if (!section || !title || !subtitle || !cases?.length || !button) {
			return
		}

		const masterTL = gsap
			.timeline({
				scrollTrigger: {
					trigger: section,
					start: 'top center',
					toggleActions: 'play none none none',
				},
				defaults: { ease: 'power4.out', duration: 0.8 },
			})
			.fromTo(title, { opacity: 0, x: 100 }, { opacity: 1, x: 0 })
			.fromTo(subtitle, { opacity: 0, x: -100 }, { opacity: 1, x: 0 })
			.fromTo(button, { opacity: 0, x: 100 }, { opacity: 1, x: 0 })

		const allTimelines: gsap.core.Timeline[] = [masterTL]
		const allTriggers: ScrollTrigger[] = [masterTL.scrollTrigger!]

		cases.forEach((caseEl, index: number) => {
			if (!caseEl) return

			const caseTl = gsap
				.timeline({
					scrollTrigger: {
						trigger: caseEl,
						start: 'top center',
						toggleActions: 'play none none none',
					},
				})
				.fromTo(
					caseEl,
					{
						scale: 0.6,
						x: index % 2 ? 50 : -50,
					},
					{
						scale: 1,
						x: 0,
						opacity: 1,
						ease: 'elastic.inOut',
						duration: 0.6,
					}
				)

			allTimelines.push(caseTl)
			if (caseTl.scrollTrigger) {
				allTriggers.push(caseTl.scrollTrigger)
			}
		})

		return () => {
			allTimelines.forEach(tl => tl.kill())
			allTriggers.forEach(trigger => trigger.kill())
		}
	} catch (error) {
		console.error('Animation error:', error)
		return
	}
}

/**
 * анимация секции кейсов на собственной странице
 * @param refs рефы для анимаций
 * @returns
 */
export const animateCaseStudies = async (
	refs: CasesAnimationRefs
): Promise<(() => void) | undefined> => {
	try {
		const [section, title, tagBlock, tags] = [
			refs.section?.current,
			refs.title?.current,
			refs.tagBlock?.current,
			refs.tags?.current,
		]

		if (!section || !title || !tagBlock || !tags?.length) {
			return
		}

		const { gsap } = await import('gsap')

		const caseHelloTl = gsap
			.timeline({
				defaults: { ease: 'power4.inOut', duration: 0.7 },
			})
			.fromTo(
				title,
				{ opacity: 0, y: 40 },
				{ opacity: 1, y: 0, textShadow: '0 0 10px rgb(0,240,255)' }
			)
			.fromTo(tagBlock, { opacity: 0, y: 40 }, { opacity: 1, y: 0 })
			.fromTo(
				tags.filter(el => !!el),
				{ opacity: 0, scale: 0.85 },
				{ opacity: 1, scale: 1, stagger: 0.04 }
			)

		return () => {
			caseHelloTl.kill()
		}
	} catch (error) {
		console.error('Animation error:', error)
		return
	}
}

/**
 * анимация карточек кейсов
 * @param refs рефы для анимаций
 * @returns
 */
export const animateCardCases3d = async (
	refs: CardCases3dRefs
): Promise<(() => void) | undefined> => {
	try {
		const cards = refs.cards.current

		if (!cards?.length) {
			return
		}

		const { gsap } = await import('gsap')
		const { ScrollTrigger } = await import('gsap/ScrollTrigger')
		gsap.registerPlugin(ScrollTrigger)

		const allTimelines: gsap.core.Timeline[] = []
		const allTriggers: ScrollTrigger[] = []

		cards.forEach(card => {
			if (!card) return

			const cardTl = gsap
				.timeline({
					scrollTrigger: {
						trigger: card,
						start: 'top 90%',
						toggleActions: 'play none none none',
					},
					defaults: { ease: 'power4.inOut', duration: 2 },
				})
				.fromTo(
					card,
					{
						opacity: 0,
						y: 60,
						translateZ: 'random(-600, 600)',
						rotationY: 'random(-150, 150)',
						rotationX: 'random(-150, 150)',
						scale: 0.8,
						filter: 'blur(8px) brightness(0.8)',
					},
					{
						opacity: 1,
						y: 0,
						translateZ: 0,
						rotationY: 0,
						rotationX: 0,
						scale: 1,
						filter: 'blur(0px) brightness(1)',
					}
				)

			allTimelines.push(cardTl)
			if (cardTl.scrollTrigger) {
				allTriggers.push(cardTl.scrollTrigger)
			}
		})

		return () => {
			allTimelines.forEach(tl => tl.kill())
			allTriggers.forEach(trigger => trigger.kill())
		}
	} catch (error) {
		console.error('Animation error:', error)
		return
	}
}

/**
 * анимация модального окна для одиночного кейса
 * @param refs рефы для анимаций
 * @returns
 */
export const animateModalForSoloCase = async (
	refs: ModalDescCaseRefs
): Promise<(() => void) | undefined> => {
	try {
		const [
			modal,
			title,
			image,
			client,
			problem,
			solution,
			result,
			metrics,
			form,
		] = [
			refs.modal?.current,
			refs.title?.current,
			refs.image?.current,
			refs.client?.current,
			refs.problem?.current,
			refs.solution?.current,
			refs.result?.current,
			refs.metrics?.current,
			refs.form?.current,
		]

		if (
			!modal ||
			!title ||
			!image ||
			!client ||
			!problem ||
			!solution ||
			!result ||
			!metrics?.length ||
			!form
		) {
			return
		}

		const { gsap } = await import('gsap')
		const { SplitText } = await import('gsap/SplitText')
		gsap.registerPlugin(SplitText)

		const clientSplit = new SplitText(client, {
			type: 'chars,words',
		})
		const solutionSplit = new SplitText(solution, {
			type: 'chars,words',
		})
		const resultSplit = new SplitText(result, { type: 'chars,words' })

		const splitElements = [clientSplit, solutionSplit, resultSplit]

		const baseTl = gsap
			.timeline({
				defaults: { ease: 'power2.out', duration: 0.5 },
			})
			.fromTo(modal, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1 })
			.fromTo(
				image,
				{
					rotationY: 180,
					translateZ: -500,
					opacity: 0,
					filter: 'blur(10px)',
				},
				{
					opacity: 1,
					rotationY: 0,
					translateZ: 0,
					filter: 'blur(0px)',
					ease: 'power4.inOut',
					duration: 3,
				}
			)
			.fromTo(
				title,
				{ scale: 0.8, opacity: 0, y: 60 },
				{ scale: 1, opacity: 1, y: 0 }
			)

		const descTl = gsap
			.timeline({
				defaults: { ease: 'power4', duration: 0.7 },
			})
			.fromTo(
				clientSplit.chars,
				{
					x: 150,
					opacity: 0,
				},
				{
					x: 0,
					opacity: 1,
					color: '#00a6f4',
					stagger: 0.02,
				}
			)
			.fromTo(problem, { opacity: 0 }, { opacity: 1 })
			.fromTo(
				solutionSplit.chars,
				{
					x: 150,
					opacity: 0,
				},
				{
					x: 0,
					opacity: 1,
					color: '#00a6f4',
					stagger: 0.02,
				},
				'-=1'
			)
			.fromTo(
				resultSplit.chars,
				{
					x: 150,
					opacity: 0,
				},
				{
					x: 0,
					opacity: 1,
					color: '#00a6f4',
					stagger: 0.02,
				},
				'-=1.3'
			)
			.fromTo(
				metrics,
				{ scale: 0.8, opacity: 0, y: 60 },
				{ scale: 1, opacity: 1, y: 0, stagger: 0.1 },
				'-=2'
			)
			.fromTo(
				form,
				{ opacity: 0 },
				{
					opacity: 1,
				}
			)

		return () => {
			splitElements.forEach(el => el.revert())
			baseTl.kill()
			descTl.kill()
		}
	} catch (error) {
		console.error('Animation error:', error)
		return
	}
}
