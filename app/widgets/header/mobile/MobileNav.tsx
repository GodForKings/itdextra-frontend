import type { FC } from 'react'

import { useState, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { NavLink } from 'react-router'
import { ROUTES_DATA } from '~/shared'

export const MobileNav: FC = () => {
	const [burgerActive, setBurgerActive] = useState<boolean>(false)

	const spanRefs = useRef<HTMLSpanElement[]>([])
	const navigationRef = useRef<HTMLUListElement>(null)

	const changeBurgerMenu = useCallback((): void => {
		const tl = gsap.timeline({
			onStart: () => setBurgerActive(!burgerActive),
		})

		if (!burgerActive && spanRefs.current.length) {
			tl.to(spanRefs.current[0], {
				position: 'absolute',
				transform: 'rotate(45deg)',
				duration: 0.1,
				ease: 'power4',
				top: '35%',
			})
				.to(spanRefs.current[1], { scale: 0, duration: 0.1, ease: 'power4' })
				.to(spanRefs.current[2], {
					position: 'absolute',
					transform: 'rotate(-45deg)',
					top: '35%',
					duration: 0.1,
					ease: 'power4',
				})
				.fromTo(
					navigationRef.current,
					{ x: '-100vw' },
					{ x: 0, duration: 0.2, ease: 'power4' }
				)
		} else {
			tl.to(spanRefs.current[0], {
				position: 'static',
				transform: 'rotate(0deg)',
				duration: 0.1,
				ease: 'power4',
			})
				.to(spanRefs.current[1], { scale: 1, duration: 0.1, ease: 'power4' })
				.to(spanRefs.current[2], {
					position: 'static',
					transform: 'rotate(0deg)',
					duration: 0.1,
					ease: 'power4',
				})
		}
	}, [burgerActive])

	const addSpanInArr = (element: HTMLSpanElement): void => {
		if (element && !spanRefs.current.includes(element)) {
			spanRefs.current.push(element)
		}
	}

	return (
		<>
			<button
				onClick={changeBurgerMenu}
				className='relative w-10 h-6 flex flex-col items-center justify-between'
			>
				<span ref={addSpanInArr} className='w-full h-0.5 bg-sky-400'></span>

				<span ref={addSpanInArr} className='w-full h-0.5 bg-sky-400'></span>

				<span ref={addSpanInArr} className='w-full h-0.5 bg-sky-400'></span>
			</button>

			{burgerActive && (
				<ul
					ref={navigationRef}
					className='absolute top-14 flex flex-col items-center justify-evenly gap-5 h-[50dvh] w-[70dvw] backdrop-blur-lg'
					onClick={(e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
						if (burgerActive) {
							setBurgerActive(prev => !prev)
							changeBurgerMenu()
						}
						// вынести из jsx
					}}
				>
					{Object.values(ROUTES_DATA).map(route => (
						<NavLink
							key={route.name}
							className='text-sm/8 text-gray-950 dark:text-white hover:text-sky-400 active:text-sky-400 w-fit'
							to={route.path}
						>
							{route.name}
						</NavLink>
					))}
				</ul>
			)}
		</>
	)
}
