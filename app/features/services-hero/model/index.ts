// features/services-hero/model/index.ts
import { createStore, createEffect, sample } from 'effector'
import { createGate } from 'effector-react'

import {
	type LucideIcon,
	LayoutPanelTop,
	AppWindow,
	PaintRoller,
	Bot,
	BarChart4,
	LayoutList,
	UserPlus,
	LayoutDashboard,
	DatabaseZap,
	ShoppingCart,
	BrainCircuit,
	Webhook,
	UserRoundSearch,
	PenTool,
} from 'lucide-react'

import type { Category, Service } from './types'

const ServiceGeneralGate = createGate()

/* дефолтные сервисы */
const mockServices: Service<LucideIcon>[] = [
	{
		id: 'business-card',
		title: 'Премиальный сайт-визитка',
		shortDescription:
			'Эксклюзивный цифровой образ вашей компании, созданный для wow-эффекта.',
		fullDescription:
			'Ваше безупречное представление, разработанное с учетом бренда и целевой аудитории. Используем передовые технологии (Next.js, Go, SSR) для молниеносной загрузки (<1.5с) и адаптивности. Индивидуальный дизайн, анимации и SEO-оптимизация гарантируют первое впечатление, которое запоминается.',
		category: 'Веб-разработка',
		priceRange: '$2,000 – $30,000',
		deliveryTime: '1-3 месяца',
		tags: ['Сайт-визитка', 'Премиум-дизайн', 'SEO', 'SSR', 'Веб-приложение'],
		caseStudies: [
			{
				title: 'Ювелирный бренд Luxe',
				result: 'Увеличение запросов на 150% за 3 месяца',
			},
		],
		icon: LayoutList,
	},
	{
		id: 'ecommerce-seo',
		title: 'SEO и маркетинг для e-commerce',
		shortDescription: 'Ваш магазин в топе Google и соцсетей.',
		fullDescription:
			'Комплексная стратегия продвижения: SEO, PPC, SMM и CRO. Техническая оптимизация, контент-маркетинг и таргетированная реклама. Результат: рост органического трафика и конверсии в разы за 3-6 месяцев.',
		category: 'E-commerce',
		priceRange: '$1,000 – $25,000',
		deliveryTime: '3–6 месяцев',
		tags: ['SEO', 'PPC', 'SMM', 'CRO', 'Контент-маркетинг'],
		caseStudies: [
			{
				title: 'Модный ритейл',
				result: 'Топ-3 в Google по 50+ ключевым словам',
			},
		],
		icon: UserRoundSearch,
	},
	{
		id: 'landing',
		title: 'Конверсионный лендинг',
		shortDescription: 'Одностраничный шедевр для максимальной конверсии.',
		fullDescription:
			'Лендинг, созданный для превращения посетителей в клиентов. Индивидуальный дизайн, A/B-тестирование, интеграция с CRM (HubSpot, Salesforce) и аналитикой (Google Analytics, Amplitude). Конверсия от 10% и выше благодаря глубокому анализу ЦА.',
		category: 'Веб-разработка',
		priceRange: '$6,000 – $12,000',
		deliveryTime: '2–6 недель',
		tags: [
			'Лендинг',
			'Конверсия',
			'Веб-приложение',
			'A/B-тестирование',
			'Маркетинг',
		],
		caseStudies: [
			{
				title: 'Риелтор стартап',
				result: 'Конверсия 15% за первые 3 месяца',
			},
		],
		icon: LayoutDashboard,
	},
	{
		id: 'corporate',
		title: 'Корпоративный портал',
		shortDescription: 'Многостраничное решение для лидеров рынка.',
		fullDescription:
			'Полнофункциональный корпоративный сайт с модульной архитектурой, интеграцией с ERP/CRM и собственной CMS. Кроссплатформенность, кэширование и высочайшая производительность. Укрепляет бренд и формирует доверие на уровне Fortune 500.',
		category: 'Веб-разработка',
		priceRange: '$20,000 – $100,000',
		deliveryTime: 'от 3-х месяцев',
		tags: [
			'Корпоративный сайт',
			'ERP',
			'CMS',
			'Кроссплатформенность',
			'Веб-приложение',
		],
		caseStudies: [
			{
				title: 'Консалтинговая компания',
				result: 'Оптимизация взаимодействий с клиентами на 60%',
			},
		],
		icon: DatabaseZap,
	},
	{
		id: 'portfolio',
		title: 'Портфолио мирового уровня',
		shortDescription:
			'Ваш талант в центре внимания с уникальным дизайном и UX.',
		fullDescription:
			'Создаем портфолио, которое подчеркивает вашу экспертизу и привлекает клиентов. Интерактивные элементы, поддержка мультимедиа (видео, 3D), адаптивный дизайн и интеграция с аналитикой. Идеально для креативных профессионалов и компаний, стремящихся к лидерству.',
		category: 'Веб-разработка',
		priceRange: 'от $3,000',
		deliveryTime: 'от 1 месяца',
		tags: ['Портфолио', 'UI/UX', 'Веб-приложение', 'Анимации', 'Аналитика'],
		caseStudies: [
			{
				title: 'Фотограф ReQual',
				result: 'Рост клиентской базы в 2.5 раза за полгода',
			},
		],
		icon: UserPlus,
	},
	{
		id: 'ecommerce',
		title: 'Интернет-магазин',
		shortDescription:
			'Платформа для продаж с премиальным UX и масштабируемостью.',
		fullDescription:
			'Интернет-магазин с собственным дизайном, интеграцией платежных систем (Stripe, PayPal, Visa) и AI-аналитикой для персонализации. Поддержка до 1 млн SKU, молниеносная загрузка и SEO-оптимизация.',
		category: 'E-commerce',
		priceRange: '$30,000 – $100,000',
		deliveryTime: 'от 3-х месяцев',
		tags: [
			'Интернет-магазин',
			'AI',
			'Платежи',
			'SEO',
			'Масштабируемость',
			'Веб-приложение',
		],
		caseStudies: [
			{
				title: 'Techno SHOP',
				result: 'Увеличение продаж на 200% для техники apple за 6 месяцев',
			},
		],
		icon: ShoppingCart,
	},
	{
		id: 'ai-analytics',
		title: 'AI-аналитика для бизнеса',
		shortDescription: 'Искры гениальности для ваших данных.',
		fullDescription:
			'Ваша собственная аналитическая платформа на базе AI/ML для прогнозирования, персонализации и оптимизации бизнес-процессов. Интеграция с вашими серверными данными (SQL, NoSQL, API). Результат: рост ROI до 50% за счет анализа и подача чётких инсайдов.',
		category: 'AI и аналитика',
		priceRange: '$50,000 – $100,000',
		deliveryTime: 'от 5-ти месяцев',
		tags: ['AI', 'ML', 'Веб-приложение', 'Персонализация', 'ROI'],
		caseStudies: [
			{ title: 'FinTech-платформа', result: 'Снижение уровня простоя на 40%' },
		],
		icon: BrainCircuit,
	},
	{
		id: 'web3-integration',
		title: 'Web3 и блокчейн-интеграции',
		shortDescription: 'Ваш бизнес в мире децентрализованных технологий.',
		fullDescription:
			'Интеграция Web3-функционала: NFT, смарт-контракты, DeFi. Разработка на Solidity, интеграция с Ethereum, Tron, Ton, Solana. Безопасность и масштабируемость для будущего цифровой экономики.',
		category: 'Web3',
		priceRange: '$40,000 – $150,000',
		deliveryTime: 'от 3-х месяцев',
		tags: ['Web3', 'NFT', 'Блокчейн', 'Smart-контракты', 'Веб-приложение'],
		caseStudies: [
			{
				title: 'NFT-маркетплейс',
				result: 'Запуск платформы с 5,000 активных пользователей',
			},
		],
		icon: Webhook,
	},
	{
		id: 'design',
		title: 'Эксклюзивный UI/UX дизайн',
		shortDescription: 'Визуальный шедевр, который цепляет и конвертирует.',
		fullDescription:
			'Кастомный UI/UX-дизайн с микроанимациями, поддержкой светлой/темной темы и Figma-прототипами. Проводим UX-исследования и A/B-тестирование для идеального пользовательского опыта. Результатом всего становится рост вовлеченности клиента.',
		category: 'Дизайн',
		priceRange: '$1,000 – $10,000',
		deliveryTime: 'от месяца',
		tags: ['UI/UX', 'Дизайн', 'Figma', 'Анимации', 'Прототипы'],
		caseStudies: [
			{ title: 'SaaS-продукт', result: 'Увеличение времени на сайте в 2 раза' },
		],
		icon: PenTool,
	},
]
/* дефолтные категории */
const mockCategories: Category<LucideIcon>[] = [
	{
		title: 'Кастомные Web-приложения',
		description:
			'Искры цифрового гениальности: создаем web-приложения, которые повышают конверсию до 40% и обеспечивают безупречный UX для fintech и ритейла.',
		icon: LayoutPanelTop,
		benefits: [
			'Индивидуальная архитектура под ваш бизнес',
			'Интеграция с AI и блокчейн',
			'Скорость загрузки <1 сек',
			'Поддержка 24/7 с SLA 99.9%',
		],
	},
	{
		title: 'AI-решения для лидеров',
		description:
			'Эксклюзивные AI-интеграции, которые увеличивают ROI на 30% и автоматизируют бизнес-процессы. Ваше преимущество в цифровой эре.',
		icon: Bot,
		benefits: [
			'Персонализированные алгоритмы ML',
			'Прогнозирование поведения клиентов',
			'Интеграция с вашими CRM/ERP',
			'Конфиденциальность данных на уровне банков',
		],
	},
	{
		title: 'E-commerce премиум-класса',
		description:
			'Онлайн-магазины, где каждый клик — это продажа. Конверсия до 25% выше рынка благодаря кастомным решениям и неоновой эстетике.',
		icon: AppWindow,
		benefits: [
			'Индивидуальный дизайн витрины',
			'Интеграция с платежными системами',
			'Оптимизация под мобильные устройства',
			'A/B-тестирование для роста продаж',
		],
	},
	{
		title: 'UI/UX шедевры',
		description:
			'Интерфейсы, которые завораживают: каждый пиксель — искусство, увеличивающее вовлеченность пользователей на 35%.',
		icon: PaintRoller,
		benefits: [
			'Кастомные анимации и микроинтеракции',
			'Figma-прототипы за 48 часов',
			'Тестирование UX с реальными пользователями',
			'Адаптивность для всех устройств',
		],
	},
	{
		title: 'SEO для цифровых магнатов',
		description:
			'Ваш бренд в топе Google менее чем за полгода. Стратегии, которые увеличивают органический трафик на 50% с элегантностью премиум бренда.',
		icon: BarChart4,
		benefits: [
			'Персонализированные SEO-стратегии',
			'Анализ конкурентов в реальном времени',
			'Оптимизация под голосовой поиск',
			'Прозрачная аналитика с ROI-отчетами',
		],
	},
]

/* Эффект для загрузки данных */
const fetchServicesFx = createEffect(async () => {
	return mockServices
})

const fetchCategoriesFx = createEffect(async () => {
	return mockCategories
})

/* Хранилище для услуг */
const $services = createStore<Service<LucideIcon>[] | null>(null).on(
	fetchServicesFx.doneData,
	(_, services) => services
)
/* Хранилище для категорий */
const $categories = createStore<Category<LucideIcon>[] | null>(null).on(
	fetchCategoriesFx.doneData,
	(_, categories) => categories
)

// для загрузчиков ui
// const $isLoadingServices = fetchServicesFx.pending
// const $isLoadingCategories = fetchCategoriesFx.pending

/* Триггер на открытие ворот */
sample({
	clock: [ServiceGeneralGate.open],
	source: { service: $services, categories: $categories },
	fn: ({ service, categories }) => !service || !categories,
	target: [fetchCategoriesFx, fetchServicesFx],
})

const stores = { $services, $categories }

const gates = { ServiceGeneralGate }

export const ServicesListModel = {
	stores,
	gates,
}
