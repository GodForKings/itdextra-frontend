import type { FC } from 'react'

import { Symbiosis } from '~/features'

import { GRID_LINES, cn } from '~/shared'

export const AboutPage: FC = () => {
	return (
		<main
			className={cn(
				'pt-16 px-[2dvw] min-h-[100dvh] bg-white dark:bg-gray-950',
				GRID_LINES
			)}
		>
			<Symbiosis />
		</main>
	)
}
