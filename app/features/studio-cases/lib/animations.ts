interface AnimateRefs {
	section: React.RefObject<HTMLElement | null>
	title: React.RefObject<HTMLHeadingElement | null>
	tagBlock: React.RefObject<HTMLDivElement | null>
	tags: React.RefObject<(HTMLButtonElement | null)[]>
	cards: React.RefObject<(HTMLDivElement | null)[]>
}

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
