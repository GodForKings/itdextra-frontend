import type { FC } from 'react'

import { CaseStudies } from '~/features'

import { BackgroundVideo } from '~/shared'

export const CasesPage: FC = () => {
	return (
		<main className='relative z-1 mx-[2dvw] mb-[2dvh] flex items-center justify-center'>
			<CaseStudies />

			<BackgroundVideo />
		</main>
	)
}
