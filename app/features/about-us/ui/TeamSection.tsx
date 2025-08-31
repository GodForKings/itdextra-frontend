import type { FC } from 'react'

import { aboutListModel } from '../model/index'
import { cn } from '~/shared'
import { useUnit } from 'effector-react'

export const TeamSection: FC = () => {
	const team = useUnit(aboutListModel.stores.$aboutTeam)

	return (
		<section
			className={cn(
				'w-full min-h-[75dvh] rounded-lg p-4 lg:p-8',
				'flex flex-col justify-evenly items-start gap-8',
				'relative font-thin'
			)}
		>
			<h1
				className={cn(
					'text-5xl lg:text-8xl tracking-tight',
					'flex items-center justify-center',
					'[perspective:600px] [perspective-origin:50%_50%] [transform-style:preserve-3d]'
				)}
			>
				<span className='text-black dark:text-white'>Наша команда</span>
			</h1>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
				{team.map((person, index: number) => (
					<div
						key={`${person.role + index}`}
						className={cn(
							'p-6 bg-gray-900/80 rounded-lg border border-sky-500/20',
							'flex flex-col items-center text-center transition-all duration-300',
							'hover:shadow-lg hover:shadow-sky-500/30 hover:-translate-y-1'
						)}
					>
						<img
							src={person.photo}
							alt={person.role}
							className='min-w-full object-cover rounded-full'
						></img>
						<h3 className='text-xl font-thin text-white mb-2'>{person.name}</h3>

						<p className='text-base font-thin text-sky-400 mb-4'>
							{person.role}
						</p>

						<p
							className={cn(
								'relative p-4 rounded-lg',
								'bg-gray-400 dark:bg-gray-950',
								'text-sm text-black dark:text-white'
							)}
						>
							{person.description}
						</p>
					</div>
				))}
			</div>
		</section>
	)
}
