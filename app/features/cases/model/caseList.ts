import { createStore } from 'effector'
import luxeCars from '../assets/luxeCars.png'

import type { CaseItem, CaseList } from './types'

const INITIAL_CASES: CaseList<CaseItem> = {
	title: 'Наши кейсы',
	subtitle: 'Реальные проекты, которые принесли нашим клиентам миллионы.',
	items: [
		{
			id: '1',
			title: 'Люкс-сервис аренды эксклюзивных авто',
			description:
				'Увеличение конверсии на 140% за счёт уникального UX/UI-дизайна и анимаций.',
			tags: ['E-commerce', 'React', 'Luxury'],
			image: luxeCars,
			link: 'https://luxe-drive-demo-version.netlify.app',
		},
		{
			id: '2',
			title: 'Корпоративный портал для нефтяной компании',
			description: 'Сложная система дашбордов с аналитикой в реальном времени.',
			tags: ['Enterprise', 'Data Visualization', 'Security'],
			image: '/cases/oil-portal.jpg',
			link: '/cases/oil-portal',
		},
		{
			id: '3',
			title: 'Мобильное приложение для финтех-стартапа',
			description:
				'Приложение с нуля за 3 месяца. 500K+ скачиваний за первый год.',
			tags: ['Fintech', 'Mobile', 'React Native'],
			image: '/cases/fintech-app.jpg',
			link: '/cases/fintech-app',
		},
	],
}

const $cases = createStore<CaseList<CaseItem>>(INITIAL_CASES)

const stores = {
	$cases,
}

export const casesList = { stores }
