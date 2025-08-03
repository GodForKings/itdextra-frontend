import { createStore } from 'effector'

import type { WhyUS, Pluses } from './types'

const INITIAL_WHY_US: WhyUS<string, Pluses> = {
	slogan: 'root@itdextra:~# ./Почему клиенты выбирают нас?',
	thesis: [
		'Мы не просто разрабатываем IT-решения — мы создаем конкурентные преимущества',
		'_',
	],
	pluses: [
		{
			title: 'Опыт, который считают',
			description:
				'Уже больше 5 лет на рынке, Реализовано свыше 15 успешных проектов — от стартапов до корпораций. Знаем, как сделать технологию прибыльной.',
			tech: ['AI Solutions', 'Data Science', 'Predictive Analytics'],
		},
		{
			title: 'Технологии будущего — уже сегодня',
			description:
				'Используем последние версии лучших библиотек и фреймворков. Ваш бизнес получит инновационное решение на 2-3 года опережающее рынок.',
			tech: ['Smart Tech', 'Web3', 'DeFi'],
		},
		{
			title: 'Безопасность как культура',
			description:
				'Zero Trust-архитектура, регулярный аудит отказоустойчивости. Ваши секреты останутся вашими.',
			tech: ['Cyber Shield', 'Code Audit', 'Optimization'],
		},
		{
			title: 'Результат — быстро и без боли',
			description:
				'Четкие сроки в договоре. Внедряем решения на 30-50% быстрее рынка за счет собственных разработок.',
			tech: ['24/7 Tech Support', '99.9% Uptime', 'Seamless Migration'],
		},
	],
}

const $WhyUS = createStore<WhyUS<string, Pluses>>(INITIAL_WHY_US)

const stores = {
	$WhyUS,
}

export const whyUsList = { stores }
