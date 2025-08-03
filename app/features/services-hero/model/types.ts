interface CaseStudies {
	title: string
	result: string
}

export interface Service<T> {
	id: string
	title: string
	shortDescription: string
	fullDescription: string
	category: string
	priceRange: string
	deliveryTime: string
	tags: string[]
	caseStudies: CaseStudies[]
	icon: T
}

export interface Category<T> {
	title: string
	description: string
	icon: T
}

export interface HeroData {
	name: string
	thesis: string
	slogan: string[]
	techStack: string[]
}
