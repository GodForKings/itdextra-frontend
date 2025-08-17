import type { Route } from './+types/Cases'

import { CasesPage } from '~/pages'

export async function clientLoader({ params }: Route.ClientLoaderArgs) {}

export async function action() {}

export function meta({}: Route.MetaArgs) {
	return [
		{ title: `ITDextra успешные кейсы | Портфолио ITDextra` },
		{
			name: 'description',
			content: 'Реальные примеры наших проектов в мире ИТ-технологий',
		},

		// Open Graph
		{ property: 'og:type', content: 'article' },
		// { property: 'og:image', content: 'https://itdextra.ru/og-cases.jpg' },

		// Для соцсетей
		{ property: 'article:author', content: 'ITDextra Team' },
	]
}

export default function Cases({ loaderData }: Route.ComponentProps) {
	return <CasesPage />
}
