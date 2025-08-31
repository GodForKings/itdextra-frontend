import type { FC } from 'react'

import { cn } from '~/shared'

interface TagBlockProps {
	tagBlockRef: React.RefObject<HTMLDivElement | null>
	tagsRef: React.RefObject<(HTMLButtonElement | null)[]>
	selectedTag: string | null
	setSelectedTag: (newValue: string | null) => void
	allTags: string[]
}

export const TagBlock: FC<TagBlockProps> = props => {
	const { tagBlockRef, tagsRef, selectedTag, setSelectedTag, allTags } = props

	return (
		<div
			ref={tagBlockRef}
			className={cn(
				'relative flex justify-center items-center flex-wrap gap-2 py-6 w-full tracking-wide',
				'bg-gray-900/20 backdrop-blur-lg rounded-lg max-lg:text-sm'
			)}
		>
			<button
				aria-label='показать все услуги'
				className={cn(
					'text-white bg-black/60 px-4 py-2 rounded-full shadow-md shadow-black',
					!selectedTag && 'bg-sky-500 text-black shadow-md shadow-sky-500',
					'transition-all duration-200 ease-in-out',
					'hover:bg-white hover:text-black hover:shadow-white',
					'active:bg-white active:text-black active:shadow-white'
				)}
				onClick={() => setSelectedTag(null)}
			>
				Все
			</button>

			{allTags.map((tag: string, index: number) => (
				<button
					aria-label={`Показать кейсы с тегом ${tag}`}
					ref={(el: HTMLButtonElement | null) => {
						if (el) tagsRef.current[index] = el
					}}
					key={tag}
					className={cn(
						'text-white bg-black/60 px-4 py-2 rounded-full shadow-md shadow-black',
						selectedTag === tag && 'bg-sky-500 text-black shadow-sky-500',
						'transition-all duration-200 ease-in-out',
						'hover:bg-white hover:text-black hover:shadow-white',
						'active:bg-white active:text-black active:shadow-white'
					)}
					onClick={() => setSelectedTag(tag)}
				>
					{tag}
				</button>
			))}
		</div>
	)
}
