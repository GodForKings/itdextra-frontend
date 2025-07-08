import type { FC } from 'react'

import { MenuLinks } from '../lib/MenuLinks'

export const DesktopNav: FC = () => {
	return (
		<ul className='flex items-center justify-center gap-6 max-md:hidden'>
			<MenuLinks />
		</ul>
	)
}
