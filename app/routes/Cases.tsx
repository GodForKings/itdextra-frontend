import type { Route } from './+types/Cases'

import { CasesPage } from '~/pages/cases'

export async function clientLoader({ params }: Route.ClientLoaderArgs) {}

export async function action() {}

export default function Cases({ loaderData }: Route.ComponentProps) {
	return <CasesPage />
}
