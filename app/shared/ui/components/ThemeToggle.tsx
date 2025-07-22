// components/ThemeToggle.tsx
import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { useTheme } from '~/shared'

export const ThemeToggle = () => {
	const { toggleTheme, theme } = useTheme()

	const [isMounted, setIsMounted] = useState(false)

	const sunRef = useRef<SVGGElement>(null)
	const moonRef = useRef<SVGPathElement>(null)

	// Ждём завершения гидратации
	useEffect(() => {
		setIsMounted(true)
	}, [])

	// Анимации только после монтирования
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
			rotate: theme === 'light' ? 0 : -45,
			duration: 0.6,
		})

		gsap.to(moonRef.current, {
			opacity: theme === 'dark' ? 1 : 0,
			duration: 0.4,
		})
	}, [theme, isMounted])

	// Статичный SVG на сервере
	return (
		<button
			onClick={toggleTheme}
			className='p-2 rounded-full bg-gray-200 dark:bg-white/10 hover:scale-105 transition-transform'
			aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
		>
			<svg
				width='24'
				height='24'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='1.5'
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
