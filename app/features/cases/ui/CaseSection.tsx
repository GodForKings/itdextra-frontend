import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useUnit } from 'effector-react'

import { animateSection } from '../lib/animations'
import { casesList } from '../model/caseList'
import { Button, cn } from '~/shared'

export const CaseSection = () => {
	const cases = useUnit(casesList.stores.$cases)

	const sectionRef = useRef<HTMLDivElement>(null)
	const titleRef = useRef<HTMLHeadingElement>(null)
	const subtitleRef = useRef<HTMLParagraphElement>(null)
	const casesRef = useRef<(HTMLDivElement | null)[]>([])
	const buttonRef = useRef<HTMLDivElement>(null)

	const navigate = useNavigate()

	useEffect(() => {
		if (typeof window === 'undefined') return

		animateSection({
			sectionRef,
			titleRef,
			subtitleRef,
			casesRef,
			buttonRef,
		}).catch(console.error)
	}, [])

	return (
		<section
			ref={sectionRef}
			className='relative m-5 rounded-lg border border-(--pattern-fg) py-18 px-4 sm:px-8 overflow-hidden bg-gradient-to-l from-white to-slate-100 dark:from-gray-950/[7.5%] dark:to-gray-700/10 flex flex-col items-center justify-center gap-10'
		>
			{/* Декоративные элементы */}
			<div className='absolute inset-0 overflow-hidden pointer-events-none'>
				<div className='absolute top-10 left-10 w-40 h-40 rounded-full bg-blue-400/40 blur-2xl' />

				<div className='absolute bottom-20 right-20 w-60 h-60 rounded-full bg-blue-400 blur-3xl' />
			</div>

			{/* Заголовок секции */}
			<div className='container mx-auto max-w-6xl text-center flex flex-col items-center justify-center gap-5'>
				<h2 ref={titleRef} className='text-4xl md:text-6xl'>
					<span className='text-transparent bg-clip-text bg-gradient-to-r from-neutral-950 to-sky-700 dark:from-sky-600 dark:to-white'>
						{cases.title}
					</span>
				</h2>

				<p
					ref={subtitleRef}
					className='text-lg text-neutral-950/90 dark:text-slate-200 max-w-2xl mx-auto'
				>
					{cases.subtitle}
				</p>
			</div>

			{/* Список кейсов */}
			<div className='container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12'>
				{cases.items.map((caseItem, index) => (
					<div
						key={caseItem.id}
						ref={(el: HTMLDivElement | null) => {
							if (el) casesRef.current[index] = el
						}}
						className={cn(
							'group relative rounded-lg overflow-hidden',
							'bg-white/80 dark:bg-neutral-800/80 backdrop-blur-lg',
							'border border-neutral-200 dark:border-neutral-700',
							'shadow-xl hover:shadow-2xl transition-all duration-100',
							'hover:-translate-y-2'
						)}
						onClick={() => navigate(caseItem.link)}
					>
						{/* Изображение кейса */}
						<div className='relative h-60 overflow-hidden'>
							<img
								src={cases.items[0].image}
								alt={caseItem.title}
								className='case-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
							/>
							<div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
						</div>

						{/* Контент кейса */}
						<div className='p-6'>
							<h3 className='text-2xl font-bold mb-3'>{caseItem.title}</h3>

							<p className='text-neutral-600 dark:text-neutral-300 mb-4'>
								{caseItem.description}
							</p>

							<div className='flex flex-wrap gap-2'>
								{caseItem.tags.map(tag => (
									<span
										key={tag}
										className='px-3 py-1 rounded-full text-xs font-medium bg-sky-100 dark:bg-sky-900/50 text-sky-800 dark:text-sky-200'
									>
										{tag}
									</span>
								))}
							</div>
						</div>

						{/* Эффект при наведении */}
						<div className='absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
							<div className='absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,182,255,0.1)_0%,_transparent_70%)]' />
						</div>
					</div>
				))}
			</div>

			{/* Призыв к действию */}
			<Button square={true} onClick={() => navigate('/contact')}>
				Хочу такой же проект!
			</Button>
		</section>
	)
}
