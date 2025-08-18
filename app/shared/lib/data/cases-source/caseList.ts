import { CASE_IMGS } from './imgs/index'

import type { CaseItem } from './types/index'

export const defaultCases: CaseItem[] = [
	{
		id: '1',
		title: 'Элитная аренда авто премиум-класса',
		description:
			'Роскошный digital-опыт увеличил конверсию бронирований на 200% и средний чек на 45%. AI-рекомендации для персонализированного подбора авто.',
		tags: ['E-commerce', 'SSR', 'Luxury Branding', 'TypeScript'],
		image: CASE_IMGS.luxeCars,
		link: '/cases/luxe-cars',
		problem:
			'Низкая конверсия и отсутствие персонализации в бронировании премиум-авто.',
		solution:
			'Разработали кастомный React-интерфейс с AI-рекомендациями, интегрировали 3D-визуализацию авто и бесшовные платежи.',
		result:
			'Клиенты получили люксовый UX, что повысило лояльность и средний чек.',
		metrics: ['Конверсия +104%', 'Средний чек +37%', 'Время на сайте +50%'],
		client: 'LuxeDrive',
	},
	{
		id: '2',
		title: 'Корпоративная сеть нефтяной компании',
		description:
			'Real-time дашборды с 20+ метриками. Сократили время принятия решений на 60% и устранили утечки данных.',
		tags: [
			'Enterprise SaaS',
			'Data Visualization',
			'Security',
			'React',
			'Node.js',
		],
		image: CASE_IMGS.oilCorporation,
		link: '/cases/oil-portal',
		problem:
			'Медленные аналитические процессы и риски утечки конфиденциальных данных.',
		solution:
			'Внедрили защищенную SaaS-платформу с дашбордами на D3.js, шифрованием AES-256 и ролевой авторизацией.',
		result:
			'Оптимизировали операционные процессы и повысили безопасность данных.',
		metrics: [
			'Время принятия решений -53%',
			'Утечки данных 0%',
			'Обработка данных +44%',
		],
		client: 'OilCorp Global',
	},
	{
		id: '3',
		title: 'Приложение для Web3 блокчейн-стартапа',
		description:
			'От идеи до релиза: DeFi-приложение с интуитивным UX привлекло 50K+ пользователей за первый месяц.',
		tags: ['Fintech Innovation', 'Mobile-First', 'Blockchain', 'Go'],
		image: CASE_IMGS.deFi,
		link: '/cases/fintech-app',
		problem: 'Сложный UX для DeFi-операций отпугивал новичков.',
		solution:
			'Создали мобильное приложение на React Native с упрощенным интерфейсом, интеграцией MetaMask и смарт-контрактами.',
		result: 'Привлекли массовую аудиторию и обеспечили быстрый рост.',
		metrics: [
			'50K+ пользователей за 1 месяц',
			'DAU +35K',
			'Retention rate 70%',
		],
		client: 'DeFiNova',
	},
	{
		id: '4',
		title: 'Ребрендинг приложения кофейни',
		description:
			'Новый UX с геймификацией увеличил частоту заказов на 130% и внедрил NFC-платежи.',
		tags: ['Techno', 'Next.js', 'UX/UI', 'SSR'],
		image: CASE_IMGS.coffee,
		link: '/cases/coffee',
		problem: 'Устаревший интерфейс и низкая вовлеченность пользователей.',
		solution:
			'Редизайн на React с геймификацией (бонусы, челленджи) и NFC-платежами через Stripe.',
		result: 'Повысили лояльность клиентов и частоту покупок.',
		metrics: ['Частота заказов +93%', 'NPS +25', 'Средний чек +18%'],
		client: 'BeanVibe',
	},
]
