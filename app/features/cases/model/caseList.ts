import { createStore } from 'effector'

import { CASE_IMGS } from '../assets'
import type { CaseItem, CaseList } from './types'

const INITIAL_CASES: CaseList<CaseItem> = {
	title: 'Наши кейсы',
	subtitle: 'Реальные проекты, которые принесли нашим клиентам миллионы.',
	items: [
		{
			id: '1',
			title: 'Люкс-сервис аренды эксклюзивных авто',
			description: 'Увеличение конверсии на 200%.',
			tags: ['E-commerce', 'React', 'Luxury'],
			image: CASE_IMGS.luxeCars,
			link: 'https://luxe-drive-demo-version.netlify.app',
		},
		{
			id: '2',
			title: 'Корпоративная сеть нефтяной компании',
			description: 'Сложная система dashboard-ов с real-time аналитикой.',
			tags: ['Enterprise', 'Data Visualization', 'Security'],
			image: CASE_IMGS.coffee,
			link: '/cases/oil-portal',
		},
		{
			id: '3',
			title: 'Приложение для Web-3 блокчейн стартапа',
			description: 'С идеи до полноценной реализации.',
			tags: ['Fintech', 'Adaptive', 'WEB3'],
			image: CASE_IMGS.luxeCars,
			link: '/cases/fintech-app',
		},
		{
			id: '4',
			title: 'Re-дизайн приложения кофейни',
			description:
				'Полноценная переработка и создание нового концепта для Кофейни.',
			tags: ['Techno', 'React', 'UX/UI'],
			image: CASE_IMGS.coffee,
			link: '/cases/fintech-app',
		},
	],
}

const $cases = createStore<CaseList<CaseItem>>(INITIAL_CASES)

const stores = {
	$cases,
}

export const casesList = { stores }
