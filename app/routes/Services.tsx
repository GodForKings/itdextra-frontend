import type { Route } from './+types/Services'

import { ServicesPage } from '~/pages/services'

export async function clientLoader({ params }: Route.ClientLoaderArgs) {}

export async function action() {}

export default function Services({ loaderData }: Route.ComponentProps) {
	return <ServicesPage />
}
