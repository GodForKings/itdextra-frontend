import type { FC } from 'react'

import { useUnit } from 'effector-react'
import { useRef, useEffect } from 'react'

import { cn } from '~/shared'
import { aboutListModel } from '../model/index'
import { PersonCard } from './PersonCard'
import { animateTeamAbout } from '../lib/animations'

export const TeamSection: FC = () => {
	console.log('render')
	const team = useUnit(aboutListModel.stores.$aboutTeam)

	const animateRefs = {
		section: useRef<HTMLDivElement>(null),
		title: useRef<HTMLHeadingElement>(null),
		personsRef: useRef<(HTMLElement | null)[]>([]),
	}

	useEffect(() => {
		/* SSR dodge */
		if (typeof window === 'undefined') return
		let cleanup: (() => void) | undefined

		animateTeamAbout(animateRefs)
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
			className={cn(
				'w-full min-h-[75dvh] rounded-lg p-4 lg:p-8',
				'flex flex-col justify-evenly items-start gap-8',
				'relative opacity-0 font-thin overflow-hidden'
			)}
			ref={animateRefs.section}
		>
			<h1
				className={cn(
					'text-5xl lg:text-8xl tracking-tight',
					'flex items-center justify-center',
					'[perspective:600px] [perspective-origin:50%_50%] [transform-style:preserve-3d]'
				)}
			>
				<span className='text-black dark:text-white' ref={animateRefs.title}>
					Наша команда
				</span>
			</h1>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
				{team.map((person, index: number) => (
					<PersonCard
						key={`${person.role + index}`}
						index={index}
						person={person}
						personsRef={animateRefs.personsRef}
					/>
				))}
			</div>
		</section>
	)
}
