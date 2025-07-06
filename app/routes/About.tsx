import type { Route } from './+types/About'

import { AboutPage } from '~/pages/about'

export async function clientLoader({ params }: Route.ClientLoaderArgs) {}

export async function action() {}

export default function About() {
	return <AboutPage />
}
