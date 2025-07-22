import { createStore } from 'effector'

import { CASE_IMGS } from '../assets'
import type { CaseItem, CaseList } from './types'

const INITIAL_CASES: CaseList<CaseItem> = {
	title: 'Наши кейсы',
	subtitle: 'Реальные проекты, которые принесли нашим клиентам миллионы.',
	items: [
		{
			id: '1',
			title: 'Элитная аренда авто премиум-класса',
			description:
				'Роскошный digital-опыт для клиентов, который увеличил конверсию бронирований на 200% и средний чек на 45%. Персонализированный подбор авто с AI-рекомендациями.',
			tags: ['E-commerce', 'React', 'Luxury Branding'],
			image: CASE_IMGS.luxeCars,
			link: 'https://luxe-drive-demo-version.netlify.app',
		},
		{
			id: '2',
			title: 'Корпоративная сеть нефтяной компании',
			description:
				'Дашборды с real-time аналитикой 20+ метрик. Снизили время принятия решений на 60% и исключили утечки данных.',
			tags: ['Enterprise SaaS', 'Data Visualization', 'Security'],
			image: CASE_IMGS.coffee,
			link: '/cases/oil-portal',
		},
		{
			id: '3',
			title: 'Приложение для Web-3 блокчейн стартапа',
			description:
				'С идеи до полноценной реализации. Интуитивный интерфейс для DeFi-операций с 50K+ активных пользователей в первый месяц.',
			tags: ['Fintech Innovation', 'Mobile-First', 'Blockchain'],
			image: CASE_IMGS.luxeCars,
			link: '/cases/fintech-app',
		},
		{
			id: '4',
			title: 'Ребрендинг приложения кофейни',
			description:
				'Новый UX увеличил частоту заказов на 130%. Внедрили gamification-механики и бесшовные платежи через NFC.',
			tags: ['Techno', 'React', 'UX Overhaul'],
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
