import type { FC } from 'react'

import { cn } from '~/shared'

interface DescBlockProps {
	title: React.ReactNode
	children: React.ReactNode
	styleBlock?: string
	styleHeading?: string
}

export const DescBlock: FC<DescBlockProps> = props => {
	const { title, children, styleBlock, styleHeading } = props

	return (
		<div className={cn('flex items-center gap-4', styleBlock)}>
			<h4 className={cn('font-medium text-gray-200', styleHeading)}>{title}</h4>

			{children}
		</div>
	)
}
