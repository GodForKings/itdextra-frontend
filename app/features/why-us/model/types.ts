export interface WhyUS<T, Obj> {
	slogan: string
	thesis: T[]
	pluses: Obj[]
}

export type Pluses = {
	title: string
	description: string
	tech: string[]
}
