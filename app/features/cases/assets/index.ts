import luxeCars from './luxeCars.png'
import coffee from './coffee.png'

export const images = import.meta.glob('./*.png')

export const CASE_IMGS = {
	luxeCars,
	coffee,
} as const
