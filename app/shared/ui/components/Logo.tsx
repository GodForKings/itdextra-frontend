import type { FC } from 'react'

import { Link } from 'react-router'
import { ROUTES_DATA } from '~/shared'
import logo from '~/shared/assets/icons/itdextraIcon.png'

export const Logo: FC = () => {
	return (
		<Link to={ROUTES_DATA.index.path}>
			<img src={logo} className='h-11' alt='ITDextra logo' />
		</Link>
	)
}
