import type { FC } from 'react'

import { NavLink } from 'react-router'

import { ROUTES_DATA, cn } from '~/shared'

export const MenuLinks: FC = () => {
	return (
		<>
			{Object.values(ROUTES_DATA).map(route => (
				<li key={route.name} className='relative group'>
					<NavLink
						to={route.path}
						className={({ isActive }) =>
							cn(
								'relative text-sm/8 text-gray-950 dark:text-white select-none',
								'hover:text-sky-500 transition-colors duration-300',
								isActive && 'text-sky-500 dark:text-sky-500 opacity-90'
							)
						}
					>
						{({ isActive }) => (
							<>
								{route.name}
								<span
									className={cn(
										'absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-sky-400 to-blue-500',
										'transition-all duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]',
										isActive
											? 'w-full opacity-100'
											: 'w-0 opacity-0 group-hover:w-full group-hover:opacity-60'
									)}
								/>
							</>
						)}
					</NavLink>
				</li>
			))}
		</>
	)
}
