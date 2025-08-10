import type { FC, RefObject } from 'react'
import { memo } from 'react'
import { useNavigate } from 'react-router'
import { cn } from '~/shared'
import { openModal } from '~/widgets/modal'

interface CaseStudy {
	id: string
	title: string
	description: string
	tags: string[]
	image: string
	link: string
	problem: string
	solution: string
	result: string
	metrics: string[]
	client: string
}

interface CaseStudyCardProps {
	caseStudy: CaseStudy
	index: number
	cardRef: React.RefObject<(HTMLDivElement | null)[]>
}

export const CaseStudyCard: FC<CaseStudyCardProps> = memo(
	({ caseStudy, index, cardRef }) => {
		const navigate = useNavigate()
		const {
			title,
			description,
			tags,
			image,
			link,
			problem,
			solution,
			result,
			metrics,
			client,
		} = caseStudy

		const handleCTAClick = () => {
			openModal({
				content: (
					<div className='flex flex-col gap-8 p-6 bg-gray-900/90 backdrop-blur-xl rounded-xl'>
						<h3 className='text-3xl font-sans font-light text-white tracking-wide'>
							{title}
						</h3>

						<img
							src={image}
							alt={title}
							className='w-full h-72 object-cover rounded-lg shadow-gray-50/10'
						/>
						<div className='flex flex-col gap-6'>
							<div>
								<h4 className='text-sm font-sans font-medium text-gray-200'>
									Клиент:
								</h4>
								<p className='text-base text-gray-200'>{client}</p>
							</div>
							<div>
								<h4 className='text-sm font-sans font-medium text-gray-200'>
									Проблема:
								</h4>
								<p className='text-base text-gray-200'>{problem}</p>
							</div>
							<div>
								<h4 className='text-sm font-sans font-medium text-gray-200'>
									Решение:
								</h4>
								<p className='text-base text-gray-200'>{solution}</p>
							</div>
							<div>
								<h4 className='text-sm font-sans font-medium text-gray-200'>
									Результат:
								</h4>
								<p className='text-base text-gray-200'>{result}</p>
							</div>
							<div>
								<h4 className='text-sm font-sans font-medium text-gray-200'>
									Метрики успеха:
								</h4>
								<ul className='list-disc list-inside text-base text-gray-200'>
									{metrics.map(metric => (
										<li key={metric}>{metric}</li>
									))}
								</ul>
							</div>
						</div>
						<form
							onSubmit={e => {
								e.preventDefault()
								navigate('/thank-you')
							}}
							className='flex flex-col gap-4'
						>
							<div>
								<label
									htmlFor='name'
									className='text-sm font-sans font-medium text-gray-200'
								>
									Имя
								</label>
								<input
									id='name'
									type='text'
									required
									className='w-full mt-1 p-3 bg-gray-900/80 text-white rounded-lg border border-gray-200/20 focus:outline-none focus:ring-2 focus:ring-gray-50 transition-all duration-300'
									placeholder='Ваше имя'
								/>
							</div>
							<div>
								<label
									htmlFor='email'
									className='text-sm font-sans font-medium text-gray-200'
								>
									Email
								</label>
								<input
									id='email'
									type='email'
									required
									className='w-full mt-1 p-3 bg-gray-950/80 text-white rounded-lg border border-gray-200/20 focus:outline-none focus:ring-2 focus:ring-gray-50 transition-all duration-300'
									placeholder='Ваш email'
								/>
							</div>
							<div>
								<label
									htmlFor='message'
									className='text-sm font-sans font-medium text-gray-200'
								>
									О вашем проекте
								</label>
								<textarea
									id='message'
									required
									className='w-full mt-1 p-3 bg-gray-900/80 text-white rounded-lg border border-gray-200/20 focus:outline-none focus:ring-2 focus:ring-gray-50 transition-all duration-300'
									placeholder='Расскажите, что вы хотите создать'
									rows={4}
									defaultValue={`Интересует проект, подобный: ${title}`}
								/>
							</div>
							<button
								type='submit'
								className='w-full py-3 px-6 bg-gray-50 text-black font-sans font-medium rounded-lg hover:bg-white hover:shadow-gray-50/30 transition-all duration-300'
								aria-label='Отправить заявку'
							>
								Связаться
							</button>
						</form>
					</div>
				),
			})
		}

		return (
			<article
				ref={(el: HTMLDivElement | null) => {
					if (el) cardRef.current[index] = el
				}}
				className={cn(
					'p-6 bg-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-200/20',
					'shadow-xl shadow-gray-50/10 transition-all duration-500 ease-out',
					'hover:shadow-gray-50/30 hover:border-gray-50/30 hover:scale-105 hover:-rotate-x-2',
					'flex flex-col justify-between gap-6 min-h-[85vh] md:min-h-[65vh] cursor-pointer',
					(index === 0 || index === 3) && 'lg:col-span-2'
				)}
				role='region'
				aria-label={`Кейс: ${title}`}
				onClick={handleCTAClick}
			>
				<div className='flex flex-col gap-4'>
					<img
						src={image}
						alt={title}
						className='w-full h-56 object-cover rounded-lg shadow-gray-50/10'
					/>
					<div className='flex items-center justify-between'>
						<h3 className='text-2xl font-sans font-light text-white tracking-wider'>
							{title}
						</h3>
						<span className='text-sm font-sans font-medium text-gray-200'>
							{client}
						</span>
					</div>
					<p className='text-base font-sans text-gray-200'>{description}</p>
				</div>

				<div className='flex flex-wrap items-center gap-2'>
					{tags.map(tag => (
						<span
							key={tag}
							className='text-xs font-sans font-medium tracking-wide text-gray-200 bg-gray-900/50 px-3 py-1 rounded-full hover:bg-gray-800/50 transition-all duration-300'
						>
							{tag}
						</span>
					))}
				</div>

				<button
					className={cn(
						'w-full py-3 px-6 bg-gray-50 text-black font-sans font-medium rounded-lg',
						'transition-all duration-300 ease-out hover:bg-white hover:shadow-gray-50/30 hover:scale-105'
					)}
					aria-label={`Подробнее о кейсе ${title}`}
					onClick={handleCTAClick}
				>
					Подробнее
				</button>
			</article>
		)
	}
)
