import type { Route } from './+types/Services'

import { ServicesPage } from '~/pages'

// export async function clientLoader({ params }: Route.ClientLoaderArgs) {}

// export async function action() {}

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Услуги веб-разработки | ITDextra — полный цикл создания сайтов' },
		{
			name: 'description',
			content:
				'Разработка корпоративных сайтов, интернет-магазинов, форумов, лендингов и других веб-приложений. Используем React SSR, Node.js, Go и современные технологии.',
		},
		// Open Graph
		{ property: 'og:title', content: 'Профессиональные услуги веб-разработки' },
		{
			property: 'og:description',
			content: 'От лендинга до сложного SaaS-решения — реализуем любой проект',
		},
		// { property: 'og:image', content: 'https://itdextra.ru/og-services.jpg' },
		// Дополнительно
		{
			name: 'keywords',
			content: 'Разработка сайтов, интернет-магазинов, корпоративных платформ',
		},
	]
}

export default function Services({ loaderData }: Route.ComponentProps) {
	return <ServicesPage />
}
