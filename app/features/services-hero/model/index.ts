// features/services-hero/model/index.ts
import { createStore, createEffect, sample } from 'effector'

import {
	LayoutPanelTop,
	AppWindow,
	PaintRoller,
	type LucideIcon,
	Crown,
	BarChart4,
} from 'lucide-react'
import { createGate } from 'effector-react'

import type { Category, Service } from './types'

const ServiceGeneralGate = createGate()

/* дефолтные сервисы */
const mockServices: Service<LucideIcon>[] = [
	{
		id: 'business-card',
		title: 'Сайт-визитка',
		shortDescription:
			'Стильный и быстрый сайт для представления вашей компании или проекта.',
		fullDescription:
			'Лаконичный современный сайт для презентации компании или проекта. Идеально подходит для размещения основной информации, контактов и ключевых услуг. Быстро загружается, легко обновляется и создает профессиональное впечатление.',
		category: 'Веб-приложения',
	},
	{
		id: 'portfolio',
		title: 'Сайт-портфолио',
		shortDescription:
			'Платформа для демонстрации ваших работ, проектов или достижений.',
		fullDescription:
			'Удобная платформа для демонстрации ваших работ, проектов или профессиональных достижений. Помогает привлекать клиентов и наглядно показывать экспертизу. Современный дизайн и интуитивная навигация делают просмотр приятным и информативным.',
		category: 'Веб-приложения',
	},
	{
		id: 'landing',
		title: 'Лендинг',
		shortDescription:
			'Целевая страница для продвижения продукта, акции или услуги.',
		fullDescription:
			'Специализированная страница для продвижения конкретного продукта, акции или услуги. Максимально ориентирована на конверсию с привлекательным дизайном и четкими призывами к действию.',
		category: 'Веб-приложения',
	},
	{
		id: 'corporate',
		title: 'Корпоративный сайт',
		shortDescription:
			'Многостраничное решение для крупных компаний и организаций.',
		fullDescription:
			'Комплексное многостраничное решение для крупных компаний и организаций. Включает разделы "О компании", "Услуги", "Новости" и "Контакты". Формирует доверие клиентов и укрепляет бренд.',
		category: 'Веб-приложения',
	},
	{
		id: 'ecommerce',
		title: 'Интернет-магазин',
		shortDescription:
			'Полноценная платформа для онлайн-продаж с каталогом и оплатой.',
		fullDescription:
			'Комплексная платформа для онлайн-продаж с каталогом товаров, корзиной и системой оплаты. Обеспечивает удобный процесс покупок и простоту управления ассортиментом.',
		category: 'Веб-приложения',
	},
	{
		id: 'forum',
		title: 'Форум',
		shortDescription: 'Интерактивная площадка для обсуждений в сообществе.',
		fullDescription:
			'Интерактивная платформа для обсуждения интересов или тем вашей аудиторией. Поддерживает регистрацию пользователей, модерацию и различные форматы обсуждений.',
		category: 'Веб-приложения',
	},
	{
		id: 'education',
		title: 'Образовательная платформа',
		shortDescription:
			'Система для онлайн-обучения с курсами и личными кабинетами.',
		fullDescription:
			'Комплексная система для онлайн-обучения с курсами, тестами и личными кабинетами студентов. Позволяет организовать дистанционное образование и расширить аудиторию.',
		category: 'Веб-приложения',
	},
	{
		id: 'ecommerce-seo',
		title: 'SEO и маркетинг для интернет-магазина',
		shortDescription:
			'SEO-оптимизация и маркетинг для увеличения видимости магазина.',
		fullDescription:
			'Комплексная SEO-оптимизация и маркетинговые инструменты для увеличения видимости вашего интернет-магазина и роста продаж.',
		category: 'E-commerce',
	},
	{
		id: 'design',
		title: 'UI/UX дизайн',
		shortDescription: 'Современный дизайн с темами и микро-интеракциями.',
		fullDescription:
			'Современный UI/UX дизайн, включая обновления, интерактив и поддержку светлой/темной темы для улучшения пользовательского опыта.',
		category: 'Дизайн',
	},
]
/* дефолтные категории */
const mockCategories: Category<LucideIcon>[] = [
	{
		title: 'Элитные веб-решения для избранных',
		description:
			'Эксклюзивные digital-продукты, воплощающие премиальный опыт и безупречную производительность. Для тех, кто требует совершенства.',
		icon: LayoutPanelTop,
	},
	{
		title: 'E-commerce класса Haute Couture',
		description:
			'Бутиковые онлайн-площадки с индивидуальным подходом, где каждый пиксель работает на конверсию. Ваш цифровой аналог Fifth Avenue.',
		icon: AppWindow,
	},
	{
		title: 'UI/UX как произведение искусства',
		description:
			'Академия дизайна в каждом интерфейсе. Бескомпромиссная эстетика, доведённая до идеала. Ваш бренд заслуживает музейного качества.',
		icon: PaintRoller,
	},
	{
		title: 'SEO-продвижение для избранных',
		description:
			'Стратегии роста, достойные Forbes. Выводим ваш цифровой след в топ поиска с аристократичной естественностью.',
		icon: BarChart4,
	},
	{
		title: 'Digital-стратегии Private Club',
		description:
			'Закрытые маркетинговые методики для эксклюзивного роста. Только персонализированные решения без массового подхода.',
		icon: Crown,
	},
]

/* Эффект для загрузки данных */
const fetchServicesFx = createEffect(async () => {
	return mockServices
})

const fetchCategoriesFx = createEffect(async () => {
	return mockCategories
})

/* Хранилище для услуг */
const $services = createStore<Service<LucideIcon>[] | null>(null).on(
	fetchServicesFx.doneData,
	(_, services) => services
)
/* Хранилище для категорий */
const $categories = createStore<Category<LucideIcon>[] | null>(null).on(
	fetchCategoriesFx.doneData,
	(_, categories) => categories
)

/* Триггер на открытие ворот */
sample({
	clock: [ServiceGeneralGate.open],
	source: { service: $services, categories: $categories },
	fn: ({ service, categories }) => !service || !categories,
	target: [fetchCategoriesFx, fetchServicesFx],
})

const stores = { $services, $categories }

const gates = { ServiceGeneralGate }

export const ServicesListModel = {
	stores,
	gates,
}
