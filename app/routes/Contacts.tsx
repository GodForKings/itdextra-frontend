import type { Route } from './+types/Contacts'

import { ContactsPage } from '~/pages/contacts'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'ITDextra' },
		{ name: 'description', content: 'Welcome to ITDextra!' },
	]
}

export default function Contacts() {
	return <ContactsPage />
}
