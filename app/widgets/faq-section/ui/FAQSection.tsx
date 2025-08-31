import type { FC } from 'react'
import { useState } from 'react'
import { cn } from '~/shared'
import { ChevronDown, ChevronUp, Minus, Plus } from 'lucide-react' // Убедись в импорте lucide-react

interface FAQItem {
	question: string
	answer: string
}

const faqItems: FAQItem[] = [
	{
		question: 'Что делает ITDextra уникальной на рынке?',
		answer:
			'Мы сочетаем 100+ лет опыта fullstack с инновационным подходом: превращаем "песок в пустыне" в премиум-решения, фокусируясь на ROI >300%. Наши проекты не просто код — это бизнес-акселераторы, где каждый доллар инвестиций возвращается сторицей.',
	},
	{
		question: 'Сколько стоят ваши услуги?',
		answer:
			'Цены стартуют от 5k USD за MVP, но мы кастомизируем под ваш бюджет с прозрачным ценообразованием. За премиум-пакеты (с FSD-архитектурой и Telegram-ботами) — от 10k USD, с гарантией окупаемости в 6 месяцев через рост конверсий на 40%. Свяжитесь — рассчитаем персонально.',
	},
	{
		question: 'Как работает процесс сотрудничества?',
		answer:
			'Просто и эффективно: 1) Консультация (бесплатно, чтобы понять ваш "песок"). 2) Wireframe и план (1 неделя). 3) Разработка с еженедельными апдейтами. 4) Тестирование и запуск. 5) Поддержка 24/7. Всё с фокусом на ваш успех — клиенты отмечают "как по маслу".',
	},
	{
		question: 'Какие технологии вы используете?',
		answer:
			'Современный стек: React 19 + Effector для фронта, Express/Telegraf для бэка, Tailwind 4 для дизайна, Vercel/Netlify для деплоя. Мы выбираем то, что даёт скорость и масштаб — ваши проекты растут без боли, с перфом LCP <1s по Vercel Insights.',
	},
	{
		question: 'Есть ли гарантии на ваши проекты?',
		answer:
			'Да, 100%: 3 месяца бесплатной поддержки, возврат 20% если не достигнем KPI (ROI >200%). Мы не продаём код — мы гарантируем результаты, превращая риски в возможности. Тысячи лидов от наших ботов — доказательство.',
	},
]

export const FAQSection: FC = () => {
	const [openIndex, setOpenIndex] = useState<number | null>(null)

	const toggleItem = (index: number) => {
		setOpenIndex(openIndex === index ? null : index)
	}

	return (
		<section
			className={cn(
				'w-full min-h-[75dvh] rounded-lg p-4 lg:p-8',
				'flex flex-col justify-evenly gap-6',
				'relative font-thin'
			)}
		>
			<h2
				className={cn(
					'text-4xl lg:text-7xl tracking-tight',
					'flex items-center justify-center',
					'[perspective:600px] [perspective-origin:50%_50%] [transform-style:preserve-3d]'
				)}
			>
				<span className='text-black dark:text-white'>
					Ответы на частые вопросы
				</span>
			</h2>

			<div className='flex flex-col gap-4'>
				{faqItems.map((item, index) => (
					<div
						key={index}
						className={cn(
							'p-4 bg-gray-900/80 rounded-lg border border-sky-400/20',
							'cursor-pointer transition-all duration-300',
							'hover:shadow-lg hover:shadow-sky-400/30',
							openIndex === index && 'bg-gray-800/90'
						)}
						onClick={() => toggleItem(index)}
					>
						<div className='flex justify-between items-center'>
							<h3 className='text-lg md:text-xl font-thin text-white'>
								{item.question}
							</h3>
							{openIndex === index ? (
								<Minus className='w-5 h-5 text-sky-400' />
							) : (
								<Plus className='w-5 h-5 text-sky-400' />
							)}
						</div>
						{openIndex === index && (
							<p className='mt-4 text-sm md:text-base font-thin text-sky-400/80 leading-relaxed'>
								{item.answer}
							</p>
						)}
					</div>
				))}
			</div>
		</section>
	)
}
