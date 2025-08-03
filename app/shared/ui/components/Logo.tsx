import type { FC } from 'react'

import { Link } from 'react-router'

import { ROUTES_DATA, ICONS } from '~/shared'

export const Logo: FC = () => {
	return (
		<Link to={ROUTES_DATA.index.path}>
			<img
				src={ICONS.ITDextraLogo}
				className='h-10 md:h-12'
				alt='ITDextra logo'
			/>
		</Link>
	)
}
