import type { FC } from 'react'

import { HeroSection } from '~/widgets'
import { Divider } from '~/shared'
import { CaseSection, ServicesSection, WhyUsSection } from '~/features'

export const MainPage: FC = () => {
	return (
		<div className='mt-14 rounded-xl bg-white text-sm/7 text-gray-700 dark:bg-gray-950 dark:text-gray-300'>
			<HeroSection />

			<Divider />

			<ServicesSection />

			<Divider />

			<CaseSection />

			<Divider />

			<WhyUsSection />
		</div>
	)
}
