import type { Route } from './+types/About'

import { AboutPage } from '~/pages'

export async function clientLoader({ params }: Route.ClientLoaderArgs) {}

export async function action() {}

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'О компании ITDextra — наша команда и принципы работы' },
		{
			name: 'description',
			content:
				'Более 5-ти лет создаем эксклюзивные IT-решения. На рынке с 2020 года. Наши уникальные особенности и подход к работе.',
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
