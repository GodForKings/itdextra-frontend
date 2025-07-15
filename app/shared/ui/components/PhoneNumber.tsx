import type { FC } from 'react'

import { Link, NUMBER_PHONE_LINK, PHONE } from '~/shared'

interface PhoneNumberProps {
	styles?: string
}

export const PhoneNumber: FC<PhoneNumberProps> = props => {
	const { styles } = props
	return (
		<Link currentLink={NUMBER_PHONE_LINK} styles={styles}>
			{PHONE}
		</Link>
	)
}
