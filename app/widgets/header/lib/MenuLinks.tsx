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
								'relative select-none text-lg md:text-sm/8 text-inherit',
								'transition-all duration-1000',
								isActive &&
									'bg-gradient-to-t from-sky-500 to-teal-500 bg-clip-text text-transparent'
							)
						}
					>
						{({ isActive }) => (
							<>
								{route.name}

								{[...Array(2)].map((_, index: number) => (
									<span
										key={index}
										className={cn(
											'absolute h-px bg-gradient-to-t from-indigo-800 to-teal-500',
											'transition-all duration-500 ease-in',
											index ? 'left-0 -bottom-1' : 'right-0 -top-px',
											isActive
												? 'w-full opacity-100'
												: [
														'w-0 opacity-0',
														'group-hover:w-full group-hover:opacity-60',
														'group-active:w-full group-active:opacity-60',
												  ]
										)}
									/>
								))}
							</>
						)}
					</NavLink>
				</li>
			))}
		</>
	)
}
