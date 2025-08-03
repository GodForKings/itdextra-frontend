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

	const [sectionRef, titleRef, cardsRef] = [
		refs?.sectionRef?.current,
		refs?.titleRef?.current,
		refs?.cardsRef?.current,
	]

	// Все элементы присутствуют ?
	if (!sectionRef || !titleRef || cardsRef.length === 0) return

	// Главный timeline для секции и триггер
	const serviceTl = gsap.timeline({
		scrollTrigger: {
			trigger: sectionRef,
			start: 'top 30%',
			toggleActions: 'play none none none',
		},
		defaults: { ease: 'power4.out' },
	})

	// Заголовка
	serviceTl.fromTo(
		titleRef,
		{ opacity: 0, scale: 0.5, filter: 'blur(4px)' },
		{ opacity: 1, scale: 1, filter: 'blur(0)', duration: 1 }
	)

	// Карточек
	serviceTl.fromTo(
		cardsRef && cardsRef,
		{ opacity: 0, y: 50 },
		{ opacity: 1, y: 0, duration: 0.6, stagger: 0.15 },
		'-=0.3'
	)

	return () => {
		/* Чистим на выходе */
		serviceTl.kill()
		ScrollTrigger.getAll().forEach(st => st.kill())
	}
}
