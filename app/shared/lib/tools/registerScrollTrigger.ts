import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let isRegistered = false

/**
 * Функция регистрирующая scrollTrigger
 * @returns
 */
export const registerScrollTrigger = (): void => {
	if (typeof window === 'undefined') return

	if (!isRegistered) {
		gsap.registerPlugin(ScrollTrigger)
		isRegistered = true
		console.log('ScrollTrigger registered') // Для де-бага
	}
}
