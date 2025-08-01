import type { FC } from 'react'
import { ServicesGeneral } from '~/features'

import { BackgroundVideo } from '~/shared'

export const ServicesPage: FC = () => {
	return (
		<main className='relative z-1 mt-16 mx-[2dvw] mb-[2dvh] min-h-[100dvh] bg-transparent flex flex-col items-center'>
			<ServicesGeneral />

			<BackgroundVideo />
		</main>
	)
}
