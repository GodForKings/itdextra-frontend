export interface Services {
	id: string
	title: string
	description: string
	icon: string
}

export type ServicesList<T> = {
	title: string
	services: T[]
}
