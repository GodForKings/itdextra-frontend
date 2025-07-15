import type { Route } from './+types/SpecificService'

import { SpecificServicePage } from '~/pages'

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
	const serviceName: string = params.name

	return { serviceName }
}

export async function action() {}

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'ITDextra — Веб-разработка и цифровые решения по всей России' },
	]
}

export default function Services({ loaderData }: Route.ComponentProps) {
	return <SpecificServicePage serviceName={loaderData.serviceName} />
}
