import type { FC } from 'react'

import { Link } from 'react-router'

import { ROUTES_DATA, cn } from '~/shared'

export const Navigation: FC = () => {
	return (
		/* Нижняя навигация */
		<div
			className={cn(
				'lg:border-x border-black/5 dark:border-white/20 z-5 flex flex-col justify-center py-4 px-15 gap-4',
				'max-lg:border-b border-black/5 dark:border-white/20'
			)}
		>
			<h3 className={cn('text-xl text-sky-500 underline underline-offset-4')}>
				Навигация
			</h3>

			<ul className='flex flex-col gap-2 justify-center'>
				{Object.values(ROUTES_DATA).map(route => (
					<li key={route.name}>
						<Link
							to={route.path}
							className={cn(
								'text-neutral-950 dark:text-slate-50 transition-all duration-150',
								'hover:underline active:underline'
							)}
						>
							{route.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
