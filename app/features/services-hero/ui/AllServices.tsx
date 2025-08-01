import { useUnit } from 'effector-react'
import type { FC } from 'react'
import { ServicesListModel } from '../model'
import { useNavigate } from 'react-router'

export const AllServices: FC = () => {
	const services = useUnit(ServicesListModel.stores.$services)

	const navigate = useNavigate()

	const handleCTAClick = () => {
		navigate('/contacts')
	}
	return (
		<section className='py-16 px-4 lg:px-8'>
			<div className='container mx-auto'>
				<h2 className='text-3xl font-mono font-bold text-sky-500 mb-12 text-left'>
					Наши услуги
				</h2>
				<div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
					{services?.map((service, index) => (
						<div
							key={service.id}
							className={`p-6 bg-gray-950/80 backdrop-blur-md rounded-lg hover:border hover:border-sky-500 transition-all duration-300 cursor-pointer ${
								index % 3 === 0 ? 'lg:col-span-2' : 'lg:col-span-1'
							}`}
							onClick={handleCTAClick}
						>
							<h3 className='text-lg font-mono font-semibold text-sky-400 mb-2'>
								{service.title}
							</h3>
							<p className='text-base font-mono text-slate-300 mb-4'>
								{service.shortDescription}
							</p>
							<p className='text-lg font-mono text-slate-400'>
								{service.fullDescription}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}
