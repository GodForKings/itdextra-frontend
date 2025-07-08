export const ROUTES_DATA = {
	index: {
		path: '',
		name: 'Главная',
	},
	services: {
		path: 'services',
		name: 'Услуги',
	},
	cases: {
		path: 'cases',
		name: 'Кейсы',
	},
	about: {
		path: 'about',
		name: 'О нас',
	},
	contacts: {
		path: 'contacts',
		name: 'Контакты',
	},
} as const
export type RoutesData = (typeof ROUTES_DATA)[keyof typeof ROUTES_DATA]
