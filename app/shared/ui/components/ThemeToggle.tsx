import type { FC } from 'react'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'

import { useTheme } from '~/shared'

export const ThemeToggle: FC = () => {
	const { toggleTheme, theme } = useTheme()

	const [isMounted, setIsMounted] = useState(false)

	const sunRef = useRef<SVGGElement>(null)
	const moonRef = useRef<SVGPathElement>(null)

	/* Ждём завершения гидратации */
	useEffect(() => {
		setIsMounted(true)
	}, [])

	/* Анимации только после монтирования */
	useEffect(() => {
		if (
			!isMounted ||
			!sunRef.current ||
			!moonRef.current ||
			typeof window === 'undefined'
		)
			return

		gsap.to(sunRef.current, {
			opacity: theme === 'light' ? 1 : 0,
			scale: theme === 'light' ? 1 : 0.1,
			duration: 0.4,
		})

		gsap.to(moonRef.current, {
			opacity: theme === 'dark' ? 1 : 0,
			scale: theme === 'dark' ? 1 : 0.1,
			duration: 0.4,
		})
	}, [theme, isMounted])

	/* Статичный SVG на сервере */
	return (
		<button
			onClick={toggleTheme}
			className='p-2 rounded-full text-sky-500 bg-gray-950/10 dark:bg-white/10 transition-transform'
			aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
		>
			<svg
				width='20'
				height='20'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth={1.4}
				strokeLinecap='round'
			>
				{/* Луна (изначально скрыта) */}
				<path
					ref={moonRef}
					d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'
					opacity={isMounted ? (theme === 'dark' ? 1 : 0) : 0}
				/>

				{/* Солнце (изначально скрыто) */}
				<g ref={sunRef} opacity={isMounted ? (theme === 'light' ? 1 : 0) : 0}>
					<circle cx='12' cy='12' r='4' />
					{[...Array(8)].map((_, i) => (
						<line
							key={i}
							x1='12'
							y1='2'
							x2='12'
							y2='4'
							transform={`rotate(${i * 45} 12 12)`}
						/>
					))}
				</g>
			</svg>
		</button>
	)
}
