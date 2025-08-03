/* Разрешение для адаптивности */
export const BREAKPOINTS = {
	MOBILE: 768,
} as const
export type BreakPoints = (typeof BREAKPOINTS)[keyof typeof BREAKPOINTS]

/* Основные теги для поиска в секции */
export const MAIN_TAGS = [
	'Веб-приложение',
	'SEO',
	'Дизайн',
	'Сайт-визитка',
	'Портфолио',
	'Лендинг',
	'Корпоративный сайт',
	'Интернет-магазин',
	'AI',
] as const
