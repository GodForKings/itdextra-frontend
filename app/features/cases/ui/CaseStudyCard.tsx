import type { FC } from 'react'

import type { CaseItem } from '~/shared'

import { memo } from 'react'
import { ExternalLink } from 'lucide-react'

import { Button, cn } from '~/shared'
import { openModal } from '~/widgets/modal'
import { ModalDescriptionCase } from './ModalDescriptionCase'

interface CaseStudyCardProps {
	caseStudy: CaseItem
	index: number
	cardRef: React.RefObject<(HTMLDivElement | null)[]>
}

export const CaseStudyCard: FC<CaseStudyCardProps> = memo(props => {
	const { caseStudy, cardRef, index } = props

	const { title, description, tags, image, client } = caseStudy

	const handleCTAClick = () => {
		openModal({
			content: <ModalDescriptionCase currentCase={caseStudy} />,
		})
	}

	return (
		<article
			ref={(el: HTMLDivElement | null) => {
				if (el) cardRef.current[index] = el
			}}
			className={cn(
				'relative p-6 bg-black/40 text-white backdrop-blur-xl rounded-lg',
				'flex flex-col justify-between items-start gap-6 h-fit',
				(index === 0 || index === 3) && 'lg:col-span-2'
			)}
			role='region'
			aria-label={`Кейс: ${title}`}
		>
			<div className='flex flex-col gap-4 w-full'>
				<img
					src={image}
					alt={`${title} изображение`}
					className='min-w-full lg:h-90 object-cover rounded-lg'
				/>

				<div className='flex items-center justify-between gap-1'>
					<h3 className='text-xl lg:text-2xl xl:text-3xl tracking-wide text-sky-500'>
						{title}
					</h3>

					<span className='bg-black p-2 text-sm text-center rounded-lg border shadow-sm shadow-white'>
						{client}
					</span>
				</div>

				<p className='lg:text-xl'>{description}</p>
			</div>

			<div className='flex flex-wrap items-center gap-4'>
				{tags.map((tag, index) => (
					<span
						key={`${tag} ${index}`}
						className='text-xs font-normal tracking-wider bg-white text-black px-3 py-2 rounded-lg shadow-md shadow-white'
					>
						{tag}
					</span>
				))}
			</div>

			<Button
				onClick={handleCTAClick}
				square={false}
				ariaLabelDesc={`Подробнее о кейсе ${title}`}
				styles='font-transparent gap-2 font-normal'
			>
				Посмотреть
				<ExternalLink size={22} strokeWidth={1} />
			</Button>
		</article>
	)
})
