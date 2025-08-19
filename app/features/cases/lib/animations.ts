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
				defaults: { ease: 'power4.out', duration: 1 },
			})
			// Анимация заголовка
			.fromTo(title, { opacity: 0, y: -150 }, { opacity: 1, y: 0 })
			// Подзаголовок
			.fromTo(subtitle, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, '-=0.4')
			// Кнопка(и)
			.fromTo(button, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, '+=1')

		// Анимация кейсов
		cases.forEach(caseEl => {
			if (!caseEl) return

			const caseTL = gsap
				.timeline({
					scrollTrigger: {
						trigger: caseEl,
						start: 'top 70%',
						toggleActions: 'play none none none',
					},
					defaults: { ease: 'power1', duration: 1 },
				})
				.fromTo(
					caseEl,
					{
						scale: 'random(0.4, 0.8)',
						x: 'random(-150, 150)',
						rotation: 'random(-50,50)',
					},
					{ scale: 1, x: 0, rotation: 0, opacity: 1 }
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
	const [section, title, tagBlock, tags] = [
		refs.section?.current,
		refs.title?.current,
		refs.tagBlock?.current,
		refs.tags?.current,
	]
	const { gsap } = await import('gsap')

	if (section && title && tagBlock && tags.length) {
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
	}
}

export const animateCardCases3d = async (refs: CardCases3dRefs) => {
	const cards = refs.cards.current

	if (cards.length) {
		const { gsap } = await import('gsap')
		const { ScrollTrigger } = await import('gsap/ScrollTrigger')
		gsap.registerPlugin(ScrollTrigger)

		const tlArray: gsap.core.Timeline[] = []
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
						translateZ: 'random(0, 400)',
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

			tlArray.push(cardTl)
		})

		return () => {
			ScrollTrigger.getAll().forEach(el => el.kill())
			tlArray.forEach(el => el.kill())
		}
	}
}

/**
 * анимация модального окна для одиночного кейса
 * @param refs рефы для анимаций
 * @returns
 */
export const animateModalForSoloCase = async (refs: ModalDescCaseRefs) => {
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
		modal &&
		title &&
		image &&
		client &&
		problem &&
		solution &&
		result &&
		metrics.length &&
		form
	) {
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

		const splitEl = [clientSplit, solutionSplit, resultSplit]

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
			.fromTo(title, { opacity: 0 }, { opacity: 1 })

		const descTl = gsap
			.timeline({
				defaults: { ease: 'expo.out', duration: 0.6 },
			})
			.fromTo(
				clientSplit.chars,
				{ x: -50, opacity: 0 },
				{
					delay: 2.4,
					x: 0,
					opacity: 1,
					stagger: { from: 'random', each: 0.01 },
				}
			)
			.fromTo(problem, { opacity: 0 }, { opacity: 1 })
			.fromTo(
				solutionSplit.chars,
				{ y: 'random(-50,50)', rotation: 'random(-60,60)', color: '#fff' },
				{
					y: 0,
					duration: 1,
					rotation: 0,
					color: '#00a6f4',
					stagger: { from: 'random', each: 0.02 },
					ease: 'elastic.inOut',
					delay: 1.4,
				},
				0
			)
			.fromTo(
				resultSplit.chars,
				{ opacity: 0 },
				{ opacity: 1, stagger: 0.03, delay: 2 },
				0
			)
			.fromTo(
				metrics,
				{ scale: 0.9, opacity: 0, y: 'random(-40,0)' },
				{ scale: 1, opacity: 1, y: 0, stagger: 0.1 }
			)
			.fromTo(
				form,
				{ opacity: 0 },
				{
					opacity: 1,
				}
			)
		return () => {
			splitEl.forEach(el => el.revert())
			descTl.kill()
			baseTl.kill()
		}
	}
}
