import type { AboutHero, AboutTeam } from './types'

import { HACKER_ALBUM } from '../assets'

import { createStore } from 'effector'

const mockAboutHero = {
	title: 'ITDextra — Ваш партнёр в мире цифровых инноваций',
	slogan:
		'Мы превращаем ваши задумки в мощные решения, делая фокус на понятность и эффективность. Поможем вашему бизнесу расти быстрее конкурентов.',
}

const mockAboutMission: string[] = [
	'Помогаем бизнесу преодолевать цифровые вызовы, создавая простые и мощные решения',
	'От идеи до запуска',
	'С нами рост становится неизбежным',
]

const mockAboutTeam: AboutTeam[] = [
	{
		name: 'Anonymous',
		role: 'Lead Perception Architect',
		description:
			'Превращает пользовательские сценарии в интуитивные путешествия. Специализируется на деконструкции сложных систем до минималистичных и эффективных интерфейсов, которые конвертируют в 3 раза выше рынка.',
		photo: HACKER_ALBUM.hacker1,
	},
	{
		name: 'Anonymous',
		role: 'Quantum Frontend Engineer',
		description:
			'Создает не интерфейсы, а реактивные экосистемы. Глубоко погружен в React 19, Next.js 15 и RSC. Оптимизирует рендеринг до наступления мысли о необходимости что-то оптимизировать.',
		photo: HACKER_ALBUM.hacker2,
	},
	{
		name: 'Anonymous',
		role: 'System Alchemist (Backend)',
		description:
			'Превращает сырые данные в структурированное золото. Проектирует отказоустойчивые API и микросервисные архитектуры, которые масштабируются быстрее, чем растут амбиции клиента.',
		photo: HACKER_ALBUM.hacker3,
	},
	{
		name: 'Anonymous',
		role: 'DevOps Oracle',
		description:
			'Предвидит инфраструктурные потребности завтрашнего дня. Настраивает CI/CD pipelines, которые развертываются раньше, чем разработчик успевает написать `git commit -m`.',
		photo: HACKER_ALBUM.hacker4,
	},
	{
		name: 'Anonymous',
		role: 'Cyber Resilience Sentinel',
		description:
			'Ищет уязвимости, которые еще не придумали. Внедряет протоколы безопасности, делающие продукт цифровой крепостью. Клиенты спят спокойно.',
		photo: HACKER_ALBUM.hacker1,
	},
	{
		name: 'Anonymous',
		role: 'Data Synthesis Strategist',
		description:
			'Не анализирует, а синтезирует смысл из big data. Строит предсказательные модели и дашборды, которые принимают бизнес-решения за руководство.',
		photo: HACKER_ALBUM.hacker2,
	},
	{
		name: 'Anonymous',
		role: 'Fullstack Virtuoso',
		description:
			'Владеет TypeScript и Rust как родными языками. Бесшовно соединяет безупречный UX с высоконагруженным бэкендом. Устраняет понятие "узкое место".',
		photo: HACKER_ALBUM.hacker3,
	},
	{
		name: 'Anonymous',
		role: 'AI Integration Sorceress',
		description:
			'Внедряет ИИ-модели в продукты так, что это выглядит не фичей, а магией. От чат-ботов до предиктивной аналитики — ее решения работают на опережение запроса.',
		photo: HACKER_ALBUM.hacker4,
	},
	{
		name: 'Anonymous',
		role: 'Technical Visionary (CTO)',
		description:
			'Видит технологический ландшафт на 5 лет вперед. Принимает архитектурные решения, которые окупаются не сразу, но навсегда. Стратег, который не позволяет команде строить на песке.',
		photo: HACKER_ALBUM.hacker1,
	},
]

const $aboutHero = createStore<AboutHero>(mockAboutHero)

const $aboutMission = createStore<string[]>(mockAboutMission)

const $aboutTeam = createStore<AboutTeam[]>(mockAboutTeam)

const stores = { $aboutHero, $aboutMission, $aboutTeam }

export const aboutListModel = {
	stores,
}
