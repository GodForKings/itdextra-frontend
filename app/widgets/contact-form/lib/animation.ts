import type { DefaultCTARefs } from './types'

/**
 * функция всплытия модального окна
 * @param refs объект с рефами элементов
 * @returns
 */
export const animateModal = async (
	refs: DefaultCTARefs
): Promise<(() => void) | undefined> => {
	const [section, title, icon, desc, form] = [
		refs.sectionRef?.current,
		refs.titleRef?.current,
		refs.iconRef?.current,
		refs.descriptionRef?.current,
		refs.formRef?.current,
	]
	const { gsap } = await import('gsap')

	if (section && title && icon && desc && form) {
		const modalTl = gsap
			.timeline({ defaults: { ease: 'back.in', duration: 0.5 } })
			.fromTo(section, { opacity: 0 }, { opacity: 1 })
			.fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0 })
			.fromTo(icon, { opacity: 0, x: -40 }, { opacity: 1, x: 0 })
			.fromTo(desc, { opacity: 0, y: -30 }, { opacity: 1, y: 0 })
			.fromTo(
				form,
				{ opacity: 0, y: -30, scale: 0.9 },
				{ opacity: 1, y: 0, scale: 1 }
			)

		return () => {
			modalTl.kill()
		}
	}
}
