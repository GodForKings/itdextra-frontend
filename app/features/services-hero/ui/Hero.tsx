import type { FC } from 'react'

import { useNavigate } from 'react-router'
import { useEffect, useRef } from 'react'

import type { HeroData } from '../model/types'
import type { AnimateHeroRefs } from '../lib/types'

import { Button, ROUTES_DATA, cn } from '~/shared'
import { animateHeroServices } from '../lib/animations'

const mockHeroData: HeroData = {
	name: 'ITDextra',
	thesis: 'DIGITAL EXPERIENCE',
	slogan: [
		'Эксклюзивные',
		' веб-решения для лидеров рынка. ',
		'Никаких шаблонов — только ',
		'индивидуальная разработка и безупречное качество.',
	],
	techStack: ['REACT', 'NODE.JS', 'TYPESCRIPT', 'GO'],
}

export const Hero: FC = () => {
	const navigate = useNavigate()

	const handleCTAClick = () => {
		navigate(ROUTES_DATA.contacts.path)
	}

	const animateRefs: AnimateHeroRefs = {
		sectionRef: useRef<HTMLDivElement | null>(null),
		nameBlock: useRef<HTMLDivElement | null>(null),
		sloganBlock: useRef<HTMLDivElement | null>(null),
		techBlock: useRef<HTMLDivElement | null>(null),
	}
	useEffect(() => {
		/* Для работы только на клиенте */
		if (typeof window === 'undefined') return

		animateHeroServices(animateRefs).catch(console.error)
	}, [])

	return (
		<section
			ref={animateRefs.sectionRef}
			aria-labelledby='section-heading-services'
			className={cn(
				'relative min-h-[80dvh] overflow-hidden flex flex-col items-center justify-center gap-12 backdrop-blur-xl rounded-lg select-none my-5 py-5 container font-light'
			)}
		>
			{/* Фоновые линии */}
			<div className='absolute inset-0 flex items-center justify-center opacity-60 -z-1'>
				<div className='h-[1px] w-full bg-gradient-to-r from-white via-transparent to-white' />
				<div className='w-[1px] h-full bg-gradient-to-b from-transparent via-white to-transparent' />
			</div>

			{/* Контент */}
			<article
				ref={animateRefs.nameBlock}
				className='relative flex flex-col items-center justify-center'
			>
				<h1 className='flex relative text-6xl md:text-8xl font-light text-white tracking-wider mb-5'>
					{mockHeroData.name}
				</h1>

				<div className='h-px w-full bg-white/50'></div>

				<p className='text-base md:text-xl text-gray-400 tracking-widest mt-2'>
					{mockHeroData.thesis}
				</p>
			</article>

			<div
				ref={animateRefs.sloganBlock}
				className='text-2xl text-white text-center max-w-3xl mx-6 p-10 bg-neutral-950/40 rounded-lg'
			>
				{mockHeroData.slogan.map((el: string) => (
					<p
						key={el}
						className={cn(
							'inline',
							'first:text-sky-400 last:italic last:text-sky-400'
						)}
					>
						{el}
					</p>
				))}
			</div>

			<Button
				square={true}
				styles='z-2 font-transparent text-white border-white'
				onClick={handleCTAClick}
			>
				Получить консультацию
			</Button>

			<div
				ref={animateRefs.techBlock}
				className='flex justify-center items-center gap-8 text-xs text-gray-500 tracking-widest mt-8'
			>
				{mockHeroData.techStack.map((tech: string) => (
					<span key={tech}>{tech}</span>
				))}
			</div>
		</section>
	)
}
