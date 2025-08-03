export interface Service<T> {
	id: string
	title: string
	shortDescription: string
	fullDescription: string
	category: 'Веб-приложения' | 'E-commerce' | 'Дизайн'
	icon?: T
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
