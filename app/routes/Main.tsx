import type { Route } from './+types/Main'

import { MainPage } from '~/pages/main'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'ITDextra' },
		{ name: 'description', content: 'Welcome to ITDextra!' },
	]
}

export default function Main() {
	return <MainPage />
}
