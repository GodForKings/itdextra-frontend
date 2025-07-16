export interface CaseItem {
	id: string
	title: string
	description: string
	tags: string[]
	image: string
	link: string
}

export type CaseList<T> = {
	title: string
	subtitle: string
	items: T[]
}
