import type { HeroAboutRefs, MissionAboutRefs } from './types'

/**
 * Анимация Приветствия на стр ABOUT
 * @param refs объект рефов
 * @returns очистку
 */
export const animateHeroAbout = async (refs: HeroAboutRefs) => {
	try {
		const [section, title, slogan, button] = [
			refs.section?.current,
			refs.title?.current,
			refs.slogan?.current,
			refs.button?.current,
		]
		if (!title || !slogan || !button || !section) return

		const { gsap } = await import('gsap')
		const { SplitText } = await import('gsap/SplitText')
		gsap.registerPlugin(SplitText)

		let titleSplit = new SplitText(title, { type: 'chars,words' })
		let sloganSplit = new SplitText(slogan, { type: 'chars,words' })

		// Устанавливаем начальный шум
		gsap.set([titleSplit.chars, sloganSplit.chars], {
			opacity: 0,
			filter: 'blur(20px) contrast(2) brightness(10)',
			color: '#ffffff',
		})

		const mainTl = gsap
			.timeline({ defaults: { ease: 'power1.inOut' } })
			.to(section, {
				opacity: 1,
				duration: 0.4,
			})
			.to(titleSplit.chars, {
				opacity: 1,
				filter: 'blur(0px) contrast(1) brightness(1)',
				color: '', // Возвращаем исходный цвет
				duration: 1,
				stagger: {
					each: 0.03,
					from: 'edges',
				},
			})
			.to(
				sloganSplit.chars,
				{
					opacity: 1,
					filter: 'blur(0px) contrast(1) brightness(1)',
					color: '#38bdf8',
					duration: 1,
					stagger: {
						each: 0.02,
						from: 'edges',
					},
				},
				'-=2'
			)
			.fromTo(button, { opacity: 0 }, { opacity: 1 })

		return () => {
			mainTl.kill()
			titleSplit && titleSplit.revert()
			sloganSplit && sloganSplit.revert()
		}
	} catch (error: unknown) {
		console.log(`animate error: ${error}`)
	}
}

/**
 * Анимация Миссии
 * @param refs объект рефов
 * @returns очистку
 */
export const animateMissionAbout = async (refs: MissionAboutRefs) => {
	try {
		const [section, title, description, verticalGlare, horizontalGlare] = [
			refs.section?.current,
			refs.title?.current,
			refs.description?.current,
			refs.verticalGlare?.current,
			refs.horizontalGlare?.current,
		]
		if (
			!section ||
			!title ||
			!description.length ||
			!verticalGlare ||
			!horizontalGlare
		)
			return

		const { gsap } = await import('gsap')
		const { ScrollTrigger } = await import('gsap/ScrollTrigger')
		const { SplitText } = await import('gsap/SplitText')
		gsap.registerPlugin(SplitText, ScrollTrigger)

		let titleSplit = new SplitText(title, { type: 'chars,words' })
		let descSplit = new SplitText(description, { type: 'chars,words' })

		const missionTl = gsap
			.timeline({
				scrollTrigger: {
					trigger: section,
					start: 'top center',
					toggleActions: 'play none none none',
				},
				defaults: { ease: 'back.inOut', duration: 0.5 },
			})
			.to(section, { opacity: 1, duration: 0.2 })
			.fromTo(
				titleSplit.chars,
				{ opacity: 0, y: -40 },
				{ opacity: 1, y: 0, stagger: 0.04 }
			)
			.fromTo(
				descSplit.chars,
				{
					scale: 0.5,
					rotation: -45,
					opacity: 0,
				},
				{
					scale: 1,
					rotation: 0,
					opacity: 1,
					stagger: {
						from: 'start',
						each: 0.02,
					},
				}
			)
			.fromTo(
				verticalGlare,
				{ rotation: '120deg', scale: 0 },
				{ rotation: '0deg', scale: 1, opacity: 1, duration: 1 },
				'-=2'
			)
			.fromTo(
				horizontalGlare,
				{ scale: 0, x: 200 },
				{ scale: 1, x: 0, opacity: 1, duration: 1.4 }
			)

		return () => {
			missionTl.kill()
			titleSplit && titleSplit.revert()
			descSplit && descSplit.revert()
		}
	} catch (error: unknown) {
		console.log(`animate error: ${error}`)
	}
}
