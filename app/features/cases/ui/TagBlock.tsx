import React, { type FC } from 'react'
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
				'relative z-10 flex justify-center items-center flex-wrap gap-3 p-6 w-full max-w-4xl',
				'bg-gray-900/50 backdrop-blur-xl rounded-xl border border-gray-200/20'
			)}
		>
			<button
				className={cn(
					'text-sm font-sans font-medium text-gray-200 bg-gray-900/40 px-4 py-2 rounded-full',
					!selectedTag && 'bg-gray-50 text-black shadow-gray-50/20',
					'hover:bg-gray-50 hover:text-black transition-all duration-300 ease-out'
				)}
				onClick={() => setSelectedTag(null)}
			>
				Все
			</button>

			{allTags.map((tag: string, index: number) => (
				<button
					ref={el => {
						tagsRef.current[index] = el
					}}
					key={tag}
					className={cn(
						'text-sm font-sans font-medium text-gray-200 bg-gray-900/40 px-4 py-2 rounded-full',
						selectedTag === tag && 'bg-gray-50 text-black shadow-gray-50/20',
						'hover:bg-gray-50 hover:text-black transition-all duration-300 ease-out'
					)}
					onClick={() => setSelectedTag(tag)}
				>
					{tag}
				</button>
			))}
		</div>
	)
}
