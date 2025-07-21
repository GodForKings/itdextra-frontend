import type { FC } from 'react'

import { useState, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { cn } from '~/shared'
import { MenuLinks } from '../lib/MenuLinks'

export const MobileNav: FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const spanRefs = useRef<HTMLSpanElement[]>([])
	const navigationRef = useRef<HTMLUListElement>(null)

	/**
	 * Анимация бургер-меню
	 */
	const handleBurgerClick = useCallback((): void => {
		if (!spanRefs.current.length || !navigationRef.current) return

		const [first, two, three] = spanRefs.current
		const tl = gsap.timeline({
			onStart: () => setIsOpen(prev => !prev),
		})

		if (!isOpen && spanRefs.current.length) {
			tl.to(first, {
				position: 'absolute',
				transform: 'rotate(45deg)',
				duration: 0.1,
				ease: 'power4',
				top: '39%',
			})
				.to(two, { scale: 0, duration: 0.1, ease: 'power4' })
				.to(three, {
					position: 'absolute',
					transform: 'rotate(-45deg)',
					top: '39%',
					duration: 0.1,
					ease: 'power4',
				})
				.fromTo(
					navigationRef.current,
					{ x: '-100vw' },
					{ x: 0, duration: 0.2, ease: 'power4.out' }
				)
		} else {
			tl.to(first, {
				position: 'static',
				transform: 'rotate(0deg)',
				duration: 0.1,
				ease: 'power4',
			})
				.to(two, { scale: 1, duration: 0.1, ease: 'power4' })
				.to(three, {
					position: 'static',
					transform: 'rotate(0deg)',
					duration: 0.1,
					ease: 'power4',
				})
		}
	}, [isOpen])

	/**
	 * Обработчик клика по меню
	 */
	const handleMenuClick = useCallback((): void => {
		isOpen && handleBurgerClick()
	}, [isOpen, handleBurgerClick])

	/**
	 * Регистрация рефа для span-элементов
	 */
	const registerSpanRef = useCallback(
		(element: HTMLSpanElement | null): void => {
			if (element && !spanRefs.current.includes(element)) {
				spanRefs.current.push(element)
			}
		},
		[]
	)

	return (
		<>
			<button
				onClick={handleBurgerClick}
				className='relative w-8 h-6 flex flex-col items-center justify-between min-md:hidden'
			>
				{[...Array(3)].map((_, index) => (
					<span
						key={index}
						ref={registerSpanRef}
						className='w-full h-0.5 bg-sky-400'
					/>
				))}
			</button>

			<ul
				ref={navigationRef}
				className={cn(
					'absolute top-14 flex flex-col items-center justify-evenly gap-2',
					'min-h-fit h-[60dvh] w-[80dvw] rounded-b-lg backdrop-blur-lg',
					'min-md:hidden transition-opacity duration-300',
					!isOpen && 'opacity-0 pointer-events-none'
				)}
				onClick={handleMenuClick}
			>
				<MenuLinks />
			</ul>
		</>
	)
}
