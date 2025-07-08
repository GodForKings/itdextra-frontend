import type { FC } from 'react'
import { HeroSection } from '~/widgets'
import { LinearStyleHero } from '~/widgets/hero-section/ui/LinearStyleHero'

export const MainPage: FC = () => {
	return (
		<div className='rounded-xl bg-white p-5 text-sm/7 text-gray-700 dark:bg-gray-950 dark:text-gray-300 mt-14'>
			<HeroSection />

			<LinearStyleHero />
		</div>
	)
}
