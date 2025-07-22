import { createStore } from 'effector'

import type { HeroSection } from './types'

const $heroSection = createStore<HeroSection<string>>({
	name: ['I', 'T', 'D', 'e', 'x', 't', 'r', 'a'],
	slogan: ' цифровая трансформация для амбициозных бизнесов',
	thesis:
		'Создаем эксклюзивные веб-решения, которые увеличивают прибыль и автоматизируют рутину. От концепции до результата.',
	description: ['15+ внедрённых систем', '99.9% uptime', 'Работаем с 2020'],
})

const stores = {
	$heroSection,
}

export const heroSectionModel = { stores }
