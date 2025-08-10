import { createStore } from 'effector'

import type { CaseList } from './types'

import { defaultCases, type CaseItem } from '~/shared'

const INITIAL_CASES: CaseList<CaseItem> = {
	title: 'Наши кейсы',
	subtitle: 'Реальные проекты, которые принесли нашим клиентам миллионы.',
	items: defaultCases,
}

const $cases = createStore<CaseList<CaseItem>>(INITIAL_CASES)

const stores = {
	$cases,
}

export const casesList = { stores }
