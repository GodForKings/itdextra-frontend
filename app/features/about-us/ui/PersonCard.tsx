import type { FC } from 'react'

import type { AboutTeam } from '../model/types'

import { cn } from '~/shared'

interface PersonCardProps {
	index: number
	person: AboutTeam
	personsRef: React.RefObject<(HTMLElement | null)[]>
}
export const PersonCard: FC<PersonCardProps> = props => {
	const { index, person, personsRef } = props

	const { photo, role, description, name } = person

	return (
		<article
			className={cn(
				'bg-gradient-to-r from-gray-100/90 to-white/80',
				'dark:from-gray-900/80 dark:to-gray-800/80',
				'border border-black dark:border-sky-500/20',
				'flex flex-col items-center text-center transition-all duration-300',
				'hover:shadow-lg hover:shadow-sky-500/30 hover:-translate-y-1',
				'p-6 rounded-lg'
			)}
			ref={item => {
				if (item) personsRef.current[index] = item
			}}
		>
			<img
				src={photo}
				alt={role}
				className='min-w-full object-cover rounded-full'
			></img>

			<h3 className='text-xl font-thin text-black dark:text-white mb-2'>
				{name}
			</h3>

			<p className='text-base font-thin text-sky-400 mb-4'>{role}</p>

			<p
				className={cn(
					'relative p-4 rounded-lg',
					'bg-gray-400 dark:bg-gray-950',
					'text-sm text-black dark:text-white'
				)}
			>
				{description}
			</p>
		</article>
	)
}
