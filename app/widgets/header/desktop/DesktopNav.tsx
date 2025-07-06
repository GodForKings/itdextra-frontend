import type { FC } from 'react'

import { NavLink } from 'react-router'
import { ROUTES_DATA } from '~/shared'

export const DesktopNav: FC = () => {
	return (
		<ul className='flex items-center justify-center gap-6 max-md:hidden'>
			{Object.values(ROUTES_DATA).map(route => (
				<NavLink
					key={route.name}
					className='text-sm/8 text-gray-950 dark:text-white hover:text-sky-400 active:text-sky-400'
					to={route.path}
				>
					{route.name}
				</NavLink>
			))}
		</ul>
	)
}
