import type { FC } from 'react'

export const Symbiosis: FC = () => {
	return (
		<section className='relative py-32 bg-white dark:bg-neutral-950 overflow-hidden'>
			{/* Subtle texture */}
			<div className='absolute inset-0 opacity-5 dark:opacity-[0.03]'>
				<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/crisp-paper-ruffles.png')]" />
			</div>

			<div className='container mx-auto px-6 max-w-6xl'>
				<div className='text-center mb-20'>
					<h2 className='text-4xl md:text-6xl font-light text-neutral-900 dark:text-white mb-6'>
						<span className='border-t-3 border-emerald-500 pb-2'>
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
							description: 'Оптимизированные решения для максимальной скорости',
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
	)
}
