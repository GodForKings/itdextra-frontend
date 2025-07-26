import { createStore } from 'effector'

import type { ServicesList, Services } from './types'

import { icons } from '../ui/Icons'

const INITIAL_SERVICES: ServicesList<Services> = {
	title: 'Экспертные направления в веб-разработке',
	services: [
		{
			id: 'e-commerce',
			title: 'E-commerce',
			description:
				'Масштабируемые торговые платформы. Решения для 200% роста онлайн продаж.',
			icon: icons.ecommerce,
		},
		{
			id: 'websites',
			title: 'Web-приложения',
			description:
				'Комплексные бизнес системы. Создание уникальных решений для вашего бренда.',
			icon: icons.web,
		},
		{
			id: 'design',
			title: 'Design',
			description:
				'UX и UI, который увеличивает конверсию и удовлетворенность.',
			icon: icons.design,
		},
	],
}

const $services = createStore<ServicesList<Services>>(INITIAL_SERVICES)

const stores = {
	$services,
}

export const servicesList = { stores }
