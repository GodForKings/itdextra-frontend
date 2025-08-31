import hacker1 from './hackerProfile1.png'
import hacker2 from './hackerProfile2.png'
import hacker3 from './hackerProfile3.png'
import hacker4 from './hackerProfile4.png'

export const HACKER_ALBUM = {
	hacker1,
	hacker2,
	hacker3,
	hacker4,
} as const

export type HackerAlbum = (typeof HACKER_ALBUM)[keyof typeof HACKER_ALBUM]
