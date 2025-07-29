import type { FC } from 'react'

import { InsideSideLink, ROUTES_DATA, cn } from '~/shared'

export const MainDirections: FC = () => {
	return (
		<div
			className={cn(
				'z-5 flex flex-col justify-center items-center py-4 px-15 gap-4',
				'lg:border-r border-black/10 dark:border-white/20 max-lg:border-b'
			)}
		>
			<h3 className={cn('text-xl text-sky-500 underline underline-offset-4')}>
				Основные направления
			</h3>

			<ul className='grid grid-cols-2 justify-between overflow-hidden gap-1'>
				<InsideSideLink currentLink={ROUTES_DATA.services.path}>
					Сайт-визитка
				</InsideSideLink>

				<InsideSideLink currentLink={ROUTES_DATA.services.path}>
					Сайт-портфолио
				</InsideSideLink>

				<InsideSideLink currentLink={ROUTES_DATA.services.path}>
					Лендинг
				</InsideSideLink>

				<InsideSideLink currentLink={ROUTES_DATA.services.path}>
					Корпоративный сайт
				</InsideSideLink>

				<InsideSideLink currentLink={ROUTES_DATA.services.path}>
					Интернет-магазин
				</InsideSideLink>

				<InsideSideLink currentLink={ROUTES_DATA.services.path}>
					Форум
				</InsideSideLink>
			</ul>
		</div>
	)
}
