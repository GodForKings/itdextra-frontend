import type { FC } from 'react'
import { useNavigate } from 'react-router'

export const CTA: FC = () => {
	const navigate = useNavigate()

	const handleCTAClick = () => {
		navigate('/contact')
	}
	return (
		<section className='py-16 px-4 sm:px-8 flex items-center justify-center min-h-[40dvh]'>
			<div className='container mx-auto'>
				<div className='max-w-md bg-gray-950/80 backdrop-blur-md py-10 px-8 rounded-lg shadow-lg ml-auto'>
					<h2 className='text-3xl font-mono font-bold text-sky-500 mb-6'>
						Ваш бизнес заслуживает лучшего
					</h2>
					<p className='text-base font-mono text-slate-300 tracking-wide mb-6'>
						Свяжитесь с нами для создания инновационного решения, которое
						выделит вас среди конкурентов.
					</p>
					<button
						onClick={handleCTAClick}
						className='px-6 py-3 bg-sky-600 text-gray-950 font-mono font-semibold rounded-md hover:bg-sky-700 transition-all duration-300'
					>
						Получить консультацию
					</button>
				</div>
			</div>
		</section>
	)
}
