interface Result {
	title: string
	result: string
}

export interface Service {
	id: string
	title: string
	shortDescription: string
	fullDescription: string
	category: string
	priceRange: string
	deliveryTime: string
	tags: string[]
	caseStudies: Result[]
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
