import type { animateHeroRefs } from './types'

/**
 * Анимация приветственной секции на главной странице
 * @param refs объект рефов
 * @returns очистку
 */
export const animateHero = async (refs: animateHeroRefs) => {
	try {
		const [hero, name, title, subtitle, cta, trust] = [
			refs.heroRef?.current,
			refs.nameRef?.current,
			refs.titleRef?.current,
			refs.subtitleRef?.current,
			refs.ctaRef?.current,
			refs.trustRef?.current,
		]

		if (!hero || !name.length || !title || !subtitle || !cta || !trust) return

		const { gsap } = await import('gsap')
		const { SplitText } = await import('gsap/SplitText')
		gsap.registerPlugin(SplitText)

		let subtitleSplit = new SplitText(subtitle, {
			type: 'words,chars',
		})
		let titleSplit = new SplitText(title, {
			type: 'chars,words',
		})

		const heroTl = gsap
			.timeline({ defaults: { ease: 'back.out', duration: 0.5 } })
			/* Фоновая сетка */
			.to(hero, { opacity: 1 })
		/* Эффект цифрового появления для названия */
		name.forEach((letter: HTMLSpanElement | null, index: number) => {
			heroTl.fromTo(
				letter,
				{
					opacity: 0.5,
					scale: 0.4 / (index + 1),
					rotation: 'random(-60, 60)',
				},
				{
					opacity: 1,
					duration: 0.2,
					scale: 1,
					rotation: 0,
					delay: index * 0.02,
					onStart: () => {
						/* Эффект при появлении */
						gsap.to(letter, {
							duration: 1,
							x: '+=15',
							repeat: 2,
							yoyo: true,
							ease: 'sine.inOut',
						})
					},
				}
			)
		})
		/* Финальные эффекты */
		heroTl
			.to(name, {
				duration: 1,
				scale: 0.4,
				yoyo: true,
				repeat: 1,
				ease: 'sine.inOut',
			})
			.to(name, {
				transformOrigin: '50% 50% -30px',
				rotationY: -360,
				rotationX: 360,
				rotation: 360,
				ease: 'elastic.inOut',
				duration: 4,
				stagger: 0.1,
				textShadow: '1px 2px 3px',
			})
			/* Заголовок */
			.fromTo(
				titleSplit.chars,
				{
					y: 'random(-75, 75)',
					x: 'random(-150, 150)',
					rotation: 'random(0, 720)',
					opacity: 0,
				},
				{
					y: 0,
					x: 0,
					rotation: 0,
					opacity: 1,
					duration: 2,
					color: '#00a6f4',
					textShadow: '0px 0px 4px',
					stagger: { from: 'random', each: 0.04 },
					delay: 3,
				},
				0
			)
			/* Подзаголовок */
			.fromTo(
				subtitleSplit.chars,
				{ y: 80, opacity: 0, rotation: 'random(-60, 60)' },
				{
					y: 0,
					opacity: 1,
					delay: 2,
					duration: 0.8,
					rotation: 0,
					stagger: { from: 'random', each: 0.01 },
				},
				0
			)
			/* Кнопки и Статистика */
			.fromTo(
				cta,
				{ scale: 0.9, opacity: 0, x: -100 },
				{ scale: 1, opacity: 1, x: 0, duration: 1, delay: 3 },
				0
			)
			.fromTo(trust, { opacity: 0 }, { opacity: 1, duration: 1, delay: 1 }, 0)
		/* Очистка */
		return () => {
			heroTl.kill()
			subtitleSplit && subtitleSplit.revert()
			titleSplit && titleSplit.revert()
		}
	} catch (error: unknown) {
		console.log(`animate hero section error: ${error}`)
	}
}
