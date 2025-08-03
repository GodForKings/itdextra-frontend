import type { FC } from 'react'

import { MenuLinks } from '../lib/MenuLinks'

export const DesktopNav: FC = () => {
	return (
		<ul className='flex items-center justify-center gap-5 max-md:hidden text-sky-400 dark:text-slate-50'>
			<MenuLinks />
		</ul>
	)
}
