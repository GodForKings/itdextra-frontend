import type { FC } from 'react'

import { CustomLink, cn } from '~/shared'

export const MainDirections: FC = () => {
	return (
		<div
			className={cn(
				'z-5 flex flex-col justify-center items-center py-4 px-15 gap-4',
				'lg:border-r border-black/5 dark:border-white/20 max-lg:border-b'
			)}
		>
			<h3 className={cn('text-xl text-sky-500 underline underline-offset-4')}>
				Основные направления
			</h3>

			<ul className='grid grid-cols-2 justify-between overflow-hidden gap-1'>
				<CustomLink currentLink='#'>Сайт-визитка</CustomLink>

				<CustomLink currentLink='#'>Сайт-портфолио</CustomLink>

				<CustomLink currentLink='#'>Лендинг</CustomLink>

				<CustomLink currentLink='#'>Корпоративный сайт</CustomLink>

				<CustomLink currentLink='#'>Интернет-магазин</CustomLink>

				<CustomLink currentLink='#'>Форум</CustomLink>
			</ul>
		</div>
	)
}
