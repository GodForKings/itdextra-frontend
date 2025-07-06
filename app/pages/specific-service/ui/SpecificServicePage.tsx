import type { FC } from 'react'

interface SpecificServiceProps {
	serviceName: string
}
export const SpecificServicePage: FC<SpecificServiceProps> = props => {
	const { serviceName } = props

	return <div>Specific Service Page {serviceName}</div>
}
