export interface Services {
	id: string
	title: string
	description: string
	icon: React.JSX.Element
}

export type ServicesList<T> = {
	title: string
	services: T[]
}

export interface Icons {
	ecommerce: React.JSX.Element
	websites: React.JSX.Element
	design: React.JSX.Element
}
