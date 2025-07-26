import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

export function useTheme() {
	/* Инициализируем тему как `null` для SSR, затем обновляем при гидратации */
	const [theme, setTheme] = useState<Theme | null>(null)

	useEffect(() => {
		/* Спецом в useEffect для клиента */
		const savedTheme = (localStorage.getItem('theme') as Theme) || 'dark'
		setTheme(savedTheme)
	}, [])

	useEffect(() => {
		if (!theme) return
		document.documentElement.classList.remove('light', 'dark')
		document.documentElement.classList.add(theme)
		localStorage.setItem('theme', theme)
	}, [theme])

	const toggleTheme = () =>
		setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))

	return { theme, toggleTheme }
}
