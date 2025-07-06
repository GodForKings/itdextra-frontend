import type { FC } from 'react'

import { NUMBER_PHONE } from '~/shared'

interface PhoneNumberProps {
	styles?: string
}

export const PhoneNumber: FC<PhoneNumberProps> = props => {
	const { styles } = props
	return (
		<a
			href={NUMBER_PHONE}
			className={`${styles} group relative px-1.5 text-sm/6 text-sky-800 dark:text-sky-300`}
		>
			<span className='absolute inset-0 border border-dashed border-sky-300/60 bg-sky-400/10 group-hover:bg-sky-400/15 dark:border-sky-300/30'></span>
			8 (905) 975-05-55
		</a>
	)
}
