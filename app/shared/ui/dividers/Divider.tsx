import type { FC } from 'react'

import { cn } from '~/shared'

interface DividerProps {
	styles?: string
}

export const Divider: FC<DividerProps> = props => {
	const { styles } = props

	return (
		<div className={cn('relative h-px bg-(--pattern-fg) my-2', styles)}></div>
	)
}
