import type { FC } from 'react'

import { cn } from '~/shared'

interface TeamMember {
	name: string
	role: string
	bio: string
	photo: string
}

const teamMembers: TeamMember[] = [
	{
		name: 'Иван Иванов',
		role: 'Генеральный директор',
		bio: 'Руководит стратегией фирмы, с фокусом на партнёрствах и продуктовой разработке. Готов инвестировать в ваш успех как в свой — от идеи до масштаба.',
		photo: 'https://placehold.co/150x150?text=ИИ',
	},
	{
		name: 'Алексей Петров',
		role: 'CEO',
		bio: 'Ведёт операции, обеспечивая, что каждый проект — это не код, а бизнес-акселератор. Открыт к продуктовой разработке как партнёр для долгосрочного роста.',
		photo: 'https://placehold.co/150x150?text=АП',
	},
]

export const TeamCardsSection: FC = () => {
	return (
		<section
			className={cn(
				'w-full max-w-7xl py-16 px-6 rounded-xl',
				'bg-gray-800/50 backdrop-blur-md border border-sky-500/20',
				'dark:bg-gray-800/50 dark:border-sky-500/20',
				'bg-white/90 border-gray-300/20'
			)}
		>
			<h2 className='text-3xl md:text-4xl font-thin text-white dark:text-white text-black mb-8 text-center'>
				Наше руководство
			</h2>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
				{teamMembers.map((member, index) => (
					<div
						key={index}
						className={cn(
							'p-6 bg-gray-900/80 rounded-lg border border-sky-500/20',
							'flex flex-col items-center text-center transition-all duration-300',
							'hover:shadow-lg hover:shadow-sky-500/30 hover:scale-105',
							'dark:bg-gray-900/80 dark:border-sky-500/20 dark:hover:shadow-sky-500/30',
							'bg-white border-gray-300/20 hover:shadow-gray-300/30'
						)}
					>
						<img
							src={member.photo}
							alt={member.name}
							className='w-24 h-24 md:w-32 md:h-32 rounded-full mb-4 object-cover'
						/>
						<h3 className='text-xl font-thin text-white dark:text-white text-black mb-2'>
							{member.name}
						</h3>
						<p className='text-base text-sky-400 dark:text-sky-400 text-sky-500 mb-4'>
							{member.role}
						</p>
						<p className='text-sm text-sky-400/80 dark:text-sky-400/80 text-sky-500/80 font-thin'>
							{member.bio}
						</p>
					</div>
				))}
			</div>
		</section>
	)
}
