import type { FC } from 'react'

import type { MissionAboutRefs } from '../lib/types'

import { useRef, useEffect } from 'react'
import { useUnit } from 'effector-react'

import { cn } from '~/shared'
import { animateMissionAbout } from '../lib/animations'
import { aboutListModel } from '../model/index'

export const MissionSection: FC = () => {
	const missionList = useUnit(aboutListModel.stores.$aboutMission)

	const animateRefs: MissionAboutRefs = {
		section: useRef<HTMLDivElement>(null),
		title: useRef<HTMLHeadingElement>(null),
		description: useRef<(HTMLParagraphElement | null)[]>([]),
		horizontalGlare: useRef<HTMLDivElement>(null),
		verticalGlare: useRef<HTMLDivElement>(null),
	}

	useEffect(() => {
		/* SSR dodge */
		if (typeof window === 'undefined') return
		let cleanup: (() => void) | undefined

		animateMissionAbout(animateRefs)
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
				'w-full min-h-[60dvh] rounded-lg p-4 lg:p-8',
				'flex flex-col justify-evenly items-end gap-6',
				'opacity-0 relative font-thin'
			)}
		>
			<h2
				ref={animateRefs.title}
				className={cn(
					'text-5xl lg:text-8xl tracking-tight text-black dark:text-white'
				)}
			>
				Наша миссия
			</h2>

			<div
				className={cn(
					'flex flex-col gap-3 max-w-4xl justify-center items-start',
					'p-4 lg:p-8 rounded-lg z-1',
					'bg-gradient-to-r from-gray-100/70 to-white/80',
					'dark:from-gray-900/80 dark:to-gray-800/80',
					'border border-black dark:border-sky-500/20'
				)}
			>
				{missionList?.map((element, index: number) => (
					<p
						key={element}
						className='text-gray-700 dark:text-sky-400 leading-relaxed text-xl lg:text-3xl text-left'
						ref={(text: HTMLParagraphElement | null) => {
							if (text) animateRefs.description.current[index] = text
						}}
					>
						<span className='text-sky-500 dark:text-white'>• </span>

						{element}
					</p>
				))}
			</div>

			{/* Блики */}
			<div
				className={cn(
					'absolute rounded-full pointer-events-none blur-2xl animate-pulse',
					'bg-gradient-to-tl from-blue-600 to-transparent w-60 h-full',
					'bottom-0 left-0'
				)}
				ref={animateRefs.verticalGlare}
			></div>

			<div
				className={cn(
					'absolute rounded-full pointer-events-none blur-xl opacity-0',
					'bg-gradient-to-tl from-blue-600 dark:from-violet-600 to-transparent w-full h-30',
					'bottom-0 right-0'
				)}
				ref={animateRefs.horizontalGlare}
			></div>
		</section>
	)
}
