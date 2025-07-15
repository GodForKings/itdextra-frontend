import type { Route } from './+types/Main'

import { MainPage } from '~/pages'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'ITDextra — Веб-разработка и цифровые решения | По всей России' },
		{
			name: 'description',
			content:
				'ITDextra — студия веб-разработки и digital-маркетинга. Создаем сайты, приложения и комплексные IT-решения с 2020 года используя передовые технологии.',
		},
		// Open Graph
		{ property: 'og:title', content: 'ITDextra — Комплексные IT-решения' },
		{
			property: 'og:description',
			content:
				'Создавайте будущее с ITDextra — эксклюзивные веб-решения для лидеров',
		},
		{ property: 'og:type', content: 'website' },
		// { property: 'og:url', content: 'https://itdextra.ru' },
		// { property: 'og:image', content: 'https://itdextra.ru/og-home.jpg' },
		{ property: 'og:site_name', content: 'ITDextra' },
	]
}

export default function Main() {
	return <MainPage />
}
