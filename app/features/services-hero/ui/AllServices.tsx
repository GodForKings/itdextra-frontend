import { type FC } from 'react'
import { useUnit } from 'effector-react'
import {
	type LucideIcon,
	LayoutPanelTop,
	AppWindow,
	PaintRoller,
} from 'lucide-react'
import { cn } from '~/shared'
import { ServicesListModel } from '../model/index'

interface Service {
	id: string
	title: string
	shortDescription: string
	fullDescription: string
	category: 'Веб-приложения' | 'E-commerce' | 'Дизайн'
	icon?: LucideIcon
}

const mockServices: Service[] = [
	{
		id: 'business-card',
		title: 'Сайт-визитка',
		shortDescription:
			'Стильный и быстрый сайт для представления вашей компании или проекта.',
		fullDescription:
			'Лаконичный современный сайт для презентации компании или проекта. Идеально подходит для размещения основной информации, контактов и ключевых услуг. Быстро загружается, легко обновляется и создает профессиональное впечатление.',
		category: 'Веб-приложения',
		icon: LayoutPanelTop,
	},
	{
		id: 'portfolio',
		title: 'Сайт-портфолио',
		shortDescription:
			'Платформа для демонстрации ваших работ, проектов или достижений.',
		fullDescription:
			'Удобная платформа для демонстрации ваших работ, проектов или профессиональных достижений. Помогает привлекать клиентов и наглядно показывать экспертизу. Современный дизайн и интуитивная навигация делают просмотр приятным и информативным.',
		category: 'Веб-приложения',
		icon: LayoutPanelTop,
	},
	{
		id: 'landing',
		title: 'Лендинг',
		shortDescription:
			'Целевая страница для продвижения продукта, акции или услуги.',
		fullDescription:
			'Специализированная страница для продвижения конкретного продукта, акции или услуги. Максимально ориентирована на конверсию с привлекательным дизайном и четкими призывами к действию.',
		category: 'Веб-приложения',
		icon: LayoutPanelTop,
	},
	{
		id: 'corporate',
		title: 'Корпоративный сайт',
		shortDescription:
			'Многостраничное решение для крупных компаний и организаций.',
		fullDescription:
			'Комплексное многостраничное решение для крупных компаний и организаций. Включает разделы "О компании", "Услуги", "Новости" и "Контакты". Формирует доверие клиентов и укрепляет бренд.',
		category: 'Веб-приложения',
		icon: LayoutPanelTop,
	},
	{
		id: 'ecommerce',
		title: 'Интернет-магазин',
		shortDescription:
			'Полноценная платформа для онлайн-продаж с каталогом и оплатой.',
		fullDescription:
			'Комплексная платформа для онлайн-продаж с каталогом товаров, корзиной и системой оплаты. Обеспечивает удобный процесс покупок и простоту управления ассортиментом.',
		category: 'Веб-приложения',
		icon: AppWindow,
	},
	{
		id: 'forum',
		title: 'Форум',
		shortDescription: 'Интерактивная площадка для обсуждений в сообществе.',
		fullDescription:
			'Интерактивная платформа для обсуждения интересов или тем вашей аудиторией. Поддерживает регистрацию пользователей, модерацию и различные форматы обсуждений.',
		category: 'Веб-приложения',
		icon: LayoutPanelTop,
	},
	{
		id: 'education',
		title: 'Образовательная платформа',
		shortDescription:
			'Система для онлайн-обучения с курсами и личными кабинетами.',
		fullDescription:
			'Комплексная система для онлайн-обучения с курсами, тестами и личными кабинетами студентов. Позволяет организовать дистанционное образование и расширить аудиторию.',
		category: 'Веб-приложения',
		icon: LayoutPanelTop,
	},
	{
		id: 'ecommerce-seo',
		title: 'SEO и маркетинг для интернет-магазина',
		shortDescription:
			'SEO-оптимизация и маркетинг для увеличения видимости магазина.',
		fullDescription:
			'Комплексная SEO-оптимизация и маркетинговые инструменты для увеличения видимости вашего интернет-магазина и роста продаж.',
		category: 'E-commerce',
		icon: AppWindow,
	},
	{
		id: 'design',
		title: 'UI/UX дизайн',
		shortDescription: 'Современный дизайн с темами и микро-интеракциями.',
		fullDescription:
			'Современный UI/UX дизайн, включая обновления, интерактив и поддержку светлой/темной темы для улучшения пользовательского опыта.',
		category: 'Дизайн',
		icon: PaintRoller,
	},
]

interface ServiceCardProps {
	service: Service
	index: number
}

const ServiceCard: FC<ServiceCardProps> = ({ service, index }) => {
	const {
		title,
		shortDescription,
		fullDescription,
		icon: Icon,
		category,
	} = service

	return (
		<article
			className={cn(
				'p-8 bg-gray-900/90 backdrop-blur-xl rounded-lg border-l-4 border-teal-500',
				'shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40',
				index === 0 && 'md:col-span-2'
			)}
		>
			{/* Категория */}
			<span className='text-xs font-mono text-teal-400/70 uppercase tracking-widest mb-2 block'>
				{category}
			</span>
			{/* Иконка */}
			{Icon && (
				<div className='relative mb-6'>
					<Icon
						strokeWidth={1.5}
						size={44}
						className='text-teal-400'
						aria-hidden='true'
					/>
				</div>
			)}
			{/* Заголовок */}
			<h3 className='text-2xl font-mono font-bold text-teal-300 mb-3 tracking-tight'>
				{title}
			</h3>
			{/* Краткое описание */}
			<p className='text-lg font-mono text-gray-200 mb-4 leading-relaxed'>
				{shortDescription}
			</p>
			{/* Полное описание */}
			<p className='text-base font-mono text-gray-300/80 leading-snug'>
				{fullDescription}
			</p>
		</article>
	)
}

export const AllServices: FC = () => {
	const services = mockServices

	return (
		<section
			className='relative py-18 container overflow-hidden flex flex-col gap-16 items-center justify-center'
			aria-labelledby='services-heading'
		>
			<h2
				id='services-heading'
				className='text-5xl md:text-7xl w-full text-center font-light text-teal-300 bg-gray-900/80 backdrop-blur-xl p-6 rounded-lg shadow-lg shadow-teal-500/20 border-y-1 border-teal-500'
			>
				Наши услуги
			</h2>

			{services?.length ? (
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					{services.map((service, index) => (
						<ServiceCard key={service.id} service={service} index={index} />
					))}
				</div>
			) : (
				<p className='text-center text-teal-300 backdrop-blur-2xl p-10 font-mono text-2xl'>
					Услуги временно недоступны
				</p>
			)}
		</section>
	)
}
