import type { FC } from 'react'

import { useGate } from 'effector-react'

import { Hero } from './Hero'
import { Categories } from './Categories'
import { AllServices } from './AllServices'
import { CTA } from './CTA'

import { ServicesListModel } from '../model'

export const ServicesGeneral: FC = () => {
	useGate(ServicesListModel.gates.ServiceGeneralGate)

	return (
		<>
			{/* Приветственная секция */}
			<Hero />

			{/* Секция категорий */}
			<Categories />
		</>
	)
}
