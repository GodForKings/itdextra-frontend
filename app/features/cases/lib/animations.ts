// Типы для рефов
interface SectionAnimationRefs {
	sectionRef: React.RefObject<HTMLDivElement | null>
	titleRef: React.RefObject<HTMLHeadingElement | null>
	subtitleRef: React.RefObject<HTMLParagraphElement | null>
	casesRef: React.RefObject<(HTMLDivElement | null)[]>
	buttonRef: React.RefObject<HTMLDivElement | null>
}

/**
 *
 * @param refs Принимает объект содержащий элементы для анимаций
 * @returns Promise пустой
 */
export const animateSection = async (
	refs: SectionAnimationRefs
): Promise<() => void> => {
	const { sectionRef, titleRef, subtitleRef, casesRef, buttonRef } = refs

	const { gsap } = await import('gsap')
	const { ScrollTrigger } = await import('gsap/ScrollTrigger')
	gsap.registerPlugin(ScrollTrigger)

	const masterTL = gsap.timeline({
		scrollTrigger: {
			trigger: sectionRef.current,
			start: 'top 60%',
			toggleActions: 'play none none none',
		},
	})

	// Анимация заголовка
	masterTL.fromTo(
		titleRef.current,
		{ opacity: 0, y: 50 },
		{ opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
	)

	// Анимация подзаголовка
	masterTL.fromTo(
		subtitleRef.current,
		{ opacity: 0, y: 30 },
		{ opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
		'-=0.4'
	)

	// Анимация кейсов
	casesRef.current?.forEach((caseEl, index) => {
		if (!caseEl) return

		const caseTL = gsap.timeline({
			scrollTrigger: {
				trigger: caseEl,
				start: 'top 70%',
				toggleActions: 'play none none none',
			},
		})

		caseTL.fromTo(
			caseEl,
			{ opacity: 0, y: 80 },
			{ opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
		)

		const image = caseEl.querySelector('.case-image')
		if (image) {
			gsap.to(image, {
				y: -30,
				scrollTrigger: {
					trigger: caseEl,
					start: 'top bottom',
					end: 'bottom top',
					scrub: 1,
				},
			})
		}
	})

	// Анимация кнопки
	masterTL.fromTo(
		buttonRef.current,
		{ opacity: 0, y: 20 },
		{ opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
		'+=0.2'
	)

	// Функция для очистки (вернётся в компонент)
	return () => {
		masterTL.kill()
		ScrollTrigger.getAll().forEach(trigger => trigger.kill())
	}
}
