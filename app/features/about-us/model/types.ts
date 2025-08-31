import type { HackerAlbum } from '../assets'

export interface AboutHero {
	title: string
	slogan: string
}

export interface AboutTeam {
	name: string
	role: string
	description: string
	photo: HackerAlbum
}
