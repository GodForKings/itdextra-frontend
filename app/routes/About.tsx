import type { Route } from './+types/About'

import { AboutPage } from '~/pages/about'

export async function clientLoader({ params }: Route.ClientLoaderArgs) {}

export async function action() {}

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'О компании ITDextra — наша команда и принципы работы' },
		{
			name: 'description',
			content:
				'5 лет создаем цифровые продукты. 15+ специалистов. Работаем с 2020 года. Наши ценности и подход к разработке.',
		},

		// Open Graph
		{ property: 'og:title', content: 'Команда ITDextra — наши эксперты' },
		// { property: 'og:image', content: 'https://itdextra.ru/og-team.jpg' },

		// Дополнительно
		{ name: 'author', content: 'ITDextra' },
	]
}

export default function About() {
	return <AboutPage />
}
