import type { FC } from 'react'

import { useUnit } from 'effector-react'

import { HeroSection, MissionSection, TeamSection } from '~/features'
import { cn } from '~/shared'
import { FAQSection } from '~/widgets'
import { faqList } from '../model/index'

export const AboutPage: FC = () => {
	const faqAbout = useUnit(faqList.$faqAboutItems)

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

			<FAQSection faqItems={faqAbout} />
		</main>
	)
}
