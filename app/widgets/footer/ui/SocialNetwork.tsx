import type { FC } from 'react'

import { cn } from '~/shared'

interface SocialLinkProps {
	children: React.ReactNode
	socialLink: string
	labelName: string
}

export const SocialLink: FC<SocialLinkProps> = props => {
	const { children, socialLink, labelName } = props
	return (
		<a href={socialLink} aria-label={labelName} className={cn('animate-pulse')}>
			{children}
		</a>
	)
}
