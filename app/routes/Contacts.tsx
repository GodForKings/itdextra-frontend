import type { Route } from './+types/Contacts'

import { ContactsPage } from '~/pages'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Контакты ITDextra — свяжитесь с нами в Москве' },
		{
			name: 'description',
			content:
				'Адрес, телефон и email для связи. Работаем пн-пт с 9:00 до 18:00. Запишитесь на бесплатную консультацию.',
		},

		// Open Graph
		{ property: 'og:type', content: 'business.business' },
		{
			property: 'business:contact_data:street_address',
			content: 'ул. Примерная, 123',
		},
		{ property: 'business:contact_data:locality', content: 'Москва' },
	]
}

export default function Contacts() {
	return <ContactsPage />
}
