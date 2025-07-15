import type { FC } from 'react'

import { cn, DASHED_BACKGROUND } from '~/shared'

interface DashedBackgroundProps {
	styles?: string
}

export const DashedBackground: FC<DashedBackgroundProps> = props => {
	const { styles } = props

	return <div className={cn(DASHED_BACKGROUND, styles)}></div>
}
