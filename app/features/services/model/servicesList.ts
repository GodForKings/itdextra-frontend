import { createStore } from 'effector'

import type { ServicesList, Services } from './types'

const INITIAL_SERVICES: ServicesList<Services> = {
	title: 'Экспертные направления в веб-разработке',
	services: [
		{
			id: 'e-commerce',
			title: 'E-commerce',
			description:
				'Масштабируемые торговые платформы. Решения для 200% роста онлайн продаж.',
			icon: '🛒',
		},
		{
			id: 'websites',
			title: 'Web-приложения',
			description:
				'Комплексные бизнес системы. Создание уникальных решений для вашего бренда.',
			icon: '🌐',
		},
		{
			id: 'design',
			title: 'Design',
			description:
				'UX и UI, который увеличивает конверсию и удовлетворенность.',
			icon: '🎨',
		},
	],
}

const $services = createStore<ServicesList<Services>>(INITIAL_SERVICES)

const stores = {
	$services,
}

export const servicesList = { stores }
