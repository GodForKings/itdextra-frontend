import type { FC } from 'react'

import { HeroSection, MissionSection, TeamSection } from '~/features'

import { GRID_LINES, cn } from '~/shared'
import { FAQSection } from '~/widgets'

export const AboutPage: FC = () => {
	return (
		<main
			className={cn(
				'min-h-[100dvh] mx-[2dvw] my-[2dvh] rounded-lg bg-white text-sm/7 text-gray-700 dark:bg-gray-950 dark:text-gray-300',
				'flex flex-col items-center gap-12 p-4 lg:p-8 relative'
			)}
		>
			<HeroSection />

			<MissionSection />

			<TeamSection />

			<FAQSection />
		</main>
	)
}
