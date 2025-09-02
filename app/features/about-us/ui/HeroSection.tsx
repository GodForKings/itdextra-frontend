import type { FC } from 'react'
import type { HeroAboutRefs } from '../lib/types'

import { useEffect, useRef } from 'react'
import { useUnit } from 'effector-react'
import { Headset } from 'lucide-react'

import { Button, cn, useCTAModal } from '~/shared'
import { animateHeroAbout } from '../lib/animations'
import { aboutListModel } from '../model'

export const HeroSection: FC = () => {
	const aboutHero = useUnit(aboutListModel.stores.$aboutHero)

	const handleCTAClick = useCTAModal()

	const animateRefs: HeroAboutRefs = {
		section: useRef<HTMLDivElement>(null),
		title: useRef<HTMLSpanElement>(null),
		slogan: useRef<HTMLParagraphElement>(null),
		button: useRef<HTMLDivElement>(null),
	}

	useEffect(() => {
		/* SSR dodge */
		if (typeof window === 'undefined') return
		let cleanup: (() => void) | undefined

		animateHeroAbout(animateRefs)
			.then(clear => {
				cleanup = clear
			})
			.catch(console.error)

		return () => {
			cleanup?.()
		}
	}, [])

	return (
		<section
			ref={animateRefs.section}
			className={cn(
				'w-full min-h-[75dvh] rounded-lg p-4 lg:p-8',
				'flex flex-col justify-evenly items-start gap-6',
				'relative font-thin opacity-0'
			)}
		>
			<h1
				className={cn(
					'text-5xl lg:text-8xl tracking-tight',
					'flex items-center justify-center',
					'[perspective:600px] [perspective-origin:50%_50%] [transform-style:preserve-3d]'
				)}
			>
				<span className='text-black dark:text-white' ref={animateRefs.title}>
					{aboutHero.title}
				</span>
			</h1>

			<p
				className='text-lg lg:text-3xl max-w-4xl leading-relaxed'
				ref={animateRefs.slogan}
			>
				{aboutHero.slogan}
			</p>

			<div ref={animateRefs.button}>
				<Button
					ariaLabelDesc='Связаться с ITDextra'
					onClick={handleCTAClick}
					square={false}
					styles='font-inherit gap-2'
				>
					Связаться с нами
					<Headset size={20} strokeWidth={1} />
				</Button>
			</div>

			{/* Блик */}
			<div
				className={cn(
					'absolute rounded-full opacity-80 pointer-events-none blur-2xl animate-pulse',
					'bg-gradient-to-tl from-blue-600 dark:from-violet-600 to-transparent w-80 h-150',
					'bottom-0 lg:right-20 max-lg:hidden'
				)}
			></div>
		</section>
	)
}
