import { createStore } from 'effector'

import type { ServicesList, Services } from './types'

import { icons } from '../ui/Icons'

const INITIAL_SERVICES: ServicesList<Services> = {
	title: 'Технологии, которые увеличивают прибыль бизнеса',
	services: [
		{
			id: 'e-commerce-ai',
			title: 'SEO для E-commerce',
			description:
				'Автоматизированная SEO-оптимизация интернет-магазинов: от семантического ядра до динамического контента. Рост органического трафика на 65% за 4 месяца.',
			icon: icons.ecommerce,
		},
		{
			id: 'web-apps',
			title: 'Высоконагруженные Web-приложения',
			description:
				'Системы, которые выдерживают 1M+ пользователей. Оптимизированная архитектура под ваш трафик.',
			icon: icons.web,
		},
		{
			id: 'ai-integrations',
			title: 'AI & Automation',
			description:
				'Внедрение ИИ в бизнес-процессы: анализ данных, автоматизация рутины, предиктивная аналитика.',
			icon: icons.ai,
		},
	],
}

const $services = createStore<ServicesList<Services>>(INITIAL_SERVICES)

const stores = {
	$services,
}

export const servicesList = { stores }
