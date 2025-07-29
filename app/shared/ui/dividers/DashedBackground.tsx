import type { FC } from 'react'

import { cn, MASSIVE_DASHED } from '~/shared'

interface DashedBackgroundProps {
	styles?: string
}

export const DashedBackground: FC<DashedBackgroundProps> = props => {
	const { styles } = props

	return <div className={cn(MASSIVE_DASHED, styles)}></div>
}
