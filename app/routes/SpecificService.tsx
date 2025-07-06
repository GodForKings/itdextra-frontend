import type { Route } from './+types/SpecificService'

import { SpecificServicePage } from '~/pages/specific-service'

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
	const serviceName: string = params.name

	return { serviceName }
}

export async function action() {}

export default function Services({ loaderData }: Route.ComponentProps) {
	return <SpecificServicePage serviceName={loaderData.serviceName} />
}
