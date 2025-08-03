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

		const BurgerTl = gsap.timeline({
			defaults: { ease: 'power4', duration: 0.1 },
			onStart: () => setIsOpen(prev => !prev),
		})

		if (isOpen) {
			BurgerTl.to(first, {
				position: 'static',
				transform: 'rotate(0deg)',
			})
				.to(two, { opacity: 1 })
				.to(three, {
					position: 'static',
					transform: 'rotate(0deg)',
				})
		} else {
			BurgerTl.to(first, {
				position: 'absolute',
				transform: 'rotate(45deg)',
				top: '50%',
			})
				.to(two, { opacity: 0 })
				.to(three, {
					position: 'absolute',
					transform: 'rotate(-45deg)',
					top: '50%',
				})
				.fromTo(navigationRef.current, { x: '-100vw' }, { x: 0, duration: 0.5 })
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
				className='relative w-8 h-5 flex flex-col items-center justify-between min-md:hidden'
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
					'absolute top-11 left-0 flex flex-col items-center justify-evenly gap-2',
					'min-h-fit h-[100dvh] w-[100dvw] rounded-b-lg',
					'min-md:hidden transition-opacity duration-300',
					'bg-gradient-to-t from-blue-200 to-slate-200 dark:from-gray-600 dark:to-gray-950',
					!isOpen && 'opacity-0 pointer-events-none'
				)}
				onClick={handleMenuClick}
			>
				<MenuLinks />
			</ul>
		</>
	)
}
