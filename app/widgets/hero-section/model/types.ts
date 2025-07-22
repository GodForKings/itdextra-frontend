export type HeroSection<T> = {
	name: string[] // буквы названия
	slogan: string // слоган фирмы
	thesis: string // тезис
	description: T[] // текстовки снизу
}
