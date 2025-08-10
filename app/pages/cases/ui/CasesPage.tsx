import type { FC } from 'react'
import { CaseStudies } from '~/features/studio-cases'

import { BackgroundVideo } from '~/shared'

export const CasesPage: FC = () => {
	return (
		<main className='relative z-1'>
			<CaseStudies />

			<BackgroundVideo />
		</main>
	)
}
