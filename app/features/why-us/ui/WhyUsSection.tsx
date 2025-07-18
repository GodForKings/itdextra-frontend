import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { cn } from '~/shared'

export const WhyUsSection = () => {
	const sectionRef = useRef<HTMLDivElement>(null)
	const titleRef = useRef<HTMLHeadingElement>(null)
	const subtitleRef = useRef<HTMLParagraphElement>(null)
	const cardsRef = useRef<(HTMLDivElement | null)[]>([])
	const buttonRef = useRef<HTMLButtonElement>(null)

	const navigate = useNavigate()

	/* Подумать в каком направлении двигаться */
	const advantages = [
		{
			id: 1,
			icon: '💎',
			title: 'Элитная экспертиза',
			description:
				'Наша команда состоит из топовых специалистов с опытом в международных проектах',
		},
		{
			id: 2,
			icon: '⚡',
			title: 'Премиум решения',
			description:
				'Используем только проверенные технологии и инновационные подходы',
		},
		{
			id: 3,
			icon: '🛡️',
			title: 'Конфиденциальность',
			description: 'Полная безопасность данных по международным стандартам',
		},
		{
			id: 4,
			icon: '🤝',
			title: 'Персональный подход',
			description:
				'Индивидуальные решения для каждого клиента с пожизненной поддержкой',
		},
	]

	return (
		<>
			<section className='relative py-24 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-950 via-gray-900 to-neutral-950 overflow-hidden'>
				{/* Cyber grid overlay */}
				<div className='absolute inset-0 opacity-20'>
					<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid.png')] bg-[length:40px_40px]" />
				</div>

				{/* Animated cyber elements */}
				<div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse' />
				<div className='absolute bottom-0 right-0 h-full w-1 bg-gradient-to-t from-transparent via-sky-400 to-transparent animate-pulse-delay' />

				<div className='container mx-auto px-6 relative z-10'>
					<div className='text-center mb-16'>
						<span className='text-emerald-400 font-mono text-sm tracking-widest mb-4 inline-block'>
							// ITDextra ПРЕИМУЩЕСТВА
						</span>
						<h2 className='text-4xl md:text-6xl font-medium text-white'>
							<span className='text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400'>
								Технологии будущего
							</span>
							<span className='text-emerald-400 font-mono animate-pulse'>
								_
							</span>
						</h2>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto'>
						{[
							{
								title: 'Искусственный интеллект',
								description:
									'Внедряем AI в каждый проект для максимальной эффективности',
								tech: ['Machine Learning', 'Neural Networks', 'NLP'],
							},
							{
								title: 'Блокчейн решения',
								description: 'Создаем защищенные децентрализованные системы',
								tech: ['Smart Contracts', 'Web3', 'DeFi'],
							},
							{
								title: 'Квантовые алгоритмы',
								description:
									'Используем квантовые вычисления для сложных задач',
								tech: ['Q#', 'Quantum ML', 'Optimization'],
							},
							{
								title: 'Кибербезопасность',
								description: 'Многоуровневая защита от любых угроз',
								tech: ['Zero Trust', 'Pentesting', 'Ethical Hacking'],
							},
						].map((item, index) => (
							<div
								key={index}
								className='bg-neutral-900/70 border border-neutral-800 rounded-xl p-6 hover:border-emerald-400/50 transition-all duration-300 group'
							>
								<h3 className='text-xl font-mono text-emerald-400 mb-3'>
									{item.title}
								</h3>
								<p className='text-neutral-300 mb-4 font-light'>
									{item.description}
								</p>
								<div className='flex flex-wrap gap-2'>
									{item.tech.map((tech, i) => (
										<span
											key={i}
											className='px-3 py-1 rounded-full text-xs font-mono bg-neutral-800 text-emerald-300 border border-emerald-400/20'
										>
											{tech}
										</span>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className='relative py-32 bg-white dark:bg-neutral-950 overflow-hidden'>
				{/* Subtle texture */}
				<div className='absolute inset-0 opacity-5 dark:opacity-[0.03]'>
					<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/crisp-paper-ruffles.png')]" />
				</div>

				<div className='container mx-auto px-6 max-w-6xl'>
					<div className='text-center mb-20'>
						<h2 className='text-4xl md:text-6xl font-light text-neutral-900 dark:text-white mb-6'>
							<span className='border-b-2 border-emerald-500 pb-2'>
								Идеальный симбиоз
							</span>
						</h2>
						<p className='text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto'>
							Где безупречный дизайн встречается с безукоризненной
							функциональностью
						</p>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{[
							{
								icon: '🖥️',
								title: 'Элегантный код',
								description: 'Чистая архитектура и продуманные решения',
							},
							{
								icon: '📱',
								title: 'Безупречный UI/UX',
								description: 'Интуитивные интерфейсы с вниманием к деталям',
							},
							{
								icon: '⚙️',
								title: 'Идеальная производительность',
								description:
									'Оптимизированные решения для максимальной скорости',
							},
						].map((item, index) => (
							<div key={index} className='relative group'>
								<div className='absolute -inset-1 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity duration-300' />
								<div className='relative bg-white dark:bg-neutral-900 rounded-lg p-8 h-full border border-neutral-200 dark:border-neutral-800 group-hover:border-transparent transition-all duration-300'>
									<div className='text-4xl mb-6'>{item.icon}</div>
									<h3 className='text-xl font-medium text-neutral-900 dark:text-white mb-3'>
										{item.title}
									</h3>
									<p className='text-neutral-600 dark:text-neutral-400'>
										{item.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className='relative py-28 bg-neutral-950 overflow-hidden'>
				{/* Diamond background pattern */}
				<div className='absolute inset-0 opacity-5'>
					<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')]" />
				</div>

				{/* Animated floating diamonds */}
				<div className='absolute top-1/4 left-1/4 w-32 h-32 bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/30 rotate-45 animate-float' />
				<div className='absolute bottom-1/3 right-1/4 w-24 h-24 bg-sky-500/10 backdrop-blur-sm border border-sky-500/30 rotate-45 animate-float-delay' />

				<div className='container mx-auto px-6 relative z-10'>
					<h2 className='text-5xl md:text-7xl font-light text-center mb-12'>
						<span className='text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-300'>
							Безупречность в деталях
						</span>
					</h2>

					<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
						{[
							{
								icon: '✨',
								title: 'Безупречный код',
								description:
									'Код, который проходит 7 уровней проверки перед релизом',
							},
							{
								icon: '🔐',
								title: 'Абсолютная безопасность',
								description: 'Защита данных уровня банковских систем',
							},
							{
								icon: '💎',
								title: 'Элитная поддержка',
								description:
									'Персональный менеджер 24/7 с временем реакции до 15 минут',
							},
						].map((item, index) => (
							<div
								key={index}
								className='bg-neutral-900/50 border border-neutral-800/70 rounded-2xl p-8 backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-500 group'
							>
								<div className='w-16 h-16 rounded-lg bg-gradient-to-br from-emerald-500/10 to-sky-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500'>
									<span className='text-3xl'>{item.icon}</span>
								</div>
								<h3 className='text-2xl font-light text-emerald-300 mb-4'>
									{item.title}
								</h3>
								<p className='text-neutral-400 font-light leading-relaxed'>
									{item.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className='relative bg-slate-200 dark:bg-gray-950 py-24 px-4'>
				<div className='container mx-auto max-w-6xl'>
					{/* Заголовок с тонким акцентом */}
					<div className='text-center mb-16'>
						<h2 className='text-4xl md:text-5xl font-medium text-neutral-950 dark:text-slate-200 mb-4'>
							<span className='relative inline-block'>
								Надёжность в деталях
								<span className='absolute bottom-0 left-0 w-full h-0.5 bg-sky-600 dark:bg-sky-400'></span>
							</span>
						</h2>
						<p className='text-lg text-neutral-700 dark:text-slate-300 max-w-2xl mx-auto'>
							ITDextra — ваш доверенный технологический партнёр с 2012 года
						</p>
					</div>

					{/* Карточки преимуществ в строгой сетке */}
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						{/* Карточка 1 */}
						<div className='bg-white dark:bg-gray-900 p-8 rounded-lg border border-slate-300 dark:border-gray-800 hover:border-sky-600 dark:hover:border-sky-400 transition-colors duration-300'>
							<div className='w-12 h-12 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center mb-6'>
								<svg
									className='w-6 h-6 text-sky-600 dark:text-sky-400'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
									/>
								</svg>
							</div>
							<h3 className='text-xl font-semibold text-neutral-950 dark:text-slate-200 mb-3'>
								Гарантированная безопасность
							</h3>
							<p className='text-neutral-700 dark:text-slate-300'>
								Сертифицированные решения с end-to-end шифрованием и ежегодным
								аудитом
							</p>
						</div>

						{/* Карточка 2 */}
						<div className='bg-white dark:bg-gray-900 p-8 rounded-lg border border-slate-300 dark:border-gray-800 hover:border-sky-600 dark:hover:border-sky-400 transition-colors duration-300'>
							<div className='w-12 h-12 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center mb-6'>
								<svg
									className='w-6 h-6 text-sky-600 dark:text-sky-400'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
									/>
								</svg>
							</div>
							<h3 className='text-xl font-semibold text-neutral-950 dark:text-slate-200 mb-3'>
								Проверенное время
							</h3>
							<p className='text-neutral-700 dark:text-slate-300'>
								10+ лет на рынке с безупречной репутацией и сотнями успешных
								проектов
							</p>
						</div>

						{/* Карточка 3 */}
						<div className='bg-white dark:bg-gray-900 p-8 rounded-lg border border-slate-300 dark:border-gray-800 hover:border-sky-600 dark:hover:border-sky-400 transition-colors duration-300'>
							<div className='w-12 h-12 rounded-full bg-sky-100 dark:bg-sky-900/30 flex items-center justify-center mb-6'>
								<svg
									className='w-6 h-6 text-sky-600 dark:text-sky-400'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z'
									/>
								</svg>
							</div>
							<h3 className='text-xl font-semibold text-neutral-950 dark:text-slate-200 mb-3'>
								Облачная экспертиза
							</h3>
							<p className='text-neutral-700 dark:text-slate-300'>
								Развёртывание и оптимизация инфраструктуры в AWS, Azure и GCP
							</p>
						</div>
					</div>

					{/* Призыв к действию с акцентом */}
					<div className='mt-20 text-center'>
						<button className='px-8 py-3 bg-sky-600 hover:bg-sky-700 dark:bg-sky-400 dark:hover:bg-sky-500 text-white font-medium rounded-lg transition-colors duration-300 shadow-sm hover:shadow-md'>
							Обсудить проект
						</button>
						<p className='mt-4 text-sm text-neutral-600 dark:text-slate-400'>
							Среднее время ответа: 27 минут
						</p>
					</div>
				</div>
			</section>
		</>
	)
}
