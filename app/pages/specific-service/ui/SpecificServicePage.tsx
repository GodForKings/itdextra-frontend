import type { FC } from 'react'

interface SpecificServiceProps {
	serviceName: string
}
export const SpecificServicePage: FC<SpecificServiceProps> = props => {
	const { serviceName } = props

	return <main>Specific Service Page {serviceName}</main>
}
