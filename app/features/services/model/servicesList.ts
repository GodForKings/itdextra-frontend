import { createStore } from 'effector'

import type { ServicesList, Service } from './types'

import { icons } from '../ui/Icons'

const INITIAL_SERVICES: ServicesList<Service> = {
	title: 'Технологии, которые увеличивают прибыль бизнеса',
	services: [
		{
			id: 'e-commerce-ai',
			title: 'SEO для E-commerce',
			shortDescription:
				'Ваш магазин в топе Google за 4 месяца с ростом трафика на 65% и конверсией до 20%.',
			fullDescription:
				'Автоматизированная SEO-оптимизация для интернет-магазинов: от построения семантического ядра до динамического контента на базе AI. Используем передовые инструменты (Next.js, Google Analytics, AI-driven контент) для вывода вашего магазина в топ-3 Google. Интеграция с таргетированной рекламой (PPC, SMM) и A/B-тестирование увеличивают конверсию до 20%. Результат: рост органического трафика на 65% и увеличение продаж в 2 раза за 4 месяца.',
			category: 'E-commerce',
			priceRange: '$1,000 – $25,000',
			deliveryTime: '3–6 месяцев',
			tags: [
				'SEO',
				'E-commerce',
				'AI',
				'PPC',
				'Контент-маркетинг',
				'Семантика',
			],
			caseStudies: [
				{
					title: 'Модный ритейл LuxWear',
					result:
						'Топ-3 по 50+ ключевым словам, рост продаж на 120% за 5 месяцев',
				},
				{
					title: 'Техно-стартап GadgetZone',
					result: 'Органический трафик +80% за 4 месяца',
				},
			],
			icon: icons.ecommerce,
		},
		{
			id: 'web-apps',
			title: 'Высоконагруженные Web-приложения',
			shortDescription:
				'Системы для 1M+ пользователей с загрузкой <1с и 99.9% аптаймом.',
			fullDescription:
				'Создаем масштабируемые веб-приложения, которые выдерживают миллионы пользователей. Используем модульную архитектуру (Next.js, Go, Kubernetes), кэширование (Redis) и CDN для молниеносной загрузки (<1с). Интеграция с вашими ERP/CRM (Salesforce, SAP) и аналитикой (Amplitude). Поддержка 24/7 с SLA 99.9%. Идеально для fintech, e-commerce и SaaS-стартапов, стремящихся к лидерству.',
			category: 'Веб-разработка',
			priceRange: '$20,000 – $100,000',
			deliveryTime: '3–24 месяца',
			tags: [
				'Веб-приложение',
				'Высокая нагрузка',
				'Next.js',
				'Kubernetes',
				'CRM',
				'React',
				'Node.js',
			],
			caseStudies: [
				{
					title: 'FinTech платформа PayPeak',
					result: 'Обработка 1M транзакций/день, аптайм 99.9%',
				},
				{
					title: 'SaaS стартап DataFlow',
					result:
						'Снижение времени загрузки на 60%, рост пользователей на 200%',
				},
			],
			icon: icons.web,
		},
		{
			id: 'ai-integrations',
			title: 'AI & Automation',
			shortDescription:
				'ИИ-решения, которые автоматизируют 80% рутины и увеличивают ROI на 50%.',
			fullDescription:
				'Внедряем искусственный интеллект и автоматизацию для оптимизации бизнес-процессов. Разрабатываем кастомные ML-модели для предиктивной аналитики, персонализации и автоматизации рутинных задач. Интеграция с вашими данными (SQL, NoSQL, API) и платформами (HubSpot, Salesforce). Результат: сокращение операционных затрат на 40% и рост ROI до 50% за счет точных инсайтов и автоматизации.',
			category: 'AI и автоматизация',
			priceRange: '$30,000 – $150,000',
			deliveryTime: '5–20 месяцев',
			tags: ['AI', 'ML', 'Автоматизация', 'Аналитика', 'Персонализация'],
			caseStudies: [
				{
					title: 'Логистическая компания TransAI',
					result: 'Снижение затрат на логистику на 35% за 6 месяцев',
				},
				{
					title: 'FinTech стартап InvestIQ',
					result: 'Увеличение точности прогнозов на 45%',
				},
			],
			icon: icons.ai,
		},
	],
}

const $services = createStore<ServicesList<Service>>(INITIAL_SERVICES)

const stores = {
	$services,
}

export const servicesList = { stores }
