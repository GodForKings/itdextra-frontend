import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useUnit } from 'effector-react'

import { animateSection } from '../lib/animations'
import { casesList } from '../model/caseList'
import { Button, cn, ROUTES_DATA } from '~/shared'

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
			className='relative m-5 rounded-lg border border-(--pattern-fg) py-18 px-4 sm:px-8 overflow-hidden bg-gradient-to-t from-white to-slate-100 dark:from-gray-950/[7.5%] dark:to-gray-700/10 flex flex-col items-center justify-center gap-10'
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
							'bg-white/60 dark:bg-neutral-800/60 backdrop-blur-lg',
							'border border-neutral-200 dark:border-neutral-700',
							'shadow-xl hover:shadow-2xl transition-all duration-100'
						)}
						onClick={() => {}}
					>
						{/* Изображение кейса */}
						<div className='relative h-70 overflow-hidden'>
							<img
								src={caseItem.image}
								alt={caseItem.title}
								className='w-full h-full object-cover transition-transform duration-400 group-hover:scale-110'
							/>

							<div className='absolute inset-0 bg-gradient-to-t from-neutral-950/60 to-transparent' />
						</div>

						{/* Контент кейса */}
						<div className='p-6 flex flex-col items-start justify-center gap-4'>
							<h3 className='text-2xl text-neutral-950 dark:text-sky-600/90'>
								{caseItem.title}
							</h3>

							<p className='text-neutral-800 dark:text-slate-200'>
								{caseItem.description}
							</p>

							<div className='flex flex-wrap gap-2'>
								{caseItem.tags.map((tag, index) => (
									<span
										key={tag}
										className={cn(
											'px-3 py-2 rounded-full text-xs font-mono text-neutral-950 dark:text-slate-200',
											index % 2
												? 'bg-sky-700 dark:bg-neutral-950/90'
												: 'bg-neutral-900/50 dark:bg-sky-700/80'
										)}
									>
										{tag}
									</span>
								))}
							</div>
						</div>

						{/* Эффект при наведении */}
						<div className='absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
							<div className='absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,182,255,0.1)_0%,_transparent_70%)]' />
						</div>
					</div>
				))}
			</div>

			{/* Призыв к действию */}
			<div ref={buttonRef} className=''>
				<Button
					square={true}
					onClick={() => navigate(ROUTES_DATA.contacts.path)}
				>
					Хочу такой же проект!
				</Button>
			</div>
		</section>
	)
}
