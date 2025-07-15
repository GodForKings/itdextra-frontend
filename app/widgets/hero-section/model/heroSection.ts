import { createStore } from 'effector'

import type { HeroSection } from './types'

const $heroSection = createStore<HeroSection<string>>({
	slogan:
		'Создавайте будущее с ITDextra — эксклюзивные веб решения для лидеров',
	thesis:
		'Мы трансформируем сложные задачи в конкурентные преимущества. Доверьтесь нам для достижения ваших бизнес целей.',
	description: ['15+ внедрённых систем', '99.9% uptime', 'Работаем с 2020'],
})

const stores = {
	$heroSection,
}

export const heroSectionModel = { stores }
